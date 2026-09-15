import React, { useState, useEffect, useMemo } from 'react';
import {
  Headphones,
  Brain,
  Award,
  ChevronRight,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
  BarChart2,
  Mic,
  Timer,
  Target
} from 'lucide-react';
import {
  LevelKey,
  Scenario,
  AttemptRecord,
  StudentProfile,
  AdaptiveState,
  EvaluatedBadge,
  DeepWorkSession,
  ConfidenceLevel
} from './types';
import { SCENARIOS, LEVEL_CFG, LEVEL_ORDER } from './data/scenariosData';
import { AudioEngine } from './services/audioEngine';
import { AdaptiveEngine } from './services/adaptiveEngine';
import { StorageService } from './services/storageService';
import { SoundEffects } from './services/soundEffects';
import { Navbar, AppTab } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { ListeningGuideView } from './components/ListeningGuideView';
import { AdaptiveModeView } from './components/AdaptiveModeView';
import { PhonemeDrillTab } from './components/PhonemeDrillTab';
import { EducatorDashboard } from './components/EducatorDashboard';
import { ExportReportModal } from './components/ExportReportModal';
import { StudentProfileView } from './components/StudentProfileView';
import { BadgeUnlockModal } from './components/BadgeUnlockModal';
import { VoiceWarmupCard } from './components/VoiceWarmupCard';
import { VoiceWarmupModal } from './components/VoiceWarmupModal';
import { DeepWorkTimer } from './components/DeepWorkTimer';
import { DeepWorkGoalModal } from './components/DeepWorkGoalModal';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<AppTab>('practice');

  // Persistence State
  const [student, setStudent] = useState<StudentProfile>(StorageService.getCurrentStudent());
  const [attempts, setAttempts] = useState<AttemptRecord[]>(StorageService.getAttempts());
  const [activeUnlockedBadge, setActiveUnlockedBadge] = useState<EvaluatedBadge | null>(null);

  // Practice Mode State
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>('Primary');
  const [selectedSection, setSelectedSection] = useState<string>('Section 1');
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [confidenceRatings, setConfidenceRatings] = useState<Record<string, ConfidenceLevel>>({});
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [replaysUsed, setReplaysUsed] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Audio Engine State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeSpeaker, setActiveSpeaker] = useState<any>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);

  // Export Modal State
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // Voice Warmup State
  const [isWarmupOpen, setIsWarmupOpen] = useState<boolean>(false);
  const [warmupScores, setWarmupScores] = useState<Record<string, number>>(() =>
    StorageService.getWarmupScores()
  );

  // Deep Work Timer State
  const [isDeepWorkOpen, setIsDeepWorkOpen] = useState<boolean>(false);
  const [deepWorkSession, setDeepWorkSession] = useState<DeepWorkSession>({
    targetQuestions: 6,
    targetMinutes: 8,
    timeRemainingSeconds: 480,
    totalDurationSeconds: 480,
    completedQuestionsCount: 0,
    correctQuestionsCount: 0,
    status: 'idle',
    startedAt: null,
    completedAt: null
  });
  const [deepWorkGoalModalSession, setDeepWorkGoalModalSession] = useState<DeepWorkSession | null>(null);

  // Initialize AudioEngine callbacks
  useEffect(() => {
    AudioEngine.init(
      (speaker) => setActiveSpeaker(speaker),
      (playing) => setIsPlaying(playing),
      (progress) => setProgressPercent(progress)
    );
    return () => AudioEngine.stop();
  }, []);

  // Compute Adaptive State dynamically from attempts
  const adaptiveState: AdaptiveState = useMemo(() => {
    return AdaptiveEngine.computeAdaptiveState(attempts, student.adaptiveRating);
  }, [attempts, student.adaptiveRating]);

  // Current Scenario
  const currentScenario: Scenario | null = useMemo(() => {
    const levelSections = SCENARIOS[selectedLevel];
    if (!levelSections) return null;
    const scenarioList = levelSections[selectedSection] || Object.values(levelSections)[0];
    return scenarioList && scenarioList.length > 0 ? scenarioList[0] : null;
  }, [selectedLevel, selectedSection]);

  // Reset question state when scenario changes
  useEffect(() => {
    setAnswers({});
    setChecked({});
    setConfidenceRatings({});
    setShowTranscript(false);
    setReplaysUsed(0);
    setStartTime(Date.now());
    AudioEngine.stop();
  }, [selectedLevel, selectedSection]);

  // Handle Level Selection
  const handleSelectLevel = (level: LevelKey) => {
    setSelectedLevel(level);
    const availableSections = Object.keys(SCENARIOS[level] || {});
    if (availableSections.length > 0) {
      setSelectedSection(availableSections[0]);
    }
  };

  // Section completion status
  const totalQuestions = currentScenario?.questions.length || 0;
  const answeredCount = Object.keys(checked).length;
  const isSectionComplete = totalQuestions > 0 && answeredCount === totalQuestions;
  const correctCount = currentScenario
    ? currentScenario.questions.filter((q) => checked[q.id] && answers[q.id] === q.correct).length
    : 0;
  const sectionScore = isSectionComplete ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Handle Question Answer Selection
  const handleSelectOption = (questionId: string, option: string) => {
    if (checked[questionId]) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  // Handle Question Confidence Selection
  const handleConfidenceChange = (questionId: string, level: ConfidenceLevel) => {
    setConfidenceRatings((prev) => ({ ...prev, [questionId]: level }));
  };

  // Handle Question Answer Verification
  const handleCheckAnswer = (questionId: string) => {
    if (!answers[questionId] || checked[questionId] || !currentScenario) return;

    const nextChecked = { ...checked, [questionId]: true };
    setChecked(nextChecked);

    const targetQ = currentScenario.questions.find((q) => q.id === questionId);
    const isCorrect = targetQ ? answers[questionId] === targetQ.correct : false;

    // Track question in Deep Work sprint if active
    if (deepWorkSession.status === 'running') {
      SoundEffects.playQuestionTick(isCorrect);

      setDeepWorkSession((prev) => {
        if (prev.status !== 'running') return prev;

        const nextCompleted = prev.completedQuestionsCount + 1;
        const nextCorrect = isCorrect ? prev.correctQuestionsCount + 1 : prev.correctQuestionsCount;
        const isGoalMet = nextCompleted >= prev.targetQuestions;

        const updatedSession: DeepWorkSession = {
          ...prev,
          completedQuestionsCount: nextCompleted,
          correctQuestionsCount: nextCorrect,
          status: isGoalMet ? 'completed' : prev.status,
          completedAt: isGoalMet ? Date.now() : null
        };

        if (isGoalMet) {
          SoundEffects.playGoalAchievedFanfare();
          const timeSpent = Math.max(1, prev.totalDurationSeconds - prev.timeRemainingSeconds);
          const mins = Math.floor(timeSpent / 60);
          const secs = timeSpent % 60;
          const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
          const acc = Math.round((nextCorrect / nextCompleted) * 100);
          SoundEffects.sendGoalMetNotification(prev.targetQuestions, timeStr, acc);
          StorageService.recordCompletedDeepWorkSession(nextCompleted, timeSpent);

          setDeepWorkGoalModalSession(updatedSession);
        }

        return updatedSession;
      });
    }

    // If this completed the section, save attempt and update adaptive stats
    if (currentScenario.questions.every((q) => nextChecked[q.id])) {
      const allCorrect = currentScenario.questions.filter(
        (q) => nextChecked[q.id] && answers[q.id] === q.correct
      ).length;
      const scorePct = Math.round((allCorrect / currentScenario.questions.length) * 100);
      const elapsedSec = Math.max(5, Math.round((Date.now() - startTime) / 1000));
      const avgTime = elapsedSec / currentScenario.questions.length;

      const correctnessMap: Record<string, boolean> = {};
      currentScenario.questions.forEach((q) => {
        correctnessMap[q.id] = nextChecked[q.id] && answers[q.id] === q.correct;
      });
      const calibrationScore = AdaptiveEngine.computeCalibrationScore(confidenceRatings, correctnessMap);

      const { delta } = AdaptiveEngine.calculateNewRating(
        student.adaptiveRating,
        selectedLevel,
        scorePct,
        replaysUsed,
        avgTime,
        confidenceRatings,
        correctnessMap
      );

      const newAttempt: AttemptRecord = {
        id: `att-${Date.now()}`,
        studentId: student.id,
        studentName: student.name,
        level: selectedLevel,
        section: selectedSection,
        scenarioTitle: currentScenario.title,
        timestamp: Date.now(),
        scorePercent: scorePct,
        correctAnswersCount: allCorrect,
        totalQuestions: currentScenario.questions.length,
        timeSpentSeconds: elapsedSec,
        replaysUsed,
        playbackSpeed,
        answers,
        confidenceRatings,
        confidenceCalibrationScore: calibrationScore,
        adaptiveRatingDelta: delta,
        calculatedDifficulty: LEVEL_CFG[selectedLevel].baseDifficulty
      };

      const newlyUnlocked = StorageService.addAttempt(newAttempt);
      if (newlyUnlocked && newlyUnlocked.length > 0) {
        setActiveUnlockedBadge(newlyUnlocked[0]);
      }
      setAttempts(StorageService.getAttempts());
      setStudent(StorageService.getCurrentStudent());
    }
  };

  // Switch to next section
  const handleNextSection = () => {
    const sections = Object.keys(SCENARIOS[selectedLevel] || {});
    const curIdx = sections.indexOf(selectedSection);
    if (curIdx >= 0 && curIdx < sections.length - 1) {
      setSelectedSection(sections[curIdx + 1]);
    } else {
      // Advance level
      const lvlIdx = LEVEL_ORDER.indexOf(selectedLevel);
      if (lvlIdx < LEVEL_ORDER.length - 1) {
        const nextLvl = LEVEL_ORDER[lvlIdx + 1];
        setSelectedLevel(nextLvl);
        const nextSections = Object.keys(SCENARIOS[nextLvl] || {});
        setSelectedSection(nextSections[0] || 'Section 1');
      }
    }
  };

  // Re-read storage
  const handleRefreshData = () => {
    setAttempts(StorageService.getAttempts());
    setStudent(StorageService.getCurrentStudent());
  };

  // Available sections for current level
  const sectionsList = useMemo(() => {
    return Object.keys(SCENARIOS[selectedLevel] || {});
  }, [selectedLevel]);

  // Total exercises across entire library
  const totalLibraryScenarios = useMemo(() => {
    let count = 0;
    for (const lvl of LEVEL_ORDER) {
      const secs = SCENARIOS[lvl];
      if (secs) {
        count += Object.keys(secs).length;
      }
    }
    return count;
  }, []);

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200">
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        student={student}
        totalQuestionsCount={totalLibraryScenarios}
      />

      {/* Main Tab Content */}
      <main className="flex-1 pb-16">
        {currentTab === 'practice' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
            {/* Level Selector Bar */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                    Difficulty Progression
                  </span>
                  <span className="text-xs font-mono text-orange-400 font-bold">
                    [Tier {LEVEL_ORDER.indexOf(selectedLevel) + 1} of 8]
                  </span>
                </div>
                <span className="text-[11px] font-mono text-white/40 hidden sm:inline">
                  {totalLibraryScenarios} Scenarios in Library
                </span>
              </div>

              {/* Scrollable / Responsive Level Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                {LEVEL_ORDER.map((lvl) => {
                  const cfg = LEVEL_CFG[lvl];
                  const isSelected = selectedLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      onClick={() => handleSelectLevel(lvl)}
                      className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden group focus:outline-none ${
                        isSelected
                          ? 'bg-gradient-to-b from-orange-500/20 to-amber-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10'
                          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[9px] font-mono uppercase tracking-wider ${
                            isSelected ? 'text-orange-300 font-bold' : 'text-white/40'
                          }`}
                        >
                          {cfg.targetCefr}
                        </span>
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: cfg.accent }}
                        />
                      </div>
                      <div
                        className={`text-xs font-bold truncate ${
                          isSelected ? 'text-white' : 'text-white/70 group-hover:text-white'
                        }`}
                      >
                        {cfg.label}
                      </div>
                      <div className="text-[9px] font-mono text-white/30 truncate mt-0.5">
                        Diff: {cfg.baseDifficulty}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Section Selector + Active Scenario Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
              {/* Section List Drawer */}
              <div className="p-4 sm:p-5 rounded-3xl border border-white/[0.07] bg-white/[0.02] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    {LEVEL_CFG[selectedLevel].label} Sections
                  </span>
                  <span className="text-[10px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full">
                    {sectionsList.length} Units
                  </span>
                </div>

                <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1">
                  {sectionsList.map((sec) => {
                    const isSelected = selectedSection === sec;
                    const secScenario = SCENARIOS[selectedLevel][sec]?.[0];
                    return (
                      <button
                        key={sec}
                        onClick={() => setSelectedSection(sec)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs transition-all flex items-center justify-between group focus:outline-none ${
                          isSelected
                            ? 'bg-orange-500/20 border-orange-500/40 text-orange-200 font-medium'
                            : 'bg-white/[0.01] border-transparent text-white/60 hover:bg-white/[0.04] hover:text-white'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <div className="font-mono text-[10px] text-white/40 uppercase">{sec}</div>
                          <div className="truncate font-medium">{secScenario?.title || sec}</div>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isSelected
                              ? 'text-orange-400 translate-x-0.5'
                              : 'text-white/20 group-hover:text-white/40'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Exercise Area */}
              {currentScenario ? (
                <div className="space-y-8">
                  {/* Scenario Metadata Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {LEVEL_CFG[selectedLevel].targetCefr} • {LEVEL_CFG[selectedLevel].label}
                        </span>
                        <span className="text-xs text-white/40 font-mono">
                          {selectedSection}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold font-grotesk text-white">
                        {currentScenario.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Deep Work Focus Timer Toggle */}
                      <button
                        onClick={() => setIsDeepWorkOpen(!isDeepWorkOpen)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                          deepWorkSession.status === 'running'
                            ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/50 shadow-md shadow-orange-500/15'
                            : deepWorkSession.status === 'paused'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : isDeepWorkOpen
                            ? 'bg-orange-500/15 text-orange-300 border-orange-500/40'
                            : 'bg-white/[0.03] text-white/60 hover:text-white border-white/[0.08]'
                        }`}
                        title="Deep Work timed question challenge"
                      >
                        <Target className="w-3.5 h-3.5 text-orange-400" />
                        <span>Deep Work</span>
                        {deepWorkSession.status === 'running' && (
                          <span className="px-1.5 py-0.5 rounded bg-orange-500/25 text-[10px] text-orange-200 font-bold font-mono">
                            {deepWorkSession.completedQuestionsCount}/{deepWorkSession.targetQuestions} • {Math.floor(deepWorkSession.timeRemainingSeconds / 60)}:{(deepWorkSession.timeRemainingSeconds % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                        {deepWorkSession.status === 'paused' && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/25 text-[10px] text-amber-200 font-bold font-mono">
                            PAUSED
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => setIsWarmupOpen(true)}
                        className="px-3 py-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Practice speaking key phonemes before listening"
                      >
                        <Mic className="w-3.5 h-3.5 text-orange-400" />
                        <span>Voice Warmup</span>
                      </button>

                      <button
                        onClick={() => setShowTranscript(!showTranscript)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                          showTranscript
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            : 'bg-white/[0.03] text-white/40 hover:text-white border-white/[0.08]'
                        }`}
                      >
                        {showTranscript ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hide Transcript</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Inspect Transcript</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Optional Deep Work Focus Sprint Timer */}
                  <DeepWorkTimer
                    session={deepWorkSession}
                    onUpdateSession={setDeepWorkSession}
                    isOpen={isDeepWorkOpen}
                    onToggleOpen={() => setIsDeepWorkOpen(!isDeepWorkOpen)}
                    onGoalMet={(s) => setDeepWorkGoalModalSession(s)}
                  />

                  {/* Pre-Listening Voice Warmup Mode Card */}
                  <VoiceWarmupCard
                    transcript={currentScenario.transcript}
                    scenarioTitle={currentScenario.title}
                    onOpenWarmup={() => setIsWarmupOpen(true)}
                    warmupScore={warmupScores[currentScenario.title]}
                  />

                  {/* Audio Synthesizer Player */}
                  <AudioPlayer
                    transcript={currentScenario.transcript}
                    isPlaying={isPlaying}
                    activeSpeaker={activeSpeaker}
                    progressPercent={progressPercent}
                    playbackSpeed={playbackSpeed}
                    onSpeedChange={setPlaybackSpeed}
                    replaysUsed={replaysUsed}
                    onReplayIncrement={() => setReplaysUsed((r) => r + 1)}
                    onPlayToggle={() =>
                      AudioEngine.togglePauseResume(currentScenario.transcript, playbackSpeed)
                    }
                    onReset={() => {
                      AudioEngine.stop();
                      setProgressPercent(0);
                    }}
                    onSeek={(pct) => {
                      AudioEngine.seekToPercent(currentScenario.transcript, pct, playbackSpeed);
                      setProgressPercent(pct);
                    }}
                  />

                  {/* Transcript Reveal Box (Optional) */}
                  {showTranscript && (
                    <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/25 space-y-2 anim-fade">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Acoustic Transcript (With Speaker Tokens)</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-mono">
                        {currentScenario.transcript}
                      </p>
                    </div>
                  )}

                  {/* Interactive Questions */}
                  <InteractiveQuiz
                    questions={currentScenario.questions}
                    answers={answers}
                    checked={checked}
                    confidenceRatings={confidenceRatings}
                    onConfidenceChange={handleConfidenceChange}
                    onSelectOption={handleSelectOption}
                    onCheckAnswer={handleCheckAnswer}
                    transcript={currentScenario.transcript}
                    level={LEVEL_CFG[selectedLevel].label}
                    onSeekToAudio={(pct) => {
                      AudioEngine.seekToPercent(currentScenario.transcript, pct, playbackSpeed);
                      setProgressPercent(pct);
                      setIsPlaying(true);
                    }}
                  />

                  {/* Completion & Mastery Banner */}
                  {isSectionComplete && (
                    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-transparent border border-orange-500/30 space-y-4 anim-fade">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="inline-flex items-center gap-2 text-xs font-mono text-orange-400 uppercase tracking-widest">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Section Verified</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white font-grotesk">
                            Accuracy: {sectionScore}% ({correctCount}/{totalQuestions} Correct)
                          </h3>
                          <p className="text-xs text-white/60">
                            Replays utilized: {replaysUsed} • Audio Speed: {playbackSpeed}x • Adaptive Rating Updated
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={handleNextSection}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-semibold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                          >
                            <span>Next Exercise</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-12 text-center text-white/40">No scenario selected.</div>
              )}
            </div>
          </div>
        )}

        {currentTab === 'adaptive' && (
          <AdaptiveModeView
            adaptiveState={adaptiveState}
            onRefreshAdaptiveState={handleRefreshData}
            onBadgeUnlocked={(badge) => setActiveUnlockedBadge(badge)}
          />
        )}

        {currentTab === 'drill' && (
          <PhonemeDrillTab
            attempts={attempts}
            onGoToHeatMap={() => setCurrentTab('profile')}
          />
        )}

        {currentTab === 'profile' && (
          <StudentProfileView
            student={student}
            attempts={attempts}
            onUpdateStudent={setStudent}
            onNavigateToPractice={() => setCurrentTab('practice')}
            onNavigateToPhonemeDrill={() => setCurrentTab('drill')}
          />
        )}

        {currentTab === 'guide' && (
          <ListeningGuideView
            onGoToLevel={(level, section) => {
              setSelectedLevel(level);
              if (section) setSelectedSection(section);
              setCurrentTab('practice');
            }}
          />
        )}

        {currentTab === 'educator' && (
          <EducatorDashboard
            attempts={attempts}
            onOpenExportModal={() => setIsExportModalOpen(true)}
          />
        )}

        {currentTab === 'export' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
            <div className="p-8 rounded-3xl border border-white/[0.08] bg-white/[0.02] text-center space-y-4">
              <FileSpreadsheet className="w-12 h-12 text-amber-400 mx-auto" />
              <h2 className="text-3xl font-extrabold text-white font-grotesk">
                Export Detailed Progress Reports
              </h2>
              <p className="text-sm text-white/50 max-w-lg mx-auto">
                Generate official student performance reports, export attempt logs in CSV format, or save a complete JSON backup to maintain permanent records.
              </p>
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold text-xs inline-flex items-center gap-2 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
              >
                <span>Launch Report Generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Real-time Badge Unlock Celebration Modal */}
      <BadgeUnlockModal
        badge={activeUnlockedBadge}
        onClose={() => setActiveUnlockedBadge(null)}
        onViewProfile={() => {
          setActiveUnlockedBadge(null);
          setCurrentTab('profile');
        }}
      />

      {/* Export / Report Generator Modal */}
      <ExportReportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        student={student}
        attempts={attempts}
        onDataImported={handleRefreshData}
      />

      {/* Voice Warmup Microphone Practice Modal */}
      <VoiceWarmupModal
        isOpen={isWarmupOpen}
        onClose={() => setIsWarmupOpen(false)}
        transcript={currentScenario.transcript}
        scenarioTitle={currentScenario.title}
        onCompleteWarmup={(score) => {
          setWarmupScores((prev) => ({
            ...prev,
            [currentScenario.title]: score
          }));
          StorageService.saveWarmupScore(currentScenario.title, score);
        }}
      />

      {/* Deep Work Goal Reached Celebration Notification Modal */}
      <DeepWorkGoalModal
        session={deepWorkGoalModalSession}
        onClose={() => setDeepWorkGoalModalSession(null)}
        onStartNewSession={() => {
          setDeepWorkGoalModalSession(null);
          setIsDeepWorkOpen(true);
          setDeepWorkSession((prev) => ({
            ...prev,
            timeRemainingSeconds: prev.totalDurationSeconds,
            completedQuestionsCount: 0,
            correctQuestionsCount: 0,
            status: 'idle',
            startedAt: null,
            completedAt: null
          }));
        }}
        onExtendSession={(extraQ, extraM) => {
          setDeepWorkGoalModalSession(null);
          setIsDeepWorkOpen(true);
          setDeepWorkSession((prev) => {
            const extraSec = extraM * 60;
            return {
              ...prev,
              targetQuestions: prev.targetQuestions + extraQ,
              targetMinutes: prev.targetMinutes + extraM,
              totalDurationSeconds: prev.totalDurationSeconds + extraSec,
              timeRemainingSeconds: prev.timeRemainingSeconds + extraSec,
              status: 'running',
              completedAt: null
            };
          });
        }}
      />

      {/* Hidden Print Layout for Official Reports */}
      <div className="print-report hidden p-8 text-black bg-white">
        <div className="border-b-2 border-black pb-4 mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-wide">ListenMaster Performance Report</h1>
            <p className="text-sm text-gray-600">Cognitive Auditory Ecosystem • Academic Evaluation</p>
          </div>
          <div className="text-right text-xs text-gray-500 font-mono">
            Generated: {new Date().toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm border p-4 rounded">
          <div>
            <p><strong>Candidate Name:</strong> {student.name}</p>
            <p><strong>Institutional Email:</strong> {student.email}</p>
            <p><strong>Assigned Cohort:</strong> {student.cohort}</p>
          </div>
          <div>
            <p><strong>Current Adaptive Rating:</strong> {student.adaptiveRating}</p>
            <p><strong>Overall Accuracy:</strong> {student.averageAccuracy}%</p>
            <p><strong>Total Listening Hours:</strong> {(student.totalListeningSeconds / 3600).toFixed(1)} hrs</p>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-3">Attempt Audit Trail</h2>
        <table className="w-full text-left text-xs border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 font-bold">
              <th className="p-2 border">Level</th>
              <th className="p-2 border">Section</th>
              <th className="p-2 border">Scenario</th>
              <th className="p-2 border">Score</th>
              <th className="p-2 border">Time (s)</th>
              <th className="p-2 border">Replays</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((att) => (
              <tr key={att.id} className="border-b border-gray-200">
                <td className="p-2 border">{att.level}</td>
                <td className="p-2 border">{att.section}</td>
                <td className="p-2 border">{att.scenarioTitle}</td>
                <td className="p-2 border font-bold">{att.scorePercent}%</td>
                <td className="p-2 border">{att.timeSpentSeconds}</td>
                <td className="p-2 border">{att.replaysUsed}</td>
                <td className="p-2 border">{new Date(att.timestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
