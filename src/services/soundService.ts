// ============================================================
// Sound Service — Manages game sound effects
// ============================================================

/** Available sound effect names */
export type SoundName = 'click' | 'win' | 'draw' | 'achieve' | 'move' | 'error';

/**
 * Sound Service class that manages audio playback.
 * Uses Web Audio API for low-latency sound effects.
 */
class SoundService {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private volume: number = 0.5;

  /** Initialize the AudioContext (must be called after user interaction) */
  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  /** Set whether sounds are enabled */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /** Set volume (0 to 1) */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  /** Check if sounds are enabled */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Play a synthesized sound effect.
   * We generate sounds programmatically to avoid loading external files.
   */
  play(name: SoundName): void {
    if (!this.enabled) return;

    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      switch (name) {
        case 'click':
        case 'move':
          this.playTone(ctx, now, 800, 0.05, 'sine', this.volume * 0.3);
          break;
        case 'win':
          // Victory fanfare — ascending notes
          this.playTone(ctx, now, 523, 0.15, 'sine', this.volume * 0.4);
          this.playTone(ctx, now + 0.15, 659, 0.15, 'sine', this.volume * 0.4);
          this.playTone(ctx, now + 0.3, 784, 0.15, 'sine', this.volume * 0.4);
          this.playTone(ctx, now + 0.45, 1047, 0.3, 'sine', this.volume * 0.5);
          break;
        case 'draw':
          // Descending tone
          this.playTone(ctx, now, 400, 0.2, 'triangle', this.volume * 0.3);
          this.playTone(ctx, now + 0.2, 300, 0.3, 'triangle', this.volume * 0.3);
          break;
        case 'achieve':
          // Achievement unlock — bright ascending
          this.playTone(ctx, now, 600, 0.1, 'sine', this.volume * 0.3);
          this.playTone(ctx, now + 0.1, 800, 0.1, 'sine', this.volume * 0.3);
          this.playTone(ctx, now + 0.2, 1000, 0.1, 'sine', this.volume * 0.4);
          this.playTone(ctx, now + 0.3, 1200, 0.2, 'sine', this.volume * 0.5);
          break;
        case 'error':
          // Error buzz
          this.playTone(ctx, now, 200, 0.15, 'sawtooth', this.volume * 0.2);
          this.playTone(ctx, now + 0.15, 150, 0.15, 'sawtooth', this.volume * 0.2);
          break;
      }
    } catch (error) {
      console.warn('Sound playback failed:', error);
    }
  }

  /** Play a single tone */
  private playTone(
    ctx: AudioContext,
    startTime: number,
    frequency: number,
    duration: number,
    type: OscillatorType,
    volume: number
  ): void {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(volume, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.01);
  }
}

/** Singleton instance */
export const soundService = new SoundService();
