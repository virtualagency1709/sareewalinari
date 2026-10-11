'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Gem } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';

export default function JewelryShowcase() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter 4 featured jewelry pieces
  const featuredJewelry = DEMO_PRODUCTS.filter(
    (p) => p.category === 'jewelry' && p.isFeatured
  ).slice(0, 4);

  return (
    <section className="py-20 bg-[#FFF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
              <Gem className="w-4 h-4 text-[#A51D36]" />
              <span>Imperial Adornments</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2 tracking-tight">
              Jewelry Collection
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-xl">
              Handset Jadau Kundan, uncut Polki gems, and South Indian temple gold jewelry designed to complement regal drapes.
            </p>
          </div>

          <Link
            href="/jewelry"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F] hover:text-[#70152B] transition-colors group"
          >
            <span>Explore All Jewelry</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredJewelry.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
