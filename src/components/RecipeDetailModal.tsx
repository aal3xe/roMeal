import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  Flame, 
  ShieldAlert, 
  ChefHat, 
  Scale, 
  Utensils, 
  Plus, 
  Minus,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Recipe, Allergen } from '../types';
import { getIngredientWeights, getRecipeTotalPlateWeight } from '../services/weightConverter';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  householdSize: number;
}

const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: 'Gluten',
  lactoza: 'Lactoză',
  arahide_nuci: 'Arahide/Nuci',
  oua: 'Ouă',
  peste_fructe_de_mare: 'Pește/Fructe de mare',
  soia: 'Soia',
  mustar: 'Muștar',
  telina: 'Țelină',
  susan: 'Susan'
};

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  householdSize = 1
}) => {
  const [servings, setServings] = useState<number>(householdSize || 1);
  const [weightViewMode, setWeightViewMode] = useState<'both' | 'cooked' | 'raw'>('both');
  const [activeTab, setActiveTab] = useState<'all' | 'ingredients' | 'steps' | 'nutrition'>('all');

  // Sync default servings when recipe or householdSize changes
  useEffect(() => {
    if (householdSize) {
      setServings(householdSize);
    }
  }, [householdSize, recipe?.id]);

  // Lock body scroll while modal is active & listen to Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  const scale = servings / (recipe.servings_default || 1);
  const totals = getRecipeTotalPlateWeight(recipe);
  const scaledRawTotal = Math.round(totals.rawTotalGrams * scale);
  const scaledCookedTotal = Math.round(totals.cookedTotalGrams * scale);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 overflow-hidden transition-all duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-[#0f141d] text-slate-100 rounded-t-[32px] sm:rounded-3xl border border-white/10 shadow-2xl w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden animate-sheet-up relative"
      >
        {/* Mobile Pull-down Touch Indicator */}
        <div 
          onClick={onClose}
          className="w-full flex sm:hidden items-center justify-center pt-2.5 pb-1 cursor-pointer bg-[#0a0e16]"
          title="Apasă sau trage pentru a închide"
        >
          <div className="w-12 h-1.5 rounded-full bg-white/30" />
        </div>

        {/* Floating Always-Visible Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-10 h-10 rounded-full bg-black/80 hover:bg-black active:scale-90 text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/20 shadow-2xl group"
          aria-label="Închide rețeta"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </button>

        {/* Hero image header */}
        <div className="relative h-44 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={recipe.image_url}
            alt={recipe.title_ro}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f141d] via-[#0f141d]/50 to-transparent" />

          <div className="absolute bottom-3 left-4 right-14 sm:left-6 sm:right-16">
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                {recipe.meal_types.map(m => m === 'breakfast' ? 'Mic Dejun' : m === 'lunch' ? 'Prânz' : m === 'dinner' ? 'Cină' : 'Gustare').join(', ')}
              </span>
              <span className="bg-amber-500/25 text-amber-300 border border-amber-500/40 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-md flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {recipe.prep_time_minutes + recipe.cook_time_minutes} min
              </span>
              <span className="bg-black/60 text-slate-200 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-md">
                🍽️ ~{scaledCookedTotal}g în farfurie
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black font-heading leading-tight text-white drop-shadow-md line-clamp-2">
              {recipe.title_ro}
            </h2>
          </div>
        </div>

        {/* Segmented Section Switcher for Mobile & Desktop */}
        <div className="px-4 sm:px-6 pt-3 pb-1 border-b border-white/10 bg-[#0d121a] shrink-0">
          <div className="flex items-center gap-1 p-1 bg-black/50 rounded-xl border border-white/10 text-xs font-bold overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                activeTab === 'all' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tot</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ingredients')}
              className={`flex-1 min-w-[105px] py-1.5 px-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                activeTab === 'ingredients' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Ingrediente</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('steps')}
              className={`flex-1 min-w-[105px] py-1.5 px-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                activeTab === 'steps' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Instrucțiuni</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('nutrition')}
              className={`flex-1 min-w-[85px] py-1.5 px-2 rounded-lg text-center transition-all flex items-center justify-center gap-1 ${
                activeTab === 'nutrition' 
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Nutriție</span>
            </button>
          </div>
        </div>

        {/* SINGLE CLEAN SCROLL CONTAINER - NO MULTIPLE SCROLLBARS */}
        <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-none p-4 sm:p-6 space-y-5">
          {/* Allergen Warning Banner if present */}
          {recipe.allergens && recipe.allergens.length > 0 && (
            <div className="flex items-center gap-2.5 p-3 bg-rose-950/40 border border-rose-500/40 rounded-2xl text-xs text-rose-200">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>
                <strong>Alergeni conținuți:</strong>{' '}
                {recipe.allergens.map(a => ALLERGEN_LABELS[a] || a).join(', ')}
              </span>
            </div>
          )}

          {/* Description */}
          {recipe.description_ro && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic bg-white/5 p-3 rounded-2xl border border-white/5">
              "{recipe.description_ro}"
            </p>
          )}

          {/* Portions Scaler & Live Plate Weight Banner (Shown in 'all' or 'ingredients') */}
          {(activeTab === 'all' || activeTab === 'ingredients') && (
            <div className="p-3.5 sm:p-4 bg-gradient-to-r from-zinc-900 to-[#19212a] border border-amber-500/25 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-white">Gramaj Negătit (Crud) vs Gătit (În Farfurie)</p>
                    <p className="text-[11px] text-slate-400">Știi exact cât cântărești crud și cât pui pe farfurie când mănânci</p>
                  </div>
                </div>

                {/* Servings counter */}
                <div className="flex items-center justify-center gap-2 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setServings(s => Math.max(1, s - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center font-bold transition-all"
                    aria-label="Scade porții"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-black text-amber-400 w-16 text-center select-none">
                    {servings} {servings === 1 ? 'porție' : 'porții'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setServings(s => s + 1)}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center font-bold transition-all"
                    aria-label="Crește porții"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Total weights comparison badge */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-black/50 p-2.5 rounded-xl border border-white/5 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">La Cântar (Crud)</span>
                  <span className="text-base sm:text-lg font-black text-slate-100">~{scaledRawTotal} g</span>
                  <span className="text-[10px] text-slate-500 block">la gătit</span>
                </div>
                <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/30 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">În Farfurie (Gătit)</span>
                  <span className="text-base sm:text-lg font-black text-emerald-300">~{scaledCookedTotal} g</span>
                  <span className="text-[10px] text-emerald-400/80 block">de mâncat</span>
                </div>
              </div>
            </div>
          )}

          {/* Nutrition Facts (Shown in 'all' or 'nutrition') */}
          {(activeTab === 'all' || activeTab === 'nutrition') && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Valori Nutriționale ({Math.round(recipe.calories * scale)} kcal total)</span>
                </h3>
                <span className="text-[11px] text-slate-400">
                  {recipe.calories_per_100g} kcal / 100g
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Proteine</span>
                  <p className="text-base font-black text-blue-400">{Math.round(recipe.protein_g * scale)}g</p>
                  <span className="text-[9px] text-slate-500">{recipe.protein_per_100g}g / 100g</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Carbohidrați</span>
                  <p className="text-base font-black text-amber-400">{Math.round(recipe.carbs_g * scale)}g</p>
                  <span className="text-[9px] text-slate-500">{recipe.carbs_per_100g}g / 100g</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Grăsimi</span>
                  <p className="text-base font-black text-rose-400">{Math.round(recipe.fat_g * scale)}g</p>
                  <span className="text-[9px] text-slate-500">{recipe.fat_per_100g}g / 100g</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Fibre</span>
                  <p className="text-base font-black text-emerald-400">{Math.round((recipe.fiber_g || 0) * scale)}g</p>
                  <span className="text-[9px] text-slate-500">digestie optimă</span>
                </div>
              </div>
            </div>
          )}

          {/* Ingredients with Dual Raw & Cooked Weights (Shown in 'all' or 'ingredients') */}
          {(activeTab === 'all' || activeTab === 'ingredients') && (
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-emerald-400" />
                  <span>Ingrediente Detaliate (Negătit vs Gătit)</span>
                </h3>

                {/* View filter mode */}
                <div className="flex flex-wrap items-center gap-1.5 bg-black/50 p-1.5 rounded-xl border border-white/10 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setWeightViewMode('both')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-center font-bold ${
                      weightViewMode === 'both' 
                        ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Ambele
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeightViewMode('raw')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-center font-bold ${
                      weightViewMode === 'raw' 
                        ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Doar Crud
                  </button>
                  <button
                    type="button"
                    onClick={() => setWeightViewMode('cooked')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all flex items-center justify-center font-bold ${
                      weightViewMode === 'cooked' 
                        ? 'bg-emerald-400 text-slate-950 shadow-sm shadow-emerald-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    În Farfurie
                  </button>
                </div>
              </div>

              <div className="border border-white/10 rounded-2xl overflow-hidden divide-y divide-white/5 bg-black/30">
                {recipe.ingredients.map((ri, index) => {
                  const weights = getIngredientWeights(ri);
                  const scaledRaw = Math.round(weights.rawGrams * scale);
                  const scaledCooked = Math.round(weights.cookedGrams * scale);

                  return (
                    <div key={ri.id || index} className="p-3 hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                        <div>
                          <span className="font-bold text-white text-xs sm:text-sm">
                            {ri.ingredient?.name_ro || ri.unit_display}
                          </span>
                          <p className="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-1 sm:gap-1.5">
                            <span className="text-amber-400 font-medium">{weights.stateLabel}</span>
                            <span className="text-slate-600">•</span>
                            <span className="italic text-slate-500">{weights.changeNote}</span>
                          </p>
                        </div>
                      </div>

                      {/* Gram comparison pills */}
                      <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                        {(weightViewMode === 'both' || weightViewMode === 'raw') && (
                          <div className="text-left sm:text-right">
                            <span className="text-[9px] uppercase font-bold text-slate-400 block">Crud</span>
                            <span className="font-extrabold bg-zinc-800 text-slate-200 px-2 py-0.5 rounded-lg text-xs border border-white/5">
                              {scaledRaw >= 1000 ? `${(scaledRaw / 1000).toFixed(2)} kg` : `${scaledRaw} g`}
                            </span>
                          </div>
                        )}

                        {(weightViewMode === 'both' || weightViewMode === 'cooked') && (
                          <div className="text-left sm:text-right">
                            <span className="text-[9px] uppercase font-bold text-emerald-400 block">În Farfurie</span>
                            <span className="font-extrabold bg-emerald-950/60 text-emerald-300 px-2 py-0.5 rounded-lg text-xs border border-emerald-500/30">
                              ~{scaledCooked >= 1000 ? `${(scaledCooked / 1000).toFixed(2)} kg` : `${scaledCooked} g`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instructions (Shown in 'all' or 'steps') */}
          {(activeTab === 'all' || activeTab === 'steps') && (
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-emerald-400" />
                <span>Instrucțiuni de preparare pas cu pas</span>
              </h3>

              <div className="space-y-2.5">
                {recipe.instructions_ro.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-200 leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </div>
                    <div>{step}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Sticky Footer - Always reachable on phone and desktop */}
        <div className="sticky bottom-0 bg-[#0a0e16]/95 backdrop-blur-md px-4 py-3 sm:px-6 sm:py-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-30 shrink-0">
          <span className="text-[11px] sm:text-xs text-slate-400 text-center sm:text-left">
            Cântărește crud la gătit • Pune în farfurie cantitatea gătită
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto h-11 px-7 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 active:scale-[0.97] text-slate-950 text-xs font-black rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center shrink-0 cursor-pointer"
          >
            Închide Rețeta
          </button>
        </div>
      </div>
    </div>
  );
};
