/**
 * SoundEffects & Notification service for ListenMaster
 * Uses Web Audio API for zero-dependency synthesized acoustic feedback
 */

class SoundEffectsService {
  private ctx: AudioContext | null = null;
  private soundEnabled = true;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  /**
   * Goal Achieved Chime: Bright, uplifting 4-note ascending chord arpeggio
   */
  public playGoalAchievedFanfare(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Frequencies: C5, E5, G5, C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, index) => {
      const startTime = now + index * 0.12;
      const duration = 0.6;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Subtle vibrato
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    });
  }

  /**
   * Deep Work Start Chime: Crisp focus sound
   */
  public playStartChime(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [440, 554.37, 659.25]; // A4, C#5, E5

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  /**
   * Question checked tick: Soft affirmative click
   */
  public playQuestionTick(isCorrect: boolean): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isCorrect ? 880 : 330, now);
    if (isCorrect) {
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);
    }

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  /**
   * Time Warning Chime (60s remaining): Gentle dual ping
   */
  public playTimeWarningChime(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    [0, 0.2].forEach((offset) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now + offset);
      gain.gain.setValueAtTime(0.06, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.15);
    });
  }

  /**
   * Time Expired Chime: Gentle descending chime
   */
  public playTimeExpiredChime(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [587.33, 493.88, 392.0]; // D5, B4, G4
    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.14;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.08, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  /**
   * Browser System Notification (fallback to in-app notification)
   */
  public requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      return Promise.resolve('unsupported');
    }
    return Notification.requestPermission();
  }

  public sendGoalMetNotification(targetQuestions: number, timeTakenText: string, accuracy: number): void {
    if (typeof window === 'undefined' || !('Notification' in window)) return;
    if (Notification.permission === 'granted') {
      try {
        new Notification('🎯 Deep Work Goal Met!', {
          body: `Superb focus! You completed ${targetQuestions} questions in ${timeTakenText} with ${accuracy}% accuracy.`,
          icon: '/favicon.ico',
          tag: 'deep-work-goal-met'
        });
      } catch (e) {
        // Iframe or cross-origin restrictions
      }
    }
  }
}

export const SoundEffects = new SoundEffectsService();
