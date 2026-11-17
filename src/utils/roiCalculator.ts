export interface RoiInputs {
  tables: number;
  avgTicketCLP: number;
  dailyTurns: number;
  operatingDaysPerMonth?: number;
}

export interface RoiProjection {
  monthlyExtraRevenueCLP: number;
  monthlyExtraTipsCLP: number;
  monthlyWaiterHoursSaved: number;
  annualExtraRevenueCLP: number;
  baselineMonthlyOrders: number;
  checkoutMinutesSavedPerTable: number;
}

export const ROI_BOUNDS = {
  minTables: 5,
  maxTables: 150,
  minTicketCLP: 8000,
  maxTicketCLP: 80000,
  minDailyTurns: 1,
  maxDailyTurns: 6,
} as const;

export function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

/**
 * Formats an amount in Chilean Pesos (CLP), e.g., 14500 -> "$14.500".
 */
export function formatCLP(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  const formatted = Math.abs(safe)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return safe < 0 ? `-$${formatted}` : `$${formatted}`;
}

/**
 * Computes conservative monthly restaurant impact from QR ordering and Fintoc/Apple Pay checkout.
 * Assumptions grounded in dining-room operations:
 * - 12% conservative uplift in average ticket (visual menu + effortless add-ons/desserts)
 * - 8% conservative table-turnover lift during peak shifts from eliminating POS waits
 * - 4.5 minutes of direct waiter floor time saved per seated party
 * - +2.5 percentage points average tip improvement via one-tap suggested tip screen
 */
export function calculateRestaurantRoi(inputs: RoiInputs): RoiProjection {
  const tables = Math.round(clamp(inputs.tables, ROI_BOUNDS.minTables, ROI_BOUNDS.maxTables));
  const avgTicketCLP = Math.round(
    clamp(inputs.avgTicketCLP, ROI_BOUNDS.minTicketCLP, ROI_BOUNDS.maxTicketCLP)
  );
  const dailyTurns = clamp(inputs.dailyTurns, ROI_BOUNDS.minDailyTurns, ROI_BOUNDS.maxDailyTurns);
  const operatingDays = clamp(inputs.operatingDaysPerMonth ?? 26, 1, 31);

  const baselineMonthlyOrders = Math.round(tables * dailyTurns * operatingDays);
  const baselineMonthlyRevenue = baselineMonthlyOrders * avgTicketCLP;

  // Ticket uplift (12%) + peak turnover uplift (8% applied to 60% peak shifts ≈ 4.8%)
  const ticketUpliftRevenue = baselineMonthlyRevenue * 0.12;
  const turnoverUpliftRevenue = baselineMonthlyRevenue * 0.048;
  const monthlyExtraRevenueCLP = Math.round((ticketUpliftRevenue + turnoverUpliftRevenue) / 1000) * 1000;

  // Waiter minutes saved per table visit (taking card machine, splitting bill, printing receipts)
  const waiterMinutesSavedPerOrder = 4.5;
  const monthlyWaiterHoursSaved = Math.round((baselineMonthlyOrders * waiterMinutesSavedPerOrder) / 60);

  // Additional tips for staff from one-tap tip selector (+2.5% of baseline sales)
  const monthlyExtraTipsCLP = Math.round((baselineMonthlyRevenue * 0.025) / 1000) * 1000;

  return {
    monthlyExtraRevenueCLP,
    monthlyExtraTipsCLP,
    monthlyWaiterHoursSaved,
    annualExtraRevenueCLP: monthlyExtraRevenueCLP * 12,
    baselineMonthlyOrders,
    checkoutMinutesSavedPerTable: 14,
  };
}
