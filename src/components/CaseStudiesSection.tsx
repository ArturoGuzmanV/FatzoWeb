import React from 'react';
import { CASE_STUDIES } from '../data/landingData';
import { SafeImage } from './SafeImage';

export const CaseStudiesSection: React.FC = () => {
  return (
    <section id="resultados" className="bg-[#f4f9ee] border-b border-[#dce7ce]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-[#3a5a18] mb-3">
            Resultados medidos en operación
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight leading-[1.12] text-balance">
            Restaurantes que eliminaron la espera de la cuenta
          </h2>
          <p className="mt-4 text-base text-[#465242] leading-relaxed">
            Desde bistrós de barrio hasta terrazas de alto flujo, dueños y gerentes de operación
            usan Gustō para cobrar más rápido sin perder cercanía en el servicio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              className="rounded-3xl bg-white border border-[#dce7ce] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#eaf4de]">
                  <SafeImage
                    src={study.imageUrl}
                    alt={study.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-7">
                  <p className="text-xs text-[#465242]">{study.locationMeta}</p>
                  <h3 className="mt-1.5 font-serif text-xl font-semibold text-[#111111]">
                    {study.restaurant}
                  </h3>

                  {/* Quantified Outcome Block */}
                  <div className="mt-5 py-4 border-y border-[#dce7ce]">
                    <p className="font-serif text-lg font-bold text-[#3a5a18] tabular-nums">
                      {study.metricHeadline}
                    </p>
                    <p className="mt-0.5 text-xs text-[#465242]">{study.metricContext}</p>
                  </div>

                  <blockquote className="mt-5 text-sm text-[#2e382a] leading-relaxed">
                    “{study.quote}”
                  </blockquote>
                </div>
              </div>

              <div className="px-7 pb-7 pt-2">
                <p className="text-sm font-semibold text-[#111111]">{study.authorName}</p>
                <p className="text-xs text-[#465242]">
                  {study.authorRole} · {study.restaurant}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
