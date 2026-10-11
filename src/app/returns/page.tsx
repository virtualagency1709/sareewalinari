import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Returns & Exchange Policy | Saree Wali Nari',
  description: 'Hassle-free 7-day return policy for unworn handlooms and bridal jewelry.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-[#FFF9F7] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
            Patron Assurance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316] mt-1">
            Returns, Exchanges &amp; Heirloom Care
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Last revised: March 2026
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              1. 7-Day Gracious Return Policy
            </h2>
            <p>
              We want you to feel sublime in your chosen drape. If for any reason a piece does not suit your occasion, you may initiate a return within <strong>7 days</strong> of delivery.
            </p>
            <p>
              To be eligible, the saree or jewelry piece must remain unworn, unwashed, unaltered (blouse piece uncut), and in its original presentation box with the Silk Mark authentication tag intact.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#FBE9EE]">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              2. Reverse Pickup Concierge
            </h2>
            <p>
              Once a return request is authorized via our Concierge Desk (care@sareewalinari.com), a doorstep reverse pickup is scheduled within 48 hours. The package is inspected at our atelier, and your refund is credited to your original payment method within 3–5 business days.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#FBE9EE]">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              3. Lifetime Silk &amp; Jewelry Care Guidance
            </h2>
            <p>
              All our handlooms are crafted with natural fibers and pure zari. Always dry clean pure silks. Wrap them in white cotton or muslin fabric and keep away from moisture and harsh halogen lamps.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
