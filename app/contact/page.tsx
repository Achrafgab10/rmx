"use client";

import React from "react";
import { MessageCircle, Mail, Instagram, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050A15] text-white">
      {/* Notre Maison – About us */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 px-4 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Notre Maison
        </h1>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          RMX est née d&apos;une vision simple : rendre la haute technologie de sécurité
          accessible, élégante et sans compromis pour les foyers et entreprises au Maroc.
        </p>
      </section>

      {/* Contact – coordonnées Rabat */}
      <section className="py-12 px-4 max-w-5xl mx-auto border-t border-white/10">
        <h2 className="text-2xl font-bold text-white text-center mb-10">Contact</h2>
        <p className="text-slate-400 text-center mb-10 max-w-xl mx-auto">
          Rabat, Maroc. Notre équipe est à votre écoute pour toute question ou installation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="https://wa.me/212661908510"
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors group"
          >
            <MessageCircle className="w-10 h-10 text-[#25D366] mb-3 group-hover:scale-110 transition-transform" aria-hidden />
            <span className="text-white font-medium">WhatsApp</span>
            <span className="text-slate-400 text-sm mt-1">+212 661-908510</span>
          </a>
          <a
            href="mailto:Rmxymaroc@gmail.com"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors group"
          >
            <Mail className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" aria-hidden />
            <span className="text-white font-medium">Email</span>
            <span className="text-slate-400 text-sm mt-1 break-all">Rmxymaroc@gmail.com</span>
          </a>
          <a
            href="https://www.instagram.com/rmx.ma"
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:bg-white/10 transition-colors group"
          >
            <Instagram className="w-10 h-10 text-blue-400 mb-3 group-hover:scale-110 transition-transform" aria-hidden />
            <span className="text-white font-medium">Instagram</span>
            <span className="text-slate-400 text-sm mt-1">@rmx.ma</span>
          </a>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
            <MapPin className="w-10 h-10 text-blue-400 mb-3" aria-hidden />
            <span className="text-white font-medium">Rabat, Maroc</span>
            <span className="text-slate-400 text-sm mt-1">Livraison partout au Maroc</span>
          </div>
        </div>
      </section>
    </div>
  );
}
