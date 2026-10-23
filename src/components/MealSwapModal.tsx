import React, { useEffect } from 'react';
import { X, RefreshCw, Clock, Flame, Check, Utensils } from 'lucide-react';
import { Recipe, MealPlanEntry, UserProfile } from '../types';
import { planner } from '../services/planner';
import { getRecipeTotalPlateWeight } from '../services/weightConverter';

interface MealSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  entryToSwap: { entry: MealPlanEntry; dayIndex: number } | null;
  profile: UserProfile | null;
  onConfirmSwap: (dayIndex: number, entryId: string, newRecipe: Recipe) => void;
}

export const MealSwapModal: React.FC<MealSwapModalProps> = ({
  isOpen,
  onClose,
  entryToSwap,
  profile,
  onConfirmSwap
}) => {
  // Lock body scroll and listen to Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !entryToSwap || !profile) return null;

  const { entry, dayIndex } = entryToSwap;
  const currentRecipe = entry.recipe;
  const currentWeights = getRecipeTotalPlateWeight(currentRecipe);
  const currentTitle = currentRecipe.title_en || currentRecipe.title_ro;

  // Retrieve alternatives safe from allergens
  const alternatives = planner.getSwapAlternatives(currentRecipe.id, entry.meal_slot, profile);

  const slotLabel = entry.meal_slot === 'breakfast' 
    ? 'Breakfast' 
    : entry.meal_slot === 'lunch' 
      ? 'Lunch' 
      : entry.meal_slot === 'dinner' 
        ? 'Dinner' 
        : 'Snack';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0f141e] text-slate-100 rounded-t-[32px] sm:rounded-3xl shadow-2xl w-full max-w-xl max-h-[92vh] sm:max-h-[85vh] border border-amber-500/25 overflow-hidden flex flex-col animate-sheet-up">
        {/* Mobile Pull Handle */}
        <div 
          onClick={onClose}
          className="w-full flex sm:hidden items-center justify-center pt-2.5 pb-1 cursor-pointer bg-[#0a0e16]"
        >
          <div className="w-12 h-1.5 rounded-full bg-white/30" />
        </div>

        {/* Header */}
        <div className="bg-[#0a0e16] px-5 sm:px-6 py-4 border-b border-white/10 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <RefreshCw className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black font-heading text-white">
                Swap Meal: {slotLabel}
              </h2>
              <p className="text-[11px] text-slate-400">
                Allergen-safe alternatives calibrated to your plate weight
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current meal summary */}
        <div className="p-4 bg-[#141b27] border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img 
              src={currentRecipe.image_url} 
              alt={currentTitle} 
              className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
            />
            <div>
              <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">Current Meal</span>
              <p className="text-xs font-extrabold text-white line-clamp-1">{currentTitle}</p>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 text-[11px]">
                <span className="text-amber-400 font-bold">{currentRecipe.calories} kcal</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <Utensils className="w-3 h-3" />
                  ~{currentWeights.cookedTotalGrams}g on plate
                </span>
              </div>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 bg-black/40 text-slate-300 rounded-lg border border-white/5 self-start sm:self-auto shrink-0">
            Target: ~{entry.target_calories} kcal
          </span>
        </div>

        {/* Alternatives list */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto overscroll-contain scrollbar-none space-y-3">
          {alternatives.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No other compatible recipes found in the catalog matching this calorie window and allergen filter.
            </div>
          ) : (
            alternatives.map(altRecipe => {
              const calDiff = altRecipe.calories - entry.target_calories;
              const altWeights = getRecipeTotalPlateWeight(altRecipe);
              const altTitle = altRecipe.title_en || altRecipe.title_ro;

              return (
                <div
                  key={altRecipe.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/40 bg-[#121824] hover:bg-[#162030] transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={altRecipe.image_url}
                      alt={altTitle}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/5"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {altTitle}
                      </h4>

                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 font-bold text-amber-400">
                          <Flame className="w-3 h-3 text-amber-400" />
                          {altRecipe.calories} kcal
                        </span>
                        <span className="text-slate-600">•</span>
                        <span>{calDiff >= 0 ? `+${calDiff}` : calDiff} kcal vs target</span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3 text-emerald-400" />
                          {altRecipe.prep_time_minutes + altRecipe.cook_time_minutes}m
                        </span>
                      </div>

                      {/* Plate Weight Indicator */}
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className="text-[10px] font-black bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Utensils className="w-2.5 h-2.5 text-emerald-400" />
                          <span>~{altWeights.cookedTotalGrams}g on plate</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          ({altWeights.rawTotalGrams}g raw prep)
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onConfirmSwap(dayIndex, entry.id, altRecipe);
                      onClose();
                    }}
                    className="w-full sm:w-auto h-10 px-5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] text-slate-950 text-xs font-black rounded-xl shrink-0 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Select</span>
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="bg-[#0a0e16] px-6 py-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto h-10 px-5 border border-white/10 hover:bg-white/5 active:scale-[0.98] text-xs font-bold rounded-xl text-slate-300 transition-colors flex items-center justify-center"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
