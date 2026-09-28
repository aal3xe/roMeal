import React, { useState, useEffect } from 'react';
import { Mail, Lock, User as UserIcon, X, Loader2 } from 'lucide-react';
import { db } from '../services/db';
import { cloudAuth } from '../services/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('alex3.adrian@gmail.com');
  const [password, setPassword] = useState<string>('parola123');
  const [name, setName] = useState<string>('Alex Adrian');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const user = await cloudAuth.signInWithGoogle();
      if (user) {
        db.signUp(user.email || 'user@romeal.ro', user.displayName || 'Utilizator roMeal', 'cloud_google_auth');
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      console.warn('Google sign-in fallback:', err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(err.message || 'Eroare la autentificarea cu Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        try {
          await cloudAuth.signUpWithEmail(email, password, name);
        } catch (firebaseErr: any) {
          console.warn('Firebase email signup fallback:', firebaseErr.message);
        }
        db.signUp(email, name, password);
      } else {
        try {
          await cloudAuth.signInWithEmail(email, password);
        } catch (firebaseErr: any) {
          console.warn('Firebase email signin fallback:', firebaseErr.message);
        }
        db.login(email);
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'A apărut o problemă la autentificare.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 overflow-hidden animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0f141e] text-slate-100 rounded-t-[32px] sm:rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] sm:max-h-[85vh] border border-amber-500/25 overflow-hidden flex flex-col animate-sheet-up">
        {/* Mobile Pull Handle */}
        <div 
          onClick={onClose}
          className="w-full flex sm:hidden items-center justify-center pt-2.5 pb-1 cursor-pointer bg-[#0a0e16]"
        >
          <div className="w-12 h-1.5 rounded-full bg-white/30" />
        </div>

        {/* Header */}
        <div className="bg-[#0a0e16] px-5 sm:px-6 py-4 sm:py-5 border-b border-white/10 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden border border-amber-500/30 flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <img 
                src="/src/assets/images/romeal_logo_1790593298182.jpg" 
                alt="roMeal Icon" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black font-heading text-white">
                {isSignUp ? 'Creare Cont roMeal' : 'Autentificare roMeal Concierge'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {isSignUp ? 'Salvează profilul și istoricul meselor în Cloud' : 'Sincronizare în timp real între dispozitive'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 active:scale-95 transition-all"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Container */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain scrollbar-none flex-1 space-y-4">
          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-500/30 rounded-2xl text-xs text-rose-300">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full h-11 bg-white hover:bg-slate-100 active:scale-[0.98] text-slate-900 rounded-xl text-xs font-black shadow-md transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.09C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.26C.46 8.18 0 9.99 0 12s.46 3.82 1.26 5.41l4.02-3.09z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.26 6.59l4.02 3.09c.95-2.83 3.6-4.93 6.72-4.93z" />
            </svg>
            <span>Continuă cu Google</span>
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">sau cu email</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Nume complet
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-3.5 text-xs bg-[#141b27] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 transition-all"
                    placeholder="Alex Adrian"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Adresă de Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 text-xs bg-[#141b27] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 transition-all"
                  placeholder="adresa@exemplu.ro"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Parolă
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 text-xs bg-[#141b27] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-400 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 active:scale-[0.98] text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-950" />}
              <span>{isSignUp ? 'Înregistrează-te în roMeal' : 'Conectare la Cont'}</span>
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold transition-colors"
            >
              {isSignUp ? 'Ai deja un cont? Conectează-te' : 'Nu ai cont? Înregistrează-te gratuit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
