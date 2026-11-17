import React, { useState } from 'react';
import { Utensils } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Resilient image component adhering to the Zero-Broken-Image Policy.
 * Renders a styled Gustō pistachio surface fallback if the asset fails to load.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#eef7e3] to-[#dcedc2] text-[#2c3b24] p-4 text-center ${className}`}
      >
        <Utensils className="w-5 h-5 opacity-70" aria-hidden="true" />
        <span className="font-serif text-xs font-semibold leading-snug max-w-[16ch]">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};
