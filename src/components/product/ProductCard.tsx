'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/store';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-[#D9A0AD]/20 hover:border-[#8B1E3F]/40 shadow-xs hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF5F2]">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className={`object-cover transition-all duration-700 ${
              isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={`object-cover transition-all duration-700 absolute inset-0 ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isBestseller && (
            <span className="px-2 py-0.5 rounded-full bg-[#70152B] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="px-2 py-0.5 rounded-full bg-[#A51D36] text-white text-[10px] font-bold tracking-wider uppercase shadow-xs">
              New
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-[#171316] text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
              {discountPercent}% Off
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            isFavorited
              ? 'bg-[#8B1E3F] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#70152B] shadow-xs'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
          {onQuickView && (
            <button
              onClick={handleQuickViewClick}
              aria-label="Quick View"
              className="p-2.5 rounded-xl bg-white hover:bg-[#FBE9EE] text-[#70152B] shadow-md transition-colors"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#A51D36] uppercase tracking-wider font-semibold mb-1">
            <span>{product.subcategory}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-[11px] text-[#171316] font-medium">{product.rating}</span>
            </div>
          </div>

          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-sm font-medium text-[#171316] hover:text-[#8B1E3F] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {product.fabric && (
            <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
              {product.fabric}
            </p>
          )}
          {product.material && !product.fabric && (
            <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
              {product.material}
            </p>
          )}
        </div>

        <div className="mt-3 pt-2 border-t border-[#FBE9EE] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[#70152B]">
              {formatINR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatINR(product.compareAtPrice)}
              </span>
            )}
          </div>

          <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
            In Stock
          </span>
        </div>
      </div>
    </div>
  );
}
