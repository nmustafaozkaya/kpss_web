"""Read-only source and asset validation; writes audit.json, exits nonzero on errors."""
import argparse
import hashlib
import json
from collections import Counter
from pathlib import Path
from PIL import Image
from import_yediiklim_cografya import assemble

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'scripts/cografya-review'


def read(path):
    return json.loads(path.read_text(encoding='utf-8'))


def main():
    argparse.ArgumentParser(description=__doc__).parse_args()
    path = ROOT / 'src/data/questions/cografya.json'
    questions = read(path)
    baseline = read(OUT / 'before-source-restore.json')
    reviewed = {q['id']: q for q in read(OUT / 'reviewed.json')}
    solutions = read(OUT / 'source-solutions.json')
    manual = read(OUT / 'answer-key-overrides.json')
    figures = read(OUT / 'figures-auto.json')
    yediiklim, _ = assemble()
    imported = {q['id']: q for q in yediiklim}
    issues = []

    def check(ok, id, reason):
        if not ok:
            issues.append({'id': id, 'reason': reason})

    ids = [q['id'] for q in questions]
    expected_ids = [q['id'] for q in baseline if q['id'].startswith('cogr_')] + list(imported)
    check(Counter(ids) == Counter(expected_ids), 'bank', 'Beklenen soru kimlikleriyle uyuşmuyor.')
    check(len(ids) == len(set(ids)), 'bank', 'Tekrarlanan soru kimliği.')
    for q in questions:
        id = q['id']
        check(q.get('subject') == 'Coğrafya', id, 'Yanlış ders.')
        check(bool(q.get('text', '').strip()) and bool(q.get('topic')), id, 'Eksik metin/konu.')
        options = q.get('options', [])
        check(len(options) == 5 and all(isinstance(o, str) and o.strip() for o in options)
              and len(set(options)) == 5
              and (options != list('ABCDE') or (q.get('imageContainsQuestion') is True and q.get('imageUrl'))), id, 'Eksik/tekrarlı şık.')
        check(type(q.get('answer')) is int and 0 <= q['answer'] < 5, id, 'Geçersiz cevap.')
        if id in reviewed:
            check(q == reviewed[id], id, 'Önceden incelenmiş kayıt değişmiş.')
        if id.startswith('cogr_'):
            expected = 'ABCDE'.index(manual[id]) if id in manual else solutions.get(id, {}).get('answer')
            check(q['answer'] == expected, id, 'Kaynak cevap anahtarıyla uyuşmuyor.')
            check(not q.get('explanation'), id, 'İncelenmemiş çözüm metni aktarılmış.')
            exam, number = (int(v[1:]) for v in id.split('_')[1:])
            source = q.get('source', {})
            check(source.get('exam') == exam and source.get('question') == number
                  and 1 <= source.get('page', 0) <= 172, id, 'Geçersiz kaynak bilgisi.')
            expected_image = f'/questions/cografya/yargi-2026/{id}.webp' if id in figures else None
            check(q.get('imageUrl') == expected_image, id, 'İncelenmiş görsel eşleşmesi değişmiş.')
        else:
            check(q == imported.get(id), id, 'Yediiklim incelenmiş aktarımıyla uyuşmuyor.')
        if q.get('imageUrl'):
            asset = ROOT / 'public' / q['imageUrl'].lstrip('/')
            try:
                with Image.open(asset) as image:
                    check(image.width > 50 and image.height > 50, id, 'Görsel boyutu yetersiz.')
                    image.verify()
            except (OSError, ValueError) as error:
                check(False, id, f'Görsel okunamıyor: {error}')

    report = {
        'total': len(questions),
        'sources': dict(Counter(q['source']['title'] for q in questions)),
        'images': sum(bool(q.get('imageUrl')) for q in questions),
        'topics': dict(Counter(q['topic'] for q in questions)),
        'bankSha256': hashlib.sha256(path.read_bytes()).hexdigest(),
        'pending': issues,
        'note': 'Kaynak cevapları, incelenmiş kayıtlar, soru kimlikleri ve görsel dosyaları kontrol edildi. Güncel istatistik doğrulaması değildir; tarihsel sorularda kaynak dönemi esas alınır.',
    }
    (OUT / 'audit.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(1 if issues else 0)


if __name__ == '__main__':
    main()
