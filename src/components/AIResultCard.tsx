'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Sparkles, CheckCircle2, Target, Film, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface AIResponseData {
  title: string;
  year: string;
  genres: string[];
  director: string;
  runtime: string;
  overview: string;
  whyWatch: string[];
  bestFor: string[];
  aiVerdict: string;
  slug?: string;
}

interface AIResultCardProps {
  data: AIResponseData;
}

export default function AIResultCard({ data }: AIResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#181524] via-[#12101b] to-[#0d0b14] border border-violet-500/30 p-6 sm:p-8 shadow-2xl shadow-purple-950/40 glow-violet overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b border-violet-500/20 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              RuvOra AI INTELLIGENCE CARD
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F5F3EF] tracking-tight uppercase mt-2">
            {data.title}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A7A7A7] mt-2">
            <span>{data.year}</span>
            <span>•</span>
            <span>{data.genres.join(' / ')}</span>
            <span>•</span>
            <span>{data.runtime}</span>
            <span>•</span>
            <span>Dir. {data.director}</span>
          </div>
        </div>

        {data.slug && (
          <Link
            href={`/movie/${data.slug}`}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
          >
            <span>View Full Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 pt-6">
        {/* Left: Overview */}
        <div className="md:col-span-12">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-violet-400 mb-2">
            OVERVIEW
          </h3>
          <p className="text-sm sm:text-base text-[#F5F3EF]/90 leading-relaxed font-sans">
            {data.overview}
          </p>
        </div>

        {/* Why Watch List */}
        <div className="md:col-span-6 space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            WHY WATCH
          </h3>
          <ul className="space-y-2">
            {data.whyWatch.map((item, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best For List */}
        <div className="md:col-span-6 space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 flex items-center gap-2">
            <Target className="w-4 h-4 text-sky-400" />
            BEST FOR
          </h3>
          <ul className="space-y-2">
            {data.bestFor.map((item, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2">
                <span className="text-sky-400 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RUWORA Verdict */}
        <div className="md:col-span-12 mt-2 p-5 rounded-xl bg-gradient-to-r from-violet-950/60 to-purple-950/60 border border-violet-500/40">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              RuvOra VERDICT
            </h3>
            <div className="flex gap-1 text-amber-400 text-sm">
              {'★'.repeat(5)}
            </div>
          </div>
          <p className="text-sm text-neutral-200 font-sans italic leading-relaxed">
            "{data.aiVerdict}"
          </p>
        </div>
      </div>
    </motion.div>
  );
}
