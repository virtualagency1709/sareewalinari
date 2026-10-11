'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

interface Testimonial {
  id: string;
  customerName: string;
  city: string;
  avatar: string;
  rating: number;
  productPurchased: string;
  comment: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    customerName: 'Meera Singhania',
    city: 'New Delhi',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    productPurchased: 'Royal Crimson Kadhwa Banarasi Silk Saree',
    comment:
      'I wore this saree for my sister’s wedding in Udaipur. The weight, the luster of the real zari, and the softness of the Katan silk surpassed every designer boutique I visited. Truly an heirloom that will pass down generations.',
    date: 'February 2026',
  },
  {
    id: 't-2',
    customerName: 'Dr. Radhika Iyer',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    productPurchased: 'Kundan Meenakari Bridal Hasli Choker',
    comment:
      'The reverse Meenakari work on this Hasli is a work of pure genius. The packaging in the velvet box arrived in two days, pristine and fragrant. The attention to detail from Saree Wali Nari is unmatched.',
    date: 'January 2026',
  },
  {
    id: 't-3',
    customerName: 'Aishwarya Deshmukh',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    productPurchased: 'Scallop Cutwork Blush Organza Saree',
    comment:
      'The organza holds its drape with astonishing crispness without being stiff. The micro-pearl scallops looked ethereal under evening lights. Received compliments all evening!',
    date: 'February 2026',
  },
];

export default function CustomerTestimonials() {
  return (
    <section className="py-24 bg-[#FFF9F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            <Quote className="w-4 h-4 text-[#A51D36]" />
            <span>Patron Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#171316] mt-2">
            Voices of Elegance
          </h2>
          <div className="w-16 h-0.5 bg-[#8B1E3F] mx-auto mt-4" />
          <p className="text-xs md:text-sm text-gray-600 mt-3">
            Real reflections from patronesses who crowned their most sacred milestones draped in Saree Wali Nari.
          </p>
          <span className="inline-block mt-2 text-[10px] text-gray-500 uppercase tracking-widest font-semibold bg-gray-100 px-3 py-1 rounded-full">
            Verified Patron Reviews (Development Demo Catalog)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-[#D9A0AD]/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic font-light">
                  &ldquo;{t.comment}&rdquo;
                </p>

                <div className="mt-4 pt-4 border-t border-[#FBE9EE]">
                  <span className="text-[10px] uppercase font-bold text-[#8B1E3F] block">
                    Product Drape:
                  </span>
                  <p className="text-xs font-semibold text-[#171316] mt-0.5 line-clamp-1">
                    {t.productPurchased}
                  </p>
                </div>
              </div>

              {/* Author footer */}
              <div className="flex items-center gap-3.5 mt-6 pt-4 border-t border-[#FBE9EE]">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-[#D9A0AD]/40">
                  <Image src={t.avatar} alt={t.customerName} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h5 className="text-xs font-bold text-[#171316]">{t.customerName}</h5>
                    <span title="Verified Buyer"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /></span>
                  </div>
                  <p className="text-[11px] text-gray-500">{t.city} • {t.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
