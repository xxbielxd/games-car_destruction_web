import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { normalizeKey, mapArrow, createKeyTracker } from '../src/Input.js';

test('mapArrow converte setas para WASD', () => {
  assert.equal(mapArrow(normalizeKey('ArrowUp')), 'w');
  assert.equal(mapArrow(normalizeKey('ArrowDown')), 's');
  assert.equal(mapArrow(normalizeKey('ArrowLeft')), 'a');
  assert.equal(mapArrow(normalizeKey('ArrowRight')), 'd');
});

test('createKeyTracker registra teclas e mapeia setas', () => {
  const handlers: Record<string, (e: any) => void> = {};
  const target = {
    addEventListener: (name: string, fn: any) => {
      handlers[name] = fn;
    },
    removeEventListener: () => {},
  } as any;

  const tracker = createKeyTracker(target);
  handlers.keydown({ key: 'ArrowUp', preventDefault() {} });
  assert.equal(tracker.keys['w'], true);
  handlers.keyup({ key: 'ArrowUp', preventDefault() {} });
  assert.equal(tracker.keys['w'], false);

  tracker.dispose();
});

test('createKeyTracker aceita mapeamento customizado', () => {
  const handlers: Record<string, (e: any) => void> = {};
  const target = {
    addEventListener: (name: string, fn: any) => {
      handlers[name] = fn;
    },
    removeEventListener: () => {},
  } as any;

  const tracker = createKeyTracker(target, { arrowleft: 'p2-left' });
  handlers.keydown({ key: 'ArrowLeft', preventDefault() {} });
  assert.equal(tracker.keys['p2-left'], true);
  tracker.dispose();
});
