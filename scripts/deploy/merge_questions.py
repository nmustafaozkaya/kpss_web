"""Merge repository updates with live admin edits. Conflicts stop deployment."""
import json
from pathlib import Path
import sys


def merge(base, live, incoming):
    missing = object()
    by_id = lambda rows: {q['id']: q for q in rows}
    b, l, n = map(by_id, (base, live, incoming))
    result = []
    for key in dict.fromkeys([*n, *l, *b]):
        before, current, update = (d.get(key, missing) for d in (b, l, n))
        if current == before:
            value = update
        elif update == before or current == update:
            value = current
        else:
            raise RuntimeError(f'Question conflict: {key}. Reconcile admin and repository changes before deploying.')
        if value is not missing:
            result.append(value)
    return result


def prepare(source, shared, output):
    files = json.loads((source / 'src/data/question-files.json').read_text())
    def read_bank(folder):
        return [q for filename in files.values() for q in json.loads((folder / filename).read_text())]
    incoming = read_bank(source / 'src/data/questions')
    if (shared / 'base-questions').exists():
        result = merge(read_bank(shared / 'base-questions'), read_bank(shared / 'questions'), incoming)
    else:
        result = incoming
    assert len({q['id'] for q in result}) == len(result)
    output.mkdir(parents=True, exist_ok=False)
    for subject, filename in files.items():
        (output / filename).write_text(json.dumps([q for q in result if q['subject'] == subject], ensure_ascii=False, indent=2) + '\n')
    print(f'Prepared {len(result)} questions, preserving live edits.')


if __name__ == '__main__':
    prepare(*(Path(value) for value in sys.argv[1:]))
