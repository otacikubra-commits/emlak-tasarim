"use client";

import { AgentStrip } from "@/components/AgentStrip";
import { AutoFitText } from "@/components/AutoFitText";
import type { PropertyData } from "@/lib/types";

interface Props {
  data: PropertyData;
}

/** 1080 x 1080 — Satıldı / Kiralandı tebrik kartı (minimalist) */
export function SoldCard({ data }: Props) {
  const etiket =
    data.islemTuru === "Kiralık"
      ? "KİRALANDI"
      : data.islemTuru === "Devren"
      ? "DEVREDİLDİ"
      : "SATILDI";

  return (
    <div
      className="relative overflow-hidden font-sans"
      style={{ width: 1080, height: 1080, background: "#0B1E3F" }}
    >
      {/* Arkaplan foto (mat filtre ile) */}
      {data.kapakFoto && (
        <img
          src={data.kapakFoto}
          alt=""
          className="absolute inset-0 h-full w-full"
          style={{
            objectFit: "cover",
            filter: "grayscale(100%) brightness(0.45)",
          }}
        />
      )}

      {/* Ortadaki büyük damga */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div
          className="uppercase font-semibold tracking-[0.5em] text-brand-accent mb-6"
          style={{ fontSize: 28 }}
        >
          Bir Portföy Daha
        </div>

        <div
          className="font-display font-black text-white"
          style={{
            fontSize: 180,
            lineHeight: 0.95,
            letterSpacing: -4,
            textShadow: "0 8px 30px rgba(0,0,0,0.5)",
          }}
        >
          {etiket}
        </div>

        {/* Altın çizgi */}
        <div
          className="my-8"
          style={{ width: 240, height: 4, background: "#D4AF37" }}
        />

        <div
          className="px-16"
          style={{ height: 140, width: "100%" }}
        >
          <AutoFitText
            text={data.baslik}
            maxFontSize={46}
            minFontSize={26}
            className="font-display italic text-white/90"
            lineHeight={1.15}
            as="span"
            style={{ textAlign: "center" }}
          />
        </div>

        <div className="text-white/70 text-xl mt-4">
          {data.mulkTipi} · {data.konum}
        </div>
      </div>

      {/* Alt şerit: danışman bandı (foto → isim/ünvan → iletişim) */}
      <div
        className="absolute inset-x-0 bottom-0 px-12 py-7"
        style={{
          background: "rgba(11,30,63,0.95)",
          borderTop: "1px solid rgba(212,175,55,0.4)",
        }}
      >
        <AgentStrip
          ad={data.danismanAdi}
          unvan={data.danismanUnvan}
          telefon={data.danismanTelefon}
          foto={data.danismanFoto}
          theme="onDark"
          scale={1}
        />
      </div>
    </div>
  );
}
