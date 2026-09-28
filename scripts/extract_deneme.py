import os
import sys
import glob
import json
import re
import pymupdf

def find_pdf():
    candidates = [
        r"C:\Users\Mustafa Slayer\Desktop\YARGI KPSS COĞRAFYA  33 DENEME 2026.pdf",
        *glob.glob(r"C:\Users\Mustafa Slayer\Desktop\*CO*RAFYA*.pdf")
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None

def clean_ocr(text):
    if not text:
        return ""
    # 1. letter + [middle dot / soft hyphen / hyphen] + optional whitespace + lowercase letter -> merge
    text = re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])[\u00b7\u00ad·\-]\s*([a-zçğıöşü])', r'\1\2', text)
    # 2. letter + whitespace + [middle dot / soft hyphen] + whitespace + lowercase letter -> merge
    text = re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])\s+[\u00b7\u00ad·]\s*([a-zçğıöşü])', r'\1\2', text)
    # 3. letter + hyphen + newline + letter -> merge (standard line break hyphenation)
    text = re.sub(r'([A-Za-zÇĞİÖŞÜçğıöşü])-\s*\n\s*([A-Za-zÇĞİÖŞÜçğıöşü])', r'\1\2', text)
    # 4. Remove any remaining stray middle dots or soft hyphens
    text = text.replace('\u00b7', '').replace('\u00ad', '').replace('·', '')
    text = text.replace('\r', '')
    text = text.replace('lstanbul', 'İstanbul')
    text = text.replace('Trkiye', 'Türkiye')
    text = re.sub(r'\bEngin\b', 'Ahmet', text)
    # clean watermark lines like single letters on their own line
    text = re.sub(r'\n[YARGINEVM~\s:<>_=]{1,2}(?=\n)', '', text)
    text = re.sub(r'(?:s?tagram|sinavcopy|DENEME|COĞRAFYA|33DENEME)[\s\S]*?$', '', text, flags=re.IGNORECASE)
    text = re.sub(r'[ \t]+', ' ', text)
    return text.strip()

def extract_deneme(deneme_num, save_images=True):
    pdf_path = find_pdf()
    if not pdf_path:
        return {"error": "PDF dosyası masaüstünde bulunamadı."}

    doc = pymupdf.open(pdf_path)
    
    deneme_starts = {}
    for idx, page in enumerate(doc):
        t = page.get_text('text')[:300]
        m = re.search(r'(\d{1,2})\.\s*DENEME', t, re.IGNORECASE)
        if m:
            n = int(m.group(1))
            if n not in deneme_starts:
                deneme_starts[n] = idx

    if deneme_num not in deneme_starts:
        return {"error": f"Deneme {deneme_num} PDF içinde bulunamadı."}

    start_idx = deneme_starts[deneme_num]
    next_deneme_start = len(doc)
    for n in sorted(deneme_starts.keys()):
        if n > deneme_num:
            next_deneme_start = deneme_starts[n]
            break
    
    total_pages = min(5, next_deneme_start - start_idx)
    q_pages_count = min(3, total_pages)
    sol_pages_indices = list(range(start_idx + q_pages_count, start_idx + total_pages))
    q_pages_indices = list(range(start_idx, start_idx + q_pages_count))

    # 1. Solutions
    solutions = {}
    for pno in sol_pages_indices:
        page = doc[pno]
        w, h = page.rect.width, page.rect.height
        mid = w / 2
        for clip in [pymupdf.Rect(35, 0, mid, h), pymupdf.Rect(mid + 10, 0, w, h)]:
            col_text = page.get_text('text', clip=clip)
            # Normalize 1 O. -> 10.
            col_text = re.sub(r'1\s*[Oo0]\.', '10.', col_text)
            chunks = re.split(r'\n(?=(?:[A-Z0-9]\s*)?\d{1,2}\.[\s\n]+[A-ZÇĞİÖŞÜa-zçğıöşü])', '\n' + col_text)
            for chunk in chunks:
                m_num = re.search(r'(?:[A-Z0-9]\s*)?(\d{1,2})\.[\s\n]+', chunk)
                m_ans = re.search(r'CEVAP\s*:\s*([A-E])', chunk)
                if m_num and m_ans:
                    qnum = int(m_num.group(1))
                    exp = chunk[m_num.end():m_ans.start()].strip()
                    exp = clean_ocr(exp)
                    solutions[qnum] = {
                        "answer": m_ans.group(1),
                        "explanation": exp
                    }

    uploads_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "uploads", "questions"))
    os.makedirs(uploads_dir, exist_ok=True)

    topic_defaults = [
        "Türkiye'nin Coğrafi Konumu",          # Q1
        "Türkiye'nin Fiziki Özellikleri",      # Q2
        "Türkiye'nin Fiziki Özellikleri",      # Q3
        "Türkiye'nin İklimi ve Bitki Örtüsü",  # Q4
        "Türkiye'nin İklimi ve Bitki Örtüsü",  # Q5
        "Türkiye'nin Fiziki Özellikleri",      # Q6
        "Türkiye'nin İklimi ve Bitki Örtüsü",  # Q7
        "Türkiye'de Nüfus ve Yerleşme",        # Q8
        "Türkiye'de Nüfus ve Yerleşme",        # Q9
        "Türkiye'de Tarım",                    # Q10
        "Türkiye'de Hayvancılık",              # Q11
        "Türkiye'de Madenler ve Enerji",       # Q12
        "Türkiye'de Madenler ve Enerji",       # Q13
        "Türkiye'de Sanayi",                   # Q14
        "Türkiye'de Ulaşım",                   # Q15
        "Türkiye'de Turizm",                   # Q16
        "Türkiye'nin Coğrafi Bölgeleri",       # Q17
        "Türkiye'nin Coğrafi Bölgeleri",       # Q18
    ]

    questions = []

    for pno in q_pages_indices:
        page = doc[pno]
        w, h = page.rect.width, page.rect.height
        mid = w / 2

        for col_idx, clip in enumerate([pymupdf.Rect(35, 45, mid, h), pymupdf.Rect(mid + 5, 45, w - 10, h)]):
            col_text = page.get_text('text', clip=clip)
            # Normalize 1 O. -> 10.
            col_text = re.sub(r'(?:^|\n)\s*1\s*[Oo0]\.', '\n10.', col_text)
            
            # Split questions: e.g. "1.", "2.", "10."
            # Only match numbers at beginning of lines that are not Roman sub-bullets (I., II. etc)
            q_chunks = re.split(r'\n(?=(?:[A-Za-z0-9]\s*\n\s*)?(?:[1-9]|1[0-8])\.[\s\n]+[A-ZÇĞİÖŞÜ•\d])', '\n' + col_text)
            for q_str in q_chunks:
                m_qnum = re.search(r'(?:[A-Za-z0-9]\s*\n\s*)?(\d{1,2})\.[\s\n]+', q_str)
                if not m_qnum:
                    continue
                qnum = int(m_qnum.group(1))
                if qnum < 1 or qnum > 18:
                    continue

                body = q_str[m_qnum.end():].strip()
                # Split options
                opt_matches = list(re.finditer(r'(?:^|\n)\s*([A-Ea-eO0])[\)\}\.]\s*', body))
                if len(opt_matches) >= 4:
                    first_opt_idx = opt_matches[0].start()
                    q_text = clean_ocr(body[:first_opt_idx])
                    
                    options = []
                    for i in range(len(opt_matches)):
                        start_pos = opt_matches[i].end()
                        end_pos = opt_matches[i+1].start() if i+1 < len(opt_matches) else len(body)
                        opt_text = clean_ocr(body[start_pos:end_pos])
                        options.append(opt_text)
                    
                    while len(options) < 5:
                        options.append("")
                    options = options[:5]
                else:
                    q_text = clean_ocr(body)
                    options = ["A", "B", "C", "D", "E"]

                # Crop Map Image if question mentions map/diagram
                image_url = None
                has_map_kw = any(kw in q_text.lower() for kw in ["harita", "taralı alan", "haritada", "grafik", "şekil", "gösterilmiştir"])
                if has_map_kw and save_images:
                    kw_rects = page.search_for("harita") or page.search_for("taralı") or page.search_for(f"{qnum}.")
                    if kw_rects:
                        top_y = kw_rects[0].y1
                        col_x0 = 42 if col_idx == 0 else mid + 10
                        col_x1 = mid - 10 if col_idx == 0 else w - 20
                        crop_rect = pymupdf.Rect(col_x0, top_y + 4, col_x1, min(h - 50, top_y + 115))
                        try:
                            pix = page.get_pixmap(clip=crop_rect, dpi=160)
                            if pix.width > 50 and pix.height > 50:
                                filename = f"deneme{deneme_num}_q{qnum}.png"
                                filepath = os.path.join(uploads_dir, filename)
                                pix.save(filepath)
                                image_url = f"/uploads/questions/{filename}"
                        except Exception:
                            pass

                sol_data = solutions.get(qnum, {})
                ans_letter = sol_data.get("answer", "A")
                ans_index = "ABCDE".find(ans_letter)
                if ans_index == -1:
                    ans_index = 0

                explanation = sol_data.get("explanation", "")
                topic = topic_defaults[qnum - 1] if qnum <= len(topic_defaults) else "Türkiye'nin Fiziki Özellikleri"

                questions.append({
                    "id": f"cogr_d{deneme_num}_q{qnum}",
                    "deneme": deneme_num,
                    "qnum": qnum,
                    "subject": "Coğrafya",
                    "topic": topic,
                    "text": q_text,
                    "options": options,
                    "answer": ans_index,
                    "answerLetter": ans_letter,
                    "explanation": explanation,
                    "imageUrl": image_url,
                })

    # Deduplicate by qnum
    seen = {}
    for q in questions:
        qn = q["qnum"]
        # keep the one with longer text or options
        if qn not in seen or len(q["text"]) > len(seen[qn]["text"]):
            seen[qn] = q

    final_questions = [seen[k] for k in sorted(seen.keys())]

    return {
        "deneme": deneme_num,
        "total": len(final_questions),
        "questions": final_questions
    }

if __name__ == "__main__":
    d_num = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    res = extract_deneme(d_num)
    print(json.dumps(res, ensure_ascii=False, indent=2))
