"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { isOpen, closeCart } = useCart();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            aria-hidden
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#050A15] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Votre panier"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 pt-6 px-6">
              <h2 className="text-xl font-bold text-white">Votre Panier</h2>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                aria-label="Fermer le panier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body – scrollable, empty state */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <ShoppingBag className="w-16 h-16 text-slate-600" strokeWidth={1} aria-hidden />
                <p className="text-slate-400 text-center mt-4">Votre panier est vide.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-[#0A0F1F] shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-300">Total</span>
                <span className="text-2xl font-bold text-white">0 MAD</span>
              </div>
              <button
                type="button"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled
              >
                Valider la commande
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
