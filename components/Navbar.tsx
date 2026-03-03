"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart: contextOpenCart } = useCart();
  const handleOpenCart = onOpenCart ?? contextOpenCart;

  return (
    <header className="sticky top-0 z-[9999] w-full bg-[#050A15]/90 backdrop-blur-md border-b border-white/10">
      <nav className="w-full max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between" aria-label="Navigation principale">
        {/* Desktop: logo left, menu center, panier right */}
        <div className="flex justify-between items-center w-full md:grid md:grid-cols-3 md:gap-4">
          <Link href="/" className="shrink-0" aria-label="RMX Accueil" onClick={() => setMobileOpen(false)}>
            <Image
              src="/assets/logo.jpeg"
              alt="RMX"
              width={140}
              height={48}
              className="h-10 md:h-12 w-auto object-contain mix-blend-screen"
              priority
            />
          </Link>
          <div className="hidden md:flex justify-center items-center gap-8">
            <Link href="/boutique" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Boutique
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button
              type="button"
              onClick={handleOpenCart}
              className="flex items-center gap-2 rounded-full bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity shrink-0"
              aria-label="Panier"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Panier</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-white"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-200 ${mobileOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`} aria-hidden={!mobileOpen}>
          <div className="pt-3 pb-2 border-t border-white/10 mt-2 flex flex-col gap-1">
            <Link href="/boutique" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg" onClick={() => setMobileOpen(false)}>Boutique</Link>
            <Link href="/contact" className="py-2 px-4 text-slate-300 hover:text-white rounded-lg" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
