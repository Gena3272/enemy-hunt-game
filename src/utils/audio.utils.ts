export class AudioManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;
  private gainNode: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private audioElement: HTMLAudioElement | null = null;
  private audioSource: MediaElementAudioSourceNode | null = null;

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.stopBackgroundMusic();
    }
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  async loadAndPlayMP3(url: string) {
    if (!this.enabled || this.isMusicPlaying) return;

    try {
      const ctx = this.initAudioContext();

      this.audioElement = new Audio(url);
      this.audioElement.loop = true;
      this.audioElement.volume = 0.05;

      if (!this.audioSource) {
        this.audioSource = ctx.createMediaElementSource(this.audioElement);
        this.gainNode = ctx.createGain();
        this.gainNode.gain.value = 0.05;

        this.audioSource.connect(this.gainNode);
        this.gainNode.connect(ctx.destination);
      }

      await this.audioElement.play();
      this.isMusicPlaying = true;
    } catch (error) {
      console.error('Помилка завантаження MP3:', error);
      this.startBackgroundMusic();
    }
  }

  startBackgroundMusic() {
    if (!this.enabled || this.isMusicPlaying) return;

    const ctx = this.initAudioContext();
    this.gainNode = ctx.createGain();
    this.gainNode.connect(ctx.destination);
    this.gainNode.gain.value = 0.05;

    this.isMusicPlaying = true;
  }

  stopBackgroundMusic() {
    this.isMusicPlaying = false;

    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
  }

  playSound(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.enabled) return;

    const ctx = this.initAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.frequency.value = frequency;
    osc.type = type;
    gain.gain.value = 0.15;

    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    osc.stop(ctx.currentTime + duration);
  }

  playEnemyKill() {
    this.playSound(400, 0.1);
  }

  playVictory() {
    const ctx = this.initAudioContext();
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      setTimeout(() => this.playSound(freq, 0.3, 'sine'), i * 150);
    });
  }

  playDefeat() {
    this.playSound(200, 0.5, 'sawtooth');
    setTimeout(() => this.playSound(150, 0.7, 'sawtooth'), 300);
  }

  playBooster() {
    this.playSound(800, 0.1);
    setTimeout(() => this.playSound(1000, 0.1), 100);
  }
}
