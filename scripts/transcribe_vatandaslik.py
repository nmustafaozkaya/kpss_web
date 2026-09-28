"""Convert the imported question scans into text; keep answer/source IDs stable."""
import argparse
import hashlib
import json
import re
from pathlib import Path

import pymupdf

from import_vatandaslik import inspect, PREFIX, ROOT, SOURCE_SHA256

LETTERS = "A-Za-zÇĞİÖŞÜçğıöşüâîû"
LABEL = re.compile(r"(?<!\S)([A-E80O])\s*[)}]")
REPAIRS = {
    "olmas ı": "olması", "kalmas ı": "kalması", "a lınamama": "alınamama",
    "B irl eşmiş": "Birleşmiş", "Ant6nio": "António", "Koli Annan": "Kofi Annan",
    "Cahil Berkay": "Cahit Berkay", "MıdJourney": "MidJourney", "PileYiğitler": "Pile-Yiğitler",
    "uyuşmaz lığın": "uyuşmazlığın", "yaz ılı": "yazılı", "durumun da": "durumunda",
    "TBMM!nin": "TBMM'nin", "bırak ı lamamaları": "bırakılamamaları", "bütün l üğü": "bütünlüğü",
    "gen iş": "geniş", "organ ı nın": "organının", "Kovid·19": "Kovid-19", "y ı lı": "yılı",
    "gönderi l d i ği": "gönderildiği", "nedenie": "nedenle", "H iyerarşi": "Hiyerarşi",
    "aşağ ıdaki": "aşağıdaki", "elde dilen": "elde edilen", "karşılaşılacak otan": "karşılaşılacak olan",
    "k ı ldığı": "kıldığı", "yarg ı lanması": "yargılanması", "yı lı nda": "yılında",
    "Bakanlı ğ ı": "Bakanlığı", "Halkoy laması": "Halkoylaması", "g i rişimi": "girişimi",
    "aşağ ı dakilerden": "aşağıdakilerden", "Aşağ ı dakilerden": "Aşağıdakilerden",
    "heykeltraşı": "heykeltıraşı", "Guarnica": "Guernica", "kuvvetler ayrığı": "kuvvetler ayrılığı",
    "Kamuoyıı": "Kamuoyu", "sanatç ı": "sanatçı", "lngiltere": "İngiltere",
    "Şa i ri": "Şairi", "Şair i": "Şairi", "aşağı dakilerden": "aşağıdakilerden",
    "şartlar ı": "şartları", "l<üçüğün": "Küçüğün", "Türklye": "Türkiye",
    "Kıtası'ndak.l": "Kıtası'ndaki", "Bostvana": "Botsvana", "ldarl": "idari",
    "tabif": "tabii", "baş layan": "başlayan", "eşleştirme lerinden": "eşleştirmelerinden",
    "değ ildi r": "değildir", "? .": "?", "?.": "?", "• ": "",
    "yayımlamasıy la": "yayımlamasıyla", "B i ndallı": "Bindallı", "sı rasında": "sırasında",
    "değişi me": "değişime", "Cahiy": "Cahit", "TUBİTAK": "TÜBİTAK", "lzdırar": "Izdırar",
    "Kuwet": "Kuvvet", "Cumhurbaşkanlığ ı": "Cumhurbaşkanlığı", "Milli Eğilim": "Millî Eğitim",
    "lvan Turgen yev": "İvan Turgenyev", "kuralarının": "kurallarının", "bağımlıs ı": "bağımlısı",
    "S ilahlı": "Silahlı", "d ışında": "dışında", "karar ları": "kararları", "işbi rliği": "iş birliği",
    "bulunmadığ ı": "bulunmadığı", "var sayılır": "varsayılır", "yaptıklan": "yaptıkları",
    "kazazıyla": "kazasıyla", "taşı masından": "taşımasından", "Uluslaiarasi banş": "Uluslararası barış",
    "İc ra": "İcra", "Yazı lı": "Yazılı", "kuru lmas ı": "kurulması",
    "metin· !erden": "metinlerden", "Yukar ı dakilerden": "Yukarıdakilerden",
    "bu lm aktad ır": "bulmaktadır", "Sa yı ştay": "Sayıştay",
    "kurum larının": "kurumlarının", "lcanunlarla": "kanunlarla",
    "bağ lama": "bağlama", "işl erini": "işlerini", "Bakanlığ ı": "Bakanlığı",
    "toplu luğudur": "topluluğudur", "aşağıdak ilerden": "aşağıdakilerden",
    "Bölgesl": "Bölgesi", "ltalya": "İtalya", "ispanya": "İspanya",
    "Donalt": "Donald", "lzlanda": "İzlanda", "İ şbirliği": "İşbirliği",
    "C umhurbaşkanlığı": "Cumhurbaşkanlığı", "Kaşağ ı": "Kaşağı",
    "Abasıyanıl<": "Abasıyanık", "Yönetmenliğ i ni": "Yönetmenliğini",
    "değil dir": "değildir", "vatandaş ı": "vatandaşı", "doldu rmuş": "doldurmuş",
    "kat ı lamazsa": "katılamazsa", "Genel~urmay": "Genelkurmay",
    "Uyuşmazlik tv1ahkemesi": "Uyuşmazlık Mahkemesi", "şahsıdir": "şahsidir",
    "1 O Nisan": "10 Nisan", "lrlanda": "İrlanda", "deği ld ir": "değildir",
    "çeşit l eri": "çeşitleri", "hıs ımlı ğı": "hısımlığı", "hısım lı k": "hısımlık",
    "bağ lı": "bağlı", "alan ı": "alanı", "sendi kaya": "sendikaya",
    "çalışma l arından": "çalışmalarından", "Daran Acemoğlu": "Daron Acemoğlu",
    "kat ı ldığı": "katıldığı", "Hacı Bektaş- i": "Hacı Bektaş-ı",
    "yer a lm aktadır": "yer almaktadır", "Farenheil": "Fahrenheit", "Evangelisla": "Evangelista",
    "s ıfatı": "sıfatı", "aşağıdaki l erden": "aşağıdakilerden", "İ l Seçim": "İl Seçim",
    "k i şinin": "kişinin", "yayım lamasıy l a": "yayımlamasıyla", "seçi ldiğine": "seçildiğine",
    "vakıllar": "vakıflar", "Silah lı": "Silahlı", "kuru l uşlar": "kuruluşlar",
    "arasın - dadır": "arasındadır", "Aşağıdak ilerden": "Aşağıdakilerden",
    "deği l dir": "değildir", "kapatı l ması": "kapatılması", "Dokunulmaz l ığın": "Dokunulmazlığın",
    "dü ş ürül mesi": "düşürülmesi", "kararla rına": "kararlarına", "yargısa l": "yargısal",
    "başvurular ı": "başvuruları", "bağ lamak": "bağlamak", "ayl ı ğ ı nın": "aylığının",
    "ay l ığ ı nın": "aylığının", "top l andığ ı": "toplandığı", "ivionarşi": "Monarşi",
    "Mutiakiyei": "Mutlakiyet", "şart la rı": "şartları", "yaln ı zca": "yalnızca",
    "K ı z ılkana t": "Kızılkanat",
    "kişi· !erinden": "kişilerinden", "ıçın": "için",
    "Cumhuriyetl": "Cumhuriyeti", "1 o gün": "10 gün", "y ı la": "yıla",
    "ald ığı": "aldığı", "Si lahlı": "Silahlı", "Ôzdinler": "Özdinler",
    "arasın - da": "arasında", "Chichen itza": "Chichen Itza", "s ını rları": "sınırları",
    "Endenozya": "Endonezya", "Mehmet\" olmuştur": "Mehmet olmuştur",
    "aşağıdaki lerden": "aşağıdakilerden", "Leanordo": "Leonardo", "Kafi Annan": "Kofi Annan",
    "ayl ı ğına": "aylığına", "kullanı l an": "kullanılan", "oy l arın": "oyların",
    "İsrai l": "İsrail", "davas ı nın": "davasının", "aşağıdakiferden": "aşağıdakilerden",
    "Aşağıdaki lerden": "Aşağıdakilerden", "Bir leşme": "Birleşme", "yard ı mcısı": "yardımcısı",
    "y ı l": "yıl", "Kolleklif": "Kolektif", "dokunulmaz lığı": "dokunulmazlığı",
    "yargı!anması": "yargılanması", "değişikliyle": "değişikliğiyle", "haz ı rcevaplığı": "hazırcevaplığı",
    "Oktoberfast": "Oktoberfest", "dışındak i": "dışındaki", "bel i rtilmemişse": "belirtilmemişse",
    "çeliş i rse": "çelişirse", "20_08": "2008", "ayrıntı lı": "ayrıntılı", "Crome": "Chrome",
    "oyu lmuş": "oyulmuş", "Knassos": "Knossos", "Başkanlığ ı": "Başkanlığı",
    "kamulaştır~a": "kamulaştırma", "GÖKTÜAK": "GÖKTÜRK", "TÜAKSAT": "TÜRKSAT",
    "fırlatılan,Türkiye": "fırlatılan, Türkiye", "aşağıdakilerden .hangisidir": "aşağıdakilerden hangisidir",
    "heykel_i": "heykeli", "istenemeyeceğlnin": "istenemeyeceğinin", "yukarıdaki l erden": "yukarıdakilerden",
    "şartlarla · kazanılır": "şartlarla kazanılır", "askerf": "askerî",
    "malı denetimini": "mali denetimini", "Komutanlığ ı": "Komutanlığı", "MiT": "MİT",
    "N itel iğindeki": "Niteliğindeki", "süresi süresi": "süresi", "Cari Benz": "Carl Benz",
    "ad ı": "adı", "alt ındaki": "altındaki", "ilk elliği": "ilkelliği",
    "mahalli' idareler": "mahallî idareler", "Dikdatör": "Diktatör", "Chaplean": "Chaplin",
    "lşıkkara": "Işıkkara", "İbrahim Çalı": "İbrahim Çallı", "yapt ırıma": "yaptırıma",
    "değild i r": "değildir", "teı:nel": "temel", "şekl i ndeki": "şeklindeki",
    "başkanl ı ğı": "başkanlığı", "2ay": "2 ay", "Resmi' Gazete": "Resmî Gazete",
    "İnlibah": "İntibah", "sayım ı": "sayımı", "Haalang": "Haaland",
    "bitiril diği": "bitirildiği", "Sın ı rlama": "Sınırlama", "dokunu l mazlığı": "dokunulmazlığı",
    "1 O gün": "10 gün", "ça lışma": "çalışma", "ku ruluş": "kuruluş", "İdaren in": "İdarenin",
    "ABD'dekl": "ABD'deki", "şeyler i": "şeyleri", "doğrn": "doğru", "Uyrul<lul<": "Uyrukluk",
    "Şa hsilik": "Şahsilik", "esas ları": "esasları", "lmran": "İmren", "New Vork": "New York",
    "Kanal istanbul": "Kanal İstanbul", "yapı lan": "yapılan", "aşağıdakil erden": "aşağıdakilerden",
    "do layı": "dolayı", "Komutan ı": "Komutanı", "Askerf": "Askerî", "İda re": "İdare",
    "yap ı lan": "yapılan", "Sözle ş mesi": "Sözleşmesi", "8erlin": "Berlin",
    "Sö z leşmesi": "Sözleşmesi", "Sözleşmes i": "Sözleşmesi", "İzm i r": "İzmir",
    "lstanbul": "İstanbul", "amac ıyla": "amacıyla", "bak ı mından": "bakımından",
    "s ı raya": "sıraya", "dokunu lmazlığından": "dokunulmazlığından", "yargılan ı rlar": "yargılanırlar",
    "milletvekill iğ i": "milletvekilliği", "içiş leri": "içişleri", "Herbet": "Herbert",
    "lgnatius": "Ignatius", "Conan Deyle": "Conan Doyle", "lpraş": "İpraş",
    "Bir leşmiş": "Birleşmiş", "lbrahim": "İbrahim", "bağış layan": "bağışlayan", "Kemai": "Kemal",
    "k işiler": "kişiler", "MedeniUsulHukuku": "Medeni Usul Hukuku", "ÖzelUsulHukuku": "Özel Usul Hukuku",
    "ant· !aşmalar": "antlaşmalar", "M i lletlerarası": "Milletlerarası", "Resmf": "Resmî",
    "üikeiere gönderiimesine": "ülkelere gönderilmesine", "Millı": "Millî", "Sınıf landırma": "Sınıflandırma",
    "yardımcı l arı": "yardımcıları", "Mal ve Siyah": "Mai ve Siyah", "Bolay ır": "Bolayır",
    "201 B'de": "2018'de", "faallyetlerinin": "faaliyetlerinin", "Cahlt": "Cahit",
    "değlldir": "değildir", "şi rket": "şirket", "şi r ket": "şirket",
    "Değ işt i rici": "Değiştirici", "doğu ran": "doğuran", "B i rleşi k": "Birleşik",
    "Siiah aiiındaki": "Silah altındaki", "aşağ ıd aki": "aşağıdaki",
}


def clean(value, option=False, roman=False):
    value = re.sub(rf"([{LETTERS}])[\-\u00ad·]\s*\n\s*([{LETTERS}])", r"\1\2", value)
    value = value.replace("\u00ad", "")
    value = re.sub(r"[ \t]+", " ", value)
    value = re.sub(r" +([.,;:?!])", r"\1", value)
    value = re.sub(r"\s*['’]\s*(?=[a-zçğıöşü])", "'", value)
    value = value.replace("( ", "(").replace("?·", "?").replace("''", '"')
    value = re.sub(r"\s*\n\s*", " ", value).strip()
    for wrong, right in REPAIRS.items():
        value = value.replace(wrong, right)
    value = value.replace("İttifak ı", "İttifakı").replace("•", "").strip()
    value = re.sub(r"^irade\b", "İrade", value)
    value = re.sub(r"^özel\b", "Özel", value)
    if option and not roman and value.startswith("i"):
        value = "İ" + value[1:]
    if roman:
        value = value.replace("Yalnızı", "Yalnız I").replace("Yalnızl", "Yalnız I")
        value = re.sub(r"(?<=[Iilı1])ve(?=[Iilı1])", " ve ", value)
        value = value.replace("iV", "IV").replace("ıV", "IV")
    if roman and re.fullmatch(r"(?:Yalnız\s+)?[Iilı1VvXx., ve]+", value):
        value = re.sub(r"\b[1Iıil]{1,3}\b", lambda m: "I"*len(m[0]), value)
        value = re.sub(r"(?<=[I])(?=ve)", " ", value)
    return value


def extract_text(page, marker, bottom):
    x, top = marker["x"], marker["y"]-5
    words = []
    for w in page.get_text("words"):
        x0, y0, x1, y1, text, *_ = w
        if x-2 <= x0 <= x+217 and top <= y0 and y1 <= bottom:
            if x0 < x+14 and y0 < top+22:
                continue
            words.append((x0, (y0+y1)/2, text))
    rows = []
    for word in sorted(words, key=lambda w: w[1]):
        if rows and abs(word[1]-rows[-1][0][1]) < 5:
            rows[-1].append(word)
        else:
            rows.append([word])
    raw = "\n".join(" ".join(w[2] for w in sorted(row)) for row in rows)
    matches = list(LABEL.finditer(raw))
    labels = [m[1].replace("8", "B").replace("O", "D").replace("0", "D") for m in matches]
    if labels != list("ABCDE"):
        return {"raw": raw, "issue": "option labels: " + "".join(labels)}
    stem = raw[:matches[0].start()].strip()
    # Statements are separate paragraphs even after wrapped prose is joined.
    stem = re.sub(r"(?m)^([1IilıVvXx]{1,4})\.\s+", lambda m: "§" + m[1].replace("1","I").replace("i","I").replace("l","I").replace("ı","I").upper()+". ", stem)
    roman_options = "§" in stem
    stem = re.sub(r"\n(?=(?:Yukarıda|bilgilerinden|durumlarından|unsurlarından|özelliklerinden|yaptırımlarından|konularından|haklarından|şartlarından|kararlarından|kurumlarından))", "\n§", stem)
    text = clean(stem).replace("§", "\n").strip()
    options = [clean(raw[m.end(): matches[i+1].start() if i < 4 else len(raw)], True, roman_options) for i,m in enumerate(matches)]
    return {"text": text, "options": options, "raw": raw}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()
    if hashlib.sha256(args.pdf.read_bytes()).hexdigest() != SOURCE_SHA256:
        raise ValueError("Source PDF differs from the reviewed edition.")
    doc = pymupdf.open(args.pdf)
    report = inspect(doc)
    geometry = {}
    for exam in report:
        for entry in exam["pages"]:
            for marker in entry["markers"]:
                after = [m["y"] for m in entry["markers"] if m["column"] == marker["column"] and m["y"] > marker["y"]]
                geometry[f"{PREFIX}_d{exam['exam']:02d}_q{marker['number']:02d}"] = (entry["page"], marker, min(after)-4 if after else 725)
    data_path = ROOT / "src/data/questions.json"
    original = data_path.read_text(encoding="utf-8")
    data = json.loads(original)
    excluded_id = PREFIX + "_d24_q05"
    replacement_id = PREFIX + "_d34_q07"
    # The source prints "Yalnız IV" twice for d24q05. Replace the ambiguous item.
    if any(q["id"] == excluded_id for q in data):
        data = [q for q in data if q["id"] != excluded_id]
        if not any(q["id"] == replacement_id for q in data):
            data.append({
                "id": replacement_id, "subject": "Vatandaşlık",
                "topic": "Karma Vatandaşlık", "text": "", "options": [],
                "answer": "ABCDE".index(report[33]["answers"][6]), "explanation": "",
                "source": {"title": args.pdf.stem, "page": geometry[replacement_id][0], "exam": 34, "question": 7},
            })
    corrections_path = ROOT / "scripts/vatandaslik-text-corrections.json"
    corrections = json.loads(corrections_path.read_text(encoding="utf-8")) if corrections_path.exists() else {}
    drafts = []
    for question in data:
        if not question["id"].startswith(PREFIX+"_"):
            continue
        page, marker, bottom = geometry[question["id"]]
        draft = extract_text(doc[page-1], marker, bottom)
        draft["id"] = question["id"]
        correction = corrections.get(question["id"].replace(PREFIX+"_", ""))
        if correction:
            draft.update({k:v for k,v in correction.items() if k != "replace"})
            for wrong, right in correction.get("replace", {}).items():
                draft["text"] = draft.get("text", "").replace(wrong, right)
                draft["options"] = [o.replace(wrong, right) for o in draft.get("options", [])]
            draft.pop("issue", None)
        drafts.append(draft)
    dest = ROOT / "tmp/pdfs/vatandaslik"
    (dest / "text-drafts.json").write_text(json.dumps(drafts, ensure_ascii=False, indent=2), encoding="utf-8")
    problems = [d for d in drafts if d.get("issue") or len(d.get("text", "")) < 25 or len(d.get("options", [])) != 5 or len(set(d.get("options", []))) != 5 or any(not x for x in d.get("options", []))]
    print(f"Drafts: {len(drafts)}; structural problems: {len(problems)}")
    for d in problems:
        print(d["id"], d.get("issue"))
    if args.apply:
        if problems:
            raise ValueError("Resolve all structural problems before publishing text.")
        by_id = {d["id"]: d for d in drafts}
        backup = dest / "questions-before-text.json"
        if not backup.exists():
            backup.write_text(original, encoding="utf-8")
        for q in data:
            if q["id"] in by_id:
                d = by_id[q["id"]]
                q.update(text=d["text"], options=d["options"], explanation="")
                q.pop("imageUrl", None)
                q.pop("imageContainsQuestion", None)
        data_path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")


if __name__ == "__main__":
    main()
