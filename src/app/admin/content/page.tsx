'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sliders, Save, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { getLocalSlides, saveSlides } from '@/lib/store';
import { HeroSlide } from '@/types';

export default function AdminContentPage() {
  const [slides, setSlides] = useState<HeroSlide[]>(getLocalSlides());
  const [promoText, setPromoText] = useState('FESTIVE SOIREE: Use code UTSAV15 for 15% off | Complimentary Luxury Gift Box');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSlideChange = (index: number, field: keyof HeroSlide, val: string) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: val };
    setSlides(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveSlides(slides);
    setFeedback('Homepage editorial slides and promotional banner updated.');
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
          Visual Merchandising
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#171316] mt-1">
          Homepage Content &amp; Hero Carousel
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Art direct hero slides, banner offers, and featured editorial texts.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Announcement Bar Offer Editor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-4">
          <h2 className="font-serif text-lg font-bold text-[#171316]">
            Top Announcement Bar Banner
          </h2>
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Banner Headline &amp; Promo Code
            </label>
            <input
              type="text"
              value={promoText}
              onChange={(e) => setPromoText(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>
        </div>

        {/* Hero Slides Editor */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-6">
          <h2 className="font-serif text-lg font-bold text-[#171316]">
            3 Editorial Carousel Slides
          </h2>

          <div className="space-y-6">
            {slides.map((slide, idx) => (
              <div
                key={slide.id}
                className="p-5 rounded-2xl bg-[#FFF9F7] border border-[#D9A0AD]/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#D9A0AD]/20 pb-3">
                  <span className="font-bold text-xs uppercase text-[#8B1E3F]">
                    Slide {idx + 1}: {slide.badge || 'Featured Edit'}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono">ID: {slide.id}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">Headline</label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">Description</label>
                    <input
                      type="text"
                      value={slide.description}
                      onChange={(e) => handleSlideChange(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">CTA Label</label>
                    <input
                      type="text"
                      value={slide.ctaText}
                      onChange={(e) => handleSlideChange(idx, 'ctaText', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">CTA Destination URL</label>
                    <input
                      type="text"
                      value={slide.ctaLink}
                      onChange={(e) => handleSlideChange(idx, 'ctaLink', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-semibold text-gray-700 block mb-1">Hero Image URL</label>
                    <input
                      type="url"
                      value={slide.image}
                      onChange={(e) => handleSlideChange(idx, 'image', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Content Updates</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
