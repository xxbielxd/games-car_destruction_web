export interface Entity {
  mesh: { position: { copy: (v: any) => void }; quaternion: { copy: (q: any) => void } };
  body: { position: any; quaternion: any };
}

export function syncEntityMeshes(entities: Entity[]): void {
  entities.forEach((e) => {
    e.mesh.position.copy(e.body.position);
    e.mesh.quaternion.copy(e.body.quaternion);
  });
}
