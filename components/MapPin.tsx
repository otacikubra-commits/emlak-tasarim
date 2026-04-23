"use client";

import { konumKisalt } from "@/lib/utils";

interface MapPinProps {
  konum: string;
  /** Kapsayıcı genişlik/yükseklik (px) */
  size?: number;
  /** Çerçeve rengi */
  color?: string;
}

/**
 * MVP için harici harita çağırmadan, inline SVG ile bir "harita pin" rozeti
 * üretir. Konum metni pin altında küçük bir bant olarak görünür.
 * Daha sonra Google Static Maps veya Mapbox ile geliştirilebilir.
 */
export function MapPin({ konum, size = 110, color = "#D4AF37" }: MapPinProps) {
  const sehir = konumKisalt(konum);
  return (
    <div
      className="flex flex-col items-center gap-1 rounded-2xl bg-white/90 backdrop-blur-sm shadow-card"
      style={{ width: size, padding: 10 }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size * 0.45}
        height={size * 0.45}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span
        className="font-semibold text-brand text-center"
        style={{ fontSize: Math.max(11, size * 0.13), lineHeight: 1.05 }}
      >
        {sehir}
      </span>
    </div>
  );
}
