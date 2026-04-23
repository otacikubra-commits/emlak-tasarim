"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QrCodeProps {
  value: string;
  size?: number;
  /** QR'ın arkasındaki dolgu rengi */
  bg?: string;
  /** QR çizgilerinin rengi */
  fg?: string;
  className?: string;
}

/**
 * Verilen URL'den 'qrcode' kütüphanesi ile bir data URL üretip <img /> olarak
 * döndürür. data URL kullandığımız için html2canvas onu sorunsuz yakalar.
 */
export function QrCode({
  value,
  size = 220,
  bg = "#ffffff",
  fg = "#0B1E3F",
  className,
}: QrCodeProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!value) {
      setSrc(null);
      return;
    }
    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      color: { dark: fg, light: bg },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (active) setSrc(url);
      })
      .catch(() => {
        if (active) setSrc(null);
      });
    return () => {
      active = false;
    };
  }, [value, size, bg, fg]);

  if (!src) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          background: bg,
          borderRadius: 12,
        }}
      />
    );
  }

  return (
    <img
      src={src}
      alt="İlan QR kodu"
      width={size}
      height={size}
      className={className}
      style={{ borderRadius: 12 }}
    />
  );
}
