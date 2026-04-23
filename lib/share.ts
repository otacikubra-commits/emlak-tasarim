/**
 * Canvas → Blob → WhatsApp paylaşımı yardımcıları.
 *
 * Tarayıcı Web Share API'sini destekliyorsa ve dosya paylaşımına izin
 * veriyorsa doğrudan paylaşım sayfası açılır (mobilde WhatsApp seçilebilir).
 * Değilse görsel otomatik indirilir ve WhatsApp web kullanıcıya yönlendirilir
 * — kullanıcı indirilen PNG'yi manuel olarak WhatsApp'a yükler.
 */
export async function shareOnWhatsApp(
  canvas: HTMLCanvasElement,
  filename: string,
  text = "Emlak paylaşımım"
): Promise<{ mode: "share" | "fallback" }> {
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error("blob oluşturulamadı"));
    }, "image/png");
  });

  const file = new File([blob], filename, { type: "image/png" });

  // @ts-expect-error -- canShare tiplemesi eski TS lib'lerinde yok
  const canShareFiles = typeof navigator !== "undefined" && navigator.canShare
    // @ts-expect-error
    ? navigator.canShare({ files: [file] })
    : false;

  if (canShareFiles && navigator.share) {
    try {
      await navigator.share({ files: [file], text, title: filename });
      return { mode: "share" };
    } catch {
      // kullanıcı iptal etti veya engellendi → fallback'e düş
    }
  }

  // Fallback: önce PNG indir, ardından WhatsApp web'i aç
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);

  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    text + " — indirilen görseli WhatsApp'a ekleyerek gönderebilirsiniz."
  )}`;
  window.open(waUrl, "_blank", "noopener");
  return { mode: "fallback" };
}
