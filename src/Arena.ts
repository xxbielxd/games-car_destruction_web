// Arena.ts
// Configura uma arena simples com limites.
export default class Arena {
  public width: number;
  public depth: number;

  constructor(width = 100, depth = 100) {
    this.width = width;
    this.depth = depth;
  }

  // Checa se uma posição está dentro da arena.
  contains(x: number, z: number): boolean {
    return x >= -this.width / 2 && x <= this.width / 2 && z >= -this.depth / 2 && z <= this.depth / 2;
  }
}
