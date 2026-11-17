import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  ChefHat,
  CreditCard,
  Landmark,
  Lock,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Smartphone,
  Users,
  Wifi,
} from 'lucide-react';
import { CHILEAN_BANKS, MOCKUP_CATEGORIES, MOCKUP_DISHES } from '../data/landingData';
import { formatCLP } from '../utils/roiCalculator';
import { SafeImage } from './SafeImage';

export type MockupStage = 'carta' | 'pedido' | 'pago' | 'cocina';

interface MenuShowcaseMockupProps {
  activeStage: MockupStage;
  onSelectStage: (stage: MockupStage) => void;
}

const STAGE_TABS: { id: MockupStage; label: string }[] = [
  { id: 'carta', label: '1. Carta QR' },
  { id: 'pedido', label: '2. Pedido' },
  { id: 'pago', label: '3. Pago Fintoc' },
  { id: 'cocina', label: '4. Cocina' },
];

const TIP_OPTIONS = [0, 5, 10, 15, 20] as const;

export const MenuShowcaseMockup: React.FC<MenuShowcaseMockupProps> = ({
  activeStage,
  onSelectStage,
}) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({
    margherita: 2,
    risotto: 1,
    volcan: 1,
  });
  const [splitGuests, setSplitGuests] = useState<number>(4);
  const [tipPercent, setTipPercent] = useState<number>(10);
  const [payTab, setPayTab] = useState<'apple-pay' | 'bancos' | 'tarjetas'>('apple-pay');
  const [selectedBankId, setSelectedBankId] = useState<string>('bch');

  const cartLines = MOCKUP_DISHES.map((dish) => ({
    dish,
    qty: quantities[dish.id] ?? 0,
  })).filter((line) => line.qty > 0);

  const totalItems = cartLines.reduce((sum, line) => sum + line.qty, 0);
  const subtotal = cartLines.reduce((sum, line) => sum + line.dish.price * line.qty, 0);
  const serviceFee = Math.round(subtotal * 0.03);
  const tipAmount = Math.round(subtotal * (tipPercent / 100));
  const grandTotal = subtotal + serviceFee + tipAmount;

  const adjustQuantity = (dishId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[dishId] ?? 0;
      const next = Math.max(0, Math.min(9, current + delta));
      const updated = { ...prev, [dishId]: next };
      const nextTotal = Object.values(updated).reduce((a, b) => a + b, 0);
      // Keep at least 1 dish in demo preview so checkout math stays meaningful
      if (nextTotal === 0) {
        return prev;
      }
      return updated;
    });
  };

  return (
    <div className="flex flex-col items-center w-full" data-testid="gusto-mockup-showcase">
      {/* Interactive stage selector tabs */}
      <div
        role="tablist"
        aria-label="Etapas reales del menú digital Gustō"
        className="w-full max-w-[408px] grid grid-cols-4 gap-1 p-1 mb-5 rounded-xl bg-[#eef6e4] border border-[#dce7ce]"
      >
        {STAGE_TABS.map((tab) => {
          const isActive = activeStage === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelectStage(tab.id)}
              className={`px-2 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${
                isActive
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#394734] hover:text-[#111111] hover:bg-white/60'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Faithful Gustō iPhone 16 Pro Visual Frame */}
      <div className="relative w-full max-w-[376px] rounded-[46px] p-[10px] bg-[#161716] border-[3px] border-[#8b8780] shadow-[0_28px_60px_-20px_rgba(17,17,17,0.28)]">
        {/* Inner Display Screen */}
        <div className="relative w-full h-[615px] rounded-[36px] bg-white text-[#111111] overflow-hidden flex flex-col">
          {/* iOS Status Bar + Dynamic Island */}
          <div className="px-5 pt-2.5 pb-1.5 flex items-center justify-between bg-white border-b border-[#c5e19b]/35 shrink-0">
            <span className="text-[11px] font-bold tabular-nums text-[#111111]">20:15</span>
            <div className="w-24 h-5 rounded-full bg-[#111111]" aria-hidden="true" />
            <div className="flex items-center gap-1 text-[#111111]">
              <span className="text-[10px] font-bold">5G</span>
              <Wifi className="w-3 h-3" aria-hidden="true" />
            </div>
          </div>

          {/* Authentic Safari URL Bar referencing Gustō table link */}
          <div className="px-4 py-1.5 bg-white border-b border-[#c5e19b]/30 shrink-0">
            <div className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-[#eef7e3] border border-[#c5e19b] text-[11px] text-[#111111]">
              <Lock className="w-2.5 h-2.5 text-[#3a5a18]" aria-hidden="true" />
              <span className="font-semibold tracking-tight">app.gusto.cl/mesa-1</span>
            </div>
          </div>

          {/* Gustō App Top Header (mirrors attached Header.tsx) */}
          <div className="px-4 py-2.5 bg-white border-b border-[#c5e19b]/45 flex items-center justify-between shrink-0">
            <span className="font-serif text-lg font-bold text-[#111111] tracking-tight">
              The Gourmet Hub
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onSelectStage('cocina')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-[#111111] bg-[#eef7e3] border border-[#c5e19b]"
                aria-label="Ver estado de asistencia y cocina en el teléfono"
              >
                <Bell className="w-3 h-3" aria-hidden="true" />
                <span>Mozo</span>
              </button>
              <button
                type="button"
                onClick={() => onSelectStage('pedido')}
                aria-label={`Ver pedido de la mesa con ${totalItems} productos`}
                className="relative w-8 h-8 rounded-full bg-[#c5e19b] text-[#111111] border border-[#aed771] flex items-center justify-center"
              >
                <ShoppingBag className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#111111] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {totalItems}
                </span>
              </button>
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-white px-3.5 py-3">
            {activeStage === 'carta' && (
              <div className="space-y-3">
                {/* Search input replica */}
                <div className="relative">
                  <Search
                    className="w-3.5 h-3.5 text-[#4a5843] absolute left-3 top-1/2 -translate-y-1/2"
                    aria-hidden="true"
                  />
                  <div className="w-full pl-8 pr-3 py-2 rounded-full bg-[#f6fbf0] border border-[#c5e19b] text-[11px] text-[#556350]">
                    Buscar platos o ingredientes...
                  </div>
                </div>

                {/* Table indicator */}
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#111111]">
                    MESA 1 <span className="font-medium text-[#465242]">· Salón Principal</span>
                  </span>
                  <span className="text-[#465242] font-medium">4 categorías</span>
                </div>

                {/* 2x2 Category Grid with real attached photography */}
                <div className="grid grid-cols-2 gap-2">
                  {MOCKUP_CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="relative rounded-2xl aspect-[1.25/1] overflow-hidden border border-[#c5e19b] bg-[#eef7e3]"
                    >
                      <SafeImage
                        src={cat.imageUrl}
                        alt={cat.alt}
                        loading="eager"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                      <span className="absolute bottom-2 left-2.5 right-2 text-[11px] font-bold text-white leading-tight drop-shadow-xs">
                        {cat.name}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Popular Dishes (interactive quick-add) */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-[#111111]">
                      Nuestra Carta
                    </span>
                    <span className="text-[11px] text-[#465242]">Toca + para sumar</span>
                  </div>

                  {MOCKUP_DISHES.slice(0, 2).map((dish) => {
                    const qty = quantities[dish.id] ?? 0;
                    return (
                      <div
                        key={dish.id}
                        className="flex items-center justify-between gap-2.5 p-2.5 rounded-2xl bg-[#f4faee] border border-[#c5e19b]"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-xs font-bold text-[#111111] truncate">
                            {dish.name}
                          </p>
                          <p className="text-[10px] text-[#3a4736] line-clamp-1 mt-0.5">
                            {dish.description}
                          </p>
                          <div className="mt-1.5 flex items-center gap-2">
                            <span className="text-xs font-extrabold text-[#111111] tabular-nums">
                              {formatCLP(dish.price)}
                            </span>
                            {qty > 0 && (
                              <span className="text-[10px] font-semibold text-[#3a5a18] tabular-nums">
                                · {qty} en mesa
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#c5e19b]/70">
                          <SafeImage
                            src={dish.imageUrl}
                            alt={dish.alt}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => adjustQuantity(dish.id, 1)}
                            aria-label={`Agregar ${dish.name} al pedido de demostración`}
                            className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white hover:bg-[#c5e19b] text-[#111111] border border-[#c5e19b] shadow-xs flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[2.75]" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeStage === 'pedido' && (
              <div className="space-y-3">
                <div className="flex items-baseline justify-between border-b border-[#c5e19b]/50 pb-2">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#111111]">Tu pedido</h3>
                    <p className="text-[11px] text-[#3c4a37] tabular-nums">
                      {totalItems} productos en Mesa 1
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-[#111111] tabular-nums">
                    {formatCLP(subtotal)}
                  </span>
                </div>

                <div className="space-y-2">
                  {cartLines.map(({ dish, qty }) => (
                    <div
                      key={dish.id}
                      className="p-2.5 rounded-2xl bg-[#f4faee] border border-[#c5e19b] flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#111111] truncate">{dish.name}</p>
                        <p className="text-xs font-extrabold text-[#111111] tabular-nums mt-0.5">
                          {formatCLP(dish.price * qty)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 p-0.5 rounded-full bg-white border border-[#c5e19b] shrink-0">
                        <button
                          type="button"
                          onClick={() => adjustQuantity(dish.id, -1)}
                          aria-label={`Quitar una unidad de ${dish.name}`}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#eef7e3]"
                        >
                          <Minus className="w-3 h-3" aria-hidden="true" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center tabular-nums">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(dish.id, 1)}
                          aria-label={`Sumar una unidad de ${dish.name}`}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#eef7e3]"
                        >
                          <Plus className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Split bill widget faithful to Gustō CartDrawer */}
                <div className="p-3 rounded-2xl bg-[#eef7e3] border border-[#c5e19b] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#111111]">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      Dividir cuenta
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSplitGuests((g) => Math.max(1, g - 1))}
                        aria-label="Disminuir personas para dividir cuenta"
                        className="w-6 h-6 rounded-full bg-white border border-[#c5e19b] flex items-center justify-center text-[#111111]"
                      >
                        <Minus className="w-3 h-3" aria-hidden="true" />
                      </button>
                      <span
                        data-testid="mockup-split-guests"
                        className="text-xs font-bold w-5 text-center tabular-nums"
                      >
                        {splitGuests}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSplitGuests((g) => Math.min(10, g + 1))}
                        aria-label="Aumentar personas para dividir cuenta"
                        className="w-6 h-6 rounded-full bg-white border border-[#c5e19b] flex items-center justify-center text-[#111111]"
                      >
                        <Plus className="w-3 h-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-[#c5e19b]/60">
                    <span className="text-[#3a4736]">Monto por persona</span>
                    <span
                      data-testid="mockup-split-amount"
                      className="font-extrabold text-[#111111] tabular-nums"
                    >
                      {formatCLP(subtotal / splitGuests)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectStage('pago')}
                  className="w-full py-3 rounded-full bg-[#111111] hover:bg-[#252525] text-white text-xs font-bold transition-colors"
                >
                  Proceder al pago · {formatCLP(subtotal)}
                </button>
              </div>
            )}

            {activeStage === 'pago' && (
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] font-semibold text-[#3a5a18]">
                    Mesa 1 · Resumen de pago
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#111111]">
                    Cobro rápido con Fintoc
                  </h3>
                </div>

                {/* Breakdown card */}
                <div className="p-3 rounded-2xl bg-[#f4faee] border border-[#c5e19b] space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#3c4a37]">Subtotal</span>
                    <span className="font-bold tabular-nums">{formatCLP(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#3c4a37]">Tarifa servicio (3%)</span>
                    <span className="font-bold tabular-nums">{formatCLP(serviceFee)}</span>
                  </div>

                  {/* Tip options */}
                  <div className="pt-1.5 border-t border-[#c5e19b]/60">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-bold text-[#111111]">Propina ({tipPercent}%)</span>
                      <span
                        data-testid="mockup-tip-amount"
                        className="font-extrabold text-[#111111] tabular-nums"
                      >
                        {formatCLP(tipAmount)}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-1">
                      {TIP_OPTIONS.map((pct) => {
                        const selected = tipPercent === pct;
                        return (
                          <button
                            key={pct}
                            type="button"
                            onClick={() => setTipPercent(pct)}
                            className={`py-1.5 rounded-xl text-[11px] font-bold tabular-nums transition-colors ${
                              selected
                                ? 'bg-[#c5e19b] text-[#111111] border-2 border-[#111111]'
                                : 'bg-white text-[#111111] border border-[#c5e19b] hover:bg-[#eef7e3]'
                            }`}
                          >
                            {pct}%
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between pt-1.5 border-t border-[#c5e19b]">
                    <span className="font-serif text-sm font-bold text-[#111111]">Total</span>
                    <span
                      data-testid="mockup-grand-total"
                      className="text-base font-extrabold text-[#111111] tabular-nums"
                    >
                      {formatCLP(grandTotal)}
                    </span>
                  </div>
                </div>

                {/* Payment Tabs */}
                <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[#eef7e3] border border-[#c5e19b]/70">
                  <button
                    type="button"
                    onClick={() => setPayTab('apple-pay')}
                    className={`py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 ${
                      payTab === 'apple-pay'
                        ? 'bg-white text-[#111111] shadow-2xs'
                        : 'text-[#465242]'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" aria-hidden="true" />
                    <span>Apple Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayTab('bancos')}
                    className={`py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 ${
                      payTab === 'bancos'
                        ? 'bg-white text-[#111111] shadow-2xs'
                        : 'text-[#465242]'
                    }`}
                  >
                    <Landmark className="w-3 h-3" aria-hidden="true" />
                    <span>Bancos</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayTab('tarjetas')}
                    className={`py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 ${
                      payTab === 'tarjetas'
                        ? 'bg-white text-[#111111] shadow-2xs'
                        : 'text-[#465242]'
                    }`}
                  >
                    <CreditCard className="w-3 h-3" aria-hidden="true" />
                    <span>Webpay</span>
                  </button>
                </div>

                {payTab === 'apple-pay' && (
                  <div className="p-3 rounded-2xl bg-[#111111] text-white flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/70">Apple Wallet · Face ID</p>
                      <p className="text-xs font-bold">Banco de Chile Visa ···· 4821</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#c5e19b]">Listo</span>
                  </div>
                )}

                {payTab === 'bancos' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {CHILEAN_BANKS.map((bank) => {
                      const active = selectedBankId === bank.id;
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBankId(bank.id)}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 text-[11px] ${
                            active
                              ? 'border-[#111111] bg-[#eef7e3] font-bold'
                              : 'border-[#c5e19b] bg-white'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-md text-[9px] font-bold flex items-center justify-center shrink-0"
                            style={{ backgroundColor: bank.bgHex, color: bank.textHex }}
                          >
                            {bank.shortCode}
                          </span>
                          <span className="truncate">{bank.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {payTab === 'tarjetas' && (
                  <div className="p-3 rounded-2xl bg-[#f4faee] border border-[#c5e19b] text-[11px] text-[#2e3b27]">
                    Redcompra · Visa · Mastercard tokenizado con encriptación bancaria SSL 256-bit.
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => onSelectStage('cocina')}
                  className="w-full py-3 rounded-full bg-[#111111] hover:bg-[#252525] text-white text-xs font-bold transition-colors tabular-nums"
                >
                  Confirmar pago · {formatCLP(grandTotal)}
                </button>
              </div>
            )}

            {activeStage === 'cocina' && (
              <div className="space-y-3">
                {/* Push Notification Banner replica */}
                <div className="p-3 rounded-2xl bg-[#111111] text-[#f3f9e9] flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-[#c5e19b] text-[#111111] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-[#c5e19b]">
                      Notificación Gustō · Ahora
                    </p>
                    <p className="text-xs font-bold text-white">Pago aprobado en Mesa 1</p>
                    <p className="text-[11px] text-[#dcedc2]/85 tabular-nums">
                      Total {formatCLP(grandTotal)} vía Fintoc. Tu comanda ya ingresó a cocina.
                    </p>
                  </div>
                </div>

                {/* Live Kitchen Progress */}
                <div className="p-3.5 rounded-2xl bg-[#eef7e3] border border-[#c5e19b] space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#111111]">
                    <span className="inline-flex items-center gap-1.5">
                      <ChefHat className="w-4 h-4" aria-hidden="true" />
                      Estado en cocina
                    </span>
                    <span className="text-[#3a5a18]">Fuego y emplatado</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="h-1.5 rounded-full bg-[#111111]" />
                    <div className="h-1.5 rounded-full bg-[#111111]" />
                    <div className="h-1.5 rounded-full bg-[#c5e19b]" />
                  </div>
                  <div className="flex justify-between text-[10px] font-semibold text-[#3a4736]">
                    <span>1. Recibido</span>
                    <span>2. Preparando</span>
                    <span>3. En mesa</span>
                  </div>
                </div>

                {/* Digital Receipt */}
                <div className="p-3.5 rounded-2xl bg-white border border-[#c5e19b] space-y-2 text-xs">
                  <div className="flex justify-between items-baseline border-b border-[#c5e19b]/50 pb-1.5">
                    <span className="font-serif font-bold text-sm text-[#111111]">
                      Orden #4812
                    </span>
                    <span className="text-[11px] text-[#465242]">Boleta electrónica</span>
                  </div>
                  {cartLines.map(({ dish, qty }) => (
                    <div key={dish.id} className="flex justify-between text-[11px]">
                      <span className="text-[#111111] truncate pr-2">
                        {qty}x {dish.name}
                      </span>
                      <span className="font-bold tabular-nums shrink-0">
                        {formatCLP(dish.price * qty)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-[#c5e19b]/60 font-extrabold text-xs text-[#111111] tabular-nums">
                    <span>Total pagado (propina {tipPercent}%)</span>
                    <span>{formatCLP(grandTotal)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectStage('carta')}
                  className="w-full py-2.5 rounded-full bg-[#eef7e3] hover:bg-[#dcedc2] border border-[#c5e19b] text-[#111111] text-xs font-bold transition-colors"
                >
                  Volver a explorar la carta
                </button>
              </div>
            )}
          </div>

          {/* iOS Home Indicator */}
          <div className="py-2 bg-white flex justify-center shrink-0">
            <div className="w-28 h-1 rounded-full bg-black/30" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Caption under mockup */}
      <p className="mt-4 text-xs text-[#465242] text-center max-w-sm">
        Vista interactiva basada en la aplicación real de menú digital Gustō. Recorre las 4 etapas
        que experimenta cada mesa.
      </p>
    </div>
  );
};
