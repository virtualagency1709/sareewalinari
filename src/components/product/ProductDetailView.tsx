'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  ZoomIn,
  X,
  Check,
  ChevronRight,
} from 'lucide-react';
import { Product, Review } from '@/types';
import { formatINR } from '@/lib/store';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from './ProductCard';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'shipping' | 'reviews'>('details');
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Demo reviews state
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'rev-1',
      productId: product.id,
      customerName: 'Ananya Deshpande',
      rating: 5,
      title: 'Breathtaking craftsmanship and ethereal drape',
      comment:
        'The zari has a rich, subdued antique sheen rather than a loud shiny glitter. Pure luxury and absolute showstopper at my reception.',
      date: '10 days ago',
      verifiedPurchase: true,
    },
    {
      id: 'rev-2',
      productId: product.id,
      customerName: 'Kavita Menon',
      rating: 5,
      title: 'Silk Mark certified perfection',
      comment:
        'The unstitched blouse piece had ample fabric for custom elbow-sleeve embroidery. Safely packaged in a branded cotton preservation bag.',
      date: '3 weeks ago',
      verifiedPurchase: true,
    },
  ]);

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      customerName: newReviewAuthor.trim(),
      rating: newReviewRating,
      title: 'Verified Customer Review',
      comment: newReviewComment.trim(),
      date: 'Just now',
      verifiedPurchase: true,
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewComment('');
  };

  return (
    <div className="bg-[#FFF9F7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#8B1E3F]">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={product.category === 'sarees' ? '/sarees' : '/jewelry'}
            className="hover:text-[#8B1E3F] capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link
            href={`/collections/${product.subcategory}`}
            className="hover:text-[#8B1E3F] capitalize"
          >
            {product.subcategory}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#8B1E3F] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Showcase: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Column 1: Multi-Image Gallery with Lightbox Zoom */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-white border border-[#D9A0AD]/30 shadow-md group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover cursor-zoom-in transition-transform duration-500 hover:scale-105"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
                {product.isBestseller && (
                  <span className="px-3 py-1 rounded-full bg-[#70152B] text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                    Bestseller
                  </span>
                )}
                {product.isNewArrival && (
                  <span className="px-3 py-1 rounded-full bg-[#A51D36] text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                    New Season
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#171316] text-[11px] font-extrabold tracking-wider uppercase shadow-md">
                    {discountPercent}% Off
                  </span>
                )}
              </div>

              {/* Zoom Trigger Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-4 right-4 p-3 rounded-full bg-white/80 hover:bg-white text-[#70152B] shadow-md backdrop-blur-xs transition-colors"
                title="View Full-Screen Zoom Lightbox"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#8B1E3F] scale-102 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Details & Ordering Matrix */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8B1E3F] font-bold uppercase tracking-widest">
                <span>{product.subcategory} Weave</span>
                <span className="text-gray-400 font-mono text-[11px]">SKU: {product.sku}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#171316] mt-2 leading-tight">
                {product.name}
              </h1>

              {/* Rating & In-stock badge */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#FBE9EE]">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-bold text-[#171316]">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.reviewCount} Verified Reviews)
                  </span>
                </div>

                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Sold Out'}
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#D9A0AD]/30 shadow-xs space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-[#70152B]">
                  {formatINR(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base text-gray-400 line-through">
                    {formatINR(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-xs text-gray-500">(Inclusive of all taxes)</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#70152B] font-medium pt-1">
                <Sparkles className="w-4 h-4 text-[#A51D36]" />
                <span>Use coupon <strong className="text-[#8B1E3F]">UTSAV15</strong> at checkout for 15% off!</span>
              </div>
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              {product.fabric && (
                <div className="p-3 rounded-xl bg-white border border-[#D9A0AD]/30">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Pure Fabric</span>
                  <span className="font-semibold text-[#171316] mt-0.5 block">{product.fabric}</span>
                </div>
              )}
              {product.material && (
                <div className="p-3 rounded-xl bg-white border border-[#D9A0AD]/30">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Craft Material</span>
                  <span className="font-semibold text-[#171316] mt-0.5 block">{product.material}</span>
                </div>
              )}
              <div className="p-3 rounded-xl bg-white border border-[#D9A0AD]/30">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Color Tone</span>
                <span className="font-semibold text-[#171316] mt-0.5 block">{product.color}</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#D9A0AD]/30">
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Dimensions</span>
                <span className="font-semibold text-[#171316] mt-0.5 block truncate">
                  {product.sareeLength || product.jewelryDimensions || 'Standard Royal Size'}
                </span>
              </div>
            </div>

            {/* Quantity Selector & Action CTAs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D9A0AD]/50 rounded-2xl bg-white overflow-hidden shadow-xs">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 hover:bg-[#FBE9EE] text-[#70152B] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 text-sm font-bold text-[#171316]">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="p-3 hover:bg-[#FBE9EE] text-[#70152B] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] disabled:bg-gray-300 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Shopping Bag
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isFavorited
                      ? 'bg-[#8B1E3F] text-white border-[#8B1E3F]'
                      : 'bg-white text-[#70152B] border-[#D9A0AD]/40 hover:bg-[#FBE9EE]'
                  }`}
                  title={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>

                {/* Share Link */}
                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-2xl bg-white text-[#70152B] border border-[#D9A0AD]/40 hover:bg-[#FBE9EE] transition-all"
                  title="Share this product"
                >
                  {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Buy Now Instant Checkout */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#70152B] to-[#171316] hover:opacity-95 disabled:bg-gray-300 text-[#F3E5AB] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98 border border-[#F3E5AB]/30"
              >
                <Zap className="w-4 h-4 fill-current" />
                Buy Now — Instant Checkout
              </button>
            </div>

            {/* Added to cart confirmation banner */}
            {addedNotice && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Added to your bag! Complimentary gift packaging included.</span>
              </div>
            )}

            {/* Trust Assurances */}
            <div className="p-4 rounded-2xl bg-[#FAF5F2] border border-[#D9A0AD]/25 space-y-2.5 text-xs text-gray-700">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8B1E3F] flex-shrink-0" />
                <span>Silk Mark Authenticated | Laboratory Tested 100% Pure Silk</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#8B1E3F] flex-shrink-0" />
                <span>Complimentary Insured Express Dispatch across India (3–5 Business Days)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#8B1E3F] flex-shrink-0" />
                <span>Hassle-free 7-day returns on unworn items with original security tags</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Information: Details, Care, Shipping, Reviews */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-[#D9A0AD]/25 shadow-xs">
          <div className="flex flex-wrap gap-4 border-b border-[#FBE9EE] pb-4">
            {[
              { id: 'details', label: 'Artistry & Specifications' },
              { id: 'care', label: 'Care & Preservation' },
              { id: 'shipping', label: 'Complimentary Delivery' },
              { id: 'reviews', label: `Patron Reviews (${reviews.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`font-serif text-sm sm:text-base font-bold pb-2 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#8B1E3F]'
                    : 'text-gray-400 hover:text-[#171316]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#8B1E3F] rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-6">
            {activeTab === 'details' && (
              <div className="space-y-6 text-sm text-gray-700 leading-relaxed max-w-4xl">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#171316] mb-2">The Narrative</h4>
                  <p>{product.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#FBE9EE]">
                  {product.fabric && (
                    <div>
                      <span className="font-semibold text-[#171316]">Fabric:</span> {product.fabric}
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <span className="font-semibold text-[#171316]">Material:</span> {product.material}
                    </div>
                  )}
                  {product.finish && (
                    <div>
                      <span className="font-semibold text-[#171316]">Artisanal Finish:</span> {product.finish}
                    </div>
                  )}
                  {product.sareeLength && (
                    <div>
                      <span className="font-semibold text-[#171316]">Saree Dimensions:</span> {product.sareeLength}
                    </div>
                  )}
                  {product.blousePiece && (
                    <div className="sm:col-span-2">
                      <span className="font-semibold text-[#171316]">Blouse Piece:</span> {product.blousePiece}
                    </div>
                  )}
                  {product.jewelryDimensions && (
                    <div className="sm:col-span-2">
                      <span className="font-semibold text-[#171316]">Jewelry Specs:</span> {product.jewelryDimensions}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed max-w-3xl">
                <h4 className="font-serif text-lg font-bold text-[#171316]">Preservation Protocols</h4>
                <p>{product.careInstructions}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                  <li>Store in breathable, non-acidic cotton or muslin fabric wraps.</li>
                  <li>Do not spray perfumes, deodorants, or cosmetics directly onto zari and metallic finishes.</li>
                  <li>Refold sarees every 3 months along different fold lines to prevent crease fatigue.</li>
                  <li>Air in a shaded, well-ventilated room twice a year.</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed max-w-3xl">
                <h4 className="font-serif text-lg font-bold text-[#171316]">Pan-India &amp; International Delivery</h4>
                <p>
                  Every order from <strong className="text-[#8B1E3F]">Saree Wali Nari</strong> is dispatched in our signature hard-shell burgundy trunk box, nestled in scented butter paper with an authenticity certificate.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-gray-600">
                  <li>Complimentary express air delivery for all orders exceeding ₹1,999.</li>
                  <li>Metros: Delivered within 2 to 4 business days.</li>
                  <li>Rest of India: Delivered within 4 to 6 business days.</li>
                  <li>Live tracking updates sent via WhatsApp and SMS upon courier handover.</li>
                </ul>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-4xl">
                {/* Submit New Review Form */}
                <div className="p-6 rounded-2xl bg-[#FFF9F7] border border-[#D9A0AD]/30 space-y-4">
                  <h4 className="font-serif text-base font-bold text-[#171316]">
                    Write an Atelier Review
                  </h4>

                  {reviewSubmitted ? (
                    <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Thank you! Your testimonial has been posted.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleAddReview} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="Your Name (e.g., Deepika R.)"
                          required
                          className="px-3.5 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs outline-none focus:border-[#8B1E3F]"
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Rating:</span>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                            className="px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs outline-none focus:border-[#8B1E3F]"
                          >
                            <option value={5}>5 Stars - Pure Perfection</option>
                            <option value={4}>4 Stars - Wonderful Weave</option>
                            <option value={3}>3 Stars - Satisfactory</option>
                          </select>
                        </div>
                      </div>

                      <textarea
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Share your experience wearing this saree or jewel..."
                        rows={3}
                        required
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs outline-none focus:border-[#8B1E3F]"
                      />

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#70152B] transition-colors"
                      >
                        Publish Review
                      </button>
                    </form>
                  )}
                </div>

                {/* Existing Reviews */}
                <div className="space-y-4 divide-y divide-[#FBE9EE]">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="pt-4 first:pt-0 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#171316]">{rev.customerName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              Verified Patron
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>

                      <h5 className="text-xs font-semibold text-[#70152B]">{rev.title}</h5>
                      <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
                  Harmonious Companions
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#171316] mt-1">
                  You May Also Cherish
                </h3>
              </div>
              <Link
                href={product.category === 'sarees' ? '/sarees' : '/jewelry'}
                className="text-xs font-bold uppercase tracking-wider text-[#8B1E3F] hover:underline"
              >
                View Collection &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.slice(0, 4).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for High-Res Image Inspection */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
