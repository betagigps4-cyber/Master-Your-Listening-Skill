import { AttemptRecord, BadgeDefinition, EvaluatedBadge, StudentProfile } from '../types';

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
  {
    id: 'ten_perfect_scores',
    title: '10 Perfect Scores',
    subtitle: 'Flawless Auditory Acuity',
    description: 'Achieve a 100% score on 10 different listening exercises.',
    category: 'accuracy',
    tier: 'gold',
    icon: 'Trophy',
    accentColor: '#F59E0B',
    targetCount: 10,
    unit: 'perfect scores'
  },
  {
    id: 'early_bird',
    title: 'Early Bird Learner',
    subtitle: 'Dawn Synapse Activation',
    description: 'Complete a listening comprehension exercise before 8:00 AM.',
    category: 'consistency',
    tier: 'bronze',
    icon: 'Sunrise',
    accentColor: '#FB923C',
    targetCount: 1,
    unit: 'morning session'
  },
  {
    id: 'zero_replays_master',
    title: 'First-Take Virtuoso',
    subtitle: 'Instant Acoustic Decoding',
    description: 'Score 100% on 5 exercises without using any audio replays.',
    category: 'accuracy',
    tier: 'platinum',
    icon: 'Sparkles',
    accentColor: '#38BDF8',
    targetCount: 5,
    unit: 'first-take 100%s'
  },
  {
    id: 'week_streak',
    title: '7-Day Auditory Streak',
    subtitle: 'Habitual Mastery',
    description: 'Maintain an active daily listening streak for 7 or more consecutive days.',
    category: 'consistency',
    tier: 'gold',
    icon: 'Flame',
    accentColor: '#F97316',
    targetCount: 7,
    unit: 'days'
  },
  {
    id: 'speed_demon',
    title: 'Supersonic Ear (1.25x)',
    subtitle: 'Cognitive Overclock',
    description: 'Score 85% or higher on an exercise played at 1.15x or 1.25x speed.',
    category: 'speed',
    tier: 'silver',
    icon: 'Zap',
    accentColor: '#A855F7',
    targetCount: 2,
    unit: 'fast exercises'
  },
  {
    id: 'elo_1500',
    title: 'Grandmaster Rating',
    subtitle: 'Upper-Echelon Listener',
    description: 'Attain an adaptive listener rating of 1,500 Elo or higher.',
    category: 'mastery',
    tier: 'gold',
    icon: 'Crown',
    accentColor: '#EAB308',
    targetCount: 1500,
    unit: 'Elo rating'
  },
  {
    id: 'rapid_digits_expert',
    title: 'Rapid Digits Expert',
    subtitle: 'Zero Phoneme Loss',
    description: 'Score 100% on 3 or more numerical, phone, or schedule dictation scenarios.',
    category: 'accuracy',
    tier: 'silver',
    icon: 'Hash',
    accentColor: '#10B981',
    targetCount: 3,
    unit: 'number modules'
  },
  {
    id: 'night_owl',
    title: 'Night Owl Scholar',
    subtitle: 'Midnight Deep Focus',
    description: 'Complete a listening challenge between 9:00 PM and 4:00 AM.',
    category: 'consistency',
    tier: 'bronze',
    icon: 'Moon',
    accentColor: '#818CF8',
    targetCount: 1,
    unit: 'night session'
  },
  {
    id: 'higher_order_conqueror',
    title: 'Higher Order Victor',
    subtitle: 'Abstract Cognitive Inferences',
    description: 'Conquer a scenario in Tier 7 (Pro) or Tier 8 (Higher Order) with 75%+ score.',
    category: 'mastery',
    tier: 'platinum',
    icon: 'GraduationCap',
    accentColor: '#EC4899',
    targetCount: 1,
    unit: 'advanced scenario'
  },
  {
    id: 'library_explorer_20',
    title: 'Library Connoisseur',
    subtitle: 'Deep Catalog Immersion',
    description: 'Complete 15 or more unique scenarios across all difficulty tiers.',
    category: 'milestones',
    tier: 'silver',
    icon: 'BookOpen',
    accentColor: '#06B6D4',
    targetCount: 15,
    unit: 'completed modules'
  }
];

export class BadgeService {
  /**
   * Evaluates all badges based on the student's profile and historical attempts.
   */
  static evaluateBadges(student: StudentProfile, attempts: AttemptRecord[]): EvaluatedBadge[] {
    const studentAttempts = attempts.filter((a) => a.studentId === student.id);
    const existingUnlocked = new Set(student.unlockedBadgeIds || []);

    return BADGE_DEFINITIONS.map((def) => {
      let count = 0;
      let unlockedTimestamp: number | undefined;

      switch (def.id) {
        case 'ten_perfect_scores': {
          const perfect = studentAttempts.filter((a) => a.scorePercent === 100);
          count = perfect.length;
          if (count >= def.targetCount) {
            unlockedTimestamp = perfect[def.targetCount - 1]?.timestamp;
          }
          break;
        }

        case 'early_bird': {
          const early = studentAttempts.filter((a) => {
            const h = new Date(a.timestamp).getHours();
            return h >= 4 && h < 8;
          });
          count = early.length > 0 ? 1 : 0;
          if (early.length > 0) {
            unlockedTimestamp = early[0].timestamp;
          }
          break;
        }

        case 'zero_replays_master': {
          const zeroReplays = studentAttempts.filter(
            (a) => a.scorePercent === 100 && (a.replaysUsed === 0 || !a.replaysUsed)
          );
          count = zeroReplays.length;
          if (count >= def.targetCount) {
            unlockedTimestamp = zeroReplays[def.targetCount - 1]?.timestamp;
          }
          break;
        }

        case 'week_streak': {
          count = student.streakDays;
          if (count >= def.targetCount) {
            unlockedTimestamp = student.lastActive;
          }
          break;
        }

        case 'speed_demon': {
          const fastAttempts = studentAttempts.filter(
            (a) => a.playbackSpeed >= 1.15 && a.scorePercent >= 85
          );
          count = fastAttempts.length;
          if (count >= def.targetCount) {
            unlockedTimestamp = fastAttempts[def.targetCount - 1]?.timestamp;
          }
          break;
        }

        case 'elo_1500': {
          count = student.adaptiveRating;
          if (count >= def.targetCount) {
            unlockedTimestamp = student.lastActive;
          }
          break;
        }

        case 'rapid_digits_expert': {
          const numberScenarios = studentAttempts.filter((a) => {
            const isNumberScenario =
              a.scenarioTitle.toLowerCase().includes('number') ||
              a.scenarioTitle.toLowerCase().includes('phone') ||
              a.scenarioTitle.toLowerCase().includes('mobile') ||
              a.scenarioTitle.toLowerCase().includes('time') ||
              a.scenarioTitle.toLowerCase().includes('booking');
            return isNumberScenario && a.scorePercent === 100;
          });
          count = numberScenarios.length;
          if (count >= def.targetCount) {
            unlockedTimestamp = numberScenarios[def.targetCount - 1]?.timestamp;
          }
          break;
        }

        case 'night_owl': {
          const nightAttempts = studentAttempts.filter((a) => {
            const h = new Date(a.timestamp).getHours();
            return h >= 21 || h < 4;
          });
          count = nightAttempts.length > 0 ? 1 : 0;
          if (nightAttempts.length > 0) {
            unlockedTimestamp = nightAttempts[0].timestamp;
          }
          break;
        }

        case 'higher_order_conqueror': {
          const hoAttempts = studentAttempts.filter(
            (a) => (a.level === 'HigherOrder' || a.level === 'Pro') && a.scorePercent >= 75
          );
          count = hoAttempts.length;
          if (count >= def.targetCount) {
            unlockedTimestamp = hoAttempts[0]?.timestamp;
          }
          break;
        }

        case 'library_explorer_20': {
          // Unique scenarios completed
          const uniqueTitles = new Set(studentAttempts.map((a) => a.scenarioTitle));
          count = uniqueTitles.size;
          if (count >= def.targetCount) {
            unlockedTimestamp = studentAttempts[studentAttempts.length - 1]?.timestamp;
          }
          break;
        }

        default:
          count = 0;
      }

      const isUnlocked = count >= def.targetCount || existingUnlocked.has(def.id);
      const progressPercent = Math.min(100, Math.round((count / def.targetCount) * 100));

      return {
        ...def,
        isUnlocked,
        unlockedAt: unlockedTimestamp || (isUnlocked ? Date.now() - 86400000 : undefined),
        currentCount: count,
        progressPercent: isUnlocked ? 100 : progressPercent
      };
    });
  }

  /**
   * Checks if any new badges were unlocked following a recent attempt
   */
  static checkNewlyUnlocked(
    student: StudentProfile,
    attempts: AttemptRecord[]
  ): { newlyUnlocked: EvaluatedBadge[]; updatedUnlockedIds: string[] } {
    const existingIds = new Set(student.unlockedBadgeIds || []);
    const evaluated = this.evaluateBadges(student, attempts);

    const newlyUnlocked: EvaluatedBadge[] = [];
    const allUnlockedIds: string[] = [];

    for (const b of evaluated) {
      if (b.isUnlocked) {
        allUnlockedIds.push(b.id);
        if (!existingIds.has(b.id)) {
          newlyUnlocked.push(b);
        }
      }
    }

    return { newlyUnlocked, updatedUnlockedIds: allUnlockedIds };
  }
}
