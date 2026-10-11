import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { DEMO_PRODUCTS } from '@/data/products';
import ProductDetailView from '@/components/product/ProductDetailView';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Saree Wali Nari',
    };
  }

  return {
    title: `${product.name} | Saree Wali Nari`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Find related products (same subcategory or category, excluding current)
  const relatedProducts = DEMO_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.subcategory === product.subcategory || p.category === product.category)
  ).slice(0, 4);

  return (
    <ProductDetailView product={product} relatedProducts={relatedProducts} />
  );
}
