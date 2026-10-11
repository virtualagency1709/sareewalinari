'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Sliders,
  Users,
  Settings,
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, toggleDemoRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If not admin, render access guard with authorization prompt
  if (!isAdmin) {
    return (
      <div className="bg-[#171316] min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#241e23] border border-[#8B1E3F]/50 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 text-white shadow-2xl">
          {/* Constrained Brand Logo */}
          <div className="relative w-14 h-14 max-w-[56px] max-h-[56px] rounded-full overflow-hidden border border-[#D9A0AD]/40 shadow-xs mx-auto bg-white/10 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Saree Wali Nari Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="w-14 h-14 rounded-full bg-[#8B1E3F]/20 border border-[#8B1E3F] text-[#F3E5AB] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F3E5AB]">
              Access Authorization Required
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              Restricted Atelier Portal
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              You are currently authenticated as an ordinary customer (<strong className="text-white">{user?.email || 'Guest'}</strong>). Administrative authorization is required to access inventory, orders, and fulfillment systems.
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <button
              onClick={toggleDemoRole}
              className="w-full py-3.5 rounded-2xl bg-[#8B1E3F] hover:bg-[#A51D36] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F3E5AB]" />
              <span>Switch to Administrator (Evaluation Review)</span>
            </button>

            <Link
              href="/"
              className="inline-block text-xs text-gray-400 hover:text-white transition-colors"
            >
              &larr; Return to Customer Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Products & Stock', href: '/admin/products', icon: Package },
    { name: 'Categories & Catalog', href: '/admin/products?filter=categories', icon: Layers },
    { name: 'Orders & Tracking', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Hero & Content', href: '/admin/content', icon: Sliders },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Executive Atelier Dashboard';
    if (pathname.startsWith('/admin/products/new')) return 'Add New Product';
    if (pathname.includes('/edit')) return 'Edit Product Details';
    if (pathname.startsWith('/admin/products')) return 'Product Catalog & Inventory';
    if (pathname.startsWith('/admin/orders')) return 'Order Fulfillment & Shipments';
    if (pathname.startsWith('/admin/content')) return 'Hero & Content Management';
    if (pathname.startsWith('/admin/customers')) return 'Customer Directory';
    if (pathname.startsWith('/admin/settings')) return 'Store Configuration';
    return 'Admin Portal';
  };

  return (
    <div className="min-h-screen bg-[#FFF9F7] flex flex-col md:flex-row">
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#171316] text-white px-4 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 max-w-[32px] max-h-[32px] rounded-full overflow-hidden border border-[#D9A0AD]/40 flex-shrink-0 bg-white/10">
            <Image
              src="/images/logo.png"
              alt="Saree Wali Nari Logo"
              width={32}
              height={32}
              className="w-full h-full object-contain object-center"
            />
          </div>
          <div>
            <span className="font-serif text-sm font-bold block leading-none">Saree Wali Nari</span>
            <span className="text-[9px] uppercase tracking-widest text-[#F3E5AB]">Admin Atelier</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-300 hover:text-white"
          aria-label="Toggle admin navigation"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          isMobileMenuOpen ? 'block' : 'hidden'
        } md:flex w-full md:w-64 bg-[#171316] text-white flex-shrink-0 flex-col justify-between border-r border-[#8B1E3F]/30 p-5 z-30`}
      >
        <div>
          {/* Logo & Portal Brand (Desktop) */}
          <div className="hidden md:flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="relative w-10 h-10 max-w-[40px] max-h-[40px] rounded-full overflow-hidden border border-[#D9A0AD]/40 flex-shrink-0 bg-white/10">
              <Image
                src="/images/logo.png"
                alt="Saree Wali Nari Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain object-center"
              />
            </div>
            <div>
              <span className="font-serif text-sm font-bold tracking-tight text-white block">
                Saree Wali Nari
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#F3E5AB] font-semibold">
                Director Atelier Portal
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href.split('?')[0]);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#8B1E3F] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10 space-y-3 mt-8 md:mt-0">
          <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-[11px] text-gray-300">
            <p className="font-semibold text-white truncate">{user?.fullName || 'Administrator'}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 flex-shrink-0" />
              <span>Role: Master Administrator</span>
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront View</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Dashboard Header */}
        <header className="bg-white border-b border-[#D9A0AD]/30 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/admin" className="hover:text-[#8B1E3F] font-medium">
              Admin
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="font-semibold text-[#171316]">{getPageTitle()}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Catalog Active
            </span>

            <Link
              href="/"
              target="_blank"
              className="px-3.5 py-1.5 rounded-full border border-[#D9A0AD] text-[#70152B] hover:bg-[#FBE9EE] text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <span>View Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={toggleDemoRole}
              className="px-3.5 py-1.5 rounded-full bg-[#171316] text-[#F3E5AB] hover:bg-[#241e23] text-xs font-semibold uppercase tracking-wider transition-colors"
              title="Toggle role for testing"
            >
              Switch Role
            </button>
          </div>
        </header>

        {/* Child Page Content */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
