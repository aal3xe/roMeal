import React, { useState } from 'react';
import { Search, Flame, Clock, Eye, Sparkles, Filter, Utensils, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Recipe, MealType, Allergen } from '../types';
import { db } from '../services/db';
import { getRecipeTotalPlateWeight } from '../services/weightConverter';
import { spoonacularService } from '../services/spoonacular';

interface RecipeCatalogViewProps {
  onOpenRecipe: (recipe: Recipe) => void;
  onOpenSettings: () => void;
}

export const RecipeCatalogView: React.FC<RecipeCatalogViewProps> = ({
  onOpenRecipe,
  onOpenSettings
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedAllergenFree, setSelectedAllergenFree] = useState<string>('all');
  const [isFetchingSpoonacular, setIsFetchingSpoonacular] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const hasApiKey = !!db.getSpoonacularApiKey();
  const recipes = db.getRecipes();

  const handleFetchSpoonacular = async () => {
    if (isFetchingSpoonacular) return;
    setIsFetchingSpoonacular(true);
    setFeedbackMessage(null);

    try {
      const type = selectedType !== 'all' ? (selectedType as MealType) : undefined;
      const res = await spoonacularService.searchRecipes({
        mealType: type || 'lunch',
        query: searchTerm || undefined,
        number: 4
      });

      if (res.source === 'live_api') {
        setFeedbackMessage(`Successfully imported ${res.recipes.length} recipes from Spoonacular!`);
      } else {
        setFeedbackMessage('Loaded recipes from nutritional catalog.');
      }
    } catch {
      setFeedbackMessage('Could not reach Spoonacular API.');
    } finally {
      setIsFetchingSpoonacular(false);
      setTimeout(() => setFeedbackMessage(null), 4000);
    }
  };

  const filtered = recipes.filter(r => {
    // Search
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = r.title_ro.toLowerCase().includes(q) || r.title_en.toLowerCase().includes(q);
      const matchIng = r.ingredients.some(i => 
        (i.ingredient?.name_ro || '').toLowerCase().includes(q) || 
        (i.ingredient?.name_en || '').toLowerCase().includes(q)
      );
      if (!matchTitle && !matchIng) return false;
    }

    // Type
    if (selectedType !== 'all') {
      if (!r.meal_types.includes(selectedType as MealType)) return false;
    }

    // Allergen Free
    if (selectedAllergenFree !== 'all') {
      if (r.allergens.includes(selectedAllergenFree as Allergen)) return false;
    }

    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#111722] via-[#141d2a] to-[#0f151f] rounded-3xl border border-amber-500/20 shadow-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-black bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Nutrition per 100g & Plate Portions
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Recipe Catalog & Nutritional Values
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Explore recipes calibrated with exact raw scale weight (pre-cooking) and final cooked weight on your plate.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {hasApiKey ? (
            <button
              onClick={handleFetchSpoonacular}
              disabled={isFetchingSpoonacular}
              className="flex items-center justify-center gap-2 h-11 px-4 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-black transition-all active:scale-[0.98] disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 text-emerald-400 ${isFetchingSpoonacular ? 'animate-spin' : ''}`} />
              <span>{isFetchingSpoonacular ? 'Downloading Spoonacular...' : 'Fetch Spoonacular Recipes'}</span>
            </button>
          ) : null}

          <button
            onClick={onOpenSettings}
            className="flex items-center justify-center gap-2 h-11 px-4 border border-amber-400/30 bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 active:scale-[0.98] text-amber-300 rounded-xl text-xs font-black transition-all shadow-sm self-stretch sm:self-auto w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">
              {hasApiKey ? 'API Settings (Connected ✓)' : 'Configure Spoonacular API'}
            </span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-lg animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search chicken, salmon, oats..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-3 text-xs bg-[#141b27] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
        </div>

        {/* Meal Type Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            Meal:
          </span>
          {[
            { id: 'all', label: 'All' },
            { id: 'breakfast', label: 'Breakfast' },
            { id: 'lunch', label: 'Lunch' },
            { id: 'dinner', label: 'Dinner' },
            { id: 'snack', label: 'Snack' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`h-9 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                selectedType === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                  : 'bg-[#141b27] text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Allergen Free Filter */}
        <div className="w-full lg:w-auto">
          <select
            value={selectedAllergenFree}
            onChange={e => setSelectedAllergenFree(e.target.value)}
            className="w-full lg:w-auto h-11 px-3.5 text-xs bg-[#141b27] border border-white/10 rounded-xl font-bold text-slate-200 focus:outline-hidden focus:border-amber-400 transition-all cursor-pointer"
          >
            <option value="all">All Dietary Options</option>
            <option value="gluten">Gluten-Free</option>
            <option value="lactoza">Dairy-Free</option>
            <option value="oua">Egg-Free</option>
            <option value="peste_fructe_de_mare">Fish & Seafood Free</option>
            <option value="arahide_nuci">Nut & Peanut Free</option>
          </select>
        </div>
      </div>

      {/* Grid of recipes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(recipe => {
          const totals = getRecipeTotalPlateWeight(recipe);
          const title = recipe.title_en || recipe.title_ro;

          return (
            <div
              key={recipe.id}
              className="bg-gradient-to-b from-[#131a26] to-[#0f141f] rounded-3xl border border-white/10 hover:border-amber-500/40 overflow-hidden shadow-lg transition-all flex flex-col group cursor-pointer"
              onClick={() => onOpenRecipe(recipe)}
            >
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img
                  src={recipe.image_url}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f141f] via-black/30 to-transparent" />
                
                <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white font-black text-xs drop-shadow-md bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{recipe.calories} kcal</span>
                  <span className="text-[10px] text-slate-300">({recipe.calories_per_100g} kcal/100g)</span>
                </div>

                <div className="absolute top-2.5 right-3 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  <span>{recipe.prep_time_minutes + recipe.cook_time_minutes}m</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <h3 className="font-extrabold text-white text-sm leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[11px] font-bold">
                    <span className="bg-blue-950/60 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-md">P: {recipe.protein_g}g</span>
                    <span className="bg-amber-950/60 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-md">C: {recipe.carbs_g}g</span>
                    <span className="bg-rose-950/60 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-md">F: {recipe.fat_g}g</span>
                  </div>

                  {/* Dual Weight Badge */}
                  <div className="p-2 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <Utensils className="w-3 h-3 text-emerald-400" />
                      <span>Plate: ~{totals.cookedTotalGrams}g</span>
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      (Raw: {totals.rawTotalGrams}g)
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:text-amber-300">
                  <span>View recipe & prep details</span>
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
