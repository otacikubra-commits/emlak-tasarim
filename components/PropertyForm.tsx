"use client";

import { useRef } from "react";
import {
  type IslemTuru,
  type MulkTipi,
  type PropertyData,
  OZELLIKLER,
} from "@/lib/types";
import { fileToDataUrl, formatFiyat } from "@/lib/utils";

const ISLEM_TURLERI: IslemTuru[] = ["Satılık", "Kiralık", "Devren"];
const MULK_TIPLERI: MulkTipi[] = ["Daire", "Villa", "Arsa", "Ticari"];

interface Props {
  data: PropertyData;
  onChange: (next: PropertyData) => void;
}

export function PropertyForm({ data, onChange }: Props) {
  const set = <K extends keyof PropertyData>(k: K, v: PropertyData[K]) =>
    onChange({ ...data, [k]: v });

  const toggleOzellik = (o: string) => {
    const has = data.ozellikler.includes(o);
    if (has) {
      set("ozellikler", data.ozellikler.filter((x) => x !== o));
    } else {
      if (data.ozellikler.length >= 5) return; // maks 5
      set("ozellikler", [...data.ozellikler, o]);
    }
  };

  return (
    <div className="space-y-7">
      {/* İşlem türü */}
      <Section title="1. İşlem Türü">
        <div className="grid grid-cols-3 gap-2">
          {ISLEM_TURLERI.map((t) => (
            <PillButton
              key={t}
              active={data.islemTuru === t}
              onClick={() => set("islemTuru", t)}
            >
              {t}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Mülk tipi */}
      <Section title="2. Mülk Tipi">
        <div className="grid grid-cols-4 gap-2">
          {MULK_TIPLERI.map((t) => (
            <PillButton
              key={t}
              active={data.mulkTipi === t}
              onClick={() => set("mulkTipi", t)}
            >
              {t}
            </PillButton>
          ))}
        </div>
      </Section>

      {/* Özellikler */}
      <Section
        title="3. Özellikler"
        hint={`(maks. 5 — seçili: ${data.ozellikler.length})`}
      >
        <div className="flex flex-wrap gap-2">
          {OZELLIKLER.map((o) => {
            const active = data.ozellikler.includes(o);
            const disabled = !active && data.ozellikler.length >= 5;
            return (
              <button
                key={o}
                type="button"
                disabled={disabled}
                onClick={() => toggleOzellik(o)}
                className={[
                  "px-3 py-1.5 rounded-full text-sm font-medium transition border",
                  active
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-brand/80 border-brand/15 hover:border-brand/40",
                  disabled ? "opacity-40 cursor-not-allowed" : "",
                ].join(" ")}
              >
                {o}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Başlık + Açıklama + Fiyat + Konum */}
      <Section title="4. İlan Detayları">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Başlık" full>
            <input
              type="text"
              value={data.baslik}
              onChange={(e) => set("baslik", e.target.value)}
              className={inputClass}
              placeholder="Deniz Manzaralı Lüks Daire"
            />
          </Field>
          <Field label="Fiyat (₺)">
            <input
              type="text"
              inputMode="numeric"
              value={data.fiyat}
              onChange={(e) => set("fiyat", e.target.value)}
              className={inputClass}
              placeholder="8.450.000"
            />
            <span className="text-xs text-brand/50 mt-1">
              Önizleme: {formatFiyat(data.fiyat) || "—"}
            </span>
          </Field>
          <Field label="Konum (Şehir / İlçe)">
            <input
              type="text"
              value={data.konum}
              onChange={(e) => set("konum", e.target.value)}
              className={inputClass}
              placeholder="Çeşme, İzmir"
            />
          </Field>
          <Field label="Metrekare (m²)">
            <input
              type="text"
              inputMode="numeric"
              value={data.metrekare}
              onChange={(e) => set("metrekare", e.target.value)}
              className={inputClass}
              placeholder="165"
            />
          </Field>
          <Field label="Banyo Sayısı">
            <input
              type="text"
              inputMode="numeric"
              value={data.banyoSayisi}
              onChange={(e) => set("banyoSayisi", e.target.value)}
              className={inputClass}
              placeholder="2"
            />
          </Field>
          <Field label="Açıklama (uzun olursa otomatik küçülür)" full>
            <textarea
              value={data.aciklama}
              onChange={(e) => set("aciklama", e.target.value)}
              className={`${inputClass} min-h-[88px]`}
              placeholder="Mülkün öne çıkan özellikleri..."
            />
          </Field>
          <Field label="İlan Linki (QR koda gömülecek)" full>
            <input
              type="url"
              value={data.ilanUrl}
              onChange={(e) => set("ilanUrl", e.target.value)}
              className={inputClass}
              placeholder="https://www.sahibinden.com/ilan/..."
            />
          </Field>
        </div>
      </Section>

      {/* Danışman */}
      <Section title="5. Danışman Bilgileri">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Ad Soyad">
            <input
              type="text"
              value={data.danismanAdi}
              onChange={(e) => set("danismanAdi", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Telefon">
            <input
              type="tel"
              value={data.danismanTelefon}
              onChange={(e) => set("danismanTelefon", e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Ofis Adı" full>
            <input
              type="text"
              value={data.ofisAdi}
              onChange={(e) => set("ofisAdi", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      {/* Görseller */}
      <Section title="6. Görseller">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageInput
            label="Kapak Fotoğrafı"
            value={data.kapakFoto}
            onChange={(v) => set("kapakFoto", v)}
            full
          />
          <ImageInput
            label="Logo (şeffaf PNG önerilir)"
            value={data.logo}
            onChange={(v) => set("logo", v)}
            full
          />
        </div>
        <div className="mt-4">
          <div className="text-sm font-semibold text-brand mb-2">
            Detay Fotoğrafları (en fazla 3)
          </div>
          <DetailPhotosInput
            value={data.detayFotolar}
            onChange={(v) => set("detayFotolar", v)}
          />
        </div>
      </Section>
    </div>
  );
}

/* ---------------- Yardımcılar ---------------- */

const inputClass =
  "w-full rounded-xl border border-brand/15 bg-white px-3.5 py-2.5 text-brand placeholder:text-brand/30 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 transition";

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="text-base font-bold text-brand">{title}</h3>
        {hint && <span className="text-xs text-brand/50">{hint}</span>}
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

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "px-4 py-2.5 rounded-xl font-semibold text-sm transition border",
        active
          ? "bg-brand text-white border-brand shadow-sm"
          : "bg-white text-brand/80 border-brand/15 hover:border-brand/40",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ImageInput({
  label,
  value,
  onChange,
  full,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  full?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (file?: File) => {
    if (!file) return;
    const url = await fileToDataUrl(file);
    onChange(url);
  };

  return (
    <Field label={label} full={full}>
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

function DetailPhotosInput({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const remaining = 3 - value.length;
    const toAdd = await Promise.all(
      Array.from(files).slice(0, remaining).map(fileToDataUrl)
    );
    onChange([...value, ...toAdd]);
  };

  const removeAt = (i: number) =>
    onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className="grid grid-cols-3 gap-3">
      {value.map((src, i) => (
        <div
          key={i}
          className="relative aspect-square rounded-xl overflow-hidden border border-brand/10 group"
        >
          <img src={src} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => removeAt(i)}
            className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition"
          >
            Sil
          </button>
        </div>
      ))}
      {value.length < 3 && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="aspect-square rounded-xl border-2 border-dashed border-brand/20 text-brand/60 hover:border-brand/40 hover:bg-brand/5 transition flex flex-col items-center justify-center text-sm"
        >
          <span className="text-2xl">+</span>
          <span>Foto ekle</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  );
}
