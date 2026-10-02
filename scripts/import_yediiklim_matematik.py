"""Import visually reviewed Yediiklim questions; never run OCR on publish.

python -X utf8 scripts/import_yediiklim_matematik.py --pdf PATH --write
Without --write, validate the input, existing diagram assets and published data.
PDF rendering requires pymupdf and Pillow; checks use the Python standard library.
"""
from __future__ import annotations

import argparse
from collections import Counter
import hashlib
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / 'scripts/yediiklim-matematik'
PREFIX = 'yediiklim_mat_2026_'
TITLE = 'Yediiklim 2026 KPSS 500 Soruda Genel Tekrar Kampı Matematik'
TOPICS = {
    'R': 'Rasyonel Sayılar', 'U': 'Üslü Sayılar', 'K': 'Köklü Sayılar',
    'S': 'Sayılar', 'B': 'Bölme ve Bölünebilme', 'E': 'Basit Eşitsizlikler',
    'M': 'Mutlak Değer', 'C': 'Çarpanlara Ayırma', 'D': 'Denklemler',
    'O': 'Oran - Orantı', 'P': 'Sayı ve Kesir Problemleri', 'L': 'Sayısal Mantık',
    'Y': 'Yüzde Problemleri', 'G': 'Grafik ve Tablo Yorumlama',
    'A': 'Yaş ve Hareket Problemleri', 'H': 'Yaş ve Hareket Problemleri',
    'I': 'İşlem', 'F': 'Fonksiyonlar', 'T': 'Kümeler',
    'N': 'Permütasyon ve Kombinasyon', 'V': 'Olasılık',
    'GA': 'Üçgende Açılar', 'GU': 'Özel Üçgenler', 'GQ': 'Dörtgenler',
    'GP': 'Çokgenler', 'GC': 'Çember ve Daire', 'GX': 'Analitik Geometri',
    'GK': 'Katı Cisimler',
}
# Question starting each PDF page, beginning at PDF page 2 (cover is page 1).
PAGE_STARTS = [
    1,6,11,16,22,27,31,37,43,49,55,60,66,70,74,79,83,87,92,96,
    101,106,112,118,122,126,130,135,141,147,152,156,162,168,174,
    179,184,188,193,198,202,206,210,214,218,222,226,229,233,237,
    241,245,249,252,255,258,261,264,268,270,273,277,279,281,285,
    287,291,294,296,299,303,307,310,314,317,320,322,325,328,331,
    333,336,340,344,348,352,354,356,358,360,362,364,369,373,377,
    381,385,389,393,396,401,405,410,415,420,424,430,435,439,445,
    449,453,457,461,465,469,473,477,481,485,489,493,497,
]
HELD_OUT = {
    418: 'PDF taramasında g(3) eksi ifadesinin ikinci terimi silinmiş.',
    427: 'C seçeneğinin değeri PDF taramasında silinmiş.',
    445: 'Doğru yanıtlama olasılığı belirtilmediği için olasılık hesabı belirsiz. Taslaktaki 1/2 varsayımı yayımlanmadı.',
    471: 'F noktasının BE üzerindeki konumunu belirleyen ek bilgi yok; taralı alan tek değerli değil.',
}
CORRECTIONS = [{
    'question': 315,
    'kind': 'source_option_error',
    'original': 'C: 2340',
    'corrected': 'C: 6240',
    'reason': 'Ocak 500, şubat 800, mart 1280 yeni takipçi; (800 + 1280) × 3 = 6240. Anahtar harfi C korundu.',
}]


def read_json(path: Path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def write_json(path: Path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix(path.suffix + '.tmp')
    temp.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    temp.replace(path)


def assemble():
    shared = read_json(INPUT / 'shared.json')
    keys = read_json(INPUT / 'answer-key.json')
    diagrams = read_json(INPUT / 'diagrams.json')
    assert len(PAGE_STARTS) == 123
    assert len(keys) == 500 and set(keys) <= set('ABCDE')
    rows = (INPUT / 'reviewed.txt').read_text(encoding='utf-8-sig').splitlines()
    rows = [row.split('|', 3) for row in rows if row.strip()]
    assert [int(row[0]) for row in rows] == list(range(1, 501))
    questions, assets = [], {}
    for num, code, text, options in rows:
        number = int(num)
        assert code in TOPICS
        if number in HELD_OUT:
            continue
        text = re.sub(r'@([a-z]+)\s*', lambda m: shared[m[1]] + '\n\n', text)
        text = text.replace('\\n', '\n').strip()
        options = [option.strip() for option in options.split(';')]
        assert len(options) == len(set(options)) == 5, number
        assert all(options) and text and '@' not in text and '[PDF' not in text, number
        subject = 'Geometri' if number >= 451 else 'Matematik'
        page = max(i + 2 for i, start in enumerate(PAGE_STARTS) if start <= number)
        question = {
            'id': PREFIX + f'{number:03}', 'subject': subject,
            'topic': TOPICS[code], 'text': text, 'options': options,
            'answer': 'ABCDE'.index(keys[number - 1]),
            'source': {'title': TITLE, 'page': page, 'exam': 1, 'question': number},
        }
        if num in diagrams:
            crop = diagrams[num]
            assert crop[0] == page, (number, crop, page)
            assert 0 <= crop[1] < crop[3] <= 1 and 0 <= crop[2] < crop[4] <= 1
            slug = 'geometri' if subject == 'Geometri' else 'matematik'
            digest = hashlib.sha256(json.dumps(crop).encode()).hexdigest()[:12]
            url = f'/questions/{slug}/yediiklim-2026/diagram-{digest}.webp'
            question.update(imageUrl=url, imageContainsQuestion=False)
            assets[url] = crop
        questions.append(question)
    assert len(questions) == 500 - len(HELD_OUT)
    return questions, assets


def render_diagrams(pdf: Path, assets: dict):
    import pymupdf
    from PIL import Image
    with pymupdf.open(pdf) as doc:
        assert len(doc) == 125
        for url, crop in assets.items():
            page = doc[crop[0] - 1]
            width, height = page.rect.width, page.rect.height
            clip = pymupdf.Rect(crop[1]*width, crop[2]*height, crop[3]*width, crop[4]*height)
            pix = page.get_pixmap(matrix=pymupdf.Matrix(3, 3), clip=clip, alpha=False)
            target = ROOT / 'public' / url.lstrip('/')
            target.parent.mkdir(parents=True, exist_ok=True)
            Image.frombytes('RGB', (pix.width, pix.height), pix.samples).save(target, 'WEBP', quality=90)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--pdf', type=Path, help='Original local PDF, only needed to render diagrams')
    parser.add_argument('--write', action='store_true')
    args = parser.parse_args()
    questions, assets = assemble()
    if args.pdf:
        render_diagrams(args.pdf, assets)
    for url in assets:
        assert (ROOT / 'public' / url.lstrip('/')).is_file(), f'Missing diagram: {url}'
    unchanged = {
        path: path.read_bytes() for path in (ROOT / 'src/data/questions').glob('*.json')
        if path.stem not in ('matematik', 'geometri')
    }
    for subject, slug in [('Matematik', 'matematik'), ('Geometri', 'geometri')]:
        path = ROOT / f'src/data/questions/{slug}.json'
        existing = read_json(path)
        retained = [q for q in existing if not q['id'].startswith(PREFIX)]
        additions = [q for q in questions if q['subject'] == subject]
        combined = retained + additions
        assert len({q['id'] for q in combined}) == len(combined)
        if args.write:
            write_json(path, combined)
        else:
            assert existing == combined, f'Published data differs: {slug}'
    assert all(path.read_bytes() == data for path, data in unchanged.items())
    audit = {
        'source': TITLE, 'sourcePageConvention': '1-based PDF page; printed page is one less',
        'sourceQuestions': 500, 'published': len(questions),
        'subjects': dict(Counter(q['subject'] for q in questions)),
        'topics': dict(Counter(q['topic'] for q in questions)),
        'diagramQuestions': sum('imageUrl' in q for q in questions),
        'diagramFiles': len(assets),
        'diagramBytes': sum((ROOT / 'public' / url.lstrip('/')).stat().st_size for url in assets),
        'heldOut': [{'question': n, 'reason': reason} for n, reason in HELD_OUT.items()],
        'corrections': CORRECTIONS,
        'review': 'Soru metinleri ve şıklar PDF görüntülerinden okunarak aktarıldı; çözümler alınmadı. Cevap anahtarı PDF 125. sayfadan eşleştirildi. Tüm soruların bağımsız matematiksel çözümü yapıldığı iddia edilmez.',
    }
    if args.write:
        write_json(INPUT / 'audit.json', audit)
    print(json.dumps(audit, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
