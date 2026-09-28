import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Şahmat KPSS — Bir sonraki hamlen, geleceğin.",
  description:
    "KPSS hazırlığında kendi yolunu çiz. Konu soruları, etkileşimli Türkiye haritası ve kişisel çalışma alanın.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
