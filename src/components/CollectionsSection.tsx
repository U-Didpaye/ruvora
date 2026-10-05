'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Compass, Flame, Moon, Award } from 'lucide-react';
import { movies } from '@/data/movies';

export default function CollectionsSection() {
  const collections = [
    {
      id: 'masterpieces',
      title: 'MASTERPIECES',
      subtitle: 'Films that stay with you.',
      icon: Award,
      color: 'from-amber-950/40 via-red-950/20 to-neutral-900',
      borderColor: 'border-amber-500/30 hover:border-amber-500/60',
      accent: 'text-amber-400',
      sampleMovies: movies.filter((m) => ['oppenheimer', 'the-dark-knight', 'interstellar'].includes(m.slug)),
    },
    {
      id: 'beyond-earth',
      title: 'BEYOND EARTH',
      subtitle: 'Stories that look beyond the horizon.',
      icon: Compass,
      color: 'from-sky-950/40 via-indigo-950/20 to-neutral-900',
      borderColor: 'border-sky-500/30 hover:border-sky-500/60',
      accent: 'text-sky-400',
      sampleMovies: movies.filter((m) => ['dune-part-two', 'blade-runner-2049', 'the-martian', 'arrival'].includes(m.slug)),
    },
    {
      id: 'dark-brilliant',
      title: 'DARK & BRILLIANT',
      subtitle: "For nights when ordinary isn't enough.",
      icon: Moon,
      color: 'from-purple-950/40 via-neutral-950/40 to-neutral-900',
      borderColor: 'border-purple-500/30 hover:border-purple-500/60',
      accent: 'text-purple-400',
      sampleMovies: movies.filter((m) => ['the-prestige', 'inception', 'tenet'].includes(m.slug)),
    },
    {
      id: 'modern-classics',
      title: 'MODERN CLASSICS',
      subtitle: 'Movies that defined an era.',
      icon: Flame,
      color: 'from-red-950/40 via-amber-950/20 to-neutral-900',
      borderColor: 'border-red-500/30 hover:border-red-500/60',
      accent: 'text-red-400',
      sampleMovies: movies.filter((m) => ['whiplash', 'avatar', 'interstellar'].includes(m.slug)),
    },
  ];

  return (
    <section id="collections" className="py-16 bg-[#070707] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#E50914]">
            EDITORIAL CURATION
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F5F3EF] tracking-tight mt-1">
            Cinematic Collections
          </h2>
          <p className="text-sm text-[#A7A7A7] mt-1 font-sans">
            Hand-picked film selections categorized by narrative resonance and tone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((col) => {
            const Icon = col.icon;

            return (
              <motion.div
                key={col.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${col.color} border ${col.borderColor} transition-all duration-300 group flex flex-col justify-between overflow-hidden min-h-[220px] shadow-xl`}
              >
                {/* Background Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors pointer-events-none" />

                {/* Top Info */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${col.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl text-[#F5F3EF] group-hover:text-white tracking-wider">
                        {col.title}
                      </h3>
                      <p className="text-xs text-[#A7A7A7] font-sans mt-0.5">
                        {col.subtitle}
                      </p>
                    </div>
                  </div>

                  <span className="p-2 rounded-full bg-white/5 border border-white/10 text-neutral-400 group-hover:text-white group-hover:bg-white/15 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Included Film Pills */}
                <div className="relative z-10 pt-6">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                    INCLUDED FILMS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {col.sampleMovies.map((m) => (
                      <Link
                        key={m.slug}
                        href={`/movie/${m.slug}`}
                        className="px-3 py-1 rounded-lg bg-black/60 hover:bg-black/90 border border-white/10 text-xs font-mono text-[#F5F3EF] hover:border-white/30 transition-all"
                      >
                        {m.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
