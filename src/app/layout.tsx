import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AuthProvider } from '@/context/AuthContext';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Saree Wali Nari — Drape Your Dreams | Luxury Sarees & Fine Indian Jewelry',
  description:
    'Discover authentic handloom Banarasi silk sarees, Kanjivarams, delicate organzas, and handcrafted bridal jewelry sets at Saree Wali Nari. Heirloom luxury handcrafted for memorable celebrations.',
  keywords: [
    'Saree Wali Nari',
    'Banarasi silk saree',
    'Kanjivaram saree',
    'Organza saree',
    'Chikankari georgette',
    'Indian wedding saree',
    'Bridal jewelry set',
    'Kundan earrings',
    'Jhumka',
    'Indian luxury fashion',
  ],
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FFF9F7] text-[#171316] antialiased selection:bg-[#8B1E3F] selection:text-white">
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
