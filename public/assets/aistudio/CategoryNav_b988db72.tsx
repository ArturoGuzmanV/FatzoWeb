import React from 'react';
import { Category } from '../types/restaurant';
import { audioHaptic } from '../utils/audioHaptic';

interface CategoryNavProps {
  categories: Category[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 px-4 scroll-smooth">
      <div className="flex items-center gap-2 min-w-max mx-auto max-w-2xl">
        <button
          onClick={() => {
            audioHaptic.playTap();
            onSelectCategory('todos');
          }}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap min-h-[38px] flex items-center justify-center ${
            activeCategoryId === 'todos'
              ? 'bg-[#c5e19b] text-[#111111] border border-[#a7d568] shadow-sm'
              : 'bg-[#eef7e3] text-[#111111] border border-[#c5e19b]/50 hover:bg-[#e2f2cf]'
          }`}
        >
          Todo el Menú
        </button>

        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                audioHaptic.playTap();
                onSelectCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap min-h-[38px] flex items-center justify-center ${
                isActive
                  ? 'bg-[#c5e19b] text-[#111111] border border-[#a7d568] shadow-sm'
                  : 'bg-[#eef7e3] text-[#111111] border border-[#c5e19b]/50 hover:bg-[#e2f2cf]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
