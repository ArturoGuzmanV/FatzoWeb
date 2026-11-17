import React, { useState } from 'react';

interface CulinaryImageProps {
  type?: string;
  name: string;
  imageUrl?: string;
  className?: string;
  aspect?: 'square' | 'wide' | 'tall';
}

export const CulinaryImage: React.FC<CulinaryImageProps> = ({
  name,
  imageUrl,
  className = '',
  aspect = 'square',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Fallback to local image based on name/type if not directly passed
  const getResolvedSrc = () => {
    if (imageUrl) return imageUrl;
    return '/images/pizza_artesanal.jpg';
  };

  const imageSrc = getResolvedSrc();
  const aspectClass = aspect === 'wide' ? 'aspect-[16/9]' : aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-square';

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-[#eef7e3] ${aspectClass} ${className}`}>
      {/* Blurred green placeholder skeleton while loading */}
      {!loaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#dcedc2] via-[#e8f6d7] to-[#c5e19b]/40 animate-pulse" />
      )}

      {!hasError ? (
        <img
          src={imageSrc}
          alt={name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 ease-out ${
            loaded ? 'opacity-100 scale-100 filter-none' : 'opacity-0 scale-105 blur-md'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#eef7e3] text-[#2d3a24] p-2 text-center">
          <span className="font-serif text-xs font-semibold">{name}</span>
        </div>
      )}
    </div>
  );
};
