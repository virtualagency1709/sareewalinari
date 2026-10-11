'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Sparkles } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-[#FAF5F2] border-t border-[#D9A0AD]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FBE9EE] text-[#8B1E3F] text-xs font-bold tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Atelier Gazette</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316] tracking-tight">
          Enter the Circle of Fine Weaves
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 mt-3 max-w-lg mx-auto leading-relaxed">
          Be the first to inspect limited edition looms, receive bridal trousseau consultations, and enjoy private members-only privileges.
        </p>

        {subscribed ? (
          <div className="mt-8 p-4 max-w-md mx-auto rounded-2xl bg-white border border-emerald-300 shadow-sm text-xs text-emerald-800 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span className="font-medium">Welcome to the inner circle! Your welcome voucher code has been dispatched.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email..."
                required
                className="w-full px-4 py-3.5 rounded-full bg-white border border-[#D9A0AD]/40 text-xs text-[#171316] placeholder-gray-400 outline-none focus:border-[#8B1E3F] shadow-xs"
              />
              <Mail className="absolute right-4 top-3.5 w-4 h-4 text-gray-400" />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md flex-shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-400 mt-4">
          We honor your privacy. Unsubscribe anytime with a single click.
        </p>
      </div>
    </section>
  );
}
