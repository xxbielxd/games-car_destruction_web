export type State = 'menu' | 'playing';

export default class GameState {
  private state: State = 'menu';
  private menu: HTMLElement;
  private message: HTMLElement;
  private button: HTMLButtonElement;

  constructor(menu: HTMLElement, message: HTMLElement, button: HTMLButtonElement) {
    this.menu = menu;
    this.message = message;
    this.button = button;
    this.button.addEventListener('click', () => this.start());
    this.show('Pressione Enter ou clique em Iniciar', 'Iniciar');
  }

  private show(text: string, btnText: string): void {
    this.menu.style.display = 'flex';
    this.message.textContent = text;
    this.button.textContent = btnText;
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
    this.show('Game Over', 'Reiniciar');
  }

  isPlaying(): boolean {
    return this.state === 'playing';
  }
}
