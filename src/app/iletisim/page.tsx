import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";
import { Mail, MessageSquare, MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim & Geri Bildirim",
  description: "Şahmat KPSS iletişim bilgileri, soru önerileri, hata bildirimi ve iş birliği talepleri.",
};

export default function IletisimPage() {
  return (
    <PageLayout
      title="İletişim & Destek"
      subtitle="Görüşleriniz, soru önerileriniz veya karşılaştığınız hatalar için bize her zaman ulaşabilirsiniz."
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", color: "var(--green)" }}>
            <Mail size={22} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>E-Posta</h3>
          </div>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "var(--muted)" }}>
            Genel sorular, soru bildirimleri ve telif hakları için:
          </p>
          <a
            href="mailto:iletisim@sahmatkpss.com"
            style={{ fontWeight: 600, color: "var(--green)", textDecoration: "none", fontSize: "0.95rem" }}
          >
            iletisim@sahmatkpss.com
          </a>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", color: "var(--green)" }}>
            <MessageSquare size={22} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>Hızlı Geri Bildirim</h3>
          </div>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "var(--muted)" }}>
            Sorularda fark ettiğiniz maddi hataları veya eklenmesini istediğiniz konuları iletebilirsiniz.
          </p>
          <span style={{ fontSize: "0.85rem", color: "var(--ink)", fontWeight: 500 }}>
            Ortalama yanıt süresi: 24 saat
          </span>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", color: "var(--green)" }}>
            <MapPin size={22} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>Konum</h3>
          </div>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--ink)" }}>
            Türkiye · Dijital Yayıncılık & KPSS Eğitim Araçları
          </p>
        </div>

        <div style={{ padding: "1.5rem", borderRadius: "12px", background: "var(--background)", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem", color: "var(--green)" }}>
            <ExternalLink size={22} />
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, margin: 0, color: "var(--ink)" }}>Geliştirici & Sosyal Medya</h3>
          </div>
          <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.9rem", color: "var(--muted)" }}>
            Projelerimizi takip etmek ve tüm sosyal ağlarımıza ulaşmak için:
          </p>
          <a
            href="https://linktr.ee/mustafaaozk"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, color: "var(--green)", textDecoration: "none", fontSize: "0.95rem" }}
          >
            linktr.ee/mustafaaozk ↗
          </a>
        </div>
      </div>

      <section style={{ borderTop: "1px solid var(--line)", paddingTop: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          Soru Katkısı ve Hata Bildirimi
        </h2>
        <p>
          Platformumuzdaki soru açıklamalarında eksiklik, şıklarda uyuşmazlık veya güncel mevzuata aykırı bir durum olduğunu düşünüyorsanız, sorunun ID numarasını veya ekran görüntüsünü e-posta adresimize iletmeniz durumunda soru komisyonumuz tarafından ivedilikle incelenip güncellenecektir.
        </p>
      </section>
    </PageLayout>
  );
}
