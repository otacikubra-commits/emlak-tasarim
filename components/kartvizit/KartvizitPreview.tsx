"use client";

import { useEffect, useRef, useState } from "react";
import {
  KARTVIZIT_HEIGHT,
  KARTVIZIT_TEMPLATES,
  KARTVIZIT_WIDTH,
  type KartvizitData,
  type KartvizitTemplateId,
} from "@/lib/kartvizit-types";
import { KARTVIZIT_COMPONENTS } from "@/components/kartvizit/templates";

interface Props {
  data: KartvizitData;
  templateId: KartvizitTemplateId;
}

/**
 * Kartvizit önizleme + indirme. PreviewCanvas ile aynı mantık (gerçek boyutta
 * DOM, transform:scale ile küçük önizleme, indirirken scale(1) ile yakala) ama
 * kartvizite özgü (1004x650) boyutlarla.
 */
export function KartvizitPreview({ data, templateId }: Props) {
  const meta = KARTVIZIT_TEMPLATES.find((t) => t.id === templateId)!;
  const Template = KARTVIZIT_COMPONENTS[templateId];

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.4);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = wrapRef.current?.clientWidth ?? 0;
      if (!w) return;
      setScale(Math.min(1, w / KARTVIZIT_WIDTH));
    };
    update();
    const obs = new ResizeObserver(update);
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);

  const handleDownload = async () => {
    if (!stageRef.current || busy) return;
    setBusy(true);
    const stage = stageRef.current;
    const prevTransform = stage.style.transform;

    try {
      stage.classList.add("is-rendering");
      stage.style.transform = "scale(1)";

      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(stage, {
        width: KARTVIZIT_WIDTH,
        height: KARTVIZIT_HEIGHT,
        windowWidth: KARTVIZIT_WIDTH,
        windowHeight: KARTVIZIT_HEIGHT,
        scale: 1,
        backgroundColor: null,
        useCORS: true,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const filename = `kartvizit-${meta.id}-${Date.now()}.png`;
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

  const previewHeight = KARTVIZIT_HEIGHT * scale;

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
            width: KARTVIZIT_WIDTH,
            height: KARTVIZIT_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          <Template data={data} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-brand/60">
          Çıktı:{" "}
          <span className="font-semibold">
            {KARTVIZIT_WIDTH}×{KARTVIZIT_HEIGHT}px
          </span>{" "}
          · 85×55mm · 300dpi · PNG
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
