export type ProductCategory = 'sarees' | 'jewelry';

export type ProductSubcategory =
  | 'banarasi'
  | 'silk'
  | 'organza'
  | 'georgette'
  | 'printed'
  | 'bridal'
  | 'earrings'
  | 'necklaces'
  | 'bangles'
  | 'pendants'
  | 'jewelry-sets';

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory: ProductSubcategory;
  description: string;
  price: number; // in INR
  compareAtPrice?: number; // MRP before discount
  sku: string;
  stock: number;
  isPublished: boolean;
  isNewArrival: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
  images: string[];
  fabric?: string; // For sarees
  material?: string; // For jewelry or fabric mix
  color: string;
  sareeLength?: string;
  blousePiece?: string;
  jewelryDimensions?: string;
  finish?: string;
  careInstructions: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
  parentCategory: ProductCategory | 'all';
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'razorpay' | 'cod';
export type PaymentStatus = 'pending' | 'paid' | 'failed';
export type FulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productSlug: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  couponCode?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  trackingNumber?: string;
  trackingCourier?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  notes?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'customer' | 'admin';
  phone?: string;
  addresses: Address[];
  createdAt: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  badge?: string;
}
