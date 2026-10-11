'use client';

import React from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { getLocalOrders, formatINR } from '@/lib/store';

export default function AccountOverviewPage() {
  const { user, isAdmin, logout } = useAuth();
  const { wishlistCount } = useWishlist();
  const orders = getLocalOrders();

  if (!user) {
    return (
      <div className="bg-[#FFF9F7] min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl text-center space-y-4 max-w-sm border border-[#D9A0AD]/30">
          <h2 className="font-serif text-xl font-bold">Please Sign In</h2>
          <p className="text-xs text-gray-500">Sign in to view your orders and personal salon profile.</p>
          <Link
            href="/login"
            className="inline-block px-6 py-2.5 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const recentOrder = orders[0];

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#D9A0AD]/30 shadow-xs mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B1E3F] to-[#70152B] text-white font-serif text-2xl font-bold flex items-center justify-center shadow-md">
              {user.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
                  Namaste, {user.fullName}
                </h1>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FBE9EE] text-[#8B1E3F]">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-xl bg-[#8B1E3F] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Settings className="w-4 h-4" />
                <span>Admin Dashboard</span>
              </Link>
            )}
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Link
            href="/account/orders"
            className="p-6 rounded-2xl bg-white border border-[#D9A0AD]/30 hover:border-[#8B1E3F] shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#171316]">My Orders</h3>
            <p className="text-xs text-gray-500 mt-1">{orders.length} Placed Orders</p>
          </Link>

          <Link
            href="/account/wishlist"
            className="p-6 rounded-2xl bg-white border border-[#D9A0AD]/30 hover:border-[#8B1E3F] shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#171316]">Saved Wishlist</h3>
            <p className="text-xs text-gray-500 mt-1">{wishlistCount} Favorited Pieces</p>
          </Link>

          <Link
            href="/account/addresses"
            className="p-6 rounded-2xl bg-white border border-[#D9A0AD]/30 hover:border-[#8B1E3F] shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#171316]">Saved Addresses</h3>
            <p className="text-xs text-gray-500 mt-1">{user.addresses.length} Delivery Destinations</p>
          </Link>

          <Link
            href="/account/settings"
            className="p-6 rounded-2xl bg-white border border-[#D9A0AD]/30 hover:border-[#8B1E3F] shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#171316]">Profile Settings</h3>
            <p className="text-xs text-gray-500 mt-1">Manage details &amp; preferences</p>
          </Link>
        </div>

        {/* Most Recent Order Spotlight */}
        {recentOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#FBE9EE] pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#8B1E3F]">
                  Most Recent Purchase
                </span>
                <h3 className="font-serif text-lg font-bold text-[#171316]">
                  Order #{recentOrder.orderNumber}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-50 text-amber-800">
                {recentOrder.fulfillmentStatus}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-gray-600">
              <div>
                <p>Date: {new Date(recentOrder.createdAt).toLocaleDateString()}</p>
                <p>Items: {recentOrder.items.length} Heirloom Products</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-[#70152B]">
                  Total: {formatINR(recentOrder.total)}
                </span>
              </div>
            </div>

            <Link
              href="/account/orders"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E3F] hover:underline pt-2"
            >
              <span>View Full Order Details &amp; Live Tracking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
