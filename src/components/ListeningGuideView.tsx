import React, { useState } from 'react';
import { BookOpen, Sparkles, Volume2, ArrowRight, ShieldCheck, Compass, Target, CheckCircle } from 'lucide-react';
import { LISTENING_GUIDES } from '../data/listeningGuides';
import { AudioEngine } from '../services/audioEngine';
import { LevelKey } from '../types';

interface ListeningGuideViewProps {
  onGoToLevel: (level: LevelKey, section?: string) => void;
}

export const ListeningGuideView: React.FC<ListeningGuideViewProps> = ({ onGoToLevel }) => {
  const [activeGuideId, setActiveGuideId] = useState<string>(LISTENING_GUIDES[0].id);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  const activeGuide = LISTENING_GUIDES.find((g) => g.id === activeGuideId) || LISTENING_GUIDES[0];

  const handleTestAudio = () => {
    if (isPlayingDemo) {
      AudioEngine.stop();
      setIsPlayingDemo(false);
    } else {
      setIsPlayingDemo(true);
      AudioEngine.playTranscript(
        `[M1]Notice this key point: [F2]We originally planned to meet at nine o'clock, [M1]however, [F2]consequently the lecture hall was changed to room fourteen at nine thirty.`
      );
      setTimeout(() => setIsPlayingDemo(false), 9000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          Mastery Curriculum & Acoustic Science
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-grotesk">
          How to Improve Your <span className="text-emerald-400">Listening Skill</span>
        </h1>
        <p className="text-sm sm:text-base text-white/40 max-w-xl mx-auto leading-relaxed">
          Five research-grounded auditory decoding pillars used by top-band IELTS & TOEFL scorers to effortlessly parse fast, connected speech.
        </p>
      </div>

      {/* Main Grid: Guide Navigator + Active Pillar Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 px-2">
            Auditory Pillars
          </div>
          <div className="space-y-2">
            {LISTENING_GUIDES.map((g, idx) => {
              const isSelected = g.id === activeGuideId;
              return (
                <button
                  key={g.id}
                  onClick={() => setActiveGuideId(g.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs focus:outline-none ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-white shadow-lg shadow-emerald-500/10'
                      : 'bg-white/[0.02] border-white/[0.05] text-white/50 hover:bg-white/[0.05] hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-emerald-400/80">PILLAR 0{idx + 1}</span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                      {g.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-white/90 leading-snug">{g.title}</h3>
                </button>
              );
            })}
          </div>

          {/* Quick Signpost Cheat Sheet Card */}
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3 mt-6">
            <div className="flex items-center gap-2 text-xs font-bold text-white/80">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Exam Cheat Sheet</span>
            </div>
            <p className="text-[11px] text-white/30 leading-relaxed">
              When you hear <code className="text-orange-300">"Actually..."</code> or <code className="text-orange-300">"At first..."</code>, prepare for an immediate pivot that corrects previous dummy numbers.
            </p>
            <button
              onClick={handleTestAudio}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors border border-white/10"
            >
              <Volume2 className="w-3.5 h-3.5 text-orange-400" />
              <span>{isPlayingDemo ? 'Stop Example' : 'Play Acoustic Trap Audio'}</span>
            </button>
          </div>
        </div>

        {/* Selected Pillar Content */}
        <div className="space-y-8 p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-white/[0.015] backdrop-blur-xl">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {activeGuide.badge}
              </span>
              <span className="text-xs text-white/30 font-mono">• {activeGuide.category}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-grotesk leading-tight">
              {activeGuide.title}
            </h2>
            <p className="text-base text-white/60 leading-relaxed">
              {activeGuide.summary}
            </p>
          </div>

          {/* Core Insights */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Deep Cognitive Architecture
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {activeGuide.details.map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs text-white/70 leading-relaxed flex items-start gap-3">
                  <span className="font-mono text-emerald-400 font-bold shrink-0">0{i + 1}.</span>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Steps */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Target className="w-4 h-4 text-teal-400" />
              Execution Protocol
            </h3>
            <div className="space-y-2.5">
              {activeGuide.actionSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-white/80">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Signals Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white/40 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Auditory Signal Triggers & Decoding
            </h3>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/20">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.02] text-[10px] font-mono text-white/40 uppercase">
                    <th className="p-3.5">What Your Ears Hear</th>
                    <th className="p-3.5">What Your Brain Must Interpret</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {activeGuide.keySignals.map((sig, i) => (
                    <tr key={i} className="hover:bg-white/[0.01]">
                      <td className="p-3.5 font-mono text-orange-300">{sig.trigger}</td>
                      <td className="p-3.5 text-white/60">{sig.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Practice Recommendation */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[9px] uppercase font-mono text-emerald-400 tracking-wider">Suggested Drill</span>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">{activeGuide.practicePrompt}</p>
            </div>
            <button
              onClick={() => onGoToLevel('Intermediate', 'Section 1')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs flex items-center gap-2 hover:bg-emerald-400 transition-colors shrink-0"
            >
              <span>Practice Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
