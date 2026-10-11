'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';

export default function Bestsellers() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter bestsellers
  const bestsellers = DEMO_PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);

  return (
    <section className="py-20 bg-[#FFF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
              <Flame className="w-4 h-4 text-[#A51D36]" />
              <span>Connoisseur Favorites</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2 tracking-tight">
              Bestselling Masterpieces
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-xl">
              Our most cherished handlooms and imperial jewel ensembles, celebrated by brides and discerning patronesses worldwide.
            </p>
          </div>

          <Link
            href="/bestsellers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E3F] hover:text-[#70152B] transition-colors group"
          >
            <span>View All Bestsellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product) => (
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
