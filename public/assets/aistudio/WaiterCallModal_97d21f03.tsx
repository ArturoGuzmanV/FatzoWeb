import React, { useState } from 'react';
import { X, Bell, Receipt, Wine, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioHaptic } from '../utils/audioHaptic';

interface WaiterCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
}

export const WaiterCallModal: React.FC<WaiterCallModalProps> = ({
  isOpen,
  onClose,
  tableName,
}) => {
  if (!isOpen) return null;

  const [notifiedReason, setNotifiedReason] = useState<string | null>(null);

  const options = [
    { id: 'camarero', label: 'Llamar al mozo', desc: 'Atención general en la mesa', icon: Bell },
    { id: 'cuenta', label: 'Pedir la cuenta física', desc: 'Pago con boleta o factura impresa', icon: Receipt },
    { id: 'vajilla', label: 'Servilletas, hielo o cubiertos', desc: 'Implementos para la mesa', icon: Sparkles },
    { id: 'sommelier', label: 'Carta de vinos & sugerencias', desc: 'Consulta a nuestro sommelier', icon: Wine },
  ];

  const handleCall = (label: string) => {
    audioHaptic.playSuccessChime();
    setNotifiedReason(label);
    setTimeout(() => {
      setNotifiedReason(null);
      onClose();
    }, 2200);
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm rounded-[36px] bg-white text-[#111111] p-6 shadow-2xl border-2 border-[#c5e19b] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#c5e19b]/40">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#111111]">
              Asistencia en Mesa
            </h3>
            <p className="text-xs text-[#384633] font-medium">
              {tableName} · ¿En qué te podemos ayudar?
            </p>
          </div>
          <button
            onClick={() => {
              audioHaptic.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eef7e3] border border-[#c5e19b] hover:bg-[#c5e19b] text-[#111111] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {notifiedReason ? (
          <div className="py-8 text-center space-y-2 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-[#c5e19b] text-[#111111] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-[#111111]">Aviso enviado a tu mozo</h4>
            <p className="text-xs text-[#3b4935] font-medium">
              Un integrante de nuestro equipo se acerca a {tableName}.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleCall(opt.label)}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl border-2 border-[#c5e19b] bg-[#eef7e3] hover:bg-[#c5e19b] text-left transition-all active:scale-[0.98] shadow-2xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-white border border-[#c5e19b] text-[#111111] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-[#111111] leading-tight">
                      {opt.label}
                    </span>
                    <span className="text-xs text-[#3c4a36] font-medium">
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
