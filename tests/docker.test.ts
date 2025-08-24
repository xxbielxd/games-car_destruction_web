// @ts-nocheck
import test from 'node:test';
import assert from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

test('Dockerfile expõe a porta 4173', () => {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dockerfilePath = resolve(__dirname, '..', '..', 'Dockerfile');
  assert.ok(existsSync(dockerfilePath), 'Dockerfile deve existir');
  const content = readFileSync(dockerfilePath, 'utf-8');
  assert.ok(content.includes('EXPOSE 4173'), 'Dockerfile deve expor porta 4173');
});
