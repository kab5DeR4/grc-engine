import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Shield, X } from 'lucide-react';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('grc_cookie_consent');
    if (!consent) {
      // delay slight appearance for smooth UX
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('grc_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('grc_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 shrink-0 border border-orange-200 dark:border-orange-800/60">
          <Cookie size={18} />
        </div>

        <div className="space-y-1.5 flex-1 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <span>Privacy & Storage Preferences</span>
            </h3>
            <button
              onClick={handleDecline}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors p-0.5"
              aria-label="Dismiss cookie notice"
            >
              <X size={14} />
            </button>
          </div>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            We use essential local storage strictly for security sessions and theme preferences. No intrusive ad trackers. Read our{' '}
            <Link to="/privacy" className="text-orange-600 dark:text-orange-400 underline hover:opacity-80">
              Privacy Policy
            </Link>.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleAccept}
              className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
