"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { TEMPLATES, type PropertyData, type TemplateId } from "@/lib/types";
import { TEMPLATE_COMPONENTS } from "@/components/templates";

interface Props {
  data: PropertyData;
  templateId: TemplateId;
}

/**
 * Şablonu gerçek piksel boyutunda (1080x1080 / 1080x1920 vb.) DOM'a basar,
 * görsel olarak transform: scale ile küçülterek önizler. İndirme sırasında
 * scale geçici olarak 1'e alınıp html2canvas ile yakalanır → bu sayede çıktı
 * her zaman tam çözünürlüktedir.
 */
export function PreviewCanvas({ data, templateId }: Props) {
  const meta = useMemo(
    () => TEMPLATES.find((t) => t.id === templateId)!,
    [templateId]
  );
  const Template = TEMPLATE_COMPONENTS[templateId];

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.4);
  const [busy, setBusy] = useState(false);

  // Kapsayıcı genişliğine göre ölçek hesapla
  useEffect(() => {
    const update = () => {
      const w = wrapRef.current?.clientWidth ?? 0;
      if (!w) return;
      setScale(Math.min(1, w / meta.width));
    };
    update();
    const obs = new ResizeObserver(update);
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [meta.width]);

  const handleDownload = async () => {
    if (!stageRef.current || busy) return;
    setBusy(true);
    const stage = stageRef.current;
    const prevTransform = stage.style.transform;

    try {
      // İndirme sırasında 1:1 boyuta dönüştür ki html2canvas tam çözünürlükte
      // çıktı üretsin.
      stage.classList.add("is-rendering");
      stage.style.transform = "scale(1)";

      // html2canvas dinamik import — sadece ihtiyaç anında yüklenir.
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(stage, {
        width: meta.width,
        height: meta.height,
        windowWidth: meta.width,
        windowHeight: meta.height,
        scale: 1,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const filename = `emlak-${meta.id}-${Date.now()}.png`;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      stage.style.transform = prevTransform;
      stage.classList.remove("is-rendering");
      setBusy(false);
    }
  };

  // Önizleme kapsayıcısı, şablon gerçek boyutu * scale kadar yer kaplamalı.
  const previewHeight = meta.height * scale;

  return (
    <div className="space-y-4">
      <div
        ref={wrapRef}
        className="relative w-full bg-[#e7ecf5] rounded-2xl overflow-hidden border border-brand/10"
        style={{ height: previewHeight }}
      >
        <div
          ref={stageRef}
          className="template-stage absolute top-0 left-0 origin-top-left"
          style={{
            width: meta.width,
            height: meta.height,
            transform: `scale(${scale})`,
          }}
        >
          <Template data={data} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-brand/60">
          Çıktı: <span className="font-semibold">{meta.width}×{meta.height}px</span>{" "}
          · {meta.format} · PNG
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={busy}
          className={[
            "rounded-xl px-5 py-3 font-bold text-sm transition shadow-card",
            busy
              ? "bg-brand/40 text-white cursor-wait"
              : "bg-brand text-white hover:bg-[#0a1933]",
          ].join(" ")}
        >
          {busy ? "Görsel oluşturuluyor…" : "PNG olarak indir"}
        </button>
      </div>
    </div>
  );
}
