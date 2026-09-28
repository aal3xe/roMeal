import React from 'react';
import { 
  CalendarDays, 
  ShoppingCart, 
  BookOpen, 
  User as UserIcon, 
  Database, 
  Settings, 
  LogOut, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { User, UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'planner' | 'shopping' | 'recipes' | 'profile' | 'schema';
  onSelectTab: (tab: 'planner' | 'shopping' | 'recipes' | 'profile' | 'schema') => void;
  currentUser: User | null;
  currentProfile: UserProfile | null;
  onOpenSettings: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenOnboarding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  currentProfile,
  onOpenSettings,
  onOpenAuth,
  onLogout,
  onOpenOnboarding
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0a0e14]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand Logo & Store summary */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => onSelectTab('planner')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              aria-label="roMeal - Pagina Principală"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0 bg-slate-900 flex items-center justify-center">
                <img 
                  src="/src/assets/images/romeal_logo_1790593298182.jpg" 
                  alt="roMeal Gogoșar Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-white font-heading">
                    <span className="text-amber-400">ro</span>Meal
                  </span>
                  <span className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-black px-1.5 py-0.5 rounded-md tracking-wider">
                    RO
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden xl:block tracking-wide mt-0.5">
                  Nutriție Concierge & Planificare Mese
                </p>
              </div>
            </button>

            {/* Store Badge (Desktop) */}
            {currentProfile && (
              <div className="hidden 2xl:flex items-center gap-2 ml-2 px-3 py-1.5 bg-slate-900/90 rounded-xl text-xs font-medium text-slate-300 border border-amber-500/25 h-10">
                <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
                <span>Magazin: <strong className="text-white">{currentProfile.preferred_store || 'Kaufland'}</strong></span>
                <span className="text-slate-600">•</span>
                <span>Buget: <strong className="text-amber-400">{currentProfile.weekly_budget_ron} RON</strong>/săpt</span>
              </div>
            )}
          </div>

          {/* Desktop & Tablet Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => onSelectTab('planner')}
              className={`flex items-center justify-center gap-2 px-3 lg:px-3.5 h-10 rounded-xl text-xs font-bold transition-all shrink-0 ${
                currentTab === 'planner'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CalendarDays className="w-4 h-4 shrink-0" />
              <span>Mese</span>
            </button>

            <button
              onClick={() => onSelectTab('shopping')}
              className={`flex items-center justify-center gap-2 px-3 lg:px-3.5 h-10 rounded-xl text-xs font-bold transition-all shrink-0 ${
                currentTab === 'shopping'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ShoppingCart className="w-4 h-4 shrink-0" />
              <span>Cumpărături</span>
            </button>

            <button
              onClick={() => onSelectTab('recipes')}
              className={`flex items-center justify-center gap-2 px-3 lg:px-3.5 h-10 rounded-xl text-xs font-bold transition-all shrink-0 ${
                currentTab === 'recipes'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Rețete & Gramaje</span>
            </button>

            <button
              onClick={() => onSelectTab('profile')}
              className={`flex items-center justify-center gap-2 px-3 lg:px-3.5 h-10 rounded-xl text-xs font-bold transition-all shrink-0 ${
                currentTab === 'profile'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/40 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <UserIcon className="w-4 h-4 shrink-0" />
              <span>Profil</span>
            </button>

            <button
              onClick={() => onSelectTab('schema')}
              className={`flex items-center justify-center gap-1.5 px-2.5 lg:px-3 h-10 rounded-xl text-xs font-bold transition-all shrink-0 ${
                currentTab === 'schema'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30 shadow-xs'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/40'
              }`}
              title="Schema bazei de date PostgreSQL"
            >
              <Database className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden lg:inline">DB Schema</span>
            </button>
          </nav>

          {/* Action Buttons: Unified H-10 alignment */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenOnboarding}
              className="h-10 flex items-center justify-center gap-2 px-3.5 sm:px-4 rounded-xl border border-amber-400/40 bg-gradient-to-r from-amber-500/15 to-emerald-500/15 text-amber-300 text-xs font-extrabold hover:from-amber-500/25 hover:to-emerald-500/25 transition-all shadow-sm shadow-amber-500/10 shrink-0"
              title="Chestionar de profilare nutrițională și stil de viață"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">Chestionar Profilare</span>
              <span className="sm:hidden">Chestionar</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 rounded-xl transition-colors border border-white/5 shrink-0"
              title="Setări API Spoonacular & Date"
            >
              <Settings className="w-4 h-4" />
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-white/10 shrink-0">
                <button 
                  onClick={() => onSelectTab('profile')}
                  className="cursor-pointer flex flex-col justify-center text-xs text-right hidden sm:flex h-10 px-2 rounded-xl hover:bg-slate-800/40 transition-colors"
                >
                  <p className="font-bold text-white leading-tight truncate max-w-[120px]">{currentUser.name}</p>
                  <p className="text-amber-400 font-semibold text-[11px] leading-tight">{currentProfile?.calorie_target || 2000} kcal/zi</p>
                </button>
                <button
                  onClick={onLogout}
                  className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors border border-white/5 shrink-0"
                  title="Deconectare"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="h-10 flex items-center justify-center px-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 rounded-xl text-xs font-black shadow-md shadow-amber-500/20 transition-all shrink-0"
              >
                Autentificare
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar (Bottom dock on smaller screens) */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 bg-[#0a0e14] py-2 px-1">
        <button
          onClick={() => onSelectTab('planner')}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-colors min-w-[56px] ${
            currentTab === 'planner' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400'
          }`}
        >
          <CalendarDays className="w-5 h-5" />
          <span>Mese</span>
        </button>

        <button
          onClick={() => onSelectTab('shopping')}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-colors min-w-[56px] ${
            currentTab === 'shopping' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Cumpărături</span>
        </button>

        <button
          onClick={() => onSelectTab('recipes')}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-colors min-w-[56px] ${
            currentTab === 'recipes' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>Rețete</span>
        </button>

        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-colors min-w-[56px] ${
            currentTab === 'profile' ? 'text-amber-400 bg-amber-400/10' : 'text-slate-400'
          }`}
        >
          <UserIcon className="w-5 h-5" />
          <span>Profil</span>
        </button>

        <button
          onClick={() => onSelectTab('schema')}
          className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl text-xs font-bold transition-colors min-w-[56px] ${
            currentTab === 'schema' ? 'text-emerald-400 bg-emerald-500/10 font-black' : 'text-slate-500'
          }`}
        >
          <Database className="w-5 h-5" />
          <span>Schema</span>
        </button>
      </div>
    </header>
  );
};
