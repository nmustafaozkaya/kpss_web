# Soru dosyaları

Her ders kendi JSON dosyasında tutulur:

- `turkce.json`
- `matematik.json`
- `geometri.json`
- `tarih.json`
- `cografya.json`
- `vatandaslik.json`
- `guncel-bilgiler.json`

Bir soruyu düzenlemek için ilgili ders dosyasında `id` veya metinle arama yapın. `options` sırasıyla A–E şıklarıdır. `answer` 0=A, 1=B, 2=C, 3=D, 4=E anlamına gelir. Soruların kimliklerini koruyun; öğrenci ilerlemesi kimliklerle ilişkilendirilir. Görsel gerekiyorsa `imageUrl` mevcut bir `/uploads/questions/...` dosyasını göstermelidir.

Site `../questions.ts` üzerinden dosyaları birleştirir. Admin paneli de aynı dosyaları okur ve yazar. Dosya eşleştirmeleri `../question-files.json` içindedir. Python aktarım araçları `scripts/question_store.py`, PostgreSQL aktarımı `scripts/sync_to_db.cjs` üzerinden aynı havuzu kullanır. Üretim sürümündeki soru ekranı derlemede hazırlanır; dosya veya admin değişikliklerinin üretime yansıması için yeniden derleme gerekir.

Coğrafya sorularını topluca kaldırma işlemi kullanıcının isteğiyle geri alındı: 138 kayıt yeniden aktiftir. `scripts/repair_cografya_options.py` yalnızca mevcut metinde görülebilen şık sınırı ve Roma rakamı hatalarını düzeltir; cevapları değiştirmez ve soru silmez. Değişen şıkların önceki ve sonraki halleri `archive/cografya-option-repairs.json` dosyasındadır. `archive/cografya-review.zip` geri alma yedeğidir. Eksik kaynak metinleri, görseller ve belirsiz cevap eşleşmeleri orijinal coğrafya PDF'siyle ayrıca kontrol edilmelidir; bütün sorular doğrulanmış değildir.

Geçici OCR görselleri ve eski derleme önbelleği proje klasöründen temizlendi. Küçük JSON inceleme kayıtları `archive/import-audit.zip` içindedir; gerekli olduğunda arşiv köke açılarak `tmp/` verileri geri alınabilir. OCR görselleri kaynak PDF'den yeniden üretilmelidir. Masaüstündeki kaynak PDF'ler korunur.

`node_modules` çalıştırma/geliştirme bağımlılıklarını içerir ve tutulur. `.next` derleme veya geliştirme sırasında tekrar büyür. İki klasör de `.gitignore` sayesinde GitHub'a gönderilmez.
