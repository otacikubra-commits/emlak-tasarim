export type IslemTuru = "Satılık" | "Kiralık" | "Devren";

export type MulkTipi = "Daire" | "Villa" | "Arsa" | "Ticari";

export type TemplateId =
  | "yeni-portfoy"
  | "haftanin-firsati"
  | "satildi"
  | "bilgi-karti"
  | "galeri-vitrin";

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  description: string;
  width: number;
  height: number;
  /** Sosyal medya formatı etiketi */
  format: "Post" | "Story" | "Bilgi Kartı";
}

export const TEMPLATES: TemplateMeta[] = [
  {
    id: "yeni-portfoy",
    name: "Yeni Portföy",
    description: "Şık ana fotoğraf, sağ üstte işlem bandı, altta fiyat ve özet.",
    width: 1080,
    height: 1080,
    format: "Post",
  },
  {
    id: "haftanin-firsati",
    name: "Haftanın Fırsatı",
    description: "Dinamik, aciliyet hissi veren story tasarımı.",
    width: 1080,
    height: 1920,
    format: "Story",
  },
  {
    id: "satildi",
    name: "Satıldı / Kiralandı",
    description: "Danışmanın başarısını gösteren, minimalist tebrik kartı.",
    width: 1080,
    height: 1080,
    format: "Post",
  },
  {
    id: "bilgi-karti",
    name: "Bilgi Kartı",
    description: "Mülkün tüm teknik detayları + danışman iletişim bilgileri.",
    width: 1080,
    height: 1350,
    format: "Bilgi Kartı",
  },
  {
    id: "galeri-vitrin",
    name: "Galeri Vitrin",
    description:
      "Modern carousel kapağı — başlık + fiyat kutusu + 3 foto galerisi.",
    width: 1080,
    height: 1080,
    format: "Post",
  },
];

/** Önceden tanımlı, en sık kullanılan özellikler. Maks. 5 seçilebilir. */
export const OZELLIKLER = [
  "1+1",
  "2+1",
  "3+1",
  "4+1",
  "5+1",
  "Havuzlu",
  "Bahçeli",
  "Asansörlü",
  "Otoparklı",
  "Eşyalı",
  "Krediye Uygun",
  "Deniz Manzaralı",
  "Doğa Manzaralı",
  "Sıfır Bina",
  "Site İçinde",
  "Yatırımlık",
] as const;

export type Ozellik = (typeof OZELLIKLER)[number];

export interface PropertyData {
  islemTuru: IslemTuru;
  mulkTipi: MulkTipi;
  ozellikler: string[]; // serbest metin de eklenebilsin diye string[]
  fiyat: string;
  baslik: string;
  aciklama: string;
  ilanUrl: string;
  konum: string; // ör. "Çeşme, İzmir"
  metrekare: string;
  banyoSayisi: string;
  /** Danışman bilgileri */
  danismanAdi: string;
  danismanUnvan: string;
  danismanTelefon: string;
  ofisAdi: string;
  /** data URL olarak saklanan görseller */
  kapakFoto: string | null;
  detayFotolar: string[]; // 0-3
  logo: string | null;
  danismanFoto: string | null;
}

export const DEFAULT_PROPERTY: PropertyData = {
  islemTuru: "Satılık",
  mulkTipi: "Daire",
  ozellikler: ["3+1", "Krediye Uygun", "Deniz Manzaralı"],
  fiyat: "8.450.000",
  baslik: "Deniz Manzaralı Lüks Daire",
  aciklama:
    "Çeşme'nin gözdesi sitede, full deniz manzaralı, geniş balkonlu, modern mimariye sahip 3+1 daire. Sıfır gibi, hemen taşınmaya hazır.",
  ilanUrl: "https://www.sahibinden.com/ilan/123456789",
  konum: "Çeşme, İzmir",
  metrekare: "165",
  banyoSayisi: "2",
  danismanAdi: "Şakir Kış",
  danismanUnvan: "Profesyonel Gayrimenkul Danışmanı",
  danismanTelefon: "+90 555 000 00 00",
  ofisAdi: "Premium Emlak",
  kapakFoto: null,
  detayFotolar: [],
  logo: null,
  danismanFoto: null,
};
