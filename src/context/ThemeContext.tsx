'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'cinematic-dark' | 'warm-ivory' | 'midnight-blue' | 'slate-purple';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  bgHex: string;
  accentHex: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'cinematic-dark', name: 'Cinematic Dark', bgHex: '#070707', accentHex: '#E50914' },
  { id: 'warm-ivory', name: 'Warm Ivory', bgHex: '#F4F1EB', accentHex: '#A51D2D' },
  { id: 'midnight-blue', name: 'Midnight Blue', bgHex: '#06111C', accentHex: '#2387C9' },
  { id: 'slate-purple', name: 'Slate Purple', bgHex: '#111018', accentHex: '#C04B55' },
];

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'cinematic-dark',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('cinematic-dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('ruvora_theme') as ThemeMode;
    if (savedTheme && THEME_OPTIONS.some((t) => t.id === savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-theme', 'cinematic-dark');
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem('ruvora_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
