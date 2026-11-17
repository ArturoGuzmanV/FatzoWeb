import React, { useMemo, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { PAYMENT_CHANNELS } from '../data/landingData';
import { calculateRestaurantRoi, formatCLP, ROI_BOUNDS } from '../utils/roiCalculator';

const RESTAURANT_PRESETS = [
  { label: 'Bistró · 18 mesas', tables: 18, avgTicketCLP: 22000, dailyTurns: 2.0 },
  { label: 'Restaurante · 35 mesas', tables: 35, avgTicketCLP: 28000, dailyTurns: 2.5 },
  { label: 'Bar & Terraza · 70 mesas', tables: 70, avgTicketCLP: 32000, dailyTurns: 3.0 },
] as const;

export const PaymentsRoiSection: React.FC = () => {
  const [tables, setTables] = useState<number>(35);
  const [avgTicketCLP, setAvgTicketCLP] = useState<number>(28000);
  const [dailyTurns, setDailyTurns] = useState<number>(2.5);

  const projection = useMemo(
    () => calculateRestaurantRoi({ tables, avgTicketCLP, dailyTurns }),
    [tables, avgTicketCLP, dailyTurns]
  );

  return (
    <section id="pagos-rapidos" className="bg-[#fcfdfb] border-b border-[#dce7ce]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-[#3a5a18] mb-3">
            Infraestructura de cobro para Chile
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight leading-[1.12] text-balance">
            Pagos rápidos en 12 segundos y números claros para tu negocio
          </h2>
          <p className="mt-4 text-base text-[#465242] leading-relaxed">
            Integramos Fintoc, Apple Pay y Webpay en un único flujo móvil para que el cobro deje de
            frenar el cierre de mesas. Calcula el impacto mensual según la operación de tu local.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Payment Channels Breakdown */}
          <div className="lg:col-span-5 divide-y divide-[#dce7ce] border-t border-b border-[#dce7ce]">
            {PAYMENT_CHANNELS.map((channel) => (
              <div key={channel.id} className="py-6">
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-lg font-semibold text-[#111111]">
                    {channel.name}
                  </h3>
                  <p className="text-xs font-medium text-[#3a5a18]">{channel.settlementMeta}</p>
                </div>
                <p className="mt-2.5 text-sm text-[#465242] leading-relaxed">
                  {channel.description}
                </p>
              </div>
            ))}

            <div className="py-5 flex items-center gap-2.5 text-xs text-[#465242]">
              <ShieldCheck className="w-4 h-4 text-[#3a5a18] shrink-0" aria-hidden="true" />
              <span>
                Encriptación bancaria SSL 256-bit y conciliación automática compatible con bancos
                chilenos regulados por la CMF.
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Restaurant ROI Calculator */}
          <div
            data-testid="roi-calculator"
            className="lg:col-span-7 rounded-3xl bg-[#f4f9ee] border border-[#dce7ce] p-7 sm:p-9"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 pb-6 border-b border-[#dce7ce]">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#111111]">
                  Simulador de impacto mensual
                </h3>
                <p className="mt-1 text-sm text-[#465242]">
                  Ajusta los datos de tu restaurante para estimar venta adicional y tiempo liberado.
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div
              className="mt-6 flex flex-wrap gap-2"
              role="group"
              aria-label="Perfiles rápidos de restaurante"
            >
              {RESTAURANT_PRESETS.map((preset) => {
                const isSelected =
                  tables === preset.tables &&
                  avgTicketCLP === preset.avgTicketCLP &&
                  dailyTurns === preset.dailyTurns;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setTables(preset.tables);
                      setAvgTicketCLP(preset.avgTicketCLP);
                      setDailyTurns(preset.dailyTurns);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                      isSelected
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-[#111111] border border-[#dce7ce] hover:bg-[#eaf4de]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Range Controls */}
            <div className="mt-7 space-y-6">
              {/* Tables */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="roi-tables" className="text-sm font-semibold text-[#111111]">
                    Cantidad de mesas activas
                  </label>
                  <span
                    data-testid="roi-tables-value"
                    className="font-mono text-sm font-semibold text-[#111111] tabular-nums"
                  >
                    {tables} mesas
                  </span>
                </div>
                <input
                  id="roi-tables"
                  type="range"
                  min={ROI_BOUNDS.minTables}
                  max={ROI_BOUNDS.maxTables}
                  step={1}
                  value={tables}
                  onChange={(e) => setTables(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#dcedc2] accent-[#111111]"
                />
              </div>

              {/* Average Ticket */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="roi-ticket" className="text-sm font-semibold text-[#111111]">
                    Ticket promedio por mesa (CLP)
                  </label>
                  <span
                    data-testid="roi-ticket-value"
                    className="font-mono text-sm font-semibold text-[#111111] tabular-nums"
                  >
                    {formatCLP(avgTicketCLP)}
                  </span>
                </div>
                <input
                  id="roi-ticket"
                  type="range"
                  min={ROI_BOUNDS.minTicketCLP}
                  max={ROI_BOUNDS.maxTicketCLP}
                  step={1000}
                  value={avgTicketCLP}
                  onChange={(e) => setAvgTicketCLP(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#dcedc2] accent-[#111111]"
                />
              </div>

              {/* Daily Turns */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="roi-turns" className="text-sm font-semibold text-[#111111]">
                    Rotaciones diarias promedio por mesa
                  </label>
                  <span
                    data-testid="roi-turns-value"
                    className="font-mono text-sm font-semibold text-[#111111] tabular-nums"
                  >
                    {dailyTurns.toFixed(1)} turnos/día
                  </span>
                </div>
                <input
                  id="roi-turns"
                  type="range"
                  min={ROI_BOUNDS.minDailyTurns}
                  max={ROI_BOUNDS.maxDailyTurns}
                  step={0.5}
                  value={dailyTurns}
                  onChange={(e) => setDailyTurns(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#dcedc2] accent-[#111111]"
                />
              </div>
            </div>

            {/* Computed Results */}
            <div className="mt-8 pt-7 border-t border-[#c5e19b] grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-medium text-[#465242]">
                  Ingreso mensual adicional estimado
                </p>
                <p
                  data-testid="roi-monthly-revenue"
                  className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums"
                >
                  {formatCLP(projection.monthlyExtraRevenueCLP)}
                </p>
                <p className="mt-1 text-xs text-[#3a5a18] tabular-nums">
                  {formatCLP(projection.annualExtraRevenueCLP)} proyectados al año
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#465242]">
                  Tiempo de sala recuperado
                </p>
                <p
                  data-testid="roi-hours-saved"
                  className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums"
                >
                  {projection.monthlyWaiterHoursSaved} hrs
                </p>
                <p className="mt-1 text-xs text-[#465242] tabular-nums">
                  Cada mes en {projection.baselineMonthlyOrders.toLocaleString('es-CL')} cuentas
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-[#465242]">
                  Propinas adicionales para el equipo
                </p>
                <p
                  data-testid="roi-extra-tips"
                  className="mt-1.5 font-serif text-2xl sm:text-3xl font-bold text-[#111111] tabular-nums"
                >
                  {formatCLP(projection.monthlyExtraTipsCLP)}
                </p>
                <p className="mt-1 text-xs text-[#465242]">
                  Al mes por selección rápida de propina
                </p>
              </div>
            </div>

            <p className="mt-6 text-[11px] text-[#465242] leading-relaxed">
              Estimación conservadora basada en 26 días operativos/mes, +12% en consumo adicional
              por carta visual, +4,8% en rotación de horas punta y 4,5 minutos ahorrados de gestión
              de cobro por mesa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
