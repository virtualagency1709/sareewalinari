'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  ArrowRight,
  Printer,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { Order } from '@/types';
import { getLocalOrders, formatINR } from '@/lib/store';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A51D36', '#D4AF37', '#70152B', '#F3E5AB'],
      });
    } catch {
      // Ignored if confetti unavailable
    }

    // Retrieve order
    const orders = getLocalOrders();
    const found = orders.find((o) => o.id === orderId);
    if (found) {
      setOrder(found);
    }
  }, [orderId]);

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xl space-y-8">
          {/* Header */}
          <div className="text-center max-w-lg mx-auto space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B1E3F]">
              Order Confirmed &amp; Dispatched for Loom Inspection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316]">
              Thank You for Your Patronage!
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Your order <strong className="text-[#8B1E3F] font-mono">{order?.orderNumber || 'SWN-2026-CONFIRMED'}</strong> has been safely recorded. A confirmation receipt has been dispatched to {order?.customerEmail || 'your email'}.
            </p>
          </div>

          {/* Delivery & Tracking Timeline */}
          <div className="p-6 rounded-2xl bg-[#FAF5F2] border border-[#D9A0AD]/25 space-y-4">
            <div className="flex items-center justify-between text-xs text-[#70152B] font-semibold border-b border-[#D9A0AD]/30 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#8B1E3F]" />
                <span>Estimated Delivery: Within 3–5 Business Days</span>
              </div>
              <span className="text-[11px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Status: Processing
              </span>
            </div>

            {/* Stages */}
            <div className="grid grid-cols-4 gap-2 text-center text-[11px] pt-2">
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center mx-auto font-bold text-[10px]">
                  ✓
                </div>
                <span className="font-semibold text-[#8B1E3F]">Placed</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-[#8B1E3F] text-white flex items-center justify-center mx-auto font-bold text-[10px]">
                  ✓
                </div>
                <span className="font-semibold text-[#8B1E3F]">Processing</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mx-auto font-bold text-[10px]">
                  3
                </div>
                <span className="text-gray-400">Packed</span>
              </div>
              <div className="space-y-1">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center mx-auto font-bold text-[10px]">
                  4
                </div>
                <span className="text-gray-400">Delivered</span>
              </div>
            </div>
          </div>

          {/* Itemized Invoice Breakdown */}
          {order && (
            <div className="space-y-4 pt-4 border-t border-[#FBE9EE]">
              <h3 className="font-serif text-lg font-bold text-[#171316]">Ordered Heirlooms</h3>
              <div className="divide-y divide-[#FBE9EE]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/30">
                        <Image src={item.image} alt={item.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#171316] line-clamp-1">
                          {item.productName}
                        </h4>
                        <span className="text-[11px] text-gray-500">
                          Qty: {item.quantity} | SKU: {item.sku}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#70152B]">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="p-4 rounded-xl bg-[#FFF9F7] space-y-1.5 text-xs text-[#70152B] border border-[#D9A0AD]/25">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-medium text-[#171316]">{formatINR(order.subtotal)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount:</span>
                    <span>-{formatINR(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-medium text-[#171316]">
                    {order.shippingCost === 0 ? 'Free' : formatINR(order.shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#171316] pt-2 border-t border-[#FBE9EE]">
                  <span>Total Amount Paid:</span>
                  <span className="text-base text-[#8B1E3F]">{formatINR(order.total)}</span>
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="p-4 rounded-xl bg-white border border-[#D9A0AD]/25 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#8B1E3F] block">
                  Delivery Destination:
                </span>
                <p className="font-semibold text-[#171316]">{order.shippingAddress.fullName}</p>
                <p className="text-gray-600">{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</p>
                <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode}</p>
                <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#FBE9EE] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/account/orders"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#8B1E3F] text-[#8B1E3F] hover:bg-[#FBE9EE] text-xs font-semibold uppercase tracking-wider transition-colors text-center"
            >
              View in My Orders
            </Link>

            <Link
              href="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <span>Return to Boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
