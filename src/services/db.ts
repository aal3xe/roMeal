import { User, UserProfile, Recipe, Ingredient, WeeklyMealPlan, Allergen, DietPreference } from '../types';
import { INITIAL_INGREDIENTS, INITIAL_RECIPES } from '../data/seedData';

const STORAGE_KEYS = {
  USERS: 'nutriplan_users_v1',
  PROFILES: 'nutriplan_profiles_v1',
  RECIPES: 'nutriplan_recipes_v1',
  INGREDIENTS: 'nutriplan_ingredients_v1',
  MEAL_PLANS: 'nutriplan_meal_plans_v1',
  CURRENT_USER_ID: 'nutriplan_current_user_id_v1',
  SPOONACULAR_KEY: 'nutriplan_spoonacular_api_key',
  HAS_COMPLETED_PROFILING: 'nutriplan_has_completed_profiling_v1'
};

// Seed default demo user and profile
const DEFAULT_USER: User = {
  id: 'usr-demo-1',
  email: 'alex3.adrian@gmail.com',
  name: 'Alex Adrian',
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
  preferred_store: 'Kaufland',
  weekly_budget_ron: 380,
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

  setCurrentUser(userId: string) {
    this.currentUserId = userId;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
  }

  signUp(email: string, name: string, passwordHashMock: string): { user: User; profile: UserProfile } {
    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('Un cont cu această adresă de email există deja.');
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: email.trim(),
      name: name.trim() || email.split('@')[0],
      created_at: new Date().toISOString()
    };

    const newProfile: UserProfile = {
      id: `prof-${Date.now()}`,
      user_id: newUser.id,
      age: 30,
      weight_kg: 70,
      height_cm: 175,
      gender: 'm',
      activity_level: 'moderate',
      goal: 'maintain',
      calorie_target: 2000,
      protein_target_g: 120,
      carbs_target_g: 220,
      fat_target_g: 65,
      meals_per_day: 3,
      household_size: 1,
      allergies: [],
      preferences: [],
      cooking_time_max_minutes: 30,
      kitchen_equipment: ['aragaz_plita', 'cuptor'],
      preferred_store: 'Kaufland',
      weekly_budget_ron: 300,
      gdpr_consent: true,
      gdpr_consent_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    this.users.push(newUser);
    this.profiles.push(newProfile);
    this.currentUserId = newUser.id;

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newUser.id);

    return { user: newUser, profile: newProfile };
  }

  login(email: string): { user: User; profile: UserProfile } {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Automatically register for seamless testing if doesn't exist
      return this.signUp(email, email.split('@')[0], 'mock_hash');
    }

    this.currentUserId = user.id;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);

    let profile = this.profiles.find(p => p.user_id === user.id);
    if (!profile) {
      profile = {
        ...DEFAULT_PROFILE,
        id: `prof-${Date.now()}`,
        user_id: user.id
      };
      this.profiles.push(profile);
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
    }

    return { user, profile };
  }

  logout() {
    this.currentUserId = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  }

  // --- Profile methods ---
  updateProfile(profileData: Partial<UserProfile>): UserProfile {
    if (!this.currentUserId) throw new Error('Nu există niciun utilizator autentificat.');

    let profileIndex = this.profiles.findIndex(p => p.user_id === this.currentUserId);
    if (profileIndex === -1) {
      const newProf: UserProfile = {
        ...DEFAULT_PROFILE,
        ...profileData,
        id: `prof-${Date.now()}`,
        user_id: this.currentUserId,
        updated_at: new Date().toISOString()
      };
      this.profiles.push(newProf);
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
      return newProf;
    }

    const updated = {
      ...this.profiles[profileIndex],
      ...profileData,
      updated_at: new Date().toISOString()
    };
    this.profiles[profileIndex] = updated;
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(this.profiles));
    return updated;
  }

  // --- Recipe & Ingredient methods ---
  getRecipes(): Recipe[] {
    return [...this.recipes];
  }

  getRecipeById(id: string): Recipe | undefined {
    return this.recipes.find(r => r.id === id);
  }

  getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  addRecipe(recipe: Recipe) {
    const existingIndex = this.recipes.findIndex(r => r.id === recipe.id || (r.spoonacular_id && r.spoonacular_id === recipe.spoonacular_id));
    if (existingIndex >= 0) {
      this.recipes[existingIndex] = recipe;
    } else {
      this.recipes.push(recipe);
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
