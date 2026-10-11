import { Product, Order, HeroSlide, Review } from '@/types';
import { DEMO_PRODUCTS } from '@/data/products';
import { HERO_SLIDES } from '@/data/heroSlides';
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  PRODUCTS: 'swn_products_v1',
  ORDERS: 'swn_orders_v1',
  SLIDES: 'swn_slides_v1',
  REVIEWS: 'swn_reviews_v1',
};

// Helper to format Indian Rupee currency
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// -------------------------------------------------------------
// Products Store
// -------------------------------------------------------------
export function getLocalProducts(): Product[] {
  if (typeof window === 'undefined') return DEMO_PRODUCTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEMO_PRODUCTS));
      return DEMO_PRODUCTS;
    }
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEMO_PRODUCTS;
  } catch (err) {
    console.error('Error reading products from localStorage:', err);
    return DEMO_PRODUCTS;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data && data.length > 0) {
        return data as Product[];
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local products:', err);
    }
  }
  return getLocalProducts();
}

export function saveProduct(product: Product): Product[] {
  const current = getLocalProducts();
  const index = current.findIndex((p) => p.id === product.id);
  let updated: Product[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...product, updatedAt: new Date().toISOString() };
  } else {
    updated = [
      {
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      ...current,
    ];
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  }

  // Also sync to Supabase if available
  if (isSupabaseConfigured && supabase) {
    supabase.from('products').upsert(product).then(null, console.error);
  }

  return updated;
}

export function deleteProduct(productId: string): Product[] {
  const current = getLocalProducts();
  const updated = current.filter((p) => p.id !== productId);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  }
  if (isSupabaseConfigured && supabase) {
    supabase.from('products').delete().eq('id', productId).then(null, console.error);
  }
  return updated;
}

// -------------------------------------------------------------
// Orders Store
// -------------------------------------------------------------
export function getLocalOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error('Error reading orders from localStorage:', err);
    return [];
  }
}

export async function fetchOrders(): Promise<Order[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.from('orders').select('*, items:order_items(*)');
      if (!error && data) return data as Order[];
    } catch (err) {
      console.warn('Supabase orders fetch error, falling back to local orders:', err);
    }
  }
  return getLocalOrders();
}

export function saveOrder(order: Order): Order {
  const orders = getLocalOrders();
  const updated = [order, ...orders.filter((o) => o.id !== order.id)];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }
  if (isSupabaseConfigured && supabase) {
    supabase.from('orders').upsert(order).then(null, console.error);
  }
  return order;
}

export function updateOrderStatus(
  orderId: string,
  fulfillmentStatus: Order['fulfillmentStatus'],
  trackingNumber?: string,
  trackingCourier?: string
): Order | null {
  const orders = getLocalOrders();
  const index = orders.findIndex((o) => o.id === orderId);
  if (index === -1) return null;

  orders[index] = {
    ...orders[index],
    fulfillmentStatus,
    ...(trackingNumber ? { trackingNumber } : {}),
    ...(trackingCourier ? { trackingCourier } : {}),
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }

  if (isSupabaseConfigured && supabase) {
    supabase
      .from('orders')
      .update({
        fulfillmentStatus,
        trackingNumber,
        trackingCourier,
      })
      .eq('id', orderId)
      .then(null, console.error);
  }

  return orders[index];
}

// -------------------------------------------------------------
// Hero Slides Store
// -------------------------------------------------------------
export function getLocalSlides(): HeroSlide[] {
  if (typeof window === 'undefined') return HERO_SLIDES;
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SLIDES);
    return stored ? JSON.parse(stored) : HERO_SLIDES;
  } catch {
    return HERO_SLIDES;
  }
}

export function saveSlides(slides: HeroSlide[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
  }
}
