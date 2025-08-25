export interface Paintable {
  material: { color: { set: (c: number) => void } };
}

export function setCarColor(entity: Paintable, color: number): void {
  entity.material.color.set(color);
}
