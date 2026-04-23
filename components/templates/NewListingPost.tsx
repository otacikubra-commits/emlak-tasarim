"use client";

import { AutoFitText } from "@/components/AutoFitText";
import { ContactBlock } from "@/components/ContactBlock";
import { MapPin } from "@/components/MapPin";
import { QrCode } from "@/components/QrCode";
import type { PropertyData } from "@/lib/types";
import { formatFiyat } from "@/lib/utils";

interface Props {
  data: PropertyData;
}

/** 1080 x 1080 — Yeni Portföy Postu */
export function NewListingPost({ data }: Props) {
  return (
    <div
      className="relative overflow-hidden text-white font-sans bg-brand"
      style={{ width: 1080, height: 1080 }}
    >
      {/* Ana fotoğraf */}
      {data.kapakFoto ? (
        <img
          src={data.kapakFoto}
          alt=""
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand to-[#1a3a6e]" />
      )}

      {/* Üst karartma — kategori bandını taşıması için güçlü gradient */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: 200,
          background:
            "linear-gradient(to bottom, rgba(11,30,63,0.75) 0%, rgba(11,30,63,0.35) 70%, transparent)",
        }}
      />

      {/* Logo (şeffaf watermark) */}
      {data.logo && (
        <img
          src={data.logo}
          alt=""
          className="absolute"
          style={{
            top: 36,
            left: 36,
            height: 80,
            opacity: 0.92,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
          }}
        />
      )}

      {/* Sağ üstteki "SATILIK" bandı */}
      <div
        className="absolute font-display font-extrabold uppercase tracking-wider text-brand"
        style={{
          top: 60,
          right: -90,
          width: 420,
          padding: "18px 0",
          textAlign: "center",
          background: "#D4AF37",
          fontSize: 48,
          transform: "rotate(35deg)",
          boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
        }}
      >
        {data.islemTuru}
      </div>

      {/* Konum pin'i — sağ banttan uzakta olsun diye sol üste taşındı */}
      <div className="absolute" style={{ top: 150, left: 36 }}>
        <MapPin konum={data.konum} size={130} />
      </div>

      {/* Alt koyu karartma — içerik arkası tamamen lacivert görünsün */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: 680,
          background:
            "linear-gradient(to top, rgba(11,30,63,0.98) 0%, rgba(11,30,63,0.96) 40%, rgba(11,30,63,0.7) 72%, transparent 100%)",
        }}
      />

      {/* Alt içerik bloğu */}
      <div className="absolute" style={{ left: 60, right: 60, bottom: 60 }}>
        {/* Kategori etiket şeridi — kendi arkaplanı var, her foto üzerinde okunur */}
        <div className="mb-5">
          <span
            className="inline-flex items-center gap-3 rounded-full px-4 py-2 text-brand-accent"
            style={{
              background: "rgba(11,30,63,0.85)",
              border: "1px solid rgba(212,175,55,0.45)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "#D4AF37" }}
            />
            <span className="text-sm font-semibold uppercase tracking-[0.3em]">
              {data.mulkTipi} · {data.konum}
            </span>
          </span>
        </div>

        <div className="flex items-end justify-between gap-8">
          <div className="flex-1 min-w-0">
            {/* Başlık — yüksek container + daha geniş font aralığı */}
            <div style={{ height: 210 }}>
              <AutoFitText
                text={data.baslik}
                maxFontSize={74}
                minFontSize={38}
                step={2}
                className="font-display font-bold"
                lineHeight={1.02}
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {data.ozellikler.slice(0, 5).map((o) => (
                <span
                  key={o}
                  className="rounded-full bg-white/15 backdrop-blur-sm px-4 py-2 text-base font-medium"
                  style={{ border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>

          {/* QR */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <QrCode value={data.ilanUrl} size={170} bg="#ffffff" fg="#0B1E3F" />
            <span className="text-xs uppercase tracking-widest text-white/70">
              İlanı Gör
            </span>
          </div>
        </div>

        {/* Fiyat şeridi */}
        <div
          className="mt-7 flex items-center justify-between rounded-2xl px-7 py-6 gap-6"
          style={{
            background: "linear-gradient(90deg, #D4AF37 0%, #B8902B 100%)",
            color: "#0B1E3F",
          }}
        >
          <span className="font-display font-extrabold shrink-0" style={{ fontSize: 58 }}>
            {formatFiyat(data.fiyat) || "—"}
          </span>
          <ContactBlock data={data} align="right" theme="onGold" />
        </div>
      </div>
    </div>
  );
}
