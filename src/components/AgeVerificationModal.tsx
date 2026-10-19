import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ isOpen, onConfirm }) => {
  const [rememberMe, setRememberMe] = useState(true);

  if (!isOpen) return null;

  const handleEnter = () => {
    if (rememberMe) {
      localStorage.setItem('velvetnoir_age_verified', 'true');
    }
    onConfirm();
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e0e16] border border-[#2d2042] rounded-2xl shadow-2xl p-6 sm:p-8 text-center text-slate-200">
        {/* Glow Accent */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Warning Icon & Age Pill */}
        <div className="mx-auto w-16 h-16 mb-4 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
          <ShieldAlert className="w-8 h-8 text-rose-400" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-3">
          <span>RESTRICTED ACCESS</span>
          <span>·</span>
          <span>18+ ADULTS ONLY</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          Age Verification Required
        </h2>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          This entertainment service contains mature adult content, cinematic performances, and sensual themes intended solely for consenting adults of legal age in your jurisdiction (at least 18 years old, or 21 where applicable).
        </p>

        {/* Legal & Safety Commitments */}
        <div className="bg-[#151522] border border-[#232338] rounded-xl p-4 text-left text-xs text-slate-400 mb-6 space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>Strict zero-tolerance policy against non-consensual or underage material.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>All depicted individuals are consenting adults aged 18+ (18 U.S.C. 2257 compliant).</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <span>Privacy-first browsing with encrypted transmission.</span>
          </div>
        </div>

        {/* Remember choice */}
        <label className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-6 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded border-slate-700 bg-slate-900 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 w-4 h-4"
          />
          <span>Remember my verification on this device</span>
        </label>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleExit}
            className="w-full sm:w-1/2 px-5 py-3 rounded-xl border border-slate-700 bg-[#171724] hover:bg-[#202032] text-slate-300 font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>I Am Under 18</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </button>
          
          <button
            onClick={handleEnter}
            className="w-full sm:w-1/2 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold text-sm shadow-lg shadow-purple-900/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>I Am 18+ · Enter</span>
          </button>
        </div>

        <p className="mt-4 text-[11px] text-slate-500">
          By entering, you confirm you have reached the age of majority and consent to viewing adult materials.
        </p>
      </div>
    </div>
  );
};
