import React from "react";
import Image from "next/image";
import { MessageCircle, ChevronRight, Phone, Mail, MapPin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <div className="px-4 py-16 md:py-24 bg-black">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Logo + Video placeholder or logo focus */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/assets/logo.jpeg"
            alt="RMX Logo"
            width={600}
            height={210}
            className="h-[10.5rem] w-auto object-contain mix-blend-screen mb-6"
          />
        </div>

        {/* Right: Info & WhatsApp */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Prêt à sécuriser votre maison ?</h2>
            <p className="text-slate-400">
              Notre équipe est disponible 7j/7 pour répondre à vos questions et planifier votre
              installation gratuite.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-slate-300">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
              <div>
                <span>Rabat, Maroc</span>
                <span className="block text-xs text-[#25D366] font-semibold mt-1">
                  ✓ Livraison disponible partout au Maroc
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <Phone className="w-5 h-5 text-blue-500 shrink-0" />
              <span>+212 661-908510</span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <a
                href="mailto:Rmxymaroc@gmail.com"
                className="text-slate-300 hover:text-white transition-colors"
              >
                Rmxymaroc@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <Instagram className="w-5 h-5 text-blue-500 shrink-0" />
              <a
                href="https://www.instagram.com/rmx.ma?igsh=MXN4bHUxeTZlZDJw"
                target="_blank"
                rel="noreferrer"
                className="text-slate-300 hover:text-white transition-colors"
              >
                @rmx.ma
              </a>
            </div>
          </div>

          <a
            href="https://wa.me/212661908510"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white font-bold">Discuter sur WhatsApp</p>
                <p className="text-[#25D366] text-sm">Réponse en moins de 5 min</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#25D366] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
