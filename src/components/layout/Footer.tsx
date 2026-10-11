'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, CheckCircle2, ShieldCheck, Truck, RefreshCw, HeartHandshake } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#171316] text-[#FFF9F7] pt-16 pb-10 border-t border-[#8B1E3F]/30">
      {/* Trust Badges Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#70152B]/40 border border-[#A51D36] flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6 text-[#F3E5AB]" />
            </div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-white">Silk Mark Certified</h5>
            <p className="text-[11px] text-gray-400 mt-1">100% Guaranteed Pure Handloom Silks</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#70152B]/40 border border-[#A51D36] flex items-center justify-center mb-3">
              <Truck className="w-6 h-6 text-[#F3E5AB]" />
            </div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-white">Complimentary Delivery</h5>
            <p className="text-[11px] text-gray-400 mt-1">Free Express Pan-India on orders &gt; ₹1,999</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#70152B]/40 border border-[#A51D36] flex items-center justify-center mb-3">
              <RefreshCw className="w-6 h-6 text-[#F3E5AB]" />
            </div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-white">Hassle-Free Returns</h5>
            <p className="text-[11px] text-gray-400 mt-1">7-Day return policy for unworn drapes</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#70152B]/40 border border-[#A51D36] flex items-center justify-center mb-3">
              <HeartHandshake className="w-6 h-6 text-[#F3E5AB]" />
            </div>
            <h5 className="font-semibold text-xs tracking-wider uppercase text-white">Artisan Fair Trade</h5>
            <p className="text-[11px] text-gray-400 mt-1">Direct patronage to generational weavers</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#D9A0AD]/40 shadow-xs">
                <Image
                  src="/images/logo.png"
                  alt="Saree Wali Nari Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block">
                  Saree Wali Nari
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D9A0AD]">
                  Drape your dreams
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Saree Wali Nari celebrates the sacred geometry and timeless poetry of Indian handlooms. From the Ghats of Varanasi to the temple looms of Kanchipuram, each thread is woven with pure love, heritage, and devotion.
            </p>
            <div className="pt-2 text-xs text-gray-400">
              <p className="font-medium text-white">Boutique Atelier:</p>
              <p>12 Heritage Enclave, Civil Lines, Varanasi, UP, 221002</p>
              <p className="mt-1">Care Concierge: +91 98765 43210 | care@sareewalinari.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#F3E5AB]">
              Treasured Weaves
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/collections/banarasi" className="hover:text-white transition-colors">
                  Banarasi Katan Silk
                </Link>
              </li>
              <li>
                <Link href="/collections/silk" className="hover:text-white transition-colors">
                  Kanjivaram & Paithani
                </Link>
              </li>
              <li>
                <Link href="/collections/organza" className="hover:text-white transition-colors">
                  Hand-Painted Organza
                </Link>
              </li>
              <li>
                <Link href="/collections/georgette" className="hover:text-white transition-colors">
                  Chikankari Georgette
                </Link>
              </li>
              <li>
                <Link href="/collections/printed" className="hover:text-white transition-colors">
                  Ajrakh & Dabu Prints
                </Link>
              </li>
              <li>
                <Link href="/collections/bridal" className="hover:text-white transition-colors">
                  Bridal Zardozi Drapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Fine Jewelry */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#F3E5AB]">
              Fine Jewelry
            </h5>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/collections/earrings" className="hover:text-white transition-colors">
                  Kundan Chaandbaalis
                </Link>
              </li>
              <li>
                <Link href="/collections/necklaces" className="hover:text-white transition-colors">
                  Hasli & Rani Haar
                </Link>
              </li>
              <li>
                <Link href="/collections/bangles" className="hover:text-white transition-colors">
                  Jadau Openable Kadas
                </Link>
              </li>
              <li>
                <Link href="/collections/pendants" className="hover:text-white transition-colors">
                  Peacock Enamel Pendants
                </Link>
              </li>
              <li>
                <Link href="/collections/jewelry-sets" className="hover:text-white transition-colors">
                  Navratna Bridal Sets
                </Link>
              </li>
              <li>
                <Link href="/jewelry" className="hover:text-white transition-colors">
                  View All Fine Jewels
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h5 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#F3E5AB]">
              Private Salon Circle
            </h5>
            <p className="text-xs text-gray-400">
              Receive private invitations to bridal trunk shows and preview new weaves before public release.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#70152B]/60 border border-[#A51D36] text-xs text-[#FFF9F7] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Thank you. You are on the invitation list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-400 outline-none focus:border-[#D4AF37]"
                  />
                  <Mail className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#A51D36] to-[#70152B] hover:opacity-90 text-white text-xs font-semibold uppercase tracking-wider transition-opacity"
                >
                  Join Circle
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} Saree Wali Nari. All rights reserved. Handcrafted with reverence in India.</p>
          <div className="flex items-center space-x-6">
            <Link href="/shipping-policy" className="hover:text-white transition-colors">
              Shipping Policy
            </Link>
            <Link href="/returns" className="hover:text-white transition-colors">
              Returns & Care
            </Link>
            <Link href="/about" className="hover:text-white transition-colors">
              Heritage Story
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Atelier Appointments
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
