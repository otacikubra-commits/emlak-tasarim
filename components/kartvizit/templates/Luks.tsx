"use client";

import { QrCode } from "@/components/QrCode";
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

const BLACK = "#0B0B0D";
const NAVY = "#0F2847";
const GOLD = "#D4A64A";
const GOLD_BRIGHT = "#E8C26A";
const LIGHT = "#F3EFE6";
const MUTED = "#9A958A";

/**
 * 1004 x 650 — Lüks (Good Invest tarzı)
 *
 * Koyu lacivert zemin, altın geometrik desen, üçgen/ok şeklinde
 * altın aksan bantlar. Ortada büyük isim + altın ikonlar.
 */
export function KartvizitLuks({ data }: Props) {
  return (
    <div
      className="relative font-sans"
      style={{
        width: 1004,
        height: 650,
        background: NAVY,
        color: LIGHT,
        overflow: "hidden",
      }}
    >
      {/* Arkaplan altın geometrik desen (sağ taraf) */}
      <svg
        width="600"
        height="650"
        viewBox="0 0 600 650"
        style={{ position: "absolute", top: 0, right: 0, opacity: 0.12 }}
      >
        <defs>
          <pattern
            id="luks-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="40" y2="0" stroke={GOLD} strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="40" stroke={GOLD} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="600" height="650" fill="url(#luks-grid)" />
      </svg>

      {/* Büyük altın üçgen aksan sol üst */}
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <polygon points="0,0 320,0 0,320" fill={GOLD} opacity="0.95" />
        <polygon points="0,0 220,0 0,220" fill={GOLD_BRIGHT} opacity="0.85" />
      </svg>

      {/* Altın üçgen aksan sağ alt */}
      <svg
        width="260"
        height="260"
        viewBox="0 0 260 260"
        style={{ position: "absolute", bottom: 0, right: 0 }}
      >
        <polygon points="260,260 0,260 260,0" fill={GOLD} opacity="0.9" />
      </svg>

      {/* Çift altın çerçeve */}
      <div
        style={{
          position: "absolute",
          top: 22,
          bottom: 22,
          left: 22,
          right: 22,
          border: `1px solid ${GOLD}60`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 30,
          bottom: 30,
          left: 30,
          right: 30,
          border: `1px solid ${GOLD}`,
          pointerEvents: "none",
        }}
      />

      {/* Logo sol üst (üçgen üstünde) */}
      {data.logo ? (
        <img
          src={data.logo}
          alt=""
          style={{
            position: "absolute",
            top: 50,
            left: 55,
            height: 120,
            maxWidth: 340,
            objectFit: "contain",
            zIndex: 5,
            filter: "brightness(0) invert(0.15)",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 70,
            zIndex: 5,
            color: NAVY,
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {data.ofisAdi}
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.4em",
              fontWeight: 700,
              marginTop: 4,
              color: NAVY,
              opacity: 0.85,
            }}
          >
            PREMIUM GAYRİMENKUL
          </div>
        </div>
      )}

      {/* ORTA - isim + unvan */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 60px",
          zIndex: 4,
        }}
      >
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: GOLD_BRIGHT,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          {data.ofisAdi}
        </div>

        <div
          className="font-display"
          style={{
            fontSize: 60,
            lineHeight: 1,
            letterSpacing: 0.5,
            fontWeight: 800,
            color: LIGHT,
          }}
        >
          {data.adSoyad}
        </div>

        <div
          style={{
            marginTop: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <div style={{ width: 70, height: 1, background: GOLD }} />
          <div
            style={{
              width: 10,
              height: 10,
              transform: "rotate(45deg)",
              background: GOLD,
            }}
          />
          <div style={{ width: 70, height: 1, background: GOLD }} />
        </div>

        {data.unvan && (
          <div
            style={{
              marginTop: 18,
              fontSize: 14,
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: GOLD_BRIGHT,
              fontWeight: 600,
            }}
          >
            {data.unvan}
          </div>
        )}
      </div>

      {/* Büyük telefon - sosyal medyanın üstünde */}
      {data.telefon && (
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            bottom: 148,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 999,
              background: GOLD,
              color: NAVY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 6px 18px ${GOLD}55`,
            }}
          >
            <PhoneIcon size={26} />
          </div>
          <span
            style={{
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: -0.2,
              color: LIGHT,
            }}
          >
            {data.telefon}
          </span>
        </div>
      )}

      {/* ALT - diğer iletişim ikonları (altın yuvarlak) */}
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          bottom: 78,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 22,
          rowGap: 10,
          zIndex: 4,
        }}
      >
        {data.email && <LuksItem icon={<MailIcon />} text={data.email} />}
        {data.website && <LuksItem icon={<GlobeIcon />} text={data.website} />}
        {data.instagram && (
          <LuksItem
            icon={<InstaIcon />}
            text={data.instagram.replace(/^@/, "")}
          />
        )}
      </div>

      {data.adres && (
        <div
          style={{
            position: "absolute",
            left: 70,
            right: 70,
            bottom: 46,
            textAlign: "center",
            fontSize: 11,
            letterSpacing: "0.25em",
            color: LIGHT,
            opacity: 0.7,
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            zIndex: 4,
          }}
        >
          <PinIcon size={12} />
          <span>{data.adres}</span>
        </div>
      )}

      {data.qrUrl && (
        <div
          style={{
            position: "absolute",
            bottom: 56,
            right: 56,
            padding: 6,
            background: LIGHT,
            borderRadius: 8,
            zIndex: 6,
            boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          }}
        >
          <QrCode value={data.qrUrl} size={72} bg={LIGHT} fg={NAVY} />
        </div>
      )}
    </div>
  );
}

function LuksItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: LIGHT,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 999,
          background: GOLD,
          color: NAVY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.03em",
        }}
      >
        {text}
      </span>
    </div>
  );
}
