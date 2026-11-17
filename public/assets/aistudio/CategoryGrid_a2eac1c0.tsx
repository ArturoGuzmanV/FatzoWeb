import React from 'react';
import { Category } from '../types/restaurant';
import { CulinaryImage } from './CulinaryImage';
import { audioHaptic } from '../utils/audioHaptic';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (id: string) => void;
  tableName?: string;
  tableZone?: string;
  onOpenTableSelect?: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
  tableName,
  tableZone,
  onOpenTableSelect,
}) => {
  return (
    <div className="px-4 py-2">
      {/* Recuadro de "Mesa 1 · Salón Principal" posicionado SOBRE "Explorar Menú" */}
      {tableName && onOpenTableSelect && (
        <div className="mb-2.5">
          <button
            onClick={() => {
              audioHaptic.playTap();
              onOpenTableSelect();
            }}
            className="group inline-flex items-center gap-2 text-xs font-bold text-[#111111] bg-[#eef7e3] hover:bg-[#e2f3cc] border border-[#c5e19b] px-3.5 py-1.5 rounded-full shadow-2xs transition-all active:scale-95"
            title="Cambiar de mesa"
          >
            <span className="w-2 h-2 rounded-full bg-[#75b025] group-hover:scale-125 transition-transform" />
            <span className="font-extrabold uppercase tracking-wider">{tableName}</span>
            <span className="text-[#3b4934] font-medium">· {tableZone}</span>
            <svg
              className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      {/* Header Explorar Menú */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-xl font-bold text-[#111111] tracking-tight">
          Explorar Menú
        </h2>
        <span className="text-xs text-[#2e3e23] font-semibold bg-[#e7f4d7] px-2.5 py-0.5 rounded-full border border-[#c5e19b]/60">
          {categories.length} categorías
        </span>
      </div>

      {/* 2-Column Category Grid */}
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              audioHaptic.playTap();
              onSelectCategory(cat.id);
            }}
            className="group relative overflow-hidden rounded-3xl aspect-[1.08/1] text-left transition-all duration-300 border border-[#c5e19b] shadow-[0_3px_12px_-3px_rgba(197,225,155,0.45)] hover:shadow-lg active:scale-[0.98] focus-visible:outline-none bg-[#eef7e3]"
          >
            {/* Real Category Photo */}
            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500">
              <CulinaryImage
                name={cat.name}
                imageUrl={cat.imageUrl}
                aspect="square"
                className="w-full h-full rounded-none"
              />
            </div>

            {/* Very soft gradient scrim to preserve maximum photo brightness */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent group-hover:from-black/35 transition-colors" />

            {/* Titulo en recuadro con mayor claridad, vidrio difuminado luminoso (#2a2a2a al 40%) y letras blancas bien nítidas */}
            <div className="absolute inset-0 p-3 flex flex-col justify-end items-start">
              <div className="bg-[#2a2a2a]/40 backdrop-blur-xl rounded-2xl px-3.5 py-1.5 border border-white/35 shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-105">
                <span className="font-sans text-xs sm:text-[13px] font-bold text-white tracking-wide leading-tight block drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  {cat.name}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
