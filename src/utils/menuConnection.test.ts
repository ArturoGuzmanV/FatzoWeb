import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_MENU_APP_URL,
  resolveMenuAppUrl,
  formatTableSlug,
  buildTableMenuUrl,
} from './menuConnection';

test('resolveMenuAppUrl falls back to default subdomain when empty', () => {
  assert.equal(resolveMenuAppUrl(undefined), DEFAULT_MENU_APP_URL);
  assert.equal(resolveMenuAppUrl('   '), DEFAULT_MENU_APP_URL);
});

test('resolveMenuAppUrl normalizes trailing slashes on absolute URLs and subpaths', () => {
  assert.equal(resolveMenuAppUrl('https://menu.gusto.cl///'), 'https://menu.gusto.cl');
  assert.equal(resolveMenuAppUrl('/menu/'), '/menu');
  assert.equal(resolveMenuAppUrl('app.mirestaurante.cl'), 'https://app.mirestaurante.cl');
});

test('formatTableSlug normalizes accents and spaces into clean slugs', () => {
  assert.equal(formatTableSlug('Mesa 1'), 'mesa-1');
  assert.equal(formatTableSlug('Salón Terraza 12'), 'salon-terraza-12');
});

test('buildTableMenuUrl constructs direct deep links for QR table stands', () => {
  assert.equal(buildTableMenuUrl('https://app.gusto.cl/', 'Mesa 1'), 'https://app.gusto.cl/mesa-1');
  assert.equal(buildTableMenuUrl('/menu/', 'Mesa 4'), '/menu/mesa-4');
  assert.equal(buildTableMenuUrl('https://app.gusto.cl'), 'https://app.gusto.cl');
});
