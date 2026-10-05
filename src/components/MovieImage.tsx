'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AlertCircle, Film, Image as ImageIcon } from 'lucide-react';

interface MovieImageProps {
  src: string;
  alt: string;
  title?: string;
  type: 'poster' | 'backdrop';
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}

export default function MovieImage({
  src,
  alt,
  title,
  type,
  className = '',
  objectPosition,
}: MovieImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const isPoster = type === 'poster';
  const aspectClass = isPoster ? 'aspect-[2/3]' : 'aspect-[16/9]';

  // Check if image is already cached/loaded when mounted or src changes
  useEffect(() => {
    setHasError(false);
    if (imgRef.current && imgRef.current.complete) {
      if (imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else if (imgRef.current.naturalWidth === 0) {
        setHasError(true);
      }
    }
  }, [src]);

  if (hasError || !src) {
    return (
      <div
        className={`relative w-full ${aspectClass} bg-gradient-to-br from-[#1c1c1c] via-[#121212] to-[#090909] border border-white/10 rounded-lg overflow-hidden flex flex-col items-center justify-between p-4 text-center select-none ${className}`}
      >
        {/* Decorative background overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Header Missing Badge */}
        <div className="w-full flex items-center justify-between z-10">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-wider">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Asset Missing
          </span>
          <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-widest">
            {type}
          </span>
        </div>

        {/* Center Graphic & Title */}
        <div className="my-auto z-10 flex flex-col items-center gap-2 px-2">
          <div className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-400">
            {isPoster ? <Film className="w-6 h-6" /> : <ImageIcon className="w-8 h-8" />}
          </div>
          <p className="font-display font-bold text-sm sm:text-base text-[#F5F3EF] line-clamp-2 leading-tight">
            {title || alt}
          </p>
          <p className="text-[11px] text-[#A7A7A7] font-mono truncate max-w-[200px]">
            {src}
          </p>
        </div>

        {/* Footer info */}
        <div className="w-full z-10 pt-2 border-t border-white/5 flex items-center justify-center">
          <span className="text-[9px] text-[#A7A7A7]/70 tracking-widest font-mono">
            RuvOra ASSET SYSTEM
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#101010] ${className}`}>
      {/* Loading Skeleton - hides once loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center z-0">
          <Film className="w-6 h-6 text-neutral-700 animate-bounce" />
        </div>
      )}
      
      {/* Real Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={objectPosition ? { objectPosition } : undefined}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover relative z-10 transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
