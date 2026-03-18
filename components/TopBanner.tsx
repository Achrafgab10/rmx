import React from "react";

export default function TopBanner() {
  return (
    <div className="w-full py-3 bg-blue-600 overflow-hidden shrink-0" role="marquee" aria-label="RMX Serrure intelligente">
      <div className="flex whitespace-nowrap text-white animate-bestsellers-marquee will-change-transform">
        {[1, 2].map((copy) => (
          <span
            key={copy}
            className="inline-flex items-center text-xs md:text-sm font-bold tracking-[0.2em] uppercase shrink-0"
          >
            {Array(8).fill("RMX ✦ SERRURE INTELLIGENTE ✦ RMX ✦ FACE ID 3D ✦ ").join("")}
          </span>
        ))}
      </div>
    </div>
  );
}
