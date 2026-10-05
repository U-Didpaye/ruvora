'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AISection from '@/components/AISection';
import MovieCarousel from '@/components/MovieCarousel';
import CollectionsSection from '@/components/CollectionsSection';
import Footer from '@/components/Footer';
import OpeningIntro from '@/components/OpeningIntro';
import { movies } from '@/data/movies';

export default function HomePage() {
  const trendingMovies = movies.slice(0, 8);
  const curatedMovies = movies.slice(4, 12);

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#E50914] selection:text-white">
      {/* 2-3s Cinematic Opening Intro */}
      <OpeningIntro />

      {/* Top Sticky Transparent Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow space-y-12">
        {/* 1. Cinematic Hero with Horizontal Filmstrip */}
        <Hero />

        {/* 2. Trending Now Row */}
        <div id="movies" className="pt-2">
          <MovieCarousel
            title="Trending Now"
            subtitle="The most discussed and celebrated films on RuvOra."
            movies={trendingMovies}
          />
        </div>

        {/* 3. Curated For You Row */}
        <MovieCarousel
          title="Curated For You"
          subtitle="Stories selected for your cinematic mood."
          movies={curatedMovies}
        />

        {/* 4. Editorial Collections */}
        <div id="collections">
          <CollectionsSection />
        </div>

        {/* 5. RuvOra AI Feature Section (Near Bottom) */}
        <AISection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
