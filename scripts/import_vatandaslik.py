"""Extract citizenship questions from the supplied scanned Yargi book.

Source layout is preserved in question crops. Only answer letters, never
solution explanations, are extracted from solution pages. Run --inspect first.
"""
import argparse
import hashlib
import json
import re
from pathlib import Path

import pymupdf
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
PREFIX = "yargi_vat_2026"
SOURCE_SHA256 = "90a8324dbd4b22af0d83ff00a3abd817d5d7b2bdcf5efe04aedd9ea387497931"


def extract(doc, report, pdf, count=500):
    output = ROOT / "public" / "uploads" / PREFIX
    output.mkdir(parents=True, exist_ok=True)
    records, audit = [], []
    source_hash = hashlib.sha256(pdf.read_bytes()).hexdigest()
    if source_hash != SOURCE_SHA256:
        raise ValueError("This importer is calibrated for the supplied PDF; inspect new editions separately.")
    if not 1 <= count <= 500:
        raise ValueError("The reviewed import range is 1–500 questions.")
    for exam in report:
        if len(records) >= count:
            break
        assert len(exam["answers"]) == 15, f"Incomplete answer key: {exam['exam']}"
        numbers = [m["number"] for p in exam["pages"] for m in p["markers"]]
        assert sorted(numbers) == list(range(1, 16)), f"Incomplete questions: {exam['exam']}"
        for entry in exam["pages"]:
            page = doc[entry["page"]-1]
            for marker in entry["markers"]:
                if len(records) >= count:
                    break
                n = marker["number"]
                # Source key disagrees with the printed option: leave for review.
                if exam["exam"] == 1 and n == 15:
                    continue
                subsequent = [m for m in entry["markers"] if m["column"] == marker["column"] and m["y"] > marker["y"]]
                bottom = min(m["y"] for m in subsequent)-4 if subsequent else 730
                left = marker["x"]-3
                right = min(page.rect.width-8, marker["x"]+228)
                top = marker["y"]-5
                rect = pymupdf.Rect(left, top, right, bottom)
                pix = page.get_pixmap(matrix=pymupdf.Matrix(3, 3), clip=rect, alpha=False)
                img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
                # Trim only trailing blank rows using pixels, not unreliable OCR.
                # Ignore the publisher's vertical rule in the right gutter.
                ink = img.crop((0, 0, img.width-55, img.height)).convert("L").point(lambda p: 255 if p < 100 else 0)
                ink_box = ink.getbbox()
                if ink_box:
                    img = img.crop((0, 0, img.width, min(img.height, ink_box[3]+22)))
                identifier = f"{PREFIX}_d{exam['exam']:02d}_q{n:02d}"
                img.save(output / f"{identifier}.webp", "WEBP", quality=94, method=6)
                civic = n <= 9 or (exam["exam"] == 1 and n == 10)
                records.append({
                    "id": identifier,
                    "subject": "Vatandaşlık" if civic else "Güncel Bilgiler",
                    "topic": "Karma Vatandaşlık" if civic else "Genel Kültür ve Güncel Bilgiler",
                    "text": f"Yargı 2026 · Deneme {exam['exam']:02d} · Soru {n:02d}",
                    "options": list("ABCDE"), "answer": "ABCDE".index(exam["answers"][n-1]),
                    "explanation": "", "imageUrl": f"/uploads/{PREFIX}/{identifier}.webp",
                    "imageContainsQuestion": True,
                    "source": {"title": pdf.stem, "page": entry["page"], "exam": exam["exam"], "question": n},
                })
                audit.append({"id": identifier, "page": entry["page"], "bounds": list(rect), "answer": exam["answers"][n-1]})
    assert len(records) == count
    dest = ROOT / "tmp" / "pdfs" / "vatandaslik"
    for offset in range(0, len(records), 20):
        sheet = Image.new("RGB", (1400, 1800), "#e5e7eb")
        draw = ImageDraw.Draw(sheet)
        for j, record in enumerate(records[offset:offset+20]):
            image = Image.open(ROOT / "public" / record["imageUrl"].lstrip("/"))
            image.thumbnail((270, 415))
            x, y = (j % 5)*280, (j // 5)*450
            draw.text((x+5, y+4), record["id"].replace(PREFIX+'_','')+' / '+"ABCDE"[record["answer"]], fill="black")
            sheet.paste(image, (x+5, y+25))
        sheet.save(dest / f"contact-{offset//20+1:02d}.jpg", quality=90)
    data_path = ROOT / "src" / "data" / "questions.json"
    existing = json.loads(data_path.read_text(encoding="utf-8"))
    backup = dest / "questions-before-import.json"
    if not backup.exists():
        backup.write_text(json.dumps(existing, ensure_ascii=False, indent=2), encoding="utf-8")
    merged = [q for q in existing if not q["id"].startswith(PREFIX+"_")] + records
    assert len({q["id"] for q in merged}) == len(merged)
    data_path.write_text(json.dumps(merged, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    (dest / "audit.json").write_text(json.dumps({"sourceSha256": source_hash, "count": count, "excluded": [{"exam": 1, "question": 15, "reason": "Printed answer key and option disagree"}], "questions": audit}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Imported:", {s: sum(q["subject"] == s for q in records) for s in {q["subject"] for q in records}})


def lines(page):
    result = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            result.append({"text": "".join(s["text"] for s in line["spans"]).strip(), "box": line["bbox"]})
    return result


def question_markers(page):
    # Number gutter, not Roman-numbered statements inside the question body.
    candidates = []
    words = page.get_text("words", sort=True)
    for index, word in enumerate(words):
        x, y, x1, y1, text, *_ = word
        col = 0 if x < 200 else 1
        left = x - col * 237
        if not (16 <= left <= 55 and 50 < y < 718):
            continue
        raw = text
        if text in ["1", "7", "11"]:
            following = [w for w in words if 0 <= w[0]-x1 < 6 and abs(w[1]-y) < 8]
            if following:
                raw += following[0][4]
        raw = raw.replace("O", "0").replace("o", "0")
        raw = raw.replace("s.", "5.").replace("•", ".")
        m = re.fullmatch(r"(\d{1,2})[.,_-]", raw)
        if m and 1 <= int(m[1]) <= 15:
            candidates.append({"number": int(m[1]), "column": col, "x": x, "y": y, "bottom": y1})
    # These four number gutters were checked against the original page image.
    overrides = {13: (14, 1, 260.5, 370), 113: (9, 1, 262.5, 371),
                 149: (8, 1, 266.76, 54.48)}
    if page.number + 1 in overrides:
        n, col, x, y = overrides[page.number + 1]
        candidates.append(dict(number=n, column=col, x=x, y=y, bottom=y+14))
    unique = {}
    for marker in sorted(candidates, key=lambda m: m["x"]):
        unique.setdefault(marker["number"], marker)
    return sorted(unique.values(), key=lambda m: (m["column"], m["y"]))


def answer_letters(page):
    found = []
    for line in lines(page):
        pattern = r"CEVA\s*P?\s*[:;]*\s*([A-E8O])\b"
        m = re.search(pattern, line["text"], re.I)
        if not m and "CEVA" in line["text"]:
            x, y, x1, y1 = line["box"]
            nearby = page.get_text("text", clip=pymupdf.Rect(x-2,y-2,min(page.rect.width,x1+20),y1+2))
            m = re.search(pattern, nearby, re.I)
        if m:
            x, y, *_ = line["box"]
            found.append((0 if x < page.rect.width / 2 else 1, y, m[1].upper().replace("8", "B").replace("O", "D")))
    # Printed answer labels whose OCR lost the word CEVAP; visually verified.
    if page.number + 1 == 30:
        found.append((0, 686.16, "D"))
    if page.number + 1 == 142:
        found.append((0, 696.24, "B"))
    return [r[2] for r in sorted(found)]


def inspect(doc):
    starts = [i for i, page in enumerate(doc) if re.search(r"ÇÖZÜMLÜ\s+44\s+DENEME", page.get_text())]
    report = []
    for index, start in enumerate(starts):
        end = starts[index+1] if index+1 < len(starts) else len(doc)
        keys, qpages = [], []
        for p in range(start, end):
            answers = answer_letters(doc[p])
            if answers:
                keys.extend(answers)
            elif not keys:
                markers = question_markers(doc[p])
                if p != start:
                    markers = [m for m in markers if m["number"] != 1]
                qpages.append({"page": p+1, "markers": markers})
        report.append({"exam": index+1, "start": start+1, "end": end, "answers": keys, "pages": qpages})
    return report


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--inspect", action="store_true")
    parser.add_argument("--count", type=int, default=500)
    args = parser.parse_args()
    doc = pymupdf.open(args.pdf)
    report = inspect(doc)
    dest = ROOT / "tmp" / "pdfs" / "vatandaslik"
    dest.mkdir(parents=True, exist_ok=True)
    (dest / "inspection.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("Exams:", len(report))
    for e in report:
        print(e["exam"], "pages", e["start"], e["end"], "answers", len(e["answers"]), "markers", [(p["page"], [m["number"] for m in p["markers"]]) for p in e["pages"]])
    if not args.inspect:
        extract(doc, report, args.pdf, args.count)


if __name__ == "__main__":
    main()
