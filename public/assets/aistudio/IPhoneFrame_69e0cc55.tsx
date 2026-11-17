import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Lock, RotateCw, Smartphone } from 'lucide-react';

interface IPhoneFrameProps {
  children: React.ReactNode;
  activeOrderCount?: number;
  restaurantName?: string;
  tableName?: string;
}

export type TitaniumColor = 'natural' | 'black' | 'white' | 'desert';

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  restaurantName = 'The Gourmet Hub',
  tableName = 'Mesa 1',
}) => {
  const [deviceColor, setDeviceColor] = useState<TitaniumColor>('natural');
  const [currentTime, setCurrentTime] = useState('19:45');
  const [isDynamicIslandExpanded, setIsDynamicIslandExpanded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<'fit' | '100%'>('fit');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const frameBorderStyles: Record<TitaniumColor, { outer: string; inner: string; button: string }> = {
    natural: {
      outer: 'border-[#8f8a82] ring-2 ring-[#b2ada5] shadow-[0_30px_70px_-15px_rgba(60,65,55,0.3)]',
      inner: 'border-[#55524e]',
      button: 'bg-[#7c7770]',
    },
    white: {
      outer: 'border-[#d2d6d8] ring-2 ring-[#e8ecee] shadow-[0_30px_70px_-15px_rgba(80,95,80,0.25)]',
      inner: 'border-[#bcc0c2]',
      button: 'bg-[#c8ccce]',
    },
    desert: {
      outer: 'border-[#bca58a] ring-2 ring-[#d8c3a9] shadow-[0_30px_70px_-15px_rgba(90,75,55,0.28)]',
      inner: 'border-[#947e66]',
      button: 'bg-[#a38c73]',
    },
    black: {
      outer: 'border-[#222222] ring-2 ring-[#3e3e3e] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)]',
      inner: 'border-[#151515]',
      button: 'bg-[#2f2f2f]',
    },
  };

  const currentStyles = frameBorderStyles[deviceColor];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-2 sm:p-6 lg:p-8 bg-gradient-to-br from-[#f2fae8] via-[#ffffff] to-[#e4f3d1] transition-colors duration-500 overflow-x-hidden">
      {/* Studio Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c5e19b]/35 via-transparent to-transparent" />

      {/* Floating Control Bar for Mockup Customization (Color & Zoom) */}
      <div className="relative z-30 mb-4 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#c5e19b] shadow-[0_4px_16px_rgba(197,225,155,0.3)] flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#111111]">
          <Smartphone className="w-4 h-4 text-[#75b025]" />
          <span>iPhone 16 Pro</span>
        </div>

        <div className="h-3.5 w-px bg-[#c5e19b]" />

        {/* Device Finish Color Picker */}
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-semibold text-[#3b4934] hidden sm:inline">Color:</span>
          {(['natural', 'white', 'desert', 'black'] as TitaniumColor[]).map((col) => (
            <button
              key={col}
              onClick={() => setDeviceColor(col)}
              className={`w-4 h-4 rounded-full transition-transform ${
                deviceColor === col ? 'scale-125 ring-2 ring-offset-1 ring-[#111111]' : 'opacity-70 hover:opacity-100'
              } ${
                col === 'natural'
                  ? 'bg-[#8f8a82]'
                  : col === 'white'
                  ? 'bg-[#e2e6e8] border border-black/10'
                  : col === 'desert'
                  ? 'bg-[#bca58a]'
                  : 'bg-[#222222]'
              }`}
              title={`Titanio ${col}`}
              aria-label={`Color ${col}`}
            />
          ))}
        </div>

        <div className="h-3.5 w-px bg-[#c5e19b]" />

        {/* Zoom Fit Toggle */}
        <button
          onClick={() => setZoomLevel(zoomLevel === 'fit' ? '100%' : 'fit')}
          className="text-[11px] font-bold text-[#111111] hover:text-[#5e8b23] transition-colors"
        >
          {zoomLevel === 'fit' ? 'Ajustar a ventana' : 'Tamaño 100%'}
        </button>
      </div>

      {/* iPhone 16 Pro Physical Hardware Container */}
      <div
        className={`relative transition-all duration-300 ${
          zoomLevel === 'fit' ? 'max-h-[90vh]' : 'max-h-none'
        } flex items-center justify-center`}
      >
        {/* Left Side Buttons */}
        <div className="hidden sm:block absolute -left-[14px] top-28 w-[4px] h-10 rounded-l-md bg-[#8f8a82] shadow-sm" />
        <div className="hidden sm:block absolute -left-[14px] top-44 w-[4px] h-14 rounded-l-md bg-[#8f8a82] shadow-sm" />
        <div className="hidden sm:block absolute -left-[14px] top-64 w-[4px] h-14 rounded-l-md bg-[#8f8a82] shadow-sm" />

        {/* Right Side Button */}
        <div className="hidden sm:block absolute -right-[14px] top-40 w-[4px] h-20 rounded-r-md bg-[#8f8a82] shadow-sm" />

        {/* Outer Titanium Chassis */}
        <div
          className={`relative w-[375px] sm:w-[412px] h-[812px] sm:h-[860px] rounded-[52px] sm:rounded-[58px] p-[10px] sm:p-[12px] border-[3.5px] ${currentStyles.outer} bg-[#111111] overflow-hidden flex flex-col`}
        >
          {/* Subtle Titanium Bezel Highlight */}
          <div className="absolute inset-0 rounded-[48px] sm:rounded-[54px] pointer-events-none ring-1 ring-white/20 z-30" />

          {/* Inner Display Screen with Rounded Corners (Pure Luminous White Background) */}
          <div className="relative w-full h-full rounded-[42px] sm:rounded-[46px] overflow-hidden bg-white text-[#111111] flex flex-col z-10 shadow-inner">

            {/* iOS Status Bar + Dynamic Island */}
            <div className="relative z-40 w-full pt-3 pb-1.5 px-6 flex items-center justify-between bg-white border-b border-[#c5e19b]/30 select-none shrink-0 text-[#111111]">
              {/* Left: Time & Location */}
              <div className="w-16 flex items-center gap-1">
                <span className="font-extrabold text-xs tracking-tight text-[#111111] tabular-nums">
                  {currentTime}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#75b025]" />
              </div>

              {/* Center: Interactive Dynamic Island */}
              <div
                onClick={() => setIsDynamicIslandExpanded(!isDynamicIslandExpanded)}
                className={`cursor-pointer transition-all duration-300 ease-out bg-black text-white flex items-center justify-between px-3 ${
                  isDynamicIslandExpanded
                    ? 'w-56 h-8 rounded-full shadow-lg ring-1 ring-white/20'
                    : 'w-28 h-6 rounded-full'
                }`}
                title="Dynamic Island interactiva"
              >
                {isDynamicIslandExpanded ? (
                  <div className="w-full flex items-center justify-between text-[10px] font-bold px-1">
                    <span className="text-[#c5e19b] truncate">{restaurantName}</span>
                    <span className="opacity-80">{tableName}</span>
                    <div className="w-2 h-2 rounded-full bg-[#c5e19b] animate-pulse" />
                  </div>
                ) : (
                  <>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e] ring-1 ring-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#183921] ring-1 ring-[#c5e19b]/50" />
                  </>
                )}
              </div>

              {/* Right: Cellular, WiFi, Battery */}
              <div className="w-16 flex items-center justify-end gap-1.5 text-[#111111]">
                <span className="text-[10px] font-black tracking-tight">5G</span>
                <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] tabular-nums font-bold">98%</span>
                  <BatteryMedium className="w-4 h-4 stroke-[2.2]" />
                </div>
              </div>
            </div>

            {/* iOS Safari Web Address Bar (URL pill for authentic mobile web app experience) */}
            <div className="relative z-30 w-full px-4 py-1.5 bg-white border-b border-[#c5e19b]/30 flex items-center justify-between gap-2 shrink-0">
              <div className="flex-1 flex items-center justify-center gap-1.5 py-1 px-3 rounded-full bg-[#eef7e3] border border-[#c5e19b] text-[11px] text-[#111111]">
                <Lock className="w-3 h-3 text-[#5e8b23] stroke-[2.5]" />
                <span className="font-bold tracking-tight truncate">
                  gusto.cl/{tableName.toLowerCase().replace(' ', '-')}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#111111]">
                <button
                  onClick={() => window.location.reload()}
                  className="p-1 hover:text-[#5e8b23]"
                  title="Recargar página"
                >
                  <RotateCw className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Scrollable Viewport Content */}
            <div className="relative flex-1 w-full overflow-y-auto no-scrollbar scroll-smooth bg-white">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="relative z-40 w-full py-2 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none flex justify-center shrink-0">
              <div className="w-32 sm:w-36 h-1 rounded-full bg-black/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
