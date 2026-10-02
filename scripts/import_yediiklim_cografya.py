"""Import reviewed geography text and image questions. Use --write to publish."""
import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / 'scripts/yediiklim-cografya'
PREFIX = 'yediiklim_cogr_2026_'
TOPICS = {'K': "Türkiye'nin Coğrafi Konumu", 'F': "Türkiye'nin Fiziki Özellikleri", 'I': "Türkiye'nin İklimi ve Bitki Örtüsü"}
TITLE = 'Yediiklim 2026 Son Viraj 500 Soruda Coğrafya Genel Tekrar Kampı'


def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def write(path, data):
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    temp.replace(path)


def assemble():
    keys = read(INPUT / 'answer-key.json')
    diagrams = read(INPUT / 'diagrams.json')
    rows = (INPUT / 'reviewed.txt').read_text(encoding='utf-8-sig').splitlines()
    result, assets = [], {}
    for row in rows:
        if not row.strip():
            continue
        number, page, code, text, choices = row.split('|', 4)
        options = choices.split(';')
        assert len(options) == len(set(options)) == 5 and all(options), number
        assert keys[number] in 'ABCDE'
        q = {
            'id': PREFIX + f'{int(number):03}', 'subject': 'Coğrafya',
            'topic': TOPICS[code], 'text': text.replace('\\n', '\n'),
            'options': options, 'answer': 'ABCDE'.index(keys[number]),
            'source': {'title': TITLE, 'page': int(page), 'exam': 1, 'question': int(number)},
        }
        if number in diagrams:
            crop = diagrams[number]
            assert crop[0] == int(page)
            assert 0 <= crop[1] < crop[3] <= 1 and 0 <= crop[2] < crop[4] <= 1
            url = f'/questions/cografya/yediiklim-2026/q{int(number):03}.webp'
            q.update(imageUrl=url, imageContainsQuestion=False)
            assets[url] = crop
        result.append(q)
    assert [q['source']['question'] for q in result] == list(range(2, 52))
    expanded_keys = read(INPUT / 'expanded-answer-key.json')
    images = read(INPUT / 'image-reviewed.json')
    assert len(images) == 321 and len({row['number'] for row in images}) == 321
    for row in images:
        number = row['number']
        assert number > 51 and row['answer'] == expanded_keys[str(number)]
        assert row['answer'] in 'ABCDE' and 91 <= row['answerPage'] <= 134
        url = f'/questions/cografya/yediiklim-2026/q{number:03}.webp'
        result.append({
            'id': PREFIX + f'{number:03}', 'subject': 'Coğrafya',
            'topic': row['topic'],
            'text': f"Yediiklim Coğrafya — Soru {number}\nKaynak kitaptaki tarih ve veriler esas alınmıştır.",
            'options': list('ABCDE'), 'answer': 'ABCDE'.index(row['answer']),
            'imageUrl': url, 'imageContainsQuestion': True,
            'source': {'title': TITLE, 'page': row['page'], 'exam': 1, 'question': number},
        })
        # Reviewed coordinates are pixels at renderScale, converted to PDF points below.
        assets[url] = row
    return result, assets


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--write', action='store_true')
    parser.add_argument('--pdf', type=Path)
    args = parser.parse_args()
    questions, assets = assemble()
    if args.pdf:
        import pymupdf
        from PIL import Image
        assert hashlib.sha256(args.pdf.read_bytes()).hexdigest() == read(INPUT / 'source.json')['sha256'], 'Different source PDF'
        with pymupdf.open(args.pdf) as doc:
            assert len(doc) == 135
            for url, crop in assets.items():
                if isinstance(crop, dict):
                    page = crop['page']
                    rect = pymupdf.Rect(*(v / crop['renderScale'] for v in crop['rect']))
                else:
                    page, x0, y0, x1, y1 = crop
                    w, h = doc[page - 1].rect.width, doc[page - 1].rect.height
                    rect = pymupdf.Rect(x0*w, y0*h, x1*w, y1*h)
                p = doc[page - 1]
                pix = p.get_pixmap(matrix=pymupdf.Matrix(3, 3), clip=rect, alpha=False)
                dest = ROOT / 'public' / url.lstrip('/')
                dest.parent.mkdir(parents=True, exist_ok=True)
                Image.frombytes('RGB', (pix.width, pix.height), pix.samples).save(dest, 'WEBP', quality=90)
    assert all((ROOT / 'public' / url.lstrip('/')).is_file() for url in assets)
    path = ROOT / 'src/data/questions/cografya.json'
    old = read(path)
    retained = [q for q in old if not q['id'].startswith(PREFIX)]
    combined = retained + questions
    assert len({q['id'] for q in combined}) == len(combined)
    new_by_id = {q['id']: q for q in combined}
    assert all(new_by_id.get(q['id']) == q for q in old), 'Existing question would change or disappear'
    other_files = {p: hashlib.sha256(p.read_bytes()).hexdigest() for p in path.parent.glob('*.json') if p != path}
    if args.write:
        write(path, combined)
    else:
        assert old == combined, 'Published data differs'
    assert all(hashlib.sha256(p.read_bytes()).hexdigest() == digest for p, digest in other_files.items())
    audit = {
        'source': TITLE, 'published': len(questions),
        'textQuestions': 50, 'imageQuestions': len(questions) - 50,
        'totalGeographyQuestions': len(combined),
        'questionNumbers': [q['source']['question'] for q in questions],
        'sourcePageConvention': '1-based PDF pages',
        'answerPages': sorted(set(range(91,98)) | {row['answerPage'] for row in read(INPUT / 'image-reviewed.json')}),
        'topics': dict(Counter(q['topic'] for q in questions)),
        'diagramFiles': len(assets),
        'diagramBytes': sum((ROOT / 'public' / url.lstrip('/')).stat().st_size for url in assets),
        'excluded': [{'question': 1, 'reason': 'Gün batımının yönü mevsime bağlı; soruda tarih belirtilmediğinden seçime alınmadı.'}],
        'review': 'İlk 50 metin sorusu korundu. 321 ek sorunun metni, haritası ve A–E seçenekleri kaynak görüntüsü olarak aktarıldı. Cevap harfleri çözüm sayfalarından görsel kontrol edildi. Çözüm açıklamaları aktarılmadı.',
    }
    if args.write:
        write(INPUT / 'audit.json', audit)
    print(json.dumps(audit, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
