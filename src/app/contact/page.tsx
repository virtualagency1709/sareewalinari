'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FFF9F7] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            Personal Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316]">
            Atelier Appointments &amp; Concierge
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Schedule a private bridal trousseau consultation or inquire about custom handloom orders.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="md:col-span-5 bg-white p-8 rounded-3xl border border-[#D9A0AD]/30 shadow-xs space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#171316]">Boutique Salon</h2>

            <div className="space-y-4 text-xs text-gray-600">
              <div className="flex gap-3 items-start">
                <MapPin className="w-5 h-5 text-[#8B1E3F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171316] block">Flagship Atelier:</strong>
                  12 Heritage Enclave, Civil Lines, Varanasi, Uttar Pradesh — 221002
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Phone className="w-5 h-5 text-[#8B1E3F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171316] block">Concierge Desk:</strong>
                  +91 98765 43210 (Mon–Sat, 10:00 AM – 7:30 PM IST)
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Mail className="w-5 h-5 text-[#8B1E3F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171316] block">Inquiries &amp; Press:</strong>
                  care@sareewalinari.com
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <Clock className="w-5 h-5 text-[#8B1E3F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#171316] block">Bridal Video Draping Consults:</strong>
                  Available via WhatsApp Video by appointment.
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7 bg-white p-8 rounded-3xl border border-[#D9A0AD]/30 shadow-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-[#171316]">Inquiry Dispatched</h3>
                <p className="text-xs text-gray-600">
                  Our chief stylist will connect with you on WhatsApp / email within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-serif text-xl font-bold text-[#171316]">Send a Dispatch</h2>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Deepika Reddy"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="deepika@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Occasion / Requirement Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specify saree or jewelry design, wedding date, or custom color inquiries..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF9F7] border border-[#D9A0AD]/40 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Request Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
