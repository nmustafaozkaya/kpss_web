import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--background)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "var(--paper)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "1rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              textDecoration: "none",
              color: "var(--ink)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--green)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap size={20} />
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: "1.1rem", letterSpacing: "-0.02em" }}>Şahmat KPSS</span>
              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1 }}>
                KPSS Çalışma Platformu
              </span>
            </div>
          </Link>

          <nav style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.5rem 0.9rem",
                borderRadius: "8px",
                background: "var(--background)",
                color: "var(--ink)",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: "0.85rem",
                border: "1px solid var(--line)",
              }}
            >
              <ArrowLeft size={16} />
              Soru Bankasına Dön
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2.5rem 1.5rem" }}>
        <article
          style={{
            maxWidth: "840px",
            margin: "0 auto",
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: "16px",
            padding: "2.5rem 2rem",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
        >
          <header style={{ borderBottom: "1px solid var(--line)", paddingBottom: "1.5rem", marginBottom: "2rem" }}>
            <span
              style={{
                display: "inline-block",
                padding: "0.25rem 0.6rem",
                borderRadius: "6px",
                background: "rgba(49, 90, 72, 0.08)",
                color: "var(--green)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                marginBottom: "0.75rem",
              }}
            >
              ŞAHMAT KPSS BİLGİ MERKEZİ
            </span>
            <h1
              style={{
                fontSize: "2rem",
                fontWeight: 800,
                color: "var(--ink)",
                margin: "0 0 0.5rem 0",
                letterSpacing: "-0.03em",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: "var(--muted)", fontSize: "1rem", margin: 0, lineHeight: 1.5 }}>
                {subtitle}
              </p>
            )}
          </header>

          <div
            style={{
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#3a4d44",
            }}
          >
            {children}
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          background: "var(--paper)",
          padding: "2rem 1.5rem",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.85rem",
            color: "var(--muted)",
          }}
        >
          <div>
            <strong>Şahmat KPSS</strong> · Tüm hakları saklıdır &copy; {new Date().getFullYear()}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              Ana Sayfa
            </Link>
            <Link href="/haritalar" style={{ color: "inherit", textDecoration: "none" }}>
              Haritalar
            </Link>
            <Link href="/hakkimizda" style={{ color: "inherit", textDecoration: "none" }}>
              Hakkımızda
            </Link>
            <Link href="/gizlilik-politikasi" style={{ color: "inherit", textDecoration: "none" }}>
              Gizlilik Politikası
            </Link>
            <Link href="/kullanim-sartlari" style={{ color: "inherit", textDecoration: "none" }}>
              Kullanım Şartları
            </Link>
            <Link href="/iletisim" style={{ color: "inherit", textDecoration: "none" }}>
              İletişim
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
