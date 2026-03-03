"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 z-[9999] bg-[#050A15] border-b border-white/10 flex items-center">
        <Navbar onOpenCart={() => setIsCartOpen(true)} />
      </header>
      <div className="h-20 w-full" aria-hidden />
      <main className="flex-1 relative z-[1] w-full">
        {children}
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
