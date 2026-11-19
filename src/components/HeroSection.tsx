import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_METRICS } from '../data/landingData';
import { MenuShowcaseMockup, MockupStage } from './MenuShowcaseMockup';

interface HeroSectionProps {
  mockupStage: MockupStage;
  onSelectMockupStage: (stage: MockupStage) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mockupStage,
  onSelectMockupStage,
}) => {
  return (
    <section
      id="inicio"
      className="relative bg-[#fcfdfb] border-b border-[#dce7ce] overflow-x-clip"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Asymmetric 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-sm font-medium text-[#3a5a18] mb-5">
              Menú digital QR y cobro en mesa para restaurantes en Chile
            </p>

            <h1 className="font-serif font-semibold text-[#111111] tracking-[-0.025em] leading-[1.06] text-balance text-[clamp(2.35rem,4.1vw,3.65rem)] max-w-2xl">
              Tus comensales piden y pagan desde la mesa. Sin esperar la cuenta.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-[#465242] leading-relaxed max-w-xl">
              fatzzo. transforma cada código QR en una carta fotográfica y pasarela de pago con
              Fintoc, Apple Pay y Webpay. Aumenta la rotación en horas punta, eleva el ticket
              promedio y libera a tu equipo de sala de cargar terminales POS.
            </p>

            {/* Primary CTA + Secondary Text Action */}
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <a
                href="#contacto"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#111111] hover:bg-[#262626] text-white text-sm sm:text-base font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
              >
                <span>Solicitar demostración</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onSelectMockupStage('pago')}
                className="inline-flex items-center gap-1.5 py-2 text-sm sm:text-base font-semibold text-[#111111] hover:text-[#3a5a18] underline underline-offset-4 decoration-[#c5e19b] hover:decoration-[#3a5a18] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded"
              >
                <span>Simular cobro con Fintoc</span>
              </button>
            </div>

            {/* Clean Unboxed Trust Metadata Line */}
            <div className="mt-10 pt-7 border-t border-[#dce7ce] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-[#465242]">
              <span>Sin descargas de app</span>
              <span aria-hidden="true">·</span>
              <span>Bancos de Chile vía Fintoc</span>
              <span aria-hidden="true">·</span>
              <span>Apple Pay y Webpay</span>
              <span aria-hidden="true">·</span>
              <span>Activación en 48 horas</span>
            </div>
          </div>

          {/* Right Column: Dominant Visual Focal Carrier (Interactive fatzzo. Menu Mockup) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <MenuShowcaseMockup
              activeStage={mockupStage}
              onSelectStage={onSelectMockupStage}
            />
          </div>
        </div>

        {/* Full-Width 4-Column Quantified KPI Strip */}
        <div
          aria-label="Indicadores operativos en restaurantes con fatzzo."
          className="mt-16 lg:mt-20 pt-10 border-t border-[#dce7ce] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#dce7ce]"
        >
          {HERO_METRICS.map((metric, idx) => (
            <div
              key={metric.label}
              className={idx === 0 ? 'lg:pr-8' : idx === 3 ? 'lg:pl-8' : 'lg:px-8'}
            >
              <p className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tabular-nums tracking-tight">
                {metric.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#111111]">{metric.label}</p>
              <p className="mt-1 text-xs sm:text-sm text-[#465242] leading-relaxed">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
