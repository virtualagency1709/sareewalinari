'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('UTSAV15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#70152B] via-[#8B1E3F] to-[#5a0f21] text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-[#A51D36]">
          {/* Subtle floral pattern background */}
          <div className="absolute inset-0 bg-pattern-subtle opacity-10" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#F3E5AB] text-xs font-semibold tracking-widest uppercase border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB]" />
                <span>Festive Heirloom Privileges</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
                Celebrate in Royal Splendor: Flat 15% Off
              </h3>
              <p className="text-xs sm:text-sm text-[#FBE9EE]/90 font-light max-w-xl">
                Elevate your wedding and festive wardrobes with master-woven Banarasi weaves and handset Kundan jewels. Valid across all collections.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
              {/* Voucher Code Box */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-xs text-gray-300">Code:</span>
                <span className="font-mono text-base font-bold text-[#F3E5AB] tracking-widest">
                  UTSAV15
                </span>
                <button
                  onClick={handleCopy}
                  className="p-1 hover:bg-white/20 rounded-md transition-colors text-white"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <Link
                href="/sarees"
                className="px-8 py-3.5 rounded-2xl bg-[#F3E5AB] hover:bg-white text-[#171316] text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Shop Campaign</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
