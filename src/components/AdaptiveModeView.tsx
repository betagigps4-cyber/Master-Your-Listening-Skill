import React, { useState, useEffect } from 'react';
import { Brain, Zap, Target, ArrowRight, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { AdaptiveState, LevelKey, Question, Scenario, EvaluatedBadge, ConfidenceLevel } from '../types';
import { AdaptiveEngine } from '../services/adaptiveEngine';
import { SCENARIOS, LEVEL_CFG, LEVEL_ORDER } from '../data/scenariosData';
import { AudioEngine } from '../services/audioEngine';
import { AudioPlayer } from './AudioPlayer';
import { InteractiveQuiz } from './InteractiveQuiz';
import { VoiceWarmupCard } from './VoiceWarmupCard';
import { VoiceWarmupModal } from './VoiceWarmupModal';
import { StorageService } from '../services/storageService';

interface AdaptiveModeViewProps {
  adaptiveState: AdaptiveState;
  onRefreshAdaptiveState: () => void;
  onBadgeUnlocked?: (badge: EvaluatedBadge) => void;
}

export const AdaptiveModeView: React.FC<AdaptiveModeViewProps> = ({
  adaptiveState,
  onRefreshAdaptiveState,
  onBadgeUnlocked
}) => {
  const [currentLevel, setCurrentLevel] = useState<LevelKey>(adaptiveState.recommendedLevel);
  const [currentSection, setCurrentSection] = useState<string>(adaptiveState.recommendedSection);
  const [scenario, setScenario] = useState<Scenario | null>(null);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, ConfidenceLevel>>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeaker, setActiveSpeaker] = useState<any>(null);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(adaptiveState.recommendedSpeed || 1.0);
  const [replaysUsed, setReplaysUsed] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [evaluationFeedback, setEvaluationFeedback] = useState<string | null>(null);
  const [isWarmupOpen, setIsWarmupOpen] = useState(false);
  const [warmupScores, setWarmupScores] = useState<Record<string, number>>(() =>
    StorageService.getWarmupScores()
  );

  // Load active scenario
  useEffect(() => {
    const list = SCENARIOS[currentLevel]?.[currentSection];
    if (list && list.length > 0) {
      setScenario(list[0]);
    } else {
      const firstSec = Object.keys(SCENARIOS[currentLevel] || {})[0];
      if (firstSec) {
        setCurrentSection(firstSec);
        setScenario(SCENARIOS[currentLevel][firstSec][0]);
      }
    }
    setAnswers({});
    setChecked({});
    setConfidenceRatings({});
    setReplaysUsed(0);
    setStartTime(Date.now());
    setEvaluationFeedback(null);
    AudioEngine.stop();
  }, [currentLevel, currentSection]);

  // Connect AudioEngine callbacks
  useEffect(() => {
    AudioEngine.init(
      (spk) => setActiveSpeaker(spk),
      (pl) => setIsPlaying(pl),
      (pr) => setProgress(pr)
    );
    return () => AudioEngine.stop();
  }, []);

  if (!scenario) return null;

  const currentCefr = AdaptiveEngine.getCefrLevel(adaptiveState.currentRating);
  const totalQ = scenario.questions.length;
  const checkedCount = Object.keys(checked).length;
  const allChecked = checkedCount === totalQ && totalQ > 0;
  const correctCount = scenario.questions.filter((q) => checked[q.id] && answers[q.id] === q.correct).length;
  const scorePct = allChecked ? Math.round((correctCount / totalQ) * 100) : 0;

  const handleSelectOption = (qid: string, opt: string) => {
    if (checked[qid]) return;
    setAnswers((prev) => ({ ...prev, [qid]: opt }));
  };

  const handleConfidenceChange = (qid: string, level: ConfidenceLevel) => {
    setConfidenceRatings((prev) => ({ ...prev, [qid]: level }));
  };

  const handleCheckAnswer = (qid: string) => {
    if (!answers[qid] || checked[qid]) return;
    const nextChecked = { ...checked, [qid]: true };
    setChecked(nextChecked);

    // Check if entire section is completed
    if (scenario.questions.every((q) => nextChecked[q.id])) {
      const totalCorrect = scenario.questions.filter(
        (q) => nextChecked[q.id] && answers[q.id] === q.correct
      ).length;
      const pct = Math.round((totalCorrect / scenario.questions.length) * 100);
      const elapsedSec = Math.max(5, Math.round((Date.now() - startTime) / 1000));
      const avgTime = elapsedSec / scenario.questions.length;

      const correctnessMap: Record<string, boolean> = {};
      scenario.questions.forEach((q) => {
        correctnessMap[q.id] = nextChecked[q.id] && answers[q.id] === q.correct;
      });
      const calibrationScore = AdaptiveEngine.computeCalibrationScore(confidenceRatings, correctnessMap);

      const { newRating, delta } = AdaptiveEngine.calculateNewRating(
        adaptiveState.currentRating,
        currentLevel,
        pct,
        replaysUsed,
        avgTime,
        confidenceRatings,
        correctnessMap
      );

      const student = StorageService.getCurrentStudent();
      const newlyUnlocked = StorageService.addAttempt({
        id: `att-adapt-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        level: currentLevel,
        section: currentSection,
        scenarioTitle: scenario.title,
        timestamp: Date.now(),
        scorePercent: pct,
        correctAnswersCount: totalCorrect,
        totalQuestions: scenario.questions.length,
        timeSpentSeconds: elapsedSec,
        replaysUsed,
        playbackSpeed: speed,
        answers,
        confidenceRatings,
        confidenceCalibrationScore: calibrationScore,
        adaptiveRatingDelta: delta,
        calculatedDifficulty: LEVEL_CFG[currentLevel].baseDifficulty
      });

      if (newlyUnlocked && newlyUnlocked.length > 0 && onBadgeUnlocked) {
        onBadgeUnlocked(newlyUnlocked[0]);
      }

      onRefreshAdaptiveState();

      if (pct >= 80) {
        setEvaluationFeedback(
          `Outstanding Mastery! Rating +${delta}. Your calibration has advanced. Stepping up to next challenge tier.`
        );
      } else if (pct >= 60) {
        setEvaluationFeedback(
          `Solid performance (Rating ${delta >= 0 ? '+' : ''}${delta}). Reinforcing key phonetics in current band.`
        );
      } else {
        setEvaluationFeedback(
          `Struggle detected (Rating ${delta}). Algorithmic scaffolding engaged to reinforce fundamental signposts.`
        );
      }
    }
  };

  const handleNextChallenge = () => {
    // Pick next level based on updated rating
    const student = StorageService.getCurrentStudent();
    const nextLevel = AdaptiveEngine.recommendLevel(student.adaptiveRating);
    const sections = Object.keys(SCENARIOS[nextLevel] || {});
    // Pick random or next section
    const randomSec = sections[Math.floor(Math.random() * sections.length)] || 'Section 1';

    setCurrentLevel(nextLevel);
    setCurrentSection(randomSec);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 border border-cyan-500/25 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-black relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Brain className="w-3.5 h-3.5" />
              Dynamic Zone of Proximal Development
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-grotesk">
              Adaptive Listening Engine
            </h1>
            <p className="text-xs sm:text-sm text-white/50 max-w-xl">
              Real-time difficulty adjustment. The algorithm continuously measures your acoustic decoding speed, accuracy, and audio replay frequency to feed you the optimal question difficulty.
            </p>
          </div>

          {/* Real-time stats card */}
          <div className="flex items-center gap-3 bg-black/40 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-[10px] font-mono text-white/40 uppercase">Listener Rating</div>
              <div className="text-2xl font-bold font-mono text-cyan-400">
                {adaptiveState.currentRating}
              </div>
            </div>
            <div className="text-center px-3 border-r border-white/10">
              <div className="text-[10px] font-mono text-white/40 uppercase">CEFR Calibrated</div>
              <div className="text-2xl font-bold font-mono text-amber-400">{currentCefr.code}</div>
            </div>
            <div className="text-center px-3">
              <div className="text-[10px] font-mono text-white/40 uppercase">Recommended Speed</div>
              <div className="text-2xl font-bold font-mono text-emerald-400">
                {adaptiveState.recommendedSpeed}x
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Practice Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-8">
          {/* Active Question Info */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Target Difficulty: {LEVEL_CFG[currentLevel].label} ({currentSection})
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{scenario.title}</h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-white/60 border border-white/10">
              Difficulty: {LEVEL_CFG[currentLevel].baseDifficulty}
            </span>
          </div>

          {/* Pre-Listening Voice Warmup Mode Card */}
          <VoiceWarmupCard
            transcript={scenario.transcript}
            scenarioTitle={scenario.title}
            onOpenWarmup={() => setIsWarmupOpen(true)}
            warmupScore={warmupScores[scenario.title]}
          />

          {/* Audio Player */}
          <AudioPlayer
            transcript={scenario.transcript}
            isPlaying={isPlaying}
            activeSpeaker={activeSpeaker}
            progressPercent={progress}
            playbackSpeed={speed}
            onSpeedChange={setSpeed}
            replaysUsed={replaysUsed}
            onReplayIncrement={() => setReplaysUsed((r) => r + 1)}
            onPlayToggle={() => AudioEngine.togglePauseResume(scenario.transcript, speed)}
            onReset={() => {
              AudioEngine.stop();
              setProgress(0);
            }}
          />

          {/* Interactive Questions with Real-Time AI Transcript Explanations */}
          <InteractiveQuiz
            questions={scenario.questions}
            answers={answers}
            checked={checked}
            confidenceRatings={confidenceRatings}
            onConfidenceChange={handleConfidenceChange}
            onSelectOption={handleSelectOption}
            onCheckAnswer={handleCheckAnswer}
            transcript={scenario.transcript}
            level={LEVEL_CFG[currentLevel].label}
            onSeekToAudio={(pct) => {
              AudioEngine.seekToPercent(scenario.transcript, pct, speed);
              setProgress(pct);
              setIsPlaying(true);
            }}
          />

          {/* Section Complete Adaptive Feedback */}
          {allChecked && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-transparent border border-cyan-500/30 space-y-4 anim-fade">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-cyan-400" />
                <div>
                  <h4 className="text-lg font-bold text-white">Section Evaluation Complete</h4>
                  <p className="text-xs text-cyan-300">{evaluationFeedback}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-white/60">
                  Score: <span className="text-white font-bold">{scorePct}%</span> ({correctCount}/{totalQ})
                </div>
                <button
                  onClick={handleNextChallenge}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-semibold text-xs flex items-center gap-2 hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-400/20"
                >
                  <span>Advance to Next Adaptive Task</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Adaptive Telemetry */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-white/[0.08] bg-white/[0.02] space-y-6">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/40">
              <Zap className="w-4 h-4 text-cyan-400" />
              Real-Time Adaptive Metrics
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-white/40">Confidence Index</span>
                  <span className="text-cyan-400">{adaptiveState.confidenceScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all"
                    style={{ width: `${adaptiveState.confidenceScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-white/40">Replay Penalty Index</span>
                  <span className={replaysUsed === 0 ? 'text-emerald-400' : 'text-amber-400'}>
                    {replaysUsed === 0 ? '0.0 (First-Take Master)' : `${replaysUsed * 0.08}x factor`}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-white/40">Active CEFR Standard</span>
                  <span className="text-white font-bold">{currentCefr.label} ({currentCefr.code})</span>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed mt-1">
                  {currentCefr.description}
                </p>
              </div>
            </div>

            {/* Level Mastery Breakdown */}
            <div className="pt-4 border-t border-white/[0.06] space-y-3">
              <div className="text-[10px] font-mono uppercase text-white/40">Level Proficiency Map</div>
              <div className="space-y-2">
                {LEVEL_ORDER.map((lk) => {
                  const m = adaptiveState.activeLevelMastery[lk] || 0;
                  const cfg = LEVEL_CFG[lk];
                  return (
                    <div key={lk} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className={lk === currentLevel ? 'text-cyan-300 font-bold' : 'text-white/50'}>
                          {cfg.label}
                        </span>
                        <span className="text-white/40">{m}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full"
                          style={{ width: `${m}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Warmup Modal */}
      {scenario && (
        <VoiceWarmupModal
          isOpen={isWarmupOpen}
          onClose={() => setIsWarmupOpen(false)}
          transcript={scenario.transcript}
          scenarioTitle={scenario.title}
          onCompleteWarmup={(score) => {
            setWarmupScores((prev) => ({
              ...prev,
              [scenario.title]: score
            }));
            StorageService.saveWarmupScore(scenario.title, score);
          }}
        />
      )}
    </div>
  );
};
