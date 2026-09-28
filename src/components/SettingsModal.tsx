import React, { useState, useEffect } from 'react';
import { X, Key, Check, RotateCcw, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';
import { db } from '../services/db';
import { spoonacularService } from '../services/spoonacular';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshData: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onRefreshData
}) => {
  const [apiKey, setApiKey] = useState<string>(db.getSpoonacularApiKey());
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Lock body scroll, sync key and listen to Escape key
  useEffect(() => {
    if (!isOpen) return;

    setApiKey(db.getSpoonacularApiKey());

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

  if (!isOpen) return null;

  const handleSave = () => {
    db.setSpoonacularApiKey(apiKey);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleTestAndSync = async () => {
    db.setSpoonacularApiKey(apiKey);
    setIsTesting(true);
    setTestResult(null);

    try {
      const result = await spoonacularService.searchRecipes({
        mealType: 'lunch',
        number: 4
      });

      if (result.source === 'live_api') {
        setTestResult(`Succes! S-au sincronizat ${result.recipes.length} rețete direct din Spoonacular API.`);
        onRefreshData();
      } else {
        setTestResult(`Catalog local activ (${result.recipes.length} rețete adaptate pieței din România disponibile). Dacă adaugi o cheie Spoonacular validă, vor fi descărcate rețete noi.`);
      }
    } catch (err: any) {
      setTestResult(`Eroare: ${err.message || 'Verifică conexiunea sau cheia API.'}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleResetDefaults = () => {
    if (confirm('Sigur dorești să resetezi rețetele și planul la valorile inițiale?')) {
      db.resetToDefaults();
      onRefreshData();
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0f141e] text-slate-100 rounded-t-[32px] sm:rounded-3xl shadow-2xl w-full max-w-lg max-h-[92vh] sm:max-h-[85vh] border border-amber-500/25 overflow-hidden flex flex-col animate-sheet-up">
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
              <Key className="w-4 h-4 text-amber-400" />
            </div>
            <h2 className="text-sm sm:text-base font-black font-heading text-white">
              Configurare API Spoonacular & Date
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain scrollbar-none flex-1 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Cheie API Spoonacular (Opțional)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="Ex: 8b2f1e4... (lasă gol pentru catalogul românesc)"
                className="flex-1 h-11 px-3.5 text-xs bg-[#141b27] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 font-mono transition-all"
              />
              <button
                type="button"
                onClick={handleSave}
                className="h-11 px-5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] text-slate-950 rounded-xl text-xs font-black transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 shrink-0"
              >
                {isSaved ? <Check className="w-4 h-4 text-slate-950" /> : 'Salvează'}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Aplicația include deja un catalog românesc bogat calibrat pe grame la cântar și în farfurie. Dacă adaugi o cheie Spoonacular (free tier), rețetele noi vor fi preluate în timp real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestAndSync}
              disabled={isTesting}
              className="w-full h-11 flex items-center justify-center gap-2 px-4 bg-[#141b27] hover:bg-slate-800 active:scale-[0.98] text-slate-200 border border-white/10 text-xs font-bold rounded-xl transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 text-amber-400 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Se testează...' : 'Testează conexiunea API & Sincronizează'}</span>
            </button>
          </div>

          {testResult && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl text-xs text-emerald-200 leading-relaxed">
              {testResult}
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-white">Resetare date locale</p>
              <p className="text-[11px] text-slate-400">Reinițializează rețetele și meniurile</p>
            </div>
            <button
              type="button"
              onClick={handleResetDefaults}
              className="h-10 px-4 self-start sm:self-auto flex items-center justify-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-bold rounded-xl hover:bg-rose-950/40 border border-rose-500/20 active:scale-[0.98] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetează</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
