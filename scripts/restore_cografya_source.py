"""Build reviewed Yargı geography records without importing solutions.
Only --apply changes the question bank. Existing IDs and other subjects survive.
"""
import argparse,copy,importlib.util,json,re
from pathlib import Path
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'scripts/cografya-review'
WORK=ROOT/'tmp/pdfs/yargi-cografya'
module=importlib.util.spec_from_file_location('reviewed',OUT/'reviewed.py')
reviewed=importlib.util.module_from_spec(module);module.loader.exec_module(reviewed)
bank=ROOT/'src/data/questions/cografya.json'
data=json.loads(bank.read_text(encoding='utf8'))
candidates=json.loads((OUT/'candidates.json').read_text(encoding='utf8'))
solutions=json.loads((OUT/'source-solutions.json').read_text(encoding='utf8'))
figures=json.loads((OUT/'figures-auto.json').read_text(encoding='utf8'))
candidates.update({'cogr_d28_q12':{'page':144},'cogr_d33_q6':{'page':168}})
manual=json.loads((OUT/'answer-key-overrides.json').read_text(encoding='utf8'))
topics={1:"Türkiye'nin Coğrafi Konumu",2:"Türkiye'nin Fiziki Özellikleri",3:"Türkiye'nin Fiziki Özellikleri",
        4:"Türkiye'nin İklimi ve Bitki Örtüsü",5:"Türkiye'nin İklimi ve Bitki Örtüsü",6:"Türkiye'nin Fiziki Özellikleri",
        7:"Türkiye'nin Fiziki Özellikleri",8:"Türkiye'de Nüfus ve Yerleşme",9:"Türkiye'de Nüfus ve Yerleşme",10:"Türkiye'de Nüfus ve Yerleşme",
        11:"Türkiye'de Hayvancılık",12:"Türkiye'de Tarım",14:"Türkiye'de Madenler ve Enerji",15:"Türkiye'de Sanayi",16:"Türkiye'de Ulaşım",17:"Türkiye'de Ulaşım",18:"Türkiye'nin Coğrafi Bölgeleri"}
overrides={
 "Türkiye'nin Coğrafi Konumu":['d8_q18'],
 "Türkiye'nin Fiziki Özellikleri":['d19_q5','d21_q18','d27_q4'],
 "Türkiye'de Sanayi":['d29_q14'],
 "Türkiye'nin İklimi ve Bitki Örtüsü":['d32_q6','d33_q6'],
 "Türkiye'de Hayvancılık":['d21_q12','d22_q12','d23_q12','d26_q12','d27_q12'],
 "Türkiye'de Tarım":['d28_q11','d31_q11','d30_q12'],
 "Türkiye'de Madenler ve Enerji":['d16_q15'],
 "Türkiye'de Turizm":['d14_q17','d17_q17','d21_q17','d28_q17','d29_q17','d30_q17','d31_q16','d31_q17','d32_q17'],
 "Türkiye'de Ulaşım":['d7_q16','d32_q2'],
}
def normalize(s):
    replacements={'812 °C':'8–12 °C','oluşmuştu r.':'oluşmuştur.','görül. düğü':'görüldüğü',
        'ipek Böcekçiliği':'İpek böcekçiliği','ipek böcekçiliği':'İpek böcekçiliği',
        'İpek böcekçiliği':'ipek böcekçiliği','numara !arla':'numaralarla',
        'ham maddesioyöreden':'ham maddesi o yöreden','numaralandırıl• mış':'numaralandırılmış',
        'her yer de':'her yerde','14002000 KWh/m2-yıl':'1400–2000 kWh/m²-yıl',
        "'Ancak":'Ancak','lhlara':'Ihlara','imkAnlar':'imkânlar',
        'oluşmuştu r':'oluşmuştur','işaretleG nerek':'işaretlenerek',
        '812':'8–12','arttır':'artır','Anason üretimi':'anason üretimi',
        "İskenderun 'daki":"İskenderun’daki"}
    for a,b in replacements.items():s=s.replace(a,b)
    return s.strip()
result=[]
for old in data:
    q=copy.deepcopy(old)
    if not q['id'].startswith('cogr_'): result.append(q);continue
    id=q['id'];d,n=map(int,re.fullmatch(r'cogr_d(\d+)_q(\d+)',id).groups())
    q.update(reviewed.PATCH.get(id,{}))
    q['text']=normalize(q['text']);q['options']=[normalize(o) for o in q['options']]
    q['answer']='ABCDE'.index(manual[id]) if id in manual else solutions[id]['answer']
    q['topic']=topics[n]
    for topic,ids in overrides.items():
        if id.removeprefix('cogr_') in ids:q['topic']=topic
    q['explanation']='';q['imageUrl']=None;q.pop('imageContainsQuestion',None)
    q['source']={'title':'Yargı KPSS Coğrafya 33 Deneme 2026','page':candidates[id]['page'],'exam':d,'question':n}
    if id in figures:
        q['imageUrl']=f'/questions/cografya/yargi-2026/{id}.webp'
    result.append(q)
assert len(data)==len(result)
for q in result:
    assert q['text'] and len(q['options'])==len(set(q['options']))==5,q['id']
    assert q['options']!=list('ABCDE') or (q.get('imageContainsQuestion') and q.get('imageUrl')),q['id']
    assert all(o.strip() for o in q['options']) and 0<=q['answer']<5,q['id']
(OUT/'reviewed.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
parser=argparse.ArgumentParser();parser.add_argument('--apply',action='store_true');args=parser.parse_args()
if args.apply:
    dest=ROOT/'public/questions/cografya/yargi-2026';dest.mkdir(parents=True,exist_ok=True)
    for id,f in figures.items():
        im=Image.open(WORK/f"p{f['page']:03}{f['side']}.png")
        im.crop(tuple(f['rect'])).save(dest/f'{id}.webp',quality=90,method=6)
    baseline=OUT/'before-source-restore.json'
    if not baseline.exists():baseline.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    bank.write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print('Reviewed:',sum(q['id'].startswith('cogr_') for q in result),'Figures:',len(figures),'Total:',len(result),'Applied:',args.apply)
