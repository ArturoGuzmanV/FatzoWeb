import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getMenuAppUrl } from '../utils/menuConnection';

export const Footer: React.FC = () => {
  const menuAppUrl = getMenuAppUrl();

  return (
    <footer className="bg-[#f4f9ee] border-t border-[#dce7ce]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 pb-8 border-b border-[#dce7ce]">
          <div className="max-w-sm">
            <a
              href="#inicio"
              className="font-serif text-2xl font-bold tracking-tight text-[#111111]"
            >
              Gustō
            </a>
            <p className="mt-2 text-sm text-[#465242] leading-relaxed">
              Menú digital QR y cobro instantáneo en mesa con Fintoc, Apple Pay y Webpay para
              restaurantes en Chile.
            </p>
          </div>

          <nav
            aria-label="Enlaces del pie de página"
            className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium text-[#465242]"
          >
            <a href="#experiencia-qr" className="hover:text-[#111111] transition-colors">
              Experiencia QR
            </a>
            <a href="#pagos-rapidos" className="hover:text-[#111111] transition-colors">
              Pagos rápidos
            </a>
            <a href="#resultados" className="hover:text-[#111111] transition-colors">
              Resultados
            </a>
            <a href="#contacto" className="hover:text-[#111111] transition-colors">
              Contacto
            </a>
            <a
              href={menuAppUrl}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#111111] hover:text-[#3a5a18] transition-colors"
            >
              <span>Iniciar Sesión</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#465242]">
          <p>© 2026 Gustō SpA · Santiago, Chile</p>
          <p>Pagos procesados bajo estándar SSL 256-bit · Fintoc · Apple Pay · Webpay</p>
        </div>
      </div>
    </footer>
  );
};
