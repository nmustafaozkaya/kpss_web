"""Read and write the subject files used by both the site and admin panel."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FILES = json.loads((ROOT/'src/data/question-files.json').read_text(encoding='utf-8'))
DIRECTORY = ROOT/'src/data/questions'

def read_questions():
    return [q for name in FILES.values() for q in json.loads((DIRECTORY/name).read_text(encoding='utf-8'))]

def write_questions(questions):
    assert len({q['id'] for q in questions}) == len(questions)
    assert all(q['subject'] in FILES for q in questions)
    for subject, name in FILES.items():
        target = DIRECTORY/name
        content = json.dumps([q for q in questions if q['subject']==subject],ensure_ascii=False,indent=2)+'\n'
        if target.exists() and target.read_text(encoding='utf-8')==content: continue
        temporary=target.with_suffix('.json.tmp')
        temporary.write_text(content,encoding='utf-8')
        temporary.replace(target)
