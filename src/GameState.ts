export type State = 'menu' | 'playing';

export default class GameState {
  private state: State = 'menu';
  private menu: HTMLElement;
  private message: HTMLElement;

  constructor(menu: HTMLElement, message: HTMLElement) {
    this.menu = menu;
    this.message = message;
    this.show('Press Enter to Start');
  }

  private show(text: string): void {
    this.menu.style.display = 'flex';
    this.message.textContent = text;
  }

  private hide(): void {
    this.menu.style.display = 'none';
  }

  start(): void {
    this.state = 'playing';
    this.hide();
  }

  gameOver(): void {
    this.state = 'menu';
    this.show('Game Over - Press Enter');
  }

  isPlaying(): boolean {
    return this.state === 'playing';
  }
}
