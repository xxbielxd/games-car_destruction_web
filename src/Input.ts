export const normalizeKey = (k: string | undefined) => {
  const lower = (k ?? '').toLowerCase();
  if (lower.startsWith('key')) return lower.slice(3);
  if (lower === 'space') return ' ';
  return lower;
};
export const mapArrow = (k: string) => {
  switch (k) {
    case 'arrowup':
      return 'w';
    case 'arrowdown':
      return 's';
    case 'arrowleft':
      return 'a';
    case 'arrowright':
      return 'd';
    default:
      return k;
  }
};

export interface KeyTracker {
  keys: Record<string, boolean>;
  dispose: () => void;
}

export function createKeyTracker(
  target: any = document,
  mapping: Record<string, string> = {},
  onKey?: (key: string, pressed: boolean) => void,
): KeyTracker {
  const keys: Record<string, boolean> = {};

  const handle = (pressed: boolean) => (e: any) => {
    let k = normalizeKey(e.key || e.code);
    k = mapping[k] ?? mapArrow(k);
    keys[k] = pressed;
    onKey?.(k, pressed);
    if (typeof e.preventDefault === 'function') e.preventDefault();
  };

  const down = handle(true);
  const up = handle(false);

  target.addEventListener('keydown', down);
  target.addEventListener('keyup', up);

  return {
    keys,
    dispose: () => {
      target.removeEventListener('keydown', down);
      target.removeEventListener('keyup', up);
    },
  };
}
