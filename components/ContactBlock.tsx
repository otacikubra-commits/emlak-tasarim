"use client";

import type { PropertyData } from "@/lib/types";

/**
 * Ortak iletişim bloğu — tüm şablonlarda aynı boyut hiyerarşisini kullansın
 * diye paylaşımlı bileşen.
 *
 * Boyut hiyerarşisi (kullanıcı talebiyle):
 *   - Ofis adı : 20px, uppercase, tracking geniş (küçük üst etiket)
 *   - Danışman adı : 34px, Playfair extrabold (marka imzası gibi)
 *   - Telefon : 32px, bold, letter-spacing ince (baskın, aranacak bilgi)
 */
interface ContactBlockProps {
  data: Pick<PropertyData, "ofisAdi" | "danismanAdi" | "danismanTelefon">;
  /** Metin hizalaması */
  align?: "left" | "right" | "center";
  /** Renk teması — şablonun arka planına göre */
  theme?: "onGold" | "onDark" | "onLight";
  /** Ofis adı etiketini göstermeyi tamamen kapatmak için */
  hideOfis?: boolean;
  /** Üst etiket (opsiyonel) — ör. "İletişim" */
  preLabel?: string;
}

export function ContactBlock({
  data,
  align = "right",
  theme = "onDark",
  hideOfis = false,
  preLabel,
}: ContactBlockProps) {
  const palette = getPalette(theme);
  const textAlign = align;

  return (
    <div style={{ textAlign, color: palette.primary }}>
      {preLabel && (
        <div
          className="uppercase font-semibold"
          style={{
            fontSize: 14,
            letterSpacing: "0.3em",
            color: palette.accent,
            marginBottom: 4,
          }}
        >
          {preLabel}
        </div>
      )}

      {!hideOfis && data.ofisAdi && (
        <div
          className="uppercase font-semibold"
          style={{
            fontSize: 20,
            letterSpacing: "0.2em",
            lineHeight: 1.2,
            opacity: palette.ofisOpacity,
          }}
        >
          {data.ofisAdi}
        </div>
      )}

      {data.danismanAdi && (
        <div
          className="font-display font-extrabold"
          style={{
            fontSize: 34,
            lineHeight: 1.15,
            marginTop: hideOfis || !data.ofisAdi ? 0 : 4,
          }}
        >
          {data.danismanAdi}
        </div>
      )}

      {data.danismanTelefon && (
        <div
          className="font-bold"
          style={{
            fontSize: 32,
            letterSpacing: 0.5,
            lineHeight: 1.15,
            marginTop: 2,
          }}
        >
          {data.danismanTelefon}
        </div>
      )}
    </div>
  );
}

function getPalette(theme: "onGold" | "onDark" | "onLight") {
  switch (theme) {
    case "onGold":
      return {
        primary: "#0B1E3F",
        accent: "#0B1E3F",
        ofisOpacity: 0.85,
      };
    case "onLight":
      return {
        primary: "#0B1E3F",
        accent: "#B8902B",
        ofisOpacity: 0.7,
      };
    case "onDark":
    default:
      return {
        primary: "#FFFFFF",
        accent: "#D4AF37",
        ofisOpacity: 0.85,
      };
  }
}
