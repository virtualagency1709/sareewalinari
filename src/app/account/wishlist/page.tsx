'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/store';

export default function AccountWishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product: (typeof wishlist)[0]) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B1E3F] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account Overview</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#171316]">
            My Saved Wishlist ({wishlist.length})
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Cherished drapes and jewels reserved for your future celebrations.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D9A0AD]/30 shadow-xs space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FBE9EE] flex items-center justify-center mx-auto text-[#8B1E3F]">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#171316]">Your Wishlist is Empty</h3>
            <p className="text-xs text-gray-500">
              Tap the heart icon on any saree or jewelry piece to save it to your wishlist.
            </p>
            <Link
              href="/sarees"
              className="inline-block px-6 py-2.5 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#D9A0AD]/30 shadow-xs flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full bg-gray-100">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white text-red-600 shadow-md hover:scale-105 transition-transform"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">
                      {product.subcategory}
                    </span>
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-serif text-xs font-semibold text-[#171316] hover:text-[#8B1E3F] line-clamp-1 block mt-0.5"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs font-bold text-[#70152B] mt-1">
                      {formatINR(product.price)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleMoveToCart(product)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Move to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
