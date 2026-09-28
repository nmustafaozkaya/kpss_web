import json
import re

with open('src/data/questions.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match the questions array in questions.ts
match = re.search(r'export const questions: Question\[\] = (\[[\s\S]*?\n\]);', content)
if match:
    raw = match.group(1)
    raw = re.sub(r'/\*.*?\*/', '', raw)
    # quote keys
    raw = re.sub(r'(\b[a-zA-Z_]\w*\b)\s*:', r'"\1":', raw)
    # remove trailing commas
    raw = re.sub(r',\s*([\}\]])', r'\1', raw)
    data = json.loads(raw)
    with open('src/data/questions.json', 'w', encoding='utf-8') as out:
        json.dump(data, out, ensure_ascii=False, indent=2)
    print(f'Successfully created src/data/questions.json with {len(data)} questions!')
else:
    print('Not found')
