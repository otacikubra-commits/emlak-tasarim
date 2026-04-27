"use client";

import {
  PhoneIcon,
  MailIcon,
  GlobeIcon,
  PinIcon,
  InstaIcon,
} from "@/components/kartvizit/KartvizitIcons";

/**
 * Yatay danışman bandı: [yuvarlak foto] [isim + ünvan] [iletişim ikonları]
 *
 * Tüm tasarımların altında ortak görünüm sağlamak için kullanılır. İçerik
 * temaya göre (koyu / altın / açık zemin) farklı renk paletinde çıkar.
 */

export type StripTheme = "onDark" | "onGold" | "onLight";

interface AgentStripProps {
  ad: string;
  unvan?: string;
  telefon: string;
  email?: string;
  website?: string;
  instagram?: string;
  adres?: string;
  foto: string | null;
  theme?: StripTheme;
  /** Yüksekliğe göre genel ölçek (1080 postlar için 1, story 1080x1920 için 1.15 vs) */
  scale?: number;
  /** Foto + iletişim ikonu rozet rengi */
  accent?: string;
}

export function AgentStrip({
  ad,
  unvan,
  telefon,
  email,
  website,
  instagram,
  adres,
  foto,
  theme = "onDark",
  scale = 1,
  accent,
}: AgentStripProps) {
  const palette = getPalette(theme);
  const accentColor = accent ?? palette.accent;

  const photoSize = 110 * scale;
  const nameSize = 32 * scale;
  const unvanSize = 16 * scale;
  const phoneSize = 26 * scale;
  const lineSize = 16 * scale;
  const iconBadge = 38 * scale;
  const iconInner = 20 * scale;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24 * scale,
        width: "100%",
      }}
    >
      {/* 1. FOTO */}
      <div
        style={{
          width: photoSize,
          height: photoSize,
          minWidth: photoSize,
          borderRadius: 999,
          overflow: "hidden",
          background: palette.photoBg,
          border: `3px solid ${accentColor}`,
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {foto ? (
          <img
            src={foto}
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
              fontSize: 11 * scale,
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: palette.muted,
              textTransform: "uppercase",
            }}
          >
            FOTO
          </div>
        )}
      </div>

      {/* 2. İSİM + ÜNVAN */}
      <div
        style={{
          flex: "1 1 auto",
          minWidth: 0,
          color: palette.primary,
        }}
      >
        <div
          className="font-display font-extrabold"
          style={{
            fontSize: nameSize,
            lineHeight: 1.05,
            letterSpacing: -0.3,
          }}
        >
          {ad}
        </div>
        {unvan && (
          <div
            style={{
              marginTop: 4 * scale,
              paddingBottom: 4 * scale,
              fontSize: unvanSize,
              fontWeight: 600,
              color: palette.subtitle,
              borderBottom: `2px solid ${accentColor}`,
              display: "inline-block",
            }}
          >
            {unvan}
          </div>
        )}
      </div>

      {/* 3. İLETİŞİM */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8 * scale,
          flexShrink: 0,
          color: palette.primary,
        }}
      >
        {telefon && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12 * scale,
            }}
          >
            <Badge color={accentColor} size={iconBadge} text={palette.onAccent}>
              <PhoneIcon size={iconInner} />
            </Badge>
            <span
              style={{
                fontSize: phoneSize,
                fontWeight: 800,
                letterSpacing: -0.3,
              }}
            >
              {telefon}
            </span>
          </div>
        )}
        {email && (
          <ContactLine
            icon={<MailIcon size={iconInner * 0.85} />}
            text={email}
            badgeSize={iconBadge * 0.78}
            fontSize={lineSize}
            accent={accentColor}
            onAccent={palette.onAccent}
          />
        )}
        {website && (
          <ContactLine
            icon={<GlobeIcon size={iconInner * 0.85} />}
            text={website}
            badgeSize={iconBadge * 0.78}
            fontSize={lineSize}
            accent={accentColor}
            onAccent={palette.onAccent}
          />
        )}
        {instagram && (
          <ContactLine
            icon={<InstaIcon size={iconInner * 0.85} />}
            text={instagram.replace(/^@/, "")}
            badgeSize={iconBadge * 0.78}
            fontSize={lineSize}
            accent={accentColor}
            onAccent={palette.onAccent}
          />
        )}
        {adres && (
          <ContactLine
            icon={<PinIcon size={iconInner * 0.85} />}
            text={adres}
            badgeSize={iconBadge * 0.78}
            fontSize={lineSize * 0.9}
            accent={accentColor}
            onAccent={palette.onAccent}
          />
        )}
      </div>
    </div>
  );
}

function Badge({
  children,
  color,
  size,
  text,
}: {
  children: React.ReactNode;
  color: string;
  size: number;
  text: string;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: 999,
        background: color,
        color: text,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

function ContactLine({
  icon,
  text,
  badgeSize,
  fontSize,
  accent,
  onAccent,
}: {
  icon: React.ReactNode;
  text: string;
  badgeSize: number;
  fontSize: number;
  accent: string;
  onAccent: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Badge color={accent} size={badgeSize} text={onAccent}>
        {icon}
      </Badge>
      <span style={{ fontSize, fontWeight: 600 }}>{text}</span>
    </div>
  );
}

function getPalette(theme: StripTheme) {
  switch (theme) {
    case "onGold":
      return {
        primary: "#0B1E3F",
        subtitle: "#0B1E3F",
        accent: "#0B1E3F",
        onAccent: "#FFD400",
        photoBg: "#FFFFFF",
        muted: "#6B7280",
      };
    case "onLight":
      return {
        primary: "#0B1E3F",
        subtitle: "#4B5563",
        accent: "#1E6FB8",
        onAccent: "#FFFFFF",
        photoBg: "#F3F5F8",
        muted: "#6B7280",
      };
    case "onDark":
    default:
      return {
        primary: "#FFFFFF",
        subtitle: "rgba(255,255,255,0.75)",
        accent: "#D4AF37",
        onAccent: "#0B1E3F",
        photoBg: "#1f2a44",
        muted: "rgba(255,255,255,0.6)",
      };
  }
}
