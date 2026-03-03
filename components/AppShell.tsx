"use client";

import React from "react";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-grow relative">{children}</main>
      <Footer />
      <Cart />
    </CartProvider>
  );
}
