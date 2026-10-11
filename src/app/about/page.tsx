import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Feather, Award, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Heritage Story — Saree Wali Nari | The Living Atelier',
  description: 'Learn about the generational weavers, royal origins, and handloom mastery behind Saree Wali Nari.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FFF9F7] py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border border-[#D9A0AD]/40 shadow-xs mb-3">
            <Image src="/images/logo.png" alt="Saree Wali Nari Logo" fill className="object-cover" />
          </div>
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B1E3F]">
            The Atelier Chronicle
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#171316]">
            Drape Your Dreams
          </h1>
          <div className="w-16 h-0.5 bg-[#8B1E3F] mx-auto" />
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
            Founded with profound reverence for generational Indian textiles, Saree Wali Nari bridges royal court traditions with sovereign modern femininity.
          </p>
        </div>

        {/* Narrative Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border border-[#D9A0AD]/30">
            <Image
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80"
              alt="Weaver on pit loom in Varanasi"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B1E3F]">
              The Varanasi Sacred Looms
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171316]">
              Reviving the Authentic Kadhwa Technique
            </h2>
            <p>
              In an era dominated by rapid powerloom substitutes, our master artisans remain committed to authentic Kadhwa and Jangla handlooms. Each floral booti is individually hand-threaded with pure gold and silver dipped zari, leaving no loose float threads on the reverse side.
            </p>
            <p>
              It takes two generational karigars between 25 and 45 uninterrupted days to complete a single bridal Katan silk masterpiece. When you drape a Saree Wali Nari creation, you wear a month of dedicated prayers and human ingenuity.
            </p>
          </div>
        </div>

        {/* Values Matrix */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9A0AD]/30 shadow-xs">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#171316]">Our Sacred Commitments</h2>
            <p className="text-xs text-gray-500 mt-1">Ethical luxury backed by verifiable certification.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#171316]">Silk Mark Certified</h3>
              <p className="text-xs text-gray-600">
                100% natural mulberry, tussar, and chanderi silks laboratory tested for purity.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#171316]">Artisan Fair Trade</h3>
              <p className="text-xs text-gray-600">
                We eliminate exploitative middlemen, paying direct dignified premiums to weaver families.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#FBE9EE] text-[#8B1E3F] flex items-center justify-center mx-auto">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#171316]">Heirloom Longevity</h3>
              <p className="text-xs text-gray-600">
                Designed to be cherished across generations, holding its luster and emotional value.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-4">
          <Link
            href="/sarees"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8B1E3F] hover:bg-[#70152B] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <span>Explore the Royal Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
