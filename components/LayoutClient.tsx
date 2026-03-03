"use client";

import React from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

function LayoutClientContent({ children }: { children: React.ReactNode }) {
  const { openCart } = useCart();
  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-20 z-[9999] bg-[#050A15] border-b border-white/10 flex items-center">
        <Navbar onOpenCart={openCart} />
      </header>
      <div className="h-20 w-full" aria-hidden />
      <main className="flex-1 relative z-[1] w-full">
        {children}
      </main>
      <Footer />
      <Cart />
    </>
  );
}

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <LayoutClientContent>{children}</LayoutClientContent>
    </CartProvider>
  );
}
