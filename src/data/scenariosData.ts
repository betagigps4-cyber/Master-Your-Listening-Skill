import { LevelConfig, LevelKey, Scenario, VoiceId, VoiceProfile } from '../types';
import { scenariosZero } from './scenariosZero';
import { scenariosPrimary } from './scenariosPrimary';
import { scenariosAdvancePrimary } from './scenariosAdvancePrimary';
import {
  scenariosHighSchool,
  scenariosIntermediate,
  scenariosAdvance,
  scenariosPro,
  scenariosHigherOrder
} from './scenariosHigher';

export const SCENARIOS: Record<LevelKey, Record<string, Scenario[]>> = {
  Zero: scenariosZero,
  Primary: scenariosPrimary,
  AdvancePrimary: scenariosAdvancePrimary,
  HighSchool: scenariosHighSchool,
  Intermediate: scenariosIntermediate,
  Advance: scenariosAdvance,
  Pro: scenariosPro,
  HigherOrder: scenariosHigherOrder
};

export const LEVEL_CFG: Record<LevelKey, LevelConfig> = {
  Zero: {
    key: 'Zero',
    label: 'Zero',
    tag: 'Protocol 01',
    gradient: 'from-sky-500/20 via-blue-500/10 to-indigo-500/15',
    border: 'border-sky-500/20 hover:border-sky-400/40',
    accent: 'text-sky-400',
    badgeBg: 'bg-sky-500/10 text-sky-400',
    glow: 'shadow-sky-500/10',
    tasks: 45,
    desc: 'Basic names, numbers, phone digits, favorite items & single-utterance recognition',
    icon: 'sparkles',
    baseDifficulty: 650,
    targetCefr: 'A1 - Beginner'
  },
  Primary: {
    key: 'Primary',
    label: 'Primary',
    tag: 'Protocol 02',
    gradient: 'from-emerald-500/20 via-green-500/10 to-lime-500/15',
    border: 'border-emerald-500/20 hover:border-emerald-400/40',
    accent: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400',
    glow: 'shadow-emerald-500/10',
    tasks: 53,
    desc: 'Daily routines, times, domestic dialogues & simple multi-step contexts',
    icon: 'book-open',
    baseDifficulty: 900,
    targetCefr: 'A2 - Elementary'
  },
  AdvancePrimary: {
    key: 'AdvancePrimary',
    label: 'Advance Primary',
    tag: 'Protocol 03',
    gradient: 'from-teal-500/20 via-emerald-600/15 to-lime-500/15',
    border: 'border-teal-500/25 hover:border-teal-400/45',
    accent: 'text-teal-400',
    badgeBg: 'bg-teal-500/10 text-teal-400',
    glow: 'shadow-teal-500/10',
    tasks: 50,
    desc: 'Descriptive paragraphs, cultural events, travel narratives & narrative recall',
    icon: 'compass',
    baseDifficulty: 1100,
    targetCefr: 'A2+ - Pre-Intermediate'
  },
  HighSchool: {
    key: 'HighSchool',
    label: 'High School',
    tag: 'Protocol 04',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-sky-500/15',
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    accent: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-400',
    glow: 'shadow-cyan-500/10',
    tasks: 36,
    desc: 'Classroom announcements, student debates, scheduling changes & canteen interactions',
    icon: 'users',
    baseDifficulty: 1350,
    targetCefr: 'B1 - Intermediate'
  },
  Intermediate: {
    key: 'Intermediate',
    label: 'Intermediate',
    tag: 'Protocol 05',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/15',
    border: 'border-amber-500/20 hover:border-amber-400/40',
    accent: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-400',
    glow: 'shadow-amber-500/10',
    tasks: 12,
    desc: 'IELTS/TOEFL style accommodation bookings, lost property, rentals & library tours',
    icon: 'graduation-cap',
    baseDifficulty: 1600,
    targetCefr: 'B2 - Upper-Intermediate'
  },
  Advance: {
    key: 'Advance',
    label: 'Advance',
    tag: 'Protocol 06',
    gradient: 'from-rose-500/20 via-pink-500/10 to-fuchsia-500/15',
    border: 'border-rose-500/20 hover:border-rose-400/40',
    accent: 'text-rose-400',
    badgeBg: 'bg-rose-500/10 text-rose-400',
    glow: 'shadow-rose-500/10',
    tasks: 2,
    desc: 'Executive job interviews, corporate metric evaluations & research methodology',
    icon: 'briefcase',
    baseDifficulty: 1850,
    targetCefr: 'C1 - Advanced'
  },
  Pro: {
    key: 'Pro',
    label: 'Pro',
    tag: 'Protocol 07',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/15',
    border: 'border-violet-500/20 hover:border-violet-400/40',
    accent: 'text-violet-400',
    badgeBg: 'bg-violet-500/10 text-violet-400',
    glow: 'shadow-violet-500/10',
    tasks: 12,
    desc: 'Thermodynamics, climate feedbacks & molecular neuroscience lectures with dense stats',
    icon: 'flask-conical',
    baseDifficulty: 2100,
    targetCefr: 'C1+ - Proficient'
  },
  HigherOrder: {
    key: 'HigherOrder',
    label: 'Higher Order',
    tag: 'Protocol 08',
    gradient: 'from-red-500/20 via-rose-500/10 to-orange-500/15',
    border: 'border-red-500/20 hover:border-red-400/40',
    accent: 'text-red-400',
    badgeBg: 'bg-red-500/10 text-red-400',
    glow: 'shadow-red-500/10',
    tasks: 12,
    desc: 'Rapid multi-expert symposiums, methodological peer reviews & counter-argument critiques',
    icon: 'brain',
    baseDifficulty: 2350,
    targetCefr: 'C2 - Mastery'
  }
};

export const LEVEL_ORDER: LevelKey[] = [
  'Zero',
  'Primary',
  'AdvancePrimary',
  'HighSchool',
  'Intermediate',
  'Advance',
  'Pro',
  'HigherOrder'
];

export const VOICE_PROFILES: Record<VoiceId, VoiceProfile> = {
  F1: { id: 'F1', name: 'Female 1 (Warm)', gender: 'female', color: '#FB923C', colorClass: 'text-orange-400', bgClass: 'bg-orange-400', pitch: 1.15, rate: 0.9, description: 'Warm & engaging' },
  F2: { id: 'F2', name: 'Female 2 (Professional)', gender: 'female', color: '#F472B6', colorClass: 'text-pink-400', bgClass: 'bg-pink-400', pitch: 1.05, rate: 0.92, description: 'Crisp academic cadence' },
  F3: { id: 'F3', name: 'Female 3 (Energetic)', gender: 'female', color: '#22D3EE', colorClass: 'text-cyan-400', bgClass: 'bg-cyan-400', pitch: 1.2, rate: 0.95, description: 'Dynamic & conversational' },
  F4: { id: 'F4', name: 'Female 4 (Calm)', gender: 'female', color: '#A3E635', colorClass: 'text-lime-400', bgClass: 'bg-lime-400', pitch: 1.0, rate: 0.85, description: 'Deliberate & clear pacing' },
  F5: { id: 'F5', name: 'Female 5 (Youthful)', gender: 'female', color: '#FBBF24', colorClass: 'text-amber-400', bgClass: 'bg-amber-400', pitch: 1.25, rate: 0.98, description: 'Natural student speaker' },
  M1: { id: 'M1', name: 'Male 1 (Authoritative)', gender: 'male', color: '#818CF8', colorClass: 'text-indigo-400', bgClass: 'bg-indigo-400', pitch: 0.85, rate: 0.88, description: 'Clear instructor tone' },
  M2: { id: 'M2', name: 'Male 2 (Casual)', gender: 'male', color: '#8B5CF6', colorClass: 'text-violet-400', bgClass: 'bg-violet-400', pitch: 0.95, rate: 0.9, description: 'Everyday colloquial ease' },
  M3: { id: 'M3', name: 'Male 3 (Deep)', gender: 'male', color: '#14B8A6', colorClass: 'text-teal-400', bgClass: 'bg-teal-400', pitch: 0.75, rate: 0.82, description: 'Resonant & measured' },
  M4: { id: 'M4', name: 'Male 4 (Friendly)', gender: 'male', color: '#EF4444', colorClass: 'text-red-400', bgClass: 'bg-red-400', pitch: 0.92, rate: 0.93, description: 'Warm dialogue partner' },
  M5: { id: 'M5', name: 'Male 5 (Narrator)', gender: 'male', color: '#3B82F6', colorClass: 'text-blue-400', bgClass: 'bg-blue-400', pitch: 0.88, rate: 0.87, description: 'Neutral task moderator' }
};

export const VOICE_ORDER: VoiceId[] = ['F1', 'F2', 'F3', 'F4', 'F5', 'M1', 'M2', 'M3', 'M4', 'M5'];

export function getAllSectionsForLevel(level: LevelKey): string[] {
  return Object.keys(SCENARIOS[level] || {});
}

export function getTotalQuestionsCount(): number {
  let count = 0;
  for (const level of LEVEL_ORDER) {
    const sections = SCENARIOS[level];
    for (const secKey of Object.keys(sections)) {
      for (const scenario of sections[secKey]) {
        count += scenario.questions.length;
      }
    }
  }
  return count;
}
