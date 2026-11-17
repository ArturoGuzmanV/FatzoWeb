import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Users } from 'lucide-react';
import { CartItem } from '../types/restaurant';
import { audioHaptic, formatCLP } from '../utils/audioHaptic';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  splitGuestsCount: number;
  onUpdateSplitGuests: (count: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  splitGuestsCount,
  onUpdateSplitGuests,
}) => {
  if (!isOpen) return null;

  const [isSplitting, setIsSplitting] = useState(false);

  const subtotal = items.reduce((acc, item) => {
    return acc + item.item.price * item.quantity;
  }, 0);

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-lg max-h-[88vh] flex flex-col rounded-t-[36px] bg-white text-[#111111] shadow-2xl border-t border-[#c5e19b] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle pill */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#c5e19b]" />
        </div>

        {/* Header */}
        <div className="px-6 py-3 flex items-center justify-between border-b border-[#c5e19b]/40">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#111111]">
              Tu pedido
            </h2>
            <p className="text-xs text-[#2c3825] font-semibold">
              {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'} en la mesa
            </p>
          </div>

          <button
            onClick={() => {
              audioHaptic.playTap();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#eef7e3] hover:bg-[#c5e19b] border border-[#c5e19b] text-[#111111] flex items-center justify-center transition-transform active:scale-90"
            aria-label="Cerrar pedido"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="py-12 text-center text-[#455041]">
              <p className="font-serif text-lg font-bold">Aún no has agregado platos</p>
              <p className="text-xs mt-1">Explora el menú y selecciona lo que gustes para tu mesa.</p>
            </div>
          ) : (
            items.map((cartItem) => {
              const itemTotal = cartItem.item.price * cartItem.quantity;
              return (
                <div
                  key={cartItem.id}
                  className="p-4 rounded-3xl bg-gradient-to-br from-[#f4faee]/95 to-[#eaf5de]/90 border border-[#c5e19b] shadow-[0_2px_10px_-2px_rgba(197,225,155,0.3)] flex items-center justify-between gap-3"
                >
                  <div className="flex-1 pr-2">
                    <h3 className="font-bold text-sm sm:text-base text-[#111111] leading-snug">
                      {cartItem.item.name}
                    </h3>
                    {cartItem.selectedOption && (
                      <p className="text-xs text-[#394533] font-medium">
                        {cartItem.selectedOption}
                      </p>
                    )}
                    {cartItem.notes && (
                      <p className="text-xs italic text-[#505f4a]">
                        "{cartItem.notes}"
                      </p>
                    )}
                    <span className="font-sans font-extrabold text-sm text-[#111111] tabular-nums mt-1 inline-block">
                      {formatCLP(itemTotal)}
                    </span>
                  </div>

                  {/* Stepper control with white rounded buttons and green border */}
                  <div className="flex items-center gap-2 p-1 rounded-full bg-white border border-[#c5e19b] shadow-2xs">
                    <button
                      onClick={() => {
                        audioHaptic.playTap();
                        if (cartItem.quantity === 1) {
                          onRemoveItem(cartItem.id);
                        } else {
                          onUpdateQuantity(cartItem.id, -1);
                        }
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#eef7e3] active:scale-90 transition-transform"
                      aria-label="Disminuir"
                    >
                      {cartItem.quantity === 1 ? (
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      ) : (
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      )}
                    </button>

                    <span className="font-sans font-bold text-sm w-5 text-center tabular-nums text-[#111111]">
                      {cartItem.quantity}
                    </span>

                    <button
                      onClick={() => {
                        audioHaptic.playTap();
                        onUpdateQuantity(cartItem.id, 1);
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#eef7e3] active:scale-90 transition-transform"
                      aria-label="Aumentar"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })
          )}

          {/* Sunday / Me&You Split bill feature */}
          {items.length > 0 && (
            <div className="pt-2">
              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setIsSplitting(!isSplitting);
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#eef7e3] border border-[#c5e19b] text-xs font-bold text-[#111111] transition-colors hover:bg-[#e2f3cc]"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#111111]" />
                  <span>¿Dividir la cuenta entre amigos?</span>
                </div>
                <span className="text-xs underline">{isSplitting ? 'Cerrar' : 'Configurar'}</span>
              </button>

              {isSplitting && (
                <div className="mt-2.5 p-3.5 rounded-2xl bg-[#f7fbf2] border border-[#c5e19b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#111111]">
                      Cantidad de personas:
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          audioHaptic.playTap();
                          onUpdateSplitGuests(Math.max(1, splitGuestsCount - 1));
                        }}
                        disabled={splitGuestsCount <= 1}
                        className="w-7 h-7 rounded-full bg-white border border-[#c5e19b] flex items-center justify-center shadow-xs disabled:opacity-40"
                      >
                        <Minus className="w-3 h-3 text-[#111111]" />
                      </button>
                      <span className="font-bold text-xs w-4 text-center text-[#111111]">
                        {splitGuestsCount}
                      </span>
                      <button
                        onClick={() => {
                          audioHaptic.playTap();
                          onUpdateSplitGuests(Math.min(10, splitGuestsCount + 1));
                        }}
                        className="w-7 h-7 rounded-full bg-white border border-[#c5e19b] flex items-center justify-center shadow-xs"
                      >
                        <Plus className="w-3 h-3 text-[#111111]" />
                      </button>
                    </div>
                  </div>

                  {splitGuestsCount > 1 && (
                    <div className="pt-2 border-t border-[#c5e19b]/40 flex items-center justify-between text-xs">
                      <span className="text-[#3b4735]">
                        Monto por persona aprox:
                      </span>
                      <span className="font-bold text-[#111111] tabular-nums">
                        {formatCLP(subtotal / splitGuestsCount)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer sticky summary & CTA */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-[#c5e19b]/50 space-y-3 pb-safe">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#394633] font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'producto' : 'productos'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#394633] text-xs">Subtotal:</span>
                <span className="font-extrabold text-lg text-[#111111] tabular-nums">
                  {formatCLP(subtotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                audioHaptic.playTap();
                onProceedToCheckout();
              }}
              className="w-full py-4 rounded-full bg-[#111111] hover:bg-[#252525] text-white font-bold text-base shadow-xl active:scale-[0.98] transition-all flex items-center justify-center"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
