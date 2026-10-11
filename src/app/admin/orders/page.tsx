'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShoppingBag,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  X,
  Eye,
  Calendar,
  Save,
} from 'lucide-react';
import { getLocalOrders, updateOrderStatus, formatINR } from '@/lib/store';
import { Order } from '@/types';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Edit tracking fields in modal
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingCourier, setTrackingCourier] = useState('BlueDart Express');
  const [fulfillmentStatus, setFulfillmentStatus] = useState<Order['fulfillmentStatus']>('processing');

  useEffect(() => {
    setOrders(getLocalOrders());
  }, []);

  const openOrderDetail = (order: Order) => {
    setSelectedOrder(order);
    setTrackingNumber(order.trackingNumber || '');
    setTrackingCourier(order.trackingCourier || 'BlueDart Express');
    setFulfillmentStatus(order.fulfillmentStatus);
  };

  const handleUpdateFulfillment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    updateOrderStatus(selectedOrder.id, fulfillmentStatus, trackingNumber, trackingCourier);
    setOrders(getLocalOrders());
    setFeedback(`Order #${selectedOrder.orderNumber} updated successfully.`);
    setSelectedOrder(null);
    setTimeout(() => setFeedback(null), 3000);
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.fulfillmentStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
          Fulfillment Atelier
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#171316] mt-1">
          Customer Orders &amp; Dispatch ({orders.length})
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review placed orders, add air-waybill tracking numbers, and update dispatch status.
        </p>
      </div>

      {feedback && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#D9A0AD]/30 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, customer, email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs text-gray-500 font-medium">Status:</span>
          <div className="flex rounded-xl bg-[#FFF9F7] p-1 border border-[#D9A0AD]/30 text-xs whitespace-nowrap">
            {(['all', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors ${
                  statusFilter === st
                    ? 'bg-[#8B1E3F] text-white font-semibold'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-xs text-gray-500">
            No matching orders found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#FBE9EE] text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Order #</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Customer</th>
                  <th className="pb-3 font-bold">Items</th>
                  <th className="pb-3 font-bold">Amount</th>
                  <th className="pb-3 font-bold">Payment</th>
                  <th className="pb-3 font-bold">Fulfillment</th>
                  <th className="pb-3 font-bold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FBE9EE]">
                {filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FFF9F7] transition-colors">
                    <td className="py-3 font-mono font-bold text-[#8B1E3F]">{order.orderNumber}</td>
                    <td className="py-3 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-[#171316] block">{order.customerName}</span>
                      <span className="text-[11px] text-gray-500 block truncate max-w-xs">{order.customerEmail}</span>
                    </td>
                    <td className="py-3">{order.items.length} items</td>
                    <td className="py-3 font-bold text-[#70152B]">{formatINR(order.total)}</td>
                    <td className="py-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                        {order.paymentMethod} ({order.paymentStatus})
                      </span>
                    </td>
                    <td className="py-3">
                      <span
                        className={`capitalize px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.fulfillmentStatus === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.fulfillmentStatus === 'shipped'
                            ? 'bg-blue-100 text-blue-800'
                            : order.fulfillmentStatus === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {order.fulfillmentStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => openOrderDetail(order)}
                        className="px-3 py-1.5 rounded-lg bg-[#FBE9EE] text-[#8B1E3F] hover:bg-[#8B1E3F] hover:text-white text-xs font-semibold transition-colors"
                      >
                        Inspect &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail & Tracking Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#D9A0AD]/40 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">
                  Order Inspection
                </span>
                <h3 className="font-serif text-xl font-bold text-[#171316]">
                  Order #{selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                Purchased Line Items
              </h4>
              <div className="divide-y divide-[#FBE9EE] max-h-48 overflow-y-auto pr-1">
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/30">
                        <Image src={it.image} alt={it.productName} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#171316] line-clamp-1">{it.productName}</p>
                        <p className="text-[11px] text-gray-500">Qty: {it.quantity} | SKU: {it.sku}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#70152B]">
                      {formatINR(it.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destination & Customer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FFF9F7] text-xs">
              <div>
                <span className="font-bold text-[#8B1E3F] block uppercase text-[10px]">Customer Contact</span>
                <p className="font-semibold text-[#171316] mt-0.5">{selectedOrder.customerName}</p>
                <p className="text-gray-600">{selectedOrder.customerEmail}</p>
                <p className="text-gray-600">{selectedOrder.customerPhone}</p>
              </div>
              <div>
                <span className="font-bold text-[#8B1E3F] block uppercase text-[10px]">Shipping Destination</span>
                <p className="text-gray-600 mt-0.5">
                  {selectedOrder.shippingAddress.addressLine1}, {selectedOrder.shippingAddress.city}
                </p>
                <p className="text-gray-600">
                  {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.postalCode}
                </p>
              </div>
            </div>

            {/* Update Fulfillment & Tracking Form */}
            <form onSubmit={handleUpdateFulfillment} className="space-y-4 pt-2 border-t border-[#FBE9EE]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8B1E3F]">
                Fulfillment &amp; Courier Tracking Update
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    Fulfillment Status
                  </label>
                  <select
                    value={fulfillmentStatus}
                    onChange={(e) => setFulfillmentStatus(e.target.value as Order['fulfillmentStatus'])}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    Courier Partner
                  </label>
                  <input
                    type="text"
                    value={trackingCourier}
                    onChange={(e) => setTrackingCourier(e.target.value)}
                    placeholder="e.g. BlueDart Express"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-gray-700 block mb-1">
                    AWB Tracking Code
                  </label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="e.g. BLU-98765432"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D9A0AD]/40 text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Order</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
