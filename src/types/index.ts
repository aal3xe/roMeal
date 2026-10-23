export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type DietGoal = 'lose_weight' | 'maintain' | 'gain_muscle';

export type Allergen = 
  | 'gluten'
  | 'lactoza'
  | 'arahide_nuci'
  | 'oua'
  | 'peste_fructe_de_mare'
  | 'soia'
  | 'mustar'
  | 'telina'
  | 'susan';

export type DietPreference = 
  | 'vegetarian'
  | 'vegan'
  | 'pescetarian'
  | 'fara_porc'
  | 'low_carb'
  | 'fara_zahar_adaugat'
  | 'bogata_in_proteine';

export type KitchenEquipment = 
  | 'cuptor'
  | 'aragaz_plita'
  | 'airfryer'
  | 'blender'
  | 'multicooker'
  | 'gratar'
  | 'cantar_bucatarie';

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  age: number;
  weight_kg: number;
  height_cm: number;
  gender: 'm' | 'f';
  activity_level: ActivityLevel;
  goal: DietGoal;
  calorie_target: number;
  protein_target_g: number;
  carbs_target_g: number;
  fat_target_g: number;
  meals_per_day: 2 | 3 | 4 | 5;
  household_size: number;
  allergies: Allergen[]; // Hard exclusions
  preferences: DietPreference[]; // Soft preferences
  cooking_time_max_minutes: number;
  kitchen_equipment: KitchenEquipment[];
  preferred_store: string;
  weekly_budget_ron: number;
  gdpr_consent: boolean;
  gdpr_consent_date?: string;
  created_at: string;
  updated_at: string;
}

export interface Ingredient {
  id: string;
  name_ro: string;
  name_en: string;
  category: 'legume_fructe' | 'carne_peste' | 'lactate_oua' | 'panificatie_cereale' | 'bacanie_condimente' | 'altele';
  default_unit: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  allergens: Allergen[];
  estimated_price_per_kg_ron?: number; // Pre-configured baseline for future Phase 2 linkage
  cooked_yield_ratio?: number; // Ratio of cooked weight / raw weight (e.g. 0.75 for chicken, 2.9 for rice)
}

export interface RecipeIngredient {
  id: string;
  recipe_id: string;
  ingredient_id: string;
  ingredient: Ingredient;
  amount_grams: number; // Raw / Negătit (la cântar înainte de gătire)
  amount_grams_cooked?: number; // Cooked / În farfurie (după preparare termică)
  cooked_state_label?: string; // ex: "fript", "fiert", "copt", "crud proaspăt"
  unit_display: string;
  notes?: string;
}

export interface Recipe {
  id: string;
  spoonacular_id?: number;
  title_ro: string;
  title_en: string;
  description_ro: string;
  image_url: string;
  prep_time_minutes: number;
  cook_time_minutes: number;
  servings_default: number;
  meal_types: MealType[];
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  total_weight_raw_grams?: number; // Total gramaj ingrediente crude
  total_weight_cooked_grams?: number; // Total gramaj mâncare gătită pusă în farfurie
  allergens: Allergen[];
  diet_tags: DietPreference[];
  equipment_needed: KitchenEquipment[];
  ingredients: RecipeIngredient[];
  instructions_ro: string[];
  instructions_en?: string[];
  description_en?: string;
  source_name?: string;
}

export interface MealPlanEntry {
  id: string;
  day_of_week: number; // 0 = Monday, 6 = Sunday
  meal_slot: MealType;
  recipe_id: string;
  recipe: Recipe;
  servings: number;
  target_calories: number;
}

export interface DayPlan {
  day_index: number;
  day_name_ro: string;
  day_name_en?: string;
  date_label: string;
  entries: MealPlanEntry[];
  total_calories: number;
  total_protein: number;
  total_carbs: number;
  total_fat: number;
}

export interface WeeklyMealPlan {
  id: string;
  user_id: string;
  week_start_date: string;
  days: DayPlan[];
  created_at: string;
}

export interface AggregatedShoppingItem {
  ingredient_id: string;
  name_ro: string;
  name_en?: string;
  category: Ingredient['category'];
  total_grams: number;
  display_amount: string;
  recipe_appearances: { recipe_title: string; day_name: string; amount_grams: number }[];
  checked: boolean;
  allergens: Allergen[];
  estimated_cost_ron?: number; // for Phase 2 readiness
}
