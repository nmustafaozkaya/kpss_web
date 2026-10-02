"""Import the supplied 41-exam PDF using its printed answer key."""
import argparse
import hashlib
import json
import re
import unicodedata
from pathlib import Path
import pymupdf
from question_store import ROOT, read_questions, write_questions

PREFIX = 'orel_guncel_41_'

def clean(text):
    text = unicodedata.normalize('NFC', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r',(?=[A-Za-zÇĞİÖŞÜçğıöşü])', ', ', text)
    return (text.replace('Molodili yol', 'Melodili yol').replace('İbrahim .allı', 'İbrahim Çallı')
            .replace('Cumhurbaşlanlığı', 'Cumhurbaşkanlığı').replace('Reifi', 'Resifi')
            .replace('faydalıdır.Sadece', 'faydalıdır. Sadece').replace('Şairi”olarak', 'Şairi” olarak'))

def topic(text):
    s = text.lower()
    if any(w in s for w in ['unesco', 'dünya miras']): return 'UNESCO Dünya Mirası'
    if any(w in s for w in ['olimpiyat','şampiyon','spor','madalya','futbol','voleybol','basketbol','tenis']): return 'Spor'
    if any(w in s for w in ['ressam','resim sanat','tablo','roman','yazar','edebiyat','şair','şiir','eser','sanatçı','oyuncu','sinema','film','oscar','bafta','mimar','tiyatro','müzik','dizisi','dizisinde']): return 'Kültür ve Sanat'
    if any(w in s for w in ['uzay','uydu','teknoloji','işletim sistem','sosyal medya','astronot','bilim','yapay zek','füze','drone','teleskop']): return 'Bilim ve Teknoloji'
    if any(w in s for w in ['birleşmiş milletler','nato','teşkilat','örgüt','avrupa birliği']): return 'Uluslararası Kuruluşlar'
    if any(w in s for w in ['dış politika','büyükelçi','diplomasi']): return "Türkiye'nin Dış Politikası"
    if any(w in s for w in ['proje','ekonomi','liman','tünel','köprü','baraj','merkez bank','enerji','ihracat','santral']): return 'Ekonomi ve Projeler'
    return 'Güncel Olaylar' if re.search(r'202[4-6]',s) else 'Genel Kültür ve Güncel Bilgiler'

def extract(pdf):
    doc = pymupdf.open(pdf)
    assert len(doc)==44, 'Unexpected PDF edition'
    keys = {}
    for page in doc[-2:]:
        for line in page.get_text(sort=True).splitlines():
            m = re.search(r'Deneme\s+(\d+)\s+(.*)',line)
            if m:
                keys[int(m[1])] = {int(n):'ABCDE'.index(a) for n,a in re.findall(r'(\d)-\s*([A-E])',m[2])}
    assert len(keys)==41
    records=[]
    for exam in range(1,42):
        text = doc[exam].get_text()
        text = text.replace('KPSS_KOD GÜNCEL DENEMELER','').replace('KPSS_KOD','')
        text = re.sub(r'Güncel Bilgiler Deneme\s+\d+','',text)
        if exam==36: text=text.replace('6"Fatih"','6. "Fatih"')
        marks=list(re.finditer(r'(?m)^(\d)[.]\s*',text))
        assert {int(m[1]) for m in marks}==set(keys[exam]), (exam,'question/key mismatch')
        for i,m in enumerate(marks):
            number=int(m[1])
            body=text[m.end():marks[i+1].start() if i+1<len(marks) else len(text)]
            labels=list(re.finditer(r'(?m)^\s*([A-E])\)\s*',body))
            assert ''.join(o[1] for o in labels)=='ABCDE',(exam,number,'labels')
            stem=clean(body[:labels[0].start()])
            opts=[clean(body[o.end():labels[j+1].start() if j<4 else len(body)]) for j,o in enumerate(labels)]
            assert len(stem)>20 and all(opts) and len(set(opts))==5,(exam,number,'structure')
            overrides={(7,1):'Genel Kültür ve Güncel Bilgiler',(34,4):'Kültür ve Sanat',(4,5):'Kültür ve Sanat',(29,2):'Kültür ve Sanat'}
            records.append(dict(id=f'{PREFIX}d{exam:02}_q{number:02}',subject='Güncel Bilgiler',topic=overrides.get((exam,number),topic(stem)),text=stem,options=opts,answer=keys[exam][number],explanation='',source=dict(title='Özlem Örel — Güncel Bilgiler Denemeleri (2026)',page=exam+1,exam=exam,question=number)))
    records.sort(key=lambda q:q['id'])
    assert len(records)==244 and len({q['id'] for q in records})==244
    return records, keys

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('pdf',type=Path)
    parser.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    records,keys=extract(args.pdf)
    dest=ROOT/'tmp/pdfs/guncel';dest.mkdir(parents=True,exist_ok=True)
    (dest/'drafts.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
    if args.apply:
        before=read_questions()
        untouched=[q for q in before if not q['id'].startswith(PREFIX)]
        write_questions(untouched+records)
        assert all(q in read_questions() for q in untouched)
        audit=dict(sourceSha256=hashlib.sha256(args.pdf.read_bytes()).hexdigest(),count=len(records),preserved=len(untouched),answerKeys=keys,ids=[q['id'] for q in records])
        (ROOT/'scripts/guncel-import-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(f'Added {len(records)}; preserved {len(untouched)}; total {len(untouched)+len(records)}')
    else: print('Validated drafts:',len(records))

if __name__=='__main__': main()
