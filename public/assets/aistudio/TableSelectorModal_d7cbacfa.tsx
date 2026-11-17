import React from 'react';
import { X, QrCode, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { audioHaptic } from '../utils/audioHaptic';

interface TableSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTableId: string;
  onSelectTable: (table: { id: string; name: string; zone: string }) => void;
}

export const TableSelectorModal: React.FC<TableSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTableId,
  onSelectTable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-sm rounded-[36px] bg-white text-[#111111] p-6 shadow-2xl border-2 border-[#c5e19b] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#c5e19b]/40">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#111111]">
              Seleccionar Mesa
            </h3>
            <p className="text-xs text-[#3d4a37] font-medium">
              Identifica tu ubicación en el restaurante
            </p>
          </div>
          <button
            onClick={() => {
              audioHaptic.playTap();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#eef7e3] border border-[#c5e19b] hover:bg-[#c5e19b] text-[#111111] flex items-center justify-center transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {RESTAURANT_INFO.tables.map((table) => {
            const isSelected = table.id === currentTableId;
            return (
              <button
                key={table.id}
                onClick={() => {
                  audioHaptic.playTap();
                  onSelectTable(table);
                  onClose();
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border-2 text-sm transition-all ${
                  isSelected
                    ? 'border-[#111111] bg-[#eef7e3] font-bold text-[#111111] shadow-2xs'
                    : 'border-[#c5e19b] bg-white text-[#111111] hover:bg-[#f8fcf4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#c5e19b] text-[#111111] flex items-center justify-center text-xs font-bold font-mono">
                    {table.id}
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold leading-tight text-[#111111]">
                      {table.name}
                    </span>
                    <span className="text-xs text-[#414e3b] font-medium">
                      {table.zone}
                    </span>
                  </div>
                </div>

                {isSelected && <Check className="w-4 h-4 text-[#111111] stroke-[3]" />}
              </button>
            );
          })}
        </div>

        <div className="pt-2 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-[#3d4a37] font-medium">
            <QrCode className="w-3.5 h-3.5 text-[#111111]" />
            <span>O escanea el código QR situado en tu mesa</span>
          </div>
        </div>
      </div>
    </div>
  );
};
