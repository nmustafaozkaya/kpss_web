import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haritalarla Coğrafya — Şahmat KPSS",
  description:
    "Türkiye haritası üzerinde göller, dağlar, ovalar, platolar, akarsular ve turizm merkezlerini keşfet ve test et.",
};

export default function HaritalarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
