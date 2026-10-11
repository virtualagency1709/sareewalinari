import React from 'react';
import { notFound } from 'next/navigation';
import { DEMO_PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import CollectionListing from '@/components/collection/CollectionListing';

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;

  // Find matching category definition
  const category = CATEGORIES.find((c) => c.slug === slug);

  // If slug is 'all-sarees', show all sarees
  if (slug === 'all-sarees') {
    const products = DEMO_PRODUCTS.filter((p) => p.category === 'sarees');
    return (
      <CollectionListing
        title="Complete Saree Collection"
        description="Explore our complete treasury of authentic handloom weaves: Banarasi, Kanjivaram, Organza, and bridal masterpieces."
        initialProducts={products}
        currentCategorySlug="all"
        categoryType="sarees"
      />
    );
  }

  // Filter products by subcategory
  const products = DEMO_PRODUCTS.filter((p) => p.subcategory === slug);

  const title = category?.name || `${slug.charAt(0).toUpperCase() + slug.slice(1)} Collection`;
  const description =
    category?.description ||
    `Explore handcrafted ${slug} pieces, individually curated for festive celebrations and wedding ensembles.`;

  return (
    <CollectionListing
      title={title}
      description={description}
      initialProducts={products.length > 0 ? products : DEMO_PRODUCTS}
      currentCategorySlug={products.length > 0 ? slug : 'all'}
    />
  );
}
