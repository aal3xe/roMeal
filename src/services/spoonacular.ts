import { Recipe, RecipeIngredient, Ingredient, Allergen, DietPreference, MealType } from '../types';
import { db } from './db';

const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com/recipes';

// Map our internal Allergen types to Spoonacular intolerances parameter
export function mapAllergensToSpoonacular(allergens: Allergen[]): string {
  const mapping: Record<Allergen, string> = {
    gluten: 'gluten',
    lactoza: 'dairy',
    arahide_nuci: 'peanut,tree nut',
    oua: 'egg',
    peste_fructe_de_mare: 'seafood,shellfish',
    soia: 'soy',
    mustar: 'mustard',
    telina: 'celery',
    susan: 'sesame'
  };

  return allergens.map(a => mapping[a]).filter(Boolean).join(',');
}

// Map our diet preferences to Spoonacular diet parameter
export function mapDietToSpoonacular(preferences: DietPreference[]): string {
  if (preferences.includes('vegan')) return 'vegan';
  if (preferences.includes('vegetarian')) return 'vegetarian';
  if (preferences.includes('pescetarian')) return 'pescetarian';
  return '';
}

export interface SpoonacularFetchOptions {
  query?: string;
  mealType?: MealType;
  minCalories?: number;
  maxCalories?: number;
  allergens?: Allergen[];
  preferences?: DietPreference[];
  number?: number;
}

export class SpoonacularService {
  /**
   * Fetch recipes from Spoonacular API or fallback to enriched local database
   */
  async searchRecipes(options: SpoonacularFetchOptions): Promise<{ recipes: Recipe[]; source: 'live_api' | 'catalog' }> {
    const apiKey = db.getSpoonacularApiKey();

    if (!apiKey) {
      // Use internal curated recipe pool with exact allergen & calorie filtering
      const filtered = db.filterRecipes({
        mealType: options.mealType,
        excludedAllergens: options.allergens,
        dietPreferences: options.preferences
      });
      return { recipes: filtered, source: 'catalog' };
    }

    try {
      const intolerances = options.allergens ? mapAllergensToSpoonacular(options.allergens) : '';
      const diet = options.preferences ? mapDietToSpoonacular(options.preferences) : '';

      const typeParam = options.mealType === 'breakfast' 
        ? 'breakfast' 
        : options.mealType === 'snack' 
          ? 'snack,appetizer' 
          : 'main course';

      const url = new URL(`${SPOONACULAR_BASE_URL}/complexSearch`);
      url.searchParams.append('apiKey', apiKey);
      url.searchParams.append('addRecipeInformation', 'true');
      url.searchParams.append('addRecipeNutrition', 'true');
      url.searchParams.append('fillIngredients', 'true');
      url.searchParams.append('number', String(options.number || 8));

      if (typeParam) url.searchParams.append('type', typeParam);
      if (intolerances) url.searchParams.append('intolerances', intolerances);
      if (diet) url.searchParams.append('diet', diet);
      if (options.minCalories) url.searchParams.append('minCalories', String(options.minCalories));
      if (options.maxCalories) url.searchParams.append('maxCalories', String(options.maxCalories));
      if (options.query) url.searchParams.append('query', options.query);

      const res = await fetch(url.toString());
      if (!res.ok) {
        console.warn(`Spoonacular API error: ${res.status} ${res.statusText}`);
        return { 
          recipes: db.filterRecipes({ 
            mealType: options.mealType, 
            excludedAllergens: options.allergens 
          }), 
          source: 'catalog' 
        };
      }

      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        return { 
          recipes: db.filterRecipes({ 
            mealType: options.mealType, 
            excludedAllergens: options.allergens 
          }), 
          source: 'catalog' 
        };
      }

      // Transform Spoonacular results into our Recipe schema
      const mappedRecipes: Recipe[] = data.results.map((item: any) => this.transformSpoonacularRecipe(item, options.mealType || 'lunch'));
      
      // Save newly discovered recipes to database for persistence
      db.addRecipes(mappedRecipes);

      return { recipes: mappedRecipes, source: 'live_api' };
    } catch (err) {
      console.error('Error contacting Spoonacular:', err);
      return { 
        recipes: db.filterRecipes({ 
          mealType: options.mealType, 
          excludedAllergens: options.allergens 
        }), 
        source: 'catalog' 
      };
    }
  }

  /**
   * Transforms raw Spoonacular recipe item into our typed Recipe object
   */
  private transformSpoonacularRecipe(item: any, defaultMealType: MealType): Recipe {
    const nutrients = item.nutrition?.nutrients || [];
    const getNutrient = (name: string) => {
      const found = nutrients.find((n: any) => n.name.toLowerCase() === name.toLowerCase());
      return found ? Math.round(found.amount) : 0;
    };

    const calories = getNutrient('Calories') || 400;
    const protein_g = getNutrient('Protein') || 25;
    const carbs_g = getNutrient('Carbohydrates') || 40;
    const fat_g = getNutrient('Fat') || 12;
    const fiber_g = getNutrient('Fiber') || 4;

    // Detect allergens from ingredients & tags
    const allergens: Allergen[] = [];
    const textToCheck = `${item.title} ${(item.extendedIngredients || []).map((i: any) => i.name).join(' ')}`.toLowerCase();

    if (textToCheck.includes('flour') || textToCheck.includes('wheat') || textToCheck.includes('bread') || textToCheck.includes('pasta')) {
      allergens.push('gluten');
    }
    if (textToCheck.includes('milk') || textToCheck.includes('cheese') || textToCheck.includes('yogurt') || textToCheck.includes('butter') || textToCheck.includes('cream')) {
      allergens.push('lactoza');
    }
    if (textToCheck.includes('egg')) {
      allergens.push('oua');
    }
    if (textToCheck.includes('fish') || textToCheck.includes('salmon') || textToCheck.includes('tuna') || textToCheck.includes('shrimp')) {
      allergens.push('peste_fructe_de_mare');
    }
    if (textToCheck.includes('peanut') || textToCheck.includes('walnut') || textToCheck.includes('almond') || textToCheck.includes('nut')) {
      allergens.push('arahide_nuci');
    }
    if (textToCheck.includes('soy') || textToCheck.includes('tofu')) {
      allergens.push('soia');
    }

    // Parse ingredients with exact grams
    const ingredients: RecipeIngredient[] = (item.extendedIngredients || []).map((ing: any, idx: number) => {
      const metric = ing.measures?.metric;
      const amountGrams = metric ? Math.round(metric.amount) : Math.round(ing.amount * 28.35); // fallback oz to g
      
      const ingredientObj: Ingredient = {
        id: `ing-spoon-${ing.id || idx}`,
        name_ro: ing.nameClean || ing.name,
        name_en: ing.name,
        category: 'altele',
        default_unit: metric?.unitShort || 'g',
        calories_per_100g: 100,
        protein_per_100g: 4,
        carbs_per_100g: 10,
        fat_per_100g: 2,
        allergens: []
      };

      return {
        id: `ri-spoon-${item.id}-${idx}`,
        recipe_id: `rec-spoon-${item.id}`,
        ingredient_id: ingredientObj.id,
        ingredient: ingredientObj,
        amount_grams: Math.max(10, amountGrams || 50),
        unit_display: `${Math.max(10, amountGrams || 50)}g ${ing.nameClean || ing.name}`
      };
    });

    // Parse instructions
    const instructions: string[] = [];
    if (item.analyzedInstructions && item.analyzedInstructions.length > 0) {
      item.analyzedInstructions[0].steps.forEach((step: any) => {
        if (step.step) instructions.push(step.step);
      });
    } else if (item.instructions) {
      instructions.push(item.instructions.replace(/<[^>]*>?/gm, ''));
    } else {
      instructions.push('Prepare and cook ingredients according to standard culinary directions.');
    }

    const totalWeight = Math.max(200, ingredients.reduce((sum, ing) => sum + ing.amount_grams, 0));
    const factor = totalWeight > 0 ? 100 / totalWeight : 1;

    const cleanSummary = (item.summary || '').replace(/<[^>]*>?/gm, '').slice(0, 180) + '...';

    return {
      id: `rec-spoon-${item.id}`,
      spoonacular_id: item.id,
      title_ro: item.title,
      title_en: item.title,
      description_ro: cleanSummary,
      description_en: cleanSummary,
      image_url: item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      prep_time_minutes: item.preparationMinutes || 15,
      cook_time_minutes: item.readyInMinutes || 25,
      servings_default: item.servings || 1,
      meal_types: [defaultMealType],
      calories,
      protein_g,
      carbs_g,
      fat_g,
      fiber_g,
      calories_per_100g: Math.round(calories * factor),
      protein_per_100g: Math.round(protein_g * factor * 10) / 10,
      carbs_per_100g: Math.round(carbs_g * factor * 10) / 10,
      fat_per_100g: Math.round(fat_g * factor * 10) / 10,
      allergens,
      diet_tags: item.vegetarian ? ['vegetarian'] : [],
      equipment_needed: ['aragaz_plita'],
      ingredients,
      instructions_ro: instructions,
      instructions_en: instructions,
      source_name: 'Spoonacular API'
    };
  }
}

export const spoonacularService = new SpoonacularService();
