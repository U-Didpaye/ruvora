'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OpeningIntroProps {
  onComplete?: () => void;
}

type IntroStage = 'black' | 'wordmark' | 'tagline' | 'wipe' | 'reveal' | 'done';

export default function OpeningIntro({ onComplete }: OpeningIntroProps) {
  const [stage, setStage] = useState<IntroStage>('black');

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setStage('done');
      if (onComplete) onComplete();
      return;
    }

    // Check if intro has already played in this browser session
    const hasPlayed = sessionStorage.getItem('ruvora_intro_played');
    if (hasPlayed) {
      setStage('done');
      if (onComplete) onComplete();
      return;
    }

    // TIMELINE SEQUENCE (Total ~5.2 seconds):
    // 1. BLACK SCREEN: 0.0s - 0.8s
    // 2. WORDMARK REVEAL & BRAND HOLD: 0.8s - 2.5s
    // 3. TAGLINE REVEAL: 2.5s - 3.2s
    // 4. CINEMATIC WIPE: 3.2s - 4.2s
    // 5. HERO REVEAL: 4.2s - 5.4s
    const t1 = setTimeout(() => setStage('wordmark'), 800);
    const t2 = setTimeout(() => setStage('tagline'), 2500);
    const t3 = setTimeout(() => setStage('wipe'), 3200);
    const t4 = setTimeout(() => setStage('reveal'), 4200);
    const t5 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('ruvora_intro_played', 'true');
      if (onComplete) onComplete();
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage('done');
    sessionStorage.setItem('ruvora_intro_played', 'true');
    if (onComplete) onComplete();
  };

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      {(stage === 'black' || stage === 'wordmark' || stage === 'tagline' || stage === 'wipe' || stage === 'reveal') && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === 'reveal' ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: stage === 'reveal' ? 1.2 : 0.3, ease: 'easeInOut' }}
          onClick={handleSkip}
          className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none"
        >
          {/* Subtle film grain / atmospheric background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.07)_0%,transparent_65%)] pointer-events-none" />

          {/* Center Brand Container */}
          <div className="relative flex flex-col items-center justify-center space-y-5 px-4 text-center z-10">
            {/* STAGE 2: RuvOra Wordmark Reveal & Brand Hold */}
            {(stage === 'wordmark' || stage === 'tagline' || stage === 'wipe') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="relative overflow-hidden py-2 px-6"
              >
                <img
                  src="/ruvora-wordmark.png"
                  alt="RuvOra"
                  className="w-[190px] sm:w-[260px] h-auto object-contain"
                />

                {/* Red Light Sweep Layer across the wordmark */}
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E50914]/50 to-transparent skew-x-12 pointer-events-none"
                />
              </motion.div>
            )}

            {/* STAGE 3: Tagline Reveal */}
            {(stage === 'tagline' || stage === 'wipe') && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="font-mono text-xs sm:text-sm font-semibold tracking-[0.32em] uppercase text-neutral-400"
              >
                WHERE CINEMA MEETS INTELLIGENCE
              </motion.p>
            )}
          </div>

          {/* STAGE 4: Cinematic Red Light Horizontal Wipe */}
          {stage === 'wipe' && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: [0, 0.9, 0] }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
              className="absolute inset-y-0 inset-x-0 bg-gradient-to-r from-transparent via-[#E50914] to-transparent z-20 pointer-events-none origin-center"
            />
          )}

          {/* Skip Instruction */}
          <div className="absolute bottom-6 right-6 z-30">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
              Click anywhere to skip
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
