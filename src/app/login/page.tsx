'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const res = await login(email, password);
    if (res.success) {
      if (email.toLowerCase().includes('admin')) {
        router.push('/admin');
      } else {
        router.push('/account');
      }
    } else {
      setError(res.message || 'Invalid credentials.');
    }
    setIsLoading(false);
  };

  const handleQuickLogin = (role: 'customer' | 'admin') => {
    if (role === 'customer') {
      setEmail('priya.sharma@example.com');
      setPassword('Priya@1234');
    } else {
      setEmail('admin@sareewalinari.com');
      setPassword('AdminMaster@2026');
    }
  };

  return (
    <div className="bg-[#FFF9F7] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xl max-w-md w-full space-y-6">
        {/* Logo and Brand */}
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border border-[#D9A0AD]/40 shadow-xs">
            <Image src="/images/logo.png" alt="Saree Wali Nari Logo" fill className="object-cover" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
            Welcome Back
          </h1>
          <p className="text-xs text-gray-500">
            Sign in to access your trousseau orders, wishlist, and saved addresses.
          </p>
        </div>

        {/* Demo Fast-Login Pills for Easy Evaluation */}
        <div className="p-3 bg-[#FFF9F7] rounded-2xl border border-[#D9A0AD]/30 space-y-2">
          <span className="text-[10px] uppercase font-bold text-[#8B1E3F] block text-center">
            Quick Review Credentials (One-Click Fill)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="py-1.5 px-2 rounded-xl bg-white hover:bg-[#FBE9EE] border border-[#D9A0AD]/40 text-[11px] font-semibold text-[#70152B] transition-colors"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="py-1.5 px-2 rounded-xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-[11px] font-semibold transition-colors"
            >
              Demo Admin
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-[#8B1E3F] hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
          >
            <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500">
          <span>New to Saree Wali Nari? </span>
          <Link href="/register" className="text-[#8B1E3F] font-bold hover:underline">
            Create an Account &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
