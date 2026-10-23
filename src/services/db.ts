import { User, UserProfile, Recipe, Ingredient, WeeklyMealPlan, Allergen, DietPreference } from '../types';
import { INITIAL_INGREDIENTS, INITIAL_RECIPES } from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'nutriplan_users_v2',
  PROFILES: 'nutriplan_profiles_v2',
  RECIPES: 'nutriplan_recipes_v2',
  INGREDIENTS: 'nutriplan_ingredients_v2',
  MEAL_PLANS: 'nutriplan_meal_plans_v2',
  CURRENT_USER_ID: 'nutriplan_current_user_id_v2',
  SPOONACULAR_KEY: 'nutriplan_spoonacular_api_key',
  HAS_COMPLETED_PROFILING: 'nutriplan_has_completed_profiling_v2'
};

// Seed default demo user and profile
const DEFAULT_USER: User = {
  id: 'usr-demo-1',
  email: 'guest@romeal.app',
  name: 'Guest User',
  created_at: new Date().toISOString()
};

const DEFAULT_PROFILE: UserProfile = {
  id: 'prof-demo-1',
  user_id: 'usr-demo-1',
  age: 32,
  weight_kg: 76,
  height_cm: 180,
  gender: 'm',
  activity_level: 'moderate',
  goal: 'maintain',
  calorie_target: 2150,
  protein_target_g: 135,
  carbs_target_g: 240,
  fat_target_g: 70,
  meals_per_day: 3,
  household_size: 2,
  allergies: [], // no hard allergies by default
  preferences: ['bogata_in_proteine'],
  cooking_time_max_minutes: 35,
  kitchen_equipment: ['aragaz_plita', 'cuptor', 'airfryer'],
  preferred_store: 'Whole Foods Market',
  weekly_budget_ron: 120,
  gdpr_consent: true,
  gdpr_consent_date: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

class DatabaseService {
  private users: User[] = [];
  private profiles: UserProfile[] = [];
  private recipes: Recipe[] = [];
  private ingredients: Ingredient[] = [];
  private mealPlans: WeeklyMealPlan[] = [];
  private currentUserId: string | null = null;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    try {
      // Purge legacy Romanian v1 keys so old Romanian cache does not persist in the user's browser
      [
        'nutriplan_users_v1', 
        'nutriplan_profiles_v1', 
        'nutriplan_recipes_v1', 
        'nutriplan_ingredients_v1', 
        'nutriplan_meal_plans_v1', 
        'nutriplan_current_user_id_v1', 
        'nutriplan_has_completed_profiling_v1'
      ].forEach(k => {
        try { localStorage.removeItem(k); } catch {}
      });

      // Users
      const storedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (storedUsers) {
        this.users = JSON.parse(storedUsers);
      } else {
        this.users = [DEFAULT_USER];
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
      }

      // Profiles
      const storedProfiles = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (storedProfiles) {
        this.profiles = JSON.parse(storedProfiles);
      } else {
        this.profiles = [DEFAULT_PROFILE];
        localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
      }

      // Ingredients
      const storedIngs = localStorage.getItem(STORAGE_KEYS.INGREDIENTS);
      if (storedIngs) {
        const loaded: Ingredient[] = JSON.parse(storedIngs);
        const existingIds = new Set(loaded.map(i => i.id));
        const missing = INITIAL_INGREDIENTS.filter(i => !existingIds.has(i.id));
        this.ingredients = [...loaded, ...missing];
        if (missing.length > 0) {
          localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(this.ingredients));
        }
      } else {
        this.ingredients = INITIAL_INGREDIENTS;
        localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(this.ingredients));
      }

      // Recipes
      const storedRecipes = localStorage.getItem(STORAGE_KEYS.RECIPES);
      if (storedRecipes) {
        const loaded: Recipe[] = JSON.parse(storedRecipes);
        const existingIds = new Set(loaded.map(r => r.id));
        const missing = INITIAL_RECIPES.filter(r => !existingIds.has(r.id));
        this.recipes = [...loaded, ...missing];
        if (missing.length > 0) {
          localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(this.recipes));
        }
      } else {
        this.recipes = INITIAL_RECIPES;
        localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(this.recipes));
      }

      // Meal Plans
      const storedPlans = localStorage.getItem(STORAGE_KEYS.MEAL_PLANS);
      if (storedPlans) {
        this.mealPlans = JSON.parse(storedPlans);
      }

      // Current user
      const storedCurrent = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      this.currentUserId = storedCurrent || this.users[0]?.id || null;
      if (this.currentUserId) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, this.currentUserId);
      }
    } catch (e) {
      console.error('Error initializing local database:', e);
      this.users = [DEFAULT_USER];
      this.profiles = [DEFAULT_PROFILE];
      this.recipes = INITIAL_RECIPES;
      this.ingredients = INITIAL_INGREDIENTS;
      this.currentUserId = DEFAULT_USER.id;
    }
  }

  // --- Auth methods ---
  getCurrentUser(): User | null {
    return this.users.find(u => u.id === this.currentUserId) || null;
  }

  getCurrentProfile(): UserProfile | null {
    if (!this.currentUserId) return null;
    return this.profiles.find(p => p.user_id === this.currentUserId) || null;
  }

  login(email: string): { user: User; profile: UserProfile } {
    let user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Auto-create user for demo convenience if doesn't exist
      user = {
        id: `usr-${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split('@')[0],
        created_at: new Date().toISOString()
      };
      this.users.push(user);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
    }

    let profile = this.profiles.find(p => p.user_id === user!.id);
    if (!profile) {
      profile = {
        ...DEFAULT_PROFILE,
        id: `prof-${Date.now()}`,
        user_id: user.id
      };
      this.profiles.push(profile);
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
    }

    this.currentUserId = user.id;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, this.currentUserId);

    return { user, profile };
  }

  signUp(email: string, name: string, passwordHash?: string): { user: User; profile: UserProfile } {
    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return this.login(email);
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      created_at: new Date().toISOString()
    };
    this.users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));

    const newProfile: UserProfile = {
      ...DEFAULT_PROFILE,
      id: `prof-${Date.now()}`,
      user_id: newUser.id
    };
    this.profiles.push(newProfile);
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));

    this.currentUserId = newUser.id;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, this.currentUserId);

    return { user: newUser, profile: newProfile };
  }

  logout() {
    this.currentUserId = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  }

  // --- Profile methods ---
  updateProfile(updated: Partial<UserProfile>): UserProfile {
    const current = this.getCurrentProfile();
    if (!current) throw new Error('No active user profile found');

    const merged: UserProfile = {
      ...current,
      ...updated,
      updated_at: new Date().toISOString()
    };

    const index = this.profiles.findIndex(p => p.id === current.id);
    if (index >= 0) {
      this.profiles[index] = merged;
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
    }
    return merged;
  }

  // --- Recipe & Ingredient methods ---
  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getIngredientById(id: string): Ingredient | undefined {
    return this.ingredients.find(i => i.id === id);
  }

  addRecipe(recipe: Recipe) {
    const existingIdx = this.recipes.findIndex(r => r.id === recipe.id || (r.spoonacular_id && r.spoonacular_id === recipe.spoonacular_id));
    if (existingIdx >= 0) {
      this.recipes[existingIdx] = recipe;
    } else {
      this.recipes.unshift(recipe);
    }
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(this.recipes));
  }

  addRecipes(newRecipes: Recipe[]) {
    newRecipes.forEach(r => this.addRecipe(r));
  }

  filterRecipes(options: {
    mealType?: Recipe['meal_types'][0];
    excludedAllergens?: Allergen[];
    dietPreferences?: DietPreference[];
    maxCookingTime?: number;
    equipmentOwned?: string[];
  }): Recipe[] {
    return this.recipes.filter(recipe => {
      // 1. Meal type check
      if (options.mealType && !recipe.meal_types.includes(options.mealType)) {
        return false;
      }

      // 2. HARD ALLERGEN EXCLUSION: If recipe contains any excluded allergen, discard immediately
      if (options.excludedAllergens && options.excludedAllergens.length > 0) {
        const hasAllergen = recipe.allergens.some(a => options.excludedAllergens!.includes(a));
        if (hasAllergen) return false;
      }

      // 3. Max cooking time check
      if (options.maxCookingTime && (recipe.prep_time_minutes + recipe.cook_time_minutes) > (options.maxCookingTime + 15)) {
        return false;
      }

      return true;
    });
  }

  // --- Meal Plan methods ---
  saveMealPlan(plan: WeeklyMealPlan) {
    const index = this.mealPlans.findIndex(p => p.id === plan.id || (p.user_id === plan.user_id && p.week_start_date === plan.week_start_date));
    if (index >= 0) {
      this.mealPlans[index] = plan;
    } else {
      this.mealPlans.push(plan);
    }
    localStorage.setItem(STORAGE_KEYS.MEAL_PLANS, JSON.stringify(this.mealPlans));
  }

  getMealPlanForCurrentWeek(userId: string): WeeklyMealPlan | null {
    return this.mealPlans.find(p => p.user_id === userId) || null;
  }

  // --- Settings / Spoonacular key ---
  getSpoonacularApiKey(): string {
    const stored = localStorage.getItem(STORAGE_KEYS.SPOONACULAR_KEY);
    if (stored && stored.trim().length > 0) {
      return stored.trim();
    }
    const envKey = (import.meta.env.VITE_SPOONACULAR_API_KEY as string) || '';
    return envKey.trim();
  }

  setSpoonacularApiKey(key: string) {
    localStorage.setItem(STORAGE_KEYS.SPOONACULAR_KEY, key.trim());
  }

  hasCompletedProfiling(): boolean {
    return localStorage.getItem(STORAGE_KEYS.HAS_COMPLETED_PROFILING) === 'true';
  }

  setHasCompletedProfiling(completed: boolean) {
    localStorage.setItem(STORAGE_KEYS.HAS_COMPLETED_PROFILING, completed ? 'true' : 'false');
  }

  resetToDefaults() {
    this.recipes = INITIAL_RECIPES;
    this.ingredients = INITIAL_INGREDIENTS;
    this.mealPlans = [];
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify(this.recipes));
    localStorage.setItem(STORAGE_KEYS.INGREDIENTS, JSON.stringify(this.ingredients));
    localStorage.removeItem(STORAGE_KEYS.MEAL_PLANS);
    localStorage.removeItem(STORAGE_KEYS.HAS_COMPLETED_PROFILING);
  }
}

export const db = new DatabaseService();
