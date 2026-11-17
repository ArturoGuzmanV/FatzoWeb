import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types/restaurant';
import { CulinaryImage } from './CulinaryImage';
import { audioHaptic, formatCLP } from '../utils/audioHaptic';

interface DishCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
  cartQuantity?: number;
}

export const DishCard: React.FC<DishCardProps> = ({
  item,
  onSelect,
  onQuickAdd,
  cartQuantity = 0,
}) => {
  return (
    <div
      onClick={() => {
        audioHaptic.playTap();
        onSelect(item);
      }}
      className="group relative flex items-center justify-between p-3.5 sm:p-4 rounded-3xl bg-gradient-to-br from-[#f4faee]/95 via-[#eaf5de]/80 to-[#f9fdf5]/95 backdrop-blur-md border border-[#c5e19b] shadow-[0_3px_14px_-4px_rgba(197,225,155,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(197,225,155,0.55)] hover:border-[#abd76b] transition-all duration-300 cursor-pointer active:scale-[0.99]"
    >
      {/* Left Column: Text & Details */}
      <div className="flex-1 pr-3 sm:pr-4 flex flex-col justify-between self-stretch text-left">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#111111] leading-snug group-hover:text-[#2d4a1b] transition-colors">
              {item.name}
            </h3>
            {item.isPopular && (
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#111111] bg-[#c5e19b] px-2.5 py-0.5 rounded-full border border-[#abd76b]/70 shadow-2xs">
                Popular
              </span>
            )}
          </div>

          <p className="text-xs sm:text-[13px] text-[#2e372b] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Dietary labels & Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-sans text-base sm:text-lg font-extrabold text-[#111111] tabular-nums">
              {formatCLP(item.price)}
            </span>
            {cartQuantity > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#111111] text-[#f3f9e9] shadow-xs">
                {cartQuantity} en mesa
              </span>
            )}
          </div>

          {item.dietary && item.dietary.length > 0 && (
            <span className="text-[11px] text-[#4d5c47] font-medium italic">
              {item.dietary.join(' · ')}
            </span>
          )}
        </div>
      </div>

      {/* Right Column: Real Food Photo with Quick Add Button */}
      <div className="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-sm border border-[#c5e19b]/50">
        <CulinaryImage
          name={item.name}
          imageUrl={item.imageUrl}
          aspect="square"
        />

        {/* Quick Add floating circle button matching screenshot */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioHaptic.playTap();
            onQuickAdd(item, e);
          }}
          className="absolute bottom-1.5 right-1.5 w-8 h-8 rounded-full bg-white hover:bg-[#c5e19b] text-[#111111] shadow-md flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-[#c5e19b]"
          title={`Agregar ${item.name} al pedido`}
          aria-label={`Agregar ${item.name}`}
        >
          <Plus className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
