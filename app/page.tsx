"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronRight,
  Fingerprint,
  Unlock,
  ScanFace,
  CheckCircle2,
  VolumeX,
  Volume2,
  ChevronDown
} from "lucide-react";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  initial: { opacity: 1 },
  transition: { duration: 0.5 },
};

// --- DATA ---
const TOP_SALES = [
  { id: 1, name: "RMX FaceID Pro", image: "/assets/rmx-lock-2.jpeg", price: "2890 MAD", oldPrice: "3490 MAD", badge: "Le plus vendu" },
  { id: 2, name: "RMX Slim Chrome", image: "/assets/rmx-lock-1.jpeg", price: "2490 MAD", oldPrice: "2990 MAD", badge: "Nouveau" },
];

const SLIDER_PRODUCTS = [
  { id: "rmx-lite", name: "RMX Lite", image: "/assets/2.jpg", oldPrice: "2300 MAD", price: "1650 MAD" },
  { id: "rmx-pro", name: "RMX Pro", image: "/assets/6.jpg", oldPrice: "3400 MAD", price: "2690 MAD" },
  { id: "rmx-pro2", name: "RMX Pro2", image: "/assets/4.jpg", oldPrice: "4000 MAD", price: "3500 MAD" },
];

const GAMME_MARQUEE_BASE = SLIDER_PRODUCTS;

const INSTALL_SLIDES = [
  { id: 1, title: "1. Commandez", desc: "Choisissez votre modèle en ligne.", img: "/assets/rmx-lock-8.jpeg" },
  { id: 2, title: "2. Validez", desc: "Envoyez une photo de votre porte.", img: "/assets/rmx-lock-9.jpeg" },
  { id: 3, title: "3. Installation", desc: "Notre expert installe en 48h.", img: "/assets/hero-lock.jpeg" },
];

// --- COMPONENTS ---

function FaceIDScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const startScan = () => {
    if (isUnlocked || isScanning) return;
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUnlocked(true);
    }, 2000);
  };

  return (
    <div className="bg-[#050A15]/95 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden">
      <h3 className="text-2xl font-bold mb-2">Test Face ID 3D</h3>
      <p className="text-slate-400 text-sm text-center mb-6">
        {isUnlocked ? "Visage reconnu" : "Appuyez pour simuler le scan radar."}
      </p>

      <div
        role="button"
        tabIndex={0}
        onClick={startScan}
        onKeyDown={(e) => e.key === "Enter" && startScan()}
        className="relative w-full min-h-[120px] flex items-center justify-center cursor-pointer touch-none select-none mb-6 rounded-2xl py-8"
      >
        <ScanFace className={`w-32 h-32 transition-colors duration-500 ${isUnlocked ? "text-green-400" : "text-slate-600"}`} strokeWidth={1} />

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ top: "0%" }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.8)] z-10"
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isUnlocked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -bottom-2 -right-2 bg-[#050A15] rounded-full"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isUnlocked && (
        <button type="button" onClick={() => setIsUnlocked(false)} className="text-sm font-medium text-slate-400 hover:text-white underline">
          Réessayer
        </button>
      )}
    </div>
  );
}

function FingerprintScanner() {
  const [isPressing, setIsPressing] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handlePressStart = () => {
    if (isUnlocked) return;
    setIsPressing(true);
    clearTimer();
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setIsPressing(false);
      setIsUnlocked(true);
    }, 1000);
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    clearTimer();
  };

  React.useEffect(() => () => clearTimer(), []);

  return (
    <div className="bg-[#050A15]/95 border border-white/10 rounded-3xl p-8 flex flex-col items-center relative overflow-hidden">
      <h3 className="text-2xl font-bold mb-2">Test Empreinte</h3>
      <p className="text-slate-400 text-sm text-center mb-8">
        {isUnlocked ? "Empreinte validée !" : "Maintenez votre pouce pour déverrouiller."}
      </p>

      <motion.div
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={(e) => {
          e.preventDefault();
          handlePressStart();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          handlePressEnd();
        }}
        onTouchCancel={handlePressEnd}
        animate={{ scale: isPressing ? 0.95 : 1 }}
        transition={{ duration: 0.1 }}
        style={{ boxShadow: isPressing ? "inset 0 0 30px rgba(37,99,235,0.5)" : "none" }}
        className="relative w-28 h-28 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center cursor-pointer touch-none select-none mb-6"
      >
        {isUnlocked ? <Unlock className="w-12 h-12 text-green-400" /> : <Fingerprint className={`w-12 h-12 ${isPressing ? "text-blue-500" : "text-slate-500"}`} />}
      </motion.div>

      {isUnlocked && (
        <button type="button" onClick={() => setIsUnlocked(false)} className="text-sm font-medium text-slate-400 hover:text-white underline">
          Réessayer
        </button>
      )}
    </div>
  );
}

const carouselProducts = [...GAMME_MARQUEE_BASE, ...GAMME_MARQUEE_BASE];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const timerRanRef = useRef(false);
  const [isGammeHovered, setIsGammeHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const missionVideoRef = useRef<HTMLVideoElement>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    const missionVideo = missionVideoRef.current;
    if (!heroVideo || !missionVideo) return;

    // Délai pour ne pas bloquer l'hydratation iOS
    const setup = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target as HTMLVideoElement;
            if (entry.isIntersecting) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => { /* Silence strict pour iOS */ });
              }
              if (video === heroVideo) {
                if (!missionVideo.paused) missionVideo.pause();
              } else {
                if (!heroVideo.paused) heroVideo.pause();
              }
            } else {
              if (!video.paused) video.pause();
            }
          });
        },
        { threshold: 0.2, rootMargin: "0px" }
      );
      observer.observe(heroVideo);
      observer.observe(missionVideo);
      return () => observer.disconnect();
    }, 500);

    return () => clearTimeout(setup);
  }, []);

  const toggleSound = () => {
    if (missionVideoRef.current) {
      const newMutedState = !missionVideoRef.current.muted;
      missionVideoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
      if (!newMutedState) {
        missionVideoRef.current.play().catch((e) => console.error("iOS Audio Play Blocked", e));
      }
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    if (isLoading && !timerRanRef.current) {
      timerRanRef.current = true;
      const timer = setTimeout(() => setIsLoading(false), 3000);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, [isMounted, isLoading]);

  const preloaderEl =
    isMounted &&
    typeof document !== "undefined" &&
    createPortal(
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="new-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#050A15]"
            style={{ position: "fixed", inset: 0, zIndex: 999999 }}
            aria-live="polite"
            aria-label="Chargement"
          >
            <div className="flex flex-col items-center justify-center gap-6">
              <motion.span
                className="text-4xl md:text-6xl font-extralight tracking-[0.4em] text-white uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                RMX
              </motion.span>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  return (
    <div
      className={`bg-[#050A15] text-white selection:bg-blue-500/30 block ${isLoading ? "overflow-hidden" : ""}`}
      style={{ touchAction: "pan-y" }}
    >
      {preloaderEl}

      {/* 1. HERO VIDEO SECTION */}
      <section className="relative h-[85dvh] min-h-[600px] flex items-center justify-center px-4 overflow-clip">
        <div className="absolute inset-0 z-0 overflow-clip transform-gpu [transform:translateZ(0)] [mask-image:-webkit-radial-gradient(white,black)]">
          <video
          ref={heroVideoRef}
          loop
          muted
          playsInline
          disablePictureInPicture
          preload="metadata"
          poster="/assets/logo.jpeg"
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-60 transform-gpu will-change-transform"
          src="/assets/hero-bg.mp4"
        />
        </div>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#050A15]/40 to-[#050A15]" />

        <motion.div {...fadeInUp} className="relative z-10 text-center max-w-3xl mt-16">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-6 text-white drop-shadow-xl">
            Oubliez les clés. <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Passez au niveau supérieur.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl mx-auto">
            La serrure intelligente n°1. Face ID 3D, App Tuya et sécurité bancaire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/boutique" className="px-8 py-4 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-[0_0_20px_rgba(37,99,235,0.4)] text-center">
              Découvrir les modèles
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 4. FLAGSHIP PRODUCT – Edge-to-edge poster */}
      <section
        id="top-sales"
        className="relative w-full h-[90dvh] bg-[#050A15] overflow-hidden flex flex-col justify-end border-b border-white/10"
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <Image src="/assets/RMX TOP.png" alt="RMX Pro" fill className="object-cover object-center" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-[#050A15]/60 to-transparent" />
        <div className="relative z-10 p-6 md:p-12 w-full max-w-5xl mx-auto flex flex-col gap-2 pb-20 md:pb-12">
          <span className="w-max bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-2 shadow-[0_0_15px_rgba(37,99,235,0.5)]">N°1</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight">RMX Pro</h2>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-slate-400 line-through text-2xl font-medium">3400 MAD</span>
            <span className="text-blue-400 font-bold text-4xl md:text-5xl">2690 MAD</span>
          </div>
          <Link href="/boutique#rmx-pro" className="w-full md:w-auto md:max-w-md py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg transition-transform active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 mt-2">
            Commander <ChevronRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* 5. DOUBLE BIOMETRIC TEST (Fingerprint + Face ID) */}
      <section className="cv-auto px-4 py-16 md:py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-center">
          Essayez la technologie en direct
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FingerprintScanner />
          <FaceIDScanner />
        </div>
      </section>

      {/* 6. TOUTE LA GAMME - Infinite marquee */}
      <section className="py-16 overflow-hidden">
        <div className="px-4 max-w-5xl mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Toute la gamme</h2>
        </div>
        <div
          className="overflow-hidden select-none py-4"
          onMouseEnter={() => setIsGammeHovered(true)}
          onMouseLeave={() => setIsGammeHovered(false)}
          onTouchStart={() => setIsGammeHovered(true)}
          onTouchEnd={() => setIsGammeHovered(false)}
        >
          <div
            className={`flex w-max gap-4 md:gap-6 px-4 animate-gamme-marquee will-change-transform ${isGammeHovered ? "[animation-play-state:paused]" : ""}`}
          >
            {[1, 2].map((copy) =>
              carouselProducts.map((product, i) => (
                <div
                  key={`${product.id}-${copy}-${i}`}
                  className="shrink-0 w-[80vw] sm:w-[280px] bg-[#050A15]/95 border border-white/10 rounded-3xl p-4 flex flex-col"
                >
                  <div className="relative w-full aspect-square bg-white rounded-2xl mb-4 overflow-hidden p-4">
                    <Image src={product.image} alt={product.name} fill className="object-contain" sizes="(max-width: 640px) 80vw, 280px" />
                  </div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{product.price}</p>
                  <Link href={"/boutique#" + product.id} className="mt-auto w-full py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                    Voir les détails <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. COMMENT ON INSTALLE – Edge-to-edge video */}
      <section className="py-16 md:py-24 bg-[#050A15] relative">
        <div className="px-4 max-w-5xl mx-auto mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">Comment on installe ?</h2>
        </div>
        <div className="relative w-full h-[70dvh] min-h-[500px] md:max-w-5xl md:mx-auto md:rounded-[2rem] overflow-clip border-y md:border border-white/10 transform-gpu [transform:translateZ(0)] [mask-image:-webkit-radial-gradient(white,black)]">
          <video
            ref={missionVideoRef}
            loop
            muted={isMuted}
            playsInline
            disablePictureInPicture
            preload="metadata"
            poster="/assets/logo.jpeg"
            className="absolute inset-0 w-full h-full object-cover z-0 transform-gpu will-change-transform"
            src="/assets/RMX MISSION.mp4"
          />
          <button
            type="button"
            onClick={toggleSound}
            className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-black/60 border border-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-black/70"
            aria-label={isMuted ? "Activer le son" : "Couper le son"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-5 h-5 shrink-0" />
                <span>Activer le son</span>
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5 shrink-0 animate-pulse" />
                <span>Son activé</span>
              </>
            )}
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-[#050A15]/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-left z-10">
            <span className="inline-block bg-[#2563EB]/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full border border-blue-500/30 mb-4">
              Service VIP
            </span>
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
              Installation Premium à domicile
            </h3>
            <p className="text-slate-300 text-sm md:text-base max-w-lg">
              Notre technicien expert se déplace chez vous. Il configure votre serrure RMX, l&apos;application Tuya et vos empreintes. Vous payez uniquement une fois satisfait à 100%.
            </p>
          </div>
        </div>
      </section>

      {/* Mission – themed text */}
      <section className="cv-auto py-12 md:py-16 bg-[#050A15] text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Votre sécurité.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Notre mission.</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
          Fini les clés perdues. Fini le stress. Protégez ce qui compte vraiment avec une technologie digne des services secrets. Notre équipe s&apos;occupe de tout.
        </p>
      </section>

      {/* Foire Aux Questions */}
      <section className="cv-auto px-4 py-16 md:py-24 bg-[#050A15]" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
          Foire Aux Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {/* FAQ 1 */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              onClick={() => setFaqOpen(faqOpen === 1 ? null : 1)}
              aria-expanded={faqOpen === 1}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white hover:bg-white/5 transition-colors"
            >
              <span className="font-bold">Comment fonctionne l&apos;installation à domicile ?</span>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${faqOpen === 1 ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {faqOpen === 1 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-slate-300 text-sm">
                      Vous commandez en ligne, envoyez une photo de votre porte, et notre technicien se déplace chez vous pour installer et configurer votre serrure RMX. Vous ne payez qu&apos;une fois l&apos;installation terminée et validée par vos soins.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 2 */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              onClick={() => setFaqOpen(faqOpen === 2 ? null : 2)}
              aria-expanded={faqOpen === 2}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white hover:bg-white/5 transition-colors"
            >
              <span className="font-bold">Quelle garantie et support après vente ?</span>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${faqOpen === 2 ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {faqOpen === 2 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-slate-300 text-sm">
                      Nos serrures sont couvertes par une garantie constructeur. Notre support client est disponible 7j/7 sur WhatsApp pour toute question technique ou configuration.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FAQ 3 – Pourquoi Nous Choisir ? */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              onClick={() => setFaqOpen(faqOpen === 3 ? null : 3)}
              aria-expanded={faqOpen === 3}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-white hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-[#2563EB]">Pourquoi Nous Choisir ?</span>
              <ChevronDown className={`w-5 h-5 shrink-0 transition-transform ${faqOpen === 3 ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {faqOpen === 3 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-slate-300 text-sm">
                      Parce que nous n&apos;offrons pas qu&apos;une simple serrure, nous offrons une tranquillité d&apos;esprit totale. Avec RMX, vous bénéficiez d&apos;une installation VIP à domicile partout au Maroc, d&apos;un support client 7j/7 ultra-réactif sur WhatsApp, et de la garantie absolue : vous ne payez qu&apos;une fois l&apos;installation terminée et testée par vos soins.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp FAB – fixed bottom right, mobile-first */}
      <a
        href="https://wa.me/212661908510"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-4 md:bottom-6 md:right-6 z-[90] flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#20BD5A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-[#050A15]"
        aria-label="Contactez-nous sur WhatsApp"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 hidden" aria-hidden />
        <MessageCircle className="w-7 h-7 relative z-10" />
      </a>

      {/* Global Mobile Padding fix so footer doesn't get cut off by browser nav */}
      <div className="h-16 bg-black md:hidden" />
      
    </div>
  );
}



