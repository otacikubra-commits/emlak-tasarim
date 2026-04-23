# Emlak Tasarım Stüdyosu

Emlakçılar için, formu doldurup şablon seçtikten sonra **30 saniyede sosyal medya görseli** üreten Next.js + Tailwind tabanlı MVP.

## Hızlı başlangıç

```bash
npm install
npm run dev
```

Tarayıcıda http://localhost:3000

## Özellikler

- **4 hazır şablon** — Yeni Portföy Postu (1080×1080), Haftanın Fırsatı Story (1080×1920), Satıldı/Kiralandı (1080×1080), Bilgi Kartı (1080×1350)
- **Form tabanlı veri girişi** — işlem türü, mülk tipi, özellikler (maks 5), fiyat, başlık, açıklama, konum, danışman bilgileri
- **Görsel yükleme** — kapak fotoğrafı + en fazla 3 detay fotoğrafı + danışman logosu
- **QR kod entegrasyonu** — ilan URL'sine giden QR otomatik basılır
- **Harita pin'i** — konum bilgisinden küçük pin rozeti üretir
- **Otomatik font küçültme** — uzun başlık/açıklamalar tasarımı bozmaz, font otomatik küçülür
- **Canlı önizleme** — form değiştikçe sağdaki tasarım anında güncellenir
- **html2canvas ile yüksek çözünürlüklü PNG çıktısı** — sunucu gerekmez, her şey tarayıcıda

## Yapı

```
app/
  layout.tsx          # Tema, fontlar, root
  page.tsx            # 3 sütunlu ana ekran (şablon · form · önizleme)
  globals.css         # Tailwind + global stiller

components/
  PropertyForm.tsx    # Form (işlem türü, mülk tipi, özellikler, ...)
  TemplatePicker.tsx  # 4 şablon seçici kart
  PreviewCanvas.tsx   # Şablonu 1080px'te basar, scale ile gösterir, indirir
  AutoFitText.tsx     # Otomatik font küçültücü
  QrCode.tsx          # QR kod (data URL üretir)
  MapPin.tsx          # Konum pin rozeti (inline SVG)
  templates/
    NewListingPost.tsx
    WeeklyDealStory.tsx
    SoldCard.tsx
    InfoCard.tsx
    index.ts          # ID → bileşen eşlemesi

lib/
  types.ts            # PropertyData, TemplateId, sabitler
  utils.ts            # formatFiyat, fileToDataUrl, vb.
```

## Render mantığı

`PreviewCanvas` şablonu **gerçek 1080px boyutunda** DOM'a basar, `transform: scale(...)` ile ekrana sığacak şekilde ölçekler. **İndir** butonuna basıldığında geçici olarak `scale(1)` uygulanır, html2canvas tam çözünürlükte yakalar, sonra ölçek geri alınır. Bu sayede her zaman 1080×1080 / 1080×1920 / 1080×1350 piksel-mükemmel PNG dosyası elde edersiniz.

## Geliştirme yol haritası

İlk sürümde dahil değil ama kolayca eklenebilir:

- Watermark (şeffaf logo basma) — şu an logo destekleniyor, opaklık ayarı eklenebilir
- Gerçek harita (Google Static Maps / Mapbox) — şu an pin rozeti
- Şablon başına özel renk teması seçici
- PDF / JPG çıktı seçeneği (PNG'ye ek olarak)
- Kullanıcı hesabı + geçmiş ilanlar (Supabase / Firebase)
- Sunucu tarafı Puppeteer render (font hassasiyeti için)

## Lisans

Özel proje — ticari kullanım için iletişime geçin.
