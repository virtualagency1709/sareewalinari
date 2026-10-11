'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Plus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AccountAddressesPage() {
  const { user, addAddress, deleteAddress } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !addressLine1 || !city || !postalCode) return;

    addAddress({
      fullName,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      isDefault: false,
    });

    setShowAddForm(false);
    setFullName('');
    setPhone('');
    setAddressLine1('');
    setAddressLine2('');
    setCity('');
    setState('');
    setPostalCode('');
  };

  return (
    <div className="bg-[#FFF9F7] min-h-screen py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/account"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#8B1E3F] mb-3"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Account Overview</span>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-[#171316]">
              Saved Shipping Addresses
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Maintain your home, bridal salon, and family delivery destinations.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-5 py-2.5 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-xs hover:bg-[#70152B] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {/* Add Address Form Modal / Inline Box */}
        {showAddForm && (
          <form
            onSubmit={handleSave}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/40 shadow-md space-y-4 animate-in fade-in"
          >
            <h3 className="font-serif text-lg font-bold text-[#171316]">New Address Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <input
                type="tel"
                required
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <input
                type="text"
                required
                placeholder="Address Line 1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <input
                type="text"
                placeholder="Area / Locality"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <input
                type="text"
                required
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <input
                type="text"
                required
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
              <input
                type="text"
                required
                placeholder="Postal PIN Code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-[#8B1E3F] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Save Destination
              </button>
            </div>
          </form>
        )}

        {/* Existing Addresses List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {user?.addresses.map((addr) => (
            <div
              key={addr.id}
              className="bg-white rounded-3xl p-6 border border-[#D9A0AD]/30 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-[#171316]">{addr.fullName}</h4>
                  {addr.isDefault && (
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {addr.addressLine1} {addr.addressLine2 && `, ${addr.addressLine2}`}
                  <br />
                  {addr.city}, {addr.state} - {addr.postalCode}
                </p>
                <p className="text-xs text-gray-500 font-medium">Contact: {addr.phone}</p>
              </div>

              <div className="pt-3 border-t border-[#FBE9EE] flex justify-end">
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-xs text-red-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Address</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
