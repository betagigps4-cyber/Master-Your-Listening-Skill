import { DialogueSegment, VoiceId } from '../types';
import { VOICE_ORDER, VOICE_PROFILES } from '../data/scenariosData';

export class AudioEngine {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  private static allVoices: SpeechSynthesisVoice[] = [];
  private static voiceMap: Record<VoiceId, SpeechSynthesisVoice | null> = {
    F1: null, F2: null, F3: null, F4: null, F5: null,
    M1: null, M2: null, M3: null, M4: null, M5: null
  };
  private static isInitialized = false;

  private static dialogueQueue: DialogueSegment[] = [];
  private static currentDialogueIndex = 0;
  private static isPlaying = false;
  private static currentVoiceId: VoiceId | null = null;
  private static progressInterval: any = null;
  private static playbackRate = 1.0;

  private static onActiveSpeakerChange?: (voiceId: VoiceId | null) => void;
  private static onPlayStateChange?: (isPlaying: boolean) => void;
  private static onProgressChange?: (progressPercent: number) => void;

  static init(
    onSpeaker: (voiceId: VoiceId | null) => void,
    onPlayState: (isPlaying: boolean) => void,
    onProgress: (progressPercent: number) => void
  ) {
    this.onActiveSpeakerChange = onSpeaker;
    this.onPlayStateChange = onPlayState;
    this.onProgressChange = onProgress;

    if (!this.synth) return;

    const loadVoices = () => {
      this.allVoices = this.synth!.getVoices();
      this.autoAssignVoices();
      this.isInitialized = true;
    };

    loadVoices();
    if (typeof window !== 'undefined') {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  static getVoicesList(): SpeechSynthesisVoice[] {
    if (!this.synth) return [];
    if (this.allVoices.length === 0) {
      this.allVoices = this.synth.getVoices();
    }
    return this.allVoices;
  }

  static getVoiceMap() {
    return this.voiceMap;
  }

  static reassignVoice(voiceId: VoiceId, voiceIndex: number) {
    if (this.allVoices[voiceIndex]) {
      this.voiceMap[voiceId] = this.allVoices[voiceIndex];
    }
  }

  private static autoAssignVoices() {
    if (this.allVoices.length === 0) return;
    const englishVoices = this.allVoices.filter(v => v.lang.startsWith('en'));
    const pool = englishVoices.length > 0 ? englishVoices : this.allVoices;

    const findVoice = (keywords: string[], exclude: string[] = []) => {
      return pool.find(v => {
        const name = v.name.toLowerCase();
        const isExcluded = exclude.some(e => name.includes(e.toLowerCase()));
        if (isExcluded) return false;
        return keywords.some(k => name.includes(k.toLowerCase()));
      });
    };

    // Female Voices (F1 - F5)
    this.voiceMap.F1 = findVoice(['samantha', 'karen', 'female', 'zira', 'susan']) || pool[0] || null;
    this.voiceMap.F2 = findVoice(['victoria', 'moira', 'fiona', 'kate'], ['samantha']) || pool[1] || this.voiceMap.F1;
    this.voiceMap.F3 = findVoice(['google', 'female'], ['samantha', 'victoria']) || pool[2] || this.voiceMap.F1;
    this.voiceMap.F4 = findVoice(['alice', 'ellen', 'maria']) || pool[3] || this.voiceMap.F2;
    this.voiceMap.F5 = findVoice(['jenny', 'aria', 'neerja']) || pool[4] || this.voiceMap.F3;

    // Male Voices (M1 - M5)
    this.voiceMap.M1 = findVoice(['daniel', 'alex', 'david', 'male', 'tom']) || pool[5] || pool[0] || null;
    this.voiceMap.M2 = findVoice(['fred', 'mark', 'james', 'guy']) || pool[6] || this.voiceMap.M1;
    this.voiceMap.M3 = findVoice(['google uk english male', 'richard', 'george']) || pool[7] || this.voiceMap.M1;
    this.voiceMap.M4 = findVoice(['microsoft mark', 'steve', 'paul']) || pool[8] || this.voiceMap.M2;
    this.voiceMap.M5 = findVoice(['narrator', 'thomas', 'bob']) || pool[9] || this.voiceMap.M3;
  }

  static parseDialogue(transcript: string): DialogueSegment[] {
    const segments: DialogueSegment[] = [];
    const markerRegex = /\[(F[1-5]|M[1-5])\]/g;
    let match: RegExpExecArray | null;
    const markers: { voice: VoiceId; index: number; length: number }[] = [];

    while ((match = markerRegex.exec(transcript)) !== null) {
      markers.push({
        voice: match[1] as VoiceId,
        index: match.index,
        length: match[0].length
      });
    }

    if (markers.length === 0) {
      // Auto alternate sentences
      const sentences = transcript.match(/[^.!?]+[.!?]+/g) || [transcript];
      let autoIdx = 0;
      for (const sent of sentences) {
        const trimmed = sent.trim();
        if (trimmed) {
          segments.push({
            text: trimmed,
            voiceId: VOICE_ORDER[autoIdx % VOICE_ORDER.length]
          });
          autoIdx++;
        }
      }
    } else {
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i];
        const nextIndex = i + 1 < markers.length ? markers[i + 1].index : transcript.length;

        // Prefix text before first marker
        if (i === 0 && marker.index > 0) {
          const beforeText = transcript.substring(0, marker.index).trim();
          if (beforeText) {
            segments.push({ text: beforeText, voiceId: 'M5' });
          }
        }

        const segmentText = transcript.substring(marker.index + marker.length, nextIndex).trim();
        if (segmentText) {
          segments.push({
            text: segmentText,
            voiceId: marker.voice
          });
        }
      }
    }

    return segments;
  }

  static playTranscript(transcript: string, speed: number = 1.0) {
    this.stop();
    this.playbackRate = speed;
    this.dialogueQueue = this.parseDialogue(transcript);
    this.currentDialogueIndex = 0;

    if (this.dialogueQueue.length === 0) return;

    const totalWords = transcript.replace(/\[(F[1-5]|M[1-5])\]/g, '').split(/\s+/).length;
    const totalDurationMs = (totalWords / (140 * speed)) * 60000;
    const t0 = Date.now();

    this.isPlaying = true;
    this.onPlayStateChange?.(true);

    if (this.progressInterval) clearInterval(this.progressInterval);
    this.progressInterval = setInterval(() => {
      const elapsed = Date.now() - t0;
      const pct = Math.min(99, Math.round((elapsed / totalDurationMs) * 100));
      this.onProgressChange?.(pct);
    }, 100);

    this.speakNextSegment();
  }

  private static speakNextSegment() {
    if (!this.synth || this.currentDialogueIndex >= this.dialogueQueue.length) {
      this.stopProgress();
      this.isPlaying = false;
      this.currentVoiceId = null;
      this.onPlayStateChange?.(false);
      this.onActiveSpeakerChange?.(null);
      this.onProgressChange?.(100);
      return;
    }

    const seg = this.dialogueQueue[this.currentDialogueIndex];
    const utterance = new SpeechSynthesisUtterance(seg.text);

    const voice = this.voiceMap[seg.voiceId];
    if (voice) utterance.voice = voice;

    const profile = VOICE_PROFILES[seg.voiceId];
    utterance.pitch = profile ? profile.pitch : 1.0;
    utterance.rate = (profile ? profile.rate : 0.9) * this.playbackRate;

    utterance.onstart = () => {
      this.currentVoiceId = seg.voiceId;
      this.onActiveSpeakerChange?.(seg.voiceId);
    };

    utterance.onend = () => {
      this.currentDialogueIndex++;
      this.speakNextSegment();
    };

    utterance.onerror = () => {
      this.stop();
    };

    this.synth.speak(utterance);
  }

  static togglePauseResume(transcript: string, speed: number = 1.0) {
    if (!this.synth) return;

    if (this.synth.speaking) {
      if (this.synth.paused) {
        this.synth.resume();
        this.isPlaying = true;
        this.onPlayStateChange?.(true);
      } else {
        this.synth.pause();
        this.isPlaying = false;
        this.onPlayStateChange?.(false);
      }
    } else {
      this.playTranscript(transcript, speed);
    }
  }

  static stop() {
    this.stopProgress();
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.currentVoiceId = null;
    this.dialogueQueue = [];
    this.currentDialogueIndex = 0;
    this.onPlayStateChange?.(false);
    this.onActiveSpeakerChange?.(null);
    this.onProgressChange?.(0);
  }

  private static stopProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  static getEstimatedDuration(transcript: string, speed: number = 1.0): number {
    const totalWords = transcript.replace(/\[(F[1-5]|M[1-5])\]/g, '').split(/\s+/).filter(Boolean).length;
    return Math.max(5, (totalWords / (140 * speed)) * 60);
  }

  static seekToPercent(transcript: string, percent: number, speed: number = 1.0) {
    const wasPlaying = this.isPlaying;
    this.stopProgress();
    if (this.synth) {
      this.synth.cancel();
    }
    
    this.playbackRate = speed;
    this.dialogueQueue = this.parseDialogue(transcript);
    const totalSegments = this.dialogueQueue.length;
    if (totalSegments === 0) return;

    const clampedPercent = Math.max(0, Math.min(100, percent));
    const targetIdx = Math.min(totalSegments - 1, Math.floor((clampedPercent / 100) * totalSegments));
    this.currentDialogueIndex = targetIdx;
    this.onProgressChange?.(clampedPercent);

    if (wasPlaying) {
      const totalWords = transcript.replace(/\[(F[1-5]|M[1-5])\]/g, '').split(/\s+/).filter(Boolean).length;
      const totalDurationMs = (totalWords / (140 * speed)) * 60000;
      const t0 = Date.now() - (clampedPercent / 100) * totalDurationMs;

      this.isPlaying = true;
      this.onPlayStateChange?.(true);

      this.progressInterval = setInterval(() => {
        const elapsed = Date.now() - t0;
        const pct = Math.min(99, Math.round((elapsed / totalDurationMs) * 100));
        this.onProgressChange?.(pct);
      }, 100);

      this.speakNextSegment();
    }
  }

  static getIsPlaying() {
    return this.isPlaying;
  }

  static getCurrentSpeaker() {
    return this.currentVoiceId;
  }

  static speakSnippet(text: string, onEnd?: () => void, voiceOverride?: VoiceId, speed: number = 0.95) {
    if (!this.synth) return;
    this.stop();

    // Check if text has speaker marker like [F3] or [M2]
    const speakerMatch = text.match(/\[(F[1-5]|M[1-5])\]/);
    const targetVoiceId: VoiceId | null = voiceOverride || (speakerMatch ? (speakerMatch[1] as VoiceId) : null);

    const cleanText = text.replace(/\[(F[1-5]|M[1-5])\]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);

    if (targetVoiceId) {
      const profile = VOICE_PROFILES[targetVoiceId];
      const assignedVoice = this.voiceMap[targetVoiceId];
      if (assignedVoice) {
        utterance.voice = assignedVoice;
      }
      utterance.pitch = profile ? profile.pitch : 1.0;
      utterance.rate = (profile ? profile.rate : 0.95) * speed;
      this.currentVoiceId = targetVoiceId;
      this.onActiveSpeakerChange?.(targetVoiceId);
    } else {
      utterance.rate = speed;
      utterance.pitch = 1.0;
      const voices = this.getVoicesList();
      const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
    }

    utterance.onend = () => {
      this.currentVoiceId = null;
      this.onActiveSpeakerChange?.(null);
      onEnd?.();
    };
    utterance.onerror = () => {
      this.currentVoiceId = null;
      this.onActiveSpeakerChange?.(null);
      onEnd?.();
    };
    this.synth.speak(utterance);
  }
}
