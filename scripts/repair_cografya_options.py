"""Repair visible extraction boundaries; never infer missing answers or remove questions."""
import json
from pathlib import Path
from question_store import read_questions, write_questions

ROOT = Path(__file__).resolve().parents[1]
EXACT = {
    'cogr_d13_q14': ['Boksit — Akseki', 'Trona — Beypazarı', 'Fosfat — Mazıdağı', 'Krom — Kop Dağları', 'Bakır — Küre Dağları'],
    'cogr_d20_q7': ['Kuru dere yataklarının yerleşime açılması', 'Şehirleşme sonucu yeşil alanların azalması', 'İlkbaharda konveksiyonel yağışların görülmesi', 'Derelerin üzerinin yol yapılarak kapatılması', 'Mevcut altyapının yetersiz kalması'],
    'cogr_d20_q17': ['I','II','III','IV','V'],
    'cogr_d22_q12': ['I','II','III','IV','V'],
    'cogr_d22_q14': ['I','II','III','IV','V'],
    'cogr_d29_q16': ['Muğla','Antalya','Trabzon','Çanakkale','Erzurum'],
}
TAILS = {
    'cogr_d7_q4': 'Çentik vadilerin yaygın olduğu arazilerde ortalama yükselti geniş tabanlı vadilerin bulunduğu arazilere göre daha fazladır.',
    'cogr_d7_q17': 'Hattuşaş',
    'cogr_d18_q15': 'V', 'cogr_d20_q11': 'V', 'cogr_d24_q14': 'V',
    'cogr_d32_q6': 'III ve V',
    'cogr_d32_q15': 'V', 'cogr_d33_q15': 'V',
}
ROMANS = {'1':'I','il':'II','11':'II','111':'III','ili':'III','iV':'IV',
          'lvell':'I ve II','lvelll':'I ve III','llvelll':'II ve III',
          'lvelV':'I ve IV','ili ve iV':'III ve IV','lllve iV':'III ve IV',
          'lllvelV':'III ve IV','llve 111':'II ve III','llve iV':'II ve IV',
          'ı ve III':'I ve III','ı ve IV':'I ve IV'}

def main():
    questions = read_questions()
    changes = []
    for q in questions:
        if q['subject'] != 'Coğrafya': continue
        before = list(q['options'])
        if q['id'] in EXACT: q['options'] = EXACT[q['id']].copy()
        if q['id'] in TAILS: q['options'][-1] = TAILS[q['id']]
        q['options'] = [ROMANS.get(o.strip(), o) for o in q['options']]
        if before != q['options']:
            changes.append({'id':q['id'],'before':before,'after':q['options']})
    write_questions(questions)
    if changes:
        (ROOT/'archive/cografya-option-repairs.json').write_text(json.dumps(changes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'{len(changes)} questions repaired; no answers changed and no questions removed.')

if __name__ == '__main__': main()
