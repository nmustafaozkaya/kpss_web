"""Reviewed per-question topic assignments; never changes questions or answers."""
import json
from question_store import read_questions, write_questions
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TOPICS = dict(H='Temel Hukuk Kavramları', A='Anayasal Kavramlar', T='Türk Anayasa Tarihi',
              F='Temel Hak ve Ödevler', L='Yasama', E='Yürütme', J='Yargı', I='İdare Hukuku')
# Each character identifies the topic of that exam's question, starting at 1.
EXAMS = [
    'HHHHLEJIHI', 'HHHHLEAJI', 'HHHL LHJIA'.replace(' ', ''),
    'HHHLLEJIA', 'HHHLEHJIA', 'HHHLELJIA', 'HHHLELJAI',
    'HHHLLEJIA', 'HHL LLELAI'.replace(' ', ''), 'HHHETLEEA',
    'HHHLLEJIA', 'HHHLELJIA', 'HHHHLEJIA', 'HHHLEJFIA',
    'HFHHLEJIA', 'HHHHLEJIA', 'HHHHLEJIA', 'HHHLEJEIA',
    'HHHHLELJA', 'HHHHHHLEJ', 'HHHLEJTLL', 'HHHFLHJAF',
    'HHIAL LIII'.replace(' ', ''), 'HHHJILLII', 'HHLJEF EII'.replace(' ', ''),
    'HHHFLLIIE', 'HHHALEEII', 'HHHFLJIII', 'HFHAFLIII',
    'HHHTFEJII', 'HHHEEJIII', 'HHHELLIII', 'HHHJJJIII', 'HHHAFFE',
]

def main():
    questions = read_questions()
    original = json.dumps(questions, ensure_ascii=False, indent=2)
    backup = ROOT / 'tmp/pdfs/vatandaslik/questions-before-topics.json'
    backup.parent.mkdir(parents=True, exist_ok=True)
    if not backup.exists():
        backup.write_text(original, encoding='utf-8')
    aliases = {'Hukukun Temel Kavramları': TOPICS['H'], 'Demokrasi ve Devlet Biçimleri': TOPICS['A'],
               "1982 Anayasası'nın Temel İlkeleri": TOPICS['A'], 'Temel Hak ve Özgürlükler': TOPICS['F']}
    for q in questions:
        if q['subject'] != 'Vatandaşlık':
            continue
        if q['id'].startswith('yargi_vat_2026_'):
            src = q['source']
            q['topic'] = TOPICS[EXAMS[src['exam']-1][src['question']-1]]
        else:
            q['topic'] = aliases.get(q['topic'], q['topic'])
        assert q['topic'] in TOPICS.values(), q['id']
    write_questions(questions)
    print(Counter(q['topic'] for q in questions if q['subject']=='Vatandaşlık'))

if __name__ == '__main__':
    main()
