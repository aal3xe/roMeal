import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Target, 
  Scale, 
  Flame, 
  Clock, 
  Users, 
  ShieldAlert, 
  Utensils, 
  Store, 
  Wallet, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  ChefHat, 
  CheckCircle2,
  CalendarDays,
  ShoppingCart,
  Copy,
  Printer
} from 'lucide-react';
import { 
  UserProfile, 
  Allergen, 
  DietPreference, 
  KitchenEquipment, 
  ActivityLevel, 
  DietGoal,
  Recipe,
  WeeklyMealPlan,
  AggregatedShoppingItem
} from '../types';
import { planner, getSlotDistribution } from '../services/planner';
import { shoppingListService, CATEGORY_LABELS } from '../services/shoppingList';
import { db } from '../services/db';
import { getRecipeTotalPlateWeight } from '../services/weightConverter';

interface ProfilingWizardProps {
  initialProfile?: UserProfile | null;
  onComplete: (profile: Partial<UserProfile>, customPlan?: WeeklyMealPlan) => void;
  onSkip?: () => void;
}

const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DAYS_NAMES = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ALLERGEN_OPTIONS: { id: Allergen; label: string; desc: string; icon: string }[] = [
  { id: 'gluten', label: 'Gluten', desc: 'Wheat flour, rye, barley, traditional pasta, white bread', icon: '🌾' },
  { id: 'lactoza', label: 'Dairy / Lactose', desc: 'Cow milk, cream, fresh cheeses, butter', icon: '🥛' },
  { id: 'oua', label: 'Eggs', desc: 'Chicken eggs, mayonnaise, egg wash', icon: '🥚' },
  { id: 'peste_fructe_de_mare', label: 'Fish & Seafood', desc: 'Salmon, trout, cod, tuna, shellfish', icon: '🐟' },
  { id: 'arahide_nuci', label: 'Peanuts & Tree Nuts', desc: 'Walnuts, almonds, peanuts, cashews', icon: '🥜' },
  { id: 'soia', label: 'Soy & Tofu', desc: 'Tofu, soy milk, edamame, soy sauce', icon: '🌱' },
  { id: 'mustar', label: 'Mustard', desc: 'Mustard seeds or prepared mustard', icon: '🌭' },
  { id: 'telina', label: 'Celery', desc: 'Celery root and fresh stalks', icon: '🥬' },
  { id: 'susan', label: 'Sesame Seeds', desc: 'Sesame seeds, tahini, seeded breads', icon: '🥯' }
];

const PREFERENCE_OPTIONS: { id: DietPreference; label: string; desc: string; icon: string }[] = [
  { id: 'bogata_in_proteine', label: 'High Protein (Fitness)', desc: 'Lean meats, eggs, Greek yogurt, tofu for muscle tone and high satiety', icon: '💪' },
  { id: 'fara_porc', label: 'Pork-Free', desc: 'Only chicken, turkey, lean beef, fish, and legumes', icon: '🚫' },
  { id: 'low_carb', label: 'Low-Carb', desc: 'Emphasis on healthy fats, lean proteins, and fiber veggies', icon: '🥑' },
  { id: 'pescetarian', label: 'Pescetarian', desc: 'Fish and seafood + vegetables, dairy, and eggs (no poultry or red meat)', icon: '🎣' },
  { id: 'vegetarian', label: 'Vegetarian', desc: 'Plant foods plus fresh dairy and eggs, strictly no meat or fish', icon: '🥗' },
  { id: 'vegan', label: '100% Plant-Based (Vegan)', desc: 'Exclusively plant-derived whole foods', icon: '🥦' }
];

const EQUIPMENT_OPTIONS: { id: KitchenEquipment; label: string; icon: string }[] = [
  { id: 'aragaz_plita', label: 'Stovetop / Cooktop', icon: '🍳' },
  { id: 'cuptor', label: 'Oven (electric / gas)', icon: '♨️' },
  { id: 'airfryer', label: 'Air Fryer', icon: '🍟' },
  { id: 'blender', label: 'Blender / Food Processor', icon: '🥤' },
  { id: 'multicooker', label: 'Multicooker / Instant Pot', icon: '🍲' },
  { id: 'gratar', label: 'Grill Pan / BBQ', icon: '🥩' },
  { id: 'cantar_bucatarie', label: 'Kitchen Food Scale', icon: '⚖️' }
];

const STORES = ['Whole Foods', 'Trader Joe\'s', 'Kaufland', 'Lidl', 'Carrefour', 'Local Market'];

export const ProfilingWizard: React.FC<ProfilingWizardProps> = ({
  initialProfile,
  onComplete,
  onSkip
}) => {
  const [step, setStep] = useState<number>(0);

  // Profile States
  const [goal, setGoal] = useState<DietGoal>(initialProfile?.goal || 'lose_weight');
  const [deficitRate, setDeficitRate] = useState<'moderate' | 'standard' | 'aggressive'>('standard');

  const [gender, setGender] = useState<'m' | 'f'>(initialProfile?.gender || 'm');
  const [age, setAge] = useState<number>(initialProfile?.age || 30);
  const [height, setHeight] = useState<number>(initialProfile?.height_cm || 178);
  const [weight, setWeight] = useState<number>(initialProfile?.weight_kg || 76);
  const [activity, setActivity] = useState<ActivityLevel>(initialProfile?.activity_level || 'moderate');

  const [mealsPerDay, setMealsPerDay] = useState<2 | 3 | 4 | 5>(initialProfile?.meals_per_day || 3);
  const [cookingTime, setCookingTime] = useState<number>(initialProfile?.cooking_time_max_minutes || 30);
  const [householdSize, setHouseholdSize] = useState<number>(initialProfile?.household_size || 1);

  const [preferences, setPreferences] = useState<DietPreference[]>(
    initialProfile?.preferences || ['bogata_in_proteine']
  );
  const [allergies, setAllergies] = useState<Allergen[]>(initialProfile?.allergies || []);
  const [equipment, setEquipment] = useState<KitchenEquipment[]>(
    initialProfile?.kitchen_equipment || ['aragaz_plita', 'cuptor']
  );

  const [preferredStore, setPreferredStore] = useState<string>(initialProfile?.preferred_store || 'Whole Foods');
  const [weeklyBudget, setWeeklyBudget] = useState<number>(initialProfile?.weekly_budget_ron || 120);
  const [gdprConsent, setGdprConsent] = useState<boolean>(true);

  // Computed metrics
  const [computedCalories, setComputedCalories] = useState<number>(2000);
  const [computedProtein, setComputedProtein] = useState<number>(130);
  const [computedCarbs, setComputedCarbs] = useState<number>(220);
  const [computedFat, setComputedFat] = useState<number>(65);

  // Meal selections: dayIndex (0..6) -> slotIndex (0..N-1) -> Recipe
  const [mealSelections, setMealSelections] = useState<Record<number, Record<number, Recipe>>>({});
  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [copiedList, setCopiedList] = useState<boolean>(false);

  const slotConfigs = useMemo(() => getSlotDistribution(mealsPerDay), [mealsPerDay]);

  useEffect(() => {
    // Mifflin-St Jeor formula
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === 'm' ? 5 : -161;

    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const tdee = Math.round(bmr * activityMultipliers[activity]);
    let target = tdee;

    if (goal === 'lose_weight') {
      const def = deficitRate === 'moderate' ? 350 : deficitRate === 'standard' ? 500 : 650;
      target = tdee - def;
    } else if (goal === 'gain_muscle') {
      target = tdee + 300;
    }

    target = Math.max(1200, Math.min(4800, target));
    setComputedCalories(target);

    const proteinGrams = Math.round((target * 0.26) / 4);
    const fatGrams = Math.round((target * 0.28) / 9);
    const carbsGrams = Math.round((target - (proteinGrams * 4 + fatGrams * 9)) / 4);

    setComputedProtein(proteinGrams);
    setComputedCarbs(carbsGrams);
    setComputedFat(fatGrams);
  }, [weight, height, age, gender, activity, goal, deficitRate]);

  const toggleAllergen = (a: Allergen) => {
    setAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const togglePreference = (p: DietPreference) => {
    setPreferences(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const toggleEquipment = (eq: KitchenEquipment) => {
    setEquipment(prev => prev.includes(eq) ? prev.filter(x => x !== eq) : [...prev, eq]);
  };

  // Helper: candidate recipes for the current active slot
  const currentSlot = slotConfigs[activeSlotIndex] || slotConfigs[0];
  const candidateRecipesForCurrentSlot = useMemo(() => {
    if (!currentSlot) return [];
    return planner.getCandidatesForSlot(currentSlot.type, allergies, preferences, 10);
  }, [currentSlot, allergies, preferences]);

  // Assign a recipe to specific dayIndex for the active slot
  const assignRecipeToDay = (recipe: Recipe, dayIndex: number) => {
    setMealSelections(prev => {
      const daySlots = { ...(prev[dayIndex] || {}) };
      daySlots[activeSlotIndex] = recipe;
      return {
        ...prev,
        [dayIndex]: daySlots
      };
    });
  };

  // Assign recipe to ALL 7 days for the active slot
  const assignRecipeToAllDays = (recipe: Recipe) => {
    setMealSelections(prev => {
      const next = { ...prev };
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const daySlots = { ...(next[dayIndex] || {}) };
        daySlots[activeSlotIndex] = recipe;
        next[dayIndex] = daySlots;
      }
      return next;
    });
  };

  // Check if a recipe is assigned on a given day for active slot
  const isAssignedOnDay = (recipeId: string, dayIndex: number) => {
    return mealSelections[dayIndex]?.[activeSlotIndex]?.id === recipeId;
  };

  // Count how many days are configured for active slot
  const assignedDaysCountForActiveSlot = useMemo(() => {
    let count = 0;
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      if (mealSelections[dayIndex]?.[activeSlotIndex]) count++;
    }
    return count;
  }, [mealSelections, activeSlotIndex]);

  // Auto-fill unassigned days for active slot with varied recipes
  const autoFillRemainingDays = () => {
    if (candidateRecipesForCurrentSlot.length === 0) return;
    setMealSelections(prev => {
      const next = { ...prev };
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const daySlots = { ...(next[dayIndex] || {}) };
        if (!daySlots[activeSlotIndex]) {
          const candidate = candidateRecipesForCurrentSlot[dayIndex % candidateRecipesForCurrentSlot.length];
          daySlots[activeSlotIndex] = candidate;
          next[dayIndex] = daySlots;
        }
      }
      return next;
    });
  };

  // Generate complete plan object for final preview and saving
  const generatedCustomPlan: WeeklyMealPlan = useMemo(() => {
    const user = db.getCurrentUser();
    const userId = user?.id || 'usr-demo-1';
    return planner.buildCustomWeeklyPlan(
      userId,
      computedCalories,
      mealSelections,
      mealsPerDay
    );
  }, [computedCalories, mealSelections, mealsPerDay]);

  // Generate shopping list aggregated from the custom meal plan
  const weeklyShoppingItems: AggregatedShoppingItem[] = useMemo(() => {
    return shoppingListService.aggregateWeeklyShoppingList(generatedCustomPlan, householdSize);
  }, [generatedCustomPlan, householdSize]);

  const groupedShoppingItems = useMemo(() => {
    return shoppingListService.groupByCategory(weeklyShoppingItems);
  }, [weeklyShoppingItems]);

  const handleCopyShoppingList = () => {
    let text = `🛒 7-DAY GROCERY SHOPPING LIST - roMeal\n`;
    text += `Store: ${preferredStore} | Household: ${householdSize} ${householdSize === 1 ? 'person' : 'people'}\n`;
    text += `Target Budget: ${weeklyBudget} RON / $\n`;
    text += `* All quantities are raw scale weights for supermarket shopping\n\n`;

    Object.entries(groupedShoppingItems).forEach(([catKey, items]) => {
      const catMeta = CATEGORY_LABELS[catKey as keyof typeof CATEGORY_LABELS] || { label: catKey, icon: '•' };
      text += `${catMeta.icon} ${catMeta.label.toUpperCase()}:\n`;
      items.forEach(item => {
        const name = item.name_en || item.name_ro;
        text += `  [ ] ${name}: ${item.display_amount}\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2500);
  };

  const handleFinalSave = () => {
    onComplete(
      {
        goal,
        gender,
        age,
        height_cm: height,
        weight_kg: weight,
        activity_level: activity,
        calorie_target: computedCalories,
        protein_target_g: computedProtein,
        carbs_target_g: computedCarbs,
        fat_target_g: computedFat,
        meals_per_day: mealsPerDay,
        household_size: householdSize,
        allergies,
        preferences,
        cooking_time_max_minutes: cookingTime,
        kitchen_equipment: equipment,
        preferred_store: preferredStore,
        weekly_budget_ron: weeklyBudget,
        gdpr_consent: gdprConsent,
        gdpr_consent_date: new Date().toISOString()
      },
      generatedCustomPlan
    );
  };

  // ----------------------------------------------------
  // INTRO SCREEN (STEP 0)
  // ----------------------------------------------------
  if (step === 0) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center py-8 px-4">
        <div className="max-w-2xl w-full bg-[#0e131c] rounded-3xl border border-amber-500/25 shadow-2xl overflow-hidden p-6 sm:p-10 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-500/20 font-black">
            <Sparkles className="w-8 h-8 text-slate-950" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/15 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Precision Nutrition & Table Scale
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight leading-tight">
            Meal planner with exact <span className="text-amber-400">raw & cooked weights</span> calibrated to your <span className="text-emerald-400">budget</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Set your calorie goals and <strong>choose from 10 delicious options for each meal</strong> (with cooked plate weights and raw prep weights), plus get an <strong>automated shopping list tailored to your favorite store</strong>!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 text-left">
            <div className="p-3 bg-[#131a26] rounded-2xl border border-white/5">
              <span className="text-xl">🎯</span>
              <p className="text-xs font-bold text-white mt-1">Calories & BMR</p>
              <p className="text-[11px] text-slate-400">Clinical Mifflin formula</p>
            </div>
            <div className="p-3 bg-[#131a26] rounded-2xl border border-white/5">
              <span className="text-xl">⚖️</span>
              <p className="text-xs font-bold text-white mt-1">Raw vs Plate</p>
              <p className="text-[11px] text-slate-400">Know exact plate portions</p>
            </div>
            <div className="p-3 bg-[#131a26] rounded-2xl border border-white/5">
              <span className="text-xl">🍲</span>
              <p className="text-xs font-bold text-white mt-1">10 Meal Choices</p>
              <p className="text-[11px] text-slate-400">Flexible 1 to 7 day plans</p>
            </div>
            <div className="p-3 bg-[#131a26] rounded-2xl border border-white/5">
              <span className="text-xl">🛒</span>
              <p className="text-xs font-bold text-white mt-1">Weekly Groceries</p>
              <p className="text-[11px] text-slate-400">Aggregated for your market</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 rounded-xl font-black text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 mx-auto cursor-pointer"
            >
              <span>Start Nutrition Wizard & Pick Meals</span>
              <ChevronRight className="w-5 h-5 text-slate-950" />
            </button>

            {onSkip && (
              <button
                type="button"
                onClick={onSkip}
                className="text-xs text-slate-400 hover:text-amber-300 font-semibold block mx-auto pt-2 transition-colors cursor-pointer"
              >
                Skip directly to default plan
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Calculate header title and progress percentage
  const totalStages = 6 + slotConfigs.length + 1;
  const currentStageNumber = step <= 6 
    ? step 
    : step >= 10 && step < 20 
      ? 6 + (activeSlotIndex + 1)
      : totalStages;

  return (
    <div className="min-h-[85vh] py-4 sm:py-6 px-3 sm:px-4 flex items-center justify-center overflow-x-hidden w-full max-w-full">
      <div className="max-w-4xl w-full bg-[#0d121a] rounded-3xl border border-amber-500/20 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        {/* Top Progress Bar */}
        <div className="bg-[#090d14] text-white px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 flex items-center justify-center font-black text-xs shadow-md shadow-amber-500/20 shrink-0">
              {currentStageNumber}
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-400 font-heading">
                Step {currentStageNumber} of {totalStages}
              </p>
              <p className="text-xs text-slate-300 line-clamp-1">
                {step === 1 && 'Primary Dietary Goal'}
                {step === 2 && 'Biometrics & Activity Level'}
                {step === 3 && 'Meal Frequency & Household'}
                {step === 4 && 'Dietary Preferences'}
                {step === 5 && 'Allergens & Hard Exclusions (100% Strict)'}
                {step === 6 && 'Kitchen Equipment, Store & Budget'}
                {step >= 10 && step < 20 && `Meal Selection: ${currentSlot?.label_ro} (Meal ${activeSlotIndex + 1})`}
                {step === 20 && '7-Day Meal Plan & Aggregated Grocery List Preview'}
              </p>
            </div>
          </div>

          <div className="w-20 sm:w-40 bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10 shrink-0">
            <div 
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStageNumber / totalStages) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto overscroll-contain scrollbar-none max-h-[75vh] space-y-6">
          {/* STEP 1: GOAL */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  What is your primary nutritional goal?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  The algorithm will configure calories and macronutrient ratios according to your objective.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {[
                  {
                    id: 'lose_weight',
                    title: 'Healthy Weight Loss & Fat Loss',
                    desc: 'Controlled caloric deficit, keeping high energy & muscle preservation with filling meals.',
                    icon: '🎯'
                  },
                  {
                    id: 'maintain',
                    title: 'Weight Maintenance & Daily Vitality',
                    desc: 'Balanced calories, varied nutrition, and stress-free grocery planning.',
                    icon: '⚖️'
                  },
                  {
                    id: 'gain_muscle',
                    title: 'Muscle Growth & Lean Bulk',
                    desc: 'Moderate caloric surplus and high protein for athletic performance and recovery.',
                    icon: '💪'
                  }
                ].map(opt => {
                  const isSelected = goal === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoal(opt.id as DietGoal)}
                      className={`flex items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-[#16202f] shadow-lg shadow-amber-500/10'
                          : 'border-white/10 hover:border-amber-500/30 bg-[#10151f] hover:bg-[#131b28]'
                      }`}
                    >
                      <span className="text-3xl shrink-0 p-1">{opt.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className={`text-sm sm:text-base font-extrabold ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                            {opt.title}
                          </h3>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-amber-400 bg-amber-400 text-slate-950 font-black' : 'border-white/20 bg-black/40'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {opt.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {goal === 'lose_weight' && (
                <div className="p-4 sm:p-5 bg-[#10151f] rounded-2xl border border-amber-500/25 space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-amber-300">
                    What weight loss pace do you prefer?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'moderate', label: 'Mild & Sustainable', cal: '-350 kcal/day' },
                      { id: 'standard', label: 'Standard Optimal', cal: '-500 kcal/day' },
                      { id: 'aggressive', label: 'Accelerated', cal: '-650 kcal/day' }
                    ].map(r => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setDeficitRate(r.id as any)}
                        className={`h-16 p-2 rounded-xl border text-xs font-bold text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                          deficitRate === r.id
                            ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md shadow-amber-500/10'
                            : 'border-white/10 text-slate-300 hover:text-white bg-black/30 hover:bg-black/50'
                        }`}
                      >
                        <span className="font-extrabold">{r.label}</span>
                        <span className="text-[11px] font-semibold text-emerald-400 mt-0.5">
                          {r.cal}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: BIOMETRICS & BMR */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  Biometrics & BMR Calculator
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  The clinical Mifflin-St Jeor equation determines your exact basal metabolic expenditure.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Biological Sex</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setGender('m')}
                    className={`h-12 px-4 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gender === 'm'
                        ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md shadow-amber-500/15'
                        : 'border-white/10 bg-[#10151f] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>👨 Male</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('f')}
                    className={`h-12 px-4 rounded-xl border-2 font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      gender === 'f'
                        ? 'border-amber-400 bg-amber-400/15 text-amber-300 shadow-md shadow-amber-500/15'
                        : 'border-white/10 bg-[#10151f] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>👩 Female</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Age (years)</label>
                  <input
                    type="number"
                    value={age}
                    min={14}
                    max={95}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full h-11 text-center text-sm font-black bg-[#141b27] border border-white/10 rounded-xl text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Weight (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    min={35}
                    max={250}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="w-full h-11 text-center text-sm font-black bg-[#141b27] border border-white/10 rounded-xl text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Height (cm)</label>
                  <input
                    type="number"
                    value={height}
                    min={120}
                    max={225}
                    onChange={e => setHeight(Number(e.target.value))}
                    className="w-full h-11 text-center text-sm font-black bg-[#141b27] border border-white/10 rounded-xl text-white focus:outline-hidden focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Weekly Activity Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'sedentary', label: 'Sedentary', desc: 'Desk work, driving, under 4,000 steps/day' },
                    { id: 'light', label: 'Lightly Active', desc: 'Walking, errands, 1-2 workouts/week' },
                    { id: 'moderate', label: 'Moderately Active', desc: '3-4 workouts/week or active daily movement' },
                    { id: 'active', label: 'Very Active', desc: '5+ intense workouts or physically demanding job' }
                  ].map(act => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setActivity(act.id as ActivityLevel)}
                      className={`min-h-[72px] p-3.5 rounded-2xl border text-left text-xs transition-all flex flex-col justify-center cursor-pointer ${
                        activity === act.id
                          ? 'border-amber-400 bg-[#16202f] text-white font-bold shadow-md shadow-amber-500/10'
                          : 'border-white/10 text-slate-300 bg-[#10151f] hover:bg-[#141b27]'
                      }`}
                    >
                      <span className={`block font-extrabold text-sm ${activity === act.id ? 'text-amber-300' : 'text-white'}`}>{act.label}</span>
                      <span className="text-[11px] text-slate-400 block mt-0.5">{act.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-emerald-500/20 border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
                    <Flame className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black text-amber-300 tracking-wider">Calculated Calorie Target</span>
                    <p className="text-2xl font-black font-heading text-white leading-tight">{computedCalories} kcal / day</p>
                  </div>
                </div>
                <div className="text-left sm:text-right text-xs text-slate-300 flex sm:flex-col gap-3 sm:gap-1">
                  <p>Protein: <strong className="text-blue-400">{computedProtein}g</strong></p>
                  <p>Carbs: <strong className="text-amber-400">{computedCarbs}g</strong></p>
                  <p>Fat: <strong className="text-rose-400">{computedFat}g</strong></p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MEAL FREQUENCY & HOUSEHOLD */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  How many meals do you prefer each day?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  We will curate dedicated choice sets for every scheduled meal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    num: 2,
                    title: '2 Meals per day',
                    desc: 'Meal 1 (Lunch) + Meal 2 (Dinner). Fasting-friendly, skip breakfast.',
                    icon: '🍽️'
                  },
                  {
                    num: 3,
                    title: '3 Balanced Meals (Classic)',
                    desc: 'Breakfast + Lunch + Dinner. Balanced, predictable routine.',
                    icon: '🥪'
                  },
                  {
                    num: 4,
                    title: '4 Meals per day',
                    desc: 'Breakfast + Lunch + Afternoon Snack + Dinner. Sustained energy.',
                    icon: '🍎'
                  },
                  {
                    num: 5,
                    title: '5 Meals per day',
                    desc: 'Breakfast + Snack 1 + Lunch + Snack 2 + Dinner. Frequent light meals.',
                    icon: '⚡'
                  }
                ].map(item => {
                  const isSelected = mealsPerDay === item.num;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => setMealsPerDay(item.num as any)}
                      className={`min-h-[76px] p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 bg-[#16202f] shadow-md shadow-amber-500/10'
                          : 'border-white/10 hover:border-amber-500/30 bg-[#10151f] hover:bg-[#131b28]'
                      }`}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <h4 className={`font-extrabold text-sm ${isSelected ? 'text-amber-300' : 'text-white'}`}>{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1 leading-snug">{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#10151f] rounded-2xl border border-white/10">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    ⏱️ Maximum available cooking time
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={15}
                      max={60}
                      step={5}
                      value={cookingTime}
                      onChange={e => setCookingTime(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                    <span className="text-xs font-black text-amber-400 shrink-0 w-16 text-right">
                      {cookingTime} min
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-[#10151f] rounded-2xl border border-white/10">
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    👨‍👩‍👧 How many people are you cooking for?
                  </label>
                  <select
                    value={householdSize}
                    onChange={e => setHouseholdSize(Number(e.target.value))}
                    className="w-full h-11 px-3 text-xs font-extrabold bg-[#141b27] border border-white/10 rounded-xl text-white focus:outline-hidden focus:border-amber-400"
                  >
                    <option value={1}>1 person (individual portions)</option>
                    <option value={2}>2 people (couple — 2x scale)</option>
                    <option value={3}>3 people (small family — 3x scale)</option>
                    <option value={4}>4 people (family — 4x scale)</option>
                    <option value={5}>5+ people (large household)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PREFERENCES */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  What dietary styles do you prefer?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  We will prioritize these culinary styles when presenting candidate meal options.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PREFERENCE_OPTIONS.map(pref => {
                  const isChecked = preferences.includes(pref.id);
                  return (
                    <button
                      key={pref.id}
                      type="button"
                      onClick={() => togglePreference(pref.id)}
                      className={`min-h-[68px] flex items-center justify-between gap-3 p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-400 bg-[#16202f] shadow-md shadow-amber-500/10'
                          : 'border-white/10 hover:border-amber-500/30 bg-[#10151f] hover:bg-[#131b28]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{pref.icon}</span>
                        <div className="min-w-0">
                          <span className={`text-xs font-bold block ${isChecked ? 'text-amber-300' : 'text-white'}`}>{pref.label}</span>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">{pref.desc}</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 shrink-0 ${isChecked ? 'bg-amber-400 border-amber-400 text-slate-950 font-black' : 'border-white/20 bg-black/40'}`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: ALLERGIES (HARD EXCLUSION) */}
          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-rose-400" />
                  <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                    Food Allergies & Exclusions (100% Strict)
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Any recipe containing any of these selected ingredients will be <strong>strictly eliminated</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ALLERGEN_OPTIONS.map(opt => {
                  const isChecked = allergies.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleAllergen(opt.id)}
                      className={`min-h-[68px] flex items-center justify-between gap-3 p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-rose-500 bg-rose-950/40 text-rose-200'
                          : 'border-white/10 hover:border-amber-500/30 bg-[#10151f] hover:bg-[#131b28]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-2xl shrink-0">{opt.icon}</span>
                        <div className="min-w-0">
                          <span className={`text-xs font-bold block ${isChecked ? 'text-rose-300' : 'text-white'}`}>{opt.label}</span>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">{opt.desc}</p>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 shrink-0 ${isChecked ? 'bg-rose-500 border-rose-500 text-white font-black' : 'border-white/20 bg-black/40'}`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {allergies.length === 0 && (
                <div className="p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>No allergies selected. You have access to the full recipe catalog!</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: STORE & BUDGET */}
          {step === 6 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white font-heading">
                  Supermarket & Weekly Budget
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Next, you will <strong>pick your favorite meals</strong> for each slot of the week!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[#10151f] rounded-2xl border border-white/10">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Store className="w-4 h-4 text-emerald-400" />
                    <span>Preferred Grocery Store</span>
                  </label>
                  <select
                    value={preferredStore}
                    onChange={e => setPreferredStore(e.target.value)}
                    className="w-full h-11 px-3 text-xs font-bold bg-[#141b27] border border-white/10 rounded-xl text-white focus:outline-hidden focus:border-amber-400"
                  >
                    {STORES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-[#10151f] rounded-2xl border border-white/10">
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Wallet className="w-4 h-4 text-amber-400" />
                    <span>Weekly Grocery Budget Target</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={50}
                      max={2500}
                      step={25}
                      value={weeklyBudget}
                      onChange={e => setWeeklyBudget(Number(e.target.value))}
                      className="w-full h-11 pl-16 text-sm font-black bg-[#141b27] border border-white/10 rounded-xl text-white focus:outline-hidden focus:border-amber-400"
                    />
                    <span className="absolute left-3 top-3 text-xs font-black text-amber-400">RON / $</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Kitchen Equipment Available
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {EQUIPMENT_OPTIONS.map(eq => {
                    const isChecked = equipment.includes(eq.id);
                    return (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => toggleEquipment(eq.id)}
                        className={`h-11 px-3.5 rounded-xl border text-left text-xs flex items-center gap-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'border-amber-400 bg-amber-400/15 text-amber-300 font-extrabold'
                            : 'border-white/10 text-slate-300 bg-[#10151f] hover:bg-[#141b27]'
                        }`}
                      >
                        <span className="text-lg shrink-0">{eq.icon}</span>
                        <span className="truncate">{eq.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="p-4 bg-[#10151f] border border-white/10 rounded-2xl">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="gdpr-p6"
                    checked={gdprConsent}
                    onChange={e => setGdprConsent(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded-md border-white/20 bg-black/40 text-amber-400 accent-amber-400 cursor-pointer shrink-0"
                  />
                  <label htmlFor="gdpr-p6" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
                    <span className="font-extrabold text-white">Privacy & Personalization:</span> I agree to calculate personalized nutritional targets and generate automated grocery lists.
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 10+: INTERACTIVE MEAL SELECTION (10 OPTIONS / SLOT) */}
          {step >= 10 && step < 20 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Header slot selection */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#121926] via-[#162232] to-[#0f151f] border border-amber-500/25 text-white p-5 rounded-3xl shadow-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Meal {activeSlotIndex + 1} of {slotConfigs.length}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      ~{Math.round(computedCalories * currentSlot.calorieRatio)} kcal / serving
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black font-heading mt-1">
                    Meal Options: {currentSlot.label_ro}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Pick your preferred recipe for individual days or apply across the whole week.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={autoFillRemainingDays}
                    className="h-10 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-900/30 border border-emerald-400/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Auto-fill unassigned days with varied recipes from this list"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Auto-Fill Open Days</span>
                  </button>
                </div>
              </div>

              {/* 7-Day Visual Progress Bar for this slot */}
              <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-white flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-amber-400" />
                    <span>Schedule for {currentSlot.label_ro}:</span>
                  </span>
                  <span className={`font-black px-2.5 py-1 rounded-lg text-xs ${
                    assignedDaysCountForActiveSlot === 7 
                      ? 'bg-emerald-950/70 border border-emerald-500/40 text-emerald-300' 
                      : 'bg-amber-400/15 border border-amber-400/30 text-amber-300'
                  }`}>
                    {assignedDaysCountForActiveSlot} / 7 days allocated
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 text-center">
                  {DAYS_NAMES.map((dayName, dIdx) => {
                    const assignedRecipe = mealSelections[dIdx]?.[activeSlotIndex];
                    const assignedTitle = assignedRecipe ? (assignedRecipe.title_en || assignedRecipe.title_ro) : '';
                    return (
                      <div
                        key={dIdx}
                        className={`min-h-[54px] p-2 rounded-xl border text-xs transition-all flex flex-col justify-center ${
                          assignedRecipe
                            ? 'bg-[#141b27] border-amber-400/60 shadow-xs'
                            : 'bg-black/30 border-dashed border-white/10 text-slate-500'
                        }`}
                      >
                        <span className="text-[10px] font-black block text-amber-400 uppercase">
                          {DAYS_SHORT[dIdx]}
                        </span>
                        <p className="text-[11px] font-bold text-slate-200 truncate mt-0.5" title={assignedTitle || 'Not scheduled'}>
                          {assignedRecipe ? assignedTitle : 'Select'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Candidate Recipe Cards Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Select from 10 allergen-safe options:
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {candidateRecipesForCurrentSlot.map(recipe => {
                    const assignedDaysCount = DAYS_NAMES.filter((_, dIdx) => isAssignedOnDay(recipe.id, dIdx)).length;
                    const isAllDays = assignedDaysCount === 7;
                    const totals = getRecipeTotalPlateWeight(recipe);
                    const title = recipe.title_en || recipe.title_ro;
                    const desc = recipe.description_en || recipe.description_ro;

                    return (
                      <div
                        key={recipe.id}
                        className={`rounded-3xl border-2 overflow-hidden transition-all flex flex-col justify-between ${
                          assignedDaysCount > 0
                            ? 'border-amber-400 bg-[#16202f] shadow-lg shadow-amber-500/10'
                            : 'border-white/10 hover:border-amber-500/30 bg-[#111722]'
                        }`}
                      >
                        <div className="flex gap-3.5 p-4">
                          <img
                            src={recipe.image_url}
                            alt={title}
                            className="w-24 h-24 rounded-2xl object-cover shrink-0 border border-white/5"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-extrabold text-white text-sm leading-snug line-clamp-2">
                              {title}
                            </h4>

                            <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-300 font-semibold">
                              <span className="text-amber-400 flex items-center gap-1 font-bold">
                                <Flame className="w-3.5 h-3.5 text-amber-400" />
                                {recipe.calories} kcal
                              </span>
                              <span className="text-slate-600">•</span>
                              <span className="text-slate-400 text-[11px]">P:{recipe.protein_g}g C:{recipe.carbs_g}g F:{recipe.fat_g}g</span>
                            </div>

                            {/* Dual Weights Indicator: Cooked in plate vs Raw */}
                            <div className="flex flex-wrap items-center gap-1.5 mt-2">
                              <span className="font-black text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-lg flex items-center gap-1 text-[11px]">
                                <Utensils className="w-3 h-3 text-emerald-400" />
                                <span>~{totals.cookedTotalGrams}g on plate</span>
                              </span>
                              <span className="text-[10px] text-amber-300 font-bold bg-amber-950/50 border border-amber-500/30 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                                <Scale className="w-3 h-3 text-amber-400" />
                                <span>{totals.rawTotalGrams}g raw</span>
                              </span>
                            </div>

                            <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-1 italic">
                              {desc}
                            </p>
                          </div>
                        </div>

                        {/* Assignment actions */}
                        <div className="bg-[#0b1017] px-4 py-3 border-t border-white/5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5">
                          {/* 7 Days pills selector */}
                          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                            <span className="text-[11px] font-black text-amber-400 mr-1">Days:</span>
                            {DAYS_SHORT.map((shortDay, dIdx) => {
                              const isChecked = isAssignedOnDay(recipe.id, dIdx);
                              return (
                                <button
                                  key={dIdx}
                                  type="button"
                                  onClick={() => assignRecipeToDay(recipe, dIdx)}
                                  className={`min-w-[34px] sm:min-w-[36px] h-8 sm:h-9 px-1 rounded-xl text-xs font-black transition-all flex items-center justify-center cursor-pointer ${
                                    isChecked
                                      ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/20'
                                      : 'bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800'
                                  }`}
                                  title={`Schedule for ${DAYS_NAMES[dIdx]}`}
                                >
                                  {shortDay}
                                </button>
                              );
                            })}
                          </div>

                          {/* Quick all 7 days toggle button */}
                          <button
                            type="button"
                            onClick={() => assignRecipeToAllDays(recipe)}
                            className={`h-8 sm:h-9 px-3.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                              isAllDays
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 shadow-md shadow-amber-500/20'
                                : 'bg-amber-400/10 text-amber-300 border border-amber-400/30 hover:bg-amber-400/20'
                            }`}
                            title="Eat this meal every day of the week"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{isAllDays ? 'All 7 Days ✅' : 'All 7 Days'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 20: FINAL REVIEW & AGGREGATED GROCERY LIST */}
          {step === 20 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-emerald-500 text-slate-950 flex items-center justify-center mx-auto mb-2 shadow-lg shadow-amber-500/20 font-black">
                  <CheckCircle2 className="w-8 h-8 text-slate-950" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                  Your 7-Day Meal Plan & Grocery List
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl mx-auto">
                  Automatically generated 7-day grocery list calibrated for {householdSize} {householdSize === 1 ? 'person' : 'people'} with plate weights for {preferredStore}!
                </p>
              </div>

              {/* Nutrition summary bar */}
              <div className="bg-gradient-to-r from-[#121926] via-[#151f2e] to-[#0f151f] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400">Average Daily Calorie Target</span>
                  <p className="text-2xl sm:text-3xl font-black font-heading text-white">{computedCalories} kcal / day</p>
                  <p className="text-xs text-slate-300 mt-1">
                    Protein: <strong className="text-blue-400">{computedProtein}g</strong> • Carbs: <strong className="text-amber-400">{computedCarbs}g</strong> • Fat: <strong className="text-rose-400">{computedFat}g</strong>
                  </p>
                </div>

                <div className="p-3.5 bg-black/50 rounded-2xl border border-amber-500/30 text-right sm:min-w-48 shadow-inner">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Weekly Budget</span>
                  <p className="text-xl font-black text-amber-400">{weeklyBudget} RON / $</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">{preferredStore}</span>
                </div>
              </div>

              {/* Weekly meal plan summary tabs */}
              <div className="bg-[#10151f] rounded-3xl border border-white/10 p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <CalendarDays className="w-4 h-4 text-amber-400" />
                    <span>Summary of your 7 scheduled days (with cooked plate weights):</span>
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-bold hidden sm:inline">
                    🍽️ Cooked plate weights calculated for every meal
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
                  {generatedCustomPlan.days.map((day, dIdx) => (
                    <div key={dIdx} className="bg-[#141b27] p-3 rounded-2xl border border-white/5 text-xs space-y-2">
                      <p className="font-black text-amber-300 text-[11px] uppercase border-b border-white/10 pb-1.5 text-center">
                        {day.day_name_en || day.day_name_ro}
                      </p>
                      {day.entries.map((entry, eIdx) => {
                        const w = getRecipeTotalPlateWeight(entry.recipe);
                        const title = entry.recipe.title_en || entry.recipe.title_ro;
                        const slotTitle = entry.meal_slot === 'breakfast' ? 'Breakfast' : entry.meal_slot === 'lunch' ? 'Lunch' : entry.meal_slot === 'dinner' ? 'Dinner' : 'Snack';

                        return (
                          <div key={eIdx} className="text-[11px] p-2 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold text-slate-400">
                                {slotTitle}
                              </span>
                              <span className="text-[10px] text-emerald-400 font-black">
                                ~{w.cookedTotalGrams}g
                              </span>
                            </div>
                            <span className="font-bold text-slate-200 line-clamp-1 block" title={title}>
                              {title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* AGGREGATED WEEKLY SHOPPING LIST */}
              <div className="bg-[#10151f] rounded-3xl border border-amber-500/20 p-5 sm:p-6 shadow-xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5 text-amber-400" />
                      <h3 className="text-lg font-black text-white font-heading">
                        Aggregated Weekly Grocery List
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {weeklyShoppingItems.length} ingredients accumulated in exact scale weights, grouped by grocery aisle.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCopyShoppingList}
                      className="h-10 px-4 bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 text-amber-300 rounded-xl text-xs font-black border border-amber-400/30 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    >
                      {copiedList ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedList ? 'Copied!' : 'Copy List'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="h-10 px-4 border border-white/10 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                {/* Banner explaining raw shopping weights */}
                <div className="p-4 bg-black/40 border border-white/10 rounded-2xl flex items-start gap-3 text-xs text-slate-300 leading-relaxed">
                  <Scale className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Shopping note:</strong> Quantities below represent <strong>raw / uncooked</strong> state (how you weigh and purchase items at the grocery store). Cooked plate weights differ due to hydration or evaporation.
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                  {Object.entries(groupedShoppingItems).map(([catKey, items]) => {
                    const catMeta = CATEGORY_LABELS[catKey as keyof typeof CATEGORY_LABELS] || { label: catKey, icon: '📦' };
                    return (
                      <div key={catKey} className="rounded-2xl border border-white/10 overflow-hidden bg-[#0d121a]">
                        <div className="bg-[#141b27] px-4 py-2.5 font-bold text-xs text-white flex items-center justify-between border-b border-white/5">
                          <span className="flex items-center gap-2">
                            <span>{catMeta.icon}</span>
                            <span className="text-amber-300 font-extrabold">{catMeta.label}</span>
                          </span>
                          <span className="text-[11px] text-slate-400">{items.length} items</span>
                        </div>

                        <div className="divide-y divide-white/5 p-1">
                          {items.map(item => (
                            <div key={item.ingredient_id} className="flex items-center justify-between p-2.5 sm:px-3 text-xs hover:bg-white/5 transition-colors">
                              <span className="font-semibold text-slate-200">{item.name_en || item.name_ro}</span>
                              <span className="font-black bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-xl text-xs">
                                {item.display_amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-[#090d14] px-5 sm:px-8 py-4 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (step === 20) {
                setStep(10 + slotConfigs.length - 1);
                setActiveSlotIndex(slotConfigs.length - 1);
              } else if (step >= 10 && step < 20) {
                if (activeSlotIndex > 0) {
                  setActiveSlotIndex(idx => idx - 1);
                  setStep(10 + activeSlotIndex - 1);
                } else {
                  setStep(6);
                }
              } else {
                setStep(s => Math.max(0, s - 1));
              }
            }}
            className="h-11 sm:h-12 px-4 sm:px-5 flex items-center justify-center gap-2 text-xs font-black text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors border border-white/10 shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 text-slate-400" />
            <span>Back</span>
          </button>

          {/* Forward button logic */}
          {step < 6 && (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          )}

          {step === 6 && (
            <button
              type="button"
              onClick={() => {
                if (!gdprConsent) {
                  alert('Please check the consent box to proceed.');
                  return;
                }
                setActiveSlotIndex(0);
                setStep(10);
              }}
              className="h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Meal Selection (10 Options)</span>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>
          )}

          {step >= 10 && step < 20 && (
            <button
              type="button"
              onClick={() => {
                autoFillRemainingDays();

                if (activeSlotIndex < slotConfigs.length - 1) {
                  setActiveSlotIndex(idx => idx + 1);
                  setStep(10 + activeSlotIndex + 1);
                } else {
                  setStep(20);
                }
              }}
              className="h-11 sm:h-12 px-5 sm:px-7 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="truncate max-w-[200px] sm:max-w-none">
                {activeSlotIndex < slotConfigs.length - 1 
                  ? `Next Meal: ${slotConfigs[activeSlotIndex + 1].label_ro}` 
                  : 'View 7-Day Plan & Grocery List'}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-950 shrink-0" />
            </button>
          )}

          {step === 20 && (
            <button
              type="button"
              onClick={handleFinalSave}
              className="h-11 sm:h-12 px-6 sm:px-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 rounded-xl text-xs sm:text-sm font-black shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.03] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 text-slate-950 shrink-0" />
              <span>Confirm & Open Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
