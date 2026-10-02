"""Local OCR drafts for the supplied CBA history book; explicit checks before publishing."""
import json
import re
import argparse
import hashlib
from pathlib import Path
from collections import defaultdict, Counter
from question_store import ROOT, read_questions

WORK=ROOT/'tmp/pdfs/tarih'
RANGES=[(1,5,9),(9,13,17),(17,21,25),(25,29,33),(33,37,40),(40,44,47),(47,52,55),(55,59,62),(62,66,69),(69,73,76),(76,80,83),(83,87,90),(90,94,97),(97,101,105),(105,109,113),(113,118,121),(121,126,130),(130,135,138),(138,143,147),(147,152,155)]
PREFIX='cba_tarih_2026_'
TOPICS=dict(zip('ABCDEFGHIJK',[
    'İslamiyet Öncesi Türk Tarihi','İlk Türk-İslam Devletleri',
    'Osmanlı Devleti Siyasi','Osmanlı Devleti Kültür ve Uygarlık',
    '20. Yüzyılda Osmanlı Devleti','Kurtuluş Savaşı Hazırlık Dönemi',
    'Kurtuluş Savaşı Cepheleri','Atatürk İnkılapları','Atatürk İlkeleri',
    'Atatürk Dönemi İç ve Dış Politika','Çağdaş Türk ve Dünya Tarihi']))
# Content-reviewed exceptions to this book's chronological question order.
TOPIC_OVERRIDES={
    'C':'2/13 4/13 9/7 11/12 15/8 16/5',
    'D':'4/8 5/8 8/5 9/8 12/8 13/8 17/4 20/7',
    'E':'1/14 1/20 3/14 4/14 5/14 6/17 6/20 8/12 10/12 12/13 12/14 14/14 15/12 15/14 16/11 16/12 16/16 16/22 17/11 17/12 18/11 18/12 18/13 20/11 20/12 20/20',
    'F':'1/21 2/14 6/13 6/18 7/13 9/13 9/17 11/15 13/13 13/16 15/18 18/17 19/13',
    'G':'7/18 11/16 17/16 17/22 18/18 20/16',
    'H':'6/21 10/21',
    'I':'2/20 3/21 4/21 5/19 6/22 7/19 8/20 9/20 10/19 11/21 12/19 13/21 14/20 15/19 16/20 17/20 18/20 19/19 20/18',
    'J':'3/20 5/21 5/23 7/20 8/22 8/23 9/19 10/18 11/20 12/20 13/20 15/22 17/19 17/23 18/19 18/23 19/22 19/23 20/19',
    'K':'5/24'}
TOPIC_BY_ID={k:TOPICS[t] for t,ids in TOPIC_OVERRIDES.items() for k in ids.split()}

def topic(exam,num):
    default=next(t for limit,t in [(1,'A'),(3,'B'),(4,'C'),(7,'D'),(12,'C'),(13,'E'),(16,'F'),(19,'G'),(23,'H'),(24,'J'),(27,'K')] if num<=limit)
    return TOPIC_BY_ID.get(f'{exam}/{num}',TOPICS[default])

def read(page,col):
    path=WORK/f'z{page:03}_{col}.json'
    return json.loads(path.read_text(encoding='utf-8')) if path.exists() else None

def clean(text):
    text=re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])\s*-\s*\n\s*([a-zçğıöşü])',r'\1\2',text)
    text=re.sub(r'(?m)^\s*[|;:—]+\s*$','',text)
    text=re.sub(r'(?m)\s+[|;—]\s*$','',text)
    text=re.sub(r'\s+',' ',text).strip(' :;—')
    for a,b in {'aşağıdakllerden':'aşağıdakilerden','aşağıdakl':'aşağıdaki','hangisldir':'hangisidir','besİnin':'besinin','Mirf':'Miri','Askerf':'Askerî','Millf':'Millî','millf':'millî','XVIL':'XVII','lJanmacı':'lanması','FilIstin':'Filistin','FilIlstin':'Filistin','sağfamak':'sağlamak','İstanbuPa':'İstanbul’a','Kağan\'ır':'Kağan’ın','kağar oturdum':'kağan oturdum','veriler ad':'verilen ad','gerçek. leşmiştir':'gerçekleşmiştir','Meh. met':'Mehmet','aşağı: dakilerden':'aşağıdakilerden','aşağıda. kilerden':'aşağıdakilerden','teşekkül ederi':'teşekkül eden','alınarı Atatürk':'alınan Atatürk','XiX.':'XIX.','dev lete':'devlete'}.items(): text=text.replace(a,b)
    text=re.sub(r'\b[İIl1]{2}[.] (?=[A-ZÇĞİÖŞÜ])','II. ',text)
    text=re.sub(r'\b[İIl1]{3}[.] (?=[A-ZÇĞİÖŞÜ])','III. ',text)
    return text

def blocks(data):
    lines=defaultdict(list)
    for row in data['tsv'].splitlines():
        v=row.split('\t')
        if len(v)==12 and v[0]=='5' and v[11].strip(): lines[tuple(v[1:5])].append(v)
    ax=[int(w[6]) for words in lines.values() for w in words if w[11]=='A)']
    margin=min(ax)-15 if ax else 0
    groups=[]; current=[]; cleaned=[]; bottom=0
    for words in lines.values():
        text=' '.join(w[11] for w in words)
        text=text.replace('AYOAU','A) OAU').replace('EZ)','E)').replace('DP ve','D) II ve')
        if len(text.strip())<4: continue
        top=min(int(w[7]) for w in words)
        if top-bottom>32 and re.search(r'(?<!\w)[DE£][)]','\n'.join(current)):
            groups.append(('\n'.join(current),'\n'.join(cleaned)));current=[];cleaned=[]
        current.append(text)
        cleaned.append(' '.join(w[11] for w in words if int(w[6])+int(w[8])>=margin and int(w[6])>=margin-5))
        bottom=max(int(w[7])+int(w[9]) for w in words)
    if current:groups.append(('\n'.join(current),'\n'.join(cleaned)))
    return [c for g,c in groups if re.search(r'(?<!\w)A[)]',g)]

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    drafts=[];report=[]
    fixes=json.loads((ROOT/'scripts/cba-tarih-corrections.json').read_text(encoding='utf-8'))
    for exam,(start,solution,end) in enumerate(RANGES,1):
        key=[]
        for page in range(solution,end):
            for col in range(2):
                data=read(page,col)
                if not data: continue
                for line in data['text'].splitlines():
                    hit=re.search(r'[Db][oae]ğru\s+y\w+\s*(.*?)\s*[sş][ea]ç',line)
                    if hit:
                        raw=re.sub(r'[^A-Za-z©8]','',hit[1]).upper().replace('©','C').replace('8','B')
                        key.append(raw[0] if raw and len(set(raw))==1 and raw[0] in 'ABCDE' else None)
        for number in range(1,len(key)+1):
            key[number-1]=fixes['answers'].get(f'{exam}/{number}',key[number-1])
        found=[]
        for page in range(start,solution):
            for col in range(2):
                data=read(page,col)
                if not data: continue
                for body in blocks(data):
                    num=len(found)+1;found.append(num)
                    fixid=f'{exam}/{num}'
                    body=re.sub(r'(?m)^\s*[|:;><] *','',body)
                    body=body.replace('©)','C)').replace('£)','E)').replace('AYOAU','A) OAU')
                    labels=list(re.finditer(r'(?<!\w)([ABCDE])[O0]?[)]\s*',body))
                    issues=[]
                    if ''.join(x[1] for x in labels)!='ABCDE' and fixid not in fixes['options']: issues.append('options')
                    if len(labels)!=5 and fixid not in fixes['options']: continue
                    rawstem=body[:labels[0].start()]
                    markers=list(re.finditer(r'(?m)^\s*[1IİıilLHNV|]{1,4}[.,]?\s+',rawstem))
                    if len(markers)>=2:
                        for j,m in reversed(list(enumerate(markers))):
                            rawstem=rawstem[:m.start()]+' '+['I.','II.','III.','IV.','V.','VI.'][j]+' '+rawstem[m.end():]
                    stem=fixes['text'].get(fixid,clean(rawstem));opts=fixes['options'].get(fixid)
                    if opts is None: opts=[clean(body[x.end():labels[j+1].start() if j<4 else len(body)]) for j,x in enumerate(labels)]
                    def finish(value):
                        for a,b in fixes.get('replacements',{}).items(): value=value.replace(a,b)
                        value=re.sub(r'\b1[.] (?=Murat|Mahmut|Abdülhamit|Kılıç|Beş|Türkiye|Dünya)','I. ',value)
                        value=re.sub(r'\s+[.:]\s+(?=[IV]{1,3}\.)',' ',value)
                        value=re.sub(r'(?<=\?)\s+[.İi\']+$','',value)
                        value=re.sub(r'(?<=\w)-\s+(?=[a-zçğıöşü])','',value)
                        value=re.sub(r'başarıya ulaşmas$','başarıya ulaşması',value)
                        value=re.sub(r'\s+(?:[iİl]|ii|[“>.—-])\s*$','',value)
                        value=re.sub(r'\s+—[. ]*$','',value)
                        return value.strip()
                    stem=finish(stem);opts=[finish(o) for o in opts]
                    if fixid in fixes.get('startAt',{}):
                        start=fixes['startAt'][fixid];assert start in stem,(fixid,start)
                        stem=stem[stem.index(start):]
                    for a,b in fixes.get('specificReplacements',{}).get(fixid,{}).items():stem=stem.replace(a,b)
                    stem=stem.replace('E-KİTAP ','').replace(' — - ',' ').replace(' * | ',' ')
                    stem=re.sub(r'(?<!\S)[e*«#]+\s+(?=[A-ZÇĞİÖŞÜ“])','\n• ',stem).strip()
                    stem=stem.replace('*mareşallik','“mareşallik').replace('*Kemal','“Kemal')
                    if stem.endswith('hangisidir'):stem+='?'
                    if len(stem)<30 or any(not o for o in opts) or len(set(opts))!=5: issues.append('structure')
                    answer=key[num-1] if len(key)==27 and 1<=num<=27 else None
                    answer=fixes['answers'].get(fixid,answer)
                    if not answer: issues.append('answer')
                    if re.search(r'tablo|harita|görsel|şekilde',stem,re.I): issues.append('layout')
                    if re.search(r'(?<!\w)[IİiılL|1]{1,3}(?:[,.]|\s+ve)|Yalnız|\bNI\.',stem+' '+' '.join(opts)): issues.append('roman')
                    drafts.append(dict(id=f'cba_tarih_2026_d{exam:02}_q{num:02}',subject='Tarih',topic=topic(exam,num),text=stem,options=opts,answer='ABCDE'.index(answer) if answer else None,explanation='',source=dict(title='CBA KPSS Tarihin Pusulası 20 Deneme 2026',page=page,exam=exam,question=num),issues=issues,column=f'z{page:03}_{col}',ordinal=len(found)))
        report.append(dict(exam=exam,key=''.join(x or '?' for x in key),questions=found,missing=sorted(set(range(1,28))-set(found))))
    (WORK/'drafts.json').write_text(json.dumps(drafts,ensure_ascii=False,indent=2),encoding='utf-8')
    (WORK/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Questions:',len(drafts),'exams:',len(report))
    assert len(drafts)==540 and len({q['id'] for q in drafts})==540
    assert all(len(q['options'])==5 and all(q['options']) and len(set(q['options']))==5 and isinstance(q['answer'],int) and 0<=q['answer']<5 and q['topic'] in TOPICS.values() for q in drafts)
    assert all(len(r['questions'])==27 and len(r['key'])==27 for r in report)
    assert not any(set(q['issues']) & {'options','structure','answer'} for q in drafts)
    records=[{k:v for k,v in q.items() if k not in ('issues','column','ordinal')} for q in drafts]
    if args.apply:
        before=read_questions()
        untouched=[q for q in before if not q['id'].startswith(PREFIX)]
        other_hashes={p:hashlib.sha256(p.read_bytes()).hexdigest() for p in (ROOT/'src/data/questions').glob('*.json') if p.name!='tarih.json'}
        target=ROOT/'src/data/questions/tarih.json'
        history=[q for q in untouched if q['subject']=='Tarih']+records
        content=json.dumps(history,ensure_ascii=False,indent=2)+'\n'
        if target.read_text(encoding='utf-8')!=content:
            temporary=target.with_suffix('.json.tmp')
            temporary.write_text(content,encoding='utf-8')
            temporary.replace(target)
        after=read_questions()
        assert [q for q in after if not q['id'].startswith(PREFIX)]==untouched
        assert all(hashlib.sha256(p.read_bytes()).hexdigest()==digest for p,digest in other_hashes.items())
        audit=dict(count=len(records),preserved=len(untouched),total=len(after),topics=dict(Counter(q['topic'] for q in records)),answerKeys={str(ex):''.join('ABCDE'[q['answer']] for q in records if q['source']['exam']==ex) for ex in range(1,21)},contentSha256=hashlib.sha256(json.dumps(records,ensure_ascii=False,sort_keys=True).encode()).hexdigest(),editorialNotes=fixes.get('sourceEditorialNotes',{}))
        (ROOT/'scripts/cba-tarih-import-audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
        print(f'Added {len(records)}; preserved {len(untouched)}; total {len(after)}')

if __name__=='__main__':main()
