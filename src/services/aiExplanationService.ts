import { AIExplanation } from '../types';

export interface ExplanationRequestParams {
  questionId: string;
  question: string;
  options: string[];
  userAnswer: string;
  correctAnswer: string;
  transcript: string;
  category?: string;
  level?: string;
}

// In-memory cache for fast instant retrieval across session
const explanationCache = new Map<string, AIExplanation>();

export class AIExplanationService {
  private static getCacheKey(params: ExplanationRequestParams): string {
    return `${params.questionId}::${params.userAnswer}::${params.correctAnswer}`;
  }

  static async fetchExplanation(
    params: ExplanationRequestParams
  ): Promise<AIExplanation> {
    const cacheKey = this.getCacheKey(params);
    if (explanationCache.has(cacheKey)) {
      return explanationCache.get(cacheKey)!;
    }

    try {
      const response = await fetch('/api/explain-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: params.question,
          options: params.options,
          userAnswer: params.userAnswer,
          correctAnswer: params.correctAnswer,
          transcript: params.transcript,
          category: params.category,
          level: params.level,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: AIExplanation = await response.json();
      explanationCache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.warn('Failed to fetch AI explanation from server, generating local fallback:', error);
      // Fallback heuristic if server network fails
      const fallback = this.generateFallbackExplanation(params);
      explanationCache.set(cacheKey, fallback);
      return fallback;
    }
  }

  static generateFallbackExplanation(params: ExplanationRequestParams): AIExplanation {
    const transcript = params.transcript || '';
    const clean = (s: string) => s.replace(/\[(F[1-5]|M[1-5])\]/g, '').trim();
    const rawSegments = transcript.split(/(?<=[.?!])\s+/).filter(Boolean);
    const totalSegments = Math.max(1, rawSegments.length);

    const userTokens = clean(params.userAnswer)
      .toLowerCase()
      .split(/[\s,/-]+/)
      .filter((w) => w.length > 1 && !['the', 'and', 'for', 'with', 'by', 'in', 'at', 'on'].includes(w));

    const correctTokens = clean(params.correctAnswer)
      .toLowerCase()
      .split(/[\s,/-]+/)
      .filter((w) => w.length > 1 && !['the', 'and', 'for', 'with', 'by', 'in', 'at', 'on'].includes(w));

    // Find misinterpreted segment
    let misIndex = -1;
    let misinterpretedQuote = '';
    let misinterpretedCue = params.userAnswer;

    for (let i = 0; i < rawSegments.length; i++) {
      const seg = rawSegments[i];
      const segLower = clean(seg).toLowerCase();
      if (segLower.includes(clean(params.userAnswer).toLowerCase())) {
        misIndex = i;
        misinterpretedQuote = seg.trim();
        misinterpretedCue = params.userAnswer;
        break;
      }
      const hasToken = userTokens.some((t) => segLower.includes(t));
      if (hasToken && misIndex === -1) {
        misIndex = i;
        misinterpretedQuote = seg.trim();
        const matchedTok = userTokens.find((t) => segLower.includes(t)) || params.userAnswer;
        misinterpretedCue = matchedTok;
      }
    }

    if (misIndex === -1) {
      misIndex = 0;
      misinterpretedQuote = rawSegments[0] || transcript.slice(0, 140);
    }

    // Find correct segment
    let corIndex = -1;
    let acousticQuote = '';
    let cueHighlight = params.correctAnswer;

    for (let i = 0; i < rawSegments.length; i++) {
      const seg = rawSegments[i];
      const segLower = clean(seg).toLowerCase();
      if (segLower.includes(clean(params.correctAnswer).toLowerCase())) {
        corIndex = i;
        acousticQuote = seg.trim();
        cueHighlight = params.correctAnswer;
        break;
      }
      const hasToken = correctTokens.some((t) => segLower.includes(t));
      if (hasToken && corIndex === -1) {
        corIndex = i;
        acousticQuote = seg.trim();
        const matchedTok = correctTokens.find((t) => segLower.includes(t)) || params.correctAnswer;
        cueHighlight = matchedTok;
      }
    }

    if (corIndex === -1) {
      corIndex = rawSegments.length > 1 ? rawSegments.length - 1 : 0;
      acousticQuote = rawSegments[corIndex] || transcript.slice(0, 140);
    }

    const misinterpretedTimePercentEstimate = Math.min(
      95,
      Math.max(5, Math.round(((misIndex + 0.5) / totalSegments) * 100))
    );
    const correctTimePercentEstimate = Math.min(
      95,
      Math.max(10, Math.round(((corIndex + 0.5) / totalSegments) * 100))
    );

    // Identify trap type
    const combined = (misinterpretedQuote + ' ' + acousticQuote).toLowerCase();
    let misinterpretationType = 'Acoustic Distractor Trap';
    let misinterpretationReason = `You likely locked onto "${misinterpretedCue}" when heard in this sentence, before the dialogue confirmed "${params.correctAnswer}".`;

    if (
      (/\[f[1-5]\]/.test(misinterpretedQuote.toLowerCase()) && /\[m[1-5]\]/.test(acousticQuote.toLowerCase())) ||
      (/\[m[1-5]\]/.test(misinterpretedQuote.toLowerCase()) && /\[f[1-5]\]/.test(acousticQuote.toLowerCase()))
    ) {
      misinterpretationType = 'Speaker Misattribution';
      misinterpretationReason = `One speaker uttered "${misinterpretedCue}", but the question targeted what was confirmed by the other speaker.`;
    } else if (/\b(usually|normally|always|today|yesterday|tomorrow|currently|used to|past)\b/.test(combined)) {
      misinterpretationType = 'Temporal / Habitual Contrast';
      misinterpretationReason = `The dialogue contrasted a routine action ("${misinterpretedCue}") against the specific condition asked in the question.`;
    } else if (/\b(actually|however|but|instead|rather|wait|no|changed|except)\b/.test(combined)) {
      misinterpretationType = 'Self-Correction & Pivot';
      misinterpretationReason = `The speaker initially spoke "${misinterpretedCue}", but quickly followed with a pivot signpost confirming "${params.correctAnswer}".`;
    } else if (/\b\d+\b/.test(params.userAnswer)) {
      misinterpretationType = 'Numerical Distractor Collision';
      misinterpretationReason = `Multiple numbers were spoken in close proximity; "${misinterpretedCue}" applied to a different subject or metric.`;
    }

    const contrastSummary = `You heard "${misinterpretedCue}" in "${clean(misinterpretedQuote)}", but the audio affirmed "${cueHighlight}" in "${clean(acousticQuote)}".`;

    return {
      distractorAnalysis: `You selected "${params.userAnswer}", which was mentioned as a distractor. ${misinterpretationReason}`,
      misinterpretedQuote,
      misinterpretedCue,
      misinterpretationType,
      misinterpretationReason,
      acousticQuote,
      cueHighlight,
      contrastSummary,
      listeningTip: "Always listen through the entire sentence or dialogue exchange—speakers routinely introduce a distractor before stating the true resolution.",
      coreConcept: misinterpretationType,
      misinterpretedTimePercentEstimate,
      correctTimePercentEstimate,
      source: 'heuristic',
    };
  }
}
