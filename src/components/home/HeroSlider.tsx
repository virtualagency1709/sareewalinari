'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '@/data/heroSlides';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = HERO_SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const slide = HERO_SLIDES[current];

  return (
    <div
      className="relative w-full h-[650px] md:h-[720px] lg:h-[780px] bg-[#171316] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      role="region"
      aria-label="Editorial Brand Highlights Carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background image with gentle cinematic zoom */}
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>

          {/* Luxury Editorial Dark Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

          {/* Content Container */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              {/* Badge */}
              {slide.badge && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E3F]/80 backdrop-blur-md border border-[#F3E5AB]/40 text-[#F3E5AB] text-xs font-semibold tracking-[0.2em] uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB]" />
                  <span>{slide.badge}</span>
                </motion.div>
              )}

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
                className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight drop-shadow-md"
              >
                {slide.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-base sm:text-lg md:text-xl text-[#FBE9EE]/90 leading-relaxed max-w-xl font-light drop-shadow-sm"
              >
                {slide.description}
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Link
                  href={slide.ctaLink}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#A51D36] to-[#70152B] hover:from-[#8B1E3F] hover:to-[#5c0f22] text-[#FFF9F7] text-xs sm:text-sm font-semibold tracking-widest uppercase transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 group border border-[#F3E5AB]/30"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/collections/all-sarees"
                  className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all border border-white/20"
                >
                  View Catalog
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-20 pointer-events-none">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="pointer-events-auto p-3 md:p-3.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-20 pointer-events-none">
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="pointer-events-auto p-3 md:p-3.5 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md text-white border border-white/20 transition-all hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Animated Pagination Indicators */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex justify-center items-center gap-3">
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}: ${s.title}`}
            className="group relative py-2"
          >
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                current === idx
                  ? 'w-10 bg-[#F3E5AB]'
                  : 'w-3 bg-white/40 group-hover:bg-white/70'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
