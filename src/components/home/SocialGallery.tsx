'use client';

import React from 'react';
import Image from 'next/image';
import { Camera, ArrowUpRight } from 'lucide-react';

const SOCIAL_POSTS = [
  {
    id: 's-1',
    handle: '@sareewalinari',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    caption: 'Pure Kadhwa Banarasi in Royal Crimson for an intimate twilight wedding.',
  },
  {
    id: 's-2',
    handle: '@sareewalinari',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
    caption: 'Jadau pacchi kundan with fresh river pearls. Crafted to enchant.',
  },
  {
    id: 's-3',
    handle: '@sareewalinari',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    caption: 'Temple border Kanjivaram in Mustard Gold & Ruby Red.',
  },
  {
    id: 's-4',
    handle: '@sareewalinari',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    caption: 'Hand-painted blush organza with artisan floral cutwork.',
  },
  {
    id: 's-5',
    handle: '@sareewalinari',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    caption: 'Crescent moon Kundan Chaandbaalis dripping in seed pearls.',
  },
  {
    id: 's-6',
    handle: '@sareewalinari',
    image: 'https://images.unsplash.com/photo-1611591475878-8f81fb80be2e?auto=format&fit=crop&w=600&q=80',
    caption: 'Openable Jadau kadas with screw closure in 22k gold micron plate.',
  },
];

export default function SocialGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            <Camera className="w-4 h-4 text-[#A51D36]" />
            <span>@SareeWaliNari on Instagram</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2">
            The Living Atelier
          </h2>
          <p className="text-xs md:text-sm text-gray-600 mt-2">
            Tag #SareeWaliNari and #DrapeYourDreams to be featured in our permanent bridal museum.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {SOCIAL_POSTS.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gray-100 block shadow-xs hover:shadow-lg transition-all"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end">
                  <ArrowUpRight className="w-4 h-4 text-[#F3E5AB]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-200 line-clamp-2 leading-tight">
                    {post.caption}
                  </p>
                  <span className="text-[9px] font-bold text-[#F3E5AB] mt-1 block">
                    {post.handle}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
