'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Movie } from '@/data/movies';
import MovieImage from './MovieImage';
import { Star } from 'lucide-react';

interface FilmstripProps {
  movies: Movie[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function Filmstrip({ movies, activeIndex, onSelect }: FilmstripProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#A7A7A7]">
          FEATURED SELECTION ({activeIndex + 1} / {movies.length})
        </span>
        <span className="text-[10px] font-mono text-neutral-500 hidden sm:inline">
          Click to switch hero experience
        </span>
      </div>

      {/* Horizontal Scrollable Filmstrip */}
      <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pb-2 pt-1">
        {movies.map((movie, idx) => {
          const isSelected = idx === activeIndex;

          return (
            <motion.div
              key={movie.slug}
              onClick={() => onSelect(idx)}
              whileHover={{ scale: isSelected ? 1 : 1.03, y: isSelected ? 0 : -2 }}
              transition={{ duration: 0.2 }}
              className={`flex-none w-[180px] sm:w-[210px] cursor-pointer rounded-xl p-2 transition-all duration-300 border flex items-center gap-3 ${
                isSelected
                  ? 'bg-black/80 backdrop-blur-md border-[#E50914] shadow-lg shadow-red-950/40 ring-1 ring-[#E50914]/40'
                  : 'bg-black/35 backdrop-blur-sm border-white/10 hover:border-white/30 hover:bg-black/60'
              }`}
            >
              {/* Poster Thumbnail */}
              <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0 shadow-md relative">
                <MovieImage
                  src={movie.poster}
                  alt={movie.title}
                  title={movie.title}
                  type="poster"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie info */}
              <div className="flex-1 min-w-0">
                <h4
                  className={`font-display text-xs sm:text-sm font-bold truncate transition-colors ${
                    isSelected ? 'text-[#F5F3EF]' : 'text-neutral-400'
                  }`}
                >
                  {movie.title}
                </h4>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-[#A7A7A7] font-mono">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span className="text-amber-400 font-semibold flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    {movie.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
