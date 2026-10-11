'use client';

import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, Calendar, ShoppingBag, ShieldCheck } from 'lucide-react';
import { getLocalOrders, formatINR } from '@/lib/store';

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  firstJoined: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<CustomerRecord[]>([
    {
      id: 'c-1',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 98765 43210',
      city: 'Bengaluru, Karnataka',
      totalOrders: 2,
      totalSpent: 42498,
      firstJoined: '15 Jan 2026',
    },
    {
      id: 'c-2',
      name: 'Meera Singhania',
      email: 'meera.s@example.com',
      phone: '+91 98111 22334',
      city: 'New Delhi, Delhi',
      totalOrders: 1,
      totalSpent: 24999,
      firstJoined: '28 Jan 2026',
    },
    {
      id: 'c-3',
      name: 'Dr. Radhika Iyer',
      email: 'radhika.iyer@example.com',
      phone: '+91 97444 55667',
      city: 'Bengaluru, Karnataka',
      totalOrders: 1,
      totalSpent: 8999,
      firstJoined: '05 Feb 2026',
    },
    {
      id: 'c-4',
      name: 'Aishwarya Deshmukh',
      email: 'aishwarya.d@example.com',
      phone: '+91 99222 33445',
      city: 'Mumbai, Maharashtra',
      totalOrders: 1,
      totalSpent: 13999,
      firstJoined: '14 Feb 2026',
    },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
          Clientele Directory
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#171316] mt-1">
          Registered Patrons ({customers.length})
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Review customer order histories, contact records, and lifetime trousseau values.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9A0AD]/30 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#FBE9EE] text-gray-400 uppercase tracking-wider text-[10px]">
                <th className="pb-3 font-bold">Patron Name</th>
                <th className="pb-3 font-bold">Email</th>
                <th className="pb-3 font-bold">Phone</th>
                <th className="pb-3 font-bold">Location</th>
                <th className="pb-3 font-bold">Orders</th>
                <th className="pb-3 font-bold">Lifetime Value</th>
                <th className="pb-3 font-bold">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FBE9EE]">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-[#FFF9F7] transition-colors">
                  <td className="py-3 font-semibold text-[#171316] flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#FBE9EE] text-[#8B1E3F] font-bold text-xs flex items-center justify-center">
                      {c.name.charAt(0)}
                    </div>
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 text-gray-600">{c.email}</td>
                  <td className="py-3 text-gray-600">{c.phone}</td>
                  <td className="py-3 text-gray-600">{c.city}</td>
                  <td className="py-3 font-bold text-[#171316]">{c.totalOrders}</td>
                  <td className="py-3 font-bold text-[#70152B]">{formatINR(c.totalSpent)}</td>
                  <td className="py-3 text-gray-400">{c.firstJoined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
