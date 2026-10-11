'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Star, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { formatINR } from '@/lib/store';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#FFF9F7] rounded-3xl shadow-2xl overflow-hidden border border-[#D9A0AD]/30 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-[#70152B] shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="w-full md:w-1/2 bg-[#FAF5F2] p-4 flex flex-col justify-between">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-14 h-18 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === idx ? 'border-[#8B1E3F] scale-105' : 'border-transparent opacity-70'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-[#A51D36] uppercase tracking-wider font-semibold">
              <span>{product.subcategory}</span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs text-[#171316] font-semibold">{product.rating}</span>
                <span className="text-[11px] text-gray-500">({product.reviewCount})</span>
              </div>
            </div>

            <h2 className="font-serif text-xl font-bold text-[#171316] mt-2 leading-snug">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-2xl font-bold text-[#70152B]">
                {formatINR(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatINR(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 mt-4 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Quick Specs */}
            <div className="mt-4 pt-4 border-t border-[#FBE9EE] space-y-1.5 text-xs">
              {product.fabric && (
                <p className="text-[#171316]">
                  <strong className="text-gray-500">Fabric:</strong> {product.fabric}
                </p>
              )}
              {product.material && (
                <p className="text-[#171316]">
                  <strong className="text-gray-500">Material:</strong> {product.material}
                </p>
              )}
              <p className="text-[#171316]">
                <strong className="text-gray-500">Color:</strong> {product.color}
              </p>
              {product.sareeLength && (
                <p className="text-[#171316]">
                  <strong className="text-gray-500">Length:</strong> {product.sareeLength}
                </p>
              )}
              {product.jewelryDimensions && (
                <p className="text-[#171316]">
                  <strong className="text-gray-500">Dimensions:</strong> {product.jewelryDimensions}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4 text-[11px] text-[#70152B] bg-[#FBE9EE]/60 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 text-[#8B1E3F]" />
              <span>Silk Mark Authenticated | Handloom Verified Karigari</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-[#FBE9EE] space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D9A0AD]/50 rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 px-3 hover:bg-[#FBE9EE] text-[#70152B]"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold text-[#171316]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  className="p-2 px-3 hover:bg-[#FBE9EE] text-[#70152B]"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>
            </div>

            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="w-full text-center text-xs font-semibold text-[#8B1E3F] hover:text-[#70152B] flex items-center justify-center gap-1 py-1"
            >
              View Full Product Specifications &amp; Care Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
