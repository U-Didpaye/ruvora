'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Search, Menu, X } from 'lucide-react';
import SearchModal from './SearchModal';
import ThemeSelector from './ThemeSelector';

export default function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsAtTop(true);
        setIsVisible(true);
      } else {
        setIsAtTop(false);

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Movies', href: '/#movies' },
    { label: 'Collections', href: '/#collections' },
    { label: 'RuvOra AI', href: '/ai', isAI: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isAtTop
            ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4'
            : 'bg-[#070707]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          {/* Brand Logo - RuvOra Transparent Wordmark */}
          <Link href="/" className="flex items-center group">
            <img
              src="/ruvora-wordmark.png"
              alt="RuvOra"
              className="w-[125px] sm:w-[155px] h-auto object-contain transition-opacity hover:opacity-90"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              if (link.isAI) {
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/40 text-violet-300 hover:text-white hover:bg-violet-600/30 hover:border-violet-400 font-medium text-xs sm:text-sm transition-all duration-200 glow-violet"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    isActive ? 'text-[#F5F3EF]' : 'text-[#A7A7A7] hover:text-[#F5F3EF]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Selector */}
            <ThemeSelector />

            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full text-[#A7A7A7] hover:text-[#F5F3EF] hover:bg-white/10 transition-all duration-200"
              aria-label="Search movies"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* User Profile Avatar Placeholder */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 border border-white/20 flex items-center justify-center text-[10px] font-semibold text-neutral-300 cursor-pointer hover:border-white/40 transition-colors">
              RO
            </div>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeSelector />
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 text-[#A7A7A7] hover:text-[#F5F3EF]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#A7A7A7] hover:text-[#F5F3EF]"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 mt-2 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-base font-medium flex items-center justify-between ${
                  link.isAI
                    ? 'bg-violet-900/30 text-violet-300 border border-violet-500/30'
                    : 'text-[#F5F3EF] hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.isAI && <Sparkles className="w-4 h-4 text-violet-400" />}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Quick Search Modal */}
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
