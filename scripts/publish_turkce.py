"""Publish the frozen text-question selection without replacing existing questions."""
import argparse
from question_store import read_questions, write_questions
import json
import re
from pathlib import Path
from collections import Counter

ROOT=Path(__file__).resolve().parents[1]
WORK=ROOT/'tmp/pdfs/turkce'
FIELDS=('id','subject','topic','text','options','answer','explanation','source')

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--select',action='store_true')
    parser.add_argument('--apply',action='store_true')
    args=parser.parse_args()
    drafts=json.loads((WORK/'drafts.json').read_text(encoding='utf-8'))
    manifest=ROOT/'scripts/turkce-selection.json'
    if args.select:
        candidates=[q for q in drafts if not q['issues']]
        def score(q):
            ocr=json.loads((WORK/(q['column']+'.json')).read_text(encoding='utf-8'))
            full=q['text']+' '+' '.join(q['options'])
            low=[]
            for line in ocr['tsv'].splitlines():
                c=line.split('\t')
                if len(c)==12 and c[0]=='5' and len(c[11])>3 and c[11] in full and float(c[10])<50:
                    low.append(c[11])
            return (len(set(low)), -ocr['confidence'],q['id'])
        candidates.sort(key=score)
        chosen=candidates[:500]
        assert len(chosen)==500
        manifest.write_text(json.dumps(sorted(q['id'] for q in chosen),indent=2)+'\n',encoding='utf-8')
    ids=json.loads(manifest.read_text(encoding='utf-8'))
    assert len(ids)==len(set(ids))==500
    byid={q['id']:q for q in drafts}
    selected=[]
    keys=[''.join(re.findall('[A-E]',x)) for x in json.loads((ROOT/'scripts/turkce-answer-key.json').read_text(encoding='utf-8'))]
    for id in ids:
        q=byid[id]
        assert not q['issues'],(id,q['issues'])
        assert len(q['text'])>=35 and len(q['options'])==len(set(q['options']))==5
        assert all(o.strip() for o in q['options'])
        assert q['answer']=='ABCDE'.index(keys[q['source']['exam']-1][q['source']['question']-1])
        assert q['explanation']==''
        selected.append({field:q[field] for field in FIELDS})
    (WORK/'selected.json').write_text(json.dumps(selected,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(Counter(q['topic'] for q in selected))
    if args.apply:
        data=read_questions()
        original=json.dumps(data,ensure_ascii=False,indent=2)
        backup=WORK/'questions-before-turkce.json'
        if not backup.exists(): backup.write_text(original,encoding='utf-8')
        untouched=[q for q in data if not q['id'].startswith('pegem_tr_30_')]
        result=untouched+selected
        assert len({q['id'] for q in result})==len(result)
        write_questions(result)
        print(f'Published {len(selected)}; preserved {len(untouched)}; total {len(result)}')

if __name__=='__main__': main()
