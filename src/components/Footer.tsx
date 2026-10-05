'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12 text-[#A7A7A7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center group">
              <img
                src="/ruvora-wordmark.png"
                alt="RuvOra"
                className="w-[140px] h-auto object-contain transition-opacity hover:opacity-90"
              />
            </Link>
            <p className="text-sm font-display text-neutral-300 font-semibold">
              Cinema, reimagined.
            </p>
            <p className="text-xs text-[#A7A7A7] font-mono">
              Know more. Watch better. Powered by RuvOra AI.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#movies" className="hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="/#collections" className="hover:text-white transition-colors">
              Collections
            </Link>
            <Link href="/ai" className="text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>RuvOra AI</span>
            </Link>
          </div>
        </div>

        {/* ABSOLUTE LAST VISIBLE CONTENT ON THE ENTIRE WEBSITE */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-xs sm:text-sm font-sans font-medium text-neutral-400 tracking-wide">
            Built by Ujwal Didpaye, with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
