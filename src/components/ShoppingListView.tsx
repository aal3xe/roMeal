import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Check, 
  Copy, 
  Printer, 
  Users, 
  Store, 
  Wallet, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Info,
  Scale,
  Utensils
} from 'lucide-react';
import { WeeklyMealPlan, UserProfile, AggregatedShoppingItem } from '../types';
import { shoppingListService, CATEGORY_LABELS_RO } from '../services/shoppingList';

interface ShoppingListViewProps {
  plan: WeeklyMealPlan | null;
  profile: UserProfile | null;
  onOpenOnboarding: () => void;
}

export const ShoppingListView: React.FC<ShoppingListViewProps> = ({
  plan,
  profile,
  onOpenOnboarding
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('romeal_checked_shopping_items');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync checked items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('romeal_checked_shopping_items', JSON.stringify(Array.from(checkedIds)));
    } catch (e) {
      console.warn('Eroare salvare status cumparaturi:', e);
    }
  }, [checkedIds]);

  if (!plan || !profile) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/10">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black font-heading text-white mb-2">
          Nicio listă de cumpărături generată
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Generează un plan săptămânal pentru a calcula automat totalul de ingrediente în grame și kilograme.
        </p>
        <button
          onClick={onOpenOnboarding}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all"
        >
          Configurează Meniul
        </button>
      </div>
    );
  }

  // Aggregate items across 7 days
  const items = shoppingListService.aggregateWeeklyShoppingList(plan, profile.household_size);
  const grouped = shoppingListService.groupByCategory(items);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const checkAll = () => {
    if (checkedIds.size === items.length) {
      setCheckedIds(new Set());
    } else {
      setCheckedIds(new Set(items.map(i => i.ingredient_id)));
    }
  };

  const handleCopy = () => {
    let text = `🛒 LISTĂ DE CUMPĂRĂTURI SĂPTĂMÂNALĂ - roMeal (România)\n`;
    text += `Magazin: ${profile.preferred_store || 'Kaufland'} | Porții: ${profile.household_size} persoane\n`;
    text += `Buget alocat: ${profile.weekly_budget_ron} RON\n`;
    text += `* Notă: Cantitățile sunt în stare brută / crudă (pentru achiziție la cântar / ambalaj)\n\n`;

    Object.entries(grouped).forEach(([catKey, catItems]) => {
      const catMeta = CATEGORY_LABELS_RO[catKey as keyof typeof CATEGORY_LABELS_RO] || { label: catKey, icon: '•' };
      text += `${catMeta.icon} ${catMeta.label.toUpperCase()}:\n`;
      catItems.forEach(item => {
        const isChecked = checkedIds.has(item.ingredient_id) ? '[X]' : '[ ]';
        text += `  ${isChecked} ${item.name_ro}: ${item.display_amount}\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalIngredientsCount = items.length;
  const completedCount = checkedIds.size;
  const progressPercent = totalIngredientsCount > 0 ? Math.round((completedCount / totalIngredientsCount) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-5 sm:space-y-6 overflow-x-hidden">
      {/* Header card */}
      <div className="bg-gradient-to-r from-[#111722] via-[#141d2a] to-[#0f151f] rounded-3xl border border-amber-500/20 shadow-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-black bg-amber-400/15 border border-amber-400/30 text-amber-300 px-3 py-0.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Sinteză agregată pe 7 zile
            </span>
            <span className="text-xs text-slate-400">
              Scalat pentru {profile.household_size} {profile.household_size === 1 ? 'persoană' : 'persoane'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-heading">
            Lista ta de cumpărături
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
            Toate ingredientele cumulate din rețetele selectate, exprimate în grame și kilograme pentru cumpărături eficiente în supermarket.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 self-stretch sm:self-auto w-full sm:w-auto">
          <button
            onClick={handleCopy}
            className="flex-1 sm:flex-initial h-11 flex items-center justify-center gap-2 px-4 bg-gradient-to-r from-amber-500/15 to-emerald-500/15 hover:from-amber-500/25 hover:to-emerald-500/25 active:scale-[0.98] text-amber-300 rounded-xl text-xs font-extrabold border border-amber-400/30 transition-all shadow-sm"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <Copy className="w-4 h-4 shrink-0 text-amber-400" />}
            <span className="whitespace-nowrap">{copied ? 'Copiat în clipboard!' : 'Copiază lista'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial h-11 flex items-center justify-center gap-2 px-4 border border-white/10 hover:bg-slate-800 active:scale-[0.98] text-slate-300 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            <Printer className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Printează</span>
          </button>
        </div>
      </div>

      {/* CÂNTĂRIRE INFO BANNER: RAW GROCERY WEIGHTS EXPLAINED */}
      <div className="p-4 bg-[#101622] border border-amber-500/25 rounded-2xl flex items-start gap-3 shadow-md">
        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30 mt-0.5">
          <Scale className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-xs text-slate-300 leading-relaxed">
          <h4 className="font-extrabold text-white text-sm mb-0.5">
            Important la cumpărături: Greutăți în stare brută (crudă / negătită)
          </h4>
          <p>
            Toate gramajele din lista de mai jos sunt cantitățile pe care le cumperi de pe raftul sau cântarul magazinului <strong>{profile.preferred_store || 'Kaufland'}</strong>. Prin preparare termică (fript, fiert, copt), mâncarea își modifică volumul (carnea pierde ~25% apă, iar orezul și pastele absorb apă și cresc de ~2.8 ori). În secțiunea <strong>Planificator Mese</strong> vei vedea exact cât să pui pe farfurie la fiecare masă!
          </p>
        </div>
      </div>

      {/* Progress & Store Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Progres cumpărături</span>
            <p className="text-lg font-black text-white">
              {completedCount} / {totalIngredientsCount} <span className="text-xs font-normal text-slate-400">articole</span>
            </p>
          </div>
          <button
            onClick={checkAll}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-xs font-black text-amber-400 hover:text-amber-300 transition-all"
          >
            {checkedIds.size === items.length ? 'Debifează tot' : 'Bifează tot'}
          </button>
        </div>

        <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Supermarket țintă</span>
            <p className="text-sm font-black text-white">{profile.preferred_store || 'Kaufland România'}</p>
          </div>
        </div>

        <div className="bg-[#10151f] p-4 rounded-2xl border border-white/10 shadow-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">Buget săptămânal alocat</span>
            <p className="text-sm font-black text-amber-400">
              {profile.weekly_budget_ron} <span className="text-xs font-bold text-slate-400">RON / săptămână</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grouped Shopping List */}
      <div className="space-y-5">
        {Object.entries(grouped).map(([categoryKey, categoryItems]) => {
          const catMeta = CATEGORY_LABELS_RO[categoryKey as keyof typeof CATEGORY_LABELS_RO] || {
            label: 'Altele',
            icon: '📦'
          };

          return (
            <div
              key={categoryKey}
              className="bg-[#10151f] rounded-3xl border border-white/10 shadow-lg overflow-hidden"
            >
              {/* Category Header */}
              <div className="bg-[#141b27] px-5 py-3.5 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{catMeta.icon}</span>
                  <h3 className="font-black text-sm text-white font-heading">
                    {catMeta.label}
                  </h3>
                </div>
                <span className="text-xs text-amber-400 font-bold bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-md">
                  {categoryItems.length} {categoryItems.length === 1 ? 'ingredient' : 'ingrediente'}
                </span>
              </div>

              {/* Items List */}
              <div className="divide-y divide-white/5">
                {categoryItems.map(item => {
                  const isChecked = checkedIds.has(item.ingredient_id);
                  const isExpanded = expandedId === item.ingredient_id;

                  return (
                    <div key={item.ingredient_id} className={`transition-colors ${isChecked ? 'bg-black/30' : 'hover:bg-white/5'}`}>
                      <div className="flex items-center justify-between p-3.5 sm:px-5">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleCheck(item.ingredient_id)}
                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                              isChecked
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 border-amber-400 text-slate-950 font-black'
                                : 'border-white/20 hover:border-amber-400 bg-black/40'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>

                          <div>
                            <span className={`text-sm font-bold transition-all ${isChecked ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                              {item.name_ro}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-slate-400">
                                Apare în {item.recipe_appearances.length} {item.recipe_appearances.length === 1 ? 'rețetă' : 'rețete'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-xs sm:text-sm font-black px-3 py-1 rounded-xl ${isChecked ? 'bg-white/5 text-slate-500' : 'bg-amber-400/15 border border-amber-400/30 text-amber-300'}`}>
                            {item.display_amount}
                          </span>

                          <button
                            type="button"
                            onClick={() => setExpandedId(isExpanded ? null : item.ingredient_id)}
                            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            title="Vezi rețetele în care este folosit"
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Expanded recipe details */}
                      {isExpanded && (
                        <div className="px-12 pb-3.5 pt-1 text-xs text-slate-300 bg-black/40 border-t border-white/5 space-y-1">
                          <p className="font-extrabold text-amber-400 text-[11px] uppercase tracking-wider">
                            Necesar pentru prepararea:
                          </p>
                          <ul className="list-disc pl-4 space-y-1">
                            {item.recipe_appearances.map((app, idx) => (
                              <li key={idx} className="text-slate-300">
                                <strong className="text-white">{app.recipe_title}</strong> ({app.day_name}) — <span className="text-amber-300 font-bold">{Math.round(app.amount_grams)}g crud</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
