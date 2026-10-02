"""Build reviewable text drafts from local OCR; publication requires a reviewed selection."""
import argparse
import bisect
import json
import re
from pathlib import Path
from collections import Counter

ROOT = Path(__file__).resolve().parents[1]
WORK = ROOT / 'tmp/pdfs/turkce'
STARTS = [1,8,15,23,30,37,44,51,58,64,71,78,85,92,98,104,110,117,124,130,136,142,148,154,161,168,175,182,188,194]
MARKER = re.compile(r'@@Q(\d{1,2})@@\s*')
OPTION = re.compile(r'(?<!\w)([ABCDE])(?:O)?[)}]\s*')

def ocr_text(ocr):
    lines={}
    for line in ocr['tsv'].splitlines():
        c=line.split('\t')
        if len(c)!=12 or c[0]!='5' or not c[11].strip(): continue
        key=tuple(c[2:5])
        lines.setdefault(key,[]).append((int(c[6]),int(c[7]),int(c[8]),c[11]))
    candidates=[w[0] for row in lines.values() for w in row[:1] if re.fullmatch(r'\d{1,2}[.,]',w[3]) and w[2]>20 and w[0]<240]
    marker_x=min(candidates,default=120)+35
    out=[]
    for words in lines.values():
        words.sort()
        x,y,w,t=words[0]
        if len(words)==1 and re.fullmatch(r'[PpEeGgMmKkAaDdİ|<>6)]',t): continue
        if re.fullmatch(r'\d{1,2}[.,]',t) and x<=marker_x and w>20 and (len(words)==1 or words[1][3] not in ['ve','-','–']):
            n=int(t[:-1])
            if 1<=n<=30: words[0]=(x,y,w,f'@@Q{n}@@')
        out.append(' '.join(a[3] for a in words))
    return '\n'.join(out)

def clean(s):
    s = re.sub(r'\s+[|—]+(?=\s|$)', '', s)
    s = re.sub(r'(?<=\w)[\-\u00ad]\s*\n(?=\w)', '', s)
    s = re.sub(r'(?m)^\s*[PpEeGgMmKkAaDdİ|<>6)]\s*$', '', s)
    s = re.sub(r'\s+', ' ', s).strip(' —')
    return s.replace('\u00ad', '')

ROMANS=['I','II','III','IV','V','VI','VII','VIII','IX','X']
def roman_text(s):
    if re.search('noktalama|ayraç',s,re.I): return s
    matches=list(re.finditer(r'\(([I1İil!|VvXx/NHJt. ]{0,6})\)',s))
    if 3<=len(matches)<=10:
        last=matches[-1][1].replace('İ','I').replace('l','I').replace('i','I')
        if last==ROMANS[len(matches)-1]:
            for i,m in reversed(list(enumerate(matches))): s=s[:m.start()]+'('+ROMANS[i]+')'+s[m.end():]
    return s

def topic(s):
    s = s.lower()
    prompts=list(re.finditer(r'(?:^|[.!?]\s+)(?:bu (?:parça|cümle|söz|dize)|aşağıdaki|yukarıdaki)',s))
    tail=s[prompts[-1].start():] if prompts else s[-250:]
    if 'anlatım bozuk' in s: return 'Anlatım Bozuklukları'
    if 'yazım' in tail or 'yazılışı' in tail: return 'Yazım Kuralları'
    if 'noktalama' in tail or 'virgül' in tail or 'kesme işareti' in tail: return 'Noktalama İşaretleri'
    if any(x in tail for x in ['ses olayı','ses olay','ünlü düş','ünsüz','ünlü daral','ünlü değiş']): return 'Ses Bilgisi'
    if any(x in tail for x in ['yapım eki','çekim eki','yapıca','yapı bakımından','yapısı bakımından','türemiş','sözcüğün kökü']): return 'Sözcüğün Yapısı'
    if 'çatı' in tail: return 'Fiilde Çatı'
    if any(x in tail for x in ['öge','öğe','yüklemi','yüklem']): return 'Cümlenin Ögeleri'
    if any(x in tail for x in ['cümle tür','cümlelerin tür','cümlelerden hangisi birleşik','cümlelerin hangisi birleşik']): return 'Cümle Türleri'
    if any(x in tail for x in ['sözcük tür','sözcüklerin tür','türü bakımından','fiilimsi','sıfat','zamir','zarf','edat','bağlaç','isim tamlama','ad tamlama','kip eki','kipi','eylem','ek fiil','ek eylem']): return 'Sözcük Türleri'
    if 'bu bilgilere göre' in tail or 'kesin olarak yanlıştır' in tail: return 'Sözel Mantık'
    if any(x in tail for x in ['sözcüğ','sözcük','deyim','sözle anlat','sözün anlam','söz öbe','söz grub']): return 'Sözcükte Anlam'
    if any(x in s[-250:] for x in ['bu cümle','bu söz','bu dizeler','cümleye anlamca','cümlede boş','sözüyle','sözleriyle']): return 'Cümlede Anlam'
    return 'Paragrafta Anlam'

def main():
    keys = [''.join(re.findall('[A-E]', x)) for x in json.loads((ROOT/'scripts/turkce-answer-key.json').read_text(encoding='utf-8'))]
    assert len(keys)==30 and all(len(k)==30 for k in keys)
    drafts=[]
    groups={}
    leads={}
    for f in sorted(WORK.glob('d[0-9][0-9][0-9]_[01].json')):
        page=int(f.stem[1:4]); exam=bisect.bisect_right(STARTS,page-4)
        ocr=json.loads(f.read_text(encoding='utf-8'))
        raw=ocr_text(ocr)
        markers=list(MARKER.finditer(raw))
        if markers:
            pre=raw[:markers[0].start()]
            group=re.search(r'(\d{1,2})\.?\s*(?:ve|[-–])\s*(\d{1,2})[.]?\s*soruları',pre,re.I)
            if group and (exam,page)==(11,81):
                pre=pre[:group.start()]+re.sub(r'^20-90', '28-30', pre[group.start():])
                group=re.search(r'(\d{1,2})\.?\s*(?:ve|[-–])\s*(\d{1,2})[.]?\s*soruları',pre,re.I)
            if group and int(group[1])==int(markers[0][1]) and int(group[1])<int(group[2])<=30:
                header_lines=pre[group.start():].splitlines()
                if len(header_lines)>2:
                    skip=1
                    if not re.search(r'cevaplayınız',header_lines[0],re.I) and (len(header_lines[1])<35 or re.search(r'layınız|Tayınız|dayımı|bağımsız|cevap',header_lines[1],re.I)):
                        skip=2
                    passage=clean('\n'.join(header_lines[skip:]))
                    if len(passage)>150:
                        for n in range(int(group[1]),int(group[2])+1): groups[exam,n]=passage
        if markers and (exam,int(markers[0][1])) not in groups:
            lead_lines=raw[:markers[0].start()].splitlines()
            while lead_lines and (re.match(r'\s*[A-E][)}]',lead_lines[0]) or (len(lead_lines[0])<25 and not lead_lines[0].strip().endswith(('.','?')))): lead_lines.pop(0)
            lead=clean('\n'.join(lead_lines))
            if lead[:1].islower(): lead=re.sub(r'^.{0,160}?cevap\w*[.]?\s*','',lead,count=1)
            if len(lead)>150 and not re.search(r'soruları',lead[:120]): leads[exam,int(markers[0][1])]=lead
        for i,m in enumerate(markers):
            body=raw[m.end():markers[i+1].start() if i+1<len(markers) else len(raw)]
            opts=list(OPTION.finditer(body)); issues=[]
            if ''.join(o[1] for o in opts)!='ABCDE': issues.append('labels')
            if len(opts)!=5: continue
            stem=clean(body[:opts[0].start()])
            stem=roman_text(stem)
            options=[clean(body[o.end():opts[j+1].start() if j<4 else len(body)]) for j,o in enumerate(opts)]
            if all(re.fullmatch(r'[IİıiLl|1VvHNUn .]*',o) for o in options) and re.fullmatch(r'[IİıiLl|1][Vv]',options[3]) and options[4] in ['V','v']:
                options=['I','II','III','IV','V']
            elif all(re.fullmatch(r'[IİıiLl|1VvHNUn .]*',o) for o in options) and options[0]=='II' and options[3]=='V' and options[4].replace('İ','I')=='VI':
                options=ROMANS[1:6]
            if all(re.match(r"[IİıiLl|1VvHNUn(' .]+(?:inci|nci|üncü|cümle)",o) for o in options) and re.match('IV',options[3]) and re.match('V',options[4]):
                options=[re.sub(r"^[IİıiLl|1VvHNUn(' .]+(?=inci|nci|üncü|cümle)", ROMANS[j]+('. ' if 'cümle' in o[:12] else "’"),o) for j,o in enumerate(options)]
            norm=[re.sub(r'[İıiIlL|1!tTfJ]','I',o.strip()).replace('V','V').replace('v','V') for o in options]
            if all(len(o.strip())<=5 for o in options) and sum(bool(o) for o in options)>=3:
                if norm[3] in ('IV','IIV','NV') and norm[4]=='V': options=ROMANS[:5]
                elif norm[3]=='V' and norm[4] in ('VI','VII'): options=ROMANS[1:6]
            if len(stem)<35 or any(not o for o in options) or len(set(options))!=5: issues.append('structure')
            if re.search(r'altı\s*çi|numaralan\w* (?:sözcük|söz)|numaralı (?:sözcük|söz)',stem,re.I): issues.append('format')
            if re.search(r'bu (?:bilgilere|bilgiye|parçaya) göre',stem,re.I) and len(stem)<400: issues.append('shared')
            if re.search(r'\d+\s*[-–]\s*\d+\.?\s*soru',body,re.I): issues.append('group')
            if re.search(r'(?m)^\s*[Iİil|V]{1,5}[.]',body): issues.append('roman')
            if len(stem)<120 and ('bu parça' in stem.lower() or 'bu parç' in stem.lower()): issues.append('shared')
            if int(m[1])>=28: issues.append('shared')
            if re.search(r'[a-zçğıöşü][A-ZÇĞİÖŞÜ]{2}',stem+' '+' '.join(options)): issues.append('ocr-noise')
            if all(len(re.sub(r'[^A-Za-zÇĞİÖŞÜçğıöşü]','',o))<3 for o in options) and options not in [ROMANS[:5],ROMANS[1:6]]: issues.append('punctuation')
            drafts.append(dict(id=f'pegem_tr_30_d{exam:02}_q{int(m[1]):02}',subject='Türkçe',topic=topic(stem),text=stem,options=options,answer='ABCDE'.index(keys[exam-1][int(m[1])-1]),explanation='',source=dict(title='Pegem Türkçe 30 Deneme',page=page,exam=exam,question=int(m[1])),issues=issues,column=f.stem,raw=body))
    byk={(x['source']['exam'],x['source']['question']):x for x in drafts}
    # A preamble without a verified question range cannot safely be shared.
    corrections=json.loads((ROOT/'scripts/turkce-text-corrections.json').read_text(encoding='utf-8'))
    for d in drafts:
        k=(d['source']['exam'],d['source']['question'])
        if k in groups:
            d['text']=groups[k]+'\n\n'+d['text']
            d['issues']=[x for x in d['issues'] if x!='shared']
            if k[1]>=28: d['topic']='Sözel Mantık'
        if re.search(r'[ABCDE]\)',d['text']): d['issues'].append('group-leak')
        d['text']=roman_text(d['text'])
        if re.search(r'numaral\w* (?:noktalama|virgül)|numaralanmış yerlerdeki noktalama',d['text'],re.I): d['issues'].append('format')
        if re.search(r'\((?:[1İil|/]+|[IV]+[İil!|/]+)\)',d['text']): d['issues'].append('roman-residual')
        if re.search(r'(?<!\w)[A-Za-zÇĞİÖŞÜçğıöşü]+[|][A-Za-zÇĞİÖŞÜçğıöşü]',d['text']): d['issues'].append('ocr-noise')
        d['topic']=topic(d['text'])
        if k in groups and (k[1]>=27 or 'Bu bilgilere göre' in d['text']): d['topic']='Sözel Mantık'
        if d['topic'] in ['Paragrafta Anlam','Cümlede Anlam'] and 'hangisi yoktur' in d['text'].lower():
            joined=' '.join(d['options']).lower()
            if sum(x in joined for x in ['zamir','sıfat','fiil','bağlaç','zarf','edat'])>=2: d['topic']='Sözcük Türleri'
            elif sum(x in joined for x in ['cümle','yüklem','devrik','kurallı'])>=2: d['topic']='Cümle Türleri'
            elif 'yapım eki' in joined or 'çekim eki' in joined: d['topic']='Sözcüğün Yapısı'
        fix=corrections.get(d['id'].replace('pegem_tr_30_',''),{})
        if fix.get('exclude'): d['issues'].append('review-excluded')
        for old,new in fix.get('replace',{}).items():
            d['text']=d['text'].replace(old,new)
            d['options']=[o.replace(old,new) for o in d['options']]
        for field in ['text','options','topic']:
            if field in fix: d[field]=fix[field]
        if 'optionPrefixes' in fix:
            d['options']=[prefix+'. '+o.split('. ',1)[1] for prefix,o in zip(fix['optionPrefixes'],d['options'])]
        if re.match(r'^[a-zçğıöşü]',d['text']): d['issues'].append('missing-start')
    (WORK/'drafts.json').write_text(json.dumps(drafts,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Drafts',len(drafts),'clear',sum(not d['issues'] for d in drafts),Counter(x for d in drafts for x in d['issues']))

if __name__=='__main__': main()
