import React, { useState, useEffect } from 'react';
import { db } from './services/db';
import { planner } from './services/planner';
import { User, UserProfile, WeeklyMealPlan, Recipe, MealPlanEntry } from './types';
import { Header } from './components/Header';
import { MealPlanView } from './components/MealPlanView';
import { ShoppingListView } from './components/ShoppingListView';
import { RecipeCatalogView } from './components/RecipeCatalogView';
import { ProfileView } from './components/ProfileView';
import { DatabaseSchemaView } from './components/DatabaseSchemaView';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { MealSwapModal } from './components/MealSwapModal';
import { ProfilingWizard } from './components/ProfilingWizard';
import { SettingsModal } from './components/SettingsModal';
import { AuthModal } from './components/AuthModal';
import { cloudAuth, cloudSync } from './services/firebase';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'planner' | 'shopping' | 'recipes' | 'profile' | 'schema'>('planner');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan | null>(null);

  // Questionnaire / Profiling wizard state (True by default if user hasn't profiled yet)
  const [isProfilingOpen, setIsProfilingOpen] = useState<boolean>(() => !db.hasCompletedProfiling());
  const [justCompletedToast, setJustCompletedToast] = useState<boolean>(false);

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [swapState, setSwapState] = useState<{ entry: MealPlanEntry; dayIndex: number } | null>(null);

  // Initialize data on mount & subscribe to Firebase Cloud Auth
  useEffect(() => {
    refreshSession();

    // Listen to Firebase cloud authentication
    const unsubscribe = cloudAuth.onStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Sync with local session
        let localUser = db.getCurrentUser();
        if (!localUser || localUser.email !== firebaseUser.email) {
          try {
            const signupRes = db.signUp(
              firebaseUser.email || 'user@romeal.app',
              firebaseUser.displayName || 'roMeal Member',
              'cloud_auth'
            );
            localUser = signupRes.user;
          } catch {
            const loginRes = db.login(firebaseUser.email || 'user@romeal.app');
            localUser = loginRes.user;
          }
          if (localUser) {
            setCurrentUser(localUser);
          }
        }

        // Attempt to load cloud profile & meal plan
        try {
          const cloudProfile = await cloudSync.loadUserProfile(firebaseUser.uid);
          if (cloudProfile) {
            const merged = db.updateProfile(cloudProfile);
            setCurrentProfile(merged);
          }

          const cloudPlan = await cloudSync.loadWeeklyPlan(firebaseUser.uid);
          if (cloudPlan) {
            db.saveMealPlan(cloudPlan);
            setWeeklyPlan(cloudPlan);
          }
        } catch (err) {
          console.warn('Error loading data from Cloud Firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshSession = () => {
    const user = db.getCurrentUser();
    const profile = db.getCurrentProfile();
    setCurrentUser(user);
    setCurrentProfile(profile);

    if (user && profile) {
      let plan = db.getMealPlanForCurrentWeek(user.id);
      if (!plan) {
        try {
          plan = planner.generateWeeklyPlan(profile);
        } catch (e) {
          console.error('Could not generate initial plan:', e);
        }
      }
      setWeeklyPlan(plan);
    }
  };

  const handleCompleteProfiling = (updatedData: Partial<UserProfile>, customPlan?: WeeklyMealPlan) => {
    const updated = db.updateProfile(updatedData);
    db.setHasCompletedProfiling(true);
    setCurrentProfile(updated);

    let planToSave = customPlan;
    // Save exact custom plan chosen by user during profiling wizard or generate new one
    if (customPlan) {
      db.saveMealPlan(customPlan);
      setWeeklyPlan(customPlan);
    } else {
      try {
        const newPlan = planner.generateWeeklyPlan(updated);
        planToSave = newPlan;
        setWeeklyPlan(newPlan);
      } catch (e: any) {
        alert(`Notice: ${e.message}`);
      }
    }

    // Sync to Cloud Firestore if logged in
    const activeUser = db.getCurrentUser();
    if (activeUser) {
      cloudSync.saveUserProfile(activeUser.id, updated);
      if (planToSave) {
        cloudSync.saveWeeklyPlan(activeUser.id, planToSave);
      }
    }

    setIsProfilingOpen(false);
    setCurrentTab('planner');
    setJustCompletedToast(true);
    setTimeout(() => setJustCompletedToast(false), 5000);
  };

  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    const updated = db.updateProfile(updatedData);
    setCurrentProfile(updated);
    try {
      const newPlan = planner.generateWeeklyPlan(updated);
      setWeeklyPlan(newPlan);

      const activeUser = db.getCurrentUser();
      if (activeUser) {
        cloudSync.saveUserProfile(activeUser.id, updated);
        cloudSync.saveWeeklyPlan(activeUser.id, newPlan);
      }
    } catch (e: any) {
      alert(`Notice: ${e.message}`);
    }
  };

  const handleRegeneratePlan = () => {
    if (!currentProfile) return;
    try {
      const newPlan = planner.generateWeeklyPlan(currentProfile);
      setWeeklyPlan(newPlan);

      const activeUser = db.getCurrentUser();
      if (activeUser) {
        cloudSync.saveWeeklyPlan(activeUser.id, newPlan);
      }
    } catch (e: any) {
      alert(`Generation error: ${e.message}`);
    }
  };

  const handleConfirmSwap = (dayIndex: number, entryId: string, newRecipe: Recipe) => {
    if (!weeklyPlan) return;

    const updatedDays = [...weeklyPlan.days];
    const day = updatedDays[dayIndex];
    if (!day) return;

    const entryIndex = day.entries.findIndex(e => e.id === entryId);
    if (entryIndex === -1) return;

    const oldEntry = day.entries[entryIndex];
    const updatedEntry: MealPlanEntry = {
      ...oldEntry,
      recipe_id: newRecipe.id,
      recipe: newRecipe
    };

    day.entries[entryIndex] = updatedEntry;

    // Recalculate day totals
    day.total_calories = Math.round(day.entries.reduce((sum, e) => sum + e.recipe.calories, 0));
    day.total_protein = Math.round(day.entries.reduce((sum, e) => sum + e.recipe.protein_g, 0));
    day.total_carbs = Math.round(day.entries.reduce((sum, e) => sum + e.recipe.carbs_g, 0));
    day.total_fat = Math.round(day.entries.reduce((sum, e) => sum + e.recipe.fat_g, 0));

    const updatedPlan: WeeklyMealPlan = {
      ...weeklyPlan,
      days: updatedDays
    };

    db.saveMealPlan(updatedPlan);
    setWeeklyPlan(updatedPlan);

    const activeUser = db.getCurrentUser();
    if (activeUser) {
      cloudSync.saveWeeklyPlan(activeUser.id, updatedPlan);
    }
  };

  const handleLogout = () => {
    cloudAuth.logout().catch(console.warn);
    db.logout();
    setCurrentUser(null);
    setCurrentProfile(null);
    setWeeklyPlan(null);
  };

  // If profiling is active, show the questionnaire wizard directly
  if (isProfilingOpen) {
    return (
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#080c12] text-slate-100 flex flex-col font-sans">
        <header className="bg-[#0a0e14] border-b border-amber-500/20 py-3.5 px-4 sm:px-8 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-amber-500/40 shadow-sm shrink-0">
              <img 
                src="/src/assets/images/romeal_logo_1790593298182.jpg" 
                alt="roMeal Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-heading">
              <span className="text-amber-400">ro</span>Meal
            </span>
            <span className="bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-[10px] font-black px-1.5 py-0.5 rounded-md tracking-wider">
              PRO
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium hidden sm:block">
            Precision Nutrition Profiling Wizard & Dual-Weight Calibration
          </p>
          {db.hasCompletedProfiling() && (
            <button
              onClick={() => setIsProfilingOpen(false)}
              className="h-9 px-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-xs font-bold text-amber-300 transition-all flex items-center justify-center"
            >
              Go to my meal plan →
            </button>
          )}
        </header>

        <ProfilingWizard
          initialProfile={currentProfile}
          onComplete={handleCompleteProfiling}
          onSkip={() => {
            db.setHasCompletedProfiling(true);
            setIsProfilingOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c12] text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        currentProfile={currentProfile}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenOnboarding={() => setIsProfilingOpen(true)}
      />

      {/* Completion Toast Notification */}
      {justCompletedToast && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 text-white px-4 py-3 text-center text-xs sm:text-sm font-bold shadow-lg border-b border-amber-500/30 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
          <span>🎉 Profile saved! Your 7-day meal plan has been calibrated for {currentProfile?.calorie_target} kcal/day, {currentProfile?.preferred_store}, and raw vs cooked plate weights!</span>
        </div>
      )}

      {/* Main Tab Views */}
      <main className="flex-1 pb-16">
        {currentTab === 'planner' && (
          <MealPlanView
            plan={weeklyPlan}
            profile={currentProfile}
            onRegeneratePlan={handleRegeneratePlan}
            onOpenRecipe={setSelectedRecipe}
            onOpenSwap={(entry, dayIndex) => setSwapState({ entry, dayIndex })}
            onOpenOnboarding={() => setIsProfilingOpen(true)}
          />
        )}

        {currentTab === 'shopping' && (
          <ShoppingListView
            plan={weeklyPlan}
            profile={currentProfile}
            onOpenOnboarding={() => setIsProfilingOpen(true)}
          />
        )}

        {currentTab === 'recipes' && (
          <RecipeCatalogView
            onOpenRecipe={setSelectedRecipe}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            currentUser={currentUser}
            profile={currentProfile}
            onOpenOnboarding={() => setIsProfilingOpen(true)}
            onSaveProfile={handleSaveProfile}
            onRegeneratePlan={handleRegeneratePlan}
          />
        )}

        {currentTab === 'schema' && (
          <DatabaseSchemaView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0e14] border-t border-white/10 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <img 
              src="/src/assets/images/romeal_logo_1790593298182.jpg" 
              alt="roMeal Icon" 
              className="w-5 h-5 rounded-md object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <p>
              <strong className="text-white font-heading">roMeal</strong> &copy; {new Date().getFullYear()} — Smart Meal Planner & Precision Nutrition Concierge.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400">
            <span>Mifflin-St Jeor Engine</span>
            <span>•</span>
            <span>GDPR Art. 9 Compliant</span>
            <span>•</span>
            <span>Kaufland / Lidl / Penny Ready</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        householdSize={currentProfile?.household_size || 1}
      />

      <MealSwapModal
        isOpen={!!swapState}
        onClose={() => setSwapState(null)}
        entryToSwap={swapState}
        profile={currentProfile}
        onConfirmSwap={handleConfirmSwap}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onRefreshData={refreshSession}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={refreshSession}
      />
    </div>
  );
}
