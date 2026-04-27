"use client";

import { useState } from "react";
import { PropertyForm } from "@/components/PropertyForm";
import { TemplatePicker } from "@/components/TemplatePicker";
import { PreviewCanvas } from "@/components/PreviewCanvas";
import { KartvizitForm } from "@/components/kartvizit/KartvizitForm";
import { KartvizitPicker } from "@/components/kartvizit/KartvizitPicker";
import { KartvizitPreview } from "@/components/kartvizit/KartvizitPreview";
import {
  DEFAULT_PROPERTY,
  type PropertyData,
  type TemplateId,
} from "@/lib/types";
import {
  DEFAULT_KARTVIZIT,
  type KartvizitData,
  type KartvizitTemplateId,
} from "@/lib/kartvizit-types";

type Mode = "sosyal" | "kartvizit";

export default function HomePage() {
  // Her sekmenin kendi state'i — sekme değiştirince veri kaybolmaz.
  const [mode, setMode] = useState<Mode>("sosyal");

  // Sosyal medya state
  const [data, setData] = useState<PropertyData>(DEFAULT_PROPERTY);
  const [templateId, setTemplateId] = useState<TemplateId>("yeni-portfoy");

  // Kartvizit state
  const [kartData, setKartData] = useState<KartvizitData>(DEFAULT_KARTVIZIT);
  const [kartTemplateId, setKartTemplateId] =
    useState<KartvizitTemplateId>("minimal");

  return (
    <main className="mx-auto max-w-[1400px] px-6 py-8">
      <Header />

      <ModeTabs mode={mode} onChange={setMode} />

      {mode === "sosyal" ? (
        <>
          <section className="mb-6">
            <SectionTitle
              step="A"
              title="Şablonu seçin"
              subtitle="Postu, story'yi veya bilgi kartını tek tıkla değiştirin."
            />
            <TemplatePicker value={templateId} onChange={setTemplateId} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8">
            <section className="bg-white rounded-3xl shadow-card p-6 lg:p-8 border border-brand/5">
              <SectionTitle
                step="B"
                title="İlan bilgilerini doldurun"
                subtitle="Form değiştikçe sağdaki tasarım anında güncellenir."
              />
              <PropertyForm data={data} onChange={setData} />
            </section>

            <section className="lg:sticky lg:top-6 self-start space-y-4">
              <SectionTitle
                step="C"
                title="Canlı önizleme"
                subtitle="Tam çözünürlüklü PNG çıktısını alttaki butondan indirin."
              />
              <PreviewCanvas data={data} templateId={templateId} />
            </section>
          </div>
        </>
      ) : (
        <>
          <section className="mb-6">
            <SectionTitle
              step="A"
              title="Kartvizit tarzını seçin"
              subtitle="Minimal, kurumsal veya lüks — üçü de aynı bilgilerle çalışır."
            />
            <KartvizitPicker
              value={kartTemplateId}
              onChange={setKartTemplateId}
            />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8">
            <section className="bg-white rounded-3xl shadow-card p-6 lg:p-8 border border-brand/5">
              <SectionTitle
                step="B"
                title="Kartvizit bilgilerini doldurun"
                subtitle="Ad soyad, iletişim ve isterseniz vesikalık foto."
              />
              <KartvizitForm data={kartData} onChange={setKartData} />
            </section>

            <section className="lg:sticky lg:top-6 self-start space-y-4">
              <SectionTitle
                step="C"
                title="Canlı önizleme"
                subtitle="1004×650 px (85×55 mm @ 300 dpi) — matbaa kalitesinde PNG."
              />
              <KartvizitPreview
                data={kartData}
                templateId={kartTemplateId}
              />
            </section>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}

/* --------------- Sekme çubuğu --------------- */

function ModeTabs({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  const tabs: { id: Mode; label: string; sublabel: string }[] = [
    {
      id: "sosyal",
      label: "Sosyal Medya Görseli",
      sublabel: "Post / Story / Bilgi Kartı",
    },
    {
      id: "kartvizit",
      label: "Kartvizit",
      sublabel: "85×55 mm · matbaa kalitesi",
    },
  ];

  return (
    <div className="mb-8 inline-flex rounded-2xl bg-white p-1.5 border border-brand/10 shadow-card">
      {tabs.map((t) => {
        const active = t.id === mode;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange(t.id)}
            className={[
              "rounded-xl px-5 py-2.5 text-left transition",
              active
                ? "bg-brand text-white shadow-sm"
                : "text-brand hover:bg-brand/5",
            ].join(" ")}
          >
            <div className="font-bold text-sm leading-tight">{t.label}</div>
            <div
              className={[
                "text-[11px] mt-0.5",
                active ? "text-white/70" : "text-brand/50",
              ].join(" ")}
            >
              {t.sublabel}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <Logo />
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-brand/60">
              Emlak Tasarım Stüdyosu
            </div>
            <h1 className="font-display font-extrabold text-3xl text-brand">
              30 saniyede sosyal medya görseli
            </h1>
          </div>
        </div>
      </div>
      <div className="hidden md:block text-right">
        <div className="text-xs uppercase tracking-widest text-brand/50">
          MVP — v0.2
        </div>
        <div className="text-sm text-brand/70">
          Görseli tarayıcıda render eder, hemen indirir.
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div
      className="h-12 w-12 rounded-2xl bg-brand text-brand-accent flex items-center justify-center font-display font-black text-xl shadow-card"
      aria-hidden
    >
      ET
    </div>
  );
}

function SectionTitle({
  step,
  title,
  subtitle,
}: {
  step: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-4 flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-brand text-brand-accent font-bold flex items-center justify-center text-sm shrink-0">
        {step}
      </div>
      <div>
        <h2 className="font-bold text-brand text-lg leading-tight">{title}</h2>
        <p className="text-sm text-brand/60">{subtitle}</p>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-12 text-center text-xs text-brand/40">
      © {new Date().getFullYear()} Emlak Tasarım Stüdyosu — Görseller
      tarayıcınızda üretilir, sunucuya hiçbir veri gitmez.
    </footer>
  );
}
