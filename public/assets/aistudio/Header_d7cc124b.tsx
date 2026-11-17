import React from 'react';
import { ShoppingBag, Bell, Smartphone, Monitor } from 'lucide-react';
import { audioHaptic } from '../utils/audioHaptic';

interface HeaderProps {
  restaurantName: string;
  cartCount: number;
  onOpenCart: () => void;
  onOpenWaiterCall: () => void;
  isMobileDeviceView: boolean;
  onToggleDeviceView: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  restaurantName,
  cartCount,
  onOpenCart,
  onOpenWaiterCall,
  isMobileDeviceView,
  onToggleDeviceView,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-xl bg-white/95 border-b border-[#c5e19b]/50 shadow-[0_2px_10px_rgba(197,225,155,0.15)] transition-colors">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Left: Clean Brand Wordmark */}
        <div className="flex items-center text-left">
          <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#111111] leading-tight">
            {restaurantName}
          </h1>
        </div>

        {/* Right: Actions (Waiter, Device simulator, Cart) */}
        <div className="flex items-center gap-2">
          {/* Call Waiter button */}
          <button
            onClick={() => {
              audioHaptic.playTap();
              onOpenWaiterCall();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-[#111111] bg-[#eef7e3] hover:bg-[#c5e19b] border border-[#c5e19b] transition-all active:scale-95 shadow-2xs"
            title="Llamar al mozo o pedir asistencia"
          >
            <Bell className="w-3.5 h-3.5 text-[#111111]" />
            <span className="hidden sm:inline">Mozo</span>
          </button>

          {/* Device Preview Toggle */}
          <button
            onClick={() => {
              audioHaptic.playTap();
              onToggleDeviceView();
            }}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-full text-[#111111] bg-[#eef7e3] hover:bg-[#c5e19b] border border-[#c5e19b]/60 transition-colors"
            title={isMobileDeviceView ? 'Ver en ancho completo' : 'Simular móvil iPhone'}
          >
            {isMobileDeviceView ? (
              <Monitor className="w-4 h-4 text-[#111111]" />
            ) : (
              <Smartphone className="w-4 h-4 text-[#111111]" />
            )}
          </button>

          {/* Shopping Bag / Cart Button */}
          <button
            onClick={() => {
              audioHaptic.playTap();
              onOpenCart();
            }}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#c5e19b] hover:bg-[#b5db7f] text-[#111111] border border-[#aed771] shadow-sm transition-all active:scale-95"
            aria-label="Ver pedido actual"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-[#111111] text-white text-[11px] font-bold shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
