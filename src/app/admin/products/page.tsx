'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  Sparkles,
  Flame,
  Star,
  ExternalLink,
} from 'lucide-react';
import { getLocalProducts, deleteProduct, saveProduct, formatINR } from '@/lib/store';
import { Product } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'sarees' | 'jewelry'>('all');
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getLocalProducts());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete or archive "${name}"?`)) {
      const updated = deleteProduct(id);
      setProducts(updated);
      setFeedback(`"${name}" removed from catalog.`);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleToggleBadge = (product: Product, field: 'isBestseller' | 'isFeatured' | 'isNewArrival') => {
    const updatedProduct = {
      ...product,
      [field]: !product[field],
    };
    const updatedList = saveProduct(updatedProduct);
    setProducts(updatedList);
  };

  const handleStockUpdate = (product: Product, newStock: number) => {
    const updatedProduct = {
      ...product,
      stock: Math.max(0, newStock),
    };
    const updatedList = saveProduct(updatedProduct);
    setProducts(updatedList);
  };

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
            Inventory Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#171316] mt-1">
            Product Catalog ({products.length} Items)
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, update stock, modify prices, and manage featured artisan pieces.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="px-6 py-3 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#D9A0AD]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, SKU, subcategory..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-medium">Category:</span>
          <div className="flex rounded-xl bg-[#FFF9F7] p-1 border border-[#D9A0AD]/30 text-xs">
            {(['all', 'sarees', 'jewelry'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#8B1E3F] text-white font-semibold'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FBE9EE] text-gray-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Image &amp; Product</th>
                <th className="pb-3 font-bold">SKU</th>
                <th className="pb-3 font-bold">Subcategory</th>
                <th className="pb-3 font-bold">Price</th>
                <th className="pb-3 font-bold">Stock</th>
                <th className="pb-3 font-bold">Badges</th>
                <th className="pb-3 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FBE9EE]">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-[#FFF9F7] transition-colors">
                  {/* Image & Title */}
                  <td className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/30">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-[#171316] line-clamp-1 block max-w-xs">
                        {product.name}
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="text-[10px] text-[#8B1E3F] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <span>View in Storefront</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </td>

                  <td className="py-3 font-mono text-gray-500">{product.sku}</td>

                  <td className="py-3 capitalize text-[#70152B] font-medium">
                    {product.subcategory}
                  </td>

                  <td className="py-3 font-bold text-[#171316]">
                    {formatINR(product.price)}
                  </td>

                  {/* Stock adjuster */}
                  <td className="py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStockUpdate(product, product.stock - 1)}
                        className="w-5 h-5 rounded bg-gray-100 hover:bg-[#FBE9EE] text-[#70152B] font-bold text-xs"
                      >
                        -
                      </button>
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          product.stock <= 5 ? 'text-red-700 bg-red-50' : 'text-gray-800'
                        }`}
                      >
                        {product.stock}
                      </span>
                      <button
                        onClick={() => handleStockUpdate(product, product.stock + 1)}
                        className="w-5 h-5 rounded bg-gray-100 hover:bg-[#FBE9EE] text-[#70152B] font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Badges toggles */}
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleBadge(product, 'isBestseller')}
                        className={`p-1 rounded-md text-[10px] font-bold ${
                          product.isBestseller
                            ? 'bg-[#70152B] text-white'
                            : 'bg-gray-100 text-gray-400 hover:text-black'
                        }`}
                        title="Toggle Bestseller status"
                      >
                        <Flame className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleToggleBadge(product, 'isFeatured')}
                        className={`p-1 rounded-md text-[10px] font-bold ${
                          product.isFeatured
                            ? 'bg-[#8B1E3F] text-white'
                            : 'bg-gray-100 text-gray-400 hover:text-black'
                        }`}
                        title="Toggle Featured status"
                      >
                        <Star className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-[#FBE9EE] text-gray-600 hover:text-[#8B1E3F] transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
