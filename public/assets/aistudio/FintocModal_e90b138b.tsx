import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ChevronRight, CreditCard, Landmark, Smartphone, Loader2 } from 'lucide-react';
import { CHILEAN_BANKS } from '../data/menuData';
import { ChileanBank } from '../types/restaurant';
import { audioHaptic, formatCLP } from '../utils/audioHaptic';

interface FintocModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  tipAmount: number;
  tableNumber: string;
  onPaymentSuccess: (details: { method: 'fintoc' | 'apple-pay'; bank?: string }) => void;
}

export const FintocModal: React.FC<FintocModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  tipAmount,
  tableNumber,
  onPaymentSuccess,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'apple-pay' | 'bancos' | 'tarjetas'>('apple-pay');
  const [selectedBank, setSelectedBank] = useState<ChileanBank | null>(CHILEAN_BANKS[0]);
  const [rut, setRut] = useState('18.492.381-4');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  const handleApplePaySubmit = () => {
    audioHaptic.playTap();
    setIsProcessing(true);
    setProcessingStep('Autenticando con Apple Pay & Face ID...');

    setTimeout(() => {
      setProcessingStep('Tokenizando credencial Fintoc...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Confirmando débito con banco emisor...');
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      audioHaptic.playSuccessChime();
      onPaymentSuccess({ method: 'apple-pay' });
    }, 2600);
  };

  const handleBankTransferSubmit = () => {
    if (!selectedBank) return;
    audioHaptic.playTap();
    setIsProcessing(true);
    setProcessingStep(`Conectando con ${selectedBank.name}...`);

    setTimeout(() => {
      setProcessingStep('Verificando fondos y token bancario...');
    }, 1000);

    setTimeout(() => {
      setProcessingStep('Transferencia Fintoc aprobada por la CMF...');
    }, 2000);

    setTimeout(() => {
      setIsProcessing(false);
      audioHaptic.playSuccessChime();
      onPaymentSuccess({ method: 'fintoc', bank: selectedBank.name });
    }, 2800);
  };

  const handleCardSubmit = () => {
    audioHaptic.playTap();
    setIsProcessing(true);
    setProcessingStep('Conectando con pasarela Webpay Plus...');

    setTimeout(() => {
      setProcessingStep('Validando tarjeta bancaria local...');
    }, 1100);

    setTimeout(() => {
      setIsProcessing(false);
      audioHaptic.playSuccessChime();
      onPaymentSuccess({ method: 'fintoc', bank: 'Webpay / Tarjeta Bancaria' });
    }, 2400);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md overflow-hidden rounded-[36px] bg-white text-[#111111] shadow-2xl border-2 border-[#c5e19b]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fintoc Brand Header */}
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#c5e19b] flex items-center justify-center font-extrabold text-xs text-[#111111]">
              F
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight">Fintoc</span>
              <span className="text-[10px] text-[#c5e19b] block -mt-0.5 font-medium">Pagos y Transferencias Seguras</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] text-[#c5e19b] bg-white/10 px-2 py-0.5 rounded-full font-medium">
              <Lock className="w-3 h-3" />
              <span>256-bit</span>
            </div>
            {!isProcessing && (
              <button
                onClick={() => {
                  audioHaptic.playTap();
                  onClose();
                }}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="Cancelar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Processing State */}
        {isProcessing ? (
          <div className="p-8 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#c5e19b]/30 animate-ping" />
              <div className="w-14 h-14 rounded-full border-3 border-[#c5e19b] border-t-transparent animate-spin flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-[#111111] animate-spin" />
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-[#111111]">
                Procesando transacción
              </h3>
              <p className="text-xs text-[#3d4b37] mt-1 font-medium">
                {processingStep}
              </p>
            </div>

            <div className="pt-2">
              <span className="font-sans font-extrabold text-xl text-[#111111] tabular-nums">
                {formatCLP(totalAmount)}
              </span>
              <p className="text-[11px] text-[#556350] mt-0.5 font-medium">Mesa {tableNumber}</p>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6 space-y-4">
            {/* Amount Banner in diffused green box */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#eef7e3] border border-[#c5e19b]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#2e3e26] font-bold">
                  Mesa {tableNumber} · Total a debitar
                </span>
                <p className="text-[11px] text-[#47573e] font-medium">
                  Incluye propina ({formatCLP(tipAmount)})
                </p>
              </div>
              <span className="font-sans font-extrabold text-xl text-[#111111] tabular-nums">
                {formatCLP(totalAmount)}
              </span>
            </div>

            {/* Methods Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#eef7e3] border border-[#c5e19b]/60">
              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setActiveTab('apple-pay');
                }}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'apple-pay'
                    ? 'bg-white text-[#111111] shadow-xs border border-[#c5e19b]'
                    : 'text-[#47573e] hover:text-[#111111]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Apple Pay</span>
              </button>

              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setActiveTab('bancos');
                }}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'bancos'
                    ? 'bg-white text-[#111111] shadow-xs border border-[#c5e19b]'
                    : 'text-[#47573e] hover:text-[#111111]'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Bancos Chile</span>
              </button>

              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setActiveTab('tarjetas');
                }}
                className={`py-2 px-1 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'tarjetas'
                    ? 'bg-white text-[#111111] shadow-xs border border-[#c5e19b]'
                    : 'text-[#47573e] hover:text-[#111111]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>
            </div>

            {/* Tab 1: Apple Pay */}
            {activeTab === 'apple-pay' && (
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-2xl bg-[#000000] text-white flex items-center justify-between shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                      <span className="text-xl"></span>
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Apple Wallet</span>
                      <p className="text-sm font-bold">Banco de Chile Visa ···· 4821</p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#c5e19b]">Listo</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#eef7e3] border border-[#c5e19b] text-xs text-[#2a3823] space-y-1 font-medium">
                  <p>• Pago verificado con biometría Face ID / Touch ID.</p>
                  <p>• Sin necesidad de ingresar claves bancarias ni tarjetas físicas.</p>
                </div>

                <button
                  onClick={handleApplePaySubmit}
                  className="w-full py-4 rounded-full bg-black hover:bg-neutral-900 text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span className="text-lg"></span>
                  <span>Pagar con Apple Pay · {formatCLP(totalAmount)}</span>
                </button>
              </div>
            )}

            {/* Tab 2: Bancos Chilenos (Fintoc Core) */}
            {activeTab === 'bancos' && (
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-[#111111]">
                  Selecciona tu banco para transferencia directa:
                </label>

                <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                  {CHILEAN_BANKS.map((bank) => {
                    const isSelected = selectedBank?.id === bank.id;
                    return (
                      <button
                        key={bank.id}
                        onClick={() => {
                          audioHaptic.playTap();
                          setSelectedBank(bank);
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-xs transition-all ${
                          isSelected
                            ? 'border-2 border-[#111111] bg-[#eef7e3] font-bold text-[#111111] shadow-2xs'
                            : 'border-[#c5e19b] bg-white text-[#111111] hover:bg-[#f8fcf4]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-7 h-7 rounded-xl flex items-center justify-center font-bold text-[10px]"
                            style={{ backgroundColor: bank.color, color: bank.textColor }}
                          >
                            {bank.shortCode}
                          </span>
                          <span className="font-semibold">{bank.name}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#111111]" />}
                      </button>
                    );
                  })}
                </div>

                {/* RUT Input */}
                <div className="pt-1">
                  <label className="block text-[11px] font-bold text-[#111111] mb-1">
                    RUT del titular de la cuenta:
                  </label>
                  <input
                    type="text"
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#f7fbf2] border border-[#c5e19b] text-xs font-mono font-bold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#c5e19b]"
                  />
                </div>

                <button
                  onClick={handleBankTransferSubmit}
                  className="w-full py-3.5 rounded-full bg-[#111111] hover:bg-[#252525] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Transferir con {selectedBank?.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Tab 3: Webpay / Tarjetas Locales */}
            {activeTab === 'tarjetas' && (
              <div className="space-y-3.5 pt-1">
                <div className="p-4 rounded-2xl bg-[#eef7e3] border border-[#c5e19b] space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#293523] font-semibold">
                    <span>Tarjetas chilenas soportadas</span>
                    <span className="font-extrabold text-[#111111]">Redcompra · Webpay</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-md bg-white border border-[#c5e19b] text-[10px] font-bold text-[#111111]">VISA</span>
                    <span className="px-2 py-1 rounded-md bg-white border border-[#c5e19b] text-[10px] font-bold text-[#111111]">MASTERCARD</span>
                    <span className="px-2 py-1 rounded-md bg-white border border-[#c5e19b] text-[10px] font-bold text-[#111111]">REDCOMPRA</span>
                  </div>

                  <p className="text-[11px] text-[#3d4b37] leading-relaxed font-medium">
                    Se procesará un cobro inmediato tokenizado y protegido sin redirecciones lentas.
                  </p>
                </div>

                <button
                  onClick={handleCardSubmit}
                  className="w-full py-3.5 rounded-full bg-[#111111] hover:bg-[#252525] text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <span>Pagar con Tarjeta Bancaria</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
