import React from 'react';
import { QrCode } from 'lucide-react';
import { formatCLP } from '../utils/roiCalculator';
import { SafeImage } from './SafeImage';

export const CapabilitiesBento: React.FC = () => {
  return (
    <section id="experiencia-qr" className="bg-[#f4f9ee] border-b border-[#dce7ce]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-20 lg:py-28">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium text-[#3a5a18] mb-3">
            Operación de salón y cocina
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight leading-[1.12] text-balance">
            Cada etapa de la mesa resuelta con precisión editorial
          </h2>
          <p className="mt-4 text-base text-[#465242] leading-relaxed">
            Sin PDFs ilegibles ni aplicaciones que obligan a registrarse. El comensal escanea el
            QR de su mesa y accede al instante a tu carta viva con cobro integrado.
          </p>
        </div>

        {/* Asymmetric 12-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 01: Wide Card (col-span-7) — QR Table Recognition & Smart Filters */}
          <article className="lg:col-span-7 rounded-3xl bg-white border border-[#dce7ce] p-7 sm:p-9 flex flex-col justify-between gap-8">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111111]">
                01. Código QR inteligente por mesa y zona
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#465242] leading-relaxed max-w-xl">
                Cada código identifica automáticamente la ubicación del cliente —Salón Principal,
                Terraza o Barra— para que el pedido llegue a cocina con número de mesa exacto y
                permita solicitar asistencia al garzón con un toque.
              </p>
            </div>

            {/* Clean Visual Composition: QR Table Stand + Attached Food Photography */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
              {/* Minimalist Table Tent Preview */}
              <div className="sm:col-span-5 rounded-2xl bg-[#f4f9ee] p-5 flex flex-col items-center justify-between text-center">
                <span className="font-serif text-base font-bold text-[#111111]">Gustō</span>

                <div className="my-4 p-3 rounded-xl bg-white" aria-hidden="true">
                  <QrCode className="w-20 h-20 text-[#111111] stroke-[1.5]" />
                </div>

                <div>
                  <p className="text-xs font-bold text-[#111111]">Mesa 1 · Salón Principal</p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#3a5a18]">
                    app.gusto.cl/mesa-1
                  </p>
                </div>
              </div>

              {/* Real Culinary Imagery Strip */}
              <div className="sm:col-span-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#eaf4de]">
                  <SafeImage
                    src="/assets/aistudio/tabla_picar_c5b29085.jpg"
                    alt="Tabla de quesos artesanales, aceitunas y embutidos para compartir"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-[#eaf4de]">
                  <SafeImage
                    src="/assets/aistudio/trago_pisco_sour_a01a6a3f.jpg"
                    alt="Cócteles frescos con limón y menta preparados en barra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="col-span-2 pt-2 border-t border-[#dce7ce] flex flex-wrap items-center justify-between gap-2 text-xs text-[#465242]">
                  <span>Filtros dietarios integrados</span>
                  <span className="font-medium text-[#111111]">
                    Vegetariano · Sin gluten · Vegano · Mariscos
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* 02: Narrow Card (col-span-5) — Living Visual Menu */}
          <article className="lg:col-span-5 rounded-3xl bg-white border border-[#dce7ce] p-7 sm:p-9 flex flex-col justify-between gap-7">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111111]">
                02. Carta viva que vende más por los ojos
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#465242] leading-relaxed">
                Actualiza precios en CLP, pausa platos sin stock y destaca recomendaciones de la
                casa al instante, sin costos de reimpresión.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#eaf4de]">
                  <SafeImage
                    src="/assets/aistudio/sandwich_mechada_6f1a77f7.jpg"
                    alt="Hamburguesa artesanal doble en pan brioche"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square bg-[#eaf4de]">
                  <SafeImage
                    src="/assets/aistudio/postre_volcan_4942e420.jpg"
                    alt="Postre tibio de chocolate oscuro con ganache fundida"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#dce7ce] flex items-center justify-between text-xs">
                <span className="text-[#465242]">Modificadores y notas a cocina</span>
                <span className="font-semibold text-[#111111]">Edición en segundos</span>
              </div>
            </div>
          </article>

          {/* 03: Narrow Card (col-span-5) — Frictionless Bill Splitting */}
          <article className="lg:col-span-5 rounded-3xl bg-white border border-[#dce7ce] p-7 sm:p-9 flex flex-col justify-between gap-7">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111111]">
                03. División de cuenta sin filas en caja
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#465242] leading-relaxed">
                Las mesas de grupos dividen el total directamente en su pantalla —hasta 10
                comensales— con propina transparente, eliminando el principal cuello de botella del
                turno nocturno.
              </p>
            </div>

            {/* Clean Tabular Breakdown (No nested bordered cards) */}
            <div className="pt-4 border-t border-[#dce7ce] space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#465242]">Consumo total Mesa 6</span>
                <span className="font-semibold text-[#111111] tabular-nums">
                  {formatCLP(68400)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#465242]">Propina sugerida (10%)</span>
                <span className="font-semibold text-[#111111] tabular-nums">
                  {formatCLP(6840)}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t border-[#dce7ce]">
                <span className="font-semibold text-[#111111]">División entre 4 personas</span>
                <span className="font-serif text-xl font-bold text-[#3a5a18] tabular-nums">
                  {formatCLP(18810)} c/u
                </span>
              </div>
            </div>
          </article>

          {/* 04: Wide Card (col-span-7) — Direct Kitchen Flow & Push Alerts */}
          <article className="lg:col-span-7 rounded-3xl bg-white border border-[#dce7ce] p-7 sm:p-9 flex flex-col justify-between gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7">
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111111]">
                  04. Comanda directa a cocina y trazabilidad en vivo
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#465242] leading-relaxed">
                  Apenas se confirma el pago, la orden ingresa registrada con número de mesa,
                  notas dietarias y comprobante digital. El cliente ve el avance desde su teléfono
                  sin interrumpir al equipo de servicio.
                </p>
              </div>
              <div className="sm:col-span-5 rounded-2xl overflow-hidden aspect-[4/3] bg-[#eaf4de]">
                <SafeImage
                  src="/assets/aistudio/plato_risotto_d897312d.jpg"
                  alt="Plato recién emplatado de risotto de hongos con queso parmesano"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Clean 3-step Editorial Timeline */}
            <div className="pt-5 border-t border-[#dce7ce] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div>
                <p className="font-mono text-xs font-semibold text-[#3a5a18]">Paso 01</p>
                <p className="mt-1 font-semibold text-[#111111]">Pago aprobado</p>
                <p className="mt-0.5 text-[#465242]">Comprobante emitido y mesa conciliada</p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-[#3a5a18]">Paso 02</p>
                <p className="mt-1 font-semibold text-[#111111]">Fuego y emplatado</p>
                <p className="mt-0.5 text-[#465242]">Cocina recibe detalles y alergias sin errores</p>
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-[#3a5a18]">Paso 03</p>
                <p className="mt-1 font-semibold text-[#111111]">Servicio en mesa</p>
                <p className="mt-0.5 text-[#465242]">
                  Garzón entrega directo y el comensal puede sumar rondas
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
