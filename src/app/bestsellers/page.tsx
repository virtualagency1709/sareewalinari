import React from 'react';
import { DEMO_PRODUCTS } from '@/data/products';
import CollectionListing from '@/components/collection/CollectionListing';

export const metadata = {
  title: 'Bestselling Sarees & Royal Jewelry | Saree Wali Nari',
  description: 'Our most sought-after Indian sarees and fine jewelry sets, loved by brides across the world.',
};

export default function BestsellersPage() {
  const bestsellers = DEMO_PRODUCTS.filter((p) => p.isBestseller);

  return (
    <CollectionListing
      title="Bestselling Masterpieces"
      description="The definitive favorites of royal trousseaus. These heirloom sarees and jewels have earned stellar accolades for craftsmanship and authenticity."
      initialProducts={bestsellers}
      currentCategorySlug="all"
    />
  );
}
