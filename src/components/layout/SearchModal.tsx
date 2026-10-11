'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { DEMO_PRODUCTS } from '@/data/products';
import { formatINR } from '@/lib/store';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter products
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = DEMO_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric?.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 8);
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#FFF9F7] rounded-2xl shadow-2xl border border-[#D9A0AD]/40 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#FBE9EE] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#8B1E3F]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sarees, silks, kundan jewelry, organza, colors..."
            className="flex-1 bg-transparent border-none outline-none text-[#171316] placeholder-[#A51D36]/50 text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-[#FBE9EE] rounded-full text-[#70152B]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FBE9EE] rounded-full text-[#70152B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions when query is empty */}
        {!query && (
          <div className="p-6 text-sm text-[#70152B]/80 space-y-4">
            <p className="font-semibold text-xs tracking-wider uppercase text-[#8B1E3F]">
              Trending Inquiries
            </p>
            <div className="flex flex-wrap gap-2">
              {['Banarasi Silk', 'Chikankari Georgette', 'Kundan Choker', 'Organza Cutwork', 'Paithani', 'Bridal Maroon'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FBE9EE] text-[#70152B] text-xs font-medium hover:bg-[#8B1E3F] hover:text-white transition-colors"
                  >
                    <Tag className="w-3 h-3" />
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Results List */}
        {query && results.length > 0 && (
          <div className="overflow-y-auto p-4 divide-y divide-[#FBE9EE]">
            <p className="text-xs uppercase tracking-wider text-[#8B1E3F] font-semibold mb-3 px-2">
              Found {results.length} Heirloom Pieces
            </p>
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 hover:bg-[#FBE9EE]/60 rounded-xl transition-colors group"
              >
                <div className="relative w-14 h-18 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8B1E3F]">
                    {product.subcategory}
                  </span>
                  <h4 className="text-sm font-medium text-[#171316] truncate group-hover:text-[#8B1E3F] transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#70152B] mt-0.5">
                    {formatINR(product.price)}
                    {product.compareAtPrice && (
                      <span className="ml-2 text-[11px] text-gray-400 line-through font-normal">
                        {formatINR(product.compareAtPrice)}
                      </span>
                    )}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D9A0AD] group-hover:text-[#8B1E3F] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        )}

        {/* No results state */}
        {query && results.length === 0 && (
          <div className="p-10 text-center text-[#70152B]/70">
            <p className="font-serif text-lg text-[#171316]">No matching weaves or jewels found</p>
            <p className="text-xs text-gray-500 mt-1">
              Try searching for &ldquo;Banarasi&rdquo;, &ldquo;Silk&rdquo;, &ldquo;Kundan&rdquo;, or &ldquo;Earrings&rdquo;.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
