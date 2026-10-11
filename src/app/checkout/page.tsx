'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatINR, saveOrder } from '@/lib/store';
import { Address, Order, PaymentMethod } from '@/types';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, shippingCost, total, couponCode, clearCart } = useCart();
  const { user } = useAuth();

  // Address form fields
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [addressLine1, setAddressLine1] = useState(user?.addresses[0]?.addressLine1 || '');
  const [addressLine2, setAddressLine2] = useState(user?.addresses[0]?.addressLine2 || '');
  const [landmark, setLandmark] = useState(user?.addresses[0]?.landmark || '');
  const [city, setCity] = useState(user?.addresses[0]?.city || 'Bengaluru');
  const [state, setState] = useState(user?.addresses[0]?.state || 'Karnataka');
  const [postalCode, setPostalCode] = useState(user?.addresses[0]?.postalCode || '560034');

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('razorpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showRazorpaySandboxModal, setShowRazorpaySandboxModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string>('');

  if (items.length === 0) {
    return (
      <div className="bg-[#FFF9F7] min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white rounded-3xl p-10 border border-[#D9A0AD]/30 shadow-xs max-w-md w-full text-center space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#171316]">Your Bag is Empty</h2>
          <p className="text-xs text-gray-500">Please select sarees or jewelry before checkout.</p>
          <Link
            href="/sarees"
            className="inline-block px-6 py-3 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider"
          >
            Explore Sarees
          </Link>
        </div>
      </div>
    );
  }

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !addressLine1 || !city || !postalCode) {
      alert('Please fill in all mandatory address details.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Call server verification API
      const response = await fetch('/api/checkout/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          couponCode,
        }),
      });

      const serverData = await response.json();
      if (!response.ok) {
        throw new Error(serverData.error || 'Server validation failed');
      }

      const shippingAddress: Address = {
        id: `addr-${Date.now()}`,
        fullName,
        phone,
        addressLine1,
        addressLine2,
        landmark,
        city,
        state,
        postalCode,
      };

      const orderNumber = `SWN-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        customerId: user?.id,
        customerEmail: email,
        customerName: fullName,
        customerPhone: phone,
        shippingAddress,
        items: items.map((item) => ({
          productId: item.product.id,
          productSlug: item.product.slug,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          sku: item.product.sku,
          image: item.product.images[0],
        })),
        subtotal: serverData.subtotal,
        discount: serverData.discount,
        shippingCost: serverData.shippingCost,
        total: serverData.total,
        couponCode,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        fulfillmentStatus: 'processing',
        createdAt: new Date().toISOString(),
      };

      // Save order to store
      saveOrder(newOrder);

      if (paymentMethod === 'razorpay') {
        // Open Razorpay sandbox simulator
        setPendingOrderId(newOrder.id);
        setShowRazorpaySandboxModal(true);
        setIsSubmitting(false);
      } else {
        // COD order completed immediately
        clearCart();
        router.push(`/order-success/${newOrder.id}`);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      alert('Unable to process order. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleCompleteRazorpayPayment = async () => {
    // Verify server-side
    await fetch('/api/checkout/razorpay/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        razorpayOrderId: `pay_order_${pendingOrderId}`,
        razorpayPaymentId: `pay_${Date.now()}`,
        razorpaySignature: 'simulated_signature_verified',
      }),
    });

    clearCart();
    router.push(`/order-success/${pendingOrderId}`);
  };

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            Secure Pan-India Dispatch
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316] mt-1">
            Luxury Checkout
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Complimentary luxury hard-shell presentation box with every heirloom order.
          </p>
        </div>

        <form onSubmit={handleCreateOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Delivery Address & Payment Method */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Contact & Shipping Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#FBE9EE] pb-4">
                <h2 className="font-serif text-lg font-bold text-[#171316] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#8B1E3F] text-white text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  Shipping &amp; Delivery Destination
                </h2>
                {user && (
                  <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full font-semibold">
                    Logged in as {user.fullName}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Contact Phone Number (for courier updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Email Address (for order tracking &amp; invoice) *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya.sharma@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Flat / House No. / Building / Street *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    placeholder="e.g. Flat 402, Lotus Grand Residences, 4th Block"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Area / Locality / Sector
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder="e.g. Koramangala"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Landmark
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g. Near Wipro Park"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="560034"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Gateway Selection Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-4">
              <h2 className="font-serif text-lg font-bold text-[#171316] flex items-center gap-2 border-b border-[#FBE9EE] pb-4">
                <span className="w-6 h-6 rounded-full bg-[#8B1E3F] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                Payment Options (Indian Rupees - INR)
              </h2>

              <div className="space-y-3">
                {/* Razorpay Option */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-[#8B1E3F] bg-[#FFF9F7] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-[#8B1E3F] w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#171316] block">
                        Razorpay Secure Gateway (UPI / Credit &amp; Debit Card / Netbanking)
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Supports Google Pay, PhonePe, Paytm, All Major Indian Cards &amp; NetBanking.
                      </span>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#8B1E3F]" />
                </label>

                {/* Cash on Delivery Option */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#8B1E3F] bg-[#FFF9F7] shadow-xs'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="accent-[#8B1E3F] w-4 h-4"
                    />
                    <div>
                      <span className="font-semibold text-xs text-[#171316] block">
                        Pay on Delivery (Cash / UPI at Doorstep)
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Inspect security sealed hard-box before paying courier executive.
                      </span>
                    </div>
                  </div>
                  <Banknote className="w-5 h-5 text-[#8B1E3F]" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[#171316]">
                Bag Review ({items.length} {items.length === 1 ? 'Design' : 'Designs'})
              </h3>

              {/* Items Thumbnail Mini-List */}
              <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#FBE9EE] pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                    <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/30">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">
                        Qty: {item.quantity}
                      </span>
                      <p className="text-xs font-semibold text-[#171316] truncate">
                        {item.product.name}
                      </p>
                      <span className="text-xs font-bold text-[#70152B]">
                        {formatINR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-[#70152B] pt-4 border-t border-[#FBE9EE]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#171316]">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Coupon Voucher ({couponCode})</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="font-semibold text-[#171316]">
                    {shippingCost === 0 ? (
                      <span className="text-emerald-700 font-bold uppercase">Free</span>
                    ) : (
                      formatINR(shippingCost)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#171316] pt-3 border-t border-[#FBE9EE]">
                  <span>Grand Total</span>
                  <span className="text-xl text-[#8B1E3F]">{formatINR(total)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying Order...' : `Complete Order — ${formatINR(total)}`}</span>
              </button>

              <div className="pt-2 text-[11px] text-gray-500 space-y-2 border-t border-[#FBE9EE]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8B1E3F]" />
                  <span>256-Bit Bank Grade SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#8B1E3F]" />
                  <span>Tamper-Proof Box &amp; Live Tracking Updates</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Razorpay Interactive Sandbox Simulator Modal */}
      {showRazorpaySandboxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#D9A0AD]/40 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#8B1E3F]" />
                <span className="font-serif text-lg font-bold text-[#171316]">
                  Razorpay Payment Simulator
                </span>
              </div>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full uppercase">
                Test Mode
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              In test mode, Razorpay credentials are simulated safely without deducting real funds. Click below to authorize payment for <strong className="text-[#8B1E3F]">{formatINR(total)}</strong>.
            </p>

            <div className="p-3 bg-[#FFF9F7] rounded-xl border border-[#D9A0AD]/30 space-y-1 text-xs">
              <p><strong>Merchant:</strong> Saree Wali Nari Private Atelier</p>
              <p><strong>Order Amount:</strong> {formatINR(total)}</p>
              <p><strong>Currency:</strong> INR</p>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={handleCompleteRazorpayPayment}
                className="flex-1 py-3 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Simulate Successful Payment &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
