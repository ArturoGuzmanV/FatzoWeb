import React, { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { getMenuAppUrl } from '../utils/menuConnection';

const NAV_LINKS = [
  { href: '#experiencia-qr', label: 'Experiencia QR' },
  { href: '#pagos-rapidos', label: 'Pagos rápidos' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#contacto', label: 'Contacto' },
] as const;

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuAppUrl = getMenuAppUrl();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fcfdfb]/92 backdrop-blur-md border-b border-[#dce7ce]">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#inicio"
          className="font-serif text-2xl font-bold tracking-tight text-[#111111] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 rounded"
        >
          Gustō
        </a>

        {/* Zone 2: 4 clean single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#465242]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap shrink-0 hover:text-[#111111] underline-offset-4 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] rounded px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (direct redirect to the untouched digital menu app) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={menuAppUrl}
            rel="noopener noreferrer"
            data-testid="navbar-login-link"
            title="Ir directamente a la aplicación del menú digital Gustō"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[40px] rounded-full bg-[#111111] hover:bg-[#262626] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
          >
            <span>Iniciar Sesión</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#dce7ce] bg-[#f4f9ee] text-[#111111] hover:bg-[#eaf4de] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation-drawer"
          aria-label="Navegación móvil"
          className="md:hidden border-t border-[#dce7ce] bg-[#fcfdfb] px-5 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 rounded-xl text-base font-medium text-[#111111] hover:bg-[#f4f9ee] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
