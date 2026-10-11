'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Sparkles, Check } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/data/products';
import { formatINR } from '@/lib/store';
import { useCart } from '@/context/CartContext';

export default function ShopTheLook() {
  const { addToCart } = useCart();

  // Selected pairing
  const saree = DEMO_PRODUCTS.find((p) => p.id === 'prod-001') || DEMO_PRODUCTS[0];
  const jewelry = DEMO_PRODUCTS.find((p) => p.id === 'prod-024') || DEMO_PRODUCTS[23];

  const bundleTotal = saree.price + jewelry.price;
  const bundleCompareAt = (saree.compareAtPrice || saree.price) + (jewelry.compareAtPrice || jewelry.price);

  const handleAddBoth = () => {
    addToCart(saree, 1);
    addToCart(jewelry, 1);
  };

  return (
    <section className="py-24 bg-[#FAF5F2] border-y border-[#D9A0AD]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            <Sparkles className="w-4 h-4 text-[#A51D36]" />
            <span>Curated Styling Suite</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2">
            Shop the Look: Royal Wedding Soirée
          </h2>
          <div className="w-16 h-0.5 bg-[#8B1E3F] mx-auto mt-4" />
          <p className="text-xs md:text-sm text-gray-600 mt-3">
            Harmonize your presence. Our master stylists have coupled the pure Kadhwa Banarasi weave with an authentic Kundan Hasli choker.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Editorial Editorial Photo */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#D9A0AD]/30">
              <Image
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85"
                alt="Styled Indian Saree and Jewelry Look"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Pin 1: Saree */}
              <div className="absolute top-[45%] left-[35%] group">
                <div className="w-7 h-7 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center font-bold text-xs shadow-lg animate-bounce border-2 border-white">
                  1
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xl text-left hidden group-hover:block border border-[#D9A0AD]/40">
                  <p className="text-[11px] font-bold text-[#171316] truncate">{saree.name}</p>
                  <p className="text-[11px] font-bold text-[#8B1E3F]">{formatINR(saree.price)}</p>
                </div>
              </div>

              {/* Pin 2: Jewelry */}
              <div className="absolute top-[22%] left-[48%] group">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37] text-[#171316] flex items-center justify-center font-bold text-xs shadow-lg animate-bounce border-2 border-white">
                  2
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xl text-left hidden group-hover:block border border-[#D9A0AD]/40">
                  <p className="text-[11px] font-bold text-[#171316] truncate">{jewelry.name}</p>
                  <p className="text-[11px] font-bold text-[#8B1E3F]">{formatINR(jewelry.price)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lookbook Items Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            {/* Item 1: Saree Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#D9A0AD]/30 shadow-xs flex gap-4 items-center">
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={saree.images[0]} alt={saree.name} fill className="object-cover" />
                <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#8B1E3F] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">The Drape</span>
                <Link href={`/products/${saree.slug}`} className="block">
                  <h4 className="text-xs font-semibold text-[#171316] hover:text-[#8B1E3F] truncate">
                    {saree.name}
                  </h4>
                </Link>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs font-bold text-[#70152B]">{formatINR(saree.price)}</span>
                  {saree.compareAtPrice && (
                    <span className="text-[10px] text-gray-400 line-through">
                      {formatINR(saree.compareAtPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(saree, 1)}
                  className="mt-2 text-[11px] font-semibold text-[#8B1E3F] hover:underline flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add Saree Only
                </button>
              </div>
            </div>

            {/* Item 2: Jewelry Card */}
            <div className="p-4 rounded-2xl bg-white border border-[#D9A0AD]/30 shadow-xs flex gap-4 items-center">
              <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={jewelry.images[0]} alt={jewelry.name} fill className="object-cover" />
                <span className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#D4AF37] text-[#171316] text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37]">The Jewel</span>
                <Link href={`/products/${jewelry.slug}`} className="block">
                  <h4 className="text-xs font-semibold text-[#171316] hover:text-[#8B1E3F] truncate">
                    {jewelry.name}
                  </h4>
                </Link>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xs font-bold text-[#70152B]">{formatINR(jewelry.price)}</span>
                  {jewelry.compareAtPrice && (
                    <span className="text-[10px] text-gray-400 line-through">
                      {formatINR(jewelry.compareAtPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(jewelry, 1)}
                  className="mt-2 text-[11px] font-semibold text-[#8B1E3F] hover:underline flex items-center gap-1"
                >
                  <ShoppingBag className="w-3 h-3" />
                  Add Jewelry Only
                </button>
              </div>
            </div>

            {/* Bundle Total & Add All Action */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#70152B] to-[#171316] text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div>
                  <p className="text-xs text-[#F3E5AB] uppercase tracking-wider font-semibold">
                    Complete Ensemble Price
                  </p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold text-white">{formatINR(bundleTotal)}</span>
                    <span className="text-xs text-gray-300 line-through">
                      {formatINR(bundleCompareAt)}
                    </span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold">
                  Complimentary Gift Box
                </div>
              </div>

              <ul className="text-xs text-[#FBE9EE] space-y-1.5 font-light">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F3E5AB]" />
                  <span>Curated color and metallic harmony guaranteed</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F3E5AB]" />
                  <span>Free insured priority express pan-India dispatch</span>
                </li>
              </ul>

              <button
                onClick={handleAddBoth}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] hover:opacity-95 text-[#171316] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                Add Complete Ensemble to Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
