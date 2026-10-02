import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahmatkpss.com"),
  title: {
    default: "Şahmat KPSS — 2026 KPSS Hazırlık, Çözümlü Soru Bankası ve Harita Eğitimi",
    template: "%s | Şahmat KPSS",
  },
  description:
    "KPSS hazırlığında kendi yolunu çiz. Güncel KPSS Tarih, Coğrafya, Vatandaşlık ve Genel Yetenek konu testleri, interaktif Türkiye haritaları ve soru çözümleri.",
  keywords: [
    "KPSS",
    "KPSS soru bankası",
    "KPSS 2026",
    "KPSS coğrafya harita",
    "KPSS tarih testleri",
    "KPSS vatandaşlık",
    "KPSS deneme sınavı",
    "şahmat kpss",
    "KPSS online soru çöz",
  ],
  authors: [{ name: "Şahmat KPSS" }],
  creator: "Şahmat KPSS",
  publisher: "Şahmat KPSS",
  alternates: {
    canonical: "https://sahmatkpss.com",
  },
  openGraph: {
    title: "Şahmat KPSS — Bir sonraki hamlen, geleceğin.",
    description:
      "KPSS hazırlığında kendi yolunu çiz. Konu soruları, etkileşimli Türkiye haritası ve kişisel çalışma alanın.",
    url: "https://sahmatkpss.com",
    siteName: "Şahmat KPSS",
    locale: "tr_TR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-adsense-account": "ca-pub-8252438794686125",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8252438794686125"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
