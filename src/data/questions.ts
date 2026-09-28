export type Subject =
  | "Türkçe"
  | "Matematik"
  | "Tarih"
  | "Coğrafya"
  | "Vatandaşlık"
  | "Güncel Bilgiler";
export type Question = {
  id: string;
  subject: Subject;
  topic: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
};
export const questions: Question[] = [
  {
    id: "tr1",
    subject: "Türkçe",
    topic: "Sözcükte anlam",
    text: "Aşağıdaki cümlelerin hangisinde ‘ince’ sözcüğü mecaz anlamda kullanılmıştır?",
    options: [
      "İnce bir ip kullanarak paketi bağladı.",
      "Masaya ince dilimlenmiş ekmek koydu.",
      "Bu davranışı oldukça ince bir düşüncenin ürünüydü.",
      "Üzerinde ince bir gömlek vardı.",
      "Defterin arasına ince bir kâğıt yerleştirdi.",
    ],
    answer: 2,
    explanation:
      "‘İnce düşünce’ ifadesinde ince, kalınlığın azlığını değil; nazik ve düşünceli olmayı anlatır. Bu nedenle mecaz anlam taşır.",
  },
  {
    id: "tr2",
    subject: "Türkçe",
    topic: "Yazım kuralları",
    text: "Aşağıdaki sözcüklerden hangisi yanlış yazılmıştır?",
    options: ["Birçok", "Her şey", "Hiçbir", "Birşey", "Birkaç"],
    answer: 3,
    explanation:
      "‘Şey’ sözcüğü ayrı yazılır. Doğru yazım ‘bir şey’ şeklindedir.",
  },
  {
    id: "ma1",
    subject: "Matematik",
    topic: "Yüzde problemleri",
    text: "Bir kitabın fiyatına %20 indirim yapıldığında fiyatı 160 TL oluyor. Kitabın indirimden önceki fiyatı kaç TL’dir?",
    options: ["180", "190", "200", "210", "220"],
    answer: 2,
    explanation:
      "İndirimli fiyat, ilk fiyatın %80’idir. 0,80 × x = 160 olduğundan x = 200 TL bulunur.",
  },
  {
    id: "ma2",
    subject: "Matematik",
    topic: "Sayılar",
    text: "Ardışık üç pozitif tam sayının toplamı 48’dir. Bu sayıların en büyüğü kaçtır?",
    options: ["15", "16", "17", "18", "19"],
    answer: 2,
    explanation:
      "Ortadaki sayı 48 ÷ 3 = 16’dır. Sayılar 15, 16 ve 17 olduğundan en büyük sayı 17’dir.",
  },
  {
    id: "ta1",
    subject: "Tarih",
    topic: "Millî Mücadele",
    text: "Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?",
    options: [
      "19 Mayıs 1919",
      "23 Nisan 1920",
      "30 Ağustos 1922",
      "29 Ekim 1923",
      "20 Ocak 1921",
    ],
    answer: 1,
    explanation:
      "Türkiye Büyük Millet Meclisi 23 Nisan 1920 tarihinde Ankara’da açılmıştır.",
  },
  {
    id: "ta2",
    subject: "Tarih",
    topic: "Osmanlı tarihi",
    text: "İstanbul’un fethi hangi Osmanlı padişahı döneminde gerçekleşmiştir?",
    options: [
      "I. Murad",
      "II. Bayezid",
      "I. Selim",
      "II. Mehmed",
      "I. Süleyman",
    ],
    answer: 3,
    explanation:
      "İstanbul, 1453 yılında II. Mehmed tarafından fethedilmiştir. Bu olaydan sonra Fatih unvanıyla anılmıştır.",
  },
  {
    id: "co1",
    subject: "Coğrafya",
    topic: "Türkiye’nin fiziki özellikleri",
    text: "Türkiye’nin en yüksek dağı aşağıdakilerden hangisidir?",
    options: [
      "Erciyes Dağı",
      "Kaçkar Dağı",
      "Ağrı Dağı",
      "Uludağ",
      "Süphan Dağı",
    ],
    answer: 2,
    explanation:
      "Ağrı Dağı, 5.137 metrelik yüksekliğiyle Türkiye’nin en yüksek dağıdır.",
  },
  {
    id: "co2",
    subject: "Coğrafya",
    topic: "İklim bilgisi",
    text: "Yazların sıcak ve kurak, kışların ılık ve yağışlı geçtiği iklim tipi hangisidir?",
    options: [
      "Karasal iklim",
      "Akdeniz iklimi",
      "Tundra iklimi",
      "Kutup iklimi",
      "Muson iklimi",
    ],
    answer: 1,
    explanation:
      "Akdeniz ikliminin ayırt edici özelliği yaz kuraklığı ve ılık, yağışlı kışlardır.",
  },
  {
    id: "va1",
    subject: "Vatandaşlık",
    topic: "Temel kavramlar",
    text: "Egemenliğin halka ait olduğu yönetim anlayışı aşağıdakilerden hangisiyle ifade edilir?",
    options: [
      "Mutlak monarşi",
      "Oligarşi",
      "Millî egemenlik",
      "Teokrasi",
      "Feodalite",
    ],
    answer: 2,
    explanation:
      "Millî egemenlik, devletin yönetme gücünün kaynağının millet olmasıdır.",
  },
  {
    id: "va2",
    subject: "Vatandaşlık",
    topic: "Demokrasi",
    text: "Aşağıdakilerden hangisi demokratik katılım örneğidir?",
    options: [
      "Seçimlerde oy kullanmak",
      "Farklı görüşleri yasaklamak",
      "Seçim sonuçlarını gizlemek",
      "Basını tamamen susturmak",
      "Siyasi katılımı engellemek",
    ],
    answer: 0,
    explanation:
      "Seçimlerde oy kullanmak, yurttaşların yönetimin belirlenmesine katılmasını sağlayan demokratik bir haktır.",
  },
];
export const mapQuestions = [
  {
    id: "map1",
    text: "Zeugma Antik Kenti hangi ilimizdedir?",
    answer: 27,
    explanation:
      "Zeugma Antik Kenti, Gaziantep’in Nizip ilçesinde, Fırat Nehri kıyısındadır.",
    category: "Tarih · Antik kentler",
  },
  {
    id: "map2",
    text: "Pamukkale travertenleri hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Pamukkale travertenleri Denizli’dedir. Bölge, Hierapolis Antik Kenti ile birlikte tanınır.",
    category: "Coğrafya · Doğal güzellikler",
  },
  {
    id: "map3",
    text: "Anıtkabir hangi ilimizdedir?",
    answer: 6,
    explanation: "Anıtkabir, Ankara’nın Çankaya ilçesinde yer alır.",
    category: "Tarih · Cumhuriyet",
  },
];
