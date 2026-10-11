'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setIsLoading(true);
    const res = await register(fullName, email, password);
    if (res.success) {
      router.push('/account');
    } else {
      setError(res.message || 'Registration failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[#FFF9F7] min-h-[80vh] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 max-w-[64px] max-h-[64px] rounded-full overflow-hidden mx-auto border border-[#D9A0AD]/40 shadow-xs bg-[#FFF9F7]">
            <Image src="/images/logo.png" alt="Saree Wali Nari Logo" width={64} height={64} className="w-full h-full object-contain object-center" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
            Create an Account
          </h1>
          <p className="text-xs text-gray-500">
            Join the Saree Wali Nari bridal salon circle to preserve orders and access early weaves.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Radhika Sharma"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="radhika@example.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">Confirm Password *</label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs text-[#171316] outline-none focus:border-[#8B1E3F]"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="text-[11px] text-gray-500 leading-tight">
            By creating an account, you agree to Saree Wali Nari&apos;s Terms of Service and Privacy Policy. All registrations create customer accounts.
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-98"
          >
            <span>{isLoading ? 'Creating Account...' : 'Register Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-gray-500">
          <span>Already have an account? </span>
          <Link href="/login" className="text-[#8B1E3F] font-bold hover:underline">
            Sign In Here &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
