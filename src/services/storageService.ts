import { AttemptRecord, StudentProfile, EvaluatedBadge, SavedWordItem } from '../types';
import { BadgeService } from './badgeService';

const ATTEMPTS_KEY = 'listenmaster_attempts_v2';
const CURRENT_STUDENT_KEY = 'listenmaster_current_student_v2';
const COHORT_STUDENTS_KEY = 'listenmaster_cohort_students_v2';
const WARMUP_SCORES_KEY = 'listenmaster_warmup_scores_v2';
const DEEP_WORK_STATS_KEY = 'listenmaster_deep_work_stats_v2';
const SAVED_WORDS_KEY = 'listenmaster_saved_words_v2';

export class StorageService {
  /**
   * Retrieves all voice warmup scores from localStorage
   */
  static getWarmupScores(): Record<string, number> {
    try {
      const data = localStorage.getItem(WARMUP_SCORES_KEY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  /**
   * Retrieves deep work statistics
   */
  static getDeepWorkStats(): { totalSessionsCompleted: number; totalQuestionsCompleted: number; totalFocusSeconds: number } {
    try {
      const data = localStorage.getItem(DEEP_WORK_STATS_KEY);
      return data ? JSON.parse(data) : { totalSessionsCompleted: 0, totalQuestionsCompleted: 0, totalFocusSeconds: 0 };
    } catch (e) {
      return { totalSessionsCompleted: 0, totalQuestionsCompleted: 0, totalFocusSeconds: 0 };
    }
  }

  /**
   * Records a completed deep work session
   */
  static recordCompletedDeepWorkSession(completedCount: number, focusSeconds: number): void {
    try {
      const stats = this.getDeepWorkStats();
      stats.totalSessionsCompleted += 1;
      stats.totalQuestionsCompleted += completedCount;
      stats.totalFocusSeconds += focusSeconds;
      localStorage.setItem(DEEP_WORK_STATS_KEY, JSON.stringify(stats));
    } catch (e) {
      console.warn('Failed to save deep work stats', e);
    }
  }

  /**
   * Saves a voice warmup score for a scenario
   */
  static saveWarmupScore(scenarioTitle: string, score: number): void {
    try {
      const scores = this.getWarmupScores();
      scores[scenarioTitle] = score;
      localStorage.setItem(WARMUP_SCORES_KEY, JSON.stringify(scores));
    } catch (e) {
      console.warn('Failed to save warmup score', e);
    }
  }

  /**
   * Retrieves all attempts from localStorage
   */
  static getAttempts(): AttemptRecord[] {
    try {
      const data = localStorage.getItem(ATTEMPTS_KEY);
      if (!data) {
        const seed = this.getSeedAttempts();
        this.saveAttempts(seed);
        return seed;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load attempts from storage', e);
      return [];
    }
  }

  /**
   * Saves attempts to localStorage
   */
  static saveAttempts(attempts: AttemptRecord[]): void {
    try {
      localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(attempts));
    } catch (e) {
      console.error('Failed to save attempts to storage', e);
    }
  }

  /**
   * Adds a single attempt
   */
  static addAttempt(record: AttemptRecord): EvaluatedBadge[] {
    const list = this.getAttempts();
    list.push(record);
    this.saveAttempts(list);

    // Also update student profile engagement stats
    const student = this.getCurrentStudent();
    let newlyUnlocked: EvaluatedBadge[] = [];

    if (student.id === record.studentId) {
      student.totalListeningSeconds += record.timeSpentSeconds;
      student.completedSectionsCount += 1;
      student.lastActive = Date.now();
      
      const allStudentAttempts = list.filter(a => a.studentId === student.id);
      const sum = allStudentAttempts.reduce((acc, curr) => acc + curr.scorePercent, 0);
      student.averageAccuracy = Math.round(sum / allStudentAttempts.length);
      student.adaptiveRating = Math.max(600, student.adaptiveRating + record.adaptiveRatingDelta);

      // Check badges
      const badgeResult = BadgeService.checkNewlyUnlocked(student, list);
      student.unlockedBadgeIds = badgeResult.updatedUnlockedIds;
      newlyUnlocked = badgeResult.newlyUnlocked;

      this.saveCurrentStudent(student);
    }

    return newlyUnlocked;
  }

  /**
   * Current active student
   */
  static getCurrentStudent(): StudentProfile {
    try {
      const data = localStorage.getItem(CURRENT_STUDENT_KEY);
      if (data) {
        const parsed: StudentProfile = JSON.parse(data);
        if (!parsed.unlockedBadgeIds) {
          const attempts = this.getAttempts();
          const badgeResult = BadgeService.checkNewlyUnlocked(parsed, attempts);
          parsed.unlockedBadgeIds = badgeResult.updatedUnlockedIds;
          this.saveCurrentStudent(parsed);
        }
        return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    const attempts = this.getAttempts();
    const defaultStudent: StudentProfile = {
      id: 'student-primary-01',
      name: 'Alex Chen',
      email: 'alex.chen@meridian.edu',
      cohort: 'Cohort 2026-A (IELTS/Academic)',
      adaptiveRating: 1180,
      streakDays: 4,
      totalListeningSeconds: 3420,
      completedSectionsCount: 14,
      averageAccuracy: 88,
      lastActive: Date.now(),
      focusArea: 'Signpost Distractors & Rapid Numbers',
      unlockedBadgeIds: []
    };
    const badgeResult = BadgeService.checkNewlyUnlocked(defaultStudent, attempts);
    defaultStudent.unlockedBadgeIds = badgeResult.updatedUnlockedIds;
    this.saveCurrentStudent(defaultStudent);
    return defaultStudent;
  }

  static saveCurrentStudent(student: StudentProfile): void {
    try {
      localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(student));
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Educator Cohort Students for monitoring multiple students
   */
  static getCohortStudents(): StudentProfile[] {
    try {
      const data = localStorage.getItem(COHORT_STUDENTS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    const defaultCohort = this.getSeedCohort();
    this.saveCohortStudents(defaultCohort);
    return defaultCohort;
  }

  static saveCohortStudents(cohort: StudentProfile[]): void {
    try {
      localStorage.setItem(COHORT_STUDENTS_KEY, JSON.stringify(cohort));
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Exports attempts and progress report as CSV
   */
  static exportToCSV(attempts: AttemptRecord[]): string {
    const headers = [
      'Attempt ID',
      'Student Name',
      'Level',
      'Section',
      'Scenario Title',
      'Score (%)',
      'Correct Count',
      'Total Questions',
      'Time Spent (s)',
      'Audio Replays Used',
      'Playback Speed',
      'Rating Delta',
      'Date & Time'
    ];

    const rows = attempts.map(att => [
      att.id,
      `"${att.studentName.replace(/"/g, '""')}"`,
      att.level,
      att.section,
      `"${att.scenarioTitle.replace(/"/g, '""')}"`,
      att.scorePercent,
      att.correctAnswersCount,
      att.totalQuestions,
      att.timeSpentSeconds,
      att.replaysUsed,
      att.playbackSpeed,
      att.adaptiveRatingDelta,
      new Date(att.timestamp).toISOString()
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  /**
   * Exports full JSON data for transfer / backup
   */
  static exportFullBackupJSON(): string {
    const payload = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      currentStudent: this.getCurrentStudent(),
      attempts: this.getAttempts(),
      cohort: this.getCohortStudents()
    };
    return JSON.stringify(payload, null, 2);
  }

  /**
   * Imports backup JSON
   */
  static importBackupJSON(jsonStr: string): boolean {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.currentStudent) this.saveCurrentStudent(parsed.currentStudent);
      if (Array.isArray(parsed.attempts)) this.saveAttempts(parsed.attempts);
      if (Array.isArray(parsed.cohort)) this.saveCohortStudents(parsed.cohort);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  }

  /**
   * Triggers a browser download of a string content
   */
  static triggerDownload(content: string, fileName: string, contentType: string): void {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Default realistic seed attempts to demonstrate historic tracking instantly
   */
  private static getSeedAttempts(): AttemptRecord[] {
    const now = Date.now();
    const dayMs = 86400000;
    const earlyMorningTime = new Date(now - dayMs * 5);
    earlyMorningTime.setHours(7, 24, 0, 0);

    return [
      {
        id: 'att-101',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'Zero',
        section: 'Section 1',
        scenarioTitle: 'Name',
        timestamp: earlyMorningTime.getTime(),
        scorePercent: 100,
        correctAnswersCount: 1,
        totalQuestions: 1,
        timeSpentSeconds: 14,
        replaysUsed: 1,
        playbackSpeed: 1.0,
        answers: { p1q1: 'Maruf Ali' },
        confidenceRatings: { p1q1: 'high' },
        confidenceCalibrationScore: 100,
        adaptiveRatingDelta: 24,
        calculatedDifficulty: 650
      },
      {
        id: 'att-102',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'Zero',
        section: 'Section 2',
        scenarioTitle: 'Mobile Number',
        timestamp: now - dayMs * 5,
        scorePercent: 100,
        correctAnswersCount: 1,
        totalQuestions: 1,
        timeSpentSeconds: 22,
        replaysUsed: 2,
        playbackSpeed: 0.95,
        answers: { p2q1: '01728295215' },
        confidenceRatings: { p2q1: 'medium' },
        confidenceCalibrationScore: 85,
        adaptiveRatingDelta: 21,
        calculatedDifficulty: 650
      },
      {
        id: 'att-103',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'Primary',
        section: 'Section 1',
        scenarioTitle: 'Favorite Fruit',
        timestamp: now - dayMs * 4,
        scorePercent: 100,
        correctAnswersCount: 1,
        totalQuestions: 1,
        timeSpentSeconds: 16,
        replaysUsed: 1,
        playbackSpeed: 1.0,
        answers: { s1q1: 'Banana' },
        confidenceRatings: { s1q1: 'high' },
        confidenceCalibrationScore: 100,
        adaptiveRatingDelta: 26,
        calculatedDifficulty: 900
      },
      {
        id: 'att-104',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'Primary',
        section: 'Section 3',
        scenarioTitle: 'Going to School',
        timestamp: now - dayMs * 3,
        scorePercent: 100,
        correctAnswersCount: 1,
        totalQuestions: 1,
        timeSpentSeconds: 19,
        replaysUsed: 1,
        playbackSpeed: 1.0,
        answers: { s3q1: 'By bus' },
        confidenceRatings: { s3q1: 'high' },
        confidenceCalibrationScore: 100,
        adaptiveRatingDelta: 22,
        calculatedDifficulty: 900
      },
      {
        id: 'att-105',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'HighSchool',
        section: 'Section 21',
        scenarioTitle: 'Classroom Instructions',
        timestamp: now - dayMs * 2,
        scorePercent: 100,
        correctAnswersCount: 3,
        totalQuestions: 3,
        timeSpentSeconds: 48,
        replaysUsed: 1,
        playbackSpeed: 1.0,
        answers: { p1s1q1: 'Page 45', p1s1q2: '20', p1s1q3: 'Wednesday' },
        confidenceRatings: { p1s1q1: 'high', p1s1q2: 'medium', p1s1q3: 'high' },
        confidenceCalibrationScore: 92,
        adaptiveRatingDelta: 31,
        calculatedDifficulty: 1350
      },
      {
        id: 'att-106',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'HighSchool',
        section: 'Section 25',
        scenarioTitle: 'Planning a School Trip',
        timestamp: now - dayMs * 1,
        scorePercent: 67,
        correctAnswersCount: 2,
        totalQuestions: 3,
        timeSpentSeconds: 62,
        replaysUsed: 2,
        playbackSpeed: 1.0,
        answers: { hs1s1q1: 'Museum fully booked', hs1s1q2: '$2.20', hs1s1q3: 'Laptop' },
        confidenceRatings: { hs1s1q1: 'high', hs1s1q2: 'medium', hs1s1q3: 'low' },
        confidenceCalibrationScore: 70,
        adaptiveRatingDelta: 6,
        calculatedDifficulty: 1350
      },
      {
        id: 'att-107',
        studentId: 'student-primary-01',
        studentName: 'Alex Chen',
        level: 'Intermediate',
        section: 'Section 1',
        scenarioTitle: 'The Accommodation Booking',
        timestamp: now - 3600000 * 4,
        scorePercent: 100,
        correctAnswersCount: 2,
        totalQuestions: 2,
        timeSpentSeconds: 41,
        replaysUsed: 1,
        playbackSpeed: 1.0,
        answers: { t1q1: '14th to 16th of April', t1q2: '07745 223 990' },
        confidenceRatings: { t1q1: 'high', t1q2: 'high' },
        confidenceCalibrationScore: 100,
        adaptiveRatingDelta: 28,
        calculatedDifficulty: 1600
      },
      {
        id: 'att-201',
        studentId: 'student-03',
        studentName: 'Marcus Brody',
        level: 'Zero',
        section: 'Section 2',
        scenarioTitle: 'Mobile Number',
        timestamp: now - dayMs * 3,
        scorePercent: 0,
        correctAnswersCount: 0,
        totalQuestions: 1,
        timeSpentSeconds: 28,
        replaysUsed: 3,
        playbackSpeed: 1.0,
        answers: { p2q1: '01728215215' },
        confidenceRatings: { p2q1: 'high' },
        confidenceCalibrationScore: 40,
        adaptiveRatingDelta: -18,
        calculatedDifficulty: 650
      },
      {
        id: 'att-202',
        studentId: 'student-03',
        studentName: 'Marcus Brody',
        level: 'HighSchool',
        section: 'Section 2',
        scenarioTitle: 'Family',
        timestamp: now - dayMs * 2,
        scorePercent: 33,
        correctAnswersCount: 1,
        totalQuestions: 3,
        timeSpentSeconds: 52,
        replaysUsed: 2,
        playbackSpeed: 0.9,
        answers: { hs2q1: 'Big', hs2q2: 'Teacher', hs2q3: 'One' },
        confidenceRatings: { hs2q1: 'high', hs2q2: 'medium', hs2q3: 'high' },
        confidenceCalibrationScore: 55,
        adaptiveRatingDelta: -12,
        calculatedDifficulty: 1350
      },
      {
        id: 'att-203',
        studentId: 'student-03',
        studentName: 'Marcus Brody',
        level: 'HighSchool',
        section: 'Section 5',
        scenarioTitle: 'The National Bird',
        timestamp: now - dayMs * 1,
        scorePercent: 67,
        correctAnswersCount: 2,
        totalQuestions: 3,
        timeSpentSeconds: 44,
        replaysUsed: 2,
        playbackSpeed: 1.0,
        answers: { hs5q1: 'Pigeon', hs5q2: 'Black and white', hs5q3: 'On a green tree' },
        confidenceRatings: { hs5q1: 'high', hs5q2: 'high', hs5q3: 'medium' },
        confidenceCalibrationScore: 68,
        adaptiveRatingDelta: 4,
        calculatedDifficulty: 1350
      },
      {
        id: 'att-301',
        studentId: 'student-05',
        studentName: 'David Okafor',
        level: 'HighSchool',
        section: 'Section 3',
        scenarioTitle: 'Food',
        timestamp: now - dayMs * 2,
        scorePercent: 67,
        correctAnswersCount: 2,
        totalQuestions: 3,
        timeSpentSeconds: 38,
        replaysUsed: 1,
        playbackSpeed: 1.0,
        answers: { hs3q1: 'Rice and meat', hs3q2: 'Mother', hs3q3: 'Mangoes' },
        confidenceRatings: { hs3q1: 'medium', hs3q2: 'high', hs3q3: 'high' },
        confidenceCalibrationScore: 82,
        adaptiveRatingDelta: 8,
        calculatedDifficulty: 1350
      },
      {
        id: 'att-401',
        studentId: 'student-02',
        studentName: 'Sara Tanaka',
        level: 'Intermediate',
        section: 'Section 1',
        scenarioTitle: 'The Accommodation Booking',
        timestamp: now - dayMs * 3,
        scorePercent: 100,
        correctAnswersCount: 2,
        totalQuestions: 2,
        timeSpentSeconds: 32,
        replaysUsed: 0,
        playbackSpeed: 1.1,
        answers: { t1q1: '14th to 16th of April', t1q2: '07745 223 990' },
        confidenceRatings: { t1q1: 'high', t1q2: 'high' },
        confidenceCalibrationScore: 100,
        adaptiveRatingDelta: 32,
        calculatedDifficulty: 1600
      }
    ];
  }

  private static getSeedCohort(): StudentProfile[] {
    const now = Date.now();
    return [
      {
        id: 'student-primary-01',
        name: 'Alex Chen',
        email: 'alex.chen@meridian.edu',
        cohort: 'Cohort 2026-A',
        adaptiveRating: 1180,
        streakDays: 4,
        totalListeningSeconds: 3420,
        completedSectionsCount: 14,
        averageAccuracy: 88,
        lastActive: now,
        focusArea: 'Signpost Distractors & Rapid Numbers'
      },
      {
        id: 'student-02',
        name: 'Sara Tanaka',
        email: 'sara.t@meridian.edu',
        cohort: 'Cohort 2026-A',
        adaptiveRating: 1540,
        streakDays: 7,
        totalListeningSeconds: 5800,
        completedSectionsCount: 28,
        averageAccuracy: 94,
        lastActive: now - 1800000,
        focusArea: 'Advanced Academic Debates'
      },
      {
        id: 'student-03',
        name: 'Marcus Brody',
        email: 'm.brody@meridian.edu',
        cohort: 'Cohort 2026-A',
        adaptiveRating: 890,
        streakDays: 1,
        totalListeningSeconds: 1950,
        completedSectionsCount: 8,
        averageAccuracy: 71,
        lastActive: now - 86400000,
        focusArea: 'Phoneme Differentiation & Number Clusters'
      },
      {
        id: 'student-04',
        name: 'Elena Rostova',
        email: 'elena.r@meridian.edu',
        cohort: 'Cohort 2026-A',
        adaptiveRating: 1810,
        streakDays: 12,
        totalListeningSeconds: 8400,
        completedSectionsCount: 39,
        averageAccuracy: 96,
        lastActive: now - 7200000,
        focusArea: 'Technical Lectures & Speed Calibration'
      },
      {
        id: 'student-05',
        name: 'David Okafor',
        email: 'd.okafor@meridian.edu',
        cohort: 'Cohort 2026-A',
        adaptiveRating: 1320,
        streakDays: 3,
        totalListeningSeconds: 4100,
        completedSectionsCount: 19,
        averageAccuracy: 84,
        lastActive: now - 43200000,
        focusArea: 'Multi-Speaker Transition Tracking'
      }
    ];
  }

  /**
   * Retrieves all saved words history
   */
  static getSavedWords(): SavedWordItem[] {
    try {
      const data = localStorage.getItem(SAVED_WORDS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to parse saved words', e);
    }
    // Default seed words for listening enrichment
    return [
      {
        id: 'seed-word-1',
        word: 'actually',
        phonetic: '/ˈæk.tʃu.ə.li/',
        partOfSpeech: 'adverb',
        definition: 'As the truth or facts of a situation; used to introduce a correction or pivot.',
        exampleSentence: 'I thought the gate was closed, but actually it remained open.',
        acousticTip: 'Frequently signals discourse contrast or factual pivot in listening tests.',
        scenarioUsageSnippet: 'Actually, let me double check that room number on the master roster.',
        scenarioTitle: 'Lecture Hall Directions & Timetables',
        savedAt: Date.now() - 3600000 * 24
      },
      {
        id: 'seed-word-2',
        word: 'scratch',
        phonetic: '/skrætʃ/',
        partOfSpeech: 'verb',
        definition: 'In conversational speech: "scratch that" means cancel or ignore the prior statement.',
        exampleSentence: 'Scratch that earlier estimate; the actual total is higher.',
        acousticTip: 'Crucial oral self-correction marker in fast speech.',
        scenarioUsageSnippet: 'Wait, scratch that, the lab moved to the science annex across the quad.',
        scenarioTitle: 'Campus Navigation & Room Changes',
        savedAt: Date.now() - 3600000 * 12
      }
    ];
  }

  /**
   * Saves or updates a word in the user's history log
   */
  static saveWord(wordItem: Omit<SavedWordItem, 'id' | 'savedAt'>): SavedWordItem {
    try {
      const words = this.getSavedWords();
      const cleanWord = wordItem.word.trim().toLowerCase();
      // Check if already exists; if so, update its scenario snippet / timestamp
      const existingIdx = words.findIndex((w) => w.word.toLowerCase() === cleanWord);

      const newItem: SavedWordItem = {
        ...wordItem,
        id: existingIdx >= 0 ? words[existingIdx].id : `saved-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        savedAt: Date.now()
      };

      if (existingIdx >= 0) {
        words[existingIdx] = newItem;
      } else {
        words.unshift(newItem);
      }

      localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(words));
      return newItem;
    } catch (e) {
      console.warn('Failed to save word to history', e);
      return {
        ...wordItem,
        id: `saved-${Date.now()}`,
        savedAt: Date.now()
      };
    }
  }

  /**
   * Removes a saved word from the history log
   */
  static removeSavedWord(id: string): void {
    try {
      const words = this.getSavedWords().filter((w) => w.id !== id);
      localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(words));
    } catch (e) {
      console.warn('Failed to remove saved word', e);
    }
  }

  /**
   * Clears all saved words
   */
  static clearAllSavedWords(): void {
    try {
      localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify([]));
    } catch (e) {
      console.warn('Failed to clear saved words', e);
    }
  }
}
