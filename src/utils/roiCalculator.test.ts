import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateRestaurantRoi, formatCLP, ROI_BOUNDS } from './roiCalculator';

test('formatCLP formats Chilean pesos cleanly with dot separators', () => {
  assert.equal(formatCLP(0), '$0');
  assert.equal(formatCLP(12900), '$12.900');
  assert.equal(formatCLP(1450000), '$1.450.000');
  assert.equal(formatCLP(-5500), '-$5.500');
});

test('calculateRestaurantRoi computes deterministic projections for a mid-size restaurant', () => {
  const result = calculateRestaurantRoi({
    tables: 30,
    avgTicketCLP: 28000,
    dailyTurns: 2.5,
    operatingDaysPerMonth: 26,
  });

  // 30 * 2.5 * 26 = 1950 orders/month
  assert.equal(result.baselineMonthlyOrders, 1950);
  // 1950 * 28000 = 54,600,000 CLP baseline; 16.8% uplift = 9,172,800 -> rounded to nearest 1000 = 9,173,000
  assert.equal(result.monthlyExtraRevenueCLP, 9173000);
  assert.equal(result.annualExtraRevenueCLP, 9173000 * 12);
  // 1950 * 4.5 / 60 = 146.25 -> 146 hours
  assert.equal(result.monthlyWaiterHoursSaved, 146);
  // 54,600,000 * 0.025 = 1,365,000 CLP
  assert.equal(result.monthlyExtraTipsCLP, 1365000);
});

test('calculateRestaurantRoi clamps out-of-range values safely', () => {
  const low = calculateRestaurantRoi({
    tables: -10,
    avgTicketCLP: 100,
    dailyTurns: 0,
  });
  const expectedLow = calculateRestaurantRoi({
    tables: ROI_BOUNDS.minTables,
    avgTicketCLP: ROI_BOUNDS.minTicketCLP,
    dailyTurns: ROI_BOUNDS.minDailyTurns,
  });
  assert.deepEqual(low, expectedLow);

  const high = calculateRestaurantRoi({
    tables: 999,
    avgTicketCLP: 500000,
    dailyTurns: 20,
  });
  const expectedHigh = calculateRestaurantRoi({
    tables: ROI_BOUNDS.maxTables,
    avgTicketCLP: ROI_BOUNDS.maxTicketCLP,
    dailyTurns: ROI_BOUNDS.maxDailyTurns,
  });
  assert.deepEqual(high, expectedHigh);
});
