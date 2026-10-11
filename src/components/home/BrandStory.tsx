'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Feather, Award, Heart } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="py-24 bg-[#FAF5F2] border-y border-[#D9A0AD]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#D9A0AD]/40">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
                alt="The Weave Heritage of Saree Wali Nari"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D9A0AD]/30">
                <p className="font-serif italic text-sm text-[#70152B] leading-snug">
                  &ldquo;A saree is not just nine yards of silk; it is an eternal bridge connecting ancestral memory with sovereign contemporary grace.&rdquo;
                </p>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B1E3F] mt-2 block">
                  — The Atelier Manifesto
                </span>
              </div>
            </div>

            {/* Overlapping Secondary Card with Logo */}
            <div className="hidden sm:flex absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl bg-white p-4 shadow-xl border border-[#D9A0AD]/30 flex-col items-center justify-center text-center">
              <div className="relative w-16 h-16 max-w-[64px] max-h-[64px] rounded-full overflow-hidden mb-2 bg-[#FFF9F7] border border-[#D9A0AD]/40">
                <Image
                  src="/images/logo.png"
                  alt="Saree Wali Nari"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain object-center"
                />
              </div>
              <span className="font-serif text-xs font-bold text-[#70152B]">
                Saree Wali Nari
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#A51D36]">
                Drape your dreams
              </span>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBE9EE] text-[#8B1E3F] text-xs font-bold tracking-widest uppercase">
              <Feather className="w-3.5 h-3.5" />
              <span>Editorial Heritage Story</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171316] leading-[1.15]">
              Every Thread Whispers a Story of Royal Grace
            </h2>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light">
              Founded on the sacred ghats of Varanasi and rooted in the royal courts of Awadh and Rajasthan, <strong className="text-[#8B1E3F] font-semibold">Saree Wali Nari</strong> was conceived with a single solemn mission: to preserve and elevate India&apos;s living textile heritage for the modern woman who commands her world.
            </p>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed font-light">
              We collaborate intimately with over 150 generational master weavers, dyers, and kundan karigars. Each drape takes between 14 to 45 days of rhythmic shuttle clicks on vintage pit looms, weaving pure silver zari and untamed mulberry silks into immortal heirlooms.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D9A0AD]/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#70152B] uppercase">
                  <Award className="w-4 h-4 text-[#8B1E3F]" />
                  <span>Silk Mark Guaranteed</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Every silk strand is laboratory-tested for absolute botanical purity.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#70152B] uppercase">
                  <Heart className="w-4 h-4 text-[#8B1E3F]" />
                  <span>Weaver Fair Remuneration</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Transparent fair trade guaranteeing dignified prosperity to weaver families.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md group"
              >
                <span>Read Full Atelier Chronicle</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
