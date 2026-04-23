/**
 * Bir File objesini data URL'ye çevirir. html2canvas data URL'leri sorunsuz
 * yakalayabildiği için bu yaklaşım render aşamasında CORS dertlerini ortadan
 * kaldırır.
 */
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/** Türkçe binlik ayraçlı fiyat formatı. "8450000" → "8.450.000 ₺" */
export function formatFiyat(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "");
  if (!digits) return "";
  const withSep = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withSep} ₺`;
}

/**
 * Bir konum string'inden Google Maps statik harita yerine kullanabileceğimiz
 * basit bir embed/şehir adı çıkarır. (MVP — gerçek harita ileride eklenebilir.)
 */
export function konumKisalt(konum: string): string {
  return konum.split(",")[0]?.trim() ?? konum;
}

/**
 * Şablon büyüklüğünü verilen kapsayıcı genişliğine göre ölçeklemek için
 * scale faktörü hesaplar. (transform: scale ile uygulanır.)
 */
export function fitScale(stageWidth: number, containerWidth: number): number {
  if (!stageWidth) return 1;
  return Math.min(1, containerWidth / stageWidth);
}
