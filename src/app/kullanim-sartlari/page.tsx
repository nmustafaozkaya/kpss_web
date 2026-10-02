import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "Şahmat KPSS web sitesi ve eğitim materyalleri kullanım şartları ve yasal uyarılar.",
};

export default function KullanimSartlariPage() {
  return (
    <PageLayout
      title="Kullanım Şartları"
      subtitle="Son Güncelleme: 2 Ekim 2026"
    >
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          1. Kabul ve Kapsam
        </h2>
        <p>
          Şahmat KPSS web sitesini (<strong>sahmatkpss.com</strong>) ziyaret ederek ve kullanarak, bu sayfada yer alan kullanım şartlarını, yasal uyarıları ve kuralları peşinen kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen platformu kullanmayınız.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          2. Hizmetin Niteliği ve Eğitsel Amaç
        </h2>
        <p>
          Şahmat KPSS, Kamu Personeli Seçme Sınavı&apos;na (KPSS) hazırlanan adaylara destek olmak amacıyla hazırlanmış bağımsız bir dijital eğitim ve soru çözme aracıdır. Platform üzerindeki sorular, harita testleri ve açıklamalar bilgilendirme ve sınava hazırlık amacı taşır.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          3. Fikri Mülkiyet Hakları
        </h2>
        <p>
          Web sitesinde bulunan tasarım ögeleri, yazılımlar, interaktif harita bileşenleri, veri derlemeleri ve grafikler Şahmat KPSS&apos;ye aittir veya lisanslı olarak kullanılmaktadır. İzinsiz kopyalanamaz, çoğaltılamaz veya ticari amaçla otomatik botlar vasıtasıyla kazınamaz (scraping yapılamaz).
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          4. Sorumluluk Reddi
        </h2>
        <p>
          Soruların doğruluğu ve güncelliği için azami özen gösterilmekle birlikte; ÖSYM müfredatındaki anlık değişiklikler, yargı kararları veya mevzuat güncellemeleri sebebiyle oluşabilecek maddi hatalardan dolayı Şahmat KPSS doğrudan hukuki sorumluluk kabul etmez. Sınava hazırlanan adayların resmi ÖSYM duyurularını da takip etmesi tavsiye edilir.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          5. Değişiklik Hakkı
        </h2>
        <p>
          Şahmat KPSS, dilediği zaman kullanım koşullarını, site özelliklerini veya sunulan içerikleri önceden haber vermeksizin güncelleme hakkını saklı tutar.
        </p>
      </section>
    </PageLayout>
  );
}
