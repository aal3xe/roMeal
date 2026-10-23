import React, { useState } from 'react';
import { Database, Copy, Check, FileCode, Server, Layers, ShieldCheck } from 'lucide-react';

export const DatabaseSchemaView: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const schemaSQL = `-- ============================================================================
-- roMeal - PostgreSQL Database Schema (Phase 1 MVP + Foundation)
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 1. ENUMS
CREATE TYPE meal_type_enum AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
CREATE TYPE activity_level_enum AS ENUM ('sedentary', 'light', 'moderate', 'active', 'very_active');
CREATE TYPE diet_goal_enum AS ENUM ('lose_weight', 'maintain', 'gain_muscle');

-- 2. USERS (Authentication & Identity)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email CITEXT UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(120) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. USER PROFILES (GDPR Compliant Nutrition Targets, Allergies, Budget)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    age SMALLINT NOT NULL CHECK (age BETWEEN 12 AND 120),
    weight_kg NUMERIC(5,2) NOT NULL CHECK (weight_kg > 20.0),
    height_cm NUMERIC(5,2) NOT NULL CHECK (height_cm > 80.0),
    gender CHAR(1) NOT NULL CHECK (gender IN ('m', 'f')),
    activity_level activity_level_enum NOT NULL DEFAULT 'moderate',
    goal diet_goal_enum NOT NULL DEFAULT 'maintain',
    calorie_target INTEGER NOT NULL CHECK (calorie_target BETWEEN 800 AND 6000),
    protein_target_g INTEGER NOT NULL CHECK (protein_target_g >= 0),
    carbs_target_g INTEGER NOT NULL CHECK (carbs_target_g >= 0),
    fat_target_g INTEGER NOT NULL CHECK (fat_target_g >= 0),
    meals_per_day SMALLINT NOT NULL DEFAULT 3 CHECK (meals_per_day BETWEEN 2 AND 5),
    household_size SMALLINT NOT NULL DEFAULT 1 CHECK (household_size BETWEEN 1 AND 20),
    allergies JSONB DEFAULT '[]'::jsonb NOT NULL,      -- Hard exclusions
    preferences JSONB DEFAULT '[]'::jsonb NOT NULL,    -- Soft avoidance
    cooking_time_max_minutes SMALLINT NOT NULL DEFAULT 45,
    kitchen_equipment JSONB DEFAULT '["stove_top"]'::jsonb NOT NULL,
    preferred_store VARCHAR(80) DEFAULT 'Kaufland',
    weekly_budget_ron NUMERIC(8,2) DEFAULT 350.00 CHECK (weekly_budget_ron >= 0),
    gdpr_consent BOOLEAN NOT NULL DEFAULT FALSE,
    gdpr_consent_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 4. INGREDIENTS (Normalized catalog with 100g standard nutrition)
CREATE TABLE ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_ro VARCHAR(150) NOT NULL,
    name_en VARCHAR(150),
    category VARCHAR(50) NOT NULL,
    default_unit VARCHAR(20) DEFAULT 'g' NOT NULL,
    calories_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    protein_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    carbs_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    fat_per_100g NUMERIC(6,2) NOT NULL DEFAULT 0,
    allergens JSONB DEFAULT '[]'::jsonb NOT NULL,
    estimated_price_per_kg_ron NUMERIC(6,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 5. RECIPES (Integrated with Spoonacular / Edamam)
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    spoonacular_id BIGINT UNIQUE,
    title_ro VARCHAR(200) NOT NULL,
    title_en VARCHAR(200),
    description_ro TEXT,
    image_url TEXT,
    prep_time_minutes SMALLINT DEFAULT 15 NOT NULL,
    cook_time_minutes SMALLINT DEFAULT 25 NOT NULL,
    servings_default SMALLINT DEFAULT 1 NOT NULL,
    meal_types JSONB NOT NULL DEFAULT '["lunch"]'::jsonb,
    calories NUMERIC(6,2) NOT NULL,
    protein_g NUMERIC(6,2) NOT NULL,
    carbs_g NUMERIC(6,2) NOT NULL,
    fat_g NUMERIC(6,2) NOT NULL,
    fiber_g NUMERIC(6,2) DEFAULT 0 NOT NULL,
    calories_per_100g NUMERIC(6,2) NOT NULL,
    protein_per_100g NUMERIC(6,2) NOT NULL,
    carbs_per_100g NUMERIC(6,2) NOT NULL,
    fat_per_100g NUMERIC(6,2) NOT NULL,
    allergens JSONB DEFAULT '[]'::jsonb NOT NULL,
    diet_tags JSONB DEFAULT '[]'::jsonb NOT NULL,
    equipment_needed JSONB DEFAULT '["stove_top"]'::jsonb NOT NULL,
    instructions_ro JSONB DEFAULT '[]'::jsonb NOT NULL,
    source_name VARCHAR(100) DEFAULT 'roMeal'
);

-- 6. RECIPE_INGREDIENTS (Junction table with exact grams)
CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    amount_grams NUMERIC(7,2) NOT NULL CHECK (amount_grams > 0),
    unit_display VARCHAR(30) DEFAULT 'g' NOT NULL,
    notes VARCHAR(100),
    CONSTRAINT uq_recipe_ingredient UNIQUE (recipe_id, ingredient_id)
);

-- 7. MEAL_PLANS & ENTRIES (Weekly schedules)
CREATE TABLE meal_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_start_date DATE NOT NULL,
    target_calories_daily INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE meal_plan_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    meal_plan_id UUID NOT NULL REFERENCES meal_plans(id) ON DELETE CASCADE,
    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    meal_slot meal_type_enum NOT NULL,
    recipe_id UUID NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
    servings NUMERIC(4,2) DEFAULT 1.0 NOT NULL,
    target_calories INTEGER NOT NULL
);`;

  const copySQL = () => {
    navigator.clipboard.writeText(schemaSQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#111722] via-[#141d2a] to-[#0f151f] rounded-3xl border border-amber-500/20 shadow-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-black bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-0.5 rounded-full mb-2">
            <Database className="w-3.5 h-3.5 text-amber-400" />
            PostgreSQL 15+ & FastAPI Scaffolding
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Database Schema (Phase 1 MVP)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Production-ready PostgreSQL DDL definitions: users, user_profiles, recipes, ingredients, recipe_ingredients, meal_plans.
          </p>
        </div>

        <button
          onClick={copySQL}
          className="flex items-center justify-center gap-2 h-11 px-5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] text-slate-950 font-black rounded-xl text-xs transition-all shadow-md shadow-amber-500/20 self-stretch sm:self-auto w-full sm:w-auto shrink-0"
        >
          {copied ? <Check className="w-4 h-4 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
          <span className="whitespace-nowrap">{copied ? 'Copied to clipboard!' : 'Copy SQL DDL'}</span>
        </button>
      </div>

      {/* Entity Cards Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>users & user_profiles</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Stores biometric data, BMR equations, macronutrient targets, strict allergen exclusions, and GDPR consent (Art. 9).
          </p>
        </div>

        <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span>recipes & ingredients</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Many-to-Many relation via <code>recipe_ingredients</code> with exact gram weights (raw scale & cooked on plate).
          </p>
        </div>

        <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md space-y-2">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Server className="w-4 h-4 text-amber-400" />
            <span>meal_plans & shopping_lists</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generated by the greedy planner engine. Weekly aggregation compiles grocery aisle totals ready for store export.
          </p>
        </div>
      </div>

      {/* SQL Code Box */}
      <div className="bg-[#0a0e14] text-slate-200 rounded-3xl p-5 font-mono text-xs overflow-x-auto border border-amber-500/20 shadow-2xl leading-relaxed">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-400">
          <span className="text-amber-400 font-bold">src/db/schema.sql</span>
          <span>PostgreSQL 15</span>
        </div>
        <pre>{schemaSQL}</pre>
      </div>
    </div>
  );
};
