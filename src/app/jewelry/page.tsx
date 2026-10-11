import React from 'react';
import { DEMO_PRODUCTS } from '@/data/products';
import CollectionListing from '@/components/collection/CollectionListing';

export const metadata = {
  title: 'Fine Handcrafted Indian Jewelry — Kundan, Polki & Temple | Saree Wali Nari',
  description: 'Explore imperial Indian jewelry: Jadau Kundan chaandbaalis, Meenakari chokers, Rani haars, and wedding sets.',
};

export default function JewelryPage() {
  const jewelryProducts = DEMO_PRODUCTS.filter((p) => p.category === 'jewelry');

  return (
    <CollectionListing
      title="Fine Indian Jewelry Collection"
      description="Imperial adornments crafted in Jaipuri Kundan, uncut Polki gems, freshwater pearls, and South Indian temple gold finish to complement royal drapes."
      initialProducts={jewelryProducts}
      currentCategorySlug="all"
      categoryType="jewelry"
    />
  );
}
