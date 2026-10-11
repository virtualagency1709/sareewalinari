'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface StorefrontShellProps {
  children: React.ReactNode;
}

export default function StorefrontShell({ children }: StorefrontShellProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <div className="min-h-screen bg-[#F5EBE6] text-[#171316]">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
