import React, { useState } from 'react';
import { 
  Calendar, 
  RotateCw, 
  Flame, 
  Clock, 
  ShieldCheck, 
  ShieldAlert, 
  ChefHat, 
  ArrowRightLeft, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShoppingBag,
  Scale,
  Utensils,
  Layers,
  Info
} from 'lucide-react';
import { WeeklyMealPlan, UserProfile, Recipe, MealPlanEntry, Allergen } from '../types';
import { getRecipeTotalPlateWeight } from '../services/weightConverter';

interface MealPlanViewProps {
  plan: WeeklyMealPlan | null;
  profile: UserProfile | null;
  onRegeneratePlan: () => void;
  onOpenRecipe: (recipe: Recipe) => void;
  onOpenSwap: (entry: MealPlanEntry, dayIndex: number) => void;
  onOpenOnboarding: () => void;
}

const ALLERGEN_LABELS: Record<Allergen, string> = {
  gluten: 'Gluten',
  lactoza: 'Lactoză',
  arahide_nuci: 'Nuci',
  oua: 'Ouă',
  peste_fructe_de_mare: 'Pește',
  soia: 'Soia',
  mustar: 'Muștar',
  telina: 'Țelină',
  susan: 'Susan'
};

export const MealPlanView: React.FC<MealPlanViewProps> = ({
  plan,
  profile,
  onRegeneratePlan,
  onOpenRecipe,
  onOpenSwap,
  onOpenOnboarding
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  if (!plan || !profile) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black font-heading text-white mb-2">
          Niciun plan alimentar generat încă
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Configurează profilul tău cu țintele calorice, alergiile și bugetul în RON pentru a genera un meniu personalizat pentru întreaga săptămână.
        </p>
        <button
          onClick={onOpenOnboarding}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all"
        >
          Configurează Profilul & Generează
        </button>
      </div>
    );
  }

  const currentDay = plan.days[selectedDayIndex] || plan.days[0];
  const targetCalories = profile.calorie_target;
  const calorieDiff = currentDay.total_calories - targetCalories;
  const caloriePercent = Math.min(130, Math.round((currentDay.total_calories / targetCalories) * 100));

  // Compute total raw and cooked weight for the day
  let dayCookedGrams = 0;
  let dayRawGrams = 0;
  currentDay.entries.forEach(e => {
    const w = getRecipeTotalPlateWeight(e.recipe);
    dayCookedGrams += w.cookedTotalGrams;
    dayRawGrams += w.rawTotalGrams;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6 overflow-x-hidden">
      {/* Top Banner: Luxury Overview & Action bar */}
      <div className="bg-gradient-to-r from-[#111722] via-[#141d2a] to-[#0f151f] rounded-3xl border border-amber-500/20 shadow-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Nutriție Personalizată & Gramaje În Farfurie
            </span>
            <span className="text-xs text-slate-400">
              Magazin: <strong className="text-white">{profile.preferred_store || 'Kaufland'}</strong> • Buget: <strong className="text-amber-400">{profile.weekly_budget_ron} RON</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
            Meniul tău săptămânal calibrat
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Fiecare rețetă afișează <strong className="text-amber-300">greutatea crudă</strong> (la cântar când prepari) și <strong className="text-emerald-300">greutatea gătită</strong> (cât pui pe farfurie când mănânci), adaptată pentru {profile.household_size} {profile.household_size === 1 ? 'persoană' : 'persoane'}.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 self-stretch sm:self-auto shrink-0 w-full sm:w-auto">
          <button
            onClick={onOpenOnboarding}
            className="flex-1 sm:flex-initial h-11 flex items-center justify-center gap-2 px-4 bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 active:scale-[0.98] text-amber-300 border border-amber-400/30 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Refă chestionarul de profilare"
          >
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="whitespace-nowrap">Chestionar Profil</span>
          </button>

          <button
            onClick={onRegeneratePlan}
            className="flex-1 sm:flex-initial h-11 flex items-center justify-center gap-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white rounded-xl text-xs font-extrabold transition-all shadow-md shadow-emerald-900/40 border border-emerald-400/30"
          >
            <RotateCw className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Regenerează Săptămâna</span>
          </button>
        </div>
      </div>

      {/* 7-Day Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none overscroll-x-contain -mx-3 px-3 sm:mx-0 sm:px-0">
        {plan.days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          const dayCalRatio = Math.round((day.total_calories / targetCalories) * 100);

          return (
            <button
              key={day.day_index}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex-1 min-w-[110px] sm:min-w-[125px] p-3 sm:p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-gradient-to-b from-[#1c2738] to-[#121924] border-amber-400 text-white shadow-lg shadow-amber-500/15 ring-1 ring-amber-400/50'
                  : 'bg-[#10151d] text-slate-400 border-white/5 hover:border-amber-500/30 hover:bg-[#141b26]'
              }`}
            >
              <p className={`text-[11px] font-extrabold uppercase tracking-wider ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                {day.day_name_ro}
              </p>
              <p className={`text-base font-black my-0.5 ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                {day.total_calories} <span className="text-[10px] font-normal text-slate-400">kcal</span>
              </p>
              <div className="flex items-center justify-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${Math.abs(dayCalRatio - 100) <= 5 ? (isSelected ? 'bg-emerald-400' : 'bg-emerald-500') : (isSelected ? 'bg-amber-400' : 'bg-amber-500')}`} />
                <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                  {dayCalRatio}%
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Daily Nutritional Target Tracker */}
      <div className="bg-[#101622] text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-amber-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-extrabold text-sm sm:text-base font-heading">
                Bilanț nutrițional: {currentDay.day_name_ro}
              </span>
              <span className="text-slate-400 text-xs">({currentDay.date_label})</span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Consum total: <strong className="text-white">{currentDay.total_calories} kcal</strong> din ținta de <strong className="text-amber-300">{targetCalories} kcal</strong> ({calorieDiff >= 0 ? `+${calorieDiff}` : calorieDiff} kcal diferență)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Day Plate Weight Summary */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-bold">
              <Utensils className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total în farfurie azi: <strong>~{dayCookedGrams}g</strong></span>
              <span className="text-slate-500 text-[10px]">({dayRawGrams}g crud)</span>
            </div>

            {/* Hard allergen exclusion indicator badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-black/40 border border-white/10 text-slate-300 rounded-xl text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {profile.allergies.length > 0 
                  ? `Excludere: ${profile.allergies.map(a => ALLERGEN_LABELS[a] || a).join(', ')}`
                  : 'Fără alergii'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              caloriePercent > 105 ? 'bg-amber-400' : caloriePercent < 90 ? 'bg-blue-400' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${Math.min(100, caloriePercent)}%` }}
          />
        </div>

        {/* Macro split breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-[#141b27] p-3 rounded-2xl border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Proteine</span>
            <p className="text-lg font-black text-blue-400">{currentDay.total_protein}g</p>
            <span className="text-[10px] text-slate-400">Țintă: {profile.protein_target_g}g</span>
          </div>

          <div className="bg-[#141b27] p-3 rounded-2xl border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Carbohidrați</span>
            <p className="text-lg font-black text-amber-400">{currentDay.total_carbs}g</p>
            <span className="text-[10px] text-slate-400">Țintă: {profile.carbs_target_g}g</span>
          </div>

          <div className="bg-[#141b27] p-3 rounded-2xl border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Grăsimi</span>
            <p className="text-lg font-black text-rose-400">{currentDay.total_fat}g</p>
            <span className="text-[10px] text-slate-400">Țintă: {profile.fat_target_g}g</span>
          </div>

          <div className="bg-[#141b27] p-3 rounded-2xl border border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Calorii</span>
            <p className="text-lg font-black text-emerald-400">{currentDay.total_calories}</p>
            <span className="text-[10px] text-slate-400">kcal planificate</span>
          </div>
        </div>
      </div>

      {/* Meal Cards Grid for the Day */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <span>Mesele zilei de {currentDay.day_name_ro}</span>
            <span className="text-xs font-normal text-slate-400">({currentDay.entries.length} mese programate)</span>
          </h3>
          <span className="text-xs text-amber-400 font-medium hidden sm:inline flex items-center gap-1">
            <Info className="w-3.5 h-3.5" />
            Cântărește crud la gătit • Pune în farfurie cantitatea gătită
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentDay.entries.map((entry) => {
            const recipe = entry.recipe;
            const totals = getRecipeTotalPlateWeight(recipe);
            const slotName = entry.meal_slot === 'breakfast' 
              ? 'Mic Dejun' 
              : entry.meal_slot === 'lunch' 
                ? 'Prânz' 
                : entry.meal_slot === 'dinner' 
                  ? 'Cină' 
                  : 'Gustare';

            return (
              <div
                key={entry.id}
                className="bg-gradient-to-b from-[#131a26] to-[#0f141f] rounded-3xl border border-white/10 hover:border-amber-500/40 overflow-hidden shadow-lg transition-all flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={recipe.image_url}
                    alt={recipe.title_ro}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f141f] via-black/30 to-transparent" />

                  {/* Slot Pill */}
                  <div className="absolute top-3 left-3 bg-[#0a0e14]/90 backdrop-blur-md text-amber-300 border border-amber-500/30 text-xs font-extrabold px-3 py-1 rounded-xl shadow-md">
                    {slotName}
                  </div>

                  {/* Calories Pill */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white font-black text-sm drop-shadow-md bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>{recipe.calories} kcal</span>
                    <span className="text-[10px] font-normal text-slate-300">
                      (~{entry.target_calories} țintă)
                    </span>
                  </div>

                  {/* Prep time */}
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-slate-200 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{recipe.prep_time_minutes + recipe.cook_time_minutes} min</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-extrabold text-white text-base leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                      {recipe.title_ro}
                    </h4>

                    {/* Macronutrients */}
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <span className="bg-blue-950/60 text-blue-300 border border-blue-500/30 px-2.5 py-0.5 rounded-lg text-[11px]">
                        P: {recipe.protein_g}g
                      </span>
                      <span className="bg-amber-950/60 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-lg text-[11px]">
                        C: {recipe.carbs_g}g
                      </span>
                      <span className="bg-rose-950/60 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-lg text-[11px]">
                        G: {recipe.fat_g}g
                      </span>
                    </div>

                    {/* DUAL WEIGHT CALLOUT: RAW VS COOKED PLATE WEIGHT */}
                    <div className="p-3 bg-black/40 rounded-2xl border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                          <span>În Farfurie (Gătit):</span>
                        </span>
                        <span className="font-black text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                          ~{totals.cookedTotalGrams} g
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                        <span className="text-slate-400 font-medium flex items-center gap-1">
                          <Scale className="w-3.5 h-3.5 text-amber-400" />
                          <span>La Cântar (Crud):</span>
                        </span>
                        <span className="font-bold text-amber-300/90 text-[11px]">
                          ~{totals.rawTotalGrams} g ingrediente
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenRecipe(recipe)}
                      className="flex-1 h-11 flex items-center justify-center gap-1.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs font-black rounded-xl transition-all shadow-md shadow-emerald-900/30 border border-emerald-400/30"
                    >
                      <Eye className="w-4 h-4 shrink-0" />
                      <span className="whitespace-nowrap">Rețetă & Cântar</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenSwap(entry, selectedDayIndex)}
                      className="h-11 flex items-center justify-center gap-1.5 px-3.5 bg-slate-900/90 hover:bg-slate-800 active:scale-[0.98] text-slate-300 hover:text-white border border-white/10 hover:border-amber-400/30 text-xs font-bold rounded-xl transition-all shrink-0"
                      title="Schimbă cu altă opțiune sigură"
                    >
                      <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="whitespace-nowrap">Schimbă</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
