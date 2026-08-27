import React, { useState } from 'react';
import { Lock, Shield, KeyRound, ArrowRight, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onSuccess, onClose }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master passcode for owner
    const validCodes = ['worldplus2026', 'admin', 'worldplus'];
    if (validCodes.includes(passcode.trim().toLowerCase()) || passcode.trim() === 'worldplus2026') {
      localStorage.setItem('worldplus_admin_authenticated', 'true');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl relative space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg bg-neutral-800/60"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl text-white">Editorial Administration</h2>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              worldplus.world Autonomous Pipeline Access
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
              Enter Administrator Passcode
            </label>
            <div className="relative">
              <input
                type="password"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError(false);
                }}
                placeholder="Enter passcode (e.g. worldplus2026)"
                autoFocus
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono tracking-wider"
              />
              <KeyRound className="absolute right-3.5 top-3.5 w-4 h-4 text-neutral-500" />
            </div>
            {error && (
              <p className="flex items-center space-x-1.5 text-red-400 text-xs mt-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Incorrect passcode. Default is: <strong>worldplus2026</strong></span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
          >
            <span>Unlock Control Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <span>Protected by Firebase Rules</span>
          <span>Role: Super Admin</span>
        </div>
      </div>
    </div>
  );
};
