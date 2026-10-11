import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Policy | Saree Wali Nari',
  description: 'Details regarding pan-India and international luxury express courier dispatch.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-[#FFF9F7] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
            Logistics &amp; Courier Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171316] mt-1">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Last revised: March 2026
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xs space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          <section className="space-y-2">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              1. Domestic Pan-India Shipping
            </h2>
            <p>
              We provide complimentary express air shipping across all pin codes in India on every order exceeding <strong>₹1,999</strong>. For orders below this threshold, a standardized nominal courier fee of ₹150 applies.
            </p>
            <p>
              Metropolitan regions (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata) generally receive parcel delivery within <strong>2 to 4 business days</strong> following loom inspection. Tier-2 and Tier-3 cities receive delivery within <strong>4 to 6 business days</strong>.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#FBE9EE]">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              2. Signature Hard-Shell Presentation Packaging
            </h2>
            <p>
              Every saree and jewelry piece is packaged inside our signature archival hard-box lined with non-acidic butter paper and natural lavender potpourri. Packages are sealed with security tamper-evident tape to ensure zero transit tampering.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#FBE9EE]">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              3. Courier Tracking &amp; Delivery Verification
            </h2>
            <p>
              Upon dispatch from our Varanasi or Jaipur atelier, an automated SMS and WhatsApp update containing your BlueDart / Delhivery AWB tracking link is dispatched. Deliveries require an OTP or signature verification upon handover.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-[#FBE9EE]">
            <h2 className="font-serif text-lg font-bold text-[#171316]">
              4. International Dispatch
            </h2>
            <p>
              We ship worldwide to the USA, UK, UAE, Canada, Australia, and Singapore via DHL Express (5–7 business days). International customs duties, where levied by the destination country, are payable by the recipient.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
