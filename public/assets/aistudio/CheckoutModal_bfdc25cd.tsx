import React, { useState } from 'react';
import { ArrowLeft, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem, PaymentMethod } from '../types/restaurant';
import { audioHaptic, formatCLP } from '../utils/audioHaptic';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
  items: CartItem[];
  tableNumber: string;
  onConfirmOrder: (paymentMethod: PaymentMethod, tipAmount: number, tipPercent: number, total: number) => void;
  onOpenFintocGateway: (total: number, tipAmount: number, tipPercent: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onBackToCart,
  items,
  tableNumber,
  onConfirmOrder,
  onOpenFintocGateway,
}) => {
  if (!isOpen) return null;

  const [selectedTipPercent, setSelectedTipPercent] = useState<number>(10);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('fintoc');

  const tipOptions = [0, 5, 10, 15, 20];

  const subtotal = items.reduce((acc, item) => acc + item.item.price * item.quantity, 0);
  const serviceFee = Math.round(subtotal * 0.03); // 3%
  const tipAmount = Math.round(subtotal * (selectedTipPercent / 100));
  const total = subtotal + serviceFee + tipAmount;

  const handleAction = () => {
    audioHaptic.playTap();
    if (paymentMethod === 'fintoc') {
      onOpenFintocGateway(total, tipAmount, selectedTipPercent);
    } else {
      onConfirmOrder('mesa', tipAmount, selectedTipPercent, total);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-lg max-h-[92vh] flex flex-col rounded-t-[36px] bg-white text-[#111111] shadow-2xl border-t border-[#c5e19b] animate-in slide-in-from-bottom duration-300 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1.5 rounded-full bg-[#c5e19b]" />
        </div>

        {/* Top bar with back and close */}
        <div className="px-6 py-2 flex items-center justify-between">
          <button
            onClick={() => {
              audioHaptic.playTap();
              onBackToCart();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#111111] hover:text-[#2d4a1b] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Volver al pedido</span>
          </button>

          <button
            onClick={() => {
              audioHaptic.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eef7e3] border border-[#c5e19b] hover:bg-[#c5e19b] text-[#111111] flex items-center justify-center transition-transform active:scale-90"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="px-6 py-4 space-y-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2e3d25] bg-[#eef7e3] px-2.5 py-0.5 rounded-full border border-[#c5e19b]">
              Mesa {tableNumber} · Cuenta final
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#111111] mt-1.5">
              Resumen de pago
            </h2>
          </div>

          {/* Breakdown Card in Green Diffused Background with Black Text */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#f4faee]/95 via-[#eaf5de]/85 to-[#f8fcf3]/95 border border-[#c5e19b] shadow-[0_3px_14px_-3px_rgba(197,225,155,0.4)] space-y-3.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#2b3527] font-semibold">Subtotal</span>
              <span className="font-bold tabular-nums text-[#111111]">{formatCLP(subtotal)}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-[#2b3527] font-semibold">Tarifa de servicio (3%)</span>
              <span className="font-bold tabular-nums text-[#111111]">{formatCLP(serviceFee)}</span>
            </div>

            {/* Tip section */}
            <div className="pt-2 border-t border-[#c5e19b]/50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-[#111111]">Propina</span>
                  <p className="text-[11px] text-[#47573e]">Para el equipo de servicio</p>
                </div>
                <span className="font-sans font-extrabold text-base text-[#111111] tabular-nums">
                  {formatCLP(tipAmount)}
                </span>
              </div>

              {/* Tip % buttons in playful green and black */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mt-3">
                {tipOptions.map((pct) => {
                  const isSelected = selectedTipPercent === pct;
                  return (
                    <button
                      key={pct}
                      onClick={() => {
                        audioHaptic.playTap();
                        setSelectedTipPercent(pct);
                      }}
                      className={`py-2 rounded-2xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#c5e19b] text-[#111111] border-2 border-[#111111] shadow-xs scale-105'
                          : 'bg-white text-[#111111] border border-[#c5e19b] hover:bg-[#eef7e3]'
                      }`}
                    >
                      {pct}%
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total */}
            <div className="pt-3 border-t border-[#c5e19b]/60 flex items-baseline justify-between">
              <span className="font-serif text-lg font-bold text-[#111111]">Total</span>
              <span className="font-sans text-2xl font-extrabold text-[#111111] tabular-nums">
                {formatCLP(total)}
              </span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2">
              Método de pago
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setPaymentMethod('mesa');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                  paymentMethod === 'mesa'
                    ? 'border-[#111111] bg-[#eef7e3] shadow-xs'
                    : 'border-[#c5e19b] bg-white hover:bg-[#f8fbf4]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#111111]">Pagar en mesa</span>
                  {paymentMethod === 'mesa' && <CheckCircle2 className="w-4 h-4 text-[#111111]" />}
                </div>
                <p className="text-[11px] text-[#42503a]">Efectivo o POS con mozo</p>
              </button>

              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setPaymentMethod('fintoc');
                }}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all relative overflow-hidden ${
                  paymentMethod === 'fintoc'
                    ? 'border-[#111111] bg-[#eef7e3] shadow-xs'
                    : 'border-[#c5e19b] bg-white hover:bg-[#f8fbf4]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-[#111111]">Fintoc</span>
                  {paymentMethod === 'fintoc' && <CheckCircle2 className="w-4 h-4 text-[#111111]" />}
                </div>
                <p className="text-[11px] text-[#42503a]">Apple Pay, Bancos y Tarjetas</p>
              </button>
            </div>
          </div>

          {/* Security badge */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#3d4937] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5e8b23]" />
            <span>Encriptación bancaria SSL 256-bit certificada en Chile</span>
          </div>
        </div>

        {/* Sticky action bottom bar */}
        <div className="p-6 bg-white border-t border-[#c5e19b]/50 space-y-2 pb-safe">
          <button
            onClick={handleAction}
            className="w-full py-4 rounded-full bg-[#111111] hover:bg-[#252525] text-white font-bold text-base shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            {paymentMethod === 'mesa' ? (
              <span>Confirmar pago en mesa</span>
            ) : (
              <span>Pagar con Fintoc · {formatCLP(total)}</span>
            )}
          </button>

          <p className="text-[11px] text-center text-[#4a5843] px-4 font-medium">
            Tu pedido se envía a cocina y queda registrado al instante para la Mesa {tableNumber}.
          </p>
        </div>
      </div>
    </div>
  );
};
