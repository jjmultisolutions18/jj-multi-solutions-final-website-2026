import React from 'react';
import Navbar from './Navbar';
import { Footer, WhatsAppButton } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 md:pt-28">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
