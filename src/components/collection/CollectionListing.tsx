'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Filter,
  X,
  SlidersHorizontal,
  ChevronDown,
  RotateCcw,
  Sparkles,
  Search,
} from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import QuickViewModal from '@/components/product/QuickViewModal';
import { formatINR } from '@/lib/store';

interface CollectionListingProps {
  title: string;
  description: string;
  initialProducts: Product[];
  currentCategorySlug?: string;
  categoryType?: ProductCategory | 'all';
}

export default function CollectionListing({
  title,
  description,
  initialProducts,
  currentCategorySlug,
}: CollectionListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(
    currentCategorySlug || 'all'
  );
  const [priceRange, setPriceRange] = useState<number>(50000); // Max filter
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popularity'>('popularity');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  // Extract unique subcategories and colors
  const subcategories = useMemo(() => {
    const set = new Set<string>();
    initialProducts.forEach((p) => set.add(p.subcategory));
    return Array.from(set);
  }, [initialProducts]);

  const colors = useMemo(() => {
    const list: string[] = ['Red', 'Pink', 'Gold', 'Green', 'Blue', 'Ivory', 'Lavender'];
    return list;
  }, []);

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Subcategory match
        if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
          return false;
        }

        // Search match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            product.name.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q) ||
            product.subcategory.toLowerCase().includes(q) ||
            product.fabric?.toLowerCase().includes(q) ||
            product.tags.some((t) => t.toLowerCase().includes(q));
          if (!match) return false;
        }

        // Price match
        if (product.price > priceRange) return false;

        // Color match
        if (selectedColor !== 'all') {
          if (!product.color.toLowerCase().includes(selectedColor.toLowerCase())) return false;
        }

        // Stock match
        if (inStockOnly && product.stock <= 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        // Popularity / Bestseller default
        return b.rating * b.reviewCount - a.rating * a.reviewCount;
      });
  }, [
    initialProducts,
    selectedSubcategory,
    searchQuery,
    priceRange,
    selectedColor,
    inStockOnly,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubcategory('all');
    setPriceRange(50000);
    setSelectedColor('all');
    setInStockOnly(false);
    setSortBy('popularity');
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedSubcategory !== (currentCategorySlug || 'all') ||
    priceRange < 50000 ||
    selectedColor !== 'all' ||
    inStockOnly;

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#8B1E3F]">Home</Link>
          <span>/</span>
          <Link href="/sarees" className="hover:text-[#8B1E3F]">Collections</Link>
          <span>/</span>
          <span className="text-[#8B1E3F] font-semibold">{title}</span>
        </nav>

        {/* Collection Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 mb-10 border border-[#D9A0AD]/25 shadow-xs relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
              Handloom &amp; Jewel Treasury
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#171316]">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
              {description}
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-[#70152B]">
              <span>Showing {filteredProducts.length} Heirloom Masterpieces</span>
            </div>
          </div>
        </div>

        {/* Controls Bar: Search, Mobile Filter Toggle, Sort Dropdown */}
        <div className="bg-white p-4 rounded-2xl border border-[#D9A0AD]/30 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search within collection */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in this collection..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-black"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs font-semibold text-[#70152B]"
            >
              <Filter className="w-4 h-4 text-[#8B1E3F]" />
              <span>Filters {isFiltered && '(Active)'}</span>
            </button>

            {/* Clear Filters Button */}
            {isFiltered && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#8B1E3F] hover:text-[#70152B] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:inline">Sort By:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-[#FFF9F7] border border-[#D9A0AD]/40 text-[#171316] text-xs font-semibold rounded-xl pl-3 pr-8 py-2 outline-none focus:border-[#8B1E3F] cursor-pointer"
                >
                  <option value="popularity">Popularity &amp; Rating</option>
                  <option value="newest">Newest Additions</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-3 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-[#D9A0AD]/30 shadow-xs h-fit sticky top-28">
            <div className="flex items-center justify-between border-b border-[#FBE9EE] pb-4">
              <div className="flex items-center gap-2 font-serif text-base font-bold text-[#171316]">
                <SlidersHorizontal className="w-4 h-4 text-[#8B1E3F]" />
                <span>Refine Selection</span>
              </div>
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-[#8B1E3F] hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Subcategory Filter */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                Category Type
              </h4>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedSubcategory('all')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedSubcategory === 'all'
                      ? 'bg-[#8B1E3F] text-white font-semibold'
                      : 'text-gray-700 hover:bg-[#FBE9EE]'
                  }`}
                >
                  All Categories ({initialProducts.length})
                </button>
                {subcategories.map((sub) => {
                  const count = initialProducts.filter((p) => p.subcategory === sub).length;
                  return (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors flex items-center justify-between ${
                        selectedSubcategory === sub
                          ? 'bg-[#8B1E3F] text-white font-semibold'
                          : 'text-gray-700 hover:bg-[#FBE9EE]'
                      }`}
                    >
                      <span>{sub}</span>
                      <span className="text-[10px] opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-3 pt-4 border-t border-[#FBE9EE]">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                <span>Max Price</span>
                <span className="text-[#171316] font-mono">{formatINR(priceRange)}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="50000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#8B1E3F] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>₹2,000</span>
                <span>₹50,000</span>
              </div>
            </div>

            {/* Color Filter */}
            <div className="space-y-3 pt-4 border-t border-[#FBE9EE]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                Color Palette
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedColor('all')}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedColor === 'all'
                      ? 'bg-[#8B1E3F] text-white font-bold'
                      : 'bg-[#FBE9EE] text-[#70152B] hover:bg-[#8B1E3F] hover:text-white'
                  }`}
                >
                  All
                </button>
                {colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedColor === c
                        ? 'bg-[#8B1E3F] text-white font-bold'
                        : 'bg-[#FBE9EE] text-[#70152B] hover:bg-[#8B1E3F] hover:text-white'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-[#FBE9EE] flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">In-Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="accent-[#8B1E3F] w-4 h-4 cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-[#D9A0AD]/30 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FBE9EE] flex items-center justify-center mx-auto text-[#8B1E3F]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#171316]">
                  No matching masterpieces found
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  We could not find items matching your specific filter criteria. Try adjusting the price slider or resetting filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickView={(p) => setQuickViewProduct(p)}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {visibleCount < filteredProducts.length && (
                  <div className="text-center mt-12">
                    <button
                      onClick={() => setVisibleCount((v) => v + 8)}
                      className="px-8 py-3.5 rounded-full border border-[#8B1E3F] text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      Load More Drapes ({filteredProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#FBE9EE] pb-4">
                <h3 className="font-serif text-lg font-bold text-[#171316]">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 hover:bg-[#FBE9EE] rounded-full text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Subcategories */}
              <div className="mt-4 space-y-2">
                <span className="text-xs uppercase font-bold text-[#8B1E3F]">Subcategory</span>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubcategory('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium ${
                      selectedSubcategory === 'all' ? 'bg-[#8B1E3F] text-white' : 'text-gray-700'
                    }`}
                  >
                    All Categories
                  </button>
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${
                        selectedSubcategory === sub ? 'bg-[#8B1E3F] text-white' : 'text-gray-700'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#8B1E3F]">
                  <span>Max Price:</span>
                  <span>{formatINR(priceRange)}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-[#8B1E3F]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#FBE9EE] space-y-2">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-full bg-[#8B1E3F] text-white text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="w-full py-2.5 rounded-full border border-gray-300 text-xs text-gray-600 font-semibold uppercase tracking-wider"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
