'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, Truck, CheckCircle2, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { Order } from '@/types';
import { getLocalOrders, formatINR } from '@/lib/store';

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getLocalOrders());
  }, []);

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B1E3F] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account Overview</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#171316]">
            Order History &amp; Tracking
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Monitor the dispatch and handloom preparation of your bespoke orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D9A0AD]/30 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FBE9EE] flex items-center justify-center mx-auto text-[#8B1E3F]">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#171316]">No Orders Placed Yet</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              You have not placed any orders yet. Discover our latest pure silk drapes and fine jewelry.
            </p>
            <Link
              href="/sarees"
              className="inline-block px-6 py-2.5 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#FBE9EE] pb-4 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">
                      Order #{order.orderNumber}
                    </span>
                    <p className="text-xs text-gray-500">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FBE9EE] text-[#8B1E3F]">
                      Status: {order.fulfillmentStatus}
                    </span>
                    <span className="text-sm font-bold text-[#171316]">
                      {formatINR(order.total)}
                    </span>
                  </div>
                </div>

                {/* Tracking Courier Info if added */}
                {order.trackingNumber && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>
                        Courier: <strong>{order.trackingCourier || 'BlueDart Express'}</strong> | AWB Tracking: <strong>{order.trackingNumber}</strong>
                      </span>
                    </div>
                  </div>
                )}

                {/* Items in this order */}
                <div className="divide-y divide-[#FBE9EE]">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/30">
                          <Image src={item.image} alt={item.productName} fill className="object-cover" />
                        </div>
                        <div>
                          <Link
                            href={`/products/${item.productSlug}`}
                            className="font-serif text-sm font-semibold text-[#171316] hover:text-[#8B1E3F] line-clamp-1"
                          >
                            {item.productName}
                          </Link>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Qty: {item.quantity} | SKU: {item.sku}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#70152B]">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Destination */}
                <div className="pt-3 border-t border-[#FBE9EE] text-xs text-gray-600 flex flex-col sm:flex-row justify-between gap-2">
                  <div>
                    <span className="font-semibold text-[#171316]">Delivery Address: </span>
                    {order.shippingAddress.fullName}, {order.shippingAddress.addressLine1}, {order.shippingAddress.city} ({order.shippingAddress.postalCode})
                  </div>
                  <div>
                    <span className="font-semibold text-[#171316]">Payment: </span>
                    <span className="capitalize">{order.paymentMethod}</span> ({order.paymentStatus})
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
