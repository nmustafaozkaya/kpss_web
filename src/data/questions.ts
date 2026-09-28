export type Subject =
  | "Türkçe"
  | "Matematik"
  | "Geometri"
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
  /* ───────────── TÜRKÇE ───────────── */
  {
    id: "tr1", subject: "Türkçe", topic: "Sözcükte Anlam",
    text: "Aşağıdaki cümlelerin hangisinde 'ince' sözcüğü mecaz anlamda kullanılmıştır?",
    options: ["İnce bir ip kullanarak paketi bağladı.", "Masaya ince dilimlenmiş ekmek koydu.", "Bu davranışı oldukça ince bir düşüncenin ürünüydü.", "Üzerinde ince bir gömlek vardı.", "Defterin arasına ince bir kâğıt yerleştirdi."],
    answer: 2, explanation: "'İnce düşünce' ifadesinde ince, kalınlığın azlığını değil; nazik ve düşünceli olmayı anlatır. Bu nedenle mecaz anlam taşır.",
  },
  {
    id: "tr2", subject: "Türkçe", topic: "Yazım Kuralları",
    text: "Aşağıdaki sözcüklerden hangisi yanlış yazılmıştır?",
    options: ["Birçok", "Her şey", "Hiçbir", "Birşey", "Birkaç"],
    answer: 3, explanation: "'Şey' sözcüğü ayrı yazılır. Doğru yazım 'bir şey' şeklindedir.",
  },
  {
    id: "tr3", subject: "Türkçe", topic: "Cümlede Anlam",
    text: "Aşağıdaki cümlelerin hangisinde öznel bir yargı vardır?",
    options: ["Ankara, Türkiye'nin başkentidir.", "Bu roman oldukça sıkıcıdır.", "Dünya, Güneş etrafında döner.", "Su 100°C'de kaynar.", "İstanbul, Boğaz kıyısındadır."],
    answer: 1, explanation: "'Sıkıcıdır' ifadesi kişiden kişiye değişen bir yargı bildirdiğinden özneldir.",
  },
  {
    id: "tr4", subject: "Türkçe", topic: "Paragrafta Anlam",
    text: "Bir paragrafta 'ana düşünce' ile en doğru tanımlanan kavram hangisidir?",
    options: ["Yazarda bıraktığı duygu", "Paragrafın başlığı", "Paragrafın tüm cümlelerini kapsayan temel yargı", "İlk cümlenin içeriği", "Yazar hakkındaki bilgiler"],
    answer: 2, explanation: "Ana düşünce, paragrafın tamamını kapsayan ve yazarın okuyucuya vermek istediği temel mesajdır.",
  },
  {
    id: "tr5", subject: "Türkçe", topic: "Sözcük Türleri",
    text: "Aşağıdaki sözcüklerden hangisi sıfattır?",
    options: ["Güzellik", "Güzelce", "Güzel", "Güzelleşmek", "Güzeli"],
    answer: 2, explanation: "'Güzel' tek başına ismi nitelediğinde sıfat görevindedir.",
  },
  {
    id: "tr6", subject: "Türkçe", topic: "Ses Bilgisi",
    text: "'Kitap + çı' sözcüğünün yazımında hangi ses olayı gerçekleşir?",
    options: ["Ünsüz yumuşaması", "Ses düşmesi", "Ünsüz benzeşmesi (sertleşme)", "Ses türemesi", "Ulama"],
    answer: 2, explanation: "Sert ünsüzle biten sözcüklere eklenen ek, sertlik uyumuna göre sertleşir: 'kitap + çı → kitapçı'.",
  },
  {
    id: "tr7", subject: "Türkçe", topic: "Cümlenin Ögeleri",
    text: "'Öğrenciler sınıfta sessizce ders çalıştı.' cümlesinde özne hangisidir?",
    options: ["sınıfta", "sessizce", "ders", "öğrenciler", "çalıştı"],
    answer: 3, explanation: "Eylemi gerçekleştiren 'öğrenciler' sözcüğü cümlenin öznesidir.",
  },
  {
    id: "tr8", subject: "Türkçe", topic: "Anlatım Bozuklukları",
    text: "Aşağıdaki cümlelerin hangisinde anlatım bozukluğu vardır?",
    options: ["Kitabı raftan alıp okudu.", "Geçen yıl bu şehre geldim.", "Toplantıya katılan herkes düşüncelerini paylaştı.", "Bu konuyu çözmekte güçlük çekti.", "Yemekleri yedi ve tatlıyı atladı."],
    answer: 3, explanation: "'Güçlük çekmek' ve '-mekte' eki birlikte kullanıldığında anlatım bozukluğu oluşur; 'çözmekte güçlük çekti' yerine 'çözmekte güçlük çekiyor' veya 'çözmekte zorlandı' kullanılmalıdır.",
  },
  {
    id: "tr9", subject: "Türkçe", topic: "Noktalama İşaretleri",
    text: "Aşağıdaki cümlelerin hangisinde virgül yanlış kullanılmıştır?",
    options: ["Ahmet, Mehmet ve Ali geldi.", "Evet, haklısın.", "Bugün hava, güzel.", "Koştu, atladı, düştü.", "Gelirse, söyle."],
    answer: 2, explanation: "'Hava' ile 'güzel' arasına virgül konulmamalıdır; özne ile yüklem arasına virgül gelmez.",
  },
  {
    id: "tr10", subject: "Türkçe", topic: "Sözel Mantık",
    text: "Tüm kediler hayvan, bazı hayvanlar evcil ise aşağıdakilerden hangisi kesinlikle doğrudur?",
    options: ["Tüm kediler evcildir.", "Bazı kediler evcildir.", "Hiçbir kedi evcil değildir.", "Bazı kediler evcil olabilir.", "Tüm evcil hayvanlar kedidir."],
    answer: 3, explanation: "Mantık kuralına göre kesinlik belirtilemez; 'bazı kediler evcil olabilir' tek çıkarılabilecek olası yargıdır.",
  },

  /* ───────────── MATEMATİK ───────────── */
  {
    id: "ma1", subject: "Matematik", topic: "Yüzde Problemleri",
    text: "Bir kitabın fiyatına %20 indirim yapıldığında fiyatı 160 TL oluyor. Kitabın indirimden önceki fiyatı kaç TL'dir?",
    options: ["180", "190", "200", "210", "220"],
    answer: 2, explanation: "İndirimli fiyat, ilk fiyatın %80'idir. 0,80 × x = 160 olduğundan x = 200 TL bulunur.",
  },
  {
    id: "ma2", subject: "Matematik", topic: "Sayılar",
    text: "Ardışık üç pozitif tam sayının toplamı 48'dir. Bu sayıların en büyüğü kaçtır?",
    options: ["15", "16", "17", "18", "19"],
    answer: 2, explanation: "Ortadaki sayı 48 ÷ 3 = 16'dır. Sayılar 15, 16 ve 17 olduğundan en büyük sayı 17'dir.",
  },
  {
    id: "ma3", subject: "Matematik", topic: "Köklü Sayılar",
    text: "√48 ifadesinin en sade hâli hangisidir?",
    options: ["4√3", "6√2", "3√4", "2√12", "8√3"],
    answer: 0, explanation: "√48 = √(16×3) = 4√3 şeklinde sadeleştirilir.",
  },
  {
    id: "ma4", subject: "Matematik", topic: "Oran - Orantı",
    text: "3 işçi bir işi 12 günde bitirirse, 4 işçi aynı işi kaç günde bitirir?",
    options: ["7", "8", "9", "10", "12"],
    answer: 2, explanation: "Ters orantı: 3×12 = 4×x → x = 9 gün.",
  },
  {
    id: "ma5", subject: "Matematik", topic: "Üslü Sayılar",
    text: "2³ × 2⁴ işleminin sonucu kaçtır?",
    options: ["2⁶", "2⁷", "4⁷", "2¹²", "4⁶"],
    answer: 1, explanation: "Aynı taban, üsler toplanır: 2³ × 2⁴ = 2⁷.",
  },
  {
    id: "ma6", subject: "Matematik", topic: "Olasılık",
    text: "Bir torbada 3 kırmızı, 2 mavi top vardır. Rastgele çekilen topun kırmızı olma olasılığı nedir?",
    options: ["1/5", "2/5", "3/5", "2/3", "1/3"],
    answer: 2, explanation: "Toplam top = 5, kırmızı = 3. Olasılık = 3/5.",
  },
  {
    id: "ma7", subject: "Matematik", topic: "Kümeler",
    text: "A = {1,2,3,4}, B = {3,4,5,6} kümelerinin kesişimi hangisidir?",
    options: ["{1,2}", "{5,6}", "{3,4}", "{1,2,5,6}", "{1,2,3,4,5,6}"],
    answer: 2, explanation: "A ∩ B, her iki kümede de bulunan elemanları içerir: {3,4}.",
  },
  {
    id: "ma8", subject: "Matematik", topic: "Denklemler",
    text: "3x + 7 = 22 denkleminin çözümü nedir?",
    options: ["3", "4", "5", "6", "7"],
    answer: 2, explanation: "3x = 22 - 7 = 15 → x = 5.",
  },

  /* ───────────── GEOMETRİ ───────────── */
  {
    id: "ge1", subject: "Geometri", topic: "Üçgende Açılar",
    text: "Bir üçgenin iki açısı 50° ve 70° ise üçüncü açı kaç derecedir?",
    options: ["50°", "55°", "60°", "65°", "70°"],
    answer: 2, explanation: "Üçgenlerin iç açıları toplamı 180°'dir. 180 - 50 - 70 = 60°.",
  },
  {
    id: "ge2", subject: "Geometri", topic: "Dörtgenler",
    text: "Tüm kenarları eşit olan dörtgen hangisidir?",
    options: ["Dikdörtgen", "Yamuk", "Paralelkenar", "Eşkenar dörtgen", "Deltoid"],
    answer: 3, explanation: "Eşkenar dörtgende dört kenar da birbirine eşittir.",
  },
  {
    id: "ge3", subject: "Geometri", topic: "Çember ve Daire",
    text: "Yarıçapı 7 cm olan dairenin alanı kaç cm²'dir? (π ≈ 3,14)",
    options: ["43,96", "153,86", "78,5", "44", "98"],
    answer: 1, explanation: "Alan = π × r² = 3,14 × 49 ≈ 153,86 cm².",
  },

  /* ───────────── TARİH ───────────── */
  {
    id: "ta1", subject: "Tarih", topic: "Kurtuluş Savaşı Hazırlık Dönemi",
    text: "Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?",
    options: ["19 Mayıs 1919", "23 Nisan 1920", "30 Ağustos 1922", "29 Ekim 1923", "20 Ocak 1921"],
    answer: 1, explanation: "Türkiye Büyük Millet Meclisi 23 Nisan 1920 tarihinde Ankara'da açılmıştır.",
  },
  {
    id: "ta2", subject: "Tarih", topic: "Osmanlı Devleti Siyasi",
    text: "İstanbul'un fethi hangi Osmanlı padişahı döneminde gerçekleşmiştir?",
    options: ["I. Murad", "II. Bayezid", "I. Selim", "II. Mehmed", "I. Süleyman"],
    answer: 3, explanation: "İstanbul, 1453 yılında II. Mehmed (Fatih) tarafından fethedilmiştir.",
  },
  {
    id: "ta3", subject: "Tarih", topic: "Atatürk İnkılapları",
    text: "Harf İnkılabı hangi yılda gerçekleştirilmiştir?",
    options: ["1923", "1924", "1928", "1932", "1934"],
    answer: 2, explanation: "Harf İnkılabı 1 Kasım 1928'de kabul edilerek Arap alfabesinin yerini Latin kökenli Türk alfabesi almıştır.",
  },
  {
    id: "ta4", subject: "Tarih", topic: "İslamiyet Öncesi Türk Tarihi",
    text: "İlk Türk devleti olarak kabul edilen devlet hangisidir?",
    options: ["Büyük Selçuklu", "Uygur", "Göktürk", "Hunlar", "Karahanlı"],
    answer: 3, explanation: "Hunlar, tarihte bilinen ilk büyük Türk devletini kurmuş topluluk olarak kabul edilmektedir.",
  },
  {
    id: "ta5", subject: "Tarih", topic: "Atatürk İlkeleri",
    text: "Cumhuriyetçilik ilkesinin özü aşağıdakilerden hangisidir?",
    options: ["Ekonomik bağımsızlık", "Halkın egemenliği", "Tekçi yapı", "Serbest piyasa", "Dini yönetim"],
    answer: 1, explanation: "Cumhuriyetçilik; egemenliğin millete ait olduğu, halkın yönetimde söz sahibi olduğu anlayışını ifade eder.",
  },
  {
    id: "ta6", subject: "Tarih", topic: "Çağdaş Türk ve Dünya Tarihi",
    text: "NATO kurulduğu yılda Türkiye üye olmuş mudur?",
    options: ["Evet, 1949'da kurucu üye olarak", "Hayır, 1952'de üye oldu", "Hayır, 1955'te üye oldu", "Evet, 1945'te kurucu üye olarak", "Türkiye NATO üyesi değildir"],
    answer: 1, explanation: "NATO 1949'da kurulmuş; Türkiye 1952 yılında İtalya, Yunanistan ve diğer ülkelerle birlikte NATO'ya dahil olmuştur.",
  },
  {
    id: "ta7", subject: "Tarih", topic: "Osmanlı Devleti Kültür ve Uygarlık",
    text: "Osmanlı Devleti'nde yönetimin temel yapısını belirleyen kanun olan 'Kanun-ı Esasi' hangi yılda ilan edilmiştir?",
    options: ["1839", "1856", "1876", "1908", "1920"],
    answer: 2, explanation: "Kanun-ı Esasi, 1876 yılında Mithat Paşa öncülüğünde ilan edilen Osmanlı'nın ilk anayasasıdır.",
  },

  /* ───────────── COĞRAFYA ───────────── */
  {
    id: "co1", subject: "Coğrafya", topic: "Türkiye'nin Fiziki Özellikleri",
    text: "Türkiye'nin en yüksek dağı aşağıdakilerden hangisidir?",
    options: ["Erciyes Dağı", "Kaçkar Dağı", "Ağrı Dağı", "Uludağ", "Süphan Dağı"],
    answer: 2, explanation: "Ağrı Dağı, 5.137 metrelik yüksekliğiyle Türkiye'nin en yüksek dağıdır.",
  },
  {
    id: "co2", subject: "Coğrafya", topic: "Türkiye'nin İklimi ve Bitki Örtüsü",
    text: "Yazların sıcak ve kurak, kışların ılık ve yağışlı geçtiği iklim tipi hangisidir?",
    options: ["Karasal iklim", "Akdeniz iklimi", "Tundra iklimi", "Kutup iklimi", "Muson iklimi"],
    answer: 1, explanation: "Akdeniz ikliminin ayırt edici özelliği yaz kuraklığı ve ılık, yağışlı kışlardır.",
  },
  {
    id: "co3", subject: "Coğrafya", topic: "Türkiye'de Nüfus ve Yerleşme",
    text: "Türkiye'nin en kalabalık şehri hangisidir?",
    options: ["Ankara", "İzmir", "İstanbul", "Bursa", "Antalya"],
    answer: 2, explanation: "İstanbul, 15 milyonu aşan nüfusuyla Türkiye'nin en kalabalık şehridir.",
  },
  {
    id: "co4", subject: "Coğrafya", topic: "Türkiye'nin Coğrafi Konumu",
    text: "Türkiye, hangi kıtalar arasında köprü konumundadır?",
    options: ["Amerika ve Avrupa", "Asya ve Afrika", "Avrupa ve Asya", "Afrika ve Asya", "Avrupa ve Amerika"],
    answer: 2, explanation: "Türkiye, Anadolu ile Avrupa kıtaları arasında köprü konumunda olup stratejik öneme sahiptir.",
  },
  {
    id: "co5", subject: "Coğrafya", topic: "Türkiye'de Madenler ve Enerji",
    text: "Türkiye'de en fazla üretilen maden hangisidir?",
    options: ["Altın", "Bor", "Demir", "Linyit kömürü", "Petrol"],
    answer: 3, explanation: "Türkiye, linyit kömürü rezervleri bakımından Avrupa'nın en zengin ülkeleri arasındadır.",
  },
  {
    id: "co6", subject: "Coğrafya", topic: "Türkiye'de Tarım",
    text: "Türkiye'de Akdeniz ikliminin hâkim olduğu kıyılarda en yaygın yetiştirilen ürün hangisidir?",
    options: ["Buğday", "Çay", "Zeytin ve narenciye", "Tütün", "Şekerpancarı"],
    answer: 2, explanation: "Akdeniz kıyılarında zeytin, turunçgiller, muz ve domates yoğun olarak yetiştirilir.",
  },

  /* ───────────── VATANDAŞLIK ───────────── */
  {
    id: "va1", subject: "Vatandaşlık", topic: "Hukukun Temel Kavramları",
    text: "Egemenliğin halka ait olduğu yönetim anlayışı aşağıdakilerden hangisiyle ifade edilir?",
    options: ["Mutlak monarşi", "Oligarşi", "Millî egemenlik", "Teokrasi", "Feodalite"],
    answer: 2, explanation: "Millî egemenlik, devletin yönetme gücünün kaynağının millet olmasıdır.",
  },
  {
    id: "va2", subject: "Vatandaşlık", topic: "Demokrasi ve Devlet Biçimleri",
    text: "Aşağıdakilerden hangisi demokratik katılım örneğidir?",
    options: ["Seçimlerde oy kullanmak", "Farklı görüşleri yasaklamak", "Seçim sonuçlarını gizlemek", "Basını tamamen susturmak", "Siyasi katılımı engellemek"],
    answer: 0, explanation: "Seçimlerde oy kullanmak, yurttaşların yönetime katılmasını sağlayan demokratik bir haktır.",
  },
  {
    id: "va3", subject: "Vatandaşlık", topic: "Yasama",
    text: "Türkiye Büyük Millet Meclisi kaç milletvekili ile oluşur?",
    options: ["450", "500", "550", "600", "650"],
    answer: 3, explanation: "2017 anayasa değişikliğiyle TBMM üye sayısı 600'e çıkarılmıştır.",
  },
  {
    id: "va4", subject: "Vatandaşlık", topic: "Yürütme",
    text: "2017 anayasa değişikliğiyle Türkiye hangi hükümet sistemine geçmiştir?",
    options: ["Parlamenter sistem", "Başkanlık sistemi", "Cumhurbaşkanlığı hükümet sistemi", "Yarı başkanlık sistemi", "Federal sistem"],
    answer: 2, explanation: "2017 referandumuyla Türkiye, Cumhurbaşkanlığı hükümet sistemine geçmiştir.",
  },
  {
    id: "va5", subject: "Vatandaşlık", topic: "Yargı",
    text: "Anayasa Mahkemesi'nin temel görevi nedir?",
    options: ["Ceza davalarına bakmak", "İdari uyuşmazlıkları çözmek", "Kanunların anayasaya uygunluğunu denetlemek", "Milletvekillerini yargılamak", "Uluslararası anlaşmazlıkları çözmek"],
    answer: 2, explanation: "Anayasa Mahkemesi, kanunların ve diğer yasal düzenlemelerin anayasaya uygunluğunu denetlemekle görevlidir.",
  },
  {
    id: "va6", subject: "Vatandaşlık", topic: "Temel Hak ve Özgürlükler",
    text: "1982 Anayasası'na göre temel haklar hangi durum dışında kısıtlanamaz?",
    options: ["Ekonomik kriz", "Seçim dönemi", "Savaş hali ve olağanüstü hal", "Referandum dönemi", "Hiçbir zaman kısıtlanamaz"],
    answer: 2, explanation: "Anayasa, olağanüstü hal ve savaş durumlarında bazı temel hakların sınırlandırılabileceğini öngörür.",
  },
];

export const mapQuestions = [
  {
    id: "map1",
    text: "Zeugma Antik Kenti hangi ilimizdedir?",
    answer: 27,
    explanation: "Zeugma Antik Kenti, Gaziantep'in Nizip ilçesinde, Fırat Nehri kıyısındadır.",
    category: "Tarih · Antik kentler",
  },
  {
    id: "map2",
    text: "Pamukkale travertenleri hangi ilimizdedir?",
    answer: 20,
    explanation: "Pamukkale travertenleri Denizli'dedir. Bölge, Hierapolis Antik Kenti ile birlikte tanınır.",
    category: "Coğrafya · Doğal güzellikler",
  },
  {
    id: "map3",
    text: "Anıtkabir hangi ilimizdedir?",
    answer: 6,
    explanation: "Anıtkabir, Ankara'nın Çankaya ilçesinde yer alır.",
    category: "Tarih · Cumhuriyet",
  },
  {
    id: "map4",
    text: "Türkiye'nin en büyük gölü olan Van Gölü hangi ilde bulunur?",
    answer: 65,
    explanation: "Van Gölü, Van iline bağlıdır ve yüzölçümüyle Türkiye'nin en büyük gölüdür.",
    category: "Coğrafya · Göller",
  },
  {
    id: "map5",
    text: "Çanakkale Savaşları'nın yaşandığı il hangisidir?",
    answer: 17,
    explanation: "Çanakkale Savaşları (1915-1916) bugünkü Çanakkale ilinde, Gelibolu Yarımadası'nda gerçekleşmiştir.",
    category: "Tarih · Kurtuluş Savaşı öncesi",
  },
];
