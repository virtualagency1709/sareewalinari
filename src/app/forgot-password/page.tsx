'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF9F7] min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xl max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto border border-[#D9A0AD]/40">
            <Image src="/images/logo.png" alt="Saree Wali Nari Logo" fill className="object-cover" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#171316]">
            Password Recovery
          </h1>
          <p className="text-xs text-gray-500">
            Enter your email to receive a secure password reset link.
          </p>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-2 text-center">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <p className="font-semibold">Reset Instructions Dispatched</p>
            <p>We have sent a password reset link to <strong>{email}</strong>.</p>
            <Link
              href="/login"
              className="inline-block mt-3 px-4 py-2 rounded-full bg-[#8B1E3F] text-white text-xs font-semibold"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1">Account Email</label>
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

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <span>Send Recovery Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center text-xs text-gray-500">
          <Link href="/login" className="text-[#8B1E3F] font-semibold hover:underline">
            &larr; Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
