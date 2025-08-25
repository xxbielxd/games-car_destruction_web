export default class Sound {
  private collisionAudio: HTMLAudioElement;
  private destructionAudio: HTMLAudioElement;
  private backgroundAudio: HTMLAudioElement;
  private volume = 1;

  constructor(
    collisionSrc = 'assets/collision.wav',
    destructionSrc = 'assets/destruction.wav',
    backgroundSrc = 'assets/background.mp3',
  ) {
    this.collisionAudio = new Audio(collisionSrc);
    this.destructionAudio = new Audio(destructionSrc);
    this.backgroundAudio = new Audio(backgroundSrc);
    this.backgroundAudio.loop = true;
  }

  playCollision(): void {
    this.collisionAudio.currentTime = 0;
    void this.collisionAudio.play();
  }

  playDestruction(): void {
    this.destructionAudio.currentTime = 0;
    void this.destructionAudio.play();
  }

  playBackground(): void {
    this.backgroundAudio.currentTime = 0;
    void this.backgroundAudio.play().catch(() => {});
  }

  setBackgroundIntensity(intensity: number): void {
    this.backgroundAudio.playbackRate = intensity;
  }

  setVolume(volume: number): void {
    this.volume = Math.min(1, Math.max(0, volume));
    this.collisionAudio.volume = this.volume;
    this.destructionAudio.volume = this.volume;
    this.backgroundAudio.volume = this.volume;
  }
}
