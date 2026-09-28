import { UserProfile, Recipe, MealType, WeeklyMealPlan, DayPlan, MealPlanEntry, Allergen, DietPreference } from '../types';
import { db } from './db';

const DAYS_NAMES_RO = [
  'Luni',
  'Marți',
  'Miercuri',
  'Joi',
  'Vineri',
  'Sâmbătă',
  'Duminică'
];

interface SlotConfig {
  type: MealType;
  label_ro: string;
  calorieRatio: number; // e.g. 0.3 for 30%
}

export function getSlotDistribution(mealsPerDay: 2 | 3 | 4 | 5): SlotConfig[] {
  switch (mealsPerDay) {
    case 2:
      return [
        { type: 'lunch', label_ro: 'Prânz', calorieRatio: 0.52 },
        { type: 'dinner', label_ro: 'Cină', calorieRatio: 0.48 }
      ];
    case 3:
      return [
        { type: 'breakfast', label_ro: 'Mic Dejun', calorieRatio: 0.28 },
        { type: 'lunch', label_ro: 'Prânz', calorieRatio: 0.42 },
        { type: 'dinner', label_ro: 'Cină', calorieRatio: 0.30 }
      ];
    case 4:
      return [
        { type: 'breakfast', label_ro: 'Mic Dejun', calorieRatio: 0.25 },
        { type: 'lunch', label_ro: 'Prânz', calorieRatio: 0.38 },
        { type: 'snack', label_ro: 'Gustare', calorieRatio: 0.12 },
        { type: 'dinner', label_ro: 'Cină', calorieRatio: 0.25 }
      ];
    case 5:
    default:
      return [
        { type: 'breakfast', label_ro: 'Mic Dejun', calorieRatio: 0.22 },
        { type: 'snack', label_ro: 'Gustare 1', calorieRatio: 0.10 },
        { type: 'lunch', label_ro: 'Prânz', calorieRatio: 0.36 },
        { type: 'snack', label_ro: 'Gustare 2', calorieRatio: 0.10 },
        { type: 'dinner', label_ro: 'Cină', calorieRatio: 0.22 }
      ];
  }
}

export class MealPlanGenerator {
  /**
   * Generates a 7-day weekly meal plan using the Greedy Selection Algorithm (v1)
   */
  generateWeeklyPlan(profile: UserProfile): WeeklyMealPlan {
    const allRecipes = db.getRecipes();

    // 1. HARD CONSTRAINT: Strictly eliminate recipes with allergens
    const safeRecipes = allRecipes.filter(recipe => {
      if (!profile.allergies || profile.allergies.length === 0) return true;
      const hasExcludedAllergen = recipe.allergens.some(a => profile.allergies.includes(a));
      return !hasExcludedAllergen;
    });

    if (safeRecipes.length === 0) {
      throw new Error('Nu există suficiente rețete disponibile care să respecte toate restricțiile tale de alergeni.');
    }

    const slotConfigs = getSlotDistribution(profile.meals_per_day);
    const days: DayPlan[] = [];
    const usedRecipeCounts = new Map<string, number>(); // track repetitions across week

    // Start with upcoming Monday
    const today = new Date();
    const monday = new Date(today);
    const dayOfWeek = today.getDay();
    const distanceToMonday = (dayOfWeek + 6) % 7;
    monday.setDate(today.getDate() - distanceToMonday);

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + dayIndex);
      const dateLabel = dayDate.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });

      const dayEntries: MealPlanEntry[] = [];
      let dayCalories = 0;
      let dayProtein = 0;
      let dayCarbs = 0;
      let dayFat = 0;

      for (let slotIndex = 0; slotIndex < slotConfigs.length; slotIndex++) {
        const slot = slotConfigs[slotIndex];
        const targetCalories = Math.round(profile.calorie_target * slot.calorieRatio);

        // Find best recipe for this slot
        const bestRecipe = this.selectBestCandidate({
          slotType: slot.type,
          targetCalories,
          safeRecipes,
          profile,
          usedRecipeCounts,
          recentDayRecipes: dayEntries.map(e => e.recipe_id)
        });

        // Record usage
        usedRecipeCounts.set(bestRecipe.id, (usedRecipeCounts.get(bestRecipe.id) || 0) + 1);

        const entry: MealPlanEntry = {
          id: `mpe-${dayIndex}-${slotIndex}-${Date.now()}`,
          day_of_week: dayIndex,
          meal_slot: slot.type,
          recipe_id: bestRecipe.id,
          recipe: bestRecipe,
          servings: 1,
          target_calories: targetCalories
        };

        dayEntries.push(entry);
        dayCalories += bestRecipe.calories;
        dayProtein += bestRecipe.protein_g;
        dayCarbs += bestRecipe.carbs_g;
        dayFat += bestRecipe.fat_g;
      }

      days.push({
        day_index: dayIndex,
        day_name_ro: DAYS_NAMES_RO[dayIndex],
        date_label: dateLabel,
        entries: dayEntries,
        total_calories: Math.round(dayCalories),
        total_protein: Math.round(dayProtein),
        total_carbs: Math.round(dayCarbs),
        total_fat: Math.round(dayFat)
      });
    }

    const plan: WeeklyMealPlan = {
      id: `plan-${Date.now()}`,
      user_id: profile.user_id,
      week_start_date: monday.toISOString().split('T')[0],
      days,
      created_at: new Date().toISOString()
    };

    db.saveMealPlan(plan);
    return plan;
  }

  /**
   * Greedy candidate scoring:
   * Minimizes calorie divergence, rewards user preferences, penalizes repeats
   */
  private selectBestCandidate(args: {
    slotType: MealType;
    targetCalories: number;
    safeRecipes: Recipe[];
    profile: UserProfile;
    usedRecipeCounts: Map<string, number>;
    recentDayRecipes: string[];
  }): Recipe {
    const { slotType, targetCalories, safeRecipes, profile, usedRecipeCounts, recentDayRecipes } = args;

    // Filter recipes compatible with slot
    let candidates = safeRecipes.filter(r => r.meal_types.includes(slotType));

    // Fallback if no exact type match
    if (candidates.length === 0) {
      candidates = safeRecipes;
    }

    let bestRecipe = candidates[0];
    let bestScore = -Infinity;

    for (const recipe of candidates) {
      let score = 100;

      // 1. Calorie Proximity (Penalty for difference)
      const calorieDiff = Math.abs(recipe.calories - targetCalories);
      score -= (calorieDiff / targetCalories) * 60;

      // 2. Repetition penalty (Meal variety constraint)
      const timesUsedInWeek = usedRecipeCounts.get(recipe.id) || 0;
      score -= timesUsedInWeek * 45;

      // Did we already eat this today?
      if (recentDayRecipes.includes(recipe.id)) {
        score -= 90;
      }

      // 3. User dietary preference bonus
      if (profile.preferences && profile.preferences.length > 0) {
        const matchesPref = recipe.diet_tags.some(t => profile.preferences.includes(t));
        if (matchesPref) {
          score += 25;
        }
      }

      // 4. Equipment compatibility bonus
      const ownsAllEquipment = recipe.equipment_needed.every(eq => 
        profile.kitchen_equipment.includes(eq)
      );
      if (ownsAllEquipment) {
        score += 15;
      } else {
        score -= 20;
      }

      // 5. Cooking time constraint
      const totalTime = recipe.prep_time_minutes + recipe.cook_time_minutes;
      if (totalTime <= profile.cooking_time_max_minutes) {
        score += 10;
      } else {
        score -= 15;
      }

      if (score > bestScore) {
        bestScore = score;
        bestRecipe = recipe;
      }
    }

    return bestRecipe;
  }

  /**
   * Get alternative recipes for meal swap modal
   */
  getSwapAlternatives(currentRecipeId: string, slotType: MealType, profile: UserProfile): Recipe[] {
    const allRecipes = db.getRecipes();

    return allRecipes
      .filter(recipe => {
        // Exclude current recipe
        if (recipe.id === currentRecipeId) return false;

        // Slot match
        if (!recipe.meal_types.includes(slotType)) return false;

        // Hard allergen exclusion
        if (profile.allergies && profile.allergies.length > 0) {
          const hasAllergen = recipe.allergens.some(a => profile.allergies.includes(a));
          if (hasAllergen) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Rank by preference match
        const aPref = a.diet_tags.filter(t => profile.preferences.includes(t)).length;
        const bPref = b.diet_tags.filter(t => profile.preferences.includes(t)).length;
        return bPref - aPref;
      });
  }

  /**
   * Get candidate recipes for a specific meal slot (e.g. up to 10 options)
   * filtered strictly by allergen exclusions, sorted by preference match
   */
  getCandidatesForSlot(
    slotType: MealType, 
    allergies: Allergen[] = [], 
    preferences: DietPreference[] = [],
    limit: number = 10
  ): Recipe[] {
    const allRecipes = db.getRecipes();

    const candidates = allRecipes
      .filter(recipe => {
        // Must match slot type
        if (!recipe.meal_types.includes(slotType)) return false;

        // Hard exclusion: cannot contain any of the user's allergens
        if (allergies && allergies.length > 0) {
          const hasAllergen = recipe.allergens.some(a => allergies.includes(a));
          if (hasAllergen) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const aPref = a.diet_tags.filter(t => preferences.includes(t)).length;
        const bPref = b.diet_tags.filter(t => preferences.includes(t)).length;
        return bPref - aPref;
      });

    return candidates.slice(0, limit);
  }

  /**
   * Build a complete WeeklyMealPlan from explicit day/slot user selections
   */
  buildCustomWeeklyPlan(
    userId: string,
    targetCaloriesDaily: number,
    daySlotSelections: Record<number, Record<number, Recipe>>,
    mealsPerDay: 2 | 3 | 4 | 5
  ): WeeklyMealPlan {
    const slotConfigs = getSlotDistribution(mealsPerDay);
    const today = new Date();
    const monday = new Date(today);
    const dayOfWeek = today.getDay();
    const distanceToMonday = (dayOfWeek + 6) % 7;
    monday.setDate(today.getDate() - distanceToMonday);

    const days: DayPlan[] = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + dayIndex);
      const dateLabel = dayDate.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });

      const dayEntries: MealPlanEntry[] = [];
      let dayCalories = 0;
      let dayProtein = 0;
      let dayCarbs = 0;
      let dayFat = 0;

      for (let slotIndex = 0; slotIndex < slotConfigs.length; slotIndex++) {
        const slot = slotConfigs[slotIndex];
        const targetCalories = Math.round(targetCaloriesDaily * slot.calorieRatio);

        // Selected recipe or fallback
        const recipe = daySlotSelections[dayIndex]?.[slotIndex] || this.getCandidatesForSlot(slot.type)[0];

        const entry: MealPlanEntry = {
          id: `mpe-custom-${dayIndex}-${slotIndex}-${Date.now()}`,
          day_of_week: dayIndex,
          meal_slot: slot.type,
          recipe_id: recipe.id,
          recipe,
          servings: 1,
          target_calories: targetCalories
        };

        dayEntries.push(entry);
        dayCalories += recipe.calories;
        dayProtein += recipe.protein_g;
        dayCarbs += recipe.carbs_g;
        dayFat += recipe.fat_g;
      }

      days.push({
        day_index: dayIndex,
        day_name_ro: DAYS_NAMES_RO[dayIndex],
        date_label: dateLabel,
        entries: dayEntries,
        total_calories: Math.round(dayCalories),
        total_protein: Math.round(dayProtein),
        total_carbs: Math.round(dayCarbs),
        total_fat: Math.round(dayFat)
      });
    }

    return {
      id: `plan-custom-${Date.now()}`,
      user_id: userId,
      week_start_date: monday.toISOString().split('T')[0],
      days,
      created_at: new Date().toISOString()
    };
  }
}

export const planner = new MealPlanGenerator();
