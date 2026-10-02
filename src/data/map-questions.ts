export type MapCategory =
  | "goller"
  | "daglar"
  | "ovalar"
  | "platolar"
  | "turizm"
  | "tarihi-yerler"
  | "akarsular"
  | "korfezler"
  | "madenler"
  | "enerji";

export type MapQuestion = {
  id: string;
  text: string;
  answer: number; // plate number
  explanation: string;
  category: MapCategory;
  categoryLabel: string;
};

export const mapCategories: {
  id: MapCategory;
  label: string;
  emoji: string;
  color: string;
  desc: string;
}[] = [
  {
    id: "goller",
    label: "Göller",
    emoji: "💧",
    color: "#3b82f6",
    desc: "Türkiye'nin önemli göllerini haritada bul.",
  },
  {
    id: "daglar",
    label: "Dağlar",
    emoji: "🏔️",
    color: "#8b5cf6",
    desc: "Sıradağlar ve dorukların yerini keşfet.",
  },
  {
    id: "ovalar",
    label: "Ovalar",
    emoji: "🌾",
    color: "#22c55e",
    desc: "Verimli ovaların hangi illerde olduğunu öğren.",
  },
  {
    id: "platolar",
    label: "Platolar",
    emoji: "🗻",
    color: "#f59e0b",
    desc: "Yüksek platoları doğru ile eşleştir.",
  },
  {
    id: "turizm",
    label: "Turizm & Tarihi Yerler",
    emoji: "🏛️",
    color: "#ef4444",
    desc: "UNESCO mirasları, kış/deniz turizmi, inanç ve kültür koridorları.",
  },
  {
    id: "akarsular",
    label: "Akarsular",
    emoji: "🌊",
    color: "#06b6d4",
    desc: "Nehirler ve ırmakların geçtiği illeri işaretle.",
  },
  {
    id: "korfezler",
    label: "Körfezler & Yarımadalar",
    emoji: "⚓",
    color: "#0284c7",
    desc: "Koy, körfez, tombolo ve yarımadaları haritada keşfet.",
  },
  {
    id: "madenler",
    label: "Madenler & Sanayi",
    emoji: "⛏️",
    color: "#d97706",
    desc: "Maden sahaları, tesisler ve sanayinin kurulma nedenlerini haritada bul.",
  },
  {
    id: "enerji",
    label: "Enerji Kaynakları",
    emoji: "⚡",
    color: "#eab308",
    desc: "Termik santraller, petrol rafinerileri, boru hatları ve doğal gaz havzaları.",
  },
];

export const geoMapQuestions: MapQuestion[] = [
  // ── GÖLLER — 1. TEKTONİK GÖLLER ──
  {
    id: "geo-gol-tek01",
    text: "Tektonik oluşumlu Sapanca Gölü hangi ilimizdedir?",
    answer: 54,
    explanation:
      "Sapanca Gölü, Sakarya ve Kocaeli sınırında yer alan, fay hatları üzerindeki tektonik bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek02",
    text: "Tektonik çukurlukta oluşan İznik Gölü hangi ilimizdedir?",
    answer: 16,
    explanation:
      "İznik Gölü, Bursa ilinde yer alan Marmara Bölgesi'nin en büyük doğal tatlı su gölüdür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek03",
    text: "Tektonik göl olan Ulubat Gölü hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Ulubat Gölü, Bursa ilinde yer alır; sığ bir tatlı su gölü olup Ramsar alanıdır.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek04",
    text: "Kuş Cenneti Milli Parkı'na ev sahipliği yapan Manyas (Kuş) Gölü hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Manyas (Kuş) Gölü, Balıkesir ili sınırları içinde yer alan tektonik kökenli bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek05",
    text: "Tektonik göl olan Eber Gölü hangi ilimizdedir?",
    answer: 3,
    explanation:
      "Eber Gölü, Afyonkarahisar ilinde yer alan kamışlıkları ve zengin biyoçeşitliliğiyle bilinen tektonik bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek06",
    text: "Nasreddin Hoca'nın 'ya tutarsa' diyerek maya çaldığı Akşehir Gölü hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Akşehir Gölü, Konya (ve Afyonkarahisar) sınırlarında yer alan tektonik bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek07",
    text: "Ilgın (Çavuşçu) Gölü hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Ilgın (Çavuşçu) Gölü, Konya ilinde yer alan tektonik kökenli tatlı su göllerindendir.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek08",
    text: "Türkiye'nin ikinci büyük gölü ve en tuzlu su kütlesi olan Tuz Gölü ağırlıklı olarak hangi ilimizdedir?",
    answer: 68,
    explanation:
      "Tuz Gölü; Aksaray, Konya ve Ankara sınırlarının kesiştiği tektonik çanakta yer alır, en büyük kıyısı Aksaray'dadır.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek09",
    text: "Tektonik göl ve önemli bir kuş göç alanı olan Seyfe Gölü hangi ilimizdedir?",
    answer: 40,
    explanation:
      "Seyfe Gölü, Kırşehir'in Mucur ilçesinde yer alan tektonik bir göl ve Ramsar alanıdır.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek10",
    text: "Sodyum sülfat üretimi yapılan tektonik Acıgöl hangi ilimizdedir?",
    answer: 3,
    explanation:
      "Acıgöl, Afyonkarahisar (Dazkırı) ile Denizli sınırında yer alan yüksek tuzlu tektonik bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek11",
    text: "Göller Yöresi'nin tuzlu-tektonik gölü olan Burdur Gölü hangi ilimizdedir?",
    answer: 15,
    explanation:
      "Burdur Gölü, Burdur ili sınırlarında yer alır. Dışa akışı olmayan tektonik kapalı bir havzadır.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek12",
    text: "Türkiye'nin ikinci büyük tatlı su gölü olan Eğirdir Gölü hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Eğirdir Gölü, Isparta ilinde yer alan tektonik-karstik özellikli büyük bir tatlı su gölüdür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek13",
    text: "Milli Park ilan edilen Kovada Gölü hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Kovada Gölü, Isparta ilinde yer alır. Eğirdir Gölü'nün fazla sularının aktığı karstik-tektonik bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek14",
    text: "Türkiye'nin en büyük tatlı su gölü olan Beyşehir Gölü hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Beyşehir Gölü, Konya (ve Isparta) ilinde yer alır; Türkiye'nin en büyük tatlı su gölüdür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek15",
    text: "Batık Şehir ve Hazarbaba Dağı ile bilinen tektonik Hazar Gölü hangi ilimizdedir?",
    answer: 23,
    explanation:
      "Hazar Gölü, Elazığ ilinin Sivrice ilçesinde DAF (Doğu Anadolu Fayı) zonunda yer alan tektonik göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek16",
    text: "Tektonik ve volkanik set özelliği olan Nazik Gölü hangi ilimizdedir?",
    answer: 13,
    explanation:
      "Nazik Gölü, Bitlis'in Ahlat ilçesinde yer alan göllerimizdendir.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek17",
    text: "Türkiye'nin en büyük gölü olan sodalı Van Gölü hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Van Gölü; Van ve Bitlis sınırlarında, tektonik çanağın Nemrut lavlarıyla tıkanmasıyla oluşan karma yapılı en büyük gölümüzdür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek18",
    text: "Van Gölü havzasında yer alan tuzlu-sodalı Erçek Gölü hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Erçek Gölü, Van ilinin doğusunda yer alan tektonik-volkanik set gölü ve flamingo cennetidir.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },
  {
    id: "geo-gol-tek19",
    text: "Gürcistan sınırında yer alan tektonik Aktaş (Hazapin) Gölü hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Aktaş (Hazapin) Gölü, Ardahan ilinde Türkiye ile Gürcistan sınırı üzerinde yer alan tektonik bir göldür.",
    category: "goller",
    categoryLabel: "Tektonik Göller",
  },

  // ── GÖLLER — 2. VOLKANİK GÖLLER ──
  {
    id: "geo-gol-vol01",
    text: "Dünyanın en büyük 2. krater gölü olan Nemrut Kaldera Gölü hangi ilimizdedir?",
    answer: 13,
    explanation:
      "Nemrut Gölü, Bitlis ili Tatvan ilçesinde Nemrut Dağı kalderası içinde yer alan ödüllü volkanik kaldera gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Göller",
  },
  {
    id: "geo-gol-vol02",
    text: "Volkanik göllerimizden Aygır Gölü hangi ilimizdedir?",
    answer: 36,
    explanation:
      "Aygır Gölü, Kars'ın Susuz ilçesinde volkanik arazide yer alan krater gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Göller",
  },
  {
    id: "geo-gol-vol03",
    text: "'Dünyanın nazar boncuğu' olarak bilinen maar gölü Meke Gölü hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Meke Gölü, Konya'nın Karapınar ilçesinde yer alan çift patlamalı volkanik bir maar gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Göller",
  },
  {
    id: "geo-gol-vol04",
    text: "Krater çukurluğunda oluşmuş Gölcük Krater Gölü hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Gölcük Gölü, Isparta il merkezinin güneybatısında yer alan tipik bir volkanik maar/krater gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Göller",
  },

  // ── GÖLLER — 3. KARSTİK GÖLLER ──
  {
    id: "geo-gol-kar01",
    text: "Karstik polye gölü olan Avlan Gölü hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Avlan Gölü, Antalya'nın Elmalı polyesinde yer alan karstik bir göldür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar02",
    text: "Karstik çukurlukta yer alan Elmalı Gölü hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Elmalı Gölü, Antalya ili Elmalı ilçesinde yer alan karstik bir göldür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar03",
    text: "Karstik oluşumlu Müğren Gölü hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Müğren Gölü, Antalya'nın batı kesimindeki karstik arazide yer alır.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar04",
    text: "Antalya'da karstik arazide bulunan Karagöl hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Karagöl (Antalya), kalker erimeleri sonucu oluşmuş karstik bir çukurluk gölüdür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar05",
    text: "'Türkiye'nin Maldivleri' olarak adlandırılan beyaz kumsallı Salda Gölü hangi ilimizdedir?",
    answer: 15,
    explanation:
      "Salda Gölü, Burdur'un Yeşilova ilçesinde yer alır; magnezyumlu beyaz mineralleri ve derinliğiyle meşhur tektonik-karstik göldür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar06",
    text: "Karstik polye gölü olan Kestel Gölü hangi ilimizdedir?",
    answer: 15,
    explanation:
      "Kestel Gölü, Burdur ili sınırları içinde yer alan karstik erime gölüdür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar07",
    text: "Kurak mevsimde kuruyup tarım arazisi olan karstik Suğla Gölü hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Suğla Gölü, Konya'nın Seydişehir-Beyşehir bölgesinde yer alan karstik bir polye gölüdür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar08",
    text: "Türkiye'nin en derin karstik obruklarından Kızören Obruğu hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Kızören Obruğu, Konya ilinde yer alan 145 metre derinliğinde su dolu dev karstik obruk gölüdür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar09",
    text: "Karstik çöküntü obruk gölü olan Çıralı Obruğu hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Çıralı Obruğu, Konya ilinde yer alan karstik obruk göllerimizdendir.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar10",
    text: "Karstik oluşumlu Hamam Gölü hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Hamam Gölü, Konya Ovası civarında karstik erimelerle oluşan bir göldür.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar11",
    text: "Jips erimesiyle oluşan karstik Hafik Gölü hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Hafik Gölü, Sivas ilinde jips karstı üzerinde gelişmiş karstik göllerin tipik örneğidir.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar12",
    text: "Jips karstı üzerinde oluşan Lota Gölü hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Lota Gölü, Sivas ilinde jips karstı erimeleriyle meydana gelmiş göllerimizdendir.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },
  {
    id: "geo-gol-kar13",
    text: "Sivas ilinin en büyük jips karstik gölü olan Tödürge Gölü hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Tödürge Gölü, Sivas'ın Zara ilçesinde yer alan karstik bir göl olup dalış ve su sporları yapılır.",
    category: "goller",
    categoryLabel: "Karstik Göller",
  },

  // ── GÖLLER — 4. BUZUL (SİRK) GÖLLERİ ──
  {
    id: "geo-gol-buz01",
    text: "Buzul sirk gölleri olan Kilimli, Aynalı ve Buzlu Göl hangi dağımız ve ilimizdedir?",
    answer: 16,
    explanation:
      "Bursa Uludağ'ın 2000 m üzerindeki zirvelerinde buzul aşındırmasıyla oluşan Kilimli, Aynalı, Karagöl ve Buzlu sirk gölleri yer alır.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz02",
    text: "Türkiye'nin en derin sirk gölü Büyük Deniz Gölü hangi dağ sıramız ve ilimizdedir?",
    answer: 53,
    explanation:
      "Kaçkar Dağları'nda (Rize/Artvin) 3300 m rakımda yer alan Büyük Deniz Gölü, Türkiye'nin en derin buzul (sirk) gölüdür.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz03",
    text: "Gelyana ve Mia Hani buzul sirk gölleri hangi ilimizdeki Cilo Dağları'ndadır?",
    answer: 30,
    explanation:
      "Hakkari Cilo (Buzul) Dağları zirvelerinde Türkiye'nin en büyük güncel buzulları ve Gelyana sirk gölü bulunur.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz04",
    text: "Aladağlar üzerindeki Yedigöller ve Çömçe sirk gölleri hangi ilimiz sınırındadır?",
    answer: 51,
    explanation:
      "Aladağlar Sirk Gölleri (Yedigöller, Karagöl, Çömçe), Niğde (ve Adana) sınırındaki yüksek buzul çukurluklarında yer alır.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz05",
    text: "'Mavi boncuk' adıyla bilinen Çiniligöl ve Karagöl hangi sıradağ ve ilimizdedir?",
    answer: 33,
    explanation:
      "Bolkar Dağları üzerinde (Mersin/Niğde) 2600 metrede yer alan Çiniligöl ve Karagöl ünlü sirk gölleridir.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz06",
    text: "Munzur Dağları üzerindeki Koçgölü ve Karagöl buzul gölleri hangi ilimizdedir?",
    answer: 62,
    explanation:
      "Munzur (Mercan) Dağları sirk gölleri, Tunceli il sınırları içinde yer alır.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz07",
    text: "Erciyes Dağı'ndaki sirk çanağında yer alan Deliçay Gölü hangi ilimizdedir?",
    answer: 38,
    explanation:
      "Erciyes Dağı zirve kesimindeki buzul aşınım çanağında Deliçay buzul gölü yer alır (Kayseri).",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },
  {
    id: "geo-gol-buz08",
    text: "Süphan Dağı zirve eteğindeki buzul sirk gölü Aygır Gölü hangi ilimizdedir?",
    answer: 13,
    explanation:
      "Süphan Dağı eteğinde yer alan buzul etkili Aygır Gölü, Bitlis'in Adilcevaz ilçesinde yer alır.",
    category: "goller",
    categoryLabel: "Buzul (Sirk) Gölleri",
  },

  // ── GÖLLER — 5. VOLKANİK SET GÖLLERİ ──
  {
    id: "geo-gol-vset01",
    text: "Lavların vadi önünü tıkamasıyla oluşan volkanik set gölü Haçlı Gölü hangi ilimizdedir?",
    answer: 49,
    explanation:
      "Haçlı Gölü, Muş'un Bulanık ilçesinde lav settiyle oluşan Doğu Anadolu'daki volkanik set gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Set Gölleri",
  },
  {
    id: "geo-gol-vset02",
    text: "Türkiye'nin en yüksek irtifalı volkanik set göllerinden Balık Gölü hangi ilimizdedir?",
    answer: 4,
    explanation:
      "Balık Gölü, Ağrı (Taşlıçay) ile Iğdır sınırında 2250 metre rakımda yer alan volkanik set gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Set Gölleri",
  },
  {
    id: "geo-gol-vset03",
    text: "Kışın tamamen buz tutarak atlı kızak ve Eskimo balıkçılığı yapılan Çıldır Gölü hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Çıldır Gölü, Ardahan ile Kars sınırında lavların akarsu vadisini tıkamasıyla oluşmuş lav/volkanik set gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Set Gölleri",
  },
  {
    id: "geo-gol-vset04",
    text: "Nemrut Dağı lavlarının vadiyi kapatmasıyla oluşan Nazik Gölü hangi ilimizdedir?",
    answer: 13,
    explanation:
      "Nazik Gölü, Bitlis ili sınırları içinde yer alan volkanik set kökenli göldür.",
    category: "goller",
    categoryLabel: "Volkanik Set Gölleri",
  },
  {
    id: "geo-gol-vset05",
    text: "Volkanik set gölü olan Erçek Gölü hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Erçek Gölü, Van Ovası'nın doğusunda lavların akışı engellemesiyle oluşmuş volkanik set gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Set Gölleri",
  },
  {
    id: "geo-gol-vset06",
    text: "Nemrut lavlarının Muş Ovası'na akışı kapatmasıyla büyüyen karma volkanik set gölü Van Gölü hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Van Gölü, hem tektonik çanak hem de Nemrut volkanından çıkan lavların setiyle oluşan dünyanın en büyük sodalı gölüdür.",
    category: "goller",
    categoryLabel: "Volkanik Set Gölleri",
  },

  // ── GÖLLER — 6. ALÜVYON SET GÖLLERİ ──
  {
    id: "geo-gol-aset01",
    text: "Alüvyon set gölü olan ve Caretta Carettalarla anılan Köyceğiz Gölü hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Köyceğiz Gölü, Muğla ilinde Dalaman Çayı alüvyonlarının körfezin önünü tıkamasıyla oluşan bir alüvyon set gölüdür.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },
  {
    id: "geo-gol-aset02",
    text: "Büyük Menderes deltasının alüvyonlarıyla denizden ayrılan Bafa (Çamiçi) Gölü hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Bafa (Çamiçi) Gölü, Muğla ile Aydın sınırında Latmos Dağı eteğinde yer alan eski bir Ege koyunun alüvyonla kapanmasıyla oluşmuş göldür.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },
  {
    id: "geo-gol-aset03",
    text: "Gediz Nehri'nin getirdiği alüvyonların set oluşturduğu Marmara Gölü hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Marmara Gölü, Manisa'nın Salihli ve Gölmarmara ilçeleri arasında yer alan alüvyon set gölüdür.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },
  {
    id: "geo-gol-aset04",
    text: "Sakarya Nehri'nin oluşturduğu alüvyon set gölü Akgöl hangi ilimizdedir?",
    answer: 54,
    explanation:
      "Akgöl, Sakarya'nın Karasu ilçesinde alüvyonların birikmesiyle oluşmuş kıyı gerisi alüvyon set gölüdür.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },
  {
    id: "geo-gol-aset05",
    text: "İmrahor Deresi alüvyonlarının setiyle oluşan Mogan Gölü hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Mogan Gölü, Ankara'nın Gölbaşı ilçesinde yer alan alüvyon set gölüdür.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },
  {
    id: "geo-gol-aset06",
    text: "ODTÜ arazisi sınırlarında bulunan alüvyon set gölü Eymir Gölü hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Eymir Gölü, Ankara ilinde Mogan Gölü'nün hemen kuzeyinde yer alan alüvyon set gölüdür.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },
  {
    id: "geo-gol-aset07",
    text: "Haldizen Deresi alüvyon/molozlarının oluşturduğu turistik Uzungöl hangi ilimizdedir?",
    answer: 61,
    explanation:
      "Uzungöl, Trabzon'un Çaykara ilçesinde yamaç molozları ve alüvyon setleşmesi sonucu vadi önünün kapanmasıyla oluşmuştur.",
    category: "goller",
    categoryLabel: "Alüvyon Set Gölleri",
  },

  // ── GÖLLER — 7. KIYI SET GÖLLERİ (LAGÜN / DENİZKULAĞI) ──
  {
    id: "geo-gol-kset01",
    text: "İstanbul'un içme suyu kaynağı olan kıyı set gölü Terkos (Durusu) Gölü hangi ilimizdedir?",
    answer: 34,
    explanation:
      "Terkos (Durusu) Gölü, İstanbul'un Karadeniz kıyısında kumulların koy önünü kapatmasıyla oluşan lagündür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset02",
    text: "Marmara Denizi kıyısındaki kıyı set gölü Büyükçekmece Gölü hangi ilimizdedir?",
    answer: 34,
    explanation:
      "Büyükçekmece Gölü, İstanbul'da yer alan dalgaların taşıdığı kıyı kordonunun koy önünü kapatmasıyla oluşan lagündür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset03",
    text: "Kıyı kordonuyla denizden ayrılan Küçükçekmece Lagünü hangi ilimizdedir?",
    answer: 34,
    explanation:
      "Küçükçekmece Gölü, İstanbul'un güney kıyısında yer alan kıyı set (lagün) gölüdür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset04",
    text: "Büyük Menderes Deltası'nda yer alan Karine (Dil) Lagün Gölü hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Karine (Dil) Gölü, Aydın'ın Didim-Söke kıyısında yer alan kıyı kordonu lagünüdür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset05",
    text: "Demre kıyısında koruma altındaki Beymelek Lagünü hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Beymelek Lagünü, Antalya'nın Demre ilçesinde yer alan kıyı set gölü ve balıkçılık alanıdır.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset06",
    text: "Göksu Deltası'nda yer alan Akgöl Lagünü hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Akgöl, Mersin'in Silifke ilçesindeki Göksu Deltası kıyı set gölü ve Ramsar sulak alanıdır.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset07",
    text: "Göksu Deltası kıyısındaki Paradeniz Lagünü hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Paradeniz Lagünü, Mersin ilinde Göksu Deltası üzerinde denizle irtibatlı kıyı set gölüdür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset08",
    text: "Çukurova Deltası'nda yer alan dev kıyı set gölü Akyatan Lagünü hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Akyatan Lagünü, Adana'nın Karataş ilçesinde yer alan Türkiye'nin en büyük lagün gölü ve yaban hayatı koruma sahasıdır.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset09",
    text: "Seyhan-Ceyhan deltalarında yer alan Ağyatan Lagünü hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Ağyatan Gölü, Adana'da Çukurova Deltası üzerinde yer alan kıyı set (lagün) gölüdür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset10",
    text: "Kızılırmak Deltası'ndaki Balık Gölü kıyı set lagünü hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Balık Gölü, Samsun Bafra Kızılırmak Deltası'nda yer alan kıyı set gölüdür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset11",
    text: "Kızılırmak Deltası sulak alanlarındaki Gıcı Gölü hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Gıcı Gölü, Samsun Bafra Ovası kıyı kordonu arkasında yer alan lagündür.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset12",
    text: "Kızılırmak Deltası lagünlerinden Gernek Gölü hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Gernek Gölü, Samsun ili Bafra Kızılırmak Deltası'ndaki kıyı set göllerindendir.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },
  {
    id: "geo-gol-kset13",
    text: "Kızılırmak Deltası kıyı set göllerinden Tatlı Göl hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Tatlı Göl, Samsun ilinde Bafra Kuş Cenneti lagün sisteminin bir parçasıdır.",
    category: "goller",
    categoryLabel: "Kıyı Set Gölleri (Lagün)",
  },

  // ── GÖLLER — 8. HEYELAN SET GÖLLERİ ──
  {
    id: "geo-gol-hset01",
    text: "Heyelan set gölleri topluluğu olan Yedigöller Milli Parkı hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Yedigöller (Büyükgöl, Seringöl, Deringöl, Nazlıgöl, Kurugöl, İncegöl, Sazlıgöl), Bolu ilinde heyelan sonucu oluşmuş göllerdir.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset02",
    text: "Heyelan kütlesinin vadiyi tıkamasıyla oluşan Abant Gölü hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Abant Gölü, Bolu ilinde heyelan setti ardında suların birikmesiyle oluşmuş tabiat parkıdır.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset03",
    text: "Bolu ilinde yer alan heyelan set gölü Sünnet Gölü hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Sünnet Gölü, Bolu'nun Göynük ilçesinde derin bir vadinin heyelanla kapanması sonucu oluşmuştur.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset04",
    text: "Heyelan setiyle oluşan Sülük Gölü hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Sülük Gölü, Bolu'nun Mudurnu ilçesinde deprem tetiklemeli heyelan sonucu oluşan tabiat koruma alanıdır.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset05",
    text: "Zümrüt yeşili heyelan set gölü Borabay Gölü hangi ilimizdedir?",
    answer: 5,
    explanation:
      "Borabay Gölü, Amasya'nın Taşova ilçesinde vadi önünün heyelan setiyle kapanmasıyla oluşmuş krater benzeri tabiat parkıdır.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset06",
    text: "Kelkit vadisi yakınında yer alan heyelan set gölü Zinav Gölü hangi ilimizdedir?",
    answer: 60,
    explanation:
      "Zinav Gölü, Tokat'ın Reşadiye ilçesinde heyelan birikintisinin dereyi kapatmasıyla oluşmuştur.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset07",
    text: "1950'de yamaç kopmasıyla oluşan Sera Gölü hangi ilimizdedir?",
    answer: 61,
    explanation:
      "Sera Gölü, Trabzon'un Akçaabat ilçesinde büyük bir heyelanın Sera Deresi önünü kapatmasıyla birkaç günde oluşmuştur.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },
  {
    id: "geo-gol-hset08",
    text: "Heyelan setti arkasında oluşan Tortum Gölü ve Çağlayanı hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Tortum Gölü, Erzurum'un Uzundere ilçesinde heyelan kütlesinin vadiyi kapatmasıyla oluşmuş göldür; fazlalık sular Tortum Şelalesi'ni meydana getirir.",
    category: "goller",
    categoryLabel: "Heyelan Set Gölleri",
  },

  // ── GÖLLER — 9. TRAVERTEN SET GÖLLERİ ──
  {
    id: "geo-gol-trav01",
    text: "Dünyada ve Türkiye'de nadir traverten set gölü olan Otlukbeli Gölü hangi ilimizdedir?",
    answer: 24,
    explanation:
      "Otlukbeli Gölü, Erzincan'ın Otlukbeli ilçesinde kalsiyum karbonatlı ve demirli maden sularının oluşturduğu traverten setiyle meydana gelmiş eşsiz bir doğal anıttır.",
    category: "goller",
    categoryLabel: "Traverten Set Gölleri",
  },

  // ── GÖLLER — 10. YAPAY GÖLLER (BARAJLAR) ──
  // Fırat Nehri
  {
    id: "geo-gol-bar01",
    text: "Fırat Nehri üzerinde yer alan Türkiye'nin en büyük baraj gölü Atatürk Barajı hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Atatürk Barajı, Şanlıurfa ve Adıyaman sınırlarında yer alır. Türkiye'nin ve GAP projesinin en büyük baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar02",
    text: "Fırat Nehri üzerinde kurulan Türkiye'nin ikinci büyük yapay gölü Keban Barajı hangi ilimizdedir?",
    answer: 23,
    explanation:
      "Keban Barajı, Elazığ ilinde Fırat Nehri üzerine inşa edilmiş ilk dev hidroelektrik barajımızdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar03",
    text: "Fırat Nehri üzerindeki Karakaya Barajı hangi ilimizdedir?",
    answer: 44,
    explanation:
      "Karakaya Barajı, Malatya ile Diyarbakır arasında Fırat Nehri üzerinde elektrik üretimi amaçlı kurulmuştur.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar04",
    text: "Halfeti'nin sular altında kalmasına yol açan Birecik Barajı hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Birecik Barajı, Şanlıurfa (ve Gaziantep) sınırında Fırat Nehri üzerine kurulmuş hidroelektrik barajıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Dicle Nehri
  {
    id: "geo-gol-bar05",
    text: "Dicle Nehri üzerinde kurulan dev Ilısu (Veysel Eroğlu) Barajı hangi ilimizdedir?",
    answer: 47,
    explanation:
      "Ilısu Barajı; Mardin, Batman ve Şırnak sınırlarında Dicle Nehri üzerine inşa edilmiş Türkiye'nin gövde hacmi bakımından 2. büyük barajıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar06",
    text: "Dicle Nehri kollarından Maden Çayı üzerinde yer alan Kralkızı Barajı hangi ilimizdedir?",
    answer: 21,
    explanation:
      "Kralkızı Barajı, Diyarbakır'ın Dicle ilçesinde elektrik üretimi için kurulmuştur.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar07",
    text: "Dicle Nehri havzasında sulama amaçlı kurulan Devegeçidi Barajı hangi ilimizdedir?",
    answer: 21,
    explanation:
      "Devegeçidi Barajı, Diyarbakır ilinde Devegeçidi Çayı üzerinde sulama amaçlı yapay bir baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Çoruh Nehri
  {
    id: "geo-gol-bar08",
    text: "Çoruh Nehri üzerinde çift eğrilikli beton kemer tipinde inşa edilen Deriner Barajı hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Deriner Barajı, Artvin ilinde Çoruh Nehri üzerinde yer alan yüksek kemer barajlarımızdandır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar09",
    text: "275 metre gövde yüksekliğiyle Türkiye'nin en yüksek barajı olan Yusufeli Barajı hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Yusufeli Barajı, Artvin'de Çoruh Nehri üzerinde yer alır; Türkiye'nin 1., dünyanın 5. en yüksek kemer barajıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Kızılırmak
  {
    id: "geo-gol-bar10",
    text: "Kızılırmak üzerinde yer alan dev yapay baraj gölü Hirfanlı Barajı hangi ilimizdedir?",
    answer: 40,
    explanation:
      "Hirfanlı Barajı, Kırşehir'in Kaman ilçesinde Kızılırmak üzerine inşa edilmiş İç Anadolu'nun en büyük baraj göllerindendir.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar11",
    text: "Kızılırmak üzerinde Ankara ve Kırıkkale'ye su sağlayan Kapulukaya Barajı hangi ilimizdedir?",
    answer: 71,
    explanation:
      "Kapulukaya Barajı, Kırıkkale ilinde Kızılırmak üzerinde kurulu baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar12",
    text: "Kızılırmak üzerinde hidroelektrik üreten Altınkaya Barajı hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Altınkaya Barajı, Samsun'un Bafra ve Vezirköprü ilçelerinde Kızılırmak üzerine kurulmuş dev baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar13",
    text: "Kızılırmak üzerinde Altınkaya'nın mansabında yer alan Derbent Barajı hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Derbent Barajı, Samsun'un Bafra ilçesinde Kızılırmak üzerinde sulama ve elektrik amaçlı barajdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Yeşilırmak
  {
    id: "geo-gol-bar14",
    text: "Yeşilırmak üzerinde kurulu Almus Barajı hangi ilimizdedir?",
    answer: 60,
    explanation:
      "Almus Barajı, Tokat'ın Almus ilçesinde Yeşilırmak üzerine inşa edilmiş hidroelektrik ve taşkın koruma barajıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar15",
    text: "Yeşilırmak'ın kolu Kelkit Çayı üzerinde yer alan Kılıçkaya Barajı hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Kılıçkaya Barajı, Sivas'ın Suşehri ilçesinde Kelkit Çayı üzerinde kurulu büyük bir baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar16",
    text: "Yeşilırmak üzerinde hidroelektrik üreten Hasan Uğurlu ve Suat Uğurlu Barajları hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Hasan Uğurlu ve Suat Uğurlu Barajları, Samsun'un Ayvacık ilçesinde Yeşilırmak vadisinde yer alır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Sakarya Nehri
  {
    id: "geo-gol-bar17",
    text: "Sakarya Nehri üzerinde yer alan Sarıyar (Hasan Polatkan) Barajı hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Sarıyar Barajı, Ankara'nın Nallıhan ilçesinde Sakarya Nehri üzerinde kurulmuş Türkiye'nin ilk büyük beton barajlarındandır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar18",
    text: "Sakarya Nehri üzerinde Sarıyar Barajı'nın mansabında yer alan Gökçekaya Barajı hangi ilimizdedir?",
    answer: 26,
    explanation:
      "Gökçekaya Barajı, Eskişehir'in Alpu-Mihalıççık bölgesinde Sakarya Nehri üzerine inşa edilmiş beton kemer barajdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar19",
    text: "Sakarya'nın kolu Porsuk Çayı üzerinde kurulan Porsuk Barajı hangi ilimizdedir?",
    answer: 26,
    explanation:
      "Porsuk Barajı, Eskişehir il merkezine içme suyu sağlayan ve taşkın önleyen baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Ege (Gediz ve Büyük Menderes)
  {
    id: "geo-gol-bar20",
    text: "Gediz Nehri üzerinde yer alan Demirköprü Barajı hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Demirköprü Barajı, Manisa'nın Salihli ilçesinde Gediz Nehri üzerine inşa edilmiş sulama ve enerji barajıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar21",
    text: "Büyük Menderes'in kolu üzerinde kurulan Adıgüzel Barajı hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Adıgüzel Barajı, Denizli'nin Güney ilçesinde Büyük Menderes Nehri üzerinde yer alan baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar22",
    text: "Büyük Menderes'in kolu Akçay üzerinde yer alan Kemer Barajı hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Kemer Barajı, Aydın'ın Bozdoğan ilçesinde Akçay üzerinde yer alan beton kemer barajdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // Seyhan ve Ceyhan
  {
    id: "geo-gol-bar23",
    text: "Seyhan Nehri üzerinde Adana Ovası'nı taşkınlardan koruyan Seyhan Barajı hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Seyhan Barajı, Adana il merkezinde Seyhan Nehri üzerinde yer alan toprak dolgu baraj gölüdür.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar24",
    text: "Seyhan Nehri üzerinde kurulu Çatalan Barajı hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Çatalan Barajı, Adana ilinde Seyhan Nehri üzerinde kurulmuş Türkiye'nin uzun köprülerinden Çatalan Köprüsü'ne ev sahipliği yapan barajdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar25",
    text: "Ceyhan Nehri üzerinde yer alan Menzelet ve Sır Barajları hangi ilimizdedir?",
    answer: 46,
    explanation:
      "Menzelet ve Sır Barajları, Kahramanmaraş ilinde Ceyhan Nehri üzerinde elektrik enerjisi üreten baraj gölleridir.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar26",
    text: "Ceyhan Nehri üzerinde kurulu Aslantaş ve Berke Barajları hangi ilimizdedir?",
    answer: 80,
    explanation:
      "Aslantaş ve Berke Barajları, Osmaniye ilinde Ceyhan Nehri üzerinde yer alır. Berke Barajı yüksek kemer gövdesiyle bilinir.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar27",
    text: "Manavgat Nehri üzerinde kanyon içinde yer alan Oymapınar Barajı hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Oymapınar Barajı, Antalya'nın Manavgat ilçesinde kanyon içine inşa edilmiş yüksek kemer hidroelektrik barajıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },
  {
    id: "geo-gol-bar28",
    text: "Göksu Nehri üzerinde kurulu Gezende ve Kayraktepe Barajları hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Gezende ve Kayraktepe Barajları, Mersin (Mut/Gülnar) sınırlarında Göksu Nehri üzerinde yer alan hidroelektrik barajlarıdır.",
    category: "goller",
    categoryLabel: "Yapay Göller (Barajlar)",
  },

  // ── DAĞLAR — KIVRIM DAĞLAR · KUZEY ANADOLU ──
  {
    id: "geo-dag-k01",
    text: "Kıvrım dağlarından Yıldız Dağları hangi ilimizdedir?",
    answer: 39,
    explanation:
      "Yıldız Dağları, Kırklareli ilinde yer alır. Trakya'daki en önemli kıvrım dağ silsilesidir.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k02",
    text: "Kuzey Anadolu kıvrım dağlarından Koru Dağları hangi ilimizdedir?",
    answer: 81,
    explanation:
      "Koru Dağları, Düzce ili civarında batı Karadeniz'de yer alan kıvrım dağ silsilesidir.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k03",
    text: "Kıvrım dağlarından Samanlı Dağları hangi ilimizdedir?",
    answer: 77,
    explanation:
      "Samanlı Dağları, Yalova-Sakarya hattında Güney Marmara kıyısında uzanan kıvrım dağlardır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k04",
    text: "Kuzey Anadolu kıvrım dağlarından Bolu Dağları hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Bolu Dağları, Bolu ili çevresinde yer alır. Kuzey Anadolu dağ kuşağının önemli bir halkasıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k05",
    text: "Kıvrım dağlarından Ilgaz Dağları hangi ilimizdedir?",
    answer: 18,
    explanation:
      "Ilgaz Dağları, Çankırı-Kastamonu sınırında yer alır. Kuzey Anadolu kıvrım kuşağındadır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k06",
    text: "Kıvrım dağlarından Küre (İsfendiyar) Dağları hangi ilimizdedir?",
    answer: 37,
    explanation:
      "Küre Dağları, Kastamonu-Bartın sınırında yer alır. Milli park statüsündedir. İsfendiyar Dağları olarak da bilinir.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k07",
    text: "Kuzey Anadolu kıvrım dağlarından Canik Dağları hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Canik Dağları, Samsun ilinin güneyinde yer alır. Orta Karadeniz'in kıyı sıradağlarıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k08",
    text: "Kıvrım dağlarından Giresun Dağları hangi ilimizdedir?",
    answer: 28,
    explanation:
      "Giresun Dağları, Giresun ilinde Doğu Karadeniz kıvrım kuşağının bir parçasıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k09",
    text: "Kuzey Anadolu kıvrım dağlarından Zigana Dağları hangi ilimizdedir?",
    answer: 29,
    explanation:
      "Zigana Dağları, Gümüşhane ilinde Trabzon-Gümüşhane arasında yer alır. Zigana Geçidi ile ünlüdür.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k10",
    text: "Kıvrım dağlarından Kaçkar Dağları hangi ilimizdedir?",
    answer: 53,
    explanation:
      "Kaçkar Dağları, Rize ilinde yer alır. 3.937 m ile Karadeniz Bölgesi'nin en yüksek noktasıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k11",
    text: "Kuzey Anadolu kıvrım dağlarından Yalnızçam Dağları hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Yalnızçam Dağları, Ardahan ilinde yer alır. Kuzeydoğu Anadolu'nun kıvrım kuşağına aittir.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },
  {
    id: "geo-dag-k12",
    text: "Kıvrım dağlarından Allahuekber Dağları hangi ilimizdedir?",
    answer: 36,
    explanation:
      "Allahuekber Dağları, Kars ilinde yer alır. I. Dünya Savaşı'ndaki Sarıkamış Harekâtı ile de anılır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Kuzey Anadolu",
  },

  // ── DAĞLAR — KIVRIM DAĞLAR · TOROSLAR (GÜNEY ANADOLU) ──
  {
    id: "geo-dag-k13",
    text: "Toros kıvrım dağlarından Akdağ ve Beydağları hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Akdağ ve Beydağları, Antalya ilinin batısında Batı Toroslar kuşağında yer alır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Toroslar",
  },
  {
    id: "geo-dag-k14",
    text: "Toros kıvrım dağlarından Geyik Dağları hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Geyik Dağları, Antalya'nın kuzeydoğusunda Orta Toroslar'ın batı ucunda yer alır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Toroslar",
  },
  {
    id: "geo-dag-k15",
    text: "Toros kıvrım dağlarından Bolkar Dağları ve Aladağlar hangi ilimizdedir?",
    answer: 51,
    explanation:
      "Bolkar Dağları ve Aladağlar, Niğde ili çevresinde Orta Toroslar kuşağında yer alır. Aladağlar, dağcılığın merkezidir.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Toroslar",
  },
  {
    id: "geo-dag-k16",
    text: "Toros kıvrım dağlarından Tahtalı ve Binboğa Dağları hangi ilimizdedir?",
    answer: 46,
    explanation:
      "Tahtalı ve Binboğa Dağları, Kahramanmaraş ilinde Güneydoğu Toroslar kuşağında yer alır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Toroslar",
  },
  {
    id: "geo-dag-k17",
    text: "Toros kıvrım dağlarından Malatya ve Mastar Dağları hangi ilimizdedir?",
    answer: 44,
    explanation:
      "Malatya ve Mastar Dağları, Malatya ilinde Güneydoğu Toroslar kuşağının uzantısıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Toroslar",
  },
  {
    id: "geo-dag-k18",
    text: "Toros kıvrım dağlarından Hakkâri Dağları (Cilo Dağı) hangi ilimizdedir?",
    answer: 30,
    explanation:
      "Hakkâri Dağları ve Cilo Dağı, Hakkâri ilinde Güneydoğu Toroslar'ın en doğu ucundadır. 4.135 m ile Türkiye'nin en yüksek kıvrım dağıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · Toroslar",
  },

  // ── DAĞLAR — KIVRIM DAĞLAR · İÇ BÖLGE ──
  {
    id: "geo-dag-k19",
    text: "İç bölge kıvrım dağlarından Sündiken Dağları hangi ilimizdedir?",
    answer: 26,
    explanation:
      "Sündiken Dağları, Eskişehir ilinin kuzeyinde İç Anadolu'nun kıvrım kuşağında yer alır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },
  {
    id: "geo-dag-k20",
    text: "İç bölge kıvrım dağlarından Köroğlu Dağları hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Köroğlu Dağları, Bolu ilinde yer alır. Kuzey Anadolu ile İç Anadolu arasında geçiş kuşağındadır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },
  {
    id: "geo-dag-k21",
    text: "İç bölge kıvrım dağlarından Sultan Dağları hangi ilimizdedir?",
    answer: 3,
    explanation:
      "Sultan Dağları, Afyonkarahisar ilinde İç Anadolu'nun güneybatısında yer alır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },
  {
    id: "geo-dag-k22",
    text: "İç bölge kıvrım dağlarından Barla Dağları hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Barla Dağları, Isparta ilinde Eğirdir Gölü'nün batısında yer alır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },
  {
    id: "geo-dag-k23",
    text: "İç bölge kıvrım dağlarından Hinzir ve Tecer Dağları hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Hinzir ve Tecer Dağları, Sivas ilinde İç Anadolu'nun doğusunda yer alan kıvrım dağlardır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },
  {
    id: "geo-dag-k24",
    text: "İç bölge kıvrım dağlarından Mercan Dağları hangi ilimizdedir?",
    answer: 62,
    explanation:
      "Mercan Dağları, Tunceli ilinde yer alır. Munzur Dağları ile birlikte Doğu Anadolu geçiş kuşağındadır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },
  {
    id: "geo-dag-k25",
    text: "İç bölge kıvrım dağlarından Kop Dağları hangi ilimizdedir?",
    answer: 69,
    explanation:
      "Kop Dağları, Bayburt ilinde yer alır. Kop Geçidi stratejik bir geçit noktasıdır.",
    category: "daglar",
    categoryLabel: "Kıvrım Dağlar · İç Bölge",
  },

  // ── DAĞLAR — KIRIK DAĞLAR (HORSTLAR) · EGE ──
  {
    id: "geo-dag-h01",
    text: "Kırık dağ (horst) olan Kaz Dağları hangi ilimizdedir?",
    answer: 17,
    explanation:
      "Kaz Dağları (İda Dağı), Çanakkale ilinde yer alır. Ege'nin en kuzeydeki kırık dağıdır. Mitolojide Paris'in Altın Elma hikâyesiyle bilinir.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Ege",
  },
  {
    id: "geo-dag-h02",
    text: "Kırık dağ (horst) olan Madra Dağları hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Madra Dağları, Balıkesir ilinde Ege Bölgesi'nin kuzeyinde yer alan horst yapılı dağdır.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Ege",
  },
  {
    id: "geo-dag-h03",
    text: "Kırık dağ (horst) olan Yunt Dağları hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Yunt Dağları, Manisa ilinde yer alır. Ege graben-horst sisteminin parçasıdır.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Ege",
  },
  {
    id: "geo-dag-h04",
    text: "Kırık dağ (horst) olan Bozdağlar hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Bozdağlar, İzmir'in doğusunda Gediz ve Küçük Menderes grabenleri arasında yükselen horst dağıdır.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Ege",
  },
  {
    id: "geo-dag-h05",
    text: "Kırık dağ (horst) olan Aydın Dağları hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Aydın Dağları, Aydın ilinde Küçük Menderes ile Büyük Menderes grabenleri arasındaki horstttur.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Ege",
  },
  {
    id: "geo-dag-h06",
    text: "Kırık dağ (horst) olan Menteşe Dağları hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Menteşe Dağları, Muğla ilinde Ege'nin en güneydeki kırık dağ yapısıdır.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Ege",
  },
  {
    id: "geo-dag-h07",
    text: "Akdeniz Bölgesi'ndeki istisnai kırık dağ olan Nur (Amanos) Dağları hangi ilimizdedir?",
    answer: 31,
    explanation:
      "Nur Dağları (Amanos), Hatay ilinde yer alır. Ege dışında Türkiye'deki nadir kırık dağlardan biridir.",
    category: "daglar",
    categoryLabel: "Kırık Dağlar · Akdeniz",
  },

  // ── DAĞLAR — VOLKANİK DAĞLAR · İÇ ANADOLU ──
  {
    id: "geo-dag-v01",
    text: "Volkanik dağ olan Erciyes Dağı hangi ilimizdedir?",
    answer: 38,
    explanation:
      "Erciyes Dağı, Kayseri ilinde İç Anadolu'nun en yüksek volkanik zirvesidir (3.917 m). Sönmüş bir volkanik dağdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · İç Anadolu",
  },
  {
    id: "geo-dag-v02",
    text: "Volkanik dağ olan Hasandağı hangi ilimizdedir?",
    answer: 68,
    explanation:
      "Hasandağı, Aksaray ilinde yer alan 3.268 m yüksekliğindeki sönmüş volkanik dağdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · İç Anadolu",
  },
  {
    id: "geo-dag-v03",
    text: "Volkanik dağ olan Melendiz Dağı hangi ilimizdedir?",
    answer: 51,
    explanation:
      "Melendiz Dağı, Niğde ilinde Kapadokya bölgesinde yer alan sönmüş volkanik dağdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · İç Anadolu",
  },
  {
    id: "geo-dag-v04",
    text: "İç Anadolu'daki volkanik dağ Karacadağ hangi ilimizdedir?",
    answer: 42,
    explanation:
      "İç Anadolu'daki Karacadağ, Konya ili çevresindeki sönmüş volkanik dağdır. Güneydoğu Anadolu'daki kalkan yapılı Karacadağ'dan farklıdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · İç Anadolu",
  },
  {
    id: "geo-dag-v05",
    text: "İç Anadolu'daki volkanik dağ Karadağ hangi ilimizdedir?",
    answer: 70,
    explanation:
      "Karadağ, Karaman ilinde yer alan sönmüş volkanik dağdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · İç Anadolu",
  },

  // ── DAĞLAR — VOLKANİK DAĞLAR · DOĞU ANADOLU ──
  {
    id: "geo-dag-v06",
    text: "Volkanik dağ olan Büyük Ağrı Dağı hangi ilimizdedir?",
    answer: 4,
    explanation:
      "Büyük Ağrı Dağı, Ağrı ilindedir. 5.137 m ile Türkiye'nin en yüksek noktası ve en büyük volkanik dağıdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Doğu Anadolu",
  },
  {
    id: "geo-dag-v07",
    text: "Volkanik dağ olan Süphan Dağı hangi ilimizdedir?",
    answer: 13,
    explanation:
      "Süphan Dağı, Bitlis ilinde yer alan 4.058 m yüksekliğindeki sönmüş volkanik dağdır. Van Gölü'nün kuzeyinde yükselir.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Doğu Anadolu",
  },
  {
    id: "geo-dag-v08",
    text: "Volkanik dağ olan Tendürek Dağı hangi ilimizdedir?",
    answer: 4,
    explanation:
      "Tendürek Dağı, Ağrı ilinin güneyinde Doğubayazıt yakınında yer alan sönmüş volkanik dağdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Doğu Anadolu",
  },
  {
    id: "geo-dag-v09",
    text: "Volkanik dağ olan Nemrut Dağı (Bitlis) hangi ilimizdedir?",
    answer: 13,
    explanation:
      "Nemrut Dağı, Bitlis ilinde Van Gölü'nün batısında yer alır. Zirvesinde dünyanın en büyük kaldera göllerinden biri bulunur. Adıyaman'daki Nemrut Dağı ile karıştırılmamalıdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Doğu Anadolu",
  },

  // ── DAĞLAR — VOLKANİK DAĞLAR · GÜNEYDOĞU ANADOLU ──
  {
    id: "geo-dag-v10",
    text: "Güneydoğu Anadolu'daki kalkan yapılı volkanik dağ Karacadağ hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Güneydoğu'daki Karacadağ, Şanlıurfa-Diyarbakır sınırında yer alır. Yayvan (kalkan) yapılı bir volkanik dağdır — İç Anadolu'dakinden farklıdır.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Güneydoğu Anadolu",
  },

  // ── DAĞLAR — VOLKANİK DAĞLAR · EGE ──
  {
    id: "geo-dag-v11",
    text: "Türkiye'nin en genç volkanik arazisi olan Kula Volkanları hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Kula Volkanları, Manisa'nın Kula ilçesindedir. 'Yanık Ülke' olarak da bilinir ve Türkiye'nin en genç volkanik arazisidir.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Ege",
  },

  // ── DAĞLAR — VOLKANİK DAĞLAR · MARMARA ──
  {
    id: "geo-dag-v12",
    text: "Batolit (derinlik volkanizması) örneği olan Uludağ hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Uludağ, Bursa ilindedir (2.543 m). Tam bir volkanik dağ değildir; yüzeye çıkamamış magmanın soğumasıyla oluşmuş bir batolit örneğidir.",
    category: "daglar",
    categoryLabel: "Volkanik Dağlar · Marmara",
  },



  // ── OVALAR — KARSTİK OVA (POLYEler) ──
  {
    id: "geo-ova-k01",
    text: "Karstik ova (polye) olan Korkuteli Ovası hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Korkuteli Ovası, Antalya ilinde yer alır. TAKKEM şifresiyle hatırlanan Akdeniz karstik polyelerinden biridir.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k02",
    text: "Karstik ova (polye) olan Kestel Ovası hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Kestel Ovası, Antalya ilinde yer alır. Teke-Taşeli platformunda kireç taşının çözünmesiyle oluşmuş karstik bir ovalardır.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k03",
    text: "Karstik ova (polye) olan Elmalı Ovası hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Elmalı Ovası, Antalya ilinde yer alır. TAKKEM polyelerinden biri olup elma tarımıyla tanınır.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k04",
    text: "Karstik ova (polye) olan Muğla Ovası hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Muğla Ovası, Muğla ilinin merkez ilçesinde yer alan karstik bir ovalardır. Göller Yöresi'nin batı kesimindedir.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k05",
    text: "Karstik ova (polye) olan Tavas Ovası hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Tavas Ovası, Denizli ilinde yer alır. TAKKEM şifresiyle hatırlanan Göller Yöresi çevresindeki karstik polyelerden biridir.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k06",
    text: "Karstik ova (polye) olan Acıpayam Ovası hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Acıpayam Ovası, Denizli ilinde yer alır. Kireç taşı çözünmesiyle oluşmuş karstik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k07",
    text: "Karstik ova (polye) olan Tefenni Ovası hangi ilimizdedir?",
    answer: 15,
    explanation:
      "Tefenni Ovası, Burdur ilinde yer alır. TAKKEM şifresiyle hatırlanan Göller Yöresi karstik polyelerinden biridir.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k08",
    text: "Karstik ova (polye) olan Burdur Ovası hangi ilimizdedir?",
    answer: 15,
    explanation:
      "Burdur Ovası, Burdur ilinde Burdur Gölü çevresinde yer alan karstik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k09",
    text: "Karstik ova (polye) olan Isparta Ovası hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Isparta Ovası, Isparta ilinde Göller Yöresi'nde yer alan karstik bir ovadır. Gül tarımıyla ünlüdür.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },
  {
    id: "geo-ova-k10",
    text: "Karstik ova (polye) olan Gembos Ovası hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Gembos Ovası, Antalya ilinde Teke Yarımadası'nda yer alan karstik bir ovadır. TAKKEM GİT şifresiyle hatırlanan polyelerden biridir.",
    category: "ovalar",
    categoryLabel: "Karstik Ovalar (Polyeler) · Akdeniz",
  },

  // ── OVALAR — DELTA OVASI ──
  {
    id: "geo-ova-d01",
    text: "Kızılırmak'ın oluşturduğu delta ovası olan Bafra Ovası hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Bafra Ovası, Samsun'un Bafra ilçesinde Kızılırmak'ın Karadeniz'e döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Karadeniz",
  },
  {
    id: "geo-ova-d02",
    text: "Yeşilırmak'ın oluşturduğu delta ovası olan Çarşamba Ovası hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Çarşamba Ovası, Samsun'un Çarşamba ilçesinde Yeşilırmak'ın Karadeniz'e döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Karadeniz",
  },
  {
    id: "geo-ova-d03",
    text: "Bakırçay'ın oluşturduğu delta ovası olan Dikili Ovası hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Bakırçay (Dikili) Ovası, İzmir ilinde Bakırçay'ın Ege'ye döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Ege",
  },
  {
    id: "geo-ova-d04",
    text: "Gediz Nehri'nin oluşturduğu delta ovası olan Menemen Ovası hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Gediz (Menemen) Ovası, İzmir ilinde Gediz Nehri'nin Ege'ye döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Ege",
  },
  {
    id: "geo-ova-d05",
    text: "Küçük Menderes'in oluşturduğu delta ovası olan Selçuk Ovası hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Küçük Menderes (Selçuk) Ovası, İzmir ilinde Küçük Menderes'in Ege'ye döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Ege",
  },
  {
    id: "geo-ova-d06",
    text: "Büyük Menderes'in oluşturduğu delta ovası olan Balat Ovası hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Büyük Menderes (Balat) Ovası, Aydın ilinde Büyük Menderes'in Ege'ye döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Ege",
  },
  {
    id: "geo-ova-d07",
    text: "Türkiye'nin en büyük delta ovası olan Çukurova hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Çukurova, Adana ilinde Seyhan ve Ceyhan nehirlerinin Akdeniz'e döküldüğü yerde oluşan Türkiye'nin en büyük delta ovasıdır. Pamuk ve turunçgil üretimiyle ünlüdür.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Akdeniz",
  },
  {
    id: "geo-ova-d08",
    text: "Göksu Nehri'nin oluşturduğu delta ovası olan Silifke Ovası hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Silifke Ovası, Mersin ilinde Göksu Nehri'nin Akdeniz'e döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Akdeniz",
  },
  {
    id: "geo-ova-d09",
    text: "Sakarya Nehri'nin oluşturduğu delta ovası olan Karasu Ovası hangi ilimizdedir?",
    answer: 54,
    explanation:
      "Karasu Ovası, Sakarya ilinde Sakarya Nehri'nin Karadeniz'e döküldüğü yerde oluşan delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Marmara",
  },
  {
    id: "geo-ova-d10",
    text: "Meriç Nehri'nin oluşturduğu delta ovası olan Meriç Ovası hangi ilimizdedir?",
    answer: 22,
    explanation:
      "Meriç Ovası, Edirne ilinde Meriç Nehri'nin oluşturduğu delta ovasıdır. Türkiye'nin en batısındaki delta ovasıdır.",
    category: "ovalar",
    categoryLabel: "Delta Ovaları · Marmara",
  },

  // ── OVALAR — TEKTONİK OVA (EGE GRABEN SİSTEMİ) ──
  {
    id: "geo-ova-t01",
    text: "Ege graben sistemindeki tektonik ova olan Manisa-Turgutlu-Salihli Ovası hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Manisa-Turgutlu-Akhisar-Salihli-Alaşehir ovası, Manisa ilinde Gediz Grabeni üzerinde uzanan tektonik ovalardır. Türkiye'nin önemli üzüm ve incir üretim alanlarıdır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Ege Grabenleri",
  },
  {
    id: "geo-ova-t02",
    text: "Ege graben sistemindeki tektonik ova olan Torbalı-Tire-Ödemiş Ovası hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Torbalı-Tire-Ödemiş ovası, İzmir ilinde Küçük Menderes Grabeni üzerinde yer alan tektonik ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Ege Grabenleri",
  },
  {
    id: "geo-ova-t03",
    text: "Ege graben sistemindeki tektonik ova olan Aydın-Nazilli-Söke Ovası hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Aydın-Nazilli-Söke-Sarayköy-Koçarlı ovası, Aydın ilinde Büyük Menderes Grabeni üzerinde uzanan tektonik ovadır. Pamuk ve incir üretimiyle ünlüdür.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Ege Grabenleri",
  },

  // ── OVALAR — TEKTONİK OVA (KAF — KUZEY ANADOLU FAYI) ──
  {
    id: "geo-ova-t04",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Sapanca Ovası hangi ilimizdedir?",
    answer: 54,
    explanation:
      "Sapanca Ovası, Sakarya ilinde Kuzey Anadolu Fay Hattı (KAF) üzerinde oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t05",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Adapazarı Ovası hangi ilimizdedir?",
    answer: 54,
    explanation:
      "Adapazarı Ovası, Sakarya ilinde KAF hattı boyunca oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t06",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Düzce Ovası hangi ilimizdedir?",
    answer: 81,
    explanation:
      "Düzce Ovası, Düzce ilinde KAF üzerinde oluşmuş tektonik ovadır. 1999 depremi bu fay üzerinde gerçekleşmiştir.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t07",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Bolu Ovası hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Bolu Ovası, Bolu ilinde KAF hattı boyunca oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t08",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Merzifon-Suluova Ovası hangi ilimizdedir?",
    answer: 5,
    explanation:
      "Merzifon-Suluova-Taşova ovası, Amasya ilinde KAF üzerinde oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t09",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Erbaa-Niksar Ovası hangi ilimizdedir?",
    answer: 60,
    explanation:
      "Erbaa-Niksar Ovası, Tokat ilinde Kelkit Vadisi boyunca KAF üzerinde oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t10",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Erzincan Ovası hangi ilimizdedir?",
    answer: 24,
    explanation:
      "Erzincan Ovası, Erzincan ilinde KAF ile DAF'ın kesiştiği alanda oluşmuş tektonik bir ovadır. 1939 depremiyle önemli bir tarihe sahiptir.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },
  {
    id: "geo-ova-t11",
    text: "Kuzey Anadolu Fayı üzerindeki tektonik ova olan Pasinler Ovası hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Pasinler Ovası, Erzurum ilinde KAF hattının doğu ucuna yakın oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Kuzey Anadolu Fayı",
  },

  // ── OVALAR — TEKTONİK OVA (DAF — DOĞU ANADOLU FAYI) ──
  {
    id: "geo-ova-t12",
    text: "Doğu Anadolu Fayı üzerindeki tektonik ova olan Amik Ovası hangi ilimizdedir?",
    answer: 31,
    explanation:
      "Amik Ovası, Hatay ilinde Doğu Anadolu Fay Hattı (DAF) üzerinde Asi Nehri'nin suladığı tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Doğu Anadolu Fayı",
  },
  {
    id: "geo-ova-t13",
    text: "Doğu Anadolu Fayı üzerindeki tektonik ova olan Kahramanmaraş Ovası hangi ilimizdedir?",
    answer: 46,
    explanation:
      "Kahramanmaraş Ovası, Kahramanmaraş ilinde DAF hattı üzerinde oluşmuş tektonik bir ovadır. 2023 depremi bu fay üzerinde meydana gelmiştir.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Doğu Anadolu Fayı",
  },
  {
    id: "geo-ova-t14",
    text: "Doğu Anadolu Fayı üzerindeki tektonik ova olan Malatya Ovası hangi ilimizdedir?",
    answer: 44,
    explanation:
      "Malatya Ovası, Malatya ilinde DAF hattı boyunca oluşmuş tektonik bir ovadır. Türkiye'nin en büyük kayısı üretim alanıdır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Doğu Anadolu Fayı",
  },
  {
    id: "geo-ova-t15",
    text: "Doğu Anadolu Fayı üzerindeki tektonik ova olan Elazığ Ovası hangi ilimizdedir?",
    answer: 23,
    explanation:
      "Elazığ Ovası, Elazığ ilinde DAF hattı üzerinde oluşmuş tektonik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Doğu Anadolu Fayı",
  },
  {
    id: "geo-ova-t16",
    text: "Doğu Anadolu Fayı üzerindeki tektonik ova olan Muş Ovası hangi ilimizdedir?",
    answer: 49,
    explanation:
      "Muş Ovası, Muş ilinde DAF hattı üzerinde Doğu Anadolu'nun en büyük ovalarından biridir.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Doğu Anadolu Fayı",
  },

  // ── OVALAR — TEKTONİK OVA (GÜNEYDOĞU) ──
  {
    id: "geo-ova-t17",
    text: "Güneydoğu Anadolu'daki tektonik ova olan Harran Ovası hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Harran Ovası, Şanlıurfa ilinin güneyinde çöküntü alanında oluşmuş tektonik bir ovadır. GAP Projesi ile sulamaya açılmıştır.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Güneydoğu Anadolu",
  },
  {
    id: "geo-ova-t18",
    text: "Güneydoğu Anadolu'daki tektonik ova olan Ceylanpınar Ovası hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Ceylanpınar Ovası, Şanlıurfa ilinde Güneydoğu Anadolu'nun tektonik ovaları arasındadır. Tarım arazileriyle bilinir.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Güneydoğu Anadolu",
  },

  // ── OVALAR — TEKTONİK OVA (DOĞU ANADOLU DİĞER) ──
  {
    id: "geo-ova-t19",
    text: "Mikroklima alanı oluşturan tektonik ova olan Iğdır Ovası hangi ilimizdedir?",
    answer: 76,
    explanation:
      "Iğdır Ovası, Iğdır ilinde çevresine göre alçakta kaldığı için mikroklima alanı oluşturan tektonik bir ovadır. Türkiye'nin en doğusunda pamuk ve meyve yetiştirilir.",
    category: "ovalar",
    categoryLabel: "Tektonik Ovalar · Doğu Anadolu",
  },

  // ── OVALAR — VOLKANİK OVA ──
  {
    id: "geo-ova-v01",
    text: "Volkanik ova olan Kayseri Ovası hangi ilimizdedir?",
    answer: 38,
    explanation:
      "Kayseri Ovası, Kayseri ilinde Erciyes Dağı'nın eteklerinde lav ve küllerle dolmuş volkanik bir ovadır. Mineral açısından zengin topraklara sahiptir.",
    category: "ovalar",
    categoryLabel: "Volkanik Ovalar · İç Anadolu",
  },
  {
    id: "geo-ova-v02",
    text: "Volkanik ova olan Develi Ovası hangi ilimizdedir?",
    answer: 38,
    explanation:
      "Develi Ovası, Kayseri ilinde Erciyes Dağı'nın güneyinde yer alan volkanik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Volkanik Ovalar · İç Anadolu",
  },
  {
    id: "geo-ova-v03",
    text: "Volkanik ova olan Erzurum Ovası hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Erzurum Ovası, Erzurum ilinde volkanik faaliyetlerle dolmuş, aynı zamanda tektonik çöküntü özelliği de taşıyan karma yapılı bir ovadır.",
    category: "ovalar",
    categoryLabel: "Volkanik Ovalar · Doğu Anadolu",
  },
  {
    id: "geo-ova-v04",
    text: "Volkanik ova olan Ardahan Ovası hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Ardahan Ovası, Ardahan ilinde lav ve küllerin düzlükleri doldurmasıyla oluşmuş volkanik bir ovadır.",
    category: "ovalar",
    categoryLabel: "Volkanik Ovalar · Doğu Anadolu",
  },
  {
    id: "geo-ova-v05",
    text: "Volkanik ova olan Muradiye Ovası hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Muradiye Ovası, Van ilinde Van Gölü'nün kuzeyinde volkanik faaliyetlerle şekillenmiş bir ovadır.",
    category: "ovalar",
    categoryLabel: "Volkanik Ovalar · Doğu Anadolu",
  },
  {
    id: "geo-ova-v06",
    text: "Volkanik ova olan Çaldıran Ovası hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Çaldıran Ovası, Van ilinde volkanik faaliyetlerin şekillendirdiği bir ovadır. 2011 Van depremiyle de anılır.",
    category: "ovalar",
    categoryLabel: "Volkanik Ovalar · Doğu Anadolu",
  },



  // ── PLATOLAR — AŞINIM PLATOSU (1. Tür) ──
  {
    id: "geo-plato-a01",
    text: "Aşınım platosu olan Yazılıkaya Platosu hangi ilimizdedir?",
    answer: 3,
    explanation:
      "Yazılıkaya Platosu, Afyonkarahisar ilinde yer alan bir aşınım platosudur. Dış kuvvetlerin uzun yıllar aşındırması ve sonradan yükselmesiyle oluşmuştur.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · İç Anadolu",
  },
  {
    id: "geo-plato-a02",
    text: "Aşınım platosu olan Obruk Platosu hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Obruk Platosu, Konya ilinde yer alır. İç Anadolu'nun karstik özellikler taşıyan aşınım platosudur; obruk gölleri ile ünlüdür.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · İç Anadolu",
  },
  {
    id: "geo-plato-a03",
    text: "Aşınım platosu olan Cihanbeyli Platosu hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Cihanbeyli Platosu, Konya'nın kuzeyinde geniş bir aşınım platosudur. Tahıl tarımı yaygındır.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · İç Anadolu",
  },
  {
    id: "geo-plato-a04",
    text: "Aşınım platosu olan Haymana Platosu hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Haymana Platosu, Ankara'nın güneyinde yer alır. İç Anadolu'nun tipik aşınım platolarından biri olup tahıl tarımıyla bilinir.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · İç Anadolu",
  },
  {
    id: "geo-plato-a05",
    text: "Aşınım platosu olan Bozok Platosu hangi ilimizdedir?",
    answer: 66,
    explanation:
      "Bozok Platosu, Yozgat ilinde yer alır. İç Anadolu'nun aşınım platolarından biridir; tahıl ve hayvancılık ekonomisi hâkimdir.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · İç Anadolu",
  },
  {
    id: "geo-plato-a06",
    text: "Aşınım platosu olan Uzunyayla Platosu hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Uzunyayla Platosu, Sivas ilinin kuzeydoğusunda yer alır. İç Anadolu'nun aşınım platolarından biri olup hayvancılıkla geçim sağlanır.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · İç Anadolu",
  },
  {
    id: "geo-plato-a07",
    text: "Aşınım platosu olan Gaziantep Platosu hangi ilimizdedir?",
    answer: 27,
    explanation:
      "Gaziantep Platosu, Gaziantep ilinde yer alır. Güneydoğu Anadolu'nun aşınım platolarından biridir; fıstık bahçeleriyle ünlüdür.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · Güneydoğu Anadolu",
  },
  {
    id: "geo-plato-a08",
    text: "Aşınım platosu olan Şanlıurfa Platosu hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Şanlıurfa Platosu, Şanlıurfa ilinde Güneydoğu Anadolu'nun aşınım platolarından biridir. GAP Projesi ile tarıma açılmıştır.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · Güneydoğu Anadolu",
  },
  {
    id: "geo-plato-a09",
    text: "Aşınım platosu olan Adıyaman Platosu hangi ilimizdedir?",
    answer: 2,
    explanation:
      "Adıyaman Platosu, Adıyaman ilinde Güneydoğu Anadolu'nun aşınım platolarından biridir.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · Güneydoğu Anadolu",
  },
  {
    id: "geo-plato-a10",
    text: "Aşınım platosu olan Diyarbakır Platosu hangi ilimizdedir?",
    answer: 21,
    explanation:
      "Diyarbakır Platosu, Diyarbakır ilinde yer alır. Dicle Nehri'nin geçtiği bu aşınım platosunda tarım ve hayvancılık gelişmiştir.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · Güneydoğu Anadolu",
  },

  // ── PLATOLAR — LAV PLATOSU (2. Tür) ──
  {
    id: "geo-plato-l01",
    text: "Lav platosu olan Erzurum Platosu hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Erzurum Platosu, Erzurum ilinde yer alır. Volkanik lavların çukurlukları doldurmasıyla oluşmuş lav platosudur. Çernezyom (kara) topraklar bu platoda yaygındır.",
    category: "platolar",
    categoryLabel: "Lav Platoları · Doğu Anadolu",
  },
  {
    id: "geo-plato-l02",
    text: "Lav platosu olan Kars Platosu hangi ilimizdedir?",
    answer: 36,
    explanation:
      "Kars Platosu, Kars ilinde yer alır. Volkanik kökenli lav platosudur; yüksek rakım ve soğuk iklim nedeniyle büyükbaş hayvancılık yaygındır.",
    category: "platolar",
    categoryLabel: "Lav Platoları · Doğu Anadolu",
  },
  {
    id: "geo-plato-l03",
    text: "Lav platosu olan Ardahan Platosu hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Ardahan Platosu, Ardahan ilinde yer alır. Lav platosu niteliğindedir; alpin çayırlar ve büyükbaş hayvancılık ile bilinir.",
    category: "platolar",
    categoryLabel: "Lav Platoları · Doğu Anadolu",
  },
  {
    id: "geo-plato-l04",
    text: "Lav platosu olan Kapadokya Platosu hangi ilimizdedir?",
    answer: 50,
    explanation:
      "Kapadokya Platosu, Nevşehir ilinde yer alır. Volkanik lavlar ve tüflerden oluşan bu lav platosunda akarsuların aşındırmasıyla peri bacaları oluşmuştur.",
    category: "platolar",
    categoryLabel: "Lav Platoları · İç Anadolu",
  },

  // ── PLATOLAR — KARSTİK PLATO (3. Tür) ──
  {
    id: "geo-plato-k01",
    text: "Karstik plato olan Teke Platosu hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Teke Platosu, Antalya ilinde Batı Toroslar üzerinde yer alır. Kireç taşı çözünmesiyle şekillenmiş karstik bir platodur; kıl keçisi yetiştiriciliği en yaygın ekonomik faaliyettir.",
    category: "platolar",
    categoryLabel: "Karstik Platolar · Akdeniz",
  },
  {
    id: "geo-plato-k02",
    text: "Karstik plato olan Taşeli Platosu hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Taşeli Platosu, Mersin ilinde Orta Toroslar üzerinde yer alır. Kireç taşından oluşan karstik yapısı nedeniyle su tutmaz; nüfus ve tarım oldukça azdır, kıl keçisi yetiştiriciliği hâkimdir.",
    category: "platolar",
    categoryLabel: "Karstik Platolar · Akdeniz",
  },

  // ── PLATOLAR — AŞINIM PLATOSU · MARMARA (4. Tür) ──
  {
    id: "geo-plato-m01",
    text: "Türkiye'de nüfusun en fazla olduğu plato olan Çatalca-Kocaeli Platosu hangi ilimizdedir?",
    answer: 41,
    explanation:
      "Çatalca-Kocaeli Platosu, Kocaeli ilinde yer alır. Türkiye'de nüfusun en yoğun olduğu aşınım platosudur; sanayi, ticaret ve ulaşım son derece gelişmiştir.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · Marmara",
  },
  {
    id: "geo-plato-m02",
    text: "Yaylacılık faaliyetlerinin geliştiği Perşembe Platosu hangi ilimizdedir?",
    answer: 52,
    explanation:
      "Perşembe Platosu, Ordu ilinde Karadeniz kıyısında yer alır. Karadeniz'deki bu aşınım platosunda yaylacılık faaliyetleri yaygın olarak sürdürülür.",
    category: "platolar",
    categoryLabel: "Aşınım Platoları · Karadeniz",
  },

  // ── TURİZM — 1. KLASİK TURİZM (YAZ, KIŞ, İNANÇ) ──
  // Yaz Turizmi
  {
    id: "geo-tur-yaz01",
    text: "Yaz turizminin en geliştiği, Kemer, Alanya, Kaş ve Side merkezlerine ev sahipliği yapan ilimiz hangisidir?",
    answer: 7,
    explanation:
      "Antalya, Türkiye'de deniz turizmi süresinin en uzun olduğu ve en fazla yabancı turist çeken yaz turizmi başkentidir.",
    category: "turizm",
    categoryLabel: "Yaz Turizmi",
  },
  {
    id: "geo-tur-yaz02",
    text: "Bodrum, Marmaris, Fethiye ve Datça gibi ünlü deniz turizmi merkezlerine sahip ilimiz hangisidir?",
    answer: 48,
    explanation:
      "Muğla, girintili çıkıntılı koyları, uzun kıyı şeridi ve yat turizmiyle Ege yaz turizminin merkezidir.",
    category: "turizm",
    categoryLabel: "Yaz Turizmi",
  },
  {
    id: "geo-tur-yaz03",
    text: "Kuşadası ve Didim gibi önemli deniz turizmi merkezleri hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Aydın iline bağlı Kuşadası ve Didim, Ege Bölgesi'nin en eski ve popüler deniz turizmi merkezlerindendir.",
    category: "turizm",
    categoryLabel: "Yaz Turizmi",
  },
  {
    id: "geo-tur-yaz04",
    text: "Çeşme, Alaçatı ve Foça gibi deniz ve rüzgar sörfü turizm merkezleri hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir'in Çeşme ve Alaçatı beldeleri yaz turizmi, plajları ve dünya çapında rüzgar sörfü imkanlarıyla öne çıkar.",
    category: "turizm",
    categoryLabel: "Yaz Turizmi",
  },
  {
    id: "geo-tur-yaz05",
    text: "Ayvalık, Burhaniye, Erdek ve Altınoluk gibi kıyı turizm merkezleri hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Balıkesir, hem Ege (Edremit Körfezi) hem Marmara Denizi kıyısında deniz turizminin yoğun olduğu merkezlere sahiptir.",
    category: "turizm",
    categoryLabel: "Yaz Turizmi",
  },
  {
    id: "geo-tur-yaz06",
    text: "Marmara kıyısında deniz ve yaz turizminin geliştiği önemli ilimiz hangisidir?",
    answer: 77,
    explanation:
      "Yalova; Çınarcık ve Armutlu kıyılarıyla Marmara Bölgesi'nde yaz ve deniz turizminin geliştiği önemli bir ilimizdir.",
    category: "turizm",
    categoryLabel: "Yaz Turizmi",
  },

  // Kış Turizmi
  {
    id: "geo-tur-kis01",
    text: "Türkiye'nin ilk ve en köklü kış turizmi merkezi olan Uludağ Kayak Merkezi hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Uludağ, Bursa ilinde yer alır. Türkiye'nin en eski, en bilinen ve tesis kapasitesi en yüksek kış turizmi merkezidir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis02",
    text: "Modern pistleri ve kış turizmi yatırımlarıyla ünlü Erciyes Kayak Merkezi hangi ilimizdedir?",
    answer: 38,
    explanation:
      "Erciyes Kayak Merkezi, Kayseri ilinde sönmüş volkan dağı olan Erciyes Dağı üzerinde kurulmuştur.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis03",
    text: "Türkiye'nin en uzun pistlerine sahip Palandöken Kayak Merkezi hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Palandöken Kayak Merkezi, Erzurum ilinde yer alır; kış olimpiyatlarına ev sahipliği yapmış yüksek irtifalı kış merkezidir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis04",
    text: "Alp Dağları'na özgü kristal kar yapısıyla ünlü Sarıkamış Kayak Merkezi hangi ilimizdedir?",
    answer: 36,
    explanation:
      "Sarıkamış Kayak Merkezi, Kars ilinde sarıçam ormanları içinde yer alır ve kristal kar kalitesiyle dünyaca meşhurdur.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis05",
    text: "Başkent yakınındaki kış turizmi merkezi Elmadağ Kayak Merkezi hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Elmadağ Kayak Merkezi, Ankara ilinde yer alan günübirlik kış sporları alanıdır.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis06",
    text: "Köroğlu Dağları üzerinde yer alan Kartalkaya Kayak Merkezi hangi ilimizdedir?",
    answer: 14,
    explanation:
      "Kartalkaya, Bolu ilinde Köroğlu Dağları üzerinde kurulmuş kış turizmi ve snowboard merkezidir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis07",
    text: "Ilgaz Dağı Milli Parkı içindeki Ilgaz Kayak Merkezi hangi ilimizdedir?",
    answer: 37,
    explanation:
      "Ilgaz Kayak Merkezi, Kastamonu (ve Çankırı) sınırında yer alan Batı Karadeniz kış turizm merkezidir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis08",
    text: "Beydağları üzerinde yer alan ve 'aynı gün hem kayak hem deniz' imkanı sunan Saklıkent Kayak Merkezi hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Saklıkent Kayak Merkezi, Antalya il merkezine sadece 50 km mesafede Beydağları üzerinde yer alır.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis09",
    text: "Göller Yöresi'nde kış turizminin geliştiği Davraz Kayak Merkezi hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Davraz Kayak Merkezi, Isparta ilinde Eğirdir Gölü manzaralı popüler bir kış sporları merkezidir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis10",
    text: "Orta Karadeniz'de kış turizmi yapılan Ladik Akdağ Kayak Merkezi hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Ladik Akdağ Kayak Merkezi, Samsun ilinde kış sporları ve yayla turizmine hizmet veren merkezdir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis11",
    text: "Samanlı Dağları zirvesinde Sapanca Gölü manzaralı Kartepe Kayak Merkezi hangi ilimizdedir?",
    answer: 41,
    explanation:
      "Kartepe Kayak Merkezi, Kocaeli ilinde İstanbul'a en yakın kış turizm merkezidir.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },
  {
    id: "geo-tur-kis12",
    text: "Ege Bölgesi'nde yer alan Bozdağlar Kayak Merkezi hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Bozdağ Kayak Merkezi, İzmir'in Ödemiş ilçesinde Bozdağlar üzerinde yer alan kış turizm alanıdır.",
    category: "turizm",
    categoryLabel: "Kış Turizmi",
  },

  // İnanç Turizmi
  {
    id: "geo-tur-inanc01",
    text: "Hristiyanlarca hac yeri kabul edilen Meryem Ana Evi hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Meryem Ana Evi, İzmir'in Selçuk ilçesinde Efes Antik Kenti yakınlarında Bülbüldağı üzerinde yer alır.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc02",
    text: "Noel Baba (Aziz Nikolaos) Kilisesi ve Anıt Müzesi hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Noel Baba Kilisesi, Antalya'nın Demre (Kale) ilçesinde yer alan dünya çapında önemli bir inanç turizmi merkezidir.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc03",
    text: "Hristiyanlığın ilk mağara kilisesi kabul edilen St. Pierre Kilisesi hangi ilimizdedir?",
    answer: 31,
    explanation:
      "St. Pierre (Aziz Petrus) Mağara Kilisesi, Hatay'ın Antakya ilçesinde yer alan ilk Hristiyan ibadethanelerindendir.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc04",
    text: "Göl ortasındaki adada yer alan tarihi Akdamar Kilisesi (Kutsal Haç) hangi ilimizdedir?",
    answer: 65,
    explanation:
      "Akdamar Kilisesi, Van Gölü'ndeki Akdamar Adası üzerinde (Gevaş) yer alan Ortaçağ Ermeni mimarisi anıtıdır.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc05",
    text: "Karadağ yamacına oyulmuş tarihi Sümela (Meryem Ana) Manastırı hangi ilimizdedir?",
    answer: 61,
    explanation:
      "Sümela Manastırı, Trabzon'un Maçka ilçesinde Altındere Vadisi Milli Parkı içinde sarp kayalıklara inşa edilmiştir.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc06",
    text: "Süryani Kadim Cemaati'nin bin yıllık tarihi merkezi Deyrulzaferan Manastırı hangi ilimizdedir?",
    answer: 47,
    explanation:
      "Deyrulzaferan Manastırı, Mardin il merkezine yakın bir noktada bulunan önemli Süryani manastırıdır.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc07",
    text: "Mimar Sinan'ın 'ustalık eserim' dediği şaheser Selimiye Camii hangi ilimizdedir?",
    answer: 22,
    explanation:
      "Selimiye Camii ve Külliyesi, Edirne ilinde yer alan UNESCO Dünya Kültür Mirası listesindeki başyapıttır.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc08",
    text: "Yıldırım Bayezid tarafından yaptırılan 20 kubbeli tarihi Ulu Cami hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Bursa Ulu Cami, erken dönem Osmanlı mimarisinin çok kubbeli en anıtsal camisidir.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc09",
    text: "Hz. İbrahim'in ateşe atıldığı yer olarak inanılan Balıklıgöl (Halil-ür Rahman) hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Balıklıgöl, Şanlıurfa il merkezinde yer alan 'Peygamberler Şehri' unvanının simgesi kutsal mekândır.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc10",
    text: "'Gel, ne olursan ol yine gel' çağrısıyla bilinen Mevlânâ Celaleddin Rumi Türbesi hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Mevlânâ Türbesi ve Müzesi (Yeşil Kubbe), Konya il merkezinde yer alan dünyanın en çok ziyaret edilen tasavvuf merkezlerindendir.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },
  {
    id: "geo-tur-inanc11",
    text: "Hacı Bektaş-ı Veli Külliyesi ve Türbesi hangi ilimizdedir?",
    answer: 50,
    explanation:
      "Hacıbektaş Veli Türbesi ve Müzesi, Nevşehir'in Hacıbektaş ilçesinde yer alan Alevi-Bektaşi inanç merkezidir.",
    category: "turizm",
    categoryLabel: "İnanç Turizmi",
  },

  // ── TURİZM — 2. ALTERNATİF TURİZM ──
  {
    id: "geo-tur-alt01",
    text: "Kuş Cenneti Milli Parkı ile kuş gözlemciliği (ornitoloji) turizminin merkezi olan Manyas Gölü hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Manyas Kuşcenneti Milli Parkı, Balıkesir ilinde yer alan uluslararası Ramsar koruma alanıdır.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt02",
    text: "Kızılırmak Deltası Kuş Cenneti hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Kızılırmak Deltası, Samsun'un Bafra ilçesinde 350'den fazla kuş türüne ev sahipliği yapan sulak alandır.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt03",
    text: "Toroslar üzerindeki zengin endemik bitki çeşitliliğiyle botanik turizminin önde gelen ili hangisidir?",
    answer: 7,
    explanation:
      "Antalya Toros Dağları, Türkiye'deki endemik bitki türlerinin en yoğun olduğu botanik turizm merkezidir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt04",
    text: "Kaçkarlar, yaylalar ve Fırtına Vadisi ile doğa yürüyüşü (trekking) turizminin kalbi hangi ilimizdir?",
    answer: 53,
    explanation:
      "Rize, Kaçkar Dağları Milli Parkı ve yaylalarıyla (Ayder, Pokut, Huser) Türkiye'de trekkingin başkentidir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt05",
    text: "Dünyanın en zorlu ve en hızlı akan rafting parkurlarından Çoruh Nehri hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Çoruh Nehri, Artvin ilinde dünya rafting şampiyonalarına ev sahipliği yapmış uluslararası parkurdur.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt06",
    text: "Köprülü Kanyon Milli Parkı ile Türkiye'nin en popüler rafting merkezi hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Köprülü Kanyon, Antalya'nın Manavgat ilçesinde yer alan yılda yüz binlerce turistin rafting yaptığı merkezdir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt07",
    text: "Uluslararası standartlardaki lüks tesisleriyle Türkiye'nin golf turizmi başkenti Belek hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Belek (Antalya Serik), dünyaca ünlü golf sahalarıyla Türkiye'de golf turizminin tartışmasız merkezidir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt08",
    text: "Efes'e yakınlığı nedeniyle Türkiye'nin en çok kruvaziyer (yüzen otel) gemisi yanaşan Kuşadası Limanı hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Kuşadası Limanı, Aydın ilinde yer alır ve Türkiye'de kruvaziyer yolcu sayısı bakımından lider limandır.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt09",
    text: "Galataport Limanı ile kruvaziyer ve kongre turizminin dünya çapındaki merkezi olan metropolümüz hangisidir?",
    answer: 34,
    explanation:
      "İstanbul, Galataport kruvaziyer limanı ve uluslararası kongre merkezleriyle lider turizm şehrimizdir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt10",
    text: "Bodrum, Marmaris ve Göcek koylarıyla Türkiye'de yat turizmi ve Mavi Yolculuk'un merkezi hangi ilimizdir?",
    answer: 48,
    explanation:
      "Muğla, mavi bayraklı marinaları ve korunaklı koylarıyla Türkiye yat turizmi ve mavi turun odak noktasıdır.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt11",
    text: "Beş yıldızlı termal otelleri ve şifalı kaplıcalarıyla 'Türkiye'nin Termal Başkenti' sayılan ilimiz hangisidir?",
    answer: 3,
    explanation:
      "Afyonkarahisar (Sandıklı, Gazlıgöl), termal yatak kapasitesi en yüksek olan termal turizm merkezidir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },
  {
    id: "geo-tur-alt12",
    text: "Tarihi Atatürk Köşkü ve şifalı kaplıcalarıyla ünlü Termal ilçesi hangi ilimizdedir?",
    answer: 77,
    explanation:
      "Yalova Termal ilçesi, Bizans ve Osmanlı'dan günümüze gelen en köklü kaplıca turizm merkezidir.",
    category: "turizm",
    categoryLabel: "Alternatif Turizm",
  },

  // ── TURİZM — 3. 2023 TURİZM STRATEJİSİ (BÖLGELER & KORİDORLAR) ──
  {
    id: "geo-tur-strat01",
    text: "2023 Turizm Stratejisi'ndeki 'Urartu Kültür Turizmi Gelişim Bölgesi' hangi iki ilimizi kapsar?",
    answer: 65,
    explanation:
      "Urartu Kültür Turizmi Gelişim Bölgesi, Van ve Bitlis illerini kapsayan strateji bölgesidir.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat02",
    text: "GAP Kültür Turizmi Gelişim Bölgesi'nin merkezinde yer alan 'Peygamberler Şehri' hangi ilimizdir?",
    answer: 63,
    explanation:
      "Şanlıurfa, GAP Kültür Turizmi Gelişim Bölgesi'nin Göbeklitepe ve Balıklıgöl gibi çekim merkezlerini barındırır.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat03",
    text: "Hattuşaş ve Alacahöyük merkezli 'Hitit Kültür Turizmi Gelişim Bölgesi' hangi ilimizdedir?",
    answer: 19,
    explanation:
      "Hitit Kültür Turizmi Gelişim Bölgesi, Çorum ve Yozgat illerini kapsamaktadır.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat04",
    text: "Frig Vadisi'ni kapsayan 'Frigya Kültür ve Termal Turizm Gelişim Bölgesi'nin önde gelen ili hangisidir?",
    answer: 3,
    explanation:
      "Frigya Kültür ve Termal Bölgesi; Afyonkarahisar, Kütahya, Eskişehir, Ankara ve Uşak illerini kapsar.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat05",
    text: "'Troya Kültür ve Termal Turizm Gelişim Bölgesi' hangi tarihi kentimizin bulunduğu ilimizdedir?",
    answer: 17,
    explanation:
      "Troya Kültür ve Termal Turizm Gelişim Bölgesi, Çanakkale ve Balıkesir illerini kapsar.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat06",
    text: "Osmanlı Devleti'nin kuruluş beşiği olan 'Söğüt Kültür Turizmi Gelişim Bölgesi' hangi ilimizdedir?",
    answer: 11,
    explanation:
      "Söğüt Kültür Turizmi Gelişim Bölgesi, Bilecik (Söğüt) ve Bursa illerini kapsar.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat07",
    text: "'Göller Bölgesi Kültür Turizmi Gelişim Bölgesi'nde yer alan gül ve lavanta şehri hangi ilimizdir?",
    answer: 32,
    explanation:
      "Göller Bölgesi Gelişim Bölgesi; Isparta, Burdur, Konya ve Afyon illerini kapsar.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat08",
    text: "Samsun'dan Hopa'ya kadar uzanan 'Yayla Koridoru'nun doğu ucu olan Hopa hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Yayla Koridoru, Samsun'dan Artvin Hopa'ya kadar Doğu Karadeniz yaylalarını birbirine bağlayan eko-turizm aksıdır.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat09",
    text: "Erzincan, Erzurum, Ağrı, Kars ve Ardahan'ı kapsayan 'Kış Koridoru'nun kış oyunları merkezi hangi ilimizdir?",
    answer: 25,
    explanation:
      "Kış Koridoru, Erzurum Palandöken ve Kars Sarıkamış merkezli kış turizmi geliştirme aksıdır.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat10",
    text: "İnanç Koridoru'nun başlangıç noktası olan St. Paul Kuyusu ve Kilisesi'nin yer aldığı Tarsus hangi ilimizdedir?",
    answer: 33,
    explanation:
      "İnanç Koridoru, Mersin (Tarsus)'tan başlayıp Hatay, Gaziantep, Şanlıurfa ve Mardin'e uzanır.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat11",
    text: "Gemlik, Mudanya, Erdek ve Ezine'yi içine alan 'Zeytin Koridoru'ndaki Erdek ve Bandırma hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Zeytin Koridoru; Balıkesir (Gönen, Erdek, Bandırma), Bursa (Gemlik, Mudanya) ve Çanakkale (Ezine) yörelerini kapsar.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat12",
    text: "Edirne, Kırklareli ve Tekirdağ illerini birleştiren koridor hangisidir?",
    answer: 22,
    explanation:
      "Trakya Kültür Koridoru, Edirne merkezli olup Kırklareli ve Tekirdağ illerini kültür turizmiyle buluşturur.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat13",
    text: "Ayaş ile Sapanca arasında uzanan 'İpek Yolu Koridoru'nun batı ucundaki Sapanca hangi ilimizdedir?",
    answer: 54,
    explanation:
      "İpek Yolu Koridoru, Ankara Ayaş'tan başlayıp Sakarya Sapanca'ya kadar uzanan tarihi güzergâhtır.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },
  {
    id: "geo-tur-strat14",
    text: "Şile ile Sinop arasında 500 km kıyı bandını kapsayan koridorun doğu ucu Sinop hangi ilimizdir?",
    answer: 57,
    explanation:
      "Batı Karadeniz Kıyı Koridoru, İstanbul Şile'den başlayarak Sinop'a kadar uzanan doğa ve kıyı koridorudur.",
    category: "turizm",
    categoryLabel: "2023 Turizm Stratejisi",
  },

  // ── TURİZM — 4. UNESCO DÜNYA KÜLTÜR MİRAS LİSTESİ (TÜRKİYE) ──
  {
    id: "geo-tur-unesco01",
    text: "Ayasofya, Sultanahmet, Topkapı Sarayı ve Süleymaniye'yi barındıran 'Tarihî Alanlar' UNESCO mirası hangi ilimizdedir?",
    answer: 34,
    explanation:
      "İstanbul'un Tarihî Alanları (Sultanahmet Arkeolojik Parkı, Süleymaniye, Zeyrek ve Kara Surları) 1985'te UNESCO listesine alınmıştır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco02",
    text: "Geleneksel ahşap konaklarıyla UNESCO Dünya Mirası olan tarihi Safranbolu Şehri hangi ilimizdedir?",
    answer: 78,
    explanation:
      "Safranbolu Şehri, Karabük ilinde yer alır. Osmanlı kent dokusunu ve sivil mimarisini en iyi koruyan şehirdir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco03",
    text: "Hitit İmparatorluğu'nun başkenti olan UNESCO mirası Hattuşaş (Boğazköy) hangi ilimizdedir?",
    answer: 19,
    explanation:
      "Hattuşaş, Çorum'un Boğazkale ilçesinde yer alır; Aslanlı Kapı, Yazılıkaya açık hava mabedi ile ünlüdür.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco04",
    text: "Dev heykelleri ve Kommagene Kralı I. Antiochos'un tümülüsüyle UNESCO mirası Nemrut Dağı hangi ilimizdedir?",
    answer: 2,
    explanation:
      "Nemrut Dağı, Adıyaman'ın Kâhta ilçesinde yer alan, devasa taş tanrı heykelleriyle ünlü UNESCO anıtıdır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco05",
    text: "Likya Birliği'nin başkenti Xanthos ve kutsal alanı Letoon UNESCO mirası hangi ilimiz sınırındadır?",
    answer: 7,
    explanation:
      "Xanthos-Letoon, Antalya (Kaş) ile Muğla sınırında yer alan Likya uygarlığının en önemli UNESCO merkezidir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco06",
    text: "Taş işçiliği harikası kapılarıyla 'Görmeden ölmeyin' denilen Divriği Ulu Camii ve Darüşşifası hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Divriği Ulu Camii ve Darüşşifası, Sivas ilinde Mengücekliler döneminde inşa edilmiş, Türkiye'nin ilk UNESCO alanlarındandır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco07",
    text: "Homeros'un İlyada destanına konu olan ve tahta atıyla bilinen Truva Antik Kenti hangi ilimizdedir?",
    answer: 17,
    explanation:
      "Truva (Troya) Arkeolojik Kenti, Çanakkale'nin Tevfikiye köyünde yer alan 5000 yıllık UNESCO mirasıdır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco08",
    text: "İnsanlık tarihinin ilk yerleşik tarım ve şehir hayatını gösteren Çatalhöyük Neolitik Kenti hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Çatalhöyük, Konya'nın Çumra ilçesinde yer alan, bitişik nizam kerpiç evleri ve ana tanrıça figürleriyle ünlü Neolitik UNESCO kentsel yerleşimidir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco09",
    text: "Osmanlı'nın kırsal yaşamını yansıtan tarihi Cumalıkızık Köyü hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Bursa ve Cumalıkızık: Osmanlı İmparatorluğu'nun Doğuşu başlığıyla 2014 yılında UNESCO Dünya Mirası olmuştur.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco10",
    text: "Helenistik dönemin en dik tiyatrosuna ve ilk parşömen kütüphanesine sahip Bergama hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Bergama Çok Katmanlı Kültürel Peyzaj Alanı, İzmir ilinde yer alan görkemli akropolüyle UNESCO mirasıdır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco11",
    text: "Çin Seddi'nden sonra en uzun surlardan sayılan Tarihi Surlar ve Hevsel Bahçeleri hangi ilimizdedir?",
    answer: 21,
    explanation:
      "Diyarbakır Kalesi ve Hevsel Bahçeleri Kültürel Peyzajı, Dicle Nehri kıyısında 2015'te UNESCO listesine girdi.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco12",
    text: "Celsus Kütüphanesi ve Artemis Tapınağı ile antik dünyanın göz bebeği Efes Antik Kenti hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Efes, İzmir'in Selçuk ilçesinde yer alır; Meryem Ana Evi ve Ayasuluk Kalesi ile birlikte UNESCO listesindedir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco13",
    text: "'1001 Kiliseli Şehir' olarak bilinen Ani Arkeolojik Alanı hangi ilimiz sınırındadır?",
    answer: 36,
    explanation:
      "Ani Ören Yeri, Kars ilinde Türkiye-Ermenistan sınırında Arpaçay kıyısında yer alan İpek Yolu'nun UNESCO Ortaçağ başkentidir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco14",
    text: "Antik çağın en ünlü heykeltıraşlık okulu ve stadyumuna sahip Afrodisias Antik Kenti hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Afrodisias, Aydın'ın Karacasu ilçesinde mermer ocakları ve aşk tanrıçası Afrodit tapınağıyla UNESCO mirasıdır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco15",
    text: "'Tarihin sıfır noktası' kabul edilen 12.000 yıllık devasa dikilitaşlı tapınak Göbeklitepe hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Göbeklitepe, Şanlıurfa il merkezinin 18 km kuzeydoğusunda yer alan Neolitik döneme ait dünyanın bilinen en eski anıtsal kült merkezidir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco16",
    text: "İlk kerpiç saray kalıntıları ve ilk kılıçların bulunduğu UNESCO mirası Arslantepe Höyüğü hangi ilimizdedir?",
    answer: 44,
    explanation:
      "Arslantepe Höyüğü, Malatya'nın Battalgazi ilçesinde yer alan bürokrasinin ve devlet sisteminin doğduğu merkezdir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco17",
    text: "Frigya Krallığı'nın başkenti olan ve Kral Midas'ın tümülüsüne ev sahipliği yapan Gordion Antik Kenti hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Gordion Antik Kenti, Ankara'nın Polatlı ilçesinde Sakarya Nehri kenarında yer alır; 2023 yılında UNESCO Dünya Mirası olmuştur.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco18",
    text: "Parayı ilk basan Lidya Krallığı'nın başkenti Sardes Antik Kenti ve Bintepeler hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Sardes (Sardis) Antik Kenti, Manisa'nın Salihli ilçesinde yer alan Artemis Tapınağı ve sinagoguyla ünlü tarihi şehirdir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco19",
    text: "UNESCO seri mirası 'Anadolu'nun Ortaçağ Dönemi Ahşap Hipostil Camileri'nden Eşrefoğlu Camii hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Beyşehir Eşrefoğlu Camii (Konya), sedir ağacı sütunları ve karlık kuyusuyla 2023'te UNESCO listesine giren ahşap direkli şaheserdir.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco20",
    text: "Beyaz traverten basamakları ve Hierapolis Antik Kenti ile Türkiye'nin iki karma (doğal+kültürel) mirasından biri hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Pamukkale - Hierapolis, Denizli ilinde yer alır; kalsiyum karbonatlı şifalı suları ve antik kentiyle karma UNESCO mirasıdır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },
  {
    id: "geo-tur-unesco21",
    text: "Peribacaları, kaya kiliseleri ve yeraltı şehirleriyle Türkiye'nin karma UNESCO mirası Göreme Millî Parkı hangi ilimizdedir?",
    answer: 50,
    explanation:
      "Göreme Millî Parkı ve Kapadokya, Nevşehir ilinde volkanik tüflerin aşınmasıyla oluşan eşsiz karma dünya mirasıdır.",
    category: "turizm",
    categoryLabel: "UNESCO Dünya Mirası",
  },

  // ── AKARSULAR — 1. KARADENİZ HAVZASI ──
  {
    id: "geo-akar-kar01",
    text: "Türkiye'nin en hızlı akan ve Gürcistan üzerinden Karadeniz'e dökülen nehri Çoruh Nehri hangi ilimizden yurt dışına çıkar?",
    answer: 8,
    explanation:
      "Çoruh Nehri, Artvin ilinden geçerek Batum yakınlarında Gürcistan sınırından Karadeniz'e dökülen en hızlı akarsuyumuzdur.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar02",
    text: "Çoruh Nehri'nin ana kaynağını aldığı Mescit Dağları hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Çoruh Nehri, Erzurum ilindeki Mescit Dağları'ndan doğup Bayburt ve Artvin üzerinden denize ulaşır.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar03",
    text: "Doğu Karadeniz'de yer alan ve Tirebolu'dan Karadeniz'e dökülen Harşit (Doğankent) Çayı hangi ilimizdedir?",
    answer: 28,
    explanation:
      "Harşit (Doğankent) Çayı, Gümüşhane'den doğup Giresun'un Tirebolu ilçesinden Karadeniz'e dökülür.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar04",
    text: "Karadeniz'e dökülürken Çarşamba Deltası'nı oluşturan Yeşilırmak hangi ilimizden denize dökülür?",
    answer: 55,
    explanation:
      "Yeşilırmak, Samsun ilinin Çarşamba ilçesinde taşıdığı alüvyonlarla verimli Çarşamba Deltası'nı oluşturarak denize dökülür.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar05",
    text: "Yeşilırmak'ın en uzun ve en önemli kolu olan Kelkit Çayı hangi ilimizden geçer?",
    answer: 60,
    explanation:
      "Kelkit Çayı; Gümüşhane, Sivas ve Tokat (Erbaa-Niksar ovası) üzerinden akarak Yeşilırmak ile birleşir.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar06",
    text: "Türkiye sınırları içindeki en uzun nehir olan ve Bafra Deltası'nı oluşturan Kızılırmak hangi ilimizden denize dökülür?",
    answer: 55,
    explanation:
      "Kızılırmak (1355 km), Türkiye sınırları içinde doğup denize dökülen en uzun nehirdir; Samsun Bafra'da delta oluşturur.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar07",
    text: "Kızılırmak Nehri'nin kaynağını aldığı Kızıldağ hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Kızılırmak, Sivas ilinin İmranlı ilçesindeki Kızıldağ eteklerinden doğar ve devasa bir yay çizer.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar08",
    text: "Kızılırmak'ın İç Anadolu'daki en önemli kolu olan Delice Çayı hangi ilimizden geçer?",
    answer: 71,
    explanation:
      "Delice Çayı; Yozgat ve Kırıkkale topraklarından geçerek Kızılırmak'a karışan en büyük kollardandır.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar09",
    text: "Türkiye'de ağız kısmında tomruk taşımacılığı (ulaşım) yapılabilen tek akarsu Bartın (Kocairmak) Çayı hangi ilimizdedir?",
    answer: 74,
    explanation:
      "Bartın Çayı, Karadeniz'e döküldüğü boğaz kesiminde akış hızı azaldığı için küçük tonajlı teknelerin ve tomrukların taşınabildiği tek akarsudur.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar10",
    text: "Bartın Çayı'nın en önemli kollarından olan Gökırmak hangi ilimizdedir?",
    answer: 37,
    explanation:
      "Gökırmak, Kastamonu Ovası boyunca uzanıp Taşköprü'den geçerek Bartın-Küre havzasına yönelen koldur.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar11",
    text: "Batı Karadeniz'de Çaycuma Ovası'ndan geçip denize dökülen Filyos (Yenice) Çayı hangi ilimizdedir?",
    answer: 67,
    explanation:
      "Filyos (Yenice) Çayı, Karabük demir-çelik vadisinden geçerek Zonguldak Filyos limanı mevkiinde Karadeniz'e dökülür.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar12",
    text: "Filyos Nehri'nin Ilgaz Dağları civarından gelen kolu Devrez Çayı hangi ilimizdedir?",
    answer: 18,
    explanation:
      "Devrez Çayı, Çankırı ilinden geçerek Kızılırmak ve Filyos havzaları arasında drenaj sağlayan önemli bir akarsudur.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar13",
    text: "Dört coğrafi bölgeden (İç Anadolu, Ege, Marmara, Karadeniz) geçerek Karadeniz'e dökülen Sakarya Nehri hangi ilden denize dökülür?",
    answer: 54,
    explanation:
      "Sakarya Nehri, Afyon-Eskişehir-Ankara-Bilecik rotasını takip edip Sakarya ilinin Karasu ilçesinden Karadeniz'e dökülür.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar14",
    text: "Sakarya Nehri'nin en büyük kolu olan ve Eskişehir şehrinin ortasından geçen akarsu Porsuk Çayı hangi ilimizdedir?",
    answer: 26,
    explanation:
      "Porsuk Çayı, Kütahya Murat Dağı'ndan doğar, Eskişehir kent merkezinden geçerek Sakarya Nehri'ne katılır.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },
  {
    id: "geo-akar-kar15",
    text: "Uludağ'dan doğup Bursa Ovası'nı sulayarak Sakarya'ya yakın bölgede Susurluk havzasıyla birleşen Nilüfer Çayı hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Nilüfer Çayı, Bursa il sınırlarında Uludağ'ın güney eteklerinden doğar ve Bursa Ovası'nı sular.",
    category: "akarsular",
    categoryLabel: "Karadeniz Havzası",
  },

  // ── AKARSULAR — 2. MARMARA HAVZASI ──
  {
    id: "geo-akar-mar01",
    text: "Güney Marmara'nın en büyük akarsuyu olup Marmara Denizi'ne dökülen Susurluk (Simav) Çayı hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Susurluk Çayı, Balıkesir ve Bursa topraklarını sulayıp Marmara Denizi'ne dökülen en önemli akarsudur.",
    category: "akarsular",
    categoryLabel: "Marmara Havzası",
  },

  // ── AKARSULAR — 3. EGE HAVZASI ──
  {
    id: "geo-akar-ege01",
    text: "Bulgaristan'dan doğup Türkiye-Yunanistan sınırını oluşturan Meriç Nehri hangi ilimizden Ege Denizi'ne (Saros) dökülür?",
    answer: 22,
    explanation:
      "Meriç Nehri, Edirne ilinde Türkiye-Yunanistan sınırını çizer ve Enez yakınlarından Ege Denizi'ne dökülür.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },
  {
    id: "geo-akar-ege02",
    text: "Meriç Nehri'nin Trakya içlerinden gelen ve pirinç/çeltik tarımında kullanılan kolu Ergene Çayı hangi ilimizdedir?",
    answer: 22,
    explanation:
      "Ergene Çayı, Tekirdağ ve Kırklareli'nden gelen kollarıyla Edirne'de Meriç Nehri'ne kavuşur.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },
  {
    id: "geo-akar-ege03",
    text: "Ege Denizi'ne dökülürken Dikili (Çandarlı) Deltası'nı oluşturan Bakırçay hangi ilimizden denize dökülür?",
    answer: 35,
    explanation:
      "Bakırçay, Manisa Kırkağaç'tan gelip İzmir'in Dikili ve Bergama ilçeleri arasından Çandarlı Körfezi'ne dökülür.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },
  {
    id: "geo-akar-ege04",
    text: "Ege Denizi'ne döküldüğü yerde Menemen Deltası'nı oluşturan Gediz Nehri hangi ilimizden denize dökülür?",
    answer: 35,
    explanation:
      "Gediz Nehri, Manisa Ovası'nı geçip İzmir'in Menemen ilçesinde geniş bir delta ovası oluşturarak İzmir Körfezi dışına dökülür.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },
  {
    id: "geo-akar-ege05",
    text: "Gediz Nehri'nin en geniş tarım alanlarını suladığı verimli graben ovası hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Manisa (Salihli, Turgutlu, Alaşehir) Ovası, Gediz Nehri ve kolları tarafından sulanan çok verimli bir grabendir.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },
  {
    id: "geo-akar-ege06",
    text: "Bozdağlar ile Aydın Dağları arasındaki grabenden akıp Selçuk Deltası'nı oluşturan Küçük Menderes hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Küçük Menderes, İzmir ilinde Ödemiş ve Tire ovalarını sulayıp Selçuk'ta antik Efes limanını alüvyonla doldurmuştur.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },
  {
    id: "geo-akar-ege07",
    text: "Menderesler (büklümler) çizerek akıp Balat Deltası'nı oluşturan Ege'nin en uzun nehri Büyük Menderes hangi ilden denize dökülür?",
    answer: 9,
    explanation:
      "Büyük Menderes Nehri, Afyon ve Denizli'den doğar, Aydın Ovası boyunca büklümler çizip Balat Deltası'yla Ege'ye dökülür.",
    category: "akarsular",
    categoryLabel: "Ege Havzası",
  },

  // ── AKARSULAR — 4. AKDENİZ HAVZASI ──
  {
    id: "geo-akar-akd01",
    text: "Ege ile Akdeniz sınırında yer alan ve rafting sporuna çok uygun olan Dalaman Çayı hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Dalaman Çayı, Muğla ilinde derin vadilerden geçerek Akdeniz'e dökülen debisi yüksek bir nehirdir.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd02",
    text: "Muğla ile Antalya arasında doğal il sınırını oluşturan Esen Çayı hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Esen (Kocaçay) Çayı, Muğla (Seydikemer) ile Antalya (Kaş) arasında sınır çizerek Patara kıyısından Akdeniz'e dökülür.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd03",
    text: "Antalya'nın batı kesimindeki Beydağları'ndan doğup Kumluca'dan Akdeniz'e dökülen Alakır Çayı hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Alakır Çayı, Antalya'nın Kumluca ilçesinde yer alan ve üzerinde baraj bulunan karstik kaynaklı deredir.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd04",
    text: "Isparta Eğirdir Gölü güneyinden doğup Antalya Ovası'ndan Akdeniz'e dökülen Aksu Nehri hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Aksu Nehri, Antalya Ovası'nı sulayarak Kundu sahilinden denize dökülen önemli bir Akdeniz akarsuyudur.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd05",
    text: "Köprülü Kanyon içinden geçen ve Türkiye'nin en popüler rafting parkuru olan Köprüçay hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Köprüçay, Antalya'nın Serik ve Manavgat ilçeleri arasında karstik kaynaklarla beslenen kanyon akarsuyudur.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd06",
    text: "Karstik gür kaynaklarla (voklüz) beslendiği için Türkiye'de rejimi ve su seviyesi en düzenli nehir olan Manavgat Çayı hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Manavgat Nehri, Antalya ilinde Toroslar'ın altındaki karstik yer altı sularıyla beslenir; yaz kuraklığında bile debisi yüksek kalır.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd07",
    text: "'KKTC Su Temin Projesi' kapsamında Alaköprü Barajı'ndan yavru vatana içme suyu aktarılan Dragon (Anamur) Çayı hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Dragon (Anamur) Çayı, Mersin'in Anamur ilçesinde yer alır; Akdeniz tabanına döşenen borularla KKTC'ye su taşınmaktadır.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd08",
    text: "Orta Toroslar'ı yararak Akdeniz'e döküldüğü yerde Silifke Deltası'nı oluşturan Göksu Nehri hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Göksu Nehri, Mersin'in Silifke ilçesinden Akdeniz'e dökülür ve Silifke delta ovasını meydana getirir.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd09",
    text: "Aladağlar'dan gelen Zamantı ve Göksu kollarıyla birleşip Çukurova Deltası'nı oluşturan Seyhan Nehri hangi ilimizden denize dökülür?",
    answer: 1,
    explanation:
      "Seyhan Nehri, Kayseri ve Niğde'den gelen kollarıyla Adana il merkezinden geçerek Çukurova'dan Akdeniz'e dökülür.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd10",
    text: "Elbistan Ovası'ndan doğup Menzelet ve Aslantaş barajlarından geçerek Çukurova'dan denize dökülen Ceyhan Nehri hangi ilden denize dökülür?",
    answer: 1,
    explanation:
      "Ceyhan Nehri, Kahramanmaraş ve Osmaniye'den geçip Adana'nın Yumurtalık ilçesi yakınlarında Akdeniz'e dökülür.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd11",
    text: "Ceyhan Nehri'nin ana kaynağını aldığı Elbistan Havzası hangi ilimizdedir?",
    answer: 46,
    explanation:
      "Ceyhan Nehri, Kahramanmaraş ilinin Elbistan ilçesindeki Pınarbaşı kaynağından doğar.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },
  {
    id: "geo-akar-akd12",
    text: "Lübnan Bekaa Vadisi'nden doğup Suriye'den geçen ve güneyden kuzeye akarak Akdeniz'e dökülen Asi Nehri hangi ilimizdedir?",
    answer: 31,
    explanation:
      "Asi Nehri, Hatay'ın Samandağ ilçesinden Akdeniz'e dökülen, sınır aşan ve ters yönde (güneyden kuzeye) akan nehrimizdir.",
    category: "akarsular",
    categoryLabel: "Akdeniz Havzası",
  },

  // ── AKARSULAR — 5. BASRA VE HAZAR HAVZALARI (AÇIK VE KAPALI HAVZALAR) ──
  {
    id: "geo-akar-bas01",
    text: "Türkiye'nin su taşıma kapasitesi (debisi) en yüksek nehri olan ve Basra Körfezi'ne dökülen Fırat Nehri hangi ilden sınır dışına çıkar?",
    answer: 63,
    explanation:
      "Fırat Nehri, Şanlıurfa Birecik ve Karkamış üzerinden Suriye topraklarına girer; Dicle ile birleşip Şattülarap olarak Basra'ya dökülür.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas02",
    text: "Fırat Nehri'nin iki ana kolundan Karasu kolunun doğduğu Dumlu Dağları hangi ilimizdedir?",
    answer: 25,
    explanation:
      "Karasu Nehri, Erzurum Dumlu Dağları'ndan doğar; Erzincan Ovası'nı geçip Keban'da Murat Nehri ile birleşerek Fırat'ı oluşturur.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas03",
    text: "Fırat Nehri'nin en uzun kolu olan ve Van Gölü kuzeyinden doğan Murat Nehri hangi ovamızdan ve ilimizden geçer?",
    answer: 49,
    explanation:
      "Murat Nehri, Ağrı Aladağlar'dan doğup Muş Ovası ve Elazığ üzerinden Keban Baraj Gölü'ne ulaşır.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas04",
    text: "Hazar Gölü yakınlarından doğup Diyarbakır ve Batman ovalarını geçerek Basra Körfezi'ne yönelen Dicle Nehri hangi ilimizdedir?",
    answer: 21,
    explanation:
      "Dicle Nehri, Elazığ/Diyarbakır sınırından doğar, Diyarbakır surları dibindeki On Gözlü Köprü'den geçerek güneydoğuya akar.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas05",
    text: "Dicle Nehri'nin Doğu Anadolu'dan gelen en önemli kollarından Botan Çayı hangi ilimizdedir?",
    answer: 56,
    explanation:
      "Botan Çayı, Van ve Siirt dağlarından süzülüp Siirt'in derin kanyonlarından geçerek Dicle'ye katılır.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas06",
    text: "Türkiye'nin en engebeli coğrafyasında derin kanyonlar açarak Irak sınırına doğru akan ve Dicle'ye katılan Zap Suyu hangi ilimizdedir?",
    answer: 30,
    explanation:
      "Zap Suyu, Hakkari ilinin sarp dağları arasından geçerek Irak sınırında Dicle'ye bağlanan çok hızlı bir akarsudur.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas07",
    text: "Ermenistan, Azerbaycan ve İran ile sınırlarımızı oluşturarak Hazar Denizi kapalı havzasına dökülen Aras Nehri hangi ilimizden çıkar?",
    answer: 76,
    explanation:
      "Aras Nehri, Erzurum'dan doğar; Kars ve Iğdır ovalarını geçerek Azerbaycan-Ermenistan-İran sınırında Hazar Denizi'ne yönelir.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas08",
    text: "Türkiye-Ermenistan sınırını çizen ve Ani Harabeleri dibinden geçen Aras'ın kolu Arpaçay hangi ilimizdedir?",
    answer: 36,
    explanation:
      "Arpaçay, Çıldır Gölü'nden doğup Kars'ta Türkiye-Ermenistan sınırını çizen ve Aras Nehri'ne karışan akarsudur.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },
  {
    id: "geo-akar-bas09",
    text: "Ardahan platosundan doğup Gürcistan ve Azerbaycan üzerinden geçerek Hazar Denizi'ne dökülen Kura Nehri hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Kura Nehri, Ardahan ilinden doğar, Gürcistan'a geçer ve Azerbaycan'da Aras ile birleşerek Hazar kapalı havzasına dökülür.",
    category: "akarsular",
    categoryLabel: "Basra & Hazar Havzaları",
  },

  // ── KÖRFEZLER & YARIMADALAR — 1. KARADENİZ KIYILARI ──
  {
    id: "geo-korf-kar01",
    text: "Türkiye'nin en kuzey noktası İnceburun'u barındıran ve Karadeniz'in tek doğal limanı olan Sinop Yarımadası hangi ilimizdedir?",
    answer: 57,
    explanation:
      "Sinop Yarımadası (İnceburun), dalga birikimiyle karaya bağlanmış bir tombolo olup Karadeniz'deki tek korunaklı doğal limandır.",
    category: "korfezler",
    categoryLabel: "Karadeniz Kıyıları",
  },

  // ── KÖRFEZLER & YARIMADALAR — 2. MARMARA DENİZİ KIYILARI ──
  {
    id: "geo-korf-mar01",
    text: "Sanayi ve liman faaliyetlerinin en yoğun olduğu, kirlilik oranı yüksek İzmit Körfezi hangi ilimizdedir?",
    answer: 41,
    explanation:
      "İzmit Körfezi, Kocaeli ilinde yer alan, üzerinde Osman Gazi Köprüsü bulunan ve sanayileşmenin en yoğun olduğu iç körfezdir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar02",
    text: "Marmara Denizi'nin güneydoğusunda zeytinlikleri ve limanıyla bilinen Gemlik Körfezi hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Gemlik Körfezi, Bursa ili sınırları içinde yer alan korunaklı bir Marmara körfezidir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar03",
    text: "Güney Marmara'nın en işlek limanına ev sahipliği yapan Bandırma Körfezi hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Bandırma Körfezi, Balıkesir ilinde Kapıdağ Yarımadası'nın doğusunda yer alan stratejik bir ticaret ve sanayi körfezidir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar04",
    text: "Kapıdağ Yarımadası'nın batı yakasında yer alan turistik Erdek Körfezi hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Erdek Körfezi, Balıkesir ilinde Kapıdağ Yarımadası'nın batısında plajları ve tatil merkezleriyle öne çıkan körfezdir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar05",
    text: "Dünyada kendi kendini temizleyen üç körfezden biri sayılan ve dalış turizmiyle ünlü Saros Körfezi hangi ilimizdedir?",
    answer: 17,
    explanation:
      "Saros Körfezi, Çanakkale (ve Edirne) kıyısında yer alan, güçlü dip akıntıları sayesinde kendi kendini temizleyen eşsiz bir körfezdir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar06",
    text: "İstanbul Boğazı ile ikiye ayrılan, Türkiye'nin nüfus ve sanayi merkezi Çatalca-Kocaeli Yarımadası hangi metropolümüzü kapsar?",
    answer: 34,
    explanation:
      "Çatalca (Avrupa) ve Kocaeli (Asya) yarımadaları, İstanbul Boğazı'nın iki yakasında yükselen Türkiye'nin ekonomik merkezidir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar07",
    text: "İzmit ile Gemlik körfezleri arasında Marmara'ya doğru uzanan Armutlu Yarımadası hangi ilimizdedir?",
    answer: 77,
    explanation:
      "Armutlu Yarımadası, Yalova ili topraklarını kapsayan, kaplıcaları ve kıyı turizmiyle ünlü yarımadadır.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar08",
    text: "Eski bir adanın kıyı oku ile karaya bağlanması sonucu oluşan Türkiye'nin en belirgin tombolo (saplı ada) örneği Kapıdağ Yarımadası hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Kapıdağ Yarımadası, Balıkesir ilinde yer alan coğrafya sınavlarının klasik tombolo (saplı ada) soru örneğidir.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar09",
    text: "Çanakkale Savaşları'nın geçtiği Tarihi Alanı barındıran Gelibolu Yarımadası hangi ilimizdedir?",
    answer: 17,
    explanation:
      "Gelibolu Yarımadası, Çanakkale Boğazı'nın Avrupa/Trakya yakasını oluşturan tarihi milli park alanıdır.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },
  {
    id: "geo-korf-mar10",
    text: "Çanakkale Boğazı'nın Anadolu yakasını oluşturan ve Kaz Dağları'na kadar uzanan Biga Yarımadası hangi ilimizdedir?",
    answer: 17,
    explanation:
      "Biga Yarımadası, Çanakkale ilinin Anadolu yakasındaki topraklarını kapsayan geniş yarımadadır.",
    category: "korfezler",
    categoryLabel: "Marmara Kıyıları",
  },

  // ── KÖRFEZLER & YARIMADALAR — 3. EGE DENİZİ KIYILARI ──
  {
    id: "geo-korf-ege01",
    text: "Kaz Dağları eteklerinde yer alan, oksijen zenginliği ve zeytinciliğiyle ünlü Edremit Körfezi hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Edremit Körfezi, Balıkesir (Ayvalık, Edremit, Burhaniye) ile Çanakkale sınırında yer alan Ege'nin kuzey körfezidir.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege02",
    text: "Bakırçay deltasının döküldüğü yerde bulunan ve yeni büyük liman projesine ev sahipliği yapan Çandarlı Körfezi hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Çandarlı Körfezi, İzmir'in Dikili ve Bergama ilçeleri sahilinde yer alan stratejik körfezdir.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege03",
    text: "Türkiye'nin en işlek ihracat limanlarından birine sahip olan İzmir Körfezi hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir Körfezi, Gediz Nehri'nin taşıdığı alüvyonlarla zamanla daralan, Ege'nin en büyük ticaret körfezidir.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege04",
    text: "Bodrum Yarımadası'nın kuzeyinde yer alan ve balık çiftlikleriyle bilinen Güllük (Mandalya) Körfezi hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Güllük Körfezi, Muğla'nın Milas ve Bodrum ilçeleri arasında yer alan körfezdir.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege05",
    text: "Bodrum ile Datça yarımadaları arasında yer alan, Mavi Yolculuk'un göz bebeği Gökova Körfezi hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Gökova Körfezi, Muğla ilinde Akyaka, Sedir (Kleopatra) Adası ve eşsiz koyları barındıran Ege körfezidir.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege06",
    text: "İzmir Körfezi'nin güneybatısını çevreleyen ve Çeşme-Alaçatı'yı da içeren Urla Yarımadası hangi ilimizdedir?",
    answer: 35,
    explanation:
      "Urla Yarımadası, İzmir ilinde Urla, Seferihisar, Çeşme ve Karaburun'u kapsayan Ege'nin büyük yarımadasıdır.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege07",
    text: "Büyük Menderes Deltası'nın kuzeyinde yer alan ve Milli Park olan Dilek Yarımadası hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Dilek Yarımadası (Kalamaki), Aydın'ın Kuşadası ve Söke ilçelerinde yer alan zengin yaban hayatına sahip milli park yarımadasıdır.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege08",
    text: "Ege Denizi ile Akdeniz'i birbirinden ayıran doğal coğrafi sınır kabul edilen Datça (Reşadiye) Yarımadası hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Datça Yarımadası, Muğla ilinde Ege ile Akdeniz sularını ayıran, batı ucunda Knidos Antik Kenti bulunan ince uzun yarımadadır.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },
  {
    id: "geo-korf-ege09",
    text: "Güllük ile Gökova körfezleri arasında uzanan dünyaca ünlü turizm merkezi Bodrum Yarımadası hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Bodrum Yarımadası, Muğla ilinde yer alan beyaz evleri, koyları ve kalesiyle ünlü uluslararası turizm yarımadasıdır.",
    category: "korfezler",
    categoryLabel: "Ege Kıyıları",
  },

  // ── KÖRFEZLER & YARIMADALAR — 4. AKDENİZ KIYILARI ──
  {
    id: "geo-korf-akd01",
    text: "Göcek adaları ve Ölüdeniz kıyılarını barındıran yat turizmi merkezi Fethiye Körfezi hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Fethiye Körfezi, Muğla ilinde Ege-Akdeniz geçişinde yer alan ve mavi tur teknelerinin uğrak noktası olan körfezdir.",
    category: "korfezler",
    categoryLabel: "Akdeniz Kıyıları",
  },
  {
    id: "geo-korf-akd02",
    text: "Teke Yarımadası ile Taşeli Platosu arasında yer alan Türkiye'nin en büyük güney körfezi Antalya Körfezi hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Antalya Körfezi, Akdeniz Bölgesi'nde turizm kıyılarımızın merkezinde yer alan devasa hilal biçimli körfezdir.",
    category: "korfezler",
    categoryLabel: "Akdeniz Kıyıları",
  },
  {
    id: "geo-korf-akd03",
    text: "Amanos Dağları'nın batısında yer alan, ağır sanayi ve liman kenti İskenderun Körfezi hangi ilimizdedir?",
    answer: 31,
    explanation:
      "İskenderun Körfezi, Hatay ilinde yer alan, demir-çelik sanayisi ve petrol boru hatlarıyla Türkiye'nin en doğudaki Akdeniz körfezidir.",
    category: "korfezler",
    categoryLabel: "Akdeniz Kıyıları",
  },
  {
    id: "geo-korf-akd04",
    text: "Kalkerli yapısı, dağlık engebeli arazisi ve kıl keçisi yetiştiriciliğiyle bilinen Teke Yarımadası hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Teke Yarımadası, Antalya, Muğla ve Burdur arasında Akdeniz'e doğru üçgen şeklinde uzanan karstik bir yarımadadır.",
    category: "korfezler",
    categoryLabel: "Akdeniz Kıyıları",
  },
  {
    id: "geo-korf-akd05",
    text: "Göksu Nehri vadisinin batısında ve doğusunda uzanan, engebeli karstik araziye sahip Taşeli Yarımadası hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Taşeli Yarımadası ve Platosu, Mersin (Anamur, Silifke, Mut) ile Karaman sınırlarında Akdeniz'e uzanan karstik kütledir.",
    category: "korfezler",
    categoryLabel: "Akdeniz Kıyıları",
  },

  // ── MADENLER & SANAYİ ──
  // 1. Demir
  {
    id: "geo-maden-dmr01",
    text: "Türkiye'nin en zengin demir cevheri yataklarına sahip olan Divriği maden sahası hangi ilimizdedir?",
    answer: 58,
    explanation:
      "Sivas Divriği, Türkiye demir üretiminin en büyük bölümünü karşılayan köklü maden yatağımızdır.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-dmr02",
    text: "Hekimhan ve Hasançelebi demir madeni işletmeleri hangi ilimizdedir?",
    answer: 44,
    explanation:
      "Malatya (Hekimhan ve Hasançelebi), Türkiye'nin ikinci büyük demir çıkarma ve peletleme havzasıdır.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-dmr03",
    text: "Zonguldak taş kömürü yataklarına (enerji kaynağına) yakınlık nedeniyle Türkiye'nin ilk entegre demir-çelik fabrikası (KARDEMİR) hangi ilimizde kurulmuştur?",
    answer: 78,
    explanation:
      "Karabük Demir-Çelik Fabrikası, hammaddeye değil enerji kaynağına (taş kömürüne) yakınlık ilkesiyle kurulmuştur.",
    category: "madenler",
    categoryLabel: "Sanayi Tesisleri",
  },
  {
    id: "geo-maden-dmr04",
    text: "Taş kömürü havzasına (enerji kaynağına) yakınlık ve deniz yolu ulaşımıyla Ereğli Demir-Çelik Fabrikası (ERDEMİR) hangi ilimizde kurulmuştur?",
    answer: 67,
    explanation:
      "Zonguldak Ereğli Demir-Çelik Fabrikası (ERDEMİR), taş kömürüne yakınlık ve liman avantajıyla kurulmuştur.",
    category: "madenler",
    categoryLabel: "Sanayi Tesisleri",
  },
  {
    id: "geo-maden-dmr05",
    text: "Kendi bünyesinde demir veya taş kömürü yatağı bulunmamasına rağmen, deniz ulaşımı ve liman imkanları (ithal kömür avantajı) sayesinde İSDEMİR fabrikasının kurulduğu ilimiz hangisidir?",
    answer: 31,
    explanation:
      "Hatay İskenderun Demir-Çelik Fabrikası (İSDEMİR), Akdeniz kıyısında liman ve ulaşım kolaylığı gerekçesiyle kurulmuş devasa bir tesistir.",
    category: "madenler",
    categoryLabel: "Sanayi Tesisleri",
  },

  // 2. Bakır
  {
    id: "geo-maden-bkr01",
    text: "Karadeniz Bölgesi'nin en zengin bakır madeni yataklarından Küre bakır işletmesi hangi ilimizdedir?",
    answer: 37,
    explanation:
      "Kastamonu Küre, Türkiye'nin en eski ve verimli bakır ocaklarından biridir; cevher İnebolu limanından Samsun'a sevk edilir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-bkr02",
    text: "Doğu Karadeniz'in en bilinen bakır çıkarma sahalarından Murgul (Göktaş) işletmesi hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Artvin Murgul, Türkiye bakır üretiminde çok önemli paya sahip zengin yataklardandır.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-bkr03",
    text: "Yüksek tenörlü bakır ve çinko cevherlerinin çıkarıldığı Çayeli maden sahası hangi ilimizdedir?",
    answer: 53,
    explanation:
      "Rize Çayeli, Doğu Karadeniz sahilinde yer alan modern yer altı bakır-çinko maden işletmesidir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-bkr04",
    text: "Doğu Anadolu'da tarihi cumhuriyet döneminden beri bakır çıkarımı yapılan Maden (Ergani) ilçesi hangi ilimizdedir?",
    answer: 23,
    explanation:
      "Elazığ Maden ilçesi, Doğu Anadolu'nun en köklü bakır ocaklarına ev sahipliği yapar.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-bkr05",
    text: "Kendisinde bakır madeni çıkarılmadığı halde, hinterlandı geniş limanı ve demiryolu ulaşımı nedeniyle Karadeniz Bakır İşletmesi fabrikasının kurulduğu ilimiz hangisidir?",
    answer: 55,
    explanation:
      "Samsun Bakır Fabrikası, Küre ve Murgul bakırlarının işlendiği tesistir; kurulma sebebi ulaşım ve limandır.",
    category: "madenler",
    categoryLabel: "Sanayi Tesisleri",
  },

  // 3. Boksit (Alüminyum)
  {
    id: "geo-maden-bkst01",
    text: "Alüminyumun hammaddesi olan boksitin hem çıkarıldığı hem de hammaddeye yakınlık sebebiyle entegre alüminyum tesisine sahip Seydişehir ilçesi hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Konya Seydişehir Alüminyum Tesisleri, Türkiye'nin tek birincil alüminyum üreticisidir ve hammaddeye yakın kurulmuştur.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-bkst02",
    text: "Toros Dağları kuşağında Seydişehir alüminyum tesislerini de besleyen zengin boksit yataklarına sahip Akseki ilçesi hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Antalya Akseki, Akdeniz Bölgesi'nin en önemli boksit çıkarma alanlarından biridir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-bkst03",
    text: "Ege Bölgesi'nde boksit (alüminyum) ve zımpara taşı yataklarıyla öne çıkan Milas ilçesi hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Muğla Milas, boksit cevheri ve zımpara taşı rezervleriyle bilinen Ege maden merkezidir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },

  // 4. Krom
  {
    id: "geo-maden-krm01",
    text: "Çeliği paslanmaz ve aşınmaz hale getiren krom madeninin en zengin yatağı Guleman havzası ve hammaddeye yakın Ferro-Krom fabrikası hangi ilimizdedir?",
    answer: 23,
    explanation:
      "Elazığ Guleman (Alacakaya), Türkiye'nin en büyük krom sahasıdır ve Elazığ Ferro-Krom tesisi hammaddeye yakın kurulmuştur.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-krm02",
    text: "Güneybatı Anadolu'da Fethiye ve Köyceğiz havzalarındaki zengin krom yatakları hangi ilimiz sınırlarında yer alır?",
    answer: 48,
    explanation:
      "Muğla (Fethiye ve Köyceğiz), Türkiye'nin en zengin ve ihraç edilen krom havzalarından biridir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-krm03",
    text: "Bölgesinde doğrudan krom çıkarımı olmamasına rağmen, ihracat limanı ve deniz ulaşımı kolaylığı nedeniyle Ferro-Krom tesisi kurulan Akdeniz ilimiz hangisidir?",
    answer: 7,
    explanation:
      "Antalya Ferro-Krom Fabrikası, Fethiye ve çevre yataklardan getirilen kromun ihraç limanı imkanıyla işlendiği tesistir (Ulaşım faktörü).",
    category: "madenler",
    categoryLabel: "Sanayi Tesisleri",
  },

  // 5. Barit
  {
    id: "geo-maden-brt01",
    text: "Petrol ve doğalgaz sondajlarında kuyularda basıncı artırmak amacıyla kullanılan ağır barit madeninin en çok çıkarıldığı Alanya ve Gazipaşa ilçeleri hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Antalya (Alanya ve Gazipaşa), Türkiye barit üretiminin ve barit unu ihracatının merkezidir.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 6. Bor
  {
    id: "geo-maden-bor01",
    text: "Dünya rezervinin %72'sine sahip olduğumuz bor madeninin çıkarıldığı Bigadiç ve Susurluk ile deniz ulaşımı/ihracat limanı avantajıyla kurulan Boraks Fabrikası (Bandırma) hangi ilimizdedir?",
    answer: 10,
    explanation:
      "Balıkesir Bigadiç ve Susurluk'ta kolemanit bor çıkarılır; Bandırma Boraks Fabrikası ise liman ve demiryolu avantajıyla (ulaşım) kurulmuştur.",
    category: "madenler",
    categoryLabel: "Stratejik Madenler",
  },
  {
    id: "geo-maden-bor02",
    text: "Türkiye'nin en büyük bor rezerv ve rafine bor türevleri fabrikası Kırka Bor İşletmesi hammaddeye yakınlık sebebiyle hangi ilimizde kurulmuştur?",
    answer: 26,
    explanation:
      "Eskişehir Seyitgazi (Kırka), dünya tinkal bor rezervinin devasa kısmını barındırır ve hammaddeye yakınlık ilkesiyle dev fabrikaya sahiptir.",
    category: "madenler",
    categoryLabel: "Stratejik Madenler",
  },
  {
    id: "geo-maden-bor03",
    text: "Büyük kolemanit bor yataklarının bulunduğu ve borik asit fabrikasına sahip Emet ilçesi hangi ilimizdedir?",
    answer: 43,
    explanation:
      "Kütahya Emet, Eti Maden bünyesinde borik asit üreten önemli bir bor sahasıdır.",
    category: "madenler",
    categoryLabel: "Stratejik Madenler",
  },
  {
    id: "geo-maden-bor04",
    text: "Güney Marmara bor kuşağında yer alan Mustafakemalpaşa bor yatakları hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Bursa Mustafakemalpaşa, Türkiye'nin ana bor havzaları (Balıkesir, Kütahya, Eskişehir, Bursa) içinde yer alır.",
    category: "madenler",
    categoryLabel: "Stratejik Madenler",
  },

  // 7. Mermer
  {
    id: "geo-maden-mrm01",
    text: "Kalker kayaçlarının başkalaşımıyla oluşan, Türkiye'nin blok ve işlenmiş mermer ihracat başkenti kabul edilen ilimiz hangisidir?",
    answer: 3,
    explanation:
      "Afyonkarahisar (İscehisar), antik çağlardan bu yana dünyaca ünlü beyaz mermer ocakları ve entegre fabrikalarıyla liderdir.",
    category: "madenler",
    categoryLabel: "Taş & Yapı Madenleri",
  },
  {
    id: "geo-maden-mrm02",
    text: "Adını sahip olduğu zengin mermer ocaklarından alan ve antik anıtlarda kullanılan Marmara Adası hangi ilimize bağlıdır?",
    answer: 10,
    explanation:
      "Balıkesir'e bağlı Marmara Adası, Türkiye'nin en eski ve zengin beyaz/gri mermer yataklarına ev sahipliği yapar.",
    category: "madenler",
    categoryLabel: "Taş & Yapı Madenleri",
  },

  // 8. Fosfat
  {
    id: "geo-maden-fsf01",
    text: "Suni kimyasal gübre sanayisinin hammaddesi olan ve Türkiye'deki en önemli çıkarma sahası ile entegre gübre tesisi Mazıdağı'nda bulunan ilimiz hangisidir?",
    answer: 47,
    explanation:
      "Mardin Mazıdağı, Türkiye'deki tek kayda değer fosfat sahasıdır; hammadde yetersiz olduğundan Türkiye fosfatı büyük oranda ithal eder.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 9. Asbest
  {
    id: "geo-maden-asb01",
    text: "Isıya, sürtünmeye ve aleve dayanıklı lifli yapısına rağmen kanserojen etkisi nedeniyle kullanımı sınırlandırılan asbest (amyant) yataklarının bulunduğu ilimiz hangisidir?",
    answer: 26,
    explanation:
      "Eskişehir (Mihalıççık) ve Sivas yöresinde asbest yatakları yer alır; günümüzde sağlık riskleri nedeniyle yasaklı maden statüsündedir.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 10. Trona (Soda Külü)
  {
    id: "geo-maden-trn01",
    text: "Cam ve deterjan sanayisinde temel girdi olan dünyanın sayılı doğal soda külü (trona) yataklarının bulunduğu Beypazarı ve Kazan ilçeleri hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Ankara (Beypazarı ve Kahramankazan), dünya çapında ikinci en zengin trona yataklarına sahip olup dev şişecam tesislerine hammadde sağlar.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 11. Altın
  {
    id: "geo-maden-alt01",
    text: "Türkiye'de modern yöntemlerle ilk altın çıkarımının yapıldığı Bergama (Ovacık) altın madeni hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir Bergama Ovacık, Türkiye'nin cumhuriyet dönemindeki ilk modern altın madeni işletmesidir.",
    category: "madenler",
    categoryLabel: "Değerli Madenler",
  },
  {
    id: "geo-maden-alt02",
    text: "Kafkas ekosisteminde yer alan, altın, bakır ve gümüş rezervleriyle gündemde olan Cerattepe maden sahası hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Artvin Cerattepe, Doğu Karadeniz dağlarında yüksek tenörlü altın ve polimetalik maden sahasıdır.",
    category: "madenler",
    categoryLabel: "Değerli Madenler",
  },
  {
    id: "geo-maden-alt03",
    text: "Mastra altın madeni sahası Doğu Karadeniz'in hangi ilindedir?",
    answer: 29,
    explanation:
      "Gümüşhane Mastra, yer altı madenciliğiyle işletilen zengin altın yataklarından biridir.",
    category: "madenler",
    categoryLabel: "Değerli Madenler",
  },

  // 12. Nükleer Enerji (Uranyum & Toryum)
  {
    id: "geo-maden-urn01",
    text: "Nükleer santrallerin yakıtı olan uranyum cevheri yataklarının bulunduğu Sorgun ilçesi hangi ilimizdedir?",
    answer: 66,
    explanation:
      "Yozgat Sorgun, Türkiye'nin bilinen en önemli uranyum yatağı havzasıdır.",
    category: "madenler",
    categoryLabel: "Enerji Hammaddeleri",
  },
  {
    id: "geo-maden-try01",
    text: "Geleceğin temiz nükleer enerjisi sayılan ve dünyada ikinci büyük toryum yataklarına sahip Sivrihisar ilçesi hangi ilimizdedir?",
    answer: 26,
    explanation:
      "Eskişehir Sivrihisar (Beylikova), dünyaca ünlü toryum ve nadir toprak elementleri yataklarına ev sahipliği yapar.",
    category: "madenler",
    categoryLabel: "Enerji Hammaddeleri",
  },

  // 13. Cıva
  {
    id: "geo-maden-cva01",
    text: "Doğada oda sıcaklığında sıvı halde bulunan tek maden olan cıvanın en önemli tarihi yatakları Karaburun ve Ödemiş hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir (Karaburun, Ödemiş) ve Konya (Sarayönü), Türkiye'nin cıva yataklarıdır; zehirli etkisi sebebiyle üretimi durdurulmuştur.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },

  // 14. Tuz
  {
    id: "geo-maden-tuz01",
    text: "Hititler döneminden beri işletilen ve yerin yüzlerce metre altındaki dev galerilere sahip kaya tuzu mağarası hangi ilimizdedir?",
    answer: 18,
    explanation:
      "Çankırı Kaya Tuzu Mağarası, binlerce yıllık geçmişe sahip Türkiye'nin en büyük kaya tuzu madenidir.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },
  {
    id: "geo-maden-tuz02",
    text: "Deniz suyundan buharlaştırma yöntemiyle tuz elde edilen Türkiye'nin en büyük deniz tuzlası Çamaltı Tuzlası hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir Çamaltı Tuzlası (Gediz Deltası), Türkiye deniz tuzu üretiminin neredeyse tamamını karşılar.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },
  {
    id: "geo-maden-tuz03",
    text: "Doğu Anadolu Bölgesi'nde devasa kaya tuzu mağaralarına ve sağlık turizmine sahip Tuzluca ilçesi hangi ilimizdedir?",
    answer: 76,
    explanation:
      "Iğdır Tuzluca, Aras Vadisi'nde yer alan zengin kaya tuzu yataklarına sahiptir.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 15. Perlit & Pomza
  {
    id: "geo-maden-prl01",
    text: "İnci taşı olarak adlandırılan, ısıtıldığında mısır gibi patlayıp genleşen volkanik camsı perlit yatakları en çok hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir (Bergama) ve çevresi, inşaat, tarım ve sanayide yalıtım malzemesi olarak kullanılan perlitin lider üretim yeridir.",
    category: "madenler",
    categoryLabel: "Taş & Yapı Madenleri",
  },
  {
    id: "geo-maden-pmz01",
    text: "Volkanik kökenli, gözenekli ve hafif süngertaşı olan pomzanın (briket yalıtım ve tekstil taşı) en çok çıkarıldığı Kapadokya ili hangisidir?",
    answer: 50,
    explanation:
      "Nevşehir ve Kayseri, volkanik tüf ve pomza rezervlerinde Türkiye'nin kalbidir.",
    category: "madenler",
    categoryLabel: "Taş & Yapı Madenleri",
  },

  // 16. Kurşun ve Çinko
  {
    id: "geo-maden-krs01",
    text: "Fırat kıyısında yer alan, kurşun ve çinko yataklarıyla ünlü tarihi Keban maden havzası hangi ilimizdedir?",
    answer: 23,
    explanation:
      "Elazığ Keban, Türkiye'nin en eski ve zengin kurşun-gümüş-çinko madeni sahalarından biridir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },
  {
    id: "geo-maden-krs02",
    text: "İç Anadolu'da kurşun ve çinko madenleriyle tanınan Akdağmadeni ilçesi hangi ilimizdedir?",
    answer: 66,
    explanation:
      "Yozgat Akdağmadeni, çinko ve kurşun cevheri işletmeciliğinde köklü bir geçmişe sahiptir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },

  // 17. Oltu Taşı & Lületaşı
  {
    id: "geo-maden-olt01",
    text: "Siyah kehribar olarak adlandırılan, süs eşyası ve tespih yapımında kullanılan oltu taşı hangi ilimizin adıyla anılır?",
    answer: 25,
    explanation:
      "Erzurum Oltu ilçesi, dünyada tescilli oltu taşının çıkarıldığı tek adrestir.",
    category: "madenler",
    categoryLabel: "Değerli Madenler",
  },
  {
    id: "geo-maden-lul01",
    text: "Beyaz renkli, hafif, işlenmesi kolay 'beyaz altın' lakaplı lületaşı (sepiyolit) pipo ve takı üretiminde hangi ilimizde çıkarılır?",
    answer: 26,
    explanation:
      "Eskişehir, dünyadaki en kaliteli ve işlenebilir lületaşı yataklarına sahiptir.",
    category: "madenler",
    categoryLabel: "Değerli Madenler",
  },

  // 18. Feldspat
  {
    id: "geo-maden-fld01",
    text: "Cam, seramik ve porselen sanayisinde kullanılan ve Türkiye'nin dünyaya ihraç ettiği feldspat madeninin merkezi Çine ilçesi hangi ilimizdedir?",
    answer: 9,
    explanation:
      "Aydın Çine, dünya seramik sektörünün en kaliteli sodyum ve potasyum feldspat madeni sahasıdır.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 19. Kükürt
  {
    id: "geo-maden-kkr01",
    text: "Geçmişte tarımsal ilaçlamada ve bağcılıkta kullanılan, ancak rezervleri tükendiği için işletmesi kapatılan tarihi kükürt fabrikası (Keçiborlu) hangi ilimizdedir?",
    answer: 32,
    explanation:
      "Isparta Keçiborlu kükürt işletmesi, Cumhuriyetin ilk maden tesislerindendi; günümüzde kükürt petrol rafinerilerinden elde edilir.",
    category: "madenler",
    categoryLabel: "Metal Dışı Madenler",
  },

  // 20. Volfram (Tungsten)
  {
    id: "geo-maden-vlf01",
    text: "Erime noktası 3400°C'yi aşan, uzay ve özel çelik sanayisinde kullanılan volfram (tungsten) yatakları Uludağ eteklerinde hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Bursa Uludağ volfram madeni, yüksek ısıya dayanıklı stratejik metallerin Türkiye'deki ana yatağıdır.",
    category: "madenler",
    categoryLabel: "Stratejik Madenler",
  },

  // 21. Manganez
  {
    id: "geo-maden-mng01",
    text: "Demiri sertleştirip çeliğe dayanıklılık kazandırmak amacıyla kullanılan manganez yataklarının demir-çelik sanayisine yakın bulunduğu Ereğli sahası hangi ilimizdedir?",
    answer: 67,
    explanation:
      "Zonguldak Ereğli, demir-çelik fabrikalarının alaşım ihtiyacı için işletilen manganez sahasına sahiptir.",
    category: "madenler",
    categoryLabel: "Metalik Madenler",
  },

  // ── ENERJİ KAYNAKLARI & SANTRALLER ──
  // 1. Taş Kömürü
  {
    id: "geo-enj-tk01",
    text: "I. Jeolojik Zaman'da (Paleozoik) oluşan ve Türkiye'de sadece Batı Karadeniz'de çıkarılan taş kömürünün ana havzaları Kozlu ve Karadon hangi ilimizdedir?",
    answer: 67,
    explanation:
      "Zonguldak Kozlu ve Karadon havzaları, demir-çelik sanayisinde kok kömürü olarak yüksek ısı veren taş kömürünün çıkarıldığı merkezdir.",
    category: "enerji",
    categoryLabel: "Fosil Yakıtlar",
  },
  {
    id: "geo-enj-tk02",
    text: "Batı Karadeniz taş kömürü havzasının doğu uzantısında yer alan Amasra kömür işletmeleri hangi ilimizdedir?",
    answer: 74,
    explanation:
      "Bartın Amasra, Zonguldak havzasının devamı niteliğindeki önemli taş kömürü çıkarma sahamızdır.",
    category: "enerji",
    categoryLabel: "Fosil Yakıtlar",
  },
  {
    id: "geo-enj-tk03",
    text: "Türkiye'nin yerli taş kömürüyle çalışan ve hammaddeye yakınlık sebebiyle kurulan tek termik santrali Çatalağzı Termik Santrali hangi ilimizdedir?",
    answer: 67,
    explanation:
      "Zonguldak Çatalağzı Termik Santrali, yerli taş kömürü yataklarına yakın kurulmuş ilk ve en önemli santrallerimizdendir.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-tk04",
    text: "Deniz ulaşımı ve liman imkanları nedeniyle ithal taş kömürüyle çalışmak üzere İskenderun Körfezi kıyısında kurulan Sugözü (İsken) Termik Santrali hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Adana Yumurtalık Sugözü Termik Santrali, liman ve deniz ulaşımı kolaylığı sebebiyle ithal kömür yakıtıyla elektrik üretir (Ulaşım faktörü).",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },

  // 2. Linyit
  {
    id: "geo-enj-lin01",
    text: "III. Jeolojik Zaman'da oluşmuş, Türkiye'nin en büyük linyit rezervine ve en büyük linyit termik santraline sahip Afşin-Elbistan havzası hangi ilimizdedir?",
    answer: 46,
    explanation:
      "Kahramanmaraş Afşin-Elbistan, Türkiye linyit rezervinin neredeyse yarısını barındıran dev elektrik üretim merkezidir.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-lin02",
    text: "İç Anadolu'da yerli linyit kömürü ile çalışan ve başkente enerji sağlayan Çayırhan Termik Santrali hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Ankara Çayırhan Termik Santrali, Nallıhan-Beypazarı bölgesindeki linyit yataklarına yakın kurulmuştur.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-lin03",
    text: "Güney Marmara'da zengin linyit yataklarına sahip ve 18 Mart Termik Santrali'ne ev sahipliği yapan Çan ilçesi hangi ilimizdedir?",
    answer: 17,
    explanation:
      "Çanakkale Çan, zengin linyit yataklarıyla termik santral ve seramik fabrikalarının enerji ihtiyacını karşılar.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-lin04",
    text: "Ege Bölgesi'nde yerli linyitle çalışan Yatağan Termik Santrali hangi ilimizdedir?",
    answer: 48,
    explanation:
      "Muğla Yatağan (ayrıca Yeniköy ve Kemerköy), Ege'nin linyit yakıtlı elektrik üretim santrallerine ev sahipliği yapar.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-lin05",
    text: "Türkiye'nin en büyük ve köklü yer altı linyit havzalarından biri olan, adına kurulu dev termik santraliyle ünlü Soma hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Manisa Soma, yüksek kalorili linyit üretimi ve termik santraliyle Ege Bölgesi'nin enerji lokomotifidir.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-lin06",
    text: "Seyitömer, Tunçbilek ve Değirmisaz gibi Türkiye'nin en verimli linyit havzaları ve termik santrallerine ev sahipliği yapan ilimiz hangisidir?",
    answer: 43,
    explanation:
      "Kütahya (Tunçbilek ve Seyitömer), linyit madenciliği ve santralleriyle Türkiye elektrik üretiminde öncü ildir.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-lin07",
    text: "Orta Karadeniz kuşağında linyit çıkarılan Dodurga maden sahası hangi ilimizdedir?",
    answer: 19,
    explanation:
      "Çorum Dodurga, bölgedeki sanayi ve ısınma amaçlı linyit madeni ocaklarıyla bilinir.",
    category: "enerji",
    categoryLabel: "Fosil Yakıtlar",
  },
  {
    id: "geo-enj-lin08",
    text: "Çeltek linyit işletmeleri ve maden havzası hangi ilimizdedir?",
    answer: 5,
    explanation:
      "Amasya Çeltek (Suluova), köklü linyit madeni işletmelerine sahiptir.",
    category: "enerji",
    categoryLabel: "Fosil Yakıtlar",
  },

  // 3. Petrol
  {
    id: "geo-enj-pet01",
    text: "Türkiye'de petrolün ilk kez 1940 yılında keşfedildiği ve üretildiği Raman Dağı hangi ilimizdedir?",
    answer: 72,
    explanation:
      "Batman Raman Dağı, Türkiye'de modern petrol keşfinin ve yerli petrol üretiminin doğduğu tarihi sahadır.",
    category: "enerji",
    categoryLabel: "Petrol & Doğal Gaz",
  },
  {
    id: "geo-enj-pet02",
    text: "Türkiye'de hammaddeye yakınlık gerekçesiyle petrolün çıkarıldığı yerde kurulan tek rafineri olan Batman Rafinerisi hangi ilimizdedir?",
    answer: 72,
    explanation:
      "Batman Petrol Rafinerisi, çıkarılan yerli petrolün işlenmesi amacıyla hammaddeye yakınlık ilkesiyle kurulmuştur.",
    category: "enerji",
    categoryLabel: "Rafineriler",
  },
  {
    id: "geo-enj-pet03",
    text: "Marmara Bölgesi'nde tüketim pazarına ve deniz ulaşımına yakınlık sebebiyle kurulan İPRAŞ (Tüpraş) Rafinerisi hangi ilimizdedir?",
    answer: 41,
    explanation:
      "Kocaeli (İzmit) Rafinerisi, Türkiye sanayisinin ve akaryakıt tüketiminin kalbinde pazar ve ulaşım kolaylığıyla kurulmuştur.",
    category: "enerji",
    categoryLabel: "Rafineriler",
  },
  {
    id: "geo-enj-pet04",
    text: "Deniz yoluyla ithal edilen ham petrolün işlenmesi ve ihracat kolaylığı için kurulan ALİAĞA ve STAR rafinerileri hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir Aliağa, derin su limanı ve petrokimya entegrasyonu sayesinde dev petrol rafinerilerine ev sahipliği yapar.",
    category: "enerji",
    categoryLabel: "Rafineriler",
  },
  {
    id: "geo-enj-pet05",
    text: "Akdeniz kıyısında petrol depolama, dağıtım ve terminali olarak faaliyet gösteren ATAŞ tesisi hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Mersin ATAŞ, geçmişte rafineri iken günümüzde Akdeniz'in en stratejik petrol depolama ve akaryakıt terminali olarak hizmet verir.",
    category: "enerji",
    categoryLabel: "Rafineriler",
  },
  {
    id: "geo-enj-pet06",
    text: "İç pazar tüketimine, askeri stratejiye ve orta Anadolu dağıtım merkezine yakınlık nedeniyle kurulan Orta Anadolu Rafinerisi hangi ilimizdedir?",
    answer: 71,
    explanation:
      "Kırıkkale Orta Anadolu Rafinerisi, denizden uzak iç bölgede askeri ve stratejik güvenlik gerekçeleriyle kurulmuştur.",
    category: "enerji",
    categoryLabel: "Rafineriler",
  },
  {
    id: "geo-enj-pet07",
    text: "Irak (Kerkük) ve Hazar/Azerbaycan (Bakü) petrollerini taşıyan uluslararası boru hatlarının Akdeniz'e ulaştığı dev deniz terminali Ceyhan hangi ilimizdedir?",
    answer: 1,
    explanation:
      "Adana Ceyhan (Haydar Aliyev ve BOTAŞ terminalleri), Kerkük-Yumurtalık ve BTC hatlarının sonlandığı küresel bir enerji limanıdır.",
    category: "enerji",
    categoryLabel: "Boru Hatları",
  },

  // 4. Doğal Gaz
  {
    id: "geo-enj-gaz01",
    text: "Trakya'da yerli doğal gazın çıkarıldığı ve Türkiye'nin ilk doğal gaz kombine çevrim santraline sahip Hamitabat havzası hangi ilimizdedir?",
    answer: 39,
    explanation:
      "Kırklareli Hamitabat, hem yerli doğal gaz çıkarılan hem de hammaddeye yakın santrali bulunan önemli bir enerji merkezidir.",
    category: "enerji",
    categoryLabel: "Petrol & Doğal Gaz",
  },
  {
    id: "geo-enj-gaz02",
    text: "Batı Karadeniz açıklarında keşfedilen doğal gazın karaya çıkarıldığı Akçakoca doğal gaz havzası hangi ilimizdedir?",
    answer: 81,
    explanation:
      "Düzce Akçakoca, Karadeniz deniz sahasından gaz çıkarılan ve kıyıya ulaştırılan sahadır.",
    category: "enerji",
    categoryLabel: "Petrol & Doğal Gaz",
  },
  {
    id: "geo-enj-gaz03",
    text: "Güneydoğu Anadolu'da yerli doğal gaz çıkarılan Çamurlu havzası hangi ilimizdedir?",
    answer: 47,
    explanation:
      "Mardin Çamurlu, Güneydoğu Anadolu Bölgesi'nde doğal gaz rezervi işletilen önemli bir sahadır.",
    category: "enerji",
    categoryLabel: "Petrol & Doğal Gaz",
  },
  {
    id: "geo-enj-gaz04",
    text: "Marmara'da sanayinin elektrik ihtiyacını karşılamak üzere doğal gazla çalışan dev Ovaakça Termik Santrali hangi ilimizdedir?",
    answer: 16,
    explanation:
      "Bursa Ovaakça Doğal Gaz Çevrim Santrali, tüketim merkezine yakınlık nedeniyle kurulmuş yüksek kapasiteli santraldir.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-gaz05",
    text: "Türkiye'nin en büyük metropolünün elektrik ihtiyacını karşılayan devasa Ambarlı Doğal Gaz Santrali hangi ilimizdedir?",
    answer: 34,
    explanation:
      "İstanbul Ambarlı (Avcılar), doğal gaz ve fuel-oil yakıtlı üniteleriyle pazar tüketimine yakınlık gereği kurulmuştur.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },
  {
    id: "geo-enj-gaz06",
    text: "Türkiye'nin deniz altında devasa hacme sahip ilk Yer Altı Doğal Gaz Depolama Tesisi'nin bulunduğu Silivri ilçesi hangi ilimizdedir?",
    answer: 34,
    explanation:
      "İstanbul Silivri Kuzey Marmara ve Değirmenköy sahalarında, kış aylarındaki gaz talebini dengelemek için dev depolama tesisi kurulmuştur.",
    category: "enerji",
    categoryLabel: "Depolama Tesisleri",
  },
  {
    id: "geo-enj-gaz07",
    text: "Rusya'dan Karadeniz'in tabanından geçerek Samsun kıyısından Türkiye'ye giriş yapan Mavi Akım doğal gaz boru hattı hangi ilimizden karaya çıkar?",
    answer: 55,
    explanation:
      "Samsun (Durusu), Karadeniz altından 2150 metre derinliği aşarak Rus gazını getiren Mavi Akım boru hattının giriş noktasıdır.",
    category: "enerji",
    categoryLabel: "Boru Hatları",
  },
  {
    id: "geo-enj-gaz08",
    text: "Rusya'dan Karadeniz altından Trakya'ya ulaşan ve Kıyıköy üzerinden Avrupa'ya bağlanan Türk Akımı hattının Türkiye'ye girdiği ilimiz hangisidir?",
    answer: 39,
    explanation:
      "Kırklareli Kıyıköy (Vize), Türk Akımı doğal gaz hattının karaya çıktığı kabul ve dağıtım terminalidir.",
    category: "enerji",
    categoryLabel: "Boru Hatları",
  },
  {
    id: "geo-enj-gaz09",
    text: "Azerbaycan Şahdeniz gazını Türkiye üzerinden Avrupa'ya taşıyan TANAP boru hattının Gürcistan üzerinden Türkiye'ye ilk giriş yaptığı sınır kapısı (Türkgözü) hangi ilimizdedir?",
    answer: 75,
    explanation:
      "Ardahan (Posof Türkgözü), Güney Gaz Koridoru ve TANAP boru hattının Türkiye sınırlarına girdiği başlangıç ilidir.",
    category: "enerji",
    categoryLabel: "Boru Hatları",
  },

  // 5. Asfaltit
  {
    id: "geo-enj-asf01",
    text: "Katılaşmış petrol türevi olan asfaltitin çıkarıldığı ve Türkiye'nin tek asfaltit termik santralinin bulunduğu Silopi ilçesi hangi ilimizdedir?",
    answer: 73,
    explanation:
      "Şırnak Silopi, zengin asfaltit yatakları ve Türkiye'nin tek asfaltit yakıtlı Silopi Termik Santrali ile özdeşleşmiştir.",
    category: "enerji",
    categoryLabel: "Termik Santraller",
  },

  // 6. Hidroelektrik (Su Gücü)
  {
    id: "geo-enj-hes01",
    text: "Fırat Nehri üzerinde GAP kapsamında kurulan, Türkiye'nin en büyük gövde hacmine ve en yüksek hidroelektrik üretim kapasitesine sahip Atatürk Barajı hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Şanlıurfa ve Adıyaman sınırındaki Atatürk Barajı ve HES, Türkiye hidroelektrik üretiminin amiral gemisidir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes02",
    text: "Dicle Nehri üzerinde kurulan ve Güneydoğu Anadolu'nun en büyük hidroelektrik üretim barajlarından biri olan Ilısu (Prof. Dr. Veysel Eroğlu) Barajı hangi ilimizdedir?",
    answer: 47,
    explanation:
      "Mardin (Dargeçit) ile Şırnak ve Batman sınırında yer alan Ilısu Barajı ve HES, Dicle üzerindeki en büyük elektrik santralidir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes03",
    text: "Çoruh Nehri üzerinde 275 metre gövde yüksekliğiyle Türkiye'nin en yüksek kemer barajı unvanına sahip olan devasa Yusufeli Barajı ve HES hangi ilimizdedir?",
    answer: 8,
    explanation:
      "Artvin Yusufeli Barajı, Deriner Barajı ile birlikte Çoruh Nehri'nin yüksek debi ve yatak eğiminden devasa elektrik üretir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes04",
    text: "Manavgat Nehri'nin karstik kanyon vadisinde kurulu olan ve Seydişehir Alüminyum Tesisleri'ne elektrik sağlayan Oymapınar Barajı hangi ilimizdedir?",
    answer: 7,
    explanation:
      "Antalya Oymapınar Barajı, karstik kaynaklarla beslendiği için debisi yazın da yüksek kalan stratejik bir hidroelektrik santraldir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes05",
    text: "Yeşilırmak Nehri üzerinde hidroelektrik üretimi amacıyla kurulmuş Hasan Uğurlu ve Suat Uğurlu barajları hangi ilimizdedir?",
    answer: 55,
    explanation:
      "Samsun Ayvacık'ta Yeşilırmak üzerinde kurulu bu barajlar, Orta Karadeniz'in ana hidroelektrik santralleridir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes06",
    text: "Sakarya Nehri üzerinde İç Anadolu'nun ilk ve en büyük hidroelektrik santrallerinden biri olan Sarıyar (Hasan Polatkan) Barajı hangi ilimizdedir?",
    answer: 6,
    explanation:
      "Ankara Nallıhan'da yer alan Sarıyar Barajı, Sakarya Nehri üzerinden elektrik üreten köklü tesislerimizdendir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes07",
    text: "Gediz Nehri üzerinde sulama ve elektrik enerjisi üretmek amacıyla kurulan Demirköprü Barajı hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Manisa Demirköprü Barajı, Gediz Havzası'nın elektrik üretiminde en önemli tesisidir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-hes08",
    text: "Büyük Menderes Nehri üzerinde kurulu Adıgüzel ve Kemer hidroelektrik santralleri hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Denizli (ve Aydın sınırında) Büyük Menderes üzerinde kurulu Adıgüzel Barajı, Ege'nin önemli hidroelektrik kaynaklarındandır.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },

  // 7. Rüzgâr Gücü
  {
    id: "geo-enj-ruz01",
    text: "Türkiye'nin ilk rüzgâr enerji santralinin (RES) 1998 yılında faaliyete geçtiği Çeşme - Alaçatı hangi ilimizdedir?",
    answer: 35,
    explanation:
      "İzmir Çeşme Alaçatı, sürekli hava akımları ve boğaz konumu sayesinde Türkiye'de modern rüzgâr santralinin ilk kurulduğu merkezdir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-ruz02",
    text: "Marmara ve Ege rüzgâr koridorunda yer alan, kurulu RES türbin gücü ve rüzgâr elektriği üretiminde Türkiye lideri olan ilimiz hangisidir?",
    answer: 10,
    explanation:
      "Balıkesir (Bandırma, Susurluk havzası), Türkiye'nin en yüksek rüzgâr enerjisi üretim kapasitesine sahip lider ilidir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },

  // 8. Güneş Enerjisi
  {
    id: "geo-enj-gun01",
    text: "Türkiye'de şebekeye bağlı ilk fotovoltaik güneş tarlasının kurulduğu Birecik ilçesi hangi ilimizdedir?",
    answer: 63,
    explanation:
      "Şanlıurfa Birecik, Türkiye'de güneş enerjisinden elektrik üretimi amacıyla açılan ilk lisanslı güneş tarlasına ev sahipliği yapar.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-gun02",
    text: "Türkiye'nin ve Avrupa'nın en büyük tek parça arazi tipi Güneş Enerji Santrali (Kalyon Karapınar GES) hangi ilimizdedir?",
    answer: 42,
    explanation:
      "Konya Karapınar Güneş Tarlası, 20 milyon metrekarelik çölleşmiş sahada 2 milyondan fazla panelle devasa elektrik üretir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-gun03",
    text: "Güneş ışınlarını kuleye odaklayan heliostat aynalarıyla çalışan Türkiye'nin ilk kule tipi termal güneş santrali hangi ilimizde kurulmuştur?",
    answer: 33,
    explanation:
      "Mersin (Toroslar), odaklanmış güneş enerjisiyle buhar ve elektrik üreten Türkiye'nin ilk kule tipi güneş santraline sahiptir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-gun04",
    text: "Türkiye'nin su yüzeyi üzerine kurulan ilk yüzer (su üstü) güneş enerjisi santrali Büyükçekmece Gölü üzerinde hangi ilimizdedir?",
    answer: 34,
    explanation:
      "İstanbul Büyükçekmece Gölü üzerinde göl suyunun buharlaşmasını önlerken elektrik üreten ilk su üstü GES kurulmuştur.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-gun05",
    text: "Yıllık bulutluluk oranının en yüksek, güneşlenme süresinin ise en az olduğu, bu nedenle güneş enerjisi potansiyeli en düşük olan Karadeniz ilimiz hangisidir?",
    answer: 53,
    explanation:
      "Rize ve Doğu Karadeniz sahil şeridi, yoğun bulutluluk ve yıl boyu süren yağışlar nedeniyle güneş enerjisi potansiyeli en zayıf alandır.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },

  // 9. Jeotermal Enerji
  {
    id: "geo-enj-jeo01",
    text: "Yerin derinliklerindeki kırıklı fay sularından beslenen ve Türkiye'nin ilk jeotermal elektrik santrali olan Sarayköy (Kızıldere) Santrali hangi ilimizdedir?",
    answer: 20,
    explanation:
      "Denizli Sarayköy Kızıldere Santrali, Türkiye'de yer altı buharıyla elektrik üreten ilk tesistir (üretim iklimden etkilenmez).",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-jeo02",
    text: "Büyük Menderes grabeninde yer alan, dev kapasiteli jeotermal enerji santrallerine (Germencik Santrali) ev sahipliği yapan ilimiz hangisidir?",
    answer: 9,
    explanation:
      "Aydın (Germencik, Buharkent), Türkiye jeotermal elektrik üretim kapasitesinin en yoğun olduğu ildir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-jeo03",
    text: "Gediz grabeni fay hatları üzerinde yer alan ve dev jeotermal elektrik santralleriyle öne çıkan Alaşehir ilçesi hangi ilimizdedir?",
    answer: 45,
    explanation:
      "Manisa Alaşehir, elektrik üretimi ve jeotermal seracılık yatırımlarıyla Ege'nin en dinamik jeotermal havzasıdır.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-jeo04",
    text: "Marmara Bölgesi'nde Tuzla ve Babadere jeotermal santrallerinin yer aldığı ilimiz hangisidir?",
    answer: 17,
    explanation:
      "Çanakkale Ayvacık (Tuzla ve Babadere), Marmara Bölgesi'nde jeotermal kaynaktan elektrik üreten santrallere sahiptir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },
  {
    id: "geo-enj-jeo05",
    text: "Jeotermal sıcak suyun hem bölgesel kentsel konut ısıtmasında hem de kaplıca ve termal seracılıkta en yaygın kullanıldığı Ege ilimiz hangisidir?",
    answer: 3,
    explanation:
      "Afyonkarahisar (Sandıklı ve Ömer-Gecek), jeotermal kaynaklarla kentsel ısınma ve modern seracılıkta Türkiye lideridir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },

  // 10. Biyokütle
  {
    id: "geo-enj-bio01",
    text: "Katı atık ve çöp gazından elektrik üreten Türkiye'nin en büyük biyokütle enerji santrallerinin (Odayeri ve Seymen) bulunduğu ilimiz hangisidir?",
    answer: 34,
    explanation:
      "İstanbul (Odayeri ve Silivri Seymen), metropolün evsel atıklarından metan gazı ayrıştırarak devasa elektrik üreten biyokütle tesisleridir.",
    category: "enerji",
    categoryLabel: "Yenilenebilir Enerji",
  },

  // 11. Nükleer Enerji
  {
    id: "geo-enj-nuk01",
    text: "Düşük deprem riski ve Akdeniz suyunun soğutma amacıyla kullanılabilmesi nedenleriyle Türkiye'nin ilk Nükleer Güç Santrali'nin (NGS) kurulduğu Akkuyu mevkii hangi ilimizdedir?",
    answer: 33,
    explanation:
      "Mersin Gülnar Akkuyu, Türkiye'nin ilk nükleer enerji santraline ev sahipliği yapar; yer seçiminde depremselliğin azlığı ve deniz suyu soğutması etkilidir.",
    category: "enerji",
    categoryLabel: "Nükleer Enerji",
  },
  {
    id: "geo-enj-nuk02",
    text: "Düşük sismik hareketlilik, zemin sağlamlığı ve deniz suyu soğutma imkanı nedeniyle Türkiye'nin ikinci nükleer santral sahası olarak belirlenen Karadeniz ilimiz hangisidir?",
    answer: 57,
    explanation:
      "Sinop (İnceburun Yarımadası), Türkiye'nin ikinci nükleer güç santrali yapılması hedeflenen resmi sahadır.",
    category: "enerji",
    categoryLabel: "Nükleer Enerji",
  },
  {
    id: "geo-enj-nuk03",
    text: "Üçüncü nükleer güç santrali projesi için zemin ve deniz suyu soğutma etütlerinin yürütüldüğü İğneada beldesi hangi ilimizdedir?",
    answer: 39,
    explanation:
      "Kırklareli Demirköy İğneada, Trakya kıyısında planlanan nükleer santral aday sahasıdır.",
    category: "enerji",
    categoryLabel: "Nükleer Enerji",
  },
];
