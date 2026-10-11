'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Sliders,
  Users,
  Settings,
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, isAdmin, toggleDemoRole } = useAuth();

  // If not admin, render access guard with authorization prompt
  if (!isAdmin) {
    return (
      <div className="bg-[#171316] min-h-screen flex items-center justify-center p-4">
        <div className="bg-[#241e23] border border-[#8B1E3F]/50 rounded-3xl p-8 sm:p-12 max-w-md w-full text-center space-y-6 text-white shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-[#8B1E3F]/20 border border-[#8B1E3F] text-[#F3E5AB] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#F3E5AB]">
              Access Authorization Required
            </span>
            <h1 className="font-serif text-2xl font-bold text-white">
              Restricted Atelier Portal
            </h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              You are currently authenticated as an ordinary customer (<strong className="text-white">{user?.email || 'Guest'}</strong>). Administrative authorization is required to access inventory and fulfillment systems.
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
    { name: 'Orders & Tracking', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Hero & Content', href: '/admin/content', icon: Sliders },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Store Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F5EBE6] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#171316] text-white flex-shrink-0 flex flex-col justify-between border-r border-[#8B1E3F]/30 p-5">
        <div>
          {/* Logo & Portal Brand */}
          <div className="flex items-center gap-3 pb-6 border-b border-white/10">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#D9A0AD]/40">
              <Image src="/images/logo.png" alt="Saree Wali Nari Logo" fill className="object-cover" />
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
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#8B1E3F] text-white shadow-xs'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-[11px] text-gray-300">
            <p className="font-semibold text-white truncate">{user?.fullName || 'Administrator'}</p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3" />
              Role: Master Administrator
            </p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Storefront View</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto min-h-screen p-6 sm:p-10">
        {children}
      </main>
    </div>
  );
}
