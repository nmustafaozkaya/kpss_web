"""Manually reviewed text and choice corrections against the supplied scan.
Unchanged fields retain the already legible text; answer keys are separate.
"""
PATCH={}
R=['I','II','III','IV','V']
P=['I ve II','I ve III','II ve III','II ve IV','III ve IV']
def q(id,text=None,options=None):
    entry={}
    if text is not None: entry['text']=text
    if options is not None: entry['options']=options.split('|') if isinstance(options,str) else options.copy()
    PATCH['cogr_'+id]=entry

q('d7_q2','Bafra, Dikili, Balat ve Amik ovalarının ortak özelliği aşağıdakilerden hangisidir?',
  'Delta ovası olmaları|Aynı bölgede bulunmaları|Kıyı ovası olmaları|Alüvyal toprakların bulunması|Tektonik kökenli oluşmaları')
q('d7_q3','Haritada farklı vadi türlerinin Türkiye’de yoğunlaştığı alanlar gösterilmiştir.\n\nBuna göre akarsuların oluşturduğu aşındırma şekilleriyle ilgili aşağıdakilerden hangisi söylenemez?',[
 'Kanyon vadiler jeolojik yapının karstik olduğu arazilerde yoğunluk göstermektedir.',
 'Geniş tabanlı vadilerin yoğunlaştığı arazilerde akarsuların yatak eğimi azdır.',
 'Çentik vadiler akarsuların sıradağları enine kestiği arazilerde görülmektedir.',
 'Geniş tabanlı vadilerde akarsuyun yatak eğimi çentik vadilere göre daha azdır.',
 'Çentik vadilerin yaygın olduğu arazilerde ortalama yükselti, geniş tabanlı vadilerin bulunduğu arazilere göre daha fazladır.'])
q('d7_q4','Karadeniz’den gelen nemli hava kütlelerinin etkili olduğu alanlarda sıcaklık farkı az, yağış rejimi düzenlidir. Bu iklim, Karadeniz ile diğer bölgeler arasındaki dağların kuzey yamaçlarında da etkilidir.\n\nAşağıdaki dağlık sahalardan hangisinin kuzey yamaçlarının bu iklimin etkisinde olduğu söylenemez?',
 'İsfendiyar Dağları|Canik Dağları|Giresun Dağları|Istranca Dağları|Geyik Dağları')
q('d8_q10','Haritada numaralanmış alanların yerleşme dokusu ve mesken tipleri ile ilgili aşağıdakilerden hangisi yanlıştır?',[
 'I numaralı alanda yerleşme dokusunun dağınık olmasında dar ve derin vadiler etkili olmuştur.',
 'II numaralı alanda mesken yapımında kireç taşları kullanılmaktadır.',
 'III numaralı alanda kırsal kesimde hımış meskenlere rastlanılmaktadır.',
 'IV numaralı alanda akarsu boyu yerleşmeler yaygındır.',
 'V numaralı alanda kerpiç meskenlerin yaygın olmasında karasal iklim etkilidir.'])
q('d15_q14','Haritada numaralanmış yerlerden hangisinde rüzgâr enerjisinden elektrik üretimi yoktur? (Kaynak kitabın hazırlandığı dönem esas alınmıştır.)',R)
q('d16_q10','Haritada Türkiye’de nüfus yoğunluğunun fazla olduğu beş alan gösterilmiştir.\n\nI. Sanayi ve ticaret\nII. Madencilik ve sanayi\nIII. Yayla turizmi ve madencilik\nIV. Tarım ve turizm\nV. Tarım ve sanayi\n\nBu alanlardan hangisinde nüfusun fazla olmasının nedeni yanlış verilmiştir?',R)
q('d16_q11',options='Adana|Niğde|Kayseri|Sivas|Erzurum')
q('d16_q12',options=P)
q('d17_q3','Haritada bazı araziler koyu renkle gösterilmiştir.\n\nI. Delta ovası\nII. Kalkan biçimli volkan konisi\nIII. Tektonik ova\nIV. Kıvrımlı sıradağlar\nV. Aşınım platosu\n\nBu araziler yukarıdaki yer şekilleri ile eşleştirildiğinde hangisi açıkta kalır?',R)
q('d17_q7','Erozyonla mücadele eden bir sivil toplum örgütü, ağaçlandırma çalışmalarında erozyon riskinin fazla olduğu alanlara öncelik vermiştir.\n\nBu alanların genel özellikleri arasında aşağıdakilerden hangisi sayılamaz?',
 'Yer şekillerinin eğimli ve engebeli olması|Yıllık yağış miktarının az olması|Fiziksel çözülme şiddetinin fazla olması|Mevsim yağışlarının sağanak şeklinde düşmesi|Günlük ve yıllık sıcaklık farklarının az olması')
q('d17_q8','Bir okul gezisinde öğrenciler, bir akarsu boyunca kurulmuş, çizgisel yerleşme özelliği gösteren ve Osmanlı Dönemi’nde de önemli bir işlevi olan bir kente götürülmüştür.\n\nBu kent aşağıdakilerden hangisidir?', 'Bursa|Samsun|Yozgat|Amasya|Trabzon')
q('d17_q12',options='I ve II|II ve III|III ve IV|I ve IV|II ve IV')
q('d18_q7','Türkiye’de bazı afetler başka afetleri tetikleyerek ortaya çıkan zararı artırır.\n\nAşağıdaki birincil afet – ikincil afet eşleştirmelerinden hangisinde böyle bir etkileşim olduğu savunulamaz?',
 'Kuraklık — Orman yangını|Deprem — Tsunami|Sel — Heyelan|Deprem — Çığ|Çığ — Heyelan')
q('d18_q8','Yer altı kaynaklarının işletilmesi, madenciliğe bağlı sanayinin gelişmesi ve bu alanlarda istihdamın artması bazı kentlerin göç alarak büyümesini sağlamıştır.\n\nAşağıdaki kentlerden hangisi bu değerlendirme içinde yer almaz?', 'Soma|Batman|Ergani|Söke|Zonguldak')
q('d18_q14','Haritadaki numaralı alanlarla aşağıdaki bilgiler eşleştirildiğinde hangisi dışarıda kalır?\n\n• Sıcak su kaynaklarına bağlı jeotermal enerji üretimi yapılır.\n• Asfaltit çıkarılır ve elektrik üretiminde kullanılır.\n• Vadi derinliğinin fazla olması nedeniyle en yüksek barajlar kurulmuştur.\n• Linyit kömürüne erişim kolaydır ve birçok santralde elektrik üretilir.',R)
q('d18_q15','Dokuma ve hazır giyim sanayisi; yünlü, pamuklu ve ipekli dokuma, hazır giyim, deri işleme, halı ve kilim dokumacılığı gibi alt dalları kapsar.\n\nAşağıdaki illerden hangisinde bu sanayi kollarının tamamı gelişme göstermiştir?', 'Ankara|Bolu|Manisa|Erzurum|Isparta')
q('d18_q17',options='Aydın–Denizli|Konya–Karaman|Antalya–Isparta|İstanbul–Edirne|Kırşehir–Yozgat')
q('d19_q2','Türkiye’de volkanizma üzerine araştırma yapan öğrenciler şu bilgileri paylaşmıştır:\n\nAhmet: Batolit, magmanın yer kabuğunun derinliklerinde büyük bir kütle hâlinde soğumasıyla oluşan kubbemsi şekildir.\nMehmet: Bursa yakınlarındaki Uludağ, batolite örnektir; burada granit gibi magmatik kayaçlar görülür.\nAyşe: Diyarbakır yakınlarındaki Karacadağ’da volkanik kayaçların görülmesi, buranın da batolit olduğunu gösterir.\nFatma: Karacadağ’da derinlik kayaçları değil yüzey kayaçları bulunur; burası kalkan biçimli bir volkan konisidir.\nAli: Uludağ batolit değil, tabakalı bir volkan konisidir.\n\nHangi öğrencilerin verdiği bilgiler yanlıştır?',
 'Ahmet ve Mehmet|Ayşe ve Ali|Mehmet ve Ayşe|Ahmet ve Ayşe|Fatma ve Ali')
q('d19_q3','Harita, Türkiye’deki ova ve plato alanlarını göstermek amacıyla hazırlanmış ancak bir yanlışlık yapılmıştır.\n\nYanlışlığı gidermek için hangi numaralı yer şekillerinin türü değiştirilmelidir?', 'I ve II|III ve IV|IV ve VI|V ve VI|VII ve V')
q('d19_q4','Bir kişi, yaşadığı ilde kış sıcaklıklarının nadiren 0 °C’nin altına indiğini ve ortalama kış sıcaklığının 0 °C’nin üzerinde olduğunu söylemiştir.\n\nBu kişinin aşağıdaki illerden hangisinde yaşadığı söylenemez?', 'Çankırı|Sinop|Balıkesir|Muğla|Ordu')
q('d19_q5','Türkiye ile ilgili aşağıdaki bilgilerden hangisi diğerlerinin nedenidir?',
 'Akarsu erozyonu şiddetlidir.|Yeryüzü şekilleri dağlık ve engebelidir.|Akarsuların yatak eğimi ve akış hızı fazladır.|Akarsular denge profili kazanmamıştır.|Akarsular ulaşıma ve taşımacılığa elverişli değildir.')
q('d19_q17','Haritada Türkiye’deki bazı büyükşehir merkezleri gösterilmiştir.\n\nBu merkezlerden hangileri arasında yalnızca otoyol bağlantısı kullanılarak ulaşım yapılamaz? (Kaynak kitabın hazırlandığı dönem esas alınmıştır.)', 'I ve II|I ve IV|II ve III|II ve IV|IV ve V')
q('d20_q7','Kaynak kitapta kullanılan sel ve su baskını istatistiklerine göre Ankara, olay sayısında ilk sıralarda olmadığı hâlde can kaybında ilk sıradadır.\n\nBu durumun beşerî nedenleri arasında aşağıdakilerden hangisi sayılamaz?')
q('d20_q11','Koyun, Türkiye’de farklı ırklarıyla geniş alanlarda yetiştirilir. Doğu ve Batı Karadeniz, Toroslar ve Erzurum–Kars platoları dışındaki alanlarda yaygındır.\n\nTürkiye’de koyun yetiştiriciliğinin yoğun yapılmasında aşağıdakilerden hangisi en belirleyicidir?', 'Yer şekilleri|Bitki örtüsü|Su kaynakları|Tüketici nüfus|Ulaşım')
q('d20_q14',options='Ergani|Küre|Samsun|Çayeli|Murgul')
q('d20_q17','Bir limanın ürünlerini topladığı, gelen malları dağıttığı ve ekonomik olarak etkileşim içinde bulunduğu çevreye hinterlant (art bölge) denir.\n\nHaritada gösterilen limanlardan hangisinin hinterlandı daha dardır?',R)
q('d21_q1','Grafikte Sinop ve Hatay’da güneş ışınlarının geliş açıları verilmiş, tarihler I–IV ile gösterilmiştir.\n\nBu tarihler hangi seçenekte doğru eşleştirilmiştir?',[
 'I: 21 Aralık — II: 21 Mart — III: 23 Eylül — IV: 21 Haziran',
 'I: 21 Haziran — II: 21 Aralık — III: 21 Haziran — IV: 21 Aralık',
 'I: 21 Mart — II: 21 Mart — III: 23 Eylül — IV: 23 Eylül',
 'I: 21 Haziran — II: 21 Haziran — III: 21 Aralık — IV: 21 Aralık',
 'I: 21 Haziran — II: 21 Aralık — III: 21 Mart — IV: 23 Eylül'])
q('d21_q3','Dağların kıyıya paralel uzandığı ve denize yakın alanlardan yükseldiği kıyılarda kıta sahanlığı genellikle dardır.\n\nBu bilgi, haritada numaralanmış kıyılardan hangilerinin özelliğini açıklar?', 'I ve II|I ve III|II ve III|II ve IV|III ve IV')
q('d21_q7','Aşağıdaki il – doğal afet riski eşleştirmelerinden hangisi hatalıdır?',
 'Muğla — Orman yangını|Kastamonu — Sel ve taşkın|Trabzon — Toprak kayması|Tunceli — Çığ|Yozgat — Deprem')
q('d21_q10','Türkiye’nin 2024 yılı nüfus verileriyle oluşturulan nüfus piramidi verilmiştir.\n\nI. Nüfus miktarının arttığını\nII. Nüfus artış hızının azaldığını\nIII. Cinsiyet oranının yükseldiğini\nIV. Doğum oranlarının arttığını\n\nPiramidin tabanındaki daralma yukarıdaki sonuçlardan hangilerini gösterir?', 'Yalnız II|I ve III|II ve III|II ve IV|III ve IV')
q('d21_q14','Haritada beş havza ve bu havzalarda bulunduğu belirtilen madenler verilmiştir.\n\nI. Mermer ve bor\nII. Altın ve bakır\nIII. Krom ve kurşun-çinko\nIV. Boksit ve barit\nV. Trona ve perlit\n\nHangi maden çifti haritadaki alanla yanlış eşleştirilmiştir?',R)
q('d21_q17','Aşağıdaki ören yerlerinden hangisi UNESCO Dünya Miras Listesi’nde bulunmaz? (2025 yılı sonu esas alınmıştır.)', 'Truva|Efes|Gordion|Aspendos|Ani')
q('d22_q3','Türkiye’nin Anadolu ve Trakya yarımadalarında bazı yer şekilleri ortaktır.\n\nI. Karstik ova\nII. Dalga aşındırmasıyla oluşan falez\nIII. Akarsu birikimiyle oluşan delta ovası\nIV. Volkanik patlamayla oluşan krater\n\nBu şekillerden hangileri yalnızca Anadolu Yarımadası’nda bulunur?', 'I ve II|I ve III|II ve III|I ve IV|III ve IV')
q('d22_q6','Kara kepir veya taş doğuran toprak olarak bilinen toprak tipine haritada numaralanmış alanlardan hangisinde rastlanır?',R)
q('d23_q4','Haritada numaralanmış alanların yağış özellikleriyle ilgili aşağıdaki bilgilerden hangisi yanlıştır?',[
 'I ve II numaralı alanların en fazla yağış aldığı mevsim aynıdır.',
 'II numaralı alanda kar yağışının oranı diğerlerinden fazladır.',
 'III numaralı alanın yağış miktarı V numaralı alandan fazladır.',
 'V numaralı alan Türkiye’nin en az yağış alan yerlerinden biridir.',
 'IV numaralı alan en fazla yağışını ilkbaharda alır.'])
q('d23_q12','Türkiye’de yünü için yetiştirilen hayvanlardan biri merinos koyunu, diğeri tiftik keçisidir.\n\nHaritadaki alanlardan hangilerinde bu hayvanlar yaygın olarak yetiştirilir? Seçeneklerde önce merinos koyunu, sonra tiftik keçisi verilmiştir.', 'I — II|I — III|II — III|II — IV|III — IV')
q('d23_q18','Haritada bölgesel kalkınma projelerinin kapsadığı iller gösterilmiştir.\n\nI. ZBK\nII. DOKAP\nIII. KOP\nIV. GAP\n\nHangi projelerin kapsadığı alan yanlış gösterilmiştir?',P)
q('d24_q2','• Güneybatı Anadolu’da kalın kalker depolarından oluşan karstik arazilerin geniş yer kaplaması\n• Batı Anadolu’da yatak eğimi az, geniş tabanlı vadilerin bulunması\n• Doğu Anadolu’da yüksek ve dağlık alanların bulunması\n• Kuzey Anadolu’da dağların kıyıya paralel uzanması\n\nBu durumlar seçeneklerle neden-sonuç ilişkisi içinde eşleştirildiğinde hangisi açıkta kalır?',
 'Akarsuların menderes çizerek akması|Mağara ve dolinlerin oluşması|Buzul aşındırma ve biriktirme şekillerinin görülmesi|Kıta sahanlığının dar, kıyı derinliğinin fazla olması|Akarsu biriktirmesiyle oluşan delta ovalarının varlığı')
q('d24_q10','Türkiye’de nüfusun kıyı kesimlerde iç kesimlerden daha yoğun olmasının nedenleri arasında;\n\nI. sıcaklık ve yağış koşullarının tarıma daha uygun olması,\nII. yer şekillerinin daha sade olması,\nIII. balıkçılıktan elde edilen gelirin daha yüksek olması\n\nfaktörlerinden hangileri sayılabilir?', 'Yalnız I|Yalnız II|Yalnız III|I ve II|I ve III')
q('d24_q14','Güneşlenme süresi dikkate alındığında, haritada numaralanmış illerden hangisinde güneş enerjisinden elektrik üretim potansiyelinin diğerlerine göre daha düşük olması beklenir?',R)
q('d25_q1','Aşağıdaki durumlardan hangisi diğerlerinden farklı bir konum etkeninin sonucudur?',[
 'Güllük Körfezi’nden Saros Körfezi’ne doğru gidildikçe güneşin doğuş ve batış süresinin uzaması',
 'Ardahan’dan Hakkâri’ye gidildikçe gece-gündüz süre farkının azalması',
 'Perşembe Yarımadası’ndan Sinop Yarımadası’na gidildikçe yerel saat ile ulusal saat arasındaki farkın artması',
 'Türkiye’nin en kuzeyinde güneş ışınlarının geliş açısının daha küçük olması',
 'İskenderun Körfezi’nde deniz suyu tuzluluğunun Erdek Körfezi’nden fazla olması'])
q('d25_q6','Haritadaki A noktasından B noktasına kıyı boyunca ilerleyen bir gözlemci, araştırmasını deniz seviyesinden en fazla 500 metre yüksekliğe çıkarak tamamlamıştır.\n\nI. Kahverengi orman toprakları\nII. Alüvyal topraklar\nIII. Çernezyom\nIV. Podzol\n\nGözlemci bu topraklardan hangilerini görmüş olabilir?',P)
q('d25_q12','Haritadaki numaralı yerlerden hangisi, belirtilen ürünün yetişmediği bir yöreyle eşleştirilmiştir?', 'I — Kenevir|II — Aspir|III — Anason|IV — Haşhaş|V — Yağlık gül')
q('d25_q14','Haritada her renk farklı bir madenin çıkarıldığı illeri göstermektedir.\n\nAşağıdaki madenlerden hangisinin rezerv alanları bu haritada gösterilmemiştir?', 'Boksit|Bor|Bakır|Krom|Fosfat')
q('d26_q12',options=P)
q('d27_q2','Türkiye’de yer şekilleri iklimden ulaşıma, nüfus dağılışından ekonomik faaliyetlere kadar birçok unsuru etkiler.\n\nAşağıdakilerden hangisi bu etkilerden biri değildir?',
 'Doğu Karadeniz’de tarla tarımı yerine bağ ve bahçe tarımı yapılması|Tuz Gölü çevresinde nüfus yoğunluğunun az olması|Menteşe yöresinde demir yolu ulaşımının gelişmemesi|Kıyı Ege’de Akdeniz ikliminin etki alanının geniş olması|Ergene yöresinde gerçek alan ile izdüşüm alanı farkının az olması')
q('d27_q4','Dar ve derin vadilerde akan, yatak eğimi fazla akarsuların hidroelektrik potansiyeli yüksektir. Geniş tabanlı vadilerde bu potansiyel daha düşüktür.\n\nHaritadaki alanlardan hangilerinde akarsu vadileri baraj yapmaya daha az elverişlidir?', 'I ve II|I ve IV|II ve III|II ve V|IV ve V')
q('d27_q5','Grafikte iki bölgenin yağışının mevsimlere dağılışı verilmiştir.\n\nHaritadaki alanlarla grafikteki bölgeler hangi seçenekte doğru eşleştirilmiştir? Seçeneklerde önce I. bölge, sonra II. bölge verilmiştir.', 'I — II|I — III|II — III|II — IV|III — IV')
q('d27_q8','Lozan kapsamındaki nüfus mübadelesinde Batı Trakya’daki Türkler ve İstanbul’daki Rumlar değişimin dışında tutulmuştur.\n\nBu mübadele hangi ülkeyle yapılmıştır?', 'Suriye|Yunanistan|Bulgaristan|İran|Gürcistan')
q('d27_q9','Grafikte Türkiye’nin 1935–2023 yılları arasındaki doğum ve ölüm oranları verilmiştir.\n\nAşağıdakilerden hangisi bu grafikten elde edilebilecek bilgilerden biri değildir?',[
 'Nüfus miktarının en fazla olduğu yıl 2023’tür.',
 'Nüfus artış hızının en düşük olduğu dönem 2000–2023’tür.',
 '1960–1965 döneminde nüfus artış hızı 1940–1945 döneminden daha yüksektir.',
 'Nüfus miktarı sürekli artmıştır.', 'Nüfus artış hızı sürekli azalmıştır.'])
q('d27_q12',options='Kümes hayvancılığı|Arıcılık|İpek böcekçiliği|Kıl keçisi|Tiftik keçisi')
q('d27_q14',options='Kimya|Çay|Konserve|Deri|Cam')
q('d28_q3','I. Akarsuların biriktirme faaliyetleri\nII. Epirojenik hareketlere bağlı seviye değişimleri\nIII. Dalga ve akıntıların aşındırma ve biriktirmesi\nIV. Buzulların aşındırma ve biriktirmesi\n\nTürkiye kıyılarının şekillenmesinde hangilerinin etkili olduğu söylenemez?', 'Yalnız IV|I ve II|II ve III|II ve IV|I, III ve IV')
q('d28_q11','Grafikte bir tarım ürününün en fazla üretildiği bazı iller verilmiştir.\n\nBu ürün aşağıdakilerden hangisidir?', 'Aspir|Gül|Anason|Avokado|Kolza')
q('d28_q17',options='I — Mimari eserler|II — Sakin şehir|III — Yaylacılık ve ekoturizm|IV — Doğal varlık ve su sporları|V — Doğal varlık ve tarihî yerleşme')
q('d29_q2','Türkiye’nin en kuzeyinden en güneyine bir hat çizilmiştir.\n\nBu hat üzerinde sırasıyla hangi yer şekilleri görülür?',
 'Canik Dağları, Bozok Platosu, Çukurova|Küre Dağları, Bozok Platosu, Kayseri Ovası|Köroğlu Dağları, Konya Ovası, Geyik Dağları|Küre Dağları, Haymana Platosu, Konya Ovası|Kaçkar Dağları, Uzunyayla Platosu, Amik Ovası')
q('d29_q3','Yükseltisi 2500 metrenin üzerinde olan bu arazi, Kuvaterner’deki iklim değişikliklerinden etkilenmiştir. Güncel buzullar bulunmasa da buzul aşındırma ve biriktirme şekilleri görülür. Türkiye’nin bu bölgesinde buzul şekilleri yaygın değildir; yalnızca yüksek alanlarda görülür.\n\nBu açıklama haritadaki hangi alan için yapılmış olabilir?',R)
q('d29_q7','Kurak ve yüzey suları bakımından fakir alanlarda yer altı suyu kullanımı yaygındır. Yer altı sularının aşırı ve bilinçsiz çekilmesi, karstik kayaçların bulunduğu alanlarda obruk oluşumunu hızlandırır.\n\nBu sorun haritadaki hangi alanda daha sık görülür?',R)
q('d29_q14','Haritadaki merkezler harflerle gösterilmiştir.\n\nI. En küçük petrokimya tesisi\nII. İlk ferrokrom tesisi\nIII. İlk demir-çelik fabrikası\nIV. Alüminyum fabrikası\n\nK, L, M ve N merkezleri ile bu tesisler hangi seçenekte doğru eşleştirilmiştir?',[
 'K: I — L: II — M: III — N: IV','K: IV — L: III — M: II — N: I',
 'K: III — L: II — M: I — N: IV','K: I — L: IV — M: III — N: II',
 'K: II — L: III — M: IV — N: I'])
q('d29_q17','Ankara’dan yola çıkan turistler, haritada işaretli merkezlerdeki antik kentleri ziyaret etmiştir.\n\nAşağıdakilerden hangisi ziyaret edilen antik kentlerden biri olamaz?', 'Truva|Bergama|Efes|Hierapolis|Aspendos')
q('d30_q3','Fiziki haritalarda yükselti basamakları farklı renklerle gösterilir. Türkiye’de kıyı ovaları genellikle yeşil, yaklaşık 1000 metre yükseltideki ova ve platolar sarı, yüksek alanlar kahverengiyle gösterilir.\n\nI. Aksaray Ovası\nII. Bozok Platosu\nIII. Gediz Ovası\nIV. Altınbaşak Ovası\n\nHangilerinin fiziki haritada sarı renkle gösterilmesi beklenir?',P)
q('d30_q12','Haritadaki numaralı alanlarla yağ elde etmek amacıyla yetiştirilen ürünler eşleştirilmiştir.\n\nHangi eşleştirme yanlıştır?', 'I — Ayçiçeği|II — Zeytin|III — Mısır|IV — Soya fasulyesi|V — Kanola')
q('d30_q14',options='I ve II|I ve III|I ve IV|II ve IV|III ve IV')
q('d31_q1','İzmir’den yola çıkan bir araştırma ekibi sırasıyla Çandarlı, Edremit ve Gökova körfezlerinde deniz suyu sıcaklığı ve tuzluluğunu incelemiştir.\n\nEnlem etkisi dikkate alındığında aşağıdakilerden hangisi söylenemez?',[
 'Deniz suyu sıcaklığı ve tuzluluğu ikinci durakta birinci duraktan düşüktür.',
 'Gözlem boyunca deniz suyu sıcaklığı önce azalmış, sonra artmıştır.',
 'Deniz suyu sıcaklığı ve tuzluluğu gözlem süresince sürekli azalmıştır.',
 'Deniz suyu sıcaklığının en düşük olduğu yer ikinci duraktır.',
 'Deniz suyu sıcaklığı ve tuzluluğunun en fazla olduğu yer üçüncü duraktır.'])
q('d31_q3','Bir okul gezisinde traverten, peribacası, obruk gölü ve buzul vadisi örneklerinin bulunduğu alanlar ziyaret edilmiştir.\n\nHaritadaki alanlardan hangisi bu gezi alanlarından biri olamaz?',R)
q('d31_q7','Haritada Türkiye’deki bazı Ramsar alanları gösterilmiştir.\n\nHangi alanın adı yanlış eşleştirilmiştir?', 'I — Göksu Deltası|II — Meke Gölü|III — Seyfe Gölü|IV — Burdur Gölü|V — Nemrut Krater Gölü')
q('d31_q9','Grafikte Türkiye’de çalışan nüfusun yıllara göre sektörel dağılımı verilmiştir.\n\nAşağıdakilerden hangisi bu grafikten elde edilebilecek bilgilerden biri değildir?')
q('d31_q11',options='Mısır|Çay|Muz|Anason|Gül')
q('d31_q14','Haritada bazı alanlar madenlerle eşleştirilmiştir.\n\nHangi madenin bulunduğu alan yanlış gösterilmiştir?', 'Mermer|Krom|Bor|Bakır|Boksit')
q('d32_q2',options='Bolu Dağları|Cihanbeyli Platosu|Bozok Platosu|Çukurova|Canik Dağları')
q('d32_q6','İzmir’den Antalya’ya kadar olan alandaki ormanları araştıran bir grup;\n\nI. fıstık çamı,\nII. Toros sediri,\nIII. göknar,\nIV. ıhlamur\n\ntürlerinden hangilerini bu ormanlarda yaygın olarak görmüş olamaz?', 'I ve II|I ve III|II ve III|I ve IV|III ve IV')
q('d33_q3','Dalgalar, şartların uygun olduğu kıyılarda taşıdıkları malzemeyi biriktirerek kıyı oku, kıyı kordonu ve tombolo gibi şekiller oluşturur.\n\nBu şekiller haritada numaralanmış kıyılardan hangilerinde görülür?', 'I ve II|I ve IV|II ve III|III ve V|IV ve V')
q('d33_q6','Kayın, nemli bölgelerde yetişen geniş yapraklı bir ağaçtır ve Avrupa–Sibirya flora bölgesindeki ormanlarda yayılış gösterir.\n\nHaritadaki alanlardan hangilerinin ormanlarında kayına rastlanır?',P)
q('d33_q7','Kurak alanlarda sulama projeleri tarımsal verimi artırmıştır. Ancak yanlış sulama yöntemleri zamanla toprakta tuzlanma ve kireçlenmeye yol açmıştır.\n\nBu sorun haritadaki hangi alanda daha fazla yaşanır?',R)
q('d33_q15','Haritada pamuklu dokuma sanayisinin geliştiği beş merkez gösterilmiştir.\n\nHangi merkezde dokuma sanayisinin ham maddesi bulunduğu yöreden sağlanmaz?',R)
q('d7_q16','Eğimli ve engebeli alanlarda ulaşım güzergâhları çoğunlukla akarsu vadilerini izler. Türkiye’de dağların genel uzanışına paralel vadiler, ana yol güzergâhlarını da etkilemiştir.\n\nUlaşımda akarsu vadilerinin tercih edilmesinin temel nedeni nedir?')
q('d14_q14','Haritadaki alanlar; trona (soda külü), mermer, boksit ve bakır madenleriyle eşleştirildiğinde hangi alan dışarıda kalır?',R)
q('d15_q17','Yükselti, engebe, eğim ve dağların uzanışı yol yapımını etkiler. Bir kişi, çalıştığı güzergâhın dağların uzanış yönüne dik olduğunu ve bunun yol yapımını zorlaştırarak maliyeti artırdığını söylemiştir.\n\nBu kişinin çalıştığı yol, haritadaki güzergâhlardan hangisi olamaz?',R)
q('d17_q10','I. Deprem riskinin yüksek olduğu alanlar\nII. Sanayinin geliştiği alanlar\nIII. Dağlık ve engebeli alanlar\nIV. Akarsuların çentik vadileri\n\nHangileri Türkiye’de nüfus yoğunluğunun az olduğu alanlara örnektir?')
q('d18_q10',options=[
 'I numaralı alanda mahalle ve mahallelerin birleşmesiyle oluşan divan yerleşmelerine rastlanır.',
 'II ve III numaralı alanlarda oba adı verilen köy altı yerleşmeleri bulunur.',
 'IV numaralı alanın kıyı kesimlerinde dalyan adı verilen yerleşmeler bulunur.',
 'V numaralı alanda hayvan otlatma döneminde geçici olarak kullanılan dam yerleşmeleri bulunur.',
 'II ve IV numaralı alanlarda yaz aylarında serinlemek amacıyla yaylalara çıkılır.'])
q('d19_q12','Haritada taranan alanlarla ilgili şu bilgiler verilmiştir:\n\nI. Buğday yetişmez.\nII. Tütün yetişmez.\nIII. Fındık yetişmez.\nIV. Zeytin yetişmez.\nV. Çay yetişmez.\n\nHangi ürünle ilgili verilen bilgi yanlıştır?')
q('d20_q12','Haritada bir tarım ürününün 500.000 tonun üzerinde üretildiği iller gösterilmiştir.\n\nBu ürün aşağıdakilerden hangisidir?', 'Mısır|Ayçiçeği|Pamuk|Şeker pancarı|Üzüm')
q('d21_q12','Kültür balıkçılığı akarsu, baraj ve göllerin yanı sıra koy ve körfezlerde de yapılır.\n\nHaritada işaretli alanlardan hangisinde kültür balıkçılığının daha fazla yapılması beklenir?',R)
q('d22_q12','Haritada numaralanmış yerlerden hangisinde koyun yetiştiriciliği diğerleri kadar yoğun değildir?',R)
q('d24_q17','Haritada gösterilen alanlardan hangilerindeki yollar akarsuların boğaz vadilerini izler?')
q('d25_q3','Bir arazinin özellikleri şöyledir:\n\n• Gerçek alanı ile izdüşüm alanı arasındaki fark fazladır.\n• Yol yapımı zor ve maliyetlidir.\n• Tarımda makine kullanımı sınırlıdır.\n\nBu arazi haritada numaralanmış alanlardan hangisi olabilir?',R)
q('d31_q12','Haritada numaralanmış alanlarda üretimi yoğun olan ürünler hangi seçenekte doğru verilmiştir?')
q('d32_q12','Haritada Türkiye’de yoğun tarımsal üretim yapılan bazı alanlar gösterilmiştir.\n\nBu alanlarda aşağıdaki ürünlerden hangisinin yetişme alanı yoktur?')
q('d32_q15','Haritada numaralanmış alanlardan hangisinde yağ sanayisinin geliştiği söylenemez?',R)
q('d32_q17','Haritada bir turizm türünün yapıldığı merkezler gösterilmiştir.\n\nI. İklim\nII. Su kaynakları\nIII. Yer şekilleri\nIV. Jeolojik yapı\n\nBu merkezlerde turizmin gelişmesi hangi faktörlere bağlıdır?')

# Final source review: preserve the printed choices and answer order.
q('d17_q12','Türkiye haritasında dört alan numaralarla gösterilmiştir.\n\nTürkiye’de yeşil mercimek ve kırmızı mercimeğin en fazla yetiştirildiği alanlar sırasıyla hangileridir?',
  'I ve II|II ve III|III ve IV|I ve IV|II ve IV')
q('d22_q7','Kırşehir’de faaliyet yürüten bir sivil toplum kuruluşunun çalışmaları şöyledir:\n\n• Kara yollarının kenarındaki tarla sınırlarına rüzgâr perdeleri yapılmıştır.\n• Hafif engebeli ve bitki örtüsünden yoksun alanlar ağaçlandırılmıştır.\n• Tarım alanlarında anız yangınlarını önlemek için denetimler artırılmıştır.\n\nBu kuruluşun aşağıdaki afetlerden hangisiyle mücadele ettiği söylenebilir?')
q('d32_q2','Türkiye’nin dağlık ve engebeli yapısı nedeniyle demir yolu hatları, yapım maliyetini azaltmak için yer şekillerinin daha sade olduğu platolardan, ovalardan, akarsu vadilerinden ve doğal geçitlerden geçirilir.\n\n• Ankara–Sivas Yüksek Hızlı Tren Hattı\n• Ankara–Konya Yüksek Hızlı Tren Hattı\n• Adana–Şanlıurfa Otoyolu\n• Ankara–İstanbul Otoyolu\n\nBu ulaşım hatları dikkate alındığında aşağıdaki jeomorfolojik ünitelerden hangisiyle ilişki kurulamaz?')
q('d32_q3','Türkiye kıyılarında görülen kıyı tiplerinden biri enine kıyılardır.\n\nBu kıyılarla ilgili;\nI. kıta sahanlığı dardır,\nII. kıyıda girinti çıkıntı fazladır,\nIII. kıyı gerisindeki dağlar kıyıya paralel uzanır,\nIV. dalga biriktirme şekilleri yaygındır\n\nbilgilerinden hangileri yanlıştır?')
q('d15_q12','Haritada birbirine komşu beş il gösterilmiştir.\n\nKaynak kitapta esas alınan üretim verilerine göre bu illerden hangisinde anason üretimi yapılmamaktadır?')
q('d23_q14','Haritada beş alan numaralarla gösterilmiştir.\n\nKaynak kitabın hazırlandığı dönem esas alındığında, bu alanlardan hangisinde rüzgâr enerji santrali (RES) kurulmamıştır?')
q('d26_q17','Haritada beş alan numaralarla gösterilmiştir.\n\nKaynak kitabın hazırlandığı dönemde bu alanlardan hangisinde otoyol ve hızlı tren bağlantıları birlikte bulunmaktadır?')
