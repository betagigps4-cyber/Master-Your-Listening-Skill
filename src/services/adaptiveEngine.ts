import { LevelKey, AttemptRecord, AdaptiveState, ConfidenceLevel } from '../types';
import { SCENARIOS, LEVEL_CFG, LEVEL_ORDER } from '../data/scenariosData';

export class AdaptiveEngine {
  /**
   * Calculates the updated Elo-based rating after completing a section,
   * refined with metacognitive confidence calibration metadata.
   */
  static calculateNewRating(
    currentRating: number,
    levelKey: LevelKey,
    scorePercent: number,
    replaysUsed: number,
    avgTimePerQuestionSec: number,
    confidenceRatings?: Record<string, ConfidenceLevel>,
    answersCorrectness?: Record<string, boolean>
  ): { newRating: number; delta: number; calibrationFactor: number } {
    const levelDifficulty = LEVEL_CFG[levelKey]?.baseDifficulty || 1000;
    
    // Expected probability of success based on rating difference
    const exponent = (levelDifficulty - currentRating) / 400;
    const expectedScore = 1 / (1 + Math.pow(10, exponent));
    const actualScore = scorePercent / 100;

    // Base K-factor: higher when fewer attempts or large divergence
    let kFactor = 36;

    // Penalty if heavy replays used (relying on hearing 3+ times reduces gain)
    const replayMultiplier = Math.max(0.65, 1 - replaysUsed * 0.08);

    // Speed bonus/penalty (if answered accurately and promptly < 25s per question)
    let speedMultiplier = 1.0;
    if (actualScore >= 0.8 && avgTimePerQuestionSec < 20) {
      speedMultiplier = 1.15;
    } else if (avgTimePerQuestionSec > 60) {
      speedMultiplier = 0.9;
    }

    // Confidence calibration multiplier
    // Refines adaptive difficulty:
    // - Overconfident incorrect (high confidence + wrong): penalizes false security
    // - Lucky guess (low confidence + correct): damps premature rating surges
    // - Calibrated mastery (high confidence + correct): accelerates advancement
    let calibrationMultiplier = 1.0;
    if (confidenceRatings && answersCorrectness) {
      const qIds = Object.keys(confidenceRatings);
      if (qIds.length > 0) {
        let totalCalibrationPoints = 0;
        for (const qId of qIds) {
          const conf = confidenceRatings[qId];
          const isCorrect = answersCorrectness[qId];
          if (isCorrect) {
            if (conf === 'high') totalCalibrationPoints += 1.15; // decisive mastery
            else if (conf === 'medium') totalCalibrationPoints += 1.0;
            else if (conf === 'low') totalCalibrationPoints += 0.75; // lucky guess, don't over-promote
          } else {
            if (conf === 'high') totalCalibrationPoints += 0.82; // distractor trap penalty
            else if (conf === 'medium') totalCalibrationPoints += 0.95;
            else if (conf === 'low') totalCalibrationPoints += 1.05; // calibrated uncertainty (aware of difficulty)
          }
        }
        calibrationMultiplier = totalCalibrationPoints / qIds.length;
      }
    }

    const rawDelta = kFactor * (actualScore - expectedScore) * replayMultiplier * speedMultiplier * calibrationMultiplier;
    
    // Smooth delta and clamp to sensible boundaries
    const delta = Math.round(rawDelta);
    const newRating = Math.max(500, Math.min(2600, currentRating + delta));

    return { newRating, delta, calibrationFactor: Math.round(calibrationMultiplier * 100) };
  }

  /**
   * Computes a 0-100 metacognitive calibration alignment score
   */
  static computeCalibrationScore(
    confidenceRatings?: Record<string, ConfidenceLevel>,
    answersCorrectness?: Record<string, boolean>
  ): number {
    if (!confidenceRatings || !answersCorrectness) return 75; // neutral fallback
    const qIds = Object.keys(confidenceRatings);
    if (qIds.length === 0) return 75;

    let alignedCount = 0;
    for (const qId of qIds) {
      const conf = confidenceRatings[qId];
      const isCorrect = answersCorrectness[qId];
      // Aligned if (high & correct) or (medium) or (low & wrong)
      if ((conf === 'high' && isCorrect) || (conf === 'low' && !isCorrect) || conf === 'medium') {
        alignedCount += 1;
      }
    }
    return Math.round((alignedCount / qIds.length) * 100);
  }

  /**
   * Recommends the next level based on rating
   */
  static recommendLevel(rating: number): LevelKey {
    if (rating < 850) return 'Zero';
    if (rating < 1050) return 'Primary';
    if (rating < 1250) return 'AdvancePrimary';
    if (rating < 1500) return 'HighSchool';
    if (rating < 1800) return 'Intermediate';
    if (rating < 2050) return 'Advance';
    if (rating < 2250) return 'Pro';
    return 'HigherOrder';
  }

  /**
   * Picks the next recommended section for the student
   */
  static recommendNextSection(
    recommendedLevel: LevelKey,
    completedSections: Record<string, number> // sectionId -> bestScore
  ): string {
    const sections = Object.keys(SCENARIOS[recommendedLevel] || {});
    if (sections.length === 0) return 'Section 1';

    // Find first unattempted section
    for (const sec of sections) {
      const key = `${recommendedLevel}-${sec}`;
      if (completedSections[key] === undefined) {
        return sec;
      }
    }

    // Otherwise find lowest scoring section for reinforcement
    let lowestSec = sections[0];
    let minScore = 100;
    for (const sec of sections) {
      const key = `${recommendedLevel}-${sec}`;
      const score = completedSections[key] ?? 0;
      if (score < minScore) {
        minScore = score;
        lowestSec = sec;
      }
    }

    return lowestSec;
  }

  /**
   * Returns recommended playback rate (0.8x to 1.25x) based on skill
   */
  static recommendPlaybackSpeed(rating: number): number {
    if (rating < 900) return 0.85;
    if (rating < 1400) return 1.0;
    if (rating < 1900) return 1.05;
    if (rating < 2200) return 1.15;
    return 1.25;
  }

  /**
   * Computes CEFR band from rating
   */
  static getCefrLevel(rating: number): { code: string; label: string; description: string } {
    if (rating < 800) return { code: 'A1', label: 'Beginner', description: 'Can recognize familiar words and basic phrases concerning themselves.' };
    if (rating < 1100) return { code: 'A2', label: 'Elementary', description: 'Can understand phrases and highest frequency vocabulary related to daily areas.' };
    if (rating < 1450) return { code: 'B1', label: 'Intermediate', description: 'Can understand the main points of clear standard input on familiar matters.' };
    if (rating < 1800) return { code: 'B2', label: 'Upper-Intermediate', description: 'Can understand extended speech, lectures and complex arguments.' };
    if (rating < 2200) return { code: 'C1', label: 'Advanced', description: 'Can understand a wide range of demanding, longer texts and recognize implicit meaning.' };
    return { code: 'C2', label: 'Mastery', description: 'Has no difficulty in understanding any kind of spoken language, whether live or broadcast.' };
  }

  /**
   * Generates a full adaptive summary from historical attempts
   */
  static computeAdaptiveState(
    attempts: AttemptRecord[],
    baseRating: number = 1000
  ): AdaptiveState {
    let currentRating = baseRating;
    let currentStreak = 0;
    const completedMap: Record<string, number> = {};
    const levelCounts: Record<LevelKey, { total: number; sumScore: number }> = {
      Zero: { total: 0, sumScore: 0 },
      Primary: { total: 0, sumScore: 0 },
      AdvancePrimary: { total: 0, sumScore: 0 },
      HighSchool: { total: 0, sumScore: 0 },
      Intermediate: { total: 0, sumScore: 0 },
      Advance: { total: 0, sumScore: 0 },
      Pro: { total: 0, sumScore: 0 },
      HigherOrder: { total: 0, sumScore: 0 }
    };

    // Sort chronologically
    const sorted = [...attempts].sort((a, b) => a.timestamp - b.timestamp);

    for (const att of sorted) {
      const qCount = Math.max(1, att.totalQuestions);
      const avgTime = att.timeSpentSeconds / qCount;
      const { newRating } = this.calculateNewRating(
        currentRating,
        att.level,
        att.scorePercent,
        att.replaysUsed,
        avgTime
      );
      currentRating = newRating;

      if (att.scorePercent >= 70) {
        currentStreak++;
      } else {
        currentStreak = 0;
      }

      const key = `${att.level}-${att.section}`;
      completedMap[key] = Math.max(completedMap[key] || 0, att.scorePercent);

      if (levelCounts[att.level]) {
        levelCounts[att.level].total++;
        levelCounts[att.level].sumScore += att.scorePercent;
      }
    }

    const recLevel = this.recommendLevel(currentRating);
    const recSection = this.recommendNextSection(recLevel, completedMap);
    const recSpeed = this.recommendPlaybackSpeed(currentRating);

    const masteryMap: Record<LevelKey, number> = {
      Zero: 0, Primary: 0, AdvancePrimary: 0, HighSchool: 0,
      Intermediate: 0, Advance: 0, Pro: 0, HigherOrder: 0
    };

    for (const lk of LEVEL_ORDER) {
      const data = levelCounts[lk];
      if (data && data.total > 0) {
        masteryMap[lk] = Math.round(data.sumScore / data.total);
      }
    }

    return {
      currentRating,
      streak: currentStreak,
      confidenceScore: Math.min(99, Math.round(50 + (sorted.length * 4))),
      recommendedLevel: recLevel,
      recommendedSection: recSection,
      recommendedSpeed: recSpeed,
      activeLevelMastery: masteryMap
    };
  }
}
