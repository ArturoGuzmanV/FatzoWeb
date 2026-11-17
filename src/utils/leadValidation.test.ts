import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLeadForm } from './leadValidation';

test('validateLeadForm rejects empty submissions with field-level errors', () => {
  const result = validateLeadForm({
    ownerName: '',
    restaurantName: '',
    email: '',
    phone: '',
    tableRange: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.ownerName);
  assert.ok(result.errors.restaurantName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.tableRange);
});

test('validateLeadForm flags malformed email and short phone numbers', () => {
  const result = validateLeadForm({
    ownerName: 'Camila Soto',
    restaurantName: 'Bistró Cordillera',
    email: 'camila@invalido',
    phone: '1234',
    tableRange: '15 a 35 mesas',
  });

  assert.equal(result.isValid, false);
  assert.equal(result.errors.ownerName, undefined);
  assert.equal(result.errors.restaurantName, undefined);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
});

test('validateLeadForm passes with valid Chilean restaurant owner data', () => {
  const result = validateLeadForm({
    ownerName: 'Camila Soto',
    restaurantName: 'Bistró Cordillera',
    email: 'camila@cordillera.cl',
    phone: '+56 9 8412 3301',
    tableRange: '36 a 70 mesas',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});
