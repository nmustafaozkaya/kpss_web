const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const subjects = [
  { slug: "turkce", name: "Türkçe", group: "GY", sortOrder: 1, topics: ["Sözcükte anlam", "Yazım kuralları"] },
  { slug: "matematik", name: "Matematik", group: "GY", sortOrder: 2, topics: ["Yüzde problemleri", "Sayılar"] },
  { slug: "tarih", name: "Tarih", group: "GK", sortOrder: 3, topics: ["Millî Mücadele", "Osmanlı tarihi"] },
  { slug: "cografya", name: "Coğrafya", group: "GK", sortOrder: 4, topics: ["Türkiye’nin fiziki özellikleri", "İklim bilgisi"] },
  { slug: "vatandaslik", name: "Vatandaşlık", group: "GK", sortOrder: 5, topics: ["Temel kavramlar", "Demokrasi"] },
  { slug: "guncel-bilgiler", name: "Güncel Bilgiler", group: "GK", sortOrder: 6, topics: [] },
];

const provinces = [
  [1, "Adana"], [2, "Adıyaman"], [3, "Afyonkarahisar"], [4, "Ağrı"], [5, "Amasya"], [6, "Ankara"], [7, "Antalya"], [8, "Artvin"], [9, "Aydın"], [10, "Balıkesir"], [11, "Bilecik"], [12, "Bingöl"], [13, "Bitlis"], [14, "Bolu"], [15, "Burdur"], [16, "Bursa"], [17, "Çanakkale"], [18, "Çankırı"], [19, "Çorum"], [20, "Denizli"], [21, "Diyarbakır"], [22, "Edirne"], [23, "Elazığ"], [24, "Erzincan"], [25, "Erzurum"], [26, "Eskişehir"], [27, "Gaziantep"], [28, "Giresun"], [29, "Gümüşhane"], [30, "Hakkâri"], [31, "Hatay"], [32, "Isparta"], [33, "Mersin"], [34, "İstanbul"], [35, "İzmir"], [36, "Kars"], [37, "Kastamonu"], [38, "Kayseri"], [39, "Kırklareli"], [40, "Kırşehir"], [41, "Kocaeli"], [42, "Konya"], [43, "Kütahya"], [44, "Malatya"], [45, "Manisa"], [46, "Kahramanmaraş"], [47, "Mardin"], [48, "Muğla"], [49, "Muş"], [50, "Nevşehir"], [51, "Niğde"], [52, "Ordu"], [53, "Rize"], [54, "Sakarya"], [55, "Samsun"], [56, "Siirt"], [57, "Sinop"], [58, "Sivas"], [59, "Tekirdağ"], [60, "Tokat"], [61, "Trabzon"], [62, "Tunceli"], [63, "Şanlıurfa"], [64, "Uşak"], [65, "Van"], [66, "Yozgat"], [67, "Zonguldak"], [68, "Aksaray"], [69, "Bayburt"], [70, "Karaman"], [71, "Kırıkkale"], [72, "Batman"], [73, "Şırnak"], [74, "Bartın"], [75, "Ardahan"], [76, "Iğdır"], [77, "Yalova"], [78, "Karabük"], [79, "Kilis"], [80, "Osmaniye"], [81, "Düzce"],
];

const questionSeeds = [
  { legacyId: "tr1", subject: "turkce", topic: "Sözcükte anlam", text: "Aşağıdaki cümlelerin hangisinde ‘ince’ sözcüğü mecaz anlamda kullanılmıştır?", options: ["İnce bir ip kullanarak paketi bağladı.", "Masaya ince dilimlenmiş ekmek koydu.", "Bu davranışı oldukça ince bir düşüncenin ürünüydü.", "Üzerinde ince bir gömlek vardı.", "Defterin arasına ince bir kâğıt yerleştirdi."], answer: 2, explanation: "‘İnce düşünce’ ifadesinde ince, nazik ve düşünceli olmayı anlatır." },
  { legacyId: "tr2", subject: "turkce", topic: "Yazım kuralları", text: "Aşağıdaki sözcüklerden hangisi yanlış yazılmıştır?", options: ["Birçok", "Her şey", "Hiçbir", "Birşey", "Birkaç"], answer: 3, explanation: "‘Şey’ sözcüğü ayrı yazılır: ‘bir şey’." },
  { legacyId: "ta1", subject: "tarih", topic: "Millî Mücadele", text: "Türkiye Büyük Millet Meclisi hangi tarihte açılmıştır?", options: ["19 Mayıs 1919", "23 Nisan 1920", "30 Ağustos 1922", "29 Ekim 1923", "20 Ocak 1921"], answer: 1, explanation: "TBMM 23 Nisan 1920 tarihinde Ankara’da açılmıştır." },
  { legacyId: "co1", subject: "cografya", topic: "Türkiye’nin fiziki özellikleri", text: "Türkiye’nin en yüksek dağı aşağıdakilerden hangisidir?", options: ["Erciyes Dağı", "Kaçkar Dağı", "Ağrı Dağı", "Uludağ", "Süphan Dağı"], answer: 2, explanation: "Ağrı Dağı, 5.137 metre ile Türkiye’nin en yüksek dağıdır." },
];

async function main() {
  for (const province of provinces) await prisma.province.upsert({ where: { id: province[0] }, update: { name: province[1], plateNumber: province[0] }, create: { id: province[0], name: province[1], plateNumber: province[0] } });
  const topicIds = new Map();
  for (const subject of subjects) {
    const dbSubject = await prisma.subject.upsert({ where: { slug: subject.slug }, update: { name: subject.name, group: subject.group, sortOrder: subject.sortOrder }, create: { slug: subject.slug, name: subject.name, group: subject.group, sortOrder: subject.sortOrder } });
    for (const [index, name] of subject.topics.entries()) {
      const topic = await prisma.topic.upsert({ where: { subjectId_slug: { subjectId: dbSubject.id, slug: name.toLocaleLowerCase("tr").replaceAll(" ", "-").replaceAll("’", "") } }, update: { name, sortOrder: index + 1 }, create: { subjectId: dbSubject.id, name, slug: name.toLocaleLowerCase("tr").replaceAll(" ", "-").replaceAll("’", ""), sortOrder: index + 1 } });
      topicIds.set(`${subject.slug}:${name}`, topic.id);
    }
  }
  for (const item of questionSeeds) {
    const subject = await prisma.subject.findUniqueOrThrow({ where: { slug: item.subject } });
    const topicId = topicIds.get(`${item.subject}:${item.topic}`);
    await prisma.question.upsert({ where: { legacyId: item.legacyId }, update: { text: item.text, explanation: item.explanation, subjectId: subject.id, topicId, status: "PUBLISHED" }, create: { legacyId: item.legacyId, text: item.text, explanation: item.explanation, subjectId: subject.id, topicId, status: "PUBLISHED", options: { create: item.options.map((text, sortOrder) => ({ label: "ABCDE"[sortOrder], text, sortOrder, isCorrect: sortOrder === item.answer })) } } });
  }
  console.log(`Seed tamamlandı: ${subjects.length} ders, ${provinces.length} il, ${questionSeeds.length} örnek soru.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
