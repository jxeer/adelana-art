class AmbientSoundscape {
  private audioCtx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying: boolean = false;

  start() {
    if (this.isPlaying) return;
    try {
      // Initialize AudioContext
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      // Master Gain
      this.gainNode = this.audioCtx.createGain();
      this.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);

      // Low frequency hum 1 (Sine wave at 55Hz - A1)
      this.osc1 = this.audioCtx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(55, this.audioCtx.currentTime);
      
      const osc1Gain = this.audioCtx.createGain();
      osc1Gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);

      // LFO for breathing volume effect on OSC 1 (0.05 Hz)
      const lfo1 = this.audioCtx.createOscillator();
      lfo1.frequency.setValueAtTime(0.05, this.audioCtx.currentTime);
      const lfo1Gain = this.audioCtx.createGain();
      lfo1Gain.gain.setValueAtTime(0.008, this.audioCtx.currentTime);
      lfo1.connect(lfo1Gain);
      lfo1Gain.connect(osc1Gain.gain);

      this.osc1.connect(osc1Gain);
      osc1Gain.connect(this.gainNode);

      // Low frequency hum 2 (Sine wave at 82.4Hz - E2, perfect fifth)
      this.osc2 = this.audioCtx.createOscillator();
      this.osc2.type = "sine";
      this.osc2.frequency.setValueAtTime(82.4, this.audioCtx.currentTime);
      
      const osc2Gain = this.audioCtx.createGain();
      osc2Gain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);

      // LFO for breathing volume effect on OSC 2 (0.07 Hz)
      const lfo2 = this.audioCtx.createOscillator();
      lfo2.frequency.setValueAtTime(0.07, this.audioCtx.currentTime);
      const lfo2Gain = this.audioCtx.createGain();
      lfo2Gain.gain.setValueAtTime(0.005, this.audioCtx.currentTime);
      lfo2.connect(lfo2Gain);
      lfo2Gain.connect(osc2Gain.gain);

      this.osc2.connect(osc2Gain);
      osc2Gain.connect(this.gainNode);

      // Generate a soft ventilation/gallery room tone noise
      const bufferSize = 2 * this.audioCtx.sampleRate;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      this.noiseNode = this.audioCtx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      // Filter the noise to keep only ultra-low warm rumble (sub-60Hz)
      const lowpassFilter = this.audioCtx.createBiquadFilter();
      lowpassFilter.type = "lowpass";
      lowpassFilter.frequency.setValueAtTime(70, this.audioCtx.currentTime);
      lowpassFilter.Q.setValueAtTime(1.2, this.audioCtx.currentTime);

      const noiseGain = this.audioCtx.createGain();
      noiseGain.gain.setValueAtTime(0.012, this.audioCtx.currentTime);

      this.noiseNode.connect(lowpassFilter);
      lowpassFilter.connect(noiseGain);
      noiseGain.connect(this.gainNode);

      // Start all sound generators
      this.osc1.start(0);
      this.osc2.start(0);
      lfo1.start(0);
      lfo2.start(0);
      this.noiseNode.start(0);

      // Smooth fade-in
      this.gainNode.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 3);
      this.isPlaying = true;
    } catch (e) {
      console.error("Failed to initialize procedural ambient soundscape:", e);
    }
  }

  stop() {
    if (!this.isPlaying || !this.audioCtx || !this.gainNode) return;
    try {
      const curTime = this.audioCtx.currentTime;
      // Smooth fade-out before stopping to prevent pops
      this.gainNode.gain.linearRampToValueAtTime(0, curTime + 1.5);
      
      setTimeout(() => {
        this.osc1?.stop();
        this.osc2?.stop();
        this.noiseNode?.stop();
        this.audioCtx?.close();
        this.osc1 = null;
        this.osc2 = null;
        this.noiseNode = null;
        this.gainNode = null;
        this.audioCtx = null;
        this.isPlaying = false;
      }, 1600);
    } catch (e) {
      console.error("Failed to stop soundscape:", e);
    }
  }

  setVolume(volume: number) {
    if (!this.isPlaying || !this.audioCtx || !this.gainNode) return;
    // Map volume 0..1 to standard internal gain levels
    const targetGain = volume * 0.2;
    this.gainNode.gain.linearRampToValueAtTime(targetGain, this.audioCtx.currentTime + 0.3);
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const ambientSoundscape = new AmbientSoundscape();
