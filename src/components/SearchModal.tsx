'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, Film, ArrowRight } from 'lucide-react';
import { movies, Movie } from '@/data/movies';
import MovieImage from './MovieImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = movies.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q) ||
        m.genres.some((g) => g.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-white/10 bg-[#171717]">
          <Search className="w-5 h-5 text-neutral-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, directors, or genres (e.g. Nolan, Sci-Fi, Dune)..."
            className="w-full bg-transparent text-[#F5F3EF] placeholder-neutral-500 font-sans text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-neutral-400 hover:text-white mr-2">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-mono text-neutral-400 bg-white/5 border border-white/10 rounded-md hover:bg-white/10"
          >
            ESC
          </button>
        </div>

        {/* Search Results / Suggestions Container */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-4">
          {query.trim() === '' ? (
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#A7A7A7] mb-3">
                Featured Recommendations
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {movies.slice(0, 4).map((movie) => (
                  <Link
                    key={movie.slug}
                    href={`/movie/${movie.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden shrink-0">
                      <MovieImage
                        src={movie.poster}
                        alt={movie.title}
                        title={movie.title}
                        type="poster"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-display font-semibold text-sm text-[#F5F3EF] group-hover:text-[#E50914] transition-colors truncate">
                        {movie.title}
                      </h4>
                      <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">
                        {movie.year} • {movie.genres[0]}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* RUWORA AI Prompt Shortcut */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/ai"
                  onClick={onClose}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-violet-900/30 via-purple-900/20 to-transparent border border-violet-500/30 text-violet-200 hover:border-violet-400 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                    <div>
                      <p className="text-sm font-semibold font-display">Ask RuvOra AI Anything</p>
                      <p className="text-xs text-neutral-400">Deep cinematic insights & recommendations</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-mono text-[#A7A7A7] mb-2">
                Found {results.length} movie{results.length > 1 ? 's' : ''}
              </p>
              {results.map((movie) => (
                <Link
                  key={movie.slug}
                  href={`/movie/${movie.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group"
                >
                  <div className="w-14 h-20 rounded-lg overflow-hidden shrink-0">
                    <MovieImage
                      src={movie.poster}
                      alt={movie.title}
                      title={movie.title}
                      type="poster"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display font-bold text-base text-[#F5F3EF] group-hover:text-[#E50914] transition-colors truncate">
                        {movie.title}
                      </h4>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                        ★ {movie.rating}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#A7A7A7] mt-0.5">
                      {movie.year} • Dir. {movie.director} • {movie.runtime}
                    </p>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {movie.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-4 space-y-2">
              <Film className="w-10 h-10 text-neutral-600 mx-auto mb-2" />
              <p className="font-display text-[#F5F3EF] font-bold text-lg">No stories found.</p>
              <p className="text-xs text-[#A7A7A7] max-w-sm mx-auto font-sans">
                Try searching for another movie title, genre, or keyword.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
