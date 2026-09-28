import React from 'react';
import { 
  User as UserIcon, 
  Flame, 
  ShieldAlert, 
  ShieldCheck, 
  Store, 
  Wallet, 
  Users, 
  Clock, 
  Utensils, 
  Check, 
  RotateCw,
  SlidersHorizontal,
  FileCheck,
  Sparkles,
  Scale
} from 'lucide-react';
import { User, UserProfile } from '../types';

interface ProfileViewProps {
  currentUser: User | null;
  profile: UserProfile | null;
  onOpenOnboarding: () => void;
  onSaveProfile: (profile: Partial<UserProfile>) => void;
  onRegeneratePlan: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  profile,
  onOpenOnboarding,
  onSaveProfile,
  onRegeneratePlan
}) => {
  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <button
          onClick={onOpenOnboarding}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20"
        >
          Configurează Profilul
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6 overflow-x-hidden">
      {/* Header card */}
      <div className="bg-gradient-to-r from-[#111722] via-[#141d2a] to-[#0f151f] rounded-3xl border border-amber-500/20 shadow-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-yellow-500 to-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20">
            {currentUser?.name?.slice(0, 2).toUpperCase() || 'RO'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading text-white">
                {currentUser?.name || 'Profil Utilizator'}
              </h1>
              <span className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-black px-2.5 py-0.5 rounded-full">
                GDPR Confirmat
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentUser?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto w-full sm:w-auto">
          <button
            onClick={onOpenOnboarding}
            className="w-full sm:w-auto h-11 flex items-center justify-center gap-2 px-5 bg-gradient-to-r from-amber-500 via-yellow-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 active:scale-[0.98] text-slate-950 rounded-xl text-xs font-black transition-all shadow-md shadow-amber-500/20"
          >
            <Sparkles className="w-4 h-4 text-slate-950 shrink-0" />
            <span className="whitespace-nowrap">Refă Chestionarul de Profilare</span>
          </button>
        </div>
      </div>

      {/* Overview grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Nutritional Targets */}
        <div className="bg-[#10151f] p-5 rounded-3xl border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-white font-extrabold font-heading text-sm border-b border-white/5 pb-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Ținte Nutriționale Zilnice</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-[#141b27] rounded-2xl border border-amber-500/20">
              <span className="text-xs font-bold text-slate-300">Calorii Zilnice</span>
              <span className="text-base font-black text-amber-400">{profile.calorie_target} kcal</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold block">Proteine</span>
                <span className="font-black text-blue-400 text-sm">{profile.protein_target_g}g</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold block">Carbohidrați</span>
                <span className="font-black text-amber-400 text-sm">{profile.carbs_target_g}g</span>
              </div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 font-bold block">Grăsimi</span>
                <span className="font-black text-rose-400 text-sm">{profile.fat_target_g}g</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 pt-1 space-y-1.5">
              <p>Mese pe zi: <strong className="text-white">{profile.meals_per_day} mese</strong></p>
              <p>Mărime gospodărie: <strong className="text-white">{profile.household_size} {profile.household_size === 1 ? 'persoană' : 'persoane'}</strong></p>
              <p>Timp maxim gătit: <strong className="text-white">{profile.cooking_time_max_minutes} min</strong></p>
            </div>
          </div>
        </div>

        {/* Dietary Constraints & Allergies */}
        <div className="bg-[#10151f] p-5 rounded-3xl border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-white font-extrabold font-heading text-sm border-b border-white/5 pb-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Alergii (Excludere Strictă)</span>
          </div>

          <div className="space-y-3">
            {profile.allergies.length === 0 ? (
              <p className="text-xs text-slate-400 italic p-3 bg-black/40 rounded-2xl border border-white/5">
                Niciun alergen exclus. Toate ingredientele sunt permise în meniu.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {profile.allergies.map(a => (
                  <span key={a} className="bg-rose-950/60 text-rose-300 border border-rose-500/30 text-xs font-bold px-2.5 py-1 rounded-xl">
                    🚫 Fără {a}
                  </span>
                ))}
              </div>
            )}

            <div className="border-t border-white/5 pt-3">
              <span className="text-xs font-bold text-slate-300 block mb-1.5">Preferințe dietetice (Soft)</span>
              {profile.preferences.length === 0 ? (
                <p className="text-xs text-slate-400 italic">Dieta standard românească.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {profile.preferences.map(p => (
                    <span key={p} className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold px-2 py-0.5 rounded-lg">
                      ✓ {p}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grocery & Budget Constraints */}
        <div className="bg-[#10151f] p-5 rounded-3xl border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-white font-extrabold font-heading text-sm border-b border-white/5 pb-2">
            <Wallet className="w-4 h-4 text-amber-400" />
            <span>Magazin & Buget RON</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-[#141b27] rounded-2xl border border-white/5">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Supermarket Preferat</span>
              <p className="text-sm font-extrabold text-white mt-0.5">{profile.preferred_store || 'Kaufland România'}</p>
            </div>

            <div className="p-3.5 bg-[#141b27] rounded-2xl border border-amber-500/20">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Buget Săptămânal</span>
              <p className="text-lg font-black text-amber-400">{profile.weekly_budget_ron} RON</p>
            </div>

            <div className="p-3 bg-black/40 rounded-2xl border border-white/5 flex items-center gap-2 text-xs text-slate-300">
              <Scale className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Cântărire la masă: activată (crud vs farfurie)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
