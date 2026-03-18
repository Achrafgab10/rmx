"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const PRODUCTS = [
  {
    id: "rmx-lite",
    name: "RMX Lite",
    images: ["/assets/2.jpg", "/assets/1.jpg", "/assets/7.jpg"],
    oldPrice: "2300 MAD",
    price: "1650 MAD",
    badge: "-28%",
    tagline: "Serrure Connectée Intelligente avec Poignée – 5 Modes d'Ouverture",
    descText: "Un excellent compromis entre sécurité, simplicité et prix accessible.",
    features: [
      "👆 Empreinte digitale",
      "🔢 Code PIN sécurisé",
      "💳 Carte RFID",
      "🔑 Clé mécanique",
      "📱 Contrôle via application (Tuya)",
    ],
    specs: [
      "Clavier tactile lumineux",
      "Déverrouillage rapide (<1s)",
      "Historique des accès",
      "Création de codes invités",
      "Installation simple",
      "Design minimaliste",
    ],
    idealFor: ["Appartements", "Bureaux", "Studios", "Locations courte durée"],
  },
  {
    id: "rmx-pro",
    name: "RMX Pro",
    images: ["/assets/6.jpg", "/assets/5.jpg", "/assets/7.jpg"],
    oldPrice: "3400 MAD",
    price: "2690 MAD",
    badge: "N°1 des Ventes",
    tagline: "Serrure Connectée Premium avec Reconnaissance Faciale – 7 Modes d'Ouverture",
    descText:
      "Offrez à votre maison ou bureau une sécurité intelligente nouvelle génération. Combine technologie avancée, design moderne et sécurité maximale.",
    features: [
      "👆 Empreinte digitale ultra-rapide",
      "👁 Reconnaissance faciale (Face ID)",
      "✋ Reconnaissance de la paume",
      "🔢 Code PIN sécurisé",
      "🕒 Code temporaire à distance",
      "💳 Carte RFID",
      "🔑 Clé mécanique de secours",
      "📱 Ouverture à distance (WiFi/Tuya)",
    ],
    specs: [
      "Batterie 5000mAh",
      "Écran tactile HD intégré",
      "Alliage d'aluminium",
      "Alerte batterie faible",
      "Résistante aux effractions",
    ],
    idealFor: [
      "Maisons et villas",
      "Appartements",
      "Bureaux",
      "Locations Airbnb",
      "Espaces professionnels",
    ],
  },
  {
    id: "rmx-pro2",
    name: "RMX Pro2",
    images: ["/assets/4.jpg", "/assets/3.jpg", "/assets/7.jpg"],
    oldPrice: "4000 MAD",
    price: "3500 MAD",
    badge: "Ultra Premium",
    tagline: "Serrure Connectée Premium avec Reconnaissance Faciale – 7 Modes d'Ouverture",
    descText:
      "Le summum de la sécurité et du design. Combine technologie avancée, design moderne et sécurité maximale.",
    features: [
      "👆 Empreinte digitale ultra-rapide",
      "👁 Reconnaissance faciale (Face ID)",
      "✋ Reconnaissance de la paume",
      "🔢 Code PIN sécurisé",
      "🕒 Code temporaire à distance",
      "💳 Carte RFID",
      "🔑 Clé mécanique de secours",
      "📱 Ouverture à distance (WiFi/Tuya)",
    ],
    specs: [
      "Batterie 5000mAh",
      "Écran tactile HD intégré",
      "Alliage d'aluminium",
      "Alerte batterie faible",
      "Résistante aux effractions",
    ],
    idealFor: [
      "Maisons et villas",
      "Appartements",
      "Bureaux",
      "Locations Airbnb",
      "Espaces professionnels",
    ],
  },
];

export default function BoutiquePage() {
  useEffect(() => {
    // Check if there is a hash in the URL after component mounts
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // Add a tiny delay to ensure the DOM and Framer Motion layout is fully rendered before scrolling
        const t = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return () => clearTimeout(t);
      }
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#050A15] text-white pb-24">
      <main>
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            id={product.id}
            className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 max-w-7xl mx-auto py-12 lg:py-24 border-b border-white/10 px-4 lg:px-8"
            aria-labelledby={`product-title-${product.id}`}
          >
            {/* Left Column – Image Gallery */}
            <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-white">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar w-full">
                {product.images.map((src, i) => (
                  <div
                    key={`${product.id}-img-${i}`}
                    className="w-[100vw] md:w-[600px] shrink-0 snap-center aspect-square relative bg-white"
                  >
                    <Image
                      src={src}
                      alt={`${product.name} - Image ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column – Sticky Product Info */}
            <div className="flex flex-col gap-6 lg:sticky lg:top-24 h-fit mt-6 lg:mt-0 p-4 lg:p-0">
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-blue-400 font-bold text-3xl">{product.price}</span>
                  <span className="text-slate-500 line-through">{product.oldPrice}</span>
                  {product.badge && (
                    <span className="bg-blue-600/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </div>
                <h2 id={`product-title-${product.id}`} className="text-2xl font-bold mt-2">
                  {product.name}
                </h2>
                <p className="text-sm text-slate-300 mt-1">{product.tagline}</p>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">{product.descText}</p>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Modes d&apos;ouverture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((f, i) => (
                    <span
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-200"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Caractéristiques
                </h3>
                <ul className="space-y-1.5">
                  {product.specs.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 shrink-0 text-blue-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Idéal pour
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.idealFor.map((item, i) => (
                    <span
                      key={i}
                      className="bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Commander Button – WhatsApp */}
              <a
                href={`https://wa.me/212661908510?text=${encodeURIComponent("Bonjour, je souhaite commander la serrure " + product.name)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full lg:max-w-md py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-white flex justify-center items-center gap-2 active:scale-95 transition-transform"
              >
                Commander - {product.name}
              </a>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
