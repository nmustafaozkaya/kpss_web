import os
import sys
import json
sys.path.insert(0, os.path.dirname(__file__))
import extract_deneme as ed

def main():
    json_path = os.path.join(os.path.dirname(__file__), "..", "src", "data", "questions.json")
    json_path = os.path.abspath(json_path)

    with open(json_path, "r", encoding="utf-8") as f:
        existing = json.load(f)

    # Keep non-Coğrafya questions
    non_cografya = [q for q in existing if q.get("subject") != "Coğrafya"]
    print(f"Preserving {len(non_cografya)} non-Coğrafya questions (Türkçe, Tarih, vb.)...")

    all_cografya = []
    total_images = 0

    print("Extracting Coğrafya denemes from YARGI KPSS COĞRAFYA 33 DENEME 2026.pdf...")
    for d in range(1, 34):
        try:
            res = ed.extract_deneme(d, save_images=True)
            if "questions" in res and res["questions"]:
                qs = res["questions"]
                img_count = sum(1 for q in qs if q.get("imageUrl"))
                total_images += img_count
                print(f" -> Deneme {d}: {len(qs)} soru ayıklandı ({img_count} görselli)")
                for q in qs:
                    # Clean format
                    all_cografya.append({
                        "id": q["id"],
                        "subject": "Coğrafya",
                        "topic": q["topic"],
                        "text": q["text"],
                        "options": q["options"],
                        "answer": q["answer"],
                        "explanation": q.get("explanation", ""),
                        "imageUrl": q.get("imageUrl", None)
                    })
            else:
                print(f" -> Deneme {d}: soru bulunamadı ({res.get('error')})")
        except Exception as e:
            print(f" -> Deneme {d} hata: {e}")

    print(f"\nToplam ayıklanan Coğrafya sorusu: {len(all_cografya)} ({total_images} görselli)")

    merged = non_cografya + all_cografya

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)

    print(f"Başarıyla güncellendi! questions.json toplam soru sayısı: {len(merged)}")

if __name__ == "__main__":
    main()
