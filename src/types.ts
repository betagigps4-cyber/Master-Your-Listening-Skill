export type VoiceId = 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'M1' | 'M2' | 'M3' | 'M4' | 'M5';

export interface VoiceProfile {
  id: VoiceId;
  name: string;
  gender: 'female' | 'male';
  color: string;
  colorClass: string;
  bgClass: string;
  pitch: number;
  rate: number;
  description: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct: string;
  category?: 'numbers' | 'factual' | 'inference' | 'lexical' | 'main-idea';
  explanation?: string;
}

export interface AIExplanation {
  distractorAnalysis: string;
  misinterpretedQuote: string;
  misinterpretedCue: string;
  misinterpretationType?: string;
  misinterpretationReason?: string;
  acousticQuote: string;
  cueHighlight?: string;
  listeningTip: string;
  coreConcept?: string;
  contrastSummary?: string;
  misinterpretedTimePercentEstimate?: number;
  correctTimePercentEstimate?: number;
  source?: 'gemini' | 'heuristic';
}

export interface PhonemePracticeItem {
  id: string;
  phoneme: string;
  name: string;
  category: 'fricative' | 'plosive' | 'vowel' | 'diphthong' | 'affricate' | 'nasal' | 'liquid';
  description: string;
  articulationGuide: string;
  targetWord: string;
  exampleSentence: string;
  similarSoundWarning?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface WarmupResult {
  phonemeId: string;
  score: number;
  recognizedText?: string;
  passed: boolean;
  audioBlobUrl?: string;
}

export interface Scenario {
  title: string;
  description: string;
  transcript: string;
  questions: Question[];
}

export type LevelKey = 
  | 'Zero'
  | 'Primary'
  | 'AdvancePrimary'
  | 'HighSchool'
  | 'Intermediate'
  | 'Advance'
  | 'Pro'
  | 'HigherOrder';

export interface LevelConfig {
  key: LevelKey;
  label: string;
  tag: string;
  gradient: string;
  border: string;
  accent: string;
  badgeBg: string;
  glow: string;
  tasks: number;
  desc: string;
  icon: string;
  baseDifficulty: number; // e.g. 700 to 2200
  targetCefr: string; // e.g. A1, A2, B1, B2, C1, C2
}

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export interface AttemptRecord {
  id: string;
  studentId: string;
  studentName: string;
  level: LevelKey;
  section: string;
  scenarioTitle: string;
  timestamp: number;
  scorePercent: number;
  correctAnswersCount: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  replaysUsed: number;
  playbackSpeed: number;
  answers: Record<string, string>; // questionId -> selectedOption
  confidenceRatings?: Record<string, ConfidenceLevel>; // questionId -> confidence
  confidenceCalibrationScore?: number; // 0-100 alignment index
  adaptiveRatingDelta: number;
  calculatedDifficulty: number;
}

export interface ProblemAreaMetric {
  key: string;
  label: string;
  phonemeSymbol?: string;
  category: 'phoneme' | 'word-type';
  subCategory: string; // e.g. 'fricative', 'vowel', 'numbers', 'lexical', 'signpost'
  errorRatePct: number; // 0 to 100
  totalOccurrences: number;
  errorsCount: number;
  sampleWords: string[];
  severity: 'low' | 'moderate' | 'high' | 'critical';
  diagnosticNote: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  cohort: string;
  adaptiveRating: number; // Elo (e.g. 1000 - 2400)
  streakDays: number;
  totalListeningSeconds: number;
  completedSectionsCount: number;
  averageAccuracy: number;
  lastActive: number;
  focusArea: string;
  unlockedBadgeIds?: string[]; // list of unlocked badge IDs
}

export type BadgeTier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type BadgeCategory = 'accuracy' | 'consistency' | 'speed' | 'mastery' | 'milestones';

export interface BadgeDefinition {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: BadgeCategory;
  tier: BadgeTier;
  icon: string; // lucide icon identifier
  accentColor: string;
  targetCount: number;
  unit: string;
  secret?: boolean;
}

export interface EvaluatedBadge extends BadgeDefinition {
  isUnlocked: boolean;
  unlockedAt?: number;
  currentCount: number;
  progressPercent: number;
}

export interface DialogueSegment {
  text: string;
  voiceId: VoiceId;
}

export interface AdaptiveState {
  currentRating: number;
  streak: number;
  confidenceScore: number;
  recommendedLevel: LevelKey;
  recommendedSection: string;
  recommendedSpeed: number;
  activeLevelMastery: Record<LevelKey, number>; // percent 0-100
}

export interface ListeningGuideItem {
  id: string;
  title: string;
  category: 'Acoustic Parsing' | 'Signposting' | 'Speed & Rhythm' | 'Memory & Notes' | 'Accents';
  badge: string;
  summary: string;
  details: string[];
  actionSteps: string[];
  keySignals: { trigger: string; meaning: string }[];
  practicePrompt: string;
}

export type DeepWorkStatus = 'idle' | 'running' | 'paused' | 'completed' | 'expired';

export interface DeepWorkPreset {
  id: string;
  label: string;
  targetQuestions: number;
  targetMinutes: number;
  description: string;
  tag: string;
}

export interface DeepWorkSession {
  targetQuestions: number;
  targetMinutes: number;
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
  completedQuestionsCount: number;
  correctQuestionsCount: number;
  status: DeepWorkStatus;
  startedAt: number | null;
  completedAt: number | null;
}

export interface SavedWordItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  simpleDefinition?: string;
  advancedDefinition?: string;
  etymology?: string;
  cefrLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  exampleSentence?: string;
  acousticTip?: string;
  scenarioUsageSnippet?: string;
  scenarioTitle?: string;
  synonyms?: string[];
  savedAt: number;
}
