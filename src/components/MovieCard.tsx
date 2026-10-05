'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, Clock, Sparkles } from 'lucide-react';
import { Movie } from '@/data/movies';
import MovieImage from './MovieImage';

interface MovieCardProps {
  movie: Movie;
  featuredBadge?: boolean;
}

export default function MovieCard({ movie, featuredBadge = false }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative rounded-xl overflow-hidden bg-[#151515] border border-white/10 hover:border-white/25 shadow-lg group-hover:shadow-2xl transition-all duration-300"
      >
        {/* Poster Container */}
        <div className="relative w-full aspect-[2/3] overflow-hidden bg-neutral-900">
          <MovieImage
            src={movie.poster}
            alt={movie.title}
            title={movie.title}
            type="poster"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Hover Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
            {featuredBadge && movie.featured && (
              <span className="px-2 py-0.5 rounded bg-[#E50914] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                TOP 5
              </span>
            )}
            <div className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 text-amber-400 font-mono text-xs font-semibold">
              <Star className="w-3 h-3 fill-amber-400" />
              <span>{movie.rating}</span>
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10 flex flex-col gap-1.5 transform group-hover:translate-y-0 transition-transform duration-300">
            <span className="text-[11px] font-mono text-[#A7A7A7] uppercase tracking-wider truncate">
              {movie.genres.slice(0, 2).join(' • ')}
            </span>

            <h3 className="font-display font-bold text-base sm:text-lg text-[#F5F3EF] group-hover:text-white transition-colors leading-tight line-clamp-1">
              {movie.title}
            </h3>

            {/* Metadata bar revealed */}
            <div className="flex items-center justify-between text-xs text-[#A7A7A7] font-mono pt-1 border-t border-white/10">
              <span>{movie.year}</span>
              <span className="flex items-center gap-1 text-neutral-400">
                <Clock className="w-3 h-3" />
                {movie.runtime}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
