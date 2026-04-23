import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emlak Tasarım Stüdyosu",
  description:
    "Emlakçılar için 30 saniyede sosyal medya görseli üreten tasarım uygulaması.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
