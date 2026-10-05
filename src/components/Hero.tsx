'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Plus, Check, ChevronLeft, ChevronRight, Sparkles, Star, Clock } from 'lucide-react';
import { heroMovies } from '@/data/movies';
import MovieImage from './MovieImage';
import Filmstrip from './Filmstrip';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Auto rotation timer (5.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const currentMovie = heroMovies[activeIndex];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % heroMovies.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);

  return (
    <section className="relative w-full min-h-[640px] lg:min-h-[700px] flex flex-col justify-between pt-20 pb-4 overflow-hidden bg-[#070707]">
      {/* Background Full-Width Animated Backdrop */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMovie.slug}
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.99 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <MovieImage
            src={currentMovie.backdrop}
            alt={currentMovie.title}
            title={currentMovie.title}
            type="backdrop"
            objectPosition={currentMovie.backdropPosition || 'center center'}
            className="w-full h-full object-cover scale-100"
          />

          {/* Controlled Left-to-Right Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/80 via-45% to-transparent pointer-events-none" />
          {/* Top & Bottom Atmospheric Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/60 via-transparent to-[#070707] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-6 sm:pt-10 my-auto">
        <div className="max-w-[580px] space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMovie.slug + '-info'}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-3.5"
            >
              {/* Top Tag & Metadata */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-[10px] font-mono font-bold tracking-widest uppercase">
                  FEATURED MOVIE
                </span>
                <span className="text-xs font-mono text-amber-400 flex items-center gap-1 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {currentMovie.rating} IMDb
                </span>
                <span className="text-xs font-mono text-[#A7A7A7]">{currentMovie.year}</span>
                <span className="text-xs font-mono text-[#A7A7A7] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {currentMovie.runtime}
                </span>
              </div>

              {/* Movie Title */}
              <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#F5F3EF] tracking-tight leading-tight uppercase drop-shadow-lg">
                {currentMovie.title}
              </h1>

              {/* Genre Pills */}
              <div className="flex flex-wrap gap-2 pt-0.5">
                {currentMovie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/10 text-xs font-mono text-[#F5F3EF]"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Tagline & Synopsis */}
              <div className="space-y-1.5">
                <p className="text-xs sm:text-sm font-semibold text-neutral-300 italic font-sans border-l-2 border-[#E50914] pl-2.5">
                  "{currentMovie.tagline}"
                </p>
                <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed line-clamp-3">
                  {currentMovie.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href={`/movie/${currentMovie.slug}`}
                  className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#ff121d] text-white font-display font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 transition-all duration-200 shadow-lg shadow-red-900/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Explore Movie</span>
                </Link>

                <button
                  onClick={() => setIsAdded(!isAdded)}
                  className={`px-4 py-3 rounded-xl font-display font-medium text-xs sm:text-sm flex items-center gap-2 border transition-all duration-200 ${
                    isAdded
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-[#F5F3EF]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to List</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 text-neutral-400" />
                      <span>Add to List</span>
                    </>
                  )}
                </button>

                <Link
                  href="/ai"
                  className="px-4 py-3 rounded-xl bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:bg-violet-600/30 font-display text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all glow-violet"
                >
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <span>Ask RuvOra</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Horizontal Filmstrip Component */}
      <div className="relative z-10 pt-4">
        <Filmstrip
          movies={heroMovies}
          activeIndex={activeIndex}
          onSelect={(idx) => setActiveIndex(idx)}
        />
      </div>
    </section>
  );
}
