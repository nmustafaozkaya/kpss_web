import json,re
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/'tmp/pdfs/yargi-cografya'
OUT=ROOT/'scripts/cografya-review'
STARTS=[5,10,15,20,25,30,35,40,45,50,55,60,65,70,76,81,86,91,96,101,106,111,117,122,127,133,138,143,148,153,158,163,168,173]

def words(o):
    result=[]
    for line in o['tsv'].splitlines():
        w=line.split('\t')
        if w[0]=='5' and len(w)>11 and w[11].strip():
            result.append(dict(x=int(w[6]),y=int(w[7]),w=int(w[8]),h=int(w[9]),text=w[11],line=tuple(w[1:5])))
    return result

def extract():
    bank=json.loads((ROOT/'src/data/questions/cografya.json').read_text(encoding='utf8'))
    wanted={q['id'] for q in bank if q['id'].startswith('cogr_')}
    candidates={}; solutions={}; missing=[]
    for d in range(1,34):
        if not any(q.startswith(f'cogr_d{d}_') for q in wanted): continue
        for p in range(STARTS[d-1],STARTS[d]):
            is_sol=p>=STARTS[d]-2
            for side in 'LR':
                file=WORK/f'p{p:03}{side}.json'
                if not file.exists(): continue
                o=json.loads(file.read_text(encoding='utf8')); ws=words(o)
                marks=[]
                for w in ws:
                    if w['x']<65 and re.fullmatch(r'\d{1,2}[.,]',w['text']):
                        n=int(w['text'].rstrip('.,'))
                        if 1<=n<=18: marks.append((w['y'],n))
                marks=sorted(set(marks))
                for i,(y,n) in enumerate(marks):
                    end=marks[i+1][0] if i+1<len(marks) else 1687
                    lines={}
                    for w in ws:
                        if y-3<=w['y']<end-3:
                            lines.setdefault(w['line'],[]).append(w)
                    text='\n'.join(' '.join(w['text'] for w in sorted(row,key=lambda w:w['x'])) for row in sorted(lines.values(),key=lambda row:min(w['y'] for w in row)))
                    id=f'cogr_d{d}_q{n}'
                    if is_sol:
                        ans=re.findall(r'CEVAP\s*[:;.]?\s*([A-E])',text)
                        if ans: solutions[id]={'answer':'ABCDE'.index(ans[-1]),'page':p,'text':text}
                    elif id in wanted:
                        candidates[id]={'page':p,'side':side,'y':y,'end':end,'ocr':text}
    # OCR frequently confuses the printed 9 with 8. Answers have a stable
    # reading order, so use that order only when all 18 are present.
    solutions={}
    for d in range(1,34):
        entries=[]
        for p in range(STARTS[d]-2,STARTS[d]):
            for side in 'LR':
                f=WORK/f'p{p:03}{side}.json'
                if not f.exists(): continue
                t=json.loads(f.read_text(encoding='utf8'))['text']
                last=0
                for m in re.finditer(r'CEVAP\s*[:;.]?\s*([A-E])',t):
                    entries.append({'answer':'ABCDE'.index(m[1]),'page':p,'text':t[last:m.end()]})
                    last=m.end()
        if len(entries)==18:
            for n,entry in enumerate(entries,1): solutions[f'cogr_d{d}_q{n}']=entry
        else: print('solution count',d,len(entries))
    for id in sorted(wanted):
        if id not in candidates: missing.append(id)
    (OUT/'candidates.json').write_text(json.dumps(candidates,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (OUT/'source-solutions.json').write_text(json.dumps(solutions,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('candidates',len(candidates),'solutions',len(solutions),'missing',missing)

if __name__=='__main__':extract()

