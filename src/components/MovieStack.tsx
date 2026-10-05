'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '@/data/movies';
import MovieImage from './MovieImage';
import { Sparkles } from 'lucide-react';

interface MovieStackProps {
  movies: Movie[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function MovieStack({ movies, activeIndex, onSelect }: MovieStackProps) {
  return (
    <div className="relative w-full max-w-sm flex flex-col gap-3 py-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A7A7A7]">
          FEATURED SELECTION
        </span>
        <span className="text-[11px] font-mono text-neutral-500">
          0{activeIndex + 1} / 0{movies.length}
        </span>
      </div>

      <div className="space-y-2.5">
        {movies.map((movie, idx) => {
          const isActive = idx === activeIndex;

          return (
            <motion.div
              key={movie.slug}
              onClick={() => onSelect(idx)}
              whileHover={{ scale: isActive ? 1 : 1.02, x: isActive ? 0 : 4 }}
              transition={{ duration: 0.2 }}
              className={`relative cursor-pointer rounded-xl p-2.5 transition-all duration-300 flex items-center gap-3.5 border ${
                isActive
                  ? 'bg-black/75 backdrop-blur-md border-[#E50914] shadow-xl shadow-red-950/30'
                  : 'bg-black/30 backdrop-blur-sm border-white/10 hover:border-white/25 hover:bg-black/50'
              }`}
            >
              {/* Active Indicator Bar */}
              {isActive && (
                <motion.div
                  layoutId="activeStackBar"
                  className="absolute left-0 top-2 bottom-2 w-1 bg-[#E50914] rounded-r-full"
                />
              )}

              {/* Poster thumbnail */}
              <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 relative shadow-md">
                <MovieImage
                  src={movie.poster}
                  alt={movie.title}
                  title={movie.title}
                  type="poster"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie info */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <h4
                    className={`font-display text-sm font-bold truncate transition-colors ${
                      isActive ? 'text-[#F5F3EF]' : 'text-neutral-400'
                    }`}
                  >
                    {movie.title}
                  </h4>
                  {isActive && (
                    <Sparkles className="w-3.5 h-3.5 text-[#E50914] shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#A7A7A7] font-mono">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.genres[0]}</span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold">★ {movie.rating}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
