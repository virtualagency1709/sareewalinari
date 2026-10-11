'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '@/data/categories';

export default function CategoryTiles() {
  return (
    <section className="py-20 bg-[#FFF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            Curated Boutiques
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2 tracking-tight">
            Shop by Category
          </h2>
          <div className="w-16 h-0.5 bg-[#8B1E3F] mx-auto mt-4" />
          <p className="text-xs md:text-sm text-gray-600 mt-4 leading-relaxed">
            Immerse yourself in centuries of handloom virtuosity and royal regalia. Explore each specialized repertoire.
          </p>
        </div>

        {/* 12 Category Tiles Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.slug}`}
              className="group relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 bg-[#FAF5F2] border border-[#D9A0AD]/20 block"
            >
              {/* Background Image with zoom */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Luxury Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-300" />

              {/* Category Info Container */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F3E5AB]">
                    {category.parentCategory === 'sarees' ? 'Saree Loom' : 'Jewelry Atelier'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#8B1E3F] group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-bold text-white mt-1 group-hover:text-[#F3E5AB] transition-colors">
                  {category.name}
                </h3>

                <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5">
                  {category.description}
                </p>

                <div className="mt-2 text-[10px] text-gray-300 font-medium">
                  {category.itemCount} Designs Available
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
