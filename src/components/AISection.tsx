'use client';

import React, { useState } from 'react';
import { Sparkles, Search, Loader2, Film, AlertCircle, RefreshCw } from 'lucide-react';
import AIResultCard, { AIResponseData } from './AIResultCard';

export default function AISection() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AIResponseData | null>(null);

  const samplePrompts = [
    'What makes Interstellar worth watching?',
    'Is Oppenheimer worth watching?',
    'Explain Blade Runner 2049.',
    'Who directed Inception?',
  ];

  const handleSearch = async (promptToUse?: string) => {
    const finalPrompt = promptToUse || query;
    if (!finalPrompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/movie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: finalPrompt }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || 'Failed to fetch AI analysis');
      }

      setResult(json.data);
    } catch (err: any) {
      console.error('AI analysis error:', err);
      setError(err.message || 'RuvOra AI is temporarily unavailable. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section id="ai-section" className="py-20 bg-[#0a0812] relative overflow-hidden border-y border-violet-900/30">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold uppercase tracking-widest glow-violet">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>RuvOra AI ENGINE</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#F5F3EF] tracking-tight uppercase">
            RuvOra AI
          </h2>

          <p className="text-lg text-[#F5F3EF]/90 font-medium">
            Ask anything about a movie.
          </p>
          <p className="text-sm text-[#A7A7A7] font-sans">
            Understand what to watch, why it matters, and whether it belongs on your list.
          </p>
        </div>

        {/* Input & Search Bar */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="relative flex items-center bg-[#151322] border border-violet-500/40 rounded-2xl p-2 shadow-2xl focus-within:border-violet-400 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
            <Search className="w-6 h-6 text-violet-400 ml-4 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a movie (e.g. What makes Interstellar worth watching?)..."
              className="w-full bg-transparent text-[#F5F3EF] placeholder-neutral-500 font-sans text-base sm:text-lg focus:outline-none py-2"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isLoading || !query.trim()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 text-white font-display font-bold text-sm tracking-wide shrink-0 transition-all flex items-center gap-2 shadow-lg shadow-violet-950/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-violet-200" />
                  <span>Ask RuvOra</span>
                </>
              )}
            </button>
          </div>

          {/* Sample Prompts Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs font-mono text-[#A7A7A7] mr-1">Try:</span>
            {samplePrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => {
                  setQuery(prompt);
                  handleSearch(prompt);
                }}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-violet-900/40 border border-white/10 hover:border-violet-500/40 text-xs font-sans text-neutral-300 hover:text-white transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-violet-600/20 border border-violet-500/40 mx-auto flex items-center justify-center animate-pulse">
              <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
            </div>
            <p className="font-display font-bold text-lg text-[#F5F3EF]">
              Analyzing film with RuvOra AI...
            </p>
            <p className="text-xs font-mono text-[#A7A7A7]">
              Synthesizing directorial style, narrative themes, and viewer verdict
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-red-950/30 border border-red-500/40 text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
            <p className="font-display font-semibold text-base text-red-200">{error}</p>
            <button
              onClick={() => handleSearch()}
              className="px-4 py-2 rounded-lg bg-red-900/40 hover:bg-red-900/60 border border-red-500/40 text-xs font-mono text-red-200 inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Search</span>
            </button>
          </div>
        )}

        {/* Result Card */}
        {result && !isLoading && <AIResultCard data={result} />}
      </div>
    </section>
  );
}
