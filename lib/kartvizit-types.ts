/**
 * Kartvizit ekranı için ayrı bir veri modeli — emlak ilan bilgileriyle
 * (fiyat, başlık, foto vb.) karışmasın diye kasıtlı olarak PropertyData'dan
 * bağımsız tanımlandı. Vesikalık foto, email, adres, sosyal medya gibi
 * kartvizite özgü alanlar burada yaşar.
 *
 * Boyut: Türkiye standardı 85mm x 55mm @ 300dpi → 1004 x 650 px.
 */

export const KARTVIZIT_WIDTH = 1004;
export const KARTVIZIT_HEIGHT = 650;

export type KartvizitTemplateId = "minimal" | "kurumsal" | "luks";

export interface KartvizitTemplateMeta {
  id: KartvizitTemplateId;
  name: string;
  description: string;
  /** Kısa stil etiketi — picker'da küçük chip olarak gözükür */
  style: "Minimalist" | "Kurumsal" | "Lüks";
}

export const KARTVIZIT_TEMPLATES: KartvizitTemplateMeta[] = [
  {
    id: "minimal",
    name: "Minimalist",
    description:
      "Beyaz zemin, bolca boşluk, tek renk aksan. Çağdaş ve sakin bir görünüm.",
    style: "Minimalist",
  },
  {
    id: "kurumsal",
    name: "Kurumsal",
    description:
      "Lacivert başlık bandı, düzenli grid, vesikalık foto. Ciddi ve profesyonel.",
    style: "Kurumsal",
  },
  {
    id: "luks",
    name: "Lüks",
    description:
      "Siyah zemin, altın detaylar, zarif çerçeve. Premium müşteri hissiyatı.",
    style: "Lüks",
  },
];

export interface KartvizitData {
  /** Ad Soyad — kartın odağı */
  adSoyad: string;
  /** Unvan — örn. "Emlak Danışmanı", "Satış Uzmanı" */
  unvan: string;
  /** Ofis / firma adı */
  ofisAdi: string;

  /** İletişim */
  telefon: string;
  email: string;
  website: string;
  adres: string;
  /** Instagram kullanıcı adı (başında @ olsun veya olmasın, render'da @ eklenir) */
  instagram: string;

  /** QR koda gömülecek URL — boşsa QR gösterilmez (önerilen: website veya Linktree) */
  qrUrl: string;

  /** data URL olarak saklanan görseller */
  vesikalikFoto: string | null;
  logo: string | null;
}

export const DEFAULT_KARTVIZIT: KartvizitData = {
  adSoyad: "Şakir Kış",
  unvan: "Emlak Danışmanı",
  ofisAdi: "Premium Emlak",
  telefon: "+90 555 000 00 00",
  email: "sakir@premiumemlak.com",
  website: "premiumemlak.com",
  adres: "Alsancak Mah. 1453 Sok. No:12 K:3 Konak / İzmir",
  instagram: "premiumemlak",
  qrUrl: "https://premiumemlak.com",
  vesikalikFoto: null,
  logo: null,
};
