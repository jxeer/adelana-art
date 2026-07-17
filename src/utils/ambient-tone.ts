class AmbientSoundscape {
  private audioEl: HTMLAudioElement | null = null;
  private isPlaying: boolean = false;
  private currentVolume: number = 0.35;
  private fadeFrame: number | null = null;

  start() {
    if (this.isPlaying) return;
    try {
      if (!this.audioEl) {
        this.audioEl = new Audio("/audio/room-tone.wav");
        this.audioEl.loop = true;
        this.audioEl.preload = "auto";
        this.audioEl.volume = 0;
      }

      this.audioEl.currentTime = 0;
      void this.audioEl.play().catch(() => undefined);
      this.isPlaying = true;
      this.fadeToVolume(this.currentVolume, 1400);
    } catch (e) {
      console.error("Failed to initialize room tone audio:", e);
    }
  }

  stop() {
    if (!this.isPlaying || !this.audioEl) return;
    try {
      this.fadeToVolume(0, 1400, () => {
        this.audioEl?.pause();
        this.audioEl!.currentTime = 0;
        this.isPlaying = false;
      });
    } catch (e) {
      console.error("Failed to stop room tone audio:", e);
    }
  }

  setVolume(volume: number) {
    if (!this.audioEl) return;

    const clampedVolume = Math.max(0, Math.min(1, volume));
    this.currentVolume = Math.min(0.4, clampedVolume * 0.4);

    if (this.isPlaying) {
      this.fadeToVolume(this.currentVolume, 250);
    } else {
      this.audioEl.volume = this.currentVolume;
    }
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private fadeToVolume(targetVolume: number, durationMs: number, onComplete?: () => void) {
    if (!this.audioEl) return;

    if (this.fadeFrame !== null) {
      cancelAnimationFrame(this.fadeFrame);
      this.fadeFrame = null;
    }

    const startVolume = this.audioEl.volume;
    const startTime = performance.now();

    const step = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.audioEl!.volume = startVolume + (targetVolume - startVolume) * eased;

      if (progress < 1) {
        this.fadeFrame = requestAnimationFrame(step);
      } else {
        this.audioEl!.volume = targetVolume;
        this.fadeFrame = null;
        onComplete?.();
      }
    };

    step();
  }
}

export const ambientSoundscape = new AmbientSoundscape();
