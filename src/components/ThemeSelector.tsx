'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useTheme, THEME_OPTIONS, ThemeMode } from '@/context/ThemeContext';

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full text-[#A7A7A7] hover:text-[#F5F3EF] hover:bg-white/10 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#E50914]/50"
        aria-label="Select website color theme"
        title="Theme Selector"
      >
        <Palette className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#121212]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 border-b border-white/10 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#A7A7A7]">
              COLOR SKIN
            </span>
          </div>

          <div className="space-y-0.5">
            {THEME_OPTIONS.map((opt) => {
              const isSelected = theme === opt.id;

              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-white/10 text-[#F5F3EF]'
                      : 'text-[#A7A7A7] hover:text-[#F5F3EF] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full border border-white/20 shrink-0 shadow-sm"
                      style={{ backgroundColor: opt.bgHex, borderColor: opt.accentHex }}
                    />
                    <span>{opt.name}</span>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-[#E50914]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
