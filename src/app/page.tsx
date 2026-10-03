import KpssApp from "@/components/KpssApp";
import { questionCounts } from "@/lib/question-counts";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://sahmatkpss.com/#organization",
      name: "Şahmat KPSS",
      url: "https://sahmatkpss.com/",
    },
    {
      "@type": "WebSite",
      "@id": "https://sahmatkpss.com/#website",
      name: "Şahmat KPSS",
      url: "https://sahmatkpss.com/",
      inLanguage: "tr-TR",
      description: "KPSS konu testleri, çözümlü sorular ve etkileşimli Türkiye haritaları.",
      publisher: { "@id": "https://sahmatkpss.com/#organization" },
    },
  ],
};

export default function Home() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <KpssApp initialQuestionCounts={questionCounts} />
  </>;
}
