'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, CheckCircle2 } from 'lucide-react';
import { getLocalProducts, saveProduct } from '@/lib/store';
import { Product, ProductCategory, ProductSubcategory } from '@/types';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('sarees');
  const [subcategory, setSubcategory] = useState<ProductSubcategory>('banarasi');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(0);
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState<number>(0);
  const [color, setColor] = useState('');
  const [fabric, setFabric] = useState('');
  const [material, setMaterial] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const list = getLocalProducts();
    const found = list.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
      setName(found.name);
      setCategory(found.category);
      setSubcategory(found.subcategory);
      setDescription(found.description);
      setPrice(found.price);
      setCompareAtPrice(found.compareAtPrice || 0);
      setSku(found.sku);
      setStock(found.stock);
      setColor(found.color);
      setFabric(found.fabric || '');
      setMaterial(found.material || '');
      setIsBestseller(found.isBestseller);
      setIsNewArrival(found.isNewArrival);
      setIsFeatured(found.isFeatured);
      setImageUrl(found.images[0] || '');
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="p-8 text-center text-xs text-gray-500">
        Loading product details...
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    const updated: Product = {
      ...product,
      name,
      category,
      subcategory,
      description,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      sku,
      stock: Number(stock),
      color,
      fabric: category === 'sarees' ? fabric : undefined,
      material: category === 'jewelry' ? material : undefined,
      isBestseller,
      isNewArrival,
      isFeatured,
      images: imageUrl ? [imageUrl, ...product.images.slice(1)] : product.images,
      updatedAt: new Date().toISOString(),
    };

    saveProduct(updated);
    router.push('/admin/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B1E3F] mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Product Inventory</span>
        </Link>
        <h1 className="font-serif text-3xl font-bold text-[#171316]">
          Edit: {product.name}
        </h1>
        <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#D9A0AD]/30 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">Product Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Price (INR) *</label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Stock Quantity *</label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">Primary Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isNewArrival}
                onChange={(e) => setIsNewArrival(e.target.checked)}
                className="accent-[#8B1E3F] w-4 h-4"
              />
              <span>Mark as New Arrival</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="accent-[#8B1E3F] w-4 h-4"
              />
              <span>Mark as Bestseller</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="accent-[#8B1E3F] w-4 h-4"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-[#FBE9EE] flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Update Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
