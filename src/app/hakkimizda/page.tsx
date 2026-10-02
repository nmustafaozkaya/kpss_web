import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Hakkımızda — KPSS Hazırlığında Akılcı Hamle",
  description: "Şahmat KPSS nedir? Misyonumuz, vizyonumuz ve KPSS adayları için geliştirdiğimiz yeni nesil eğitim platformu.",
};

export default function HakkimizdaPage() {
  return (
    <PageLayout
      title="Hakkımızda"
      subtitle="KPSS hazırlığında doğru strateji, akılcı hamleler ve sürekli gelişim."
    >
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Şahmat KPSS Nedir?
        </h2>
        <p>
          <strong>Şahmat KPSS</strong>, Kamu Personeli Seçme Sınavı&apos;na (KPSS Lisans, Ön Lisans ve Ortaöğretim) hazırlanan adayların ders çalışma deneyimini modernize etmek, verimliliği artırmak ve ezber yerine kavrayarak öğrenmeyi sağlamak amacıyla kurulmuş yeni nesil bir dijital eğitim platformudur.
        </p>
        <p>
          Tıpkı bir satranç oyununda olduğu gibi, KPSS sürecinde de hedefe ulaşmak planlı, kararlı ve doğru hamleler yapmaktan geçer. Biz bu süreci adaylar için sade, odaklanmış ve erişilebilir hale getiriyoruz.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Neler Sunuyoruz?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div style={{ padding: "1.25rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--green)", margin: "0 0 0.5rem 0" }}>Zengin Soru Havuzu</h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink)" }}>
              Tarih, Coğrafya, Vatandaşlık, Güncel Bilgiler, Türkçe ve Matematik alanlarında binlerce özenle seçilmiş, çözümlü özgün KPSS sorusu.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--green)", margin: "0 0 0.5rem 0" }}>İnteraktif Türkiye Haritası</h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink)" }}>
              KPSS Coğrafya&apos;nın en belirleyici konusu olan harita bilgisini, Türkiye&apos;nin 81 ili ve coğrafi bölgeleri üzerinde görsel olarak pekiştiren harita testleri.
            </p>
          </div>
          <div style={{ padding: "1.25rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--green)", margin: "0 0 0.5rem 0" }}>Kişisel Takip ve Analiz</h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink)" }}>
              Çözdüğünüz soruların başarı oranlarını, eksik olduğunuz konuları ve günlük hedeflerinizi anlık olarak takip edebileceğiniz çalışma alanı.
            </p>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Misyonumuz ve Değerlerimiz
        </h2>
        <p>
          Amacımız; tüm KPSS adaylarına yüksek kaliteli, reklamlardan boğulmayan, hızlı, mobil uyumlu ve tamamen ücretsiz soru çözme imkanı sunmaktır. Eğitimin fırsat eşitliği ilkesine inanıyor ve adayların hayallerindeki kamu görevine atanma yolculuklarında yanlarında olmayı taahhüt ediyoruz.
        </p>
      </section>
    </PageLayout>
  );
}
