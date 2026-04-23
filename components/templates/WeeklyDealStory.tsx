"use client";

import { AutoFitText } from "@/components/AutoFitText";
import { ContactBlock } from "@/components/ContactBlock";
import { QrCode } from "@/components/QrCode";
import type { PropertyData } from "@/lib/types";
import { formatFiyat } from "@/lib/utils";

interface Props {
  data: PropertyData;
}

/** 1080 x 1920 — Haftanın Fırsatı Story'si (dinamik, aciliyet odaklı) */
export function WeeklyDealStory({ data }: Props) {
  return (
    <div
      className="relative overflow-hidden text-white font-sans"
      style={{
        width: 1080,
        height: 1920,
        background: "#0B1E3F",
      }}
    >
      {/* Üst foto */}
      {data.kapakFoto ? (
        <img
          src={data.kapakFoto}
          alt=""
          className="absolute"
          style={{ top: 0, left: 0, width: 1080, height: 900, objectFit: "cover" }}
        />
      ) : (
        <div
          className="absolute bg-gradient-to-br from-[#1a3a6e] to-brand"
          style={{ top: 0, left: 0, width: 1080, height: 900 }}
        />
      )}

      {/* Logo */}
      {data.logo && (
        <img
          src={data.logo}
          alt=""
          className="absolute"
          style={{
            top: 50,
            left: 50,
            height: 90,
            opacity: 0.9,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))",
          }}
        />
      )}

      {/* Sarı "FIRSAT" rozeti */}
      <div
        className="absolute font-display font-black uppercase text-brand"
        style={{
          top: 60,
          right: 60,
          background: "#FFD400",
          padding: "20px 30px",
          fontSize: 44,
          transform: "rotate(-6deg)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
          letterSpacing: 2,
        }}
      >
        Haftanın Fırsatı
      </div>

      {/* Diagonal kırmızı kesik */}
      <svg
        className="absolute"
        style={{ top: 820, left: 0 }}
        width={1080}
        height={120}
        viewBox="0 0 1080 120"
        preserveAspectRatio="none"
      >
        <polygon points="0,120 1080,0 1080,120" fill="#E63946" />
        <polygon points="0,120 1080,40 1080,120" fill="#0B1E3F" />
      </svg>

      {/* Orta içerik (başlık + açıklama + chip'ler) */}
      <div className="absolute" style={{ left: 70, right: 70, top: 970 }}>
        <div
          className="inline-block px-5 py-2 rounded-full font-bold uppercase tracking-widest text-sm"
          style={{ background: "#E63946", color: "white" }}
        >
          {data.islemTuru} · {data.mulkTipi} · {data.konum}
        </div>

        <div style={{ height: 210, marginTop: 20 }}>
          <AutoFitText
            text={data.baslik}
            maxFontSize={80}
            minFontSize={44}
            step={2}
            className="font-display font-extrabold"
            lineHeight={1.02}
          />
        </div>

        <div style={{ height: 120, marginTop: 14 }}>
          <AutoFitText
            text={data.aciklama}
            maxFontSize={28}
            minFontSize={17}
            step={1}
            className="font-sans text-white/85"
            lineHeight={1.3}
          />
        </div>

        {/* Özellik chip'leri */}
        <div className="flex flex-wrap gap-2 mt-4">
          {data.ozellikler.slice(0, 5).map((o) => (
            <span
              key={o}
              className="rounded-full px-4 py-1.5 text-base font-semibold"
              style={{
                background: "rgba(255,212,0,0.15)",
                color: "#FFD400",
                border: "2px solid #FFD400",
              }}
            >
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* En alttaki iki şerit: altın (fiyat + QR) + lacivert (iletişim) */}
      <div className="absolute" style={{ left: 70, right: 70, bottom: 70 }}>
        {/* Altın şerit */}
        <div
          className="flex items-center justify-between rounded-3xl p-6"
          style={{
            background: "linear-gradient(90deg, #FFD400 0%, #FFAA00 100%)",
            color: "#0B1E3F",
          }}
        >
          <div>
            <div className="text-sm uppercase tracking-[0.3em] font-bold opacity-80">
              Şimdi Yakala
            </div>
            <div
              className="font-display font-black"
              style={{ fontSize: 72, lineHeight: 1, marginTop: 6 }}
            >
              {formatFiyat(data.fiyat) || "—"}
            </div>
          </div>
          <QrCode value={data.ilanUrl} size={170} bg="#ffffff" fg="#0B1E3F" />
        </div>

        {/* Lacivert iletişim şeridi */}
        <div
          className="rounded-2xl px-6 py-5 mt-4 flex items-center justify-between"
          style={{
            background: "rgba(11,30,63,0.92)",
            border: "1px solid rgba(212,175,55,0.35)",
          }}
        >
          <ContactBlock data={data} align="left" theme="onDark" />
          <div
            className="text-xs uppercase tracking-[0.3em] font-bold"
            style={{ color: "#D4AF37" }}
          >
            QR'ı{"\n"}Taratın
          </div>
        </div>
      </div>
    </div>
  );
}
