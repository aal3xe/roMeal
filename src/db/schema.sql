-- ============================================================================
-- roMeal (România) - PostgreSQL Database Schema (Phase 1 MVP + Entities Scaffolding)
-- Dialect: PostgreSQL 15+
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 2. ENUMS
CREATE TYPE meal_type_enum AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
CREATE TYPE activity_level_enum AS ENUM ('sedentary', 'light', 'moderate', 'active', 'very_active');
CREATE TYPE diet_goal_enum AS ENUM ('lose_weight', 'maintain', 'gain_muscle');
CREATE TYPE ingredient_category_enum AS ENUM (
    'legume_fructe', 
    'carne_peste', 
    'lactate_oua', 
    'panificatie_cereale', 
    'bacanie_condimente', 
    'altele'
);

-- ============================================================================
-- ENTITY: USERS & AUTH
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_users_email ON users(email);

-- ============================================================================
-- ENTITY: USER PROFILES (GDPR Compliant, Nutrition & Preferences)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    age SMALLINT NOT NULL CHECK (age BETWEEN 12 AND 120),
    weight_kg NUMERIC(5,2) NOT NULL CHECK (weight_kg > 20.0),
    height_cm NUMERIC(5,2) NOT NULL CHECK (height_cm > 80.0),
    gender CHAR(1) NOT NULL CHECK (gender IN ('m', 'f')),
    activity_level activity_level_enum NOT NULL DEFAULT 'moderate',
    goal diet_goal_enum NOT NULL DEFAULT 'maintain',
    
    -- Calorie & Macro targets
    calorie_target INTEGER NOT NULL CHECK (calorie_target BETWEEN 800 AND 6000),
    protein_target_g INTEGER NOT NULL CHECK (protein_target_g >= 0),
    carbs_target_g INTEGER NOT NULL CHECK (carbs_target_g >= 0),
    fat_target_g INTEGER NOT NULL CHECK (fat_target_g >= 0),
    
    -- Logistics & Household
    meals_per_day SMALLINT NOT NULL DEFAULT 3 CHECK (meals_per_day BETWEEN 2 AND 5),
    household_size SMALLINT NOT NULL DEFAULT 1 CHECK (household_size BETWEEN 1 AND 20),
    
    -- Dietary Constraints
    -- Allergies: Hard exclusion (e.g. ['gluten', 'lactoza', 'arahide_nuci', 'oua'])
    allergies JSONB DEFAULT '[]'::jsonb NOT NULL,
    -- Preferences: Soft avoidance/diet (e.g. ['vegetarian', 'fara_porc', 'low_carb'])
    preferences JSONB DEFAULT '[]'::jsonb NOT NULL,
    
    -- Cooking constraints
    cooking_time_max_minutes SMALLINT NOT NULL DEFAULT 45,
    kitchen_equipment JSONB DEFAULT '["aragaz_plita", "cuptor"]'::jsonb NOT NULL,
    
    -- Grocery & Budget (RON currency)
    preferred_store VARCHAR(80) DEFAULT 'Kaufland',
    weekly_budget_ron NUMERIC(8,2) DEFAULT 350.00 CHECK (weekly_budget_ron >= 0),
    
    -- GDPR & Sensitive Data Consent (Art. 9 GDPR for Health & Dietary Data)
    gdpr_consent BOOLEAN NOT NULL DEFAULT FALSE,
    gdpr_consent_date TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- ============================================================================
-- ENTITY: INGREDIENTS
-- ============================================================================
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ro VARCHAR(150) NOT NULL,
    name_en VARCHAR(150),
    category ingredient_category_enum NOT NULL DEFAULT 'bacanie_condimente',
    default_unit VARCHAR(20) DEFAULT 'g' NOT NULL,
    
    -- Nutrition per 100g standard
    calories_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    protein_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    carbs_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    fat_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    
    -- Allergen tags associated with this ingredient
    allergens JSONB DEFAULT '[]'::jsonb NOT NULL,
    
    -- Phase 2 reference pricing
    estimated_price_per_kg_ron NUMERIC(6,2),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_ingredients_name_ro ON ingredients(name_ro);
CREATE INDEX idx_ingredients_category ON ingredients(category);

-- ============================================================================
-- ENTITY: RECIPES
-- ============================================================================
CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    spoonacular_id BIGINT UNIQUE,
    title_ro VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    description_ro TEXT,
    image_url TEXT,
    prep_time_minutes SMALLINT DEFAULT 15 NOT NULL,
    cook_time_minutes SMALLINT DEFAULT 25 NOT NULL,
    servings_default SMALLINT DEFAULT 1 NOT NULL,
    
    -- Meal categories (breakfast, lunch, dinner, snack)
    meal_types JSONB NOT NULL DEFAULT '["lunch"]'::jsonb,
    
    -- Per-serving totals
    calories NUMERIC(6,2) NOT NULL,
    protein_g NUMERIC(6,2) NOT NULL,
    carbs_g NUMERIC(6,2) NOT NULL,
    fat_g NUMERIC(6,2) NOT NULL,
    fiber_g NUMERIC(6,2) DEFAULT 0 NOT NULL,
    
    -- Standardized per-100g nutrition
    calories_per_100g NUMERIC(6,2) NOT NULL,
    protein_per_100g NUMERIC(6,2) NOT NULL,
    carbs_per_100g NUMERIC(6,2) NOT NULL,
    fat_per_100g NUMERIC(6,2) NOT NULL,
    
    -- Search & constraint tags
    allergens JSONB DEFAULT '[]'::jsonb NOT NULL,
    diet_tags JSONB DEFAULT '[]'::jsonb NOT NULL,
    equipment_needed JSONB DEFAULT '["aragaz_plita"]'::jsonb NOT NULL,
    
    -- Step-by-step preparation steps
    instructions_ro JSONB DEFAULT '[]'::jsonb NOT NULL,
    
    source_name VARCHAR(100) DEFAULT 'roMeal',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_recipes_calories ON recipes(calories);
CREATE INDEX idx_recipes_allergens ON recipes USING gin (allergens);
CREATE INDEX idx_recipes_diet_tags ON recipes USING gin (diet_tags);

-- ============================================================================
-- ENTITY: RECIPE_INGREDIENTS (Many-to-Many with exact gram quantities)
-- ============================================================================
CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    amount_grams NUMERIC(7,2) NOT NULL CHECK (amount_grams > 0),
    unit_display VARCHAR(30) DEFAULT 'g' NOT NULL,
    notes VARCHAR(100),
    CONSTRAINT uq_recipe_ingredient UNIQUE (recipe_id, ingredient_id)
);

CREATE INDEX idx_recipe_ingredients_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_ingredient ON recipe_ingredients(ingredient_id);

-- ============================================================================
-- ENTITY: MEAL PLANS (7-day weekly schedule)
-- ============================================================================
CREATE TABLE IF NOT EXISTS meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    target_calories_daily INTEGER NOT NULL,
    total_estimated_cost_ron NUMERIC(8,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE INDEX idx_meal_plans_user_week ON meal_plans(user_id, week_start_date);

-- ============================================================================
-- ENTITY: MEAL PLAN ENTRIES (Day & Slot Assignment)
-- ============================================================================
CREATE TABLE IF NOT EXISTS meal_plan_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    meal_slot meal_type_enum NOT NULL,
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    servings NUMERIC(4,2) DEFAULT 1.0 NOT NULL,
    target_calories INTEGER NOT NULL
);

CREATE INDEX idx_meal_plan_entries_plan ON meal_plan_entries(meal_plan_id);

-- ============================================================================
-- ENTITY: SHOPPING LISTS & ITEMS (Aggregated Week Quantities)
-- ============================================================================
CREATE TABLE IF NOT EXISTS shopping_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID UNIQUE NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS shopping_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shopping_list_id UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    total_amount_grams NUMERIC(8,2) NOT NULL,
    is_checked BOOLEAN DEFAULT FALSE NOT NULL,
    notes TEXT
);

CREATE INDEX idx_shopping_list_items_list ON shopping_list_items(shopping_list_id);
