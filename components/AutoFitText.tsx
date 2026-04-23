"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface AutoFitTextProps {
  text: string;
  /** Maksimum (başlangıç) font-size — px cinsinden */
  maxFontSize: number;
  /** Düşülecek minimum font-size — px cinsinden */
  minFontSize: number;
  /** Tek bir adımda kaç px küçülteceğiz */
  step?: number;
  /** Tailwind sınıfları (renk, kalınlık vb.) */
  className?: string;
  /** Satır yüksekliği — kompakt veya hava açmak için */
  lineHeight?: number;
  /** Tasarımcı isteğine göre 'span' veya 'p' kullanılabilir */
  as?: "span" | "p" | "div";
  /** Metin renk vb. inline style — opsiyonel */
  style?: React.CSSProperties;
}

/**
 * Verilen kapsayıcıya sığacak şekilde font boyutunu otomatik küçültür.
 *
 * Önemli detaylar:
 * 1) İnce ölçüm için inner element'i `display: block` yapar — inline span'de
 *    tarayıcının scrollWidth/scrollHeight raporlaması tutarsız olabiliyor.
 * 2) Ölçümü 4 noktada tetikler: mount, text/size değişimi, `document.fonts.ready`
 *    (özel fontlar geç yüklendiğinde), ResizeObserver (kapsayıcı boyutu değişince).
 * 3) useLayoutEffect kullanarak tarayıcı paint etmeden önce ölçüm yapar —
 *    böylece html2canvas yakalama anında "sıçrama" olmaz.
 */
export function AutoFitText({
  text,
  maxFontSize,
  minFontSize,
  step = 2,
  className,
  lineHeight = 1.15,
  as = "span",
  style,
}: AutoFitTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLElement | null>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  // Ölçüm fonksiyonu — tek noktadan çağrılır.
  const measure = () => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    let current = maxFontSize;
    inner.style.fontSize = `${current}px`;

    // Güvenlik: max 40 iterasyon
    let guard = 40;
    while (
      guard-- > 0 &&
      current > minFontSize &&
      (inner.scrollHeight > container.clientHeight ||
        inner.scrollWidth > container.clientWidth)
    ) {
      current -= step;
      inner.style.fontSize = `${current}px`;
    }
    setFontSize(current);
  };

  // İlk render + deps değişimi
  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, maxFontSize, minFontSize, step]);

  // Fontlar yüklendikten sonra bir daha ölç (kritik — özel fontlar ilk ölçümde
  // henüz yüklenmemiş olabilir ve metin yanlış genişlik raporlar).
  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) measure();
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, maxFontSize, minFontSize]);

  // Kapsayıcı boyutu değişirse yeniden ölç (template scale değişimi,
  // pencere resize vb.).
  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inlineStyle: React.CSSProperties = {
    fontSize: `${fontSize}px`,
    lineHeight,
    display: "block",
    width: "100%",
    wordBreak: "normal",
    overflowWrap: "break-word",
    ...style,
  };

  const commonRef = (node: HTMLElement | null) => {
    innerRef.current = node;
  };

  if (as === "p") {
    return (
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden flex items-start"
      >
        <p ref={commonRef} className={className} style={inlineStyle}>
          {text}
        </p>
      </div>
    );
  }
  if (as === "div") {
    return (
      <div
        ref={containerRef}
        className="h-full w-full overflow-hidden flex items-start"
      >
        <div ref={commonRef} className={className} style={inlineStyle}>
          {text}
        </div>
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-hidden flex items-start"
    >
      <span ref={commonRef} className={className} style={inlineStyle}>
        {text}
      </span>
    </div>
  );
}
