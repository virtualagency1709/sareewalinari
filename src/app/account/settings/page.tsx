'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountSettingsPage() {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullName, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B1E3F] mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Account Overview</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-[#171316]">
            Profile &amp; Security Settings
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Update personal contact details and communication preferences.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-4"
        >
          {saved && (
            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Profile settings updated successfully.</span>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-xs text-gray-500 cursor-not-allowed"
            />
            <span className="text-[10px] text-gray-400 mt-0.5 block">
              Contact atelier concierge to update primary email address.
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            Save Profile Changes
          </button>
        </form>
      </div>
    </div>
  );
}
