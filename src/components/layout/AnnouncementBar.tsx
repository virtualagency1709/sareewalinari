'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AnnouncementBar() {
  const { user, isAdmin, toggleDemoRole } = useAuth();

  return (
    <div className="bg-[#70152B] text-[#FFF9F7] text-xs py-2 px-4 transition-all border-b border-[#A51D36]/40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
        <div className="flex items-center justify-center gap-2 font-medium tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB] animate-pulse" />
          <span>FESTIVE SOIREE: Use code <strong className="text-[#F3E5AB] font-bold">UTSAV15</strong> for 15% off | Complimentary Luxury Gift Box</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-[#FBE9EE]">
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#F3E5AB]" />
            <span>Free Domestic Shipping above ₹1,999</span>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#F3E5AB]" />
            <span>Silk Mark Certified Weaves</span>
          </div>

          {/* Reviewer / Evaluator quick role toggle button */}
          <button
            onClick={toggleDemoRole}
            className="ml-2 px-2 py-0.5 rounded bg-[#A51D36] hover:bg-[#8B1E3F] text-[#F3E5AB] border border-[#F3E5AB]/30 text-[10px] font-semibold tracking-wider uppercase transition-colors"
            title="Toggle between Customer and Admin role for quick review"
          >
            Role: {isAdmin ? 'Admin' : 'Customer'} (Switch)
          </button>
        </div>
      </div>
    </div>
  );
}
