"use client";

import type { KartvizitData } from "@/lib/kartvizit-types";
import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  PinIcon,
  InstaIcon,
} from "@/components/kartvizit/KartvizitIcons";

interface Props {
  data: KartvizitData;
}

const NAVY = "#14365C";
const NAVY_DARK = "#0E2744";
const BLUE = "#1E6FB8";
const GOLD = "#C9A24B";
const INK = "#0F1724";
const MUTED = "#6B7280";
const SOFT = "#F3F5F8";

/**
 * 1004 x 650 — Kurumsal (Real Estate Solutions tarzı)
 *
 * Sol tarafta vesikalık foto alanı diagonal lacivert kesim ile,
 * sağ tarafta logo + isim + mavi yuvarlak ikonlu iletişim listesi.
 */
export function KartvizitKurumsal({ data }: Props) {
  return (
    <div
      className="relative font-sans"
      style={{
        width: 1004,
        height: 650,
        background: "#FFFFFF",
        color: INK,
        overflow: "hidden",
      }}
    >
      {/* SOL PANEL - lacivert + foto */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 430,
          height: "100%",
          background: NAVY,
        }}
      />

      {/* Foto alanı */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 350,
          height: 480,
          background: SOFT,
          overflow: "hidden",
          border: `4px solid ${GOLD}`,
          boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
        }}
      >
        {data.vesikalikFoto ? (
          <img
            src={data.vesikalikFoto}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: MUTED,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            FOTO
          </div>
        )}
      </div>

      {/* Alt: lacivert bant ofis adı */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 430,
          height: 60,
          background: NAVY_DARK,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: GOLD,
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          borderTop: `2px solid ${GOLD}`,
        }}
      >
        {data.ofisAdi}
      </div>

      {/* Diagonal lacivert köşe (sağ tarafa taşar) */}
      <svg
        width="160"
        height="650"
        viewBox="0 0 160 650"
        style={{ position: "absolute", top: 0, left: 430 }}
      >
        <polygon points="0,0 160,0 0,650" fill={NAVY} />
      </svg>

      {/* SAĞ PANEL */}
      {/* Logo */}
      {data.logo ? (
        <img
          src={data.logo}
          alt=""
          style={{
            position: "absolute",
            top: 40,
            right: 50,
            height: 120,
            maxWidth: 360,
            objectFit: "contain",
            zIndex: 4,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 60,
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: "0.15em",
            color: NAVY,
            textAlign: "right",
            textTransform: "uppercase",
            zIndex: 4,
          }}
        >
          {data.ofisAdi}
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.4em",
              color: GOLD,
              fontWeight: 700,
              marginTop: 4,
            }}
          >
            GAYRİMENKUL
          </div>
        </div>
      )}

      {/* Ad Soyad */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 540,
          right: 60,
          zIndex: 3,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1,
            color: NAVY,
            letterSpacing: -0.5,
          }}
        >
          {data.adSoyad}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ width: 40, height: 3, background: GOLD }} />
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: BLUE,
            }}
          >
            {data.unvan || "EMLAK DANIŞMANI"}
          </div>
        </div>
      </div>

      {/* İletişim - mavi yuvarlak ikonlar */}
      <div
        style={{
          position: "absolute",
          top: 320,
          left: 490,
          right: 50,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          zIndex: 3,
        }}
      >
        <InfoRow icon={<PhoneIcon size={22} />} text={data.telefon} big />
        {data.email && <InfoRow icon={<MailIcon />} text={data.email} />}
        {data.website && <InfoRow icon={<GlobeIcon />} text={data.website} />}
        {data.instagram && (
          <InfoRow
            icon={<InstaIcon />}
            text={data.instagram.replace(/^@/, "")}
          />
        )}
        {data.adres && (
          <InfoRow icon={<PinIcon />} text={data.adres} multiline />
        )}
      </div>

      {/* Altın alt çubuk (sağ alt) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 430,
          right: 0,
          height: 14,
          background: `linear-gradient(90deg, ${NAVY} 0%, ${GOLD} 50%, ${NAVY} 100%)`,
        }}
      />
    </div>
  );
}

function InfoRow({
  icon,
  text,
  multiline,
  big,
}: {
  icon: React.ReactNode;
  text: string;
  multiline?: boolean;
  big?: boolean;
}) {
  if (!text) return null;
  const size = big ? 48 : 34;
  const fontSize = big ? 24 : 15;
  return (
    <div
      style={{
        display: "flex",
        alignItems: multiline ? "flex-start" : "center",
        gap: big ? 18 : 14,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: 999,
          background: BLUE,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: multiline ? 3 : 0,
          boxShadow: `0 4px 10px ${BLUE}40`,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize,
          fontWeight: big ? 800 : 600,
          color: INK,
          lineHeight: multiline ? 1.35 : 1,
          letterSpacing: big ? -0.3 : 0,
        }}
      >
        {text}
      </div>
    </div>
  );
}
