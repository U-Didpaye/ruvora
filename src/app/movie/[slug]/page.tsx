import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Clock, Sparkles, Play, Plus, ArrowLeft, Film, CheckCircle2, Target } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MovieImage from '@/components/MovieImage';
import MovieCard from '@/components/MovieCard';
import { getMovieBySlug, getSimilarMovies, movies } from '@/data/movies';

export async function generateStaticParams() {
  return movies.map((movie) => ({
    slug: movie.slug,
  }));
}

export default async function MovieDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const movie = getMovieBySlug(slug);

  if (!movie) {
    notFound();
  }

  const similarMovies = getSimilarMovies(movie.slug, 4);

  return (
    <div className="min-h-screen bg-[#070707] text-[#F5F3EF] flex flex-col selection:bg-[#E50914] selection:text-white">
      {/* Sticky Navbar */}
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Backdrop Banner */}
        <section className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-end pb-12 overflow-hidden bg-[#070707]">
          {/* Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <MovieImage
              src={movie.backdrop}
              alt={movie.title}
              title={movie.title}
              type="backdrop"
              className="w-full h-full object-cover object-center"
            />
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/60 to-transparent" />
          </div>

          {/* Breadcrumb Back Button */}
          <div className="absolute top-8 left-4 sm:left-8 z-20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-mono text-neutral-300 hover:text-white hover:border-white/40 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Library</span>
            </Link>
          </div>

          {/* Banner Title Details */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#E50914] text-xs font-mono font-bold uppercase tracking-widest">
                CINEMATIC DETAIL
              </span>
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {movie.rating} IMDb
              </span>
              <span className="text-xs font-mono text-[#A7A7A7]">{movie.year}</span>
              <span className="text-xs font-mono text-[#A7A7A7] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {movie.runtime}
              </span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-[#F5F3EF] uppercase tracking-tight leading-none drop-shadow-2xl">
              {movie.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 font-semibold italic mt-3 max-w-3xl">
              "{movie.tagline}"
            </p>
          </div>
        </section>

        {/* Main Details Body */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Poster & Action Buttons Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-neutral-900">
                <MovieImage
                  src={movie.poster}
                  alt={movie.title}
                  title={movie.title}
                  type="poster"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' official trailer')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#E50914] hover:bg-[#ff121d] text-white font-display font-bold text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-red-950/40"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Official Trailer</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-[#F5F3EF] font-display font-medium text-xs flex items-center justify-center gap-1.5 transition-all">
                    <Plus className="w-4 h-4 text-neutral-400" />
                    <span>Watchlist</span>
                  </button>

                  <Link
                    href={`/ai?prompt=${encodeURIComponent('Tell me about ' + movie.title)}`}
                    className="py-3 px-4 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/40 text-violet-300 font-display font-semibold text-xs flex items-center justify-center gap-1.5 transition-all glow-violet"
                  >
                    <Sparkles className="w-4 h-4 text-violet-400" />
                    <span>Ask AI</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-8 space-y-8">
              {/* Director & Genres bar */}
              <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-widest block">
                    DIRECTOR
                  </span>
                  <span className="font-display font-bold text-sm text-[#F5F3EF]">
                    {movie.director}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-widest block">
                    RELEASE YEAR
                  </span>
                  <span className="font-display font-bold text-sm text-[#F5F3EF]">
                    {movie.year}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-widest block">
                    RUNTIME
                  </span>
                  <span className="font-display font-bold text-sm text-[#F5F3EF]">
                    {movie.runtime}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#A7A7A7] uppercase tracking-widest block">
                    RATING
                  </span>
                  <span className="font-display font-bold text-sm text-amber-400 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    {movie.rating} / 10
                  </span>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-3">
                <h2 className="font-display font-bold text-xl text-[#F5F3EF] tracking-tight">
                  Overview
                </h2>
                <p className="text-base text-neutral-300 leading-relaxed font-sans">
                  {movie.description}
                </p>
              </div>

              {/* Why Watch & Best For Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#151515] border border-white/10 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    WHY WATCH
                  </h3>
                  <ul className="space-y-2">
                    {movie.whyWatch.map((item, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-[#151515] border border-white/10 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400 flex items-center gap-2">
                    <Target className="w-4 h-4 text-sky-400" />
                    BEST FOR
                  </h3>
                  <ul className="space-y-2">
                    {movie.bestFor.map((item, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-neutral-300 flex items-start gap-2">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RUWORA AI Insight Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-950/40 via-purple-950/30 to-[#121212] border border-violet-500/30 space-y-3 glow-violet">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-400" />
                  <h3 className="font-display font-bold text-sm text-violet-300 tracking-wider uppercase">
                    RuvOra AI INSIGHT
                  </h3>
                </div>
                <p className="text-sm text-[#F5F3EF] font-sans leading-relaxed italic">
                  "{movie.aiInsight}"
                </p>
              </div>
            </div>
          </div>

          {/* Similar Movies Section */}
          {similarMovies.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/10 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#E50914]">
                  RECOMMENDED
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F3EF] mt-1">
                  Similar Cinematic Experiences
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {similarMovies.map((m) => (
                  <MovieCard key={m.slug} movie={m} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
