"use client";

import { AutoFitText } from "@/components/AutoFitText";
import { ContactBlock } from "@/components/ContactBlock";
import { QrCode } from "@/components/QrCode";
import type { PropertyData } from "@/lib/types";
import { formatFiyat } from "@/lib/utils";

interface Props {
  data: PropertyData;
}

// Kullanıcının istediği net renkler — bu şablona özel.
const NAVY = "#0B1C2C";
const GOLD = "#D4A64A";

/** 1080 x 1080 — Galeri Vitrin (modern, Instagram carousel kapak) */
export function GaleriVitrin({ data }: Props) {
  // Kapak + detaylar → ilk 3 foto (eksikler için null placeholder)
  const fotolar: (string | null)[] = [];
  if (data.kapakFoto) fotolar.push(data.kapakFoto);
  data.detayFotolar.forEach((f) => {
    if (f) fotolar.push(f);
  });
  while (fotolar.length < 3) fotolar.push(null);
  const ilkUc = fotolar.slice(0, 3);

  const fiyatEtiketi =
    data.islemTuru === "Kiralık"
      ? "Kira Fiyatı"
      : data.islemTuru === "Devren"
      ? "Devir Bedeli"
      : "Satış Fiyatı";

  return (
    <div
      className="relative font-sans"
      style={{
        width: 1080,
        height: 1080,
        background: "#FFFFFF",
        color: NAVY,
      }}
    >
      {/* ÜST: başlık (sol) + fiyat kutusu (sağ) */}
      <div
        className="absolute flex items-start"
        style={{ top: 56, left: 60, right: 60, gap: 40 }}
      >
        {/* Sol: konum + başlık */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="flex items-center"
            style={{ gap: 12, marginBottom: 14 }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: GOLD,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.32em",
                fontWeight: 700,
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              {data.konum}
            </span>
          </div>

          <div style={{ height: 180 }}>
            <AutoFitText
              text={data.baslik}
              maxFontSize={84}
              minFontSize={44}
              step={2}
              className="font-sans"
              style={{
                color: NAVY,
                fontWeight: 900,
                letterSpacing: -1.5,
                textTransform: "uppercase",
              }}
              lineHeight={0.98}
            />
          </div>
        </div>

        {/* Sağ: fiyat kutusu */}
        <div
          className="shrink-0"
          style={{
            background: NAVY,
            color: "white",
            borderRadius: 20,
            padding: "22px 26px",
            textAlign: "right",
            boxShadow: "0 18px 45px rgba(11,28,44,0.25)",
            minWidth: 310,
          }}
        >
          <div
            style={{
              fontSize: 13,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: GOLD,
              fontWeight: 800,
            }}
          >
            {fiyatEtiketi}
          </div>
          <div
            className="font-display font-extrabold"
            style={{
              fontSize: 46,
              marginTop: 8,
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {formatFiyat(data.fiyat) || "—"}
          </div>
        </div>
      </div>

      {/* Altın ayırıcı çizgi (sol kenar lacivert vurguyla) */}
      <div
        className="absolute"
        style={{
          top: 320,
          left: 60,
          right: 60,
          height: 3,
          background: `${GOLD}`,
          opacity: 0.85,
        }}
      />
      <div
        className="absolute"
        style={{
          top: 320,
          left: 60,
          width: 88,
          height: 3,
          background: NAVY,
        }}
      />

      {/* Küçük meta satırı (mülk tipi · metrekare · banyo) */}
      <div
        className="absolute flex items-center"
        style={{
          top: 340,
          left: 60,
          right: 60,
          gap: 24,
          fontSize: 15,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontWeight: 600,
          color: `${NAVY}99`,
        }}
      >
        <span>{data.mulkTipi}</span>
        {data.metrekare && (
          <>
            <Nokta />
            <span>{data.metrekare} m²</span>
          </>
        )}
        {data.banyoSayisi && (
          <>
            <Nokta />
            <span>{data.banyoSayisi} Banyo</span>
          </>
        )}
      </div>

      {/* 3 foto galerisi */}
      <div
        className="absolute"
        style={{
          top: 400,
          left: 60,
          right: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 14,
        }}
      >
        {ilkUc.map((src, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              height: 350,
              background: "#F4F2EC",
              borderRadius: 16,
              overflow: "hidden",
              border: `1px solid ${GOLD}30`,
              position: "relative",
            }}
          >
            {src ? (
              <img
                src={src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ color: `${NAVY}40`, fontSize: 13, fontWeight: 600 }}
              >
                FOTO {i + 1}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Özellik chip'leri */}
      <div
        className="absolute flex flex-wrap"
        style={{ top: 790, left: 60, right: 180, gap: 8 }}
      >
        {data.ozellikler.slice(0, 5).map((o) => (
          <span
            key={o}
            style={{
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 15,
              fontWeight: 600,
              background: `${NAVY}0A`,
              border: `1px solid ${NAVY}22`,
              color: NAVY,
            }}
          >
            {o}
          </span>
        ))}
      </div>

      {/* QR kod (sağ tarafta, chip'lerin yanında) */}
      <div className="absolute" style={{ top: 770, right: 60 }}>
        <QrCode value={data.ilanUrl} size={110} bg="#FFFFFF" fg={NAVY} />
      </div>

      {/* Alt iletişim şeridi */}
      <div
        className="absolute flex items-center justify-between"
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          background: NAVY,
          padding: "26px 60px",
          color: "white",
          borderTop: `3px solid ${GOLD}`,
        }}
      >
        <ContactBlock data={data} align="left" theme="onDark" />
        {data.logo && (
          <img
            src={data.logo}
            alt=""
            style={{
              height: 86,
              filter: "brightness(0) invert(1)",
              opacity: 0.92,
            }}
          />
        )}
      </div>
    </div>
  );
}

function Nokta() {
  return (
    <span
      style={{
        width: 4,
        height: 4,
        borderRadius: 999,
        background: GOLD,
        display: "inline-block",
      }}
    />
  );
}
