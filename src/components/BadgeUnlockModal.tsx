import React from 'react';
import { Trophy, Sparkles, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { EvaluatedBadge } from '../types';

interface BadgeUnlockModalProps {
  badge: EvaluatedBadge | null;
  onClose: () => void;
  onViewProfile: () => void;
}

export const BadgeUnlockModal: React.FC<BadgeUnlockModalProps> = ({
  badge,
  onClose,
  onViewProfile
}) => {
  if (!badge) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md anim-fade">
      <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#171A24] to-[#0A0C12] border border-amber-400/40 shadow-2xl relative overflow-hidden text-center space-y-6">
        {/* Background celebration glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full filter blur-3xl pointer-events-none" />

        {/* Header Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Digital Trophy Awarded!</span>
        </div>

        {/* Trophy Medallion */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-400 to-yellow-300 p-1 shadow-2xl shadow-amber-500/40 flex items-center justify-center animate-bounce">
          <div className="w-full h-full rounded-[22px] bg-[#0E121A] flex flex-col items-center justify-center">
            <Trophy className="w-12 h-12 text-amber-400 drop-shadow-md" />
            <span className="text-[9px] font-mono uppercase font-bold text-amber-300 tracking-wider mt-1">
              {badge.tier}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-grotesk tracking-tight">
            {badge.title}
          </h2>
          <p className="text-xs font-mono text-amber-400">
            {badge.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-white/70 max-w-xs mx-auto leading-relaxed">
            {badge.description}
          </p>
        </div>

        {/* Milestone confirmation */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white/50 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Permanently recorded in candidate transcript</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 text-xs font-semibold transition-colors"
          >
            Continue Practice
          </button>
          <button
            onClick={onViewProfile}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-bold transition-all shadow-lg shadow-amber-500/30 flex items-center justify-center gap-1.5"
          >
            <span>Trophy Cabinet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
