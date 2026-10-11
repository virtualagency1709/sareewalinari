'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  Package,
  Settings,
} from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import SearchModal from './SearchModal';
import CartDrawer from '@/components/cart/CartDrawer';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'sarees' | 'jewelry' | null>(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsAccountOpen(false);
    setActiveMegaMenu(null);
  }, [pathname]);

  const sareeSubcategories = [
    { name: 'Banarasi Sarees', href: '/collections/banarasi', desc: 'Handwoven in Varanasi with real gold zari' },
    { name: 'Kanjivaram & Silk', href: '/collections/silk', desc: 'Pure mulberry silk with temple borders' },
    { name: 'Organza Sarees', href: '/collections/organza', desc: 'Feather-light drapes with scalloped cutwork' },
    { name: 'Georgette Sarees', href: '/collections/georgette', desc: 'Chikankari shadow work & mukaish stars' },
    { name: 'Artisan Printed', href: '/collections/printed', desc: 'Ajrakh, Dabu indigo & vintage floras' },
    { name: 'Bridal & Embroidered', href: '/collections/bridal', desc: 'Opulent zardozi, gota patti & crystals' },
  ];

  const jewelrySubcategories = [
    { name: 'Earrings & Jhumkas', href: '/collections/earrings', desc: 'Kundan chaandbaalis & temple jhumkis' },
    { name: 'Necklaces & Chokers', href: '/collections/necklaces', desc: 'Hasli chokers & layered pearl rani haars' },
    { name: 'Bangles & Kadas', href: '/collections/bangles', desc: 'Jadau openable kadas & temple ghungroos' },
    { name: 'Pendants & Chains', href: '/collections/pendants', desc: 'Peacock motifs with royal enamel' },
    { name: 'Bridal Jewelry Sets', href: '/collections/jewelry-sets', desc: 'Imperial choker, earrings & maang tikka' },
  ];

  return (
    <>
      <AnnouncementBar />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF9F7]/95 backdrop-blur-md shadow-md py-2 border-b border-[#D9A0AD]/20'
            : 'bg-[#FFF9F7] py-3 border-b border-[#FBE9EE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#70152B] hover:text-[#8B1E3F] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-[#D9A0AD]/40 shadow-xs group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/logo.png"
                    alt="Saree Wali Nari Logo"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg md:text-xl font-bold tracking-tight text-[#70152B] group-hover:text-[#8B1E3F] transition-colors leading-tight">
                    Saree Wali Nari
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A51D36] font-medium">
                    Drape your dreams
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              <Link
                href="/"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#8B1E3F] ${
                  pathname === '/' ? 'text-[#8B1E3F] border-b border-[#8B1E3F]' : 'text-[#171316]'
                }`}
              >
                Home
              </Link>

              {/* Sarees with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('sarees')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/sarees"
                  className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider py-2 transition-colors hover:text-[#8B1E3F] ${
                    pathname.startsWith('/sarees') || pathname.startsWith('/collections/banarasi')
                      ? 'text-[#8B1E3F]'
                      : 'text-[#171316]'
                  }`}
                >
                  <span>Sarees</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A51D36]" />
                </Link>

                {/* Sarees Mega Menu dropdown */}
                {activeMegaMenu === 'sarees' && (
                  <div className="absolute top-full -left-20 w-[640px] bg-[#FFF9F7] rounded-2xl shadow-2xl border border-[#D9A0AD]/30 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="col-span-2 space-y-3">
                      <div className="border-b border-[#FBE9EE] pb-2 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider font-bold text-[#8B1E3F]">
                          Weaves of Heritage
                        </span>
                        <Link
                          href="/sarees"
                          className="text-[11px] font-semibold text-[#70152B] hover:underline"
                        >
                          View All 20 Sarees &rarr;
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {sareeSubcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="p-2 rounded-lg hover:bg-[#FBE9EE] transition-colors group block"
                          >
                            <span className="text-xs font-semibold text-[#171316] group-hover:text-[#8B1E3F] block">
                              {sub.name}
                            </span>
                            <span className="text-[10px] text-gray-500 line-clamp-1 block">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-1 rounded-xl overflow-hidden relative group bg-black/5 flex flex-col justify-end p-4 text-white">
                      <Image
                        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                        alt="Royal Banarasi"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="relative z-10">
                        <span className="text-[9px] uppercase tracking-widest text-[#F3E5AB] font-bold">
                          Spotlight
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-white">
                          Bridal Kadhwa Banarasi
                        </h5>
                        <Link
                          href="/collections/banarasi"
                          className="text-[10px] font-bold text-[#FBE9EE] hover:underline mt-1 inline-block"
                        >
                          Explore Weave &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Jewelry with Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMegaMenu('jewelry')}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/jewelry"
                  className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider py-2 transition-colors hover:text-[#8B1E3F] ${
                    pathname.startsWith('/jewelry') ? 'text-[#8B1E3F]' : 'text-[#171316]'
                  }`}
                >
                  <span>Jewelry</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#A51D36]" />
                </Link>

                {/* Jewelry Mega Menu dropdown */}
                {activeMegaMenu === 'jewelry' && (
                  <div className="absolute top-full -left-20 w-[640px] bg-[#FFF9F7] rounded-2xl shadow-2xl border border-[#D9A0AD]/30 p-6 grid grid-cols-3 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="col-span-2 space-y-3">
                      <div className="border-b border-[#FBE9EE] pb-2 flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider font-bold text-[#8B1E3F]">
                          Fine Handcrafted Jewels
                        </span>
                        <Link
                          href="/jewelry"
                          className="text-[11px] font-semibold text-[#70152B] hover:underline"
                        >
                          View All 10 Jewels &rarr;
                        </Link>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {jewelrySubcategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className="p-2 rounded-lg hover:bg-[#FBE9EE] transition-colors group block"
                          >
                            <span className="text-xs font-semibold text-[#171316] group-hover:text-[#8B1E3F] block">
                              {sub.name}
                            </span>
                            <span className="text-[10px] text-gray-500 line-clamp-1 block">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-1 rounded-xl overflow-hidden relative group bg-black/5 flex flex-col justify-end p-4 text-white">
                      <Image
                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
                        alt="Royal Kundan Choker"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="relative z-10">
                        <span className="text-[9px] uppercase tracking-widest text-[#F3E5AB] font-bold">
                          Artisanal Pick
                        </span>
                        <h5 className="font-serif text-sm font-semibold text-white">
                          Navratna Bridal Choker
                        </h5>
                        <Link
                          href="/collections/jewelry-sets"
                          className="text-[10px] font-bold text-[#FBE9EE] hover:underline mt-1 inline-block"
                        >
                          Explore Jewels &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/new-arrivals"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#8B1E3F] ${
                  pathname === '/new-arrivals' ? 'text-[#8B1E3F]' : 'text-[#171316]'
                }`}
              >
                New Arrivals
              </Link>

              <Link
                href="/bestsellers"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#8B1E3F] ${
                  pathname === '/bestsellers' ? 'text-[#8B1E3F]' : 'text-[#171316]'
                }`}
              >
                Bestsellers
              </Link>

              <Link
                href="/about"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#8B1E3F] ${
                  pathname === '/about' ? 'text-[#8B1E3F]' : 'text-[#171316]'
                }`}
              >
                Our Story
              </Link>

              <Link
                href="/contact"
                className={`text-xs font-semibold uppercase tracking-wider transition-colors hover:text-[#8B1E3F] ${
                  pathname === '/contact' ? 'text-[#8B1E3F]' : 'text-[#171316]'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Utility Actions */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#70152B] hover:text-[#8B1E3F] hover:bg-[#FBE9EE] rounded-full transition-colors"
                title="Search Products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <Link
                href="/account/wishlist"
                className="p-2 text-[#70152B] hover:text-[#8B1E3F] hover:bg-[#FBE9EE] rounded-full transition-colors relative"
                title="Your Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B1E3F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#70152B] hover:text-[#8B1E3F] hover:bg-[#FBE9EE] rounded-full transition-colors relative"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B1E3F] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Customer Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="p-2 text-[#70152B] hover:text-[#8B1E3F] hover:bg-[#FBE9EE] rounded-full transition-colors flex items-center gap-1"
                  title="My Account"
                >
                  <User className="w-5 h-5" />
                  {isAdmin && (
                    <span className="hidden md:inline-block text-[9px] font-extrabold uppercase bg-[#8B1E3F] text-white px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </button>

                {isAccountOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#FFF9F7] rounded-xl shadow-2xl border border-[#D9A0AD]/30 py-2 z-50 text-xs animate-in fade-in duration-150">
                    {user ? (
                      <>
                        <div className="px-4 py-2 border-b border-[#FBE9EE]">
                          <p className="font-semibold text-[#171316] truncate">{user.fullName}</p>
                          <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                          <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-[#8B1E3F]">
                            Role: {user.role}
                          </span>
                        </div>

                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setIsAccountOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-[#8B1E3F] font-semibold hover:bg-[#FBE9EE] transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            Admin Dashboard
                          </Link>
                        )}

                        <Link
                          href="/account"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-[#171316] hover:bg-[#FBE9EE] transition-colors"
                        >
                          <User className="w-4 h-4 text-[#70152B]" />
                          My Profile
                        </Link>

                        <Link
                          href="/account/orders"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-[#171316] hover:bg-[#FBE9EE] transition-colors"
                        >
                          <Package className="w-4 h-4 text-[#70152B]" />
                          Orders & Tracking
                        </Link>

                        <Link
                          href="/account/wishlist"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-[#171316] hover:bg-[#FBE9EE] transition-colors"
                        >
                          <Heart className="w-4 h-4 text-[#70152B]" />
                          Saved Wishlist
                        </Link>

                        <div className="border-t border-[#FBE9EE] mt-1 pt-1">
                          <button
                            onClick={() => {
                              logout();
                              setIsAccountOpen(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-[#8B1E3F] font-semibold hover:bg-[#FBE9EE] transition-colors"
                        >
                          Customer Sign In
                        </Link>
                        <Link
                          href="/register"
                          onClick={() => setIsAccountOpen(false)}
                          className="block px-4 py-2 text-[#171316] hover:bg-[#FBE9EE] transition-colors"
                        >
                          Create New Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[110px] z-50 bg-[#FFF9F7] overflow-y-auto p-6 border-t border-[#FBE9EE] animate-in slide-in-from-left duration-200">
            <nav className="space-y-4">
              <Link
                href="/"
                className="block text-sm font-semibold uppercase tracking-wider text-[#171316] hover:text-[#8B1E3F]"
              >
                Home
              </Link>

              <div className="space-y-2 pt-2 border-t border-[#FBE9EE]">
                <Link
                  href="/sarees"
                  className="block text-sm font-bold uppercase tracking-wider text-[#8B1E3F]"
                >
                  All Sarees
                </Link>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {sareeSubcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="text-xs text-[#171316] hover:text-[#8B1E3F] py-1"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#FBE9EE]">
                <Link
                  href="/jewelry"
                  className="block text-sm font-bold uppercase tracking-wider text-[#8B1E3F]"
                >
                  All Jewelry
                </Link>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {jewelrySubcategories.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="text-xs text-[#171316] hover:text-[#8B1E3F] py-1"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#FBE9EE] space-y-3">
                <Link
                  href="/new-arrivals"
                  className="block text-sm font-semibold uppercase tracking-wider text-[#171316]"
                >
                  New Arrivals
                </Link>
                <Link
                  href="/bestsellers"
                  className="block text-sm font-semibold uppercase tracking-wider text-[#171316]"
                >
                  Bestsellers
                </Link>
                <Link
                  href="/about"
                  className="block text-sm font-semibold uppercase tracking-wider text-[#171316]"
                >
                  Our Story
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm font-semibold uppercase tracking-wider text-[#171316]"
                >
                  Contact
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-sm font-bold uppercase tracking-wider text-[#8B1E3F] bg-[#FBE9EE] p-2 rounded-lg"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Global Slide-Over Cart Drawer */}
      <CartDrawer />
    </>
  );
}
