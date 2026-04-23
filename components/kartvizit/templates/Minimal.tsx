"use client";

import type { KartvizitData } from "@/lib/kartvizit-types";
import {
  PhoneIcon,
  InstaIcon,
  MailIcon,
  GlobeIcon,
  PinIcon,
} from "@/components/kartvizit/KartvizitIcons";

interface Props {
  data: KartvizitData;
}

const INK = "#0F1724";
const MUTED = "#6B7280";
const ACCENT = "#E63946"; // kırmızı
const GRAY = "#9CA3AF"; // gri açılı çizgi

/**
 * 1004 x 650 — Minimalist (Lucky Homes tarzı)
 *
 * Tasarım: Beyaz zemin, sağ üstte gri zigzag çizgi, sağ altta kırmızı
 * zigzag çizgi. Sol tarafta büyük isim + altında kırmızı underline.
 * İletişim bilgileri sol alt tarafta yuvarlak kırmızı ikonlarla.
 */
export function KartvizitMinimal({ data }: Props) {
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
      {/* Sağ üst: gri açılı çizgi (dağ silüeti) */}
      <svg
        width="560"
        height="380"
        viewBox="0 0 560 380"
        style={{ position: "absolute", top: -30, right: -40 }}
      >
        <polyline
          points="560,40 420,200 290,70 130,260 0,120"
          fill="none"
          stroke={GRAY}
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
        />
      </svg>

      {/* Sağ alt: kırmızı açılı çizgi */}
      <svg
        width="720"
        height="340"
        viewBox="0 0 720 340"
        style={{ position: "absolute", bottom: -30, right: -20 }}
      >
        <polyline
          points="720,160 560,40 380,220 200,80 40,260 -40,200"
          fill="none"
          stroke={ACCENT}
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Logo sağ üstte (çizgilerin üstünde kalsın diye z-index) */}
      {data.logo ? (
        <img
          src={data.logo}
          alt=""
          style={{
            position: "absolute",
            top: 50,
            right: 60,
            height: 170,
            maxWidth: 400,
            objectFit: "contain",
            zIndex: 4,
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 80,
            textAlign: "right",
            fontWeight: 800,
            fontSize: 28,
            letterSpacing: "0.08em",
            color: INK,
            zIndex: 4,
          }}
        >
          {data.ofisAdi}
        </div>
      )}

      {/* İsim */}
      <div
        style={{
          position: "absolute",
          top: 128,
          left: 80,
          fontSize: 46,
          fontWeight: 700,
          color: INK,
          letterSpacing: -0.3,
          zIndex: 3,
        }}
      >
        {data.adSoyad}
      </div>
      <div
        style={{
          position: "absolute",
          top: 192,
          left: 80,
          width: 70,
          height: 3,
          background: ACCENT,
          zIndex: 3,
        }}
      />
      {data.unvan && (
        <div
          style={{
            position: "absolute",
            top: 206,
            left: 80,
            fontSize: 13,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 600,
            color: MUTED,
            zIndex: 3,
          }}
        >
          {data.unvan}
        </div>
      )}

      {/* İletişim — kırmızı yuvarlak ikonlarla sol alt */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 80,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 440,
        }}
      >
        <IconRow icon={<PhoneIcon size={22} />} text={data.telefon} big />
        {data.instagram && (
          <IconRow
            icon={<InstaIcon />}
            text={data.instagram.replace(/^@/, "")}
          />
        )}
        {data.email && <IconRow icon={<MailIcon />} text={data.email} />}
        {data.website && <IconRow icon={<GlobeIcon />} text={data.website} />}
        {data.adres && (
          <IconRow icon={<PinIcon />} text={data.adres} multiline />
        )}
      </div>
    </div>
  );
}

function IconRow({
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
  const size = big ? 52 : 38;
  const fontSize = big ? 26 : 17;
  return (
    <div
      style={{
        display: "flex",
        alignItems: multiline ? "flex-start" : "center",
        gap: big ? 20 : 16,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          minWidth: size,
          borderRadius: 999,
          background: ACCENT,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: multiline ? 3 : 0,
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
