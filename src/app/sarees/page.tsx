import React from 'react';
import { DEMO_PRODUCTS } from '@/data/products';
import CollectionListing from '@/components/collection/CollectionListing';

export const metadata = {
  title: 'All Sarees — Banarasi, Silk, Organza & Bridal | Saree Wali Nari',
  description: 'Shop authentic handwoven Indian sarees directly from master artisan looms. Banarasi, Kanjivaram, Organza, Georgette, and Bridal Zardozi drapes.',
};

export default function SareesPage() {
  const sareeProducts = DEMO_PRODUCTS.filter((p) => p.category === 'sarees');

  return (
    <CollectionListing
      title="The Royal Saree Collection"
      description="An eternal tribute to Indian textile heritage. Handcrafted on traditional pit looms in Varanasi, Kanchipuram, and Rajasthan with Silk Mark certification."
      initialProducts={sareeProducts}
      currentCategorySlug="all"
      categoryType="sarees"
    />
  );
}
