import React from 'react';
import { DEMO_PRODUCTS } from '@/data/products';
import CollectionListing from '@/components/collection/CollectionListing';

export const metadata = {
  title: 'New Arrivals — Latest Handwoven Sarees & Jewels | Saree Wali Nari',
  description: 'Explore the latest season releases: new Banarasi weaves, organza cutwork drapes, and artisanal jewelry.',
};

export default function NewArrivalsPage() {
  const newProducts = DEMO_PRODUCTS.filter((p) => p.isNewArrival);

  return (
    <CollectionListing
      title="New Arrivals — Latest Season Edit"
      description="Be the first to adorn newly completed handloom creations and handcrafted jewels, fresh off the master artisans' looms."
      initialProducts={newProducts}
      currentCategorySlug="all"
    />
  );
}
