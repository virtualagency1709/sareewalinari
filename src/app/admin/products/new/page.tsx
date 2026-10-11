'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { saveProduct } from '@/lib/store';
import { Product, ProductCategory, ProductSubcategory } from '@/types';

export default function NewProductPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('sarees');
  const [subcategory, setSubcategory] = useState<ProductSubcategory>('banarasi');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(14999);
  const [compareAtPrice, setCompareAtPrice] = useState<number>(19999);
  const [sku, setSku] = useState(`SWN-NEW-${Date.now().toString().slice(-4)}`);
  const [stock, setStock] = useState<number>(10);
  const [color, setColor] = useState('Crimson Red & Antique Gold');
  const [fabric, setFabric] = useState('Pure Katan Silk');
  const [material, setMaterial] = useState('');
  const [sareeLength, setSareeLength] = useState('5.5 meters with 0.8 meter blouse piece');
  const [blousePiece, setBlousePiece] = useState('Unstitched matching silk blouse fabric');
  const [jewelryDimensions, setJewelryDimensions] = useState('');
  const [finish, setFinish] = useState('Pure Handloom Zari Weave');
  const [careInstructions, setCareInstructions] = useState('Strictly dry clean only. Wrap in white muslin cloth.');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !sku) return;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug: `${slug}-${Math.floor(Math.random() * 1000)}`,
      name,
      category,
      subcategory,
      description,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      sku,
      stock: Number(stock),
      isPublished: true,
      isNewArrival,
      isBestseller,
      isFeatured,
      images: [imageUrl],
      fabric: category === 'sarees' ? fabric : undefined,
      material: category === 'jewelry' ? (material || 'Brass with 22k Gold Micron Plating') : undefined,
      color,
      sareeLength: category === 'sarees' ? sareeLength : undefined,
      blousePiece: category === 'sarees' ? blousePiece : undefined,
      jewelryDimensions: category === 'jewelry' ? jewelryDimensions : undefined,
      finish,
      careInstructions,
      rating: 5.0,
      reviewCount: 1,
      tags: [category, subcategory, 'Handcrafted', 'New Release'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProduct(newProd);
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
          Add New Heirloom Product
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Publish a new saree or jewelry design with full specifications.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#D9A0AD]/30 shadow-xs space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vintage Organza Cutwork Saree in Blush Pink"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Primary Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ProductCategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            >
              <option value="sarees">Sarees</option>
              <option value="jewelry">Jewelry</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Subcategory Type *
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value as ProductSubcategory)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            >
              <option value="banarasi">Banarasi</option>
              <option value="silk">Silk / Kanjivaram</option>
              <option value="organza">Organza</option>
              <option value="georgette">Georgette</option>
              <option value="printed">Printed</option>
              <option value="bridal">Bridal / Embroidered</option>
              <option value="earrings">Earrings</option>
              <option value="necklaces">Necklaces</option>
              <option value="bangles">Bangles &amp; Kadas</option>
              <option value="pendants">Pendants</option>
              <option value="jewelry-sets">Jewelry Sets</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Selling Price (INR) *
            </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Compare-at Price (MRP)
            </label>
            <input
              type="number"
              value={compareAtPrice}
              onChange={(e) => setCompareAtPrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              SKU Identifier *
            </label>
            <input
              type="text"
              required
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Units in Stock *
            </label>
            <input
              type="number"
              required
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Primary Image URL *
            </label>
            <input
              type="url"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              Detailed Description &amp; Craft Narrative *
            </label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the weaving technique, zari elements, and styling tips..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Color Palette</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              {category === 'sarees' ? 'Silk / Fabric Composition' : 'Craft Material'}
            </label>
            <input
              type="text"
              value={category === 'sarees' ? fabric : material}
              onChange={(e) => (category === 'sarees' ? setFabric(e.target.value) : setMaterial(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none"
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
              <span>Feature on Homepage</span>
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
            <span>Publish Product</span>
          </button>
        </div>
      </form>
    </div>
  );
}
