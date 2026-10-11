'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatINR } from '@/lib/store';

export default function CartDrawer() {
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
    isCartOpen,
    setIsCartOpen,
    freeShippingThreshold,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isCartOpen) return null;

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9F7] shadow-2xl flex flex-col border-l border-[#D9A0AD]/30">
          {/* Header */}
          <div className="p-5 border-b border-[#FBE9EE] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8B1E3F]" />
              <h3 className="font-serif text-lg font-semibold text-[#171316]">
                Shopping Bag ({itemCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-[#FBE9EE] rounded-full text-[#70152B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress bar */}
          <div className="bg-[#FBE9EE]/70 px-5 py-3 border-b border-[#D9A0AD]/20">
            <div className="flex items-center justify-between text-xs text-[#70152B] font-medium mb-1.5">
              {amountNeededForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-[#8B1E3F] font-bold">{formatINR(amountNeededForFreeShipping)}</strong> more for <strong>Free Express Shipping</strong>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Unlocked: Complimentary Luxury Delivery!
                </span>
              )}
              <span className="text-[11px] font-bold">{freeShippingProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#D9A0AD] to-[#8B1E3F] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#FBE9EE]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <div className="w-16 h-16 rounded-full bg-[#FBE9EE] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#8B1E3F]" />
                </div>
                <h4 className="font-serif text-lg text-[#171316] font-medium">Your Bag is Empty</h4>
                <p className="text-xs text-[#70152B]/70 mt-1 max-w-xs">
                  Discover our pure silk sarees and artisanal handcrafted jewelry.
                </p>
                <Link
                  href="/sarees"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-6 py-2.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  Explore Sarees
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-white border border-[#D9A0AD]/30 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-xs font-semibold text-[#171316] hover:text-[#8B1E3F] line-clamp-1 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-[#8B1E3F]">
                        {item.product.subcategory}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#D9A0AD]/50 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 px-2 hover:bg-[#FBE9EE] text-[#70152B] transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#171316]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 px-2 hover:bg-[#FBE9EE] text-[#70152B] transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#70152B]">
                          {formatINR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon and Summary footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#FBE9EE] bg-white space-y-3">
              {/* Coupon Form */}
              <div className="bg-[#FFF9F7] p-2.5 rounded-xl border border-[#D9A0AD]/30">
                {couponCode ? (
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Coupon <strong>{couponCode}</strong> applied!
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Coupon (e.g. FIRST10, UTSAV15)"
                      className="flex-1 bg-white border border-[#D9A0AD]/40 rounded-lg px-2.5 py-1.5 text-xs text-[#171316] outline-none uppercase placeholder:normal-case"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponFeedback && !couponCode && (
                  <p
                    className={`text-[11px] mt-1.5 ${
                      couponFeedback.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#70152B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171316]">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Voucher Discount</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-[#171316]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-semibold uppercase text-[11px]">Free</span>
                    ) : (
                      formatINR(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#171316] pt-2 border-t border-[#FBE9EE]">
                  <span>Total Amount</span>
                  <span className="text-base text-[#8B1E3F]">{formatINR(total)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-center rounded-xl border border-[#8B1E3F] text-[#8B1E3F] hover:bg-[#FBE9EE] text-xs font-semibold tracking-wider uppercase transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 flex items-center justify-center gap-1.5 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-sm"
                >
                  Checkout
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
