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

/** 1080 x 1350 — Bilgi kartı (teknik detaylar + iletişim) */
export function InfoCard({ data }: Props) {
  return (
    <div
      className="relative overflow-hidden font-sans text-brand"
      style={{ width: 1080, height: 1350, background: "#F5F1E8" }}
    >
      {/* Üst foto bandı */}
      <div className="relative" style={{ height: 540, width: 1080 }}>
        {data.kapakFoto ? (
          <img
            src={data.kapakFoto}
            alt=""
            style={{
              width: 1080,
              height: 540,
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            className="bg-gradient-to-br from-brand to-[#1a3a6e]"
            style={{ width: 1080, height: 540 }}
          />
        )}
        {data.logo && (
          <img
            src={data.logo}
            alt=""
            className="absolute"
            style={{
              top: 30,
              left: 30,
              height: 70,
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
            }}
          />
        )}
        <div
          className="absolute"
          style={{
            top: 30,
            right: 30,
            background: "#0B1E3F",
            color: "white",
            padding: "10px 22px",
            fontWeight: 700,
            letterSpacing: 3,
            fontSize: 18,
            textTransform: "uppercase",
          }}
        >
          {data.islemTuru}
        </div>
        <div className="absolute" style={{ bottom: 30, right: 30 }}>
          <MapPin konum={data.konum} size={120} />
        </div>
      </div>

      {/* Başlık + fiyat */}
      <div className="px-14 pt-10">
        <div style={{ height: 140 }}>
          <AutoFitText
            text={data.baslik}
            maxFontSize={56}
            minFontSize={30}
            step={2}
            className="font-display font-bold text-brand"
            lineHeight={1.02}
          />
        </div>
        <div className="flex items-center justify-between mt-4">
          <div
            className="font-display font-extrabold text-brand"
            style={{ fontSize: 64 }}
          >
            {formatFiyat(data.fiyat) || "—"}
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-[0.3em] text-brand/60">
              {data.mulkTipi}
            </div>
            <div className="font-bold text-2xl text-brand">{data.konum}</div>
          </div>
        </div>
      </div>

      {/* Teknik detay tablosu */}
      <div className="px-14 mt-8">
        <div
          className="grid grid-cols-3 rounded-2xl overflow-hidden"
          style={{ background: "white", boxShadow: "0 10px 30px rgba(11,30,63,0.08)" }}
        >
          <DetailCell label="Metrekare" value={`${data.metrekare} m²`} />
          <DetailCell label="Banyo" value={data.banyoSayisi} divided />
          <DetailCell
            label="İşlem"
            value={data.islemTuru}
            divided
          />
        </div>
      </div>

      {/* Özellikler */}
      <div className="px-14 mt-6">
        <div className="text-xs uppercase tracking-[0.3em] text-brand/60 mb-3">
          Öne Çıkan Özellikler
        </div>
        <div className="flex flex-wrap gap-2">
          {data.ozellikler.slice(0, 8).map((o) => (
            <span
              key={o}
              className="rounded-full px-4 py-2 text-base font-medium text-brand"
              style={{ background: "#0B1E3F10", border: "1px solid #0B1E3F25" }}
            >
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* Açıklama */}
      <div className="px-14 mt-4" style={{ height: 96 }}>
        <AutoFitText
          text={data.aciklama}
          maxFontSize={20}
          minFontSize={13}
          step={1}
          className="text-brand/80"
          lineHeight={1.4}
        />
      </div>

      {/* En alttaki danışman + QR şeridi */}
      <div
        className="absolute inset-x-0 bottom-0 px-14 py-6 flex items-center justify-between"
        style={{ background: "#0B1E3F", color: "white" }}
      >
        <ContactBlock data={data} align="left" theme="onDark" />
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs uppercase tracking-widest text-white/60">
              İlanı İncele
            </div>
            <div className="font-semibold text-sm text-white/90">
              QR'ı taratın
            </div>
          </div>
          <QrCode value={data.ilanUrl} size={130} bg="#ffffff" fg="#0B1E3F" />
        </div>
      </div>
    </div>
  );
}

function DetailCell({
  label,
  value,
  divided,
}: {
  label: string;
  value: string;
  divided?: boolean;
}) {
  return (
    <div
      className="px-6 py-5"
      style={divided ? { borderLeft: "1px solid #0B1E3F15" } : undefined}
    >
      <div className="text-xs uppercase tracking-[0.25em] text-brand/60">
        {label}
      </div>
      <div className="font-display font-bold text-brand text-3xl mt-1">
        {value || "—"}
      </div>
    </div>
  );
}
