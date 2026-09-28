import React, { useState } from 'react';
import TopBar from './TopBar';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import ScrollTopBtn from '../common/ScrollTopBtn';

export default function MainLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F0] text-[#18221D] font-sans antialiased selection:bg-[#123329] selection:text-[#EDE4D6]">
      {/* 1. UNIFIED STICKY HEADER CONTAINER (TOP BAR + NAVBAR) */}
      <div className="sticky top-0 z-40 w-full bg-white shadow-xs">
        <TopBar />
        <Header
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onCloseMobileMenu={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* 3. MAIN VIEW CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* 4. INSTITUTIONAL FOOTER */}
      <Footer />

      {/* 5. MULTI-AI ASSISTANT & WHATSAPP FLOATING ACTION BUTTON (FAB) */}
      <WhatsAppButton />

      {/* 6. SCROLL TO TOP FLOATING BUTTON (BOTTOM LEFT - OPTION A) */}
      <ScrollTopBtn />
    </div>
  );
}
