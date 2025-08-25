/**
 * Controla o ciclo dia/noite alterando intensidade das luzes.
 */
export default class Weather {
  private dir: { intensity: number };
  private amb: { intensity: number };
  private t = 0; // 0..1

  constructor(dir: { intensity: number }, amb: { intensity: number }) {
    this.dir = dir;
    this.amb = amb;
  }

  /**
   * Avança o ciclo de clima.
   * @param delta Tempo em segundos.
   */
  update(delta: number): void {
    this.t = (this.t + delta * 0.05) % 1; // ciclo completo a cada 20s
    const intensity = Math.cos(this.t * Math.PI * 2) * 0.5 + 0.5; // 0..1
    this.dir.intensity = 0.2 + intensity * 0.8;
    this.amb.intensity = 0.1 + intensity * 0.4;
  }

  /**
   * Retorna o valor normalizado do ciclo atual (0 = dia, 1 = volta ao dia).
   */
  getCycle(): number {
    return this.t;
  }
}
