"use client";

import { useRef } from "react";
import type { KartvizitData } from "@/lib/kartvizit-types";
import { fileToDataUrl } from "@/lib/utils";

interface Props {
  data: KartvizitData;
  onChange: (next: KartvizitData) => void;
}

export function KartvizitForm({ data, onChange }: Props) {
  const set = <K extends keyof KartvizitData>(k: K, v: KartvizitData[K]) =>
    onChange({ ...data, [k]: v });

  return (
    <div className="space-y-7">
      <Section title="1. Kişisel Bilgiler">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Ad Soyad">
            <input
              type="text"
              value={data.adSoyad}
              onChange={(e) => set("adSoyad", e.target.value)}
              className={inputClass}
              placeholder="Şakir Kış"
            />
          </Field>
          <Field label="Unvan">
            <input
              type="text"
              value={data.unvan}
              onChange={(e) => set("unvan", e.target.value)}
              className={inputClass}
              placeholder="Emlak Danışmanı"
            />
          </Field>
          <Field label="Ofis / Firma Adı" full>
            <input
              type="text"
              value={data.ofisAdi}
              onChange={(e) => set("ofisAdi", e.target.value)}
              className={inputClass}
              placeholder="Premium Emlak"
            />
          </Field>
        </div>
      </Section>

      <Section title="2. İletişim Bilgileri">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Telefon">
            <input
              type="tel"
              value={data.telefon}
              onChange={(e) => set("telefon", e.target.value)}
              className={inputClass}
              placeholder="+90 555 000 00 00"
            />
          </Field>
          <Field label="E-posta">
            <input
              type="email"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputClass}
              placeholder="sakir@premiumemlak.com"
            />
          </Field>
          <Field label="Website">
            <input
              type="text"
              value={data.website}
              onChange={(e) => set("website", e.target.value)}
              className={inputClass}
              placeholder="premiumemlak.com"
            />
          </Field>
          <Field label="Instagram (@ olmadan)">
            <input
              type="text"
              value={data.instagram}
              onChange={(e) =>
                set("instagram", e.target.value.replace(/^@/, ""))
              }
              className={inputClass}
              placeholder="premiumemlak"
            />
          </Field>
          <Field label="Adres" full>
            <textarea
              value={data.adres}
              onChange={(e) => set("adres", e.target.value)}
              className={`${inputClass} min-h-[64px]`}
              placeholder="Alsancak Mah. 1453 Sok. No:12 K:3 Konak / İzmir"
            />
          </Field>
          <Field label="QR Kod URL'i (boş bırakılırsa QR gösterilmez)" full>
            <input
              type="url"
              value={data.qrUrl}
              onChange={(e) => set("qrUrl", e.target.value)}
              className={inputClass}
              placeholder="https://premiumemlak.com"
            />
          </Field>
        </div>
      </Section>

      <Section title="3. Görseller">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageInput
            label="Vesikalık Fotoğraf (Kurumsal şablonunda görünür)"
            value={data.vesikalikFoto}
            onChange={(v) => set("vesikalikFoto", v)}
          />
          <ImageInput
            label="Logo (şeffaf PNG önerilir)"
            value={data.logo}
            onChange={(v) => set("logo", v)}
          />
        </div>
      </Section>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-brand placeholder:text-brand/30 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-bold text-brand">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-brand/60 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

function ImageInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    onChange(url);
  };

  return (
    <Field label={label}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex-1 rounded-xl border-2 border-dashed border-brand/20 px-4 py-3 text-sm text-brand/60 hover:border-brand/40 hover:bg-brand/5 transition text-left"
        >
          {value ? "Görseli değiştir" : "Görsel seç (PNG / JPG)"}
        </button>
        {value && (
          <>
            <img
              src={value}
              alt=""
              className="h-12 w-12 rounded-lg object-cover border border-brand/10"
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-xs font-semibold text-red-500 hover:underline"
            >
              Kaldır
            </button>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
    </Field>
  );
}
