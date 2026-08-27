import React, { useState, useEffect } from 'react';
import { Shield, Check, X, Lock } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacy: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('worldplus_cookie_consent');
    if (!consent) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('worldplus_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('worldplus_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-neutral-900/95 backdrop-blur-md text-white border border-neutral-700/80 rounded-xl p-5 shadow-2xl space-y-3">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Privacy &amp; Cookie Consent</span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          WorldPlus uses essential and analytical cookies to personalize content, analyze traffic, and display Google AdSense compliant advertisements in accordance with global GDPR and CCPA standards.
        </p>

        <div className="flex items-center space-x-3 pt-1 text-xs">
          <button
            onClick={handleAccept}
            className="flex-1 py-2 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-lg transition-colors text-center text-xs"
          >
            Accept All
          </button>
          <button
            onClick={handleDecline}
            className="py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors text-xs"
          >
            Essential Only
          </button>
          <button
            onClick={onOpenPrivacy}
            className="text-[11px] text-amber-400 hover:underline font-mono"
          >
            Policy
          </button>
        </div>
      </div>
    </div>
  );
};
