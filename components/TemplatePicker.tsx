"use client";

import { TEMPLATES, type TemplateId } from "@/lib/types";

interface Props {
  value: TemplateId;
  onChange: (id: TemplateId) => void;
}

export function TemplatePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
      {TEMPLATES.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={[
              "text-left rounded-2xl border p-4 transition",
              active
                ? "bg-brand text-white border-brand shadow-card"
                : "bg-white text-brand border-brand/10 hover:border-brand/40",
            ].join(" ")}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest opacity-70">
                {t.format}
              </span>
              <span
                className={[
                  "text-[10px] px-2 py-0.5 rounded-full",
                  active ? "bg-white/15" : "bg-brand/5",
                ].join(" ")}
              >
                {t.width}×{t.height}
              </span>
            </div>
            <div className="font-bold text-base mt-2">{t.name}</div>
            <div
              className={[
                "text-xs mt-1 leading-snug",
                active ? "text-white/80" : "text-brand/60",
              ].join(" ")}
            >
              {t.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
