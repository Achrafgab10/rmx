"use client";

import React from "react";
import { CartProvider, useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const { openCart } = useCart();
  return (
    <>
      <Navbar onOpenCart={openCart} />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
      <Cart />
    </>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AppShellContent>{children}</AppShellContent>
    </CartProvider>
  );
}
