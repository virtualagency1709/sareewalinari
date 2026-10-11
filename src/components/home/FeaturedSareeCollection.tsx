'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';

export default function FeaturedSareeCollection() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter 4 featured sarees
  const featuredSarees = DEMO_PRODUCTS.filter(
    (p) => p.category === 'sarees' && p.isFeatured
  ).slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
              Handloom Spotlight
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2 tracking-tight">
              Featured Saree Collection
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-xl">
              From pure Banarasi Kadhwa brocades to Kanchipuram temple heirlooms, discover our most acclaimed drapes.
            </p>
          </div>

          <Link
            href="/sarees"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F] hover:text-[#70152B] transition-colors group"
          >
            <span>Explore All Sarees</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featuredSarees.map((product) => (
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
