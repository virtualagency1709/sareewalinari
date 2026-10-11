'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Package,
  AlertTriangle,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle2,
  Plus,
} from 'lucide-react';
import { getLocalProducts, getLocalOrders, formatINR, updateOrderStatus } from '@/lib/store';
import { Product, Order } from '@/types';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setProducts(getLocalProducts());
    setOrders(getLocalOrders());
  }, []);

  // Compute KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.fulfillmentStatus === 'processing' || o.fulfillmentStatus === 'pending').length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const handleStatusChange = (orderId: string, newStatus: Order['fulfillmentStatus']) => {
    updateOrderStatus(orderId, newStatus);
    setOrders(getLocalOrders());
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
            Executive Atelier Intelligence
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#171316] mt-1">
            Store Performance Overview
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time catalog metrics, verified order revenues, and inventory status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Verified Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-[#D9A0AD]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Verified Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              ₹
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
            {formatINR(totalRevenue)}
          </h3>
          <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>100% Verified Real Ledger Data</span>
          </p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-3xl border border-[#D9A0AD]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
            {totalOrders}
          </h3>
          <p className="text-[11px] text-gray-500">
            Across online Razorpay &amp; POD
          </p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-3xl border border-[#D9A0AD]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Fulfillment Pipeline</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
            {pendingOrders}
          </h3>
          <p className="text-[11px] text-amber-700 font-medium">
            Awaiting dispatch or weaver packing
          </p>
        </div>

        {/* Total Catalog Products */}
        <div className="bg-white p-6 rounded-3xl border border-[#D9A0AD]/30 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-gray-500 text-xs font-semibold uppercase tracking-wider">
            <span>Catalog Items</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
            {products.length}
          </h3>
          <p className="text-[11px] text-gray-500">
            20 Sarees + 10 Jewelry Pieces
          </p>
        </div>
      </div>

      {/* Low Stock Alerts Banner */}
      {lowStockProducts.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border-l-4 border-l-amber-500 border border-[#D9A0AD]/30 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-800 font-serif text-base font-bold">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Low Inventory Warning ({lowStockProducts.length} Items &le; 5 units)</span>
            </div>
            <Link
              href="/admin/products"
              className="text-xs font-bold text-[#8B1E3F] hover:underline"
            >
              Update Stock &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {lowStockProducts.slice(0, 3).map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-[#FFF9F7] text-xs space-y-1 border border-[#D9A0AD]/30">
                <span className="font-semibold text-[#171316] line-clamp-1">{p.name}</span>
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>SKU: {p.sku}</span>
                  <span className="text-red-600 font-bold">Only {p.stock} left</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-[#FBE9EE] pb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#171316]">Recent Orders</h2>
            <p className="text-xs text-gray-500">Latest transactions requiring fulfillment</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#8B1E3F] hover:underline flex items-center gap-1"
          >
            <span>View All Orders ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-500">
            No orders placed yet. Add demo items to cart and complete checkout to see real records here!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#FBE9EE] text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-bold">Order #</th>
                  <th className="pb-3 font-bold">Customer</th>
                  <th className="pb-3 font-bold">Date</th>
                  <th className="pb-3 font-bold">Total</th>
                  <th className="pb-3 font-bold">Payment</th>
                  <th className="pb-3 font-bold">Fulfillment</th>
                  <th className="pb-3 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FBE9EE]">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-[#FFF9F7] transition-colors">
                    <td className="py-3 font-mono font-bold text-[#8B1E3F]">{o.orderNumber}</td>
                    <td className="py-3 font-medium text-[#171316]">{o.customerName}</td>
                    <td className="py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 font-bold text-[#171316]">{formatINR(o.total)}</td>
                    <td className="py-3">
                      <span className="capitalize px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800">
                        {o.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3">
                      <select
                        value={o.fulfillmentStatus}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as Order['fulfillmentStatus'])}
                        className="bg-white border border-[#D9A0AD]/40 text-[11px] font-medium rounded-lg px-2 py-1 outline-none"
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-3">
                      <Link
                        href="/admin/orders"
                        className="text-[#8B1E3F] hover:underline font-semibold"
                      >
                        Manage &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
