import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { CulinaryImage } from './CulinaryImage';
import { audioHaptic, formatCLP } from '../utils/audioHaptic';

interface DishModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, selectedOption?: string, notes?: string) => void;
}

export const DishModal: React.FC<DishModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<string>(
    item.options && item.options[0]?.choices[0]?.label ? item.options[0].choices[0].label : ''
  );
  const [notes, setNotes] = useState('');

  // Calculate final unit price including options
  const optionExtra = item.options?.[0]?.choices.find((c) => c.label === selectedOption)?.extraPrice || 0;
  const unitPrice = item.price + optionExtra;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    audioHaptic.playTap();
    onAddToCart(item, quantity, selectedOption, notes);
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-2 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white text-[#111111] shadow-2xl border border-[#c5e19b] animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Handle / Close Bar */}
        <div className="relative">
          <div className="w-full h-64 sm:h-72 overflow-hidden bg-[#eef7e3]">
            <CulinaryImage
              name={item.name}
              imageUrl={item.imageUrl}
              aspect="wide"
              className="w-full h-full rounded-none"
            />
          </div>

          <button
            onClick={() => {
              audioHaptic.playTap();
              onClose();
            }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/80 flex items-center justify-center transition-transform active:scale-90 shadow-md"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Details Content */}
        <div className="p-6 space-y-5">
          <div>
            <div className="flex items-center justify-between gap-3 mb-1.5">
              <h2 className="font-serif text-2xl font-bold text-[#111111]">
                {item.name}
              </h2>
              <span className="font-sans text-xl font-extrabold text-[#111111] tabular-nums whitespace-nowrap">
                {formatCLP(unitPrice)}
              </span>
            </div>

            <p className="text-sm text-[#2c3727] leading-relaxed">
              {item.description}
            </p>

            {item.dietary && item.dietary.length > 0 && (
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {item.dietary.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#eef7e3] text-[#111111] border border-[#c5e19b]"
                  >
                    {tag === 'sin-gluten' ? 'Sin gluten' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Options with green diffused box and black text */}
          {item.options && item.options.length > 0 && (
            <div className="pt-2 border-t border-[#c5e19b]/40">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-2.5">
                {item.options[0].name}
              </label>
              <div className="space-y-2">
                {item.options[0].choices.map((choice) => (
                  <button
                    key={choice.label}
                    onClick={() => {
                      audioHaptic.playTap();
                      setSelectedOption(choice.label);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-sm font-medium transition-all ${
                      selectedOption === choice.label
                        ? 'border-[#c5e19b] bg-[#eef7e3] text-[#111111] font-bold shadow-xs'
                        : 'border-[#c5e19b]/40 bg-white text-[#2a2a2a] hover:bg-[#f7fbf2]'
                    }`}
                  >
                    <span>{choice.label}</span>
                    <span className="w-5 h-5 rounded-full border-2 border-[#111111] flex items-center justify-center">
                      {selectedOption === choice.label && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#111111]" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions / Notes to kitchen */}
          <div className="pt-2 border-t border-[#c5e19b]/40">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#111111] mb-1.5">
              Notas para cocina (opcional)
            </label>
            <input
              type="text"
              placeholder="Ej: Sin sal, aderezo al costado, bien dorado..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-[#f7fbf2] border border-[#c5e19b] text-sm text-[#111111] placeholder:text-[#6a7566] focus:outline-none focus:ring-2 focus:ring-[#c5e19b] transition-all"
            />
          </div>

          {/* Quantity Selector & Add CTA */}
          <div className="pt-3 flex items-center gap-3">
            <div className="flex items-center gap-2 p-1 rounded-full bg-[#eef7e3] border border-[#c5e19b]">
              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setQuantity((q) => Math.max(1, q - 1));
                }}
                disabled={quantity <= 1}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#111111] disabled:opacity-30 hover:bg-[#c5e19b] active:scale-95 transition-all"
                aria-label="Disminuir cantidad"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>

              <span className="font-sans font-bold text-sm w-6 text-center tabular-nums text-[#111111]">
                {quantity}
              </span>

              <button
                onClick={() => {
                  audioHaptic.playTap();
                  setQuantity((q) => q + 1);
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#c5e19b] active:scale-95 transition-all"
                aria-label="Aumentar cantidad"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 py-4 px-6 rounded-full bg-[#111111] hover:bg-[#252525] text-white font-bold text-sm shadow-md active:scale-[0.98] transition-all flex items-center justify-between"
            >
              <span>Agregar al pedido</span>
              <span className="tabular-nums">{formatCLP(totalPrice)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
