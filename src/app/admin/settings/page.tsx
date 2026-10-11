'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldCheck, CreditCard, Truck } from 'lucide-react';
import { formatINR } from '@/lib/store';

export default function AdminSettingsPage() {
  const [shippingThreshold, setShippingThreshold] = useState(1999);
  const [standardShippingFee, setStandardShippingFee] = useState(150);
  const [razorpayTestMode, setRazorpayTestMode] = useState(true);
  const [storeEmail, setStoreEmail] = useState('care@sareewalinari.com');
  const [storePhone, setStorePhone] = useState('+91 98765 43210');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
          Configuration Atelier
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#171316] mt-1">
          Store &amp; Payment Gateway Settings
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage currency thresholds, shipping policies, and payment environment modes.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center gap-2 border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Atelier settings saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Shipping Configurations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5">
          <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#171316] border-b pb-3">
            <Truck className="w-5 h-5 text-[#8B1E3F]" />
            <span>Shipping &amp; Delivery Logistics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Free Shipping Threshold (INR)
              </label>
              <input
                type="number"
                value={shippingThreshold}
                onChange={(e) => setShippingThreshold(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                Orders above this amount receive complimentary shipping.
              </span>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">
                Standard Shipping Fee (INR)
              </label>
              <input
                type="number"
                value={standardShippingFee}
                onChange={(e) => setStandardShippingFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <span className="text-[10px] text-gray-400 mt-0.5 block">
                Charged when total is below threshold.
              </span>
            </div>
          </div>
        </div>

        {/* Payment Gateway Configurations */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5">
          <div className="flex items-center gap-2 font-serif text-lg font-bold text-[#171316] border-b pb-3">
            <CreditCard className="w-5 h-5 text-[#8B1E3F]" />
            <span>Razorpay Indian Payment Gateway</span>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/30 cursor-pointer">
              <input
                type="checkbox"
                checked={razorpayTestMode}
                onChange={(e) => setRazorpayTestMode(e.target.checked)}
                className="accent-[#8B1E3F] w-4 h-4"
              />
              <div>
                <span className="text-xs font-bold text-[#171316] block">
                  Enable Sandbox / Test Simulation Mode
                </span>
                <span className="text-[11px] text-gray-500">
                  Allows mock Razorpay checkout verification without active API keys.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Atelier Contact Details */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs space-y-5">
          <h2 className="font-serif text-lg font-bold text-[#171316] border-b pb-3">
            Concierge Support Contacts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Care Email</label>
              <input
                type="email"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Concierge Phone</label>
              <input
                type="tel"
                value={storePhone}
                onChange={(e) => setStorePhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
