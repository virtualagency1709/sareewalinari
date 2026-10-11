'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/store';

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    shippingCost,
    total,
    couponCode,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    freeShippingThreshold,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const shippingPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setInputCoupon('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FFF9F7] min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-3xl p-10 sm:p-14 border border-[#D9A0AD]/30 shadow-xs max-w-md w-full text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-[#FBE9EE] flex items-center justify-center mx-auto text-[#8B1E3F]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#171316]">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Your personal trousseau is waiting. Discover our handwoven Banarasi silks and fine handcrafted jewelry.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/sarees"
              className="px-6 py-3 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Explore Sarees
            </Link>
            <Link
              href="/jewelry"
              className="px-6 py-3 rounded-full border border-[#8B1E3F] text-[#8B1E3F] hover:bg-[#FBE9EE] text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Shop Jewelry
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
            Trousseau Selection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316] mt-1">
            Shopping Bag ({itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'})
          </h1>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#D9A0AD]/30 shadow-xs mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#70152B] font-medium mb-2">
            {amountNeeded > 0 ? (
              <span>
                Add <strong className="text-[#8B1E3F] font-bold">{formatINR(amountNeeded)}</strong> more to unlock <strong>Complimentary Express Delivery</strong>
              </span>
            ) : (
              <span className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Congratulations! You have unlocked Complimentary Express Air Shipping.
              </span>
            )}
            <span className="font-bold">{shippingPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#FBE9EE] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D9A0AD] to-[#8B1E3F] transition-all duration-500 rounded-full"
              style={{ width: `${shippingPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Cart Items Table */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-[#D9A0AD]/25 shadow-xs divide-y divide-[#FBE9EE]">
              {items.map((item) => (
                <div key={item.product.id} className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  {/* Image & Details */}
                  <div className="flex gap-4 items-center">
                    <div className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/30">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">
                        {item.product.subcategory}
                      </span>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="block font-serif text-sm sm:text-base font-semibold text-[#171316] hover:text-[#8B1E3F] transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-gray-500 mt-0.5">
                        SKU: {item.product.sku}
                      </p>
                      <span className="text-xs font-bold text-[#70152B] mt-1 block">
                        {formatINR(item.product.price)} each
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                    <div className="flex items-center border border-[#D9A0AD]/40 rounded-xl bg-white overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-[#FBE9EE] text-[#70152B] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#171316]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-[#FBE9EE] text-[#70152B] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-bold text-[#171316]">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continues shopping link */}
            <div className="flex justify-between items-center text-xs font-semibold pt-2">
              <Link href="/sarees" className="text-[#8B1E3F] hover:underline">
                &larr; Continue Exploring Sarees
              </Link>
              <Link href="/jewelry" className="text-[#8B1E3F] hover:underline">
                Explore Matching Jewels &rarr;
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5">
              <h3 className="font-serif text-lg font-bold text-[#171316]">Order Summary</h3>

              {/* Coupon Box */}
              <div className="p-3 rounded-2xl bg-[#FFF9F7] border border-[#D9A0AD]/30 space-y-2">
                <span className="text-[11px] uppercase font-bold text-[#8B1E3F] block">
                  Promotional Voucher
                </span>
                {couponCode ? (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Code <strong>{couponCode}</strong> applied
                    </span>
                    <button onClick={removeCoupon} className="text-red-600 font-semibold hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. UTSAV15, FIRST10"
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs uppercase outline-none focus:border-[#8B1E3F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#8B1E3F] text-white text-xs font-semibold hover:bg-[#70152B] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !couponCode && (
                  <p className="text-[11px] text-red-600">{couponFeedback.message}</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-[#70152B] pt-2 border-t border-[#FBE9EE]">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#171316]">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Voucher Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="font-semibold text-[#171316]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 uppercase font-bold">Free</span>
                    ) : (
                      formatINR(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#171316] pt-3 border-t border-[#FBE9EE]">
                  <span>Total Payable</span>
                  <span className="text-xl text-[#8B1E3F]">{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full py-4 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Assurances */}
              <div className="pt-2 text-[11px] text-gray-500 space-y-2 border-t border-[#FBE9EE]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B1E3F]" />
                  <span>Razorpay 256-bit SSL Encrypted Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B1E3F]" />
                  <span>Authenticity Certificate &amp; Gift Box Included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
