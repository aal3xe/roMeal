import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  Flame, 
  Scale, 
  ShieldAlert, 
  Utensils, 
  Clock, 
  Store, 
  Wallet, 
  FileCheck,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { 
  UserProfile, 
  Allergen, 
  DietPreference, 
  KitchenEquipment, 
  ActivityLevel, 
  DietGoal 
} from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: UserProfile | null;
  onSaveProfile: (profile: Partial<UserProfile>) => void;
}

const ALLERGEN_OPTIONS: { id: Allergen; label: string; icon: string }[] = [
  { id: 'gluten', label: 'Gluten (Grâu/Orz/Secară)', icon: '🌾' },
  { id: 'lactoza', label: 'Lactoză (Lapte/Brânzeturi)', icon: '🥛' },
  { id: 'arahide_nuci', label: 'Arahide & Nuci/Migdale', icon: '🥜' },
  { id: 'oua', label: 'Ouă', icon: '🥚' },
  { id: 'peste_fructe_de_mare', label: 'Pește & Fructe de Mare', icon: '🐟' },
  { id: 'soia', label: 'Soia & Tofu', icon: '🌱' },
  { id: 'mustar', label: 'Muștar', icon: '🌭' },
  { id: 'telina', label: 'Țelină', icon: '🥬' },
  { id: 'susan', label: 'Semințe de Susan', icon: '🥯' }
];

const PREFERENCE_OPTIONS: { id: DietPreference; label: string; icon: string }[] = [
  { id: 'vegetarian', label: 'Vegetarian (lacto-ovo)', icon: '🥗' },
  { id: 'vegan', label: 'Vegan (exclusiv plante)', icon: '🥦' },
  { id: 'pescetarian', label: 'Pescetarian (pește & plante)', icon: '🎣' },
  { id: 'fara_porc', label: 'Fără carne de porc', icon: '🚫' },
  { id: 'low_carb', label: 'Low Carb (sărac în carbohidrați)', icon: '🥑' },
  { id: 'bogata_in_proteine', label: 'Bogată în Proteine (Fitness)', icon: '💪' }
];

const EQUIPMENT_OPTIONS: { id: KitchenEquipment; label: string; icon: string }[] = [
  { id: 'aragaz_plita', label: 'Plită / Aragaz', icon: '🍳' },
  { id: 'cuptor', label: 'Cuptor clasic / electric', icon: '♨️' },
  { id: 'airfryer', label: 'Friteuză cu aer cald (Airfryer)', icon: '🍟' },
  { id: 'blender', label: 'Blender / Robot bucătărie', icon: '🥤' },
  { id: 'multicooker', label: 'Multicooker / Instant Pot', icon: '🍲' },
  { id: 'gratar', label: 'Grătar / Tigaie grill', icon: '🥩' },
  { id: 'cantar_bucatarie', label: 'Cântar de bucătărie', icon: '⚖️' }
];

const STORES = ['Kaufland', 'Lidl', 'Penny', 'Mega Image', 'Carrefour', 'Auchan'];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile
}) => {
  const [step, setStep] = useState<number>(1);

  // Form states
  const [age, setAge] = useState<number>(currentProfile?.age || 30);
  const [weight, setWeight] = useState<number>(currentProfile?.weight_kg || 75);
  const [height, setHeight] = useState<number>(currentProfile?.height_cm || 175);
  const [gender, setGender] = useState<'m' | 'f'>(currentProfile?.gender || 'm');
  const [activity, setActivity] = useState<ActivityLevel>(currentProfile?.activity_level || 'moderate');
  const [goal, setGoal] = useState<DietGoal>(currentProfile?.goal || 'maintain');

  const [calorieTarget, setCalorieTarget] = useState<number>(currentProfile?.calorie_target || 2000);
  const [proteinTarget, setProteinTarget] = useState<number>(currentProfile?.protein_target_g || 130);
  const [carbsTarget, setCarbsTarget] = useState<number>(currentProfile?.carbs_target_g || 220);
  const [fatTarget, setFatTarget] = useState<number>(currentProfile?.fat_target_g || 65);

  const [mealsPerDay, setMealsPerDay] = useState<2 | 3 | 4 | 5>(currentProfile?.meals_per_day || 3);
  const [householdSize, setHouseholdSize] = useState<number>(currentProfile?.household_size || 1);
  const [cookingTime, setCookingTime] = useState<number>(currentProfile?.cooking_time_max_minutes || 35);
  const [preferredStore, setPreferredStore] = useState<string>(currentProfile?.preferred_store || 'Kaufland');
  const [weeklyBudget, setWeeklyBudget] = useState<number>(currentProfile?.weekly_budget_ron || 350);

  const [allergies, setAllergies] = useState<Allergen[]>(currentProfile?.allergies || []);
  const [preferences, setPreferences] = useState<DietPreference[]>(currentProfile?.preferences || []);
  const [equipment, setEquipment] = useState<KitchenEquipment[]>(
    currentProfile?.kitchen_equipment || ['aragaz_plita', 'cuptor']
  );

  const [gdprConsent, setGdprConsent] = useState<boolean>(currentProfile?.gdpr_consent || true);

  // Recalculate BMR and calorie target automatically when physiological parameters change
  useEffect(() => {
    // Mifflin-St Jeor formula
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    bmr += gender === 'm' ? 5 : -161;

    const activityMultipliers: Record<ActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    let maintenanceCalories = Math.round(bmr * activityMultipliers[activity]);
    let target = maintenanceCalories;

    if (goal === 'lose_weight') target = Math.round(maintenanceCalories - 450);
    if (goal === 'gain_muscle') target = Math.round(maintenanceCalories + 300);

    target = Math.max(1200, Math.min(5000, target));
    setCalorieTarget(target);

    // Standard balanced macro split
    const proteinGrams = Math.round((target * 0.25) / 4);
    const fatGrams = Math.round((target * 0.28) / 9);
    const carbsGrams = Math.round((target - (proteinGrams * 4 + fatGrams * 9)) / 4);

    setProteinTarget(proteinGrams);
    setCarbsTarget(carbsGrams);
    setFatTarget(fatGrams);
  }, [age, weight, height, gender, activity, goal]);

  if (!isOpen) return null;

  const toggleAllergen = (a: Allergen) => {
    setAllergies(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  const togglePreference = (p: DietPreference) => {
    setPreferences(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  };

  const toggleEquipment = (eq: KitchenEquipment) => {
    setEquipment(prev => prev.includes(eq) ? prev.filter(x => x !== eq) : [...prev, eq]);
  };

  const handleFinish = () => {
    if (!gdprConsent) {
      alert('Vă rugăm să bifați consimțământul GDPR pentru procesarea datelor nutriționale.');
      return;
    }

    onSaveProfile({
      age,
      weight_kg: weight,
      height_cm: height,
      gender,
      activity_level: activity,
      goal,
      calorie_target: calorieTarget,
      protein_target_g: proteinTarget,
      carbs_target_g: carbsTarget,
      fat_target_g: fatTarget,
      meals_per_day: mealsPerDay,
      household_size: householdSize,
      allergies,
      preferences,
      cooking_time_max_minutes: cookingTime,
      kitchen_equipment: equipment,
      preferred_store: preferredStore,
      weekly_budget_ron: weeklyBudget,
      gdpr_consent: gdprConsent,
      gdpr_consent_date: new Date().toISOString()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-200" />
              <h2 className="text-xl font-bold font-heading">
                {step === 1 && 'Pasul 1: Date Biometrice & Obiectiv'}
                {step === 2 && 'Pasul 2: Alergii & Restricții Alimentare'}
                {step === 3 && 'Pasul 3: Gospodărie, Magazin & Buget RON'}
              </h2>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Configurarea asistentului tău personal de nutriție și cumpărături
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicator */}
        <div className="flex border-b border-slate-100">
          <div className={`flex-1 py-2 text-center text-xs font-bold transition-colors ${step === 1 ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-400'}`}>
            1. Calcule Nutriționale
          </div>
          <div className={`flex-1 py-2 text-center text-xs font-bold transition-colors ${step === 2 ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-400'}`}>
            2. Alergii (Excludere Strictă)
          </div>
          <div className={`flex-1 py-2 text-center text-xs font-bold transition-colors ${step === 3 ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-400'}`}>
            3. Buget RON & Echipamente
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {step === 1 && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gen</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setGender('m')}
                      className={`py-1.5 text-xs font-bold rounded-md ${gender === 'm' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
                    >
                      Bărbat
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('f')}
                      className={`py-1.5 text-xs font-bold rounded-md ${gender === 'f' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'}`}
                    >
                      Femeie
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vârstă (ani)</label>
                  <input
                    type="number"
                    value={age}
                    onChange={e => setAge(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                    min={14}
                    max={100}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Greutate (kg)</label>
                  <input
                    type="number"
                    value={weight}
                    onChange={e => setWeight(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                    min={35}
                    max={250}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Înălțime (cm)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-semibold"
                    min={120}
                    max={230}
                  />
                </div>
              </div>

              {/* Goal & Activity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Obiectiv principal</label>
                  <select
                    value={goal}
                    onChange={e => setGoal(e.target.value as DietGoal)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="lose_weight">Slăbire sănătoasă (-450 kcal)</option>
                    <option value="maintain">Menținerea greutății</option>
                    <option value="gain_muscle">Masă musculară / Tonifiere (+300 kcal)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nivel de activitate fizică</label>
                  <select
                    value={activity}
                    onChange={e => setActivity(e.target.value as ActivityLevel)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value="sedentary">Sedentar (birou, puțină mișcare)</option>
                    <option value="light">Activitate ușoară (1-2 antrenamente/săpt)</option>
                    <option value="moderate">Moderat (3-4 antrenamente/săpt)</option>
                    <option value="active">Activ (5+ antrenamente intense/săpt)</option>
                    <option value="very_active">Foarte activ (muncă fizică grea)</option>
                  </select>
                </div>
              </div>

              {/* Calculated Targets Card */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-emerald-600" />
                    <span className="font-bold text-slate-900 text-sm">Țintă zilnică calculată automat</span>
                  </div>
                  <span className="text-xs bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                    Mifflin-St Jeor Formula
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Calorii</p>
                    <input
                      type="number"
                      value={calorieTarget}
                      onChange={e => setCalorieTarget(Number(e.target.value))}
                      className="w-full text-center text-lg font-extrabold text-emerald-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-400">kcal / zi</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Proteine</p>
                    <input
                      type="number"
                      value={proteinTarget}
                      onChange={e => setProteinTarget(Number(e.target.value))}
                      className="w-full text-center text-lg font-bold text-blue-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-400">grame</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Carbohidrați</p>
                    <input
                      type="number"
                      value={carbsTarget}
                      onChange={e => setCarbsTarget(Number(e.target.value))}
                      className="w-full text-center text-lg font-bold text-amber-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-400">grame</span>
                  </div>

                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                    <p className="text-[11px] text-slate-500 font-semibold uppercase">Grăsimi</p>
                    <input
                      type="number"
                      value={fatTarget}
                      onChange={e => setFatTarget(Number(e.target.value))}
                      className="w-full text-center text-lg font-bold text-rose-600 focus:outline-hidden"
                    />
                    <span className="text-[10px] text-slate-400">grame</span>
                  </div>
                </div>
              </div>

              {/* Number of meals per day */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Câte mese dorești pe zi?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setMealsPerDay(num as 2 | 3 | 4 | 5)}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold transition-all ${
                        mealsPerDay === num
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {num} Mese
                      <span className="block text-[10px] font-normal text-slate-500">
                        {num === 2 && 'Prânz + Cină'}
                        {num === 3 && 'MD + Prânz + Cină'}
                        {num === 4 && '+ 1 Gustare'}
                        {num === 5 && '+ 2 Gustări'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Hard Allergies Exclusion */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Alergii alimentare (Excludere Strictă - Hard Constraints)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Rețetele care conțin aceste ingrediente vor fi <strong>complet eliminate</strong> din planul tău alimentar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ALLERGEN_OPTIONS.map(opt => {
                    const isChecked = allergies.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleAllergen(opt.id)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                          isChecked
                            ? 'border-rose-500 bg-rose-50 text-rose-900'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${isChecked ? 'bg-rose-600 border-rose-600 text-white' : 'border-slate-300'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Soft Preferences */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Preferințe alimentare (Prioritizare - Soft Constraints)
                  </h3>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  Algoritmul va prioritiza rețete conforme cu stilul tău de viață.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PREFERENCE_OPTIONS.map(opt => {
                    const isChecked = preferences.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => togglePreference(opt.id)}
                        className={`flex items-center justify-between p-2.5 rounded-lg border text-left text-xs font-semibold transition-all ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                            : 'border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              {/* Household & Cooking Logistics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mărime gospodărie (Porții de gătit)
                  </label>
                  <select
                    value={householdSize}
                    onChange={e => setHouseholdSize(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    <option value={1}>1 persoană (porție individuală)</option>
                    <option value={2}>2 persoane (cuplu - 2x grame)</option>
                    <option value={3}>3 persoane (familie mică - 3x grame)</option>
                    <option value={4}>4 persoane (familie - 4x grame)</option>
                    <option value={5}>5+ persoane (gospodărie mare)</option>
                  </select>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Ingredientele din lista de cumpărături vor fi multiplicate automat.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Timp maxim de gătit disponibil
                  </label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <input
                      type="range"
                      min={15}
                      max={60}
                      step={5}
                      value={cookingTime}
                      onChange={e => setCookingTime(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="text-xs font-bold text-slate-800 whitespace-nowrap min-w-14">
                      {cookingTime} min
                    </span>
                  </div>
                </div>
              </div>

              {/* Grocery Store & Weekly Budget (RON) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Magazin alimentar preferat
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={preferredStore}
                      onChange={e => setPreferredStore(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      {STORES.map(s => (
                        <option key={s} value={s}>{s} România</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Buget săptămânal alocat (RON)
                  </label>
                  <div className="relative">
                    <span className="text-xs font-bold text-slate-500 absolute left-3 top-2.5">RON</span>
                    <input
                      type="number"
                      value={weeklyBudget}
                      onChange={e => setWeeklyBudget(Number(e.target.value))}
                      className="w-full pl-12 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold"
                      min={100}
                      max={3000}
                    />
                  </div>
                </div>
              </div>

              {/* Kitchen Equipment */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Echipamente de bucătărie disponibile
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EQUIPMENT_OPTIONS.map(eq => {
                    const isChecked = equipment.includes(eq.id);
                    return (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => toggleEquipment(eq.id)}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                          isChecked
                            ? 'border-emerald-500 bg-emerald-50/70 text-emerald-900'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{eq.icon}</span>
                        <span className="truncate">{eq.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* GDPR Health Data Consent */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="gdpr"
                    checked={gdprConsent}
                    onChange={e => setGdprConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="gdpr" className="text-xs text-slate-700 leading-relaxed cursor-pointer">
                    <span className="font-bold text-slate-900">Consimțământ GDPR (Art. 9):</span> Confirm că sunt de acord cu procesarea datelor mele biometrice și a alergiilor alimentare strict în scopul generării planului nutrițional și a listei de cumpărături optimizate în RON.
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Înapoi</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <span>Următorul pas</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
            >
              <Check className="w-4 h-4" />
              <span>Salvează & Generează Meniul</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
