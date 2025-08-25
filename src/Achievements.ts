export default class Achievements {
  private kills = 0;
  private unlocked = new Set<string>();

  registerKill(): string | null {
    this.kills++;
    if (this.kills === 1 && !this.unlocked.has('first_blood')) {
      this.unlocked.add('first_blood');
      return 'Primeiro Abate';
    }
    return null;
  }

  has(id: string): boolean {
    return this.unlocked.has(id);
  }
}
