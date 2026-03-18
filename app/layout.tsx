import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import TopBanner from "@/components/TopBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RMX | Serrures intelligentes premium",
  description: "La serrure intelligente n°1. Reconnaissance faciale 3D, application Tuya et sécurité bancaire.",
  icons: {
    icon: "/assets/logo.jpeg",
    apple: "/assets/logo.jpeg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="flex flex-col min-h-[100dvh] bg-[#050A15] text-white overflow-x-hidden">
        <CartProvider>
          <TopBanner />
          <Navbar />
          <main className="flex-grow relative">{children}</main>
          <Footer />
          <Cart />
        </CartProvider>
      </body>
    </html>
  );
}
