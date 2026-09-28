import os
import json
import re

def clean_text_advanced(text):
    if not text:
        return text
    # 1. letter + [middle dot / soft hyphen / hyphen] + optional whitespace + lowercase letter -> merge
    text = re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])[\u00b7\u00ad·\-]\s*([a-zçğıöşü])', r'\1\2', text)
    # 2. letter + whitespace + [middle dot / soft hyphen] + whitespace + lowercase letter -> merge
    text = re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])\s+[\u00b7\u00ad·]\s*([a-zçğıöşü])', r'\1\2', text)
    # 3. letter + hyphen + newline + letter -> merge (standard line break hyphenation)
    text = re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])-\s*\n\s*([A-Za-zÇĞİÖŞÜçğıöşü])', r'\1\2', text)
    # 4. Remove any remaining stray middle dots or soft hyphens
    text = text.replace('\u00b7', '').replace('\u00ad', '').replace('·', '')
    # 5. Clean watermark lines or artifacts
    text = re.sub(r'\n[YARGINEVM~\s:<>_=]{1,2}(?=\n)', '', text)
    # 6. Normalize multiple spaces
    text = re.sub(r'[ \t]+', ' ', text)
    # 7. Normalize multiple newlines
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()

def main():
    json_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "questions.json")
    with open(json_path, "r", encoding="utf-8") as f:
        questions = json.load(f)

    cleaned_count = 0
    for q in questions:
        old_text = q.get("text", "")
        new_text = clean_text_advanced(old_text)
        
        old_options = q.get("options", [])
        new_options = [clean_text_advanced(opt) for opt in old_options]
        
        old_exp = q.get("explanation", "")
        new_exp = clean_text_advanced(old_exp)

        if old_text != new_text or old_options != new_options or old_exp != new_exp:
            cleaned_count += 1
            q["text"] = new_text
            q["options"] = new_options
            q["explanation"] = new_exp

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(questions, f, ensure_ascii=False, indent=2)

    print(f"Successfully cleaned {cleaned_count} of {len(questions)} questions in src/data/questions.json!")

if __name__ == "__main__":
    main()
