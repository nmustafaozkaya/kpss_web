import type { Metadata } from "next";
import PageLayout from "@/components/PageLayout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası ve Çerez Aydınlatma Metni",
  description: "Şahmat KPSS gizlilik politikası, çerez (cookie) kullanımı, KVKK ve Google AdSense veri politikaları hakkında bilgilendirme.",
};

export default function GizlilikPolitikasiPage() {
  return (
    <PageLayout
      title="Gizlilik Politikası ve Çerez Aydınlatma Metni"
      subtitle="Son Güncelleme: 2 Ekim 2026"
    >
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          1. Genel Bakış
        </h2>
        <p>
          Şahmat KPSS (<strong>sahmatkpss.com</strong>) olarak, kullanıcılarımızın kişisel verilerinin güvenliğine ve
          gizliliğine büyük önem vermekteyiz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) ve
          ilgili yasal mevzuat uyarınca, veri sorumlusu sıfatıyla tarafınıza bu aydınlatma metnini sunmaktayız.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          2. Toplanan Veriler ve Kullanım Amacı
        </h2>
        <p>
          Sitemizi ziyaret ettiğinizde, deneyiminizi iyileştirmek, platform güvenliğini sağlamak ve hizmetlerimizi geliştirmek amacıyla
          aşağıdaki veriler işlenebilir:
        </p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li><strong>Hesap Bilgileri:</strong> Kayıt olmanız durumunda ad, soyad ve e-posta adresi.</li>
          <li><strong>Kullanım Verileri:</strong> Çözülen sorular, test başarı oranları ve yerel çalışma istatistikleri (tarayıcınızda veya hesabınızda saklanır).</li>
          <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı türü, işletim sistemi ve erişim saatleri gibi standart sunucu günlük (log) verileri.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          3. Google AdSense ve Reklam Çerezleri
        </h2>
        <p>
          Şahmat KPSS, sitemizde içerik sunumunu sürdürebilmek için üçüncü taraf reklam sağlayıcısı olarak <strong>Google AdSense</strong> hizmetini kullanmaktadır.
        </p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li>
            Google dahil üçüncü taraf sağlayıcılar, sitemize veya diğer web sitelerine yapılan önceki ziyaretlere dayalı olarak reklam yayınlamak için çerezleri (cookies) kullanır.
          </li>
          <li>
            Google&apos;ın reklam çerezlerini kullanması, Google ve iş ortaklarının kullanıcılarımıza sitemize ve/veya internetteki diğer sitelere yaptıkları ziyaretlere dayalı olarak reklam sunmasını sağlar.
          </li>
          <li>
            Kullanıcılar, <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", fontWeight: 600 }}>Google Reklam Ayarları</a> sayfasını ziyaret ederek kişiselleştirilmiş reklamcılığı devre dışı bırakabilirler.
          </li>
          <li>
            Dilerseniz <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={{ color: "var(--green)", fontWeight: 600 }}>aboutads.info</a> adresini ziyaret ederek üçüncü taraf sağlayıcıların çerez kullanımını engelleyebilirsiniz.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          4. Çerezlerin (Cookies) Kontrolü ve Yönetimi
        </h2>
        <p>
          Tarayıcınızın ayarlarını değiştirerek çerezlerin kullanımını istediğiniz zaman engelleyebilir veya çerez gönderildiğinde uyarı alabilirsiniz. Ancak bazı çerezlerin engellenmesi, soru bankası ve kişisel çalışma paneli gibi bazı işlevlerin tam performansla çalışmasını etkileyebilir.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>
          5. İletişim
        </h2>
        <p>
          Gizlilik politikamız veya kişisel verilerinizle ilgili her türlü soru, görüş ve hak talepleriniz için bizimle{" "}
          <a href="mailto:iletisim@sahmatkpss.com" style={{ color: "var(--green)", fontWeight: 600 }}>
            iletisim@sahmatkpss.com
          </a>{" "}
          adresi üzerinden iletişime geçebilirsiniz.
        </p>
      </section>
    </PageLayout>
  );
}
