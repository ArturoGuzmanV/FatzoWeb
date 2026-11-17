import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_LOGIN_APP_URL,
  resolveLoginAppUrl,
} from './loginConnection';

test('resolveLoginAppUrl defaults to the local restaurant app login', () => {
  assert.equal(resolveLoginAppUrl(undefined), DEFAULT_LOGIN_APP_URL);
  assert.equal(resolveLoginAppUrl('   '), DEFAULT_LOGIN_APP_URL);
});

test('resolveLoginAppUrl normalizes absolute URLs and subpaths', () => {
  assert.equal(resolveLoginAppUrl('https://login.gusto.cl///'), 'https://login.gusto.cl');
  assert.equal(resolveLoginAppUrl('/login/'), '/login');
  assert.equal(resolveLoginAppUrl('login.gusto.cl'), 'https://login.gusto.cl');
});
