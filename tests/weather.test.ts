import Weather from '../src/Weather.js';
import { test } from 'node:test';
import assert from 'node:assert';

// Stubs for lights
class Light { intensity = 0; }

test('weather updates light intensities over time', () => {
  const dir = new Light();
  const amb = new Light();
  const weather = new Weather(dir as any, amb as any);
  weather.update(1);
  const firstDir = dir.intensity;
  weather.update(1);
  assert.notEqual(dir.intensity, firstDir);
});

test('weather cycle wraps around', () => {
  const dir = new Light();
  const amb = new Light();
  const weather = new Weather(dir as any, amb as any);
  for (let i = 0; i < 1000; i++) weather.update(1);
  assert.equal(weather.getCycle() < 1, true);
});

test('weather reset restaura ciclo e intensidades', () => {
  const dir = new Light();
  const amb = new Light();
  const weather = new Weather(dir as any, amb as any);
  weather.update(10); // avança para noite
  weather.reset();
  assert.equal(weather.getCycle(), 0);
  assert.equal(dir.intensity, 1);
  assert.equal(amb.intensity, 0.5);
});
