export default class Sound {
  private collisionAudio: HTMLAudioElement;
  private destructionAudio: HTMLAudioElement;

  constructor(
    collisionSrc = 'assets/collision.wav',
    destructionSrc = 'assets/destruction.wav',
  ) {
    this.collisionAudio = new Audio(collisionSrc);
    this.destructionAudio = new Audio(destructionSrc);
  }

  playCollision(): void {
    this.collisionAudio.currentTime = 0;
    void this.collisionAudio.play();
  }

  playDestruction(): void {
    this.destructionAudio.currentTime = 0;
    void this.destructionAudio.play();
  }
}
