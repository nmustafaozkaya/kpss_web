# Türkçe PDF aktarımı

Kaynak: kullanıcının sağladığı `pegem Türkçe 30 deneme.pdf` (208 PDF sayfası).

500 soru metin olarak eklendi; Türkçe dersinde 510 soru var. Derslere ayırma sonrasında dosya `src/data/questions/turkce.json` konumundadır. Uzak sunucuya veya PostgreSQL'e aktarım yapılmadı. Site bu yerel JSON havuzunu kullanır.

Her yeni kayıtta beş ayrı A–E seçeneği, cevap anahtarındaki harfin sıfır tabanlı karşılığı ve kaynak sayfa/deneme/soru bilgisi bulunur. Çözüm açıklamaları boş bırakıldı; soru görselleri kullanılmaz.

PDF yerelde OCR ile işlendi. Alt çizgi gibi biçime bağımlı veya eksik okunan sorular seçime alınmadı. Ortak paragraflar soru metnine dahil edildi. Saptanan yazım, şık ve Roma rakamı okuma hataları kaynak sayfalarla karşılaştırılarak düzeltildi. Bu işlem bütün soruların akademik doğruluğunun denetlendiği anlamına gelmez.

Seçili soru kimlikleri `turkce-selection.json`, kaynak cevap anahtarı `turkce-answer-key.json`, elle yapılan düzeltmeler `turkce-text-corrections.json` içindedir. OCR ara çıktıları ve aktarım öncesi yedek `tmp/pdfs/turkce/` altındadır; PDF ve geçici dosyalar depoya eklenmez.

Mevcut OCR çıktılarından aynı seçimi tekrar oluşturmak için:

```powershell
python scripts/import_turkce.py
python scripts/publish_turkce.py --apply
```

Yayınlama betiği 500 benzersiz kimlik, beş farklı dolu seçenek, cevap anahtarı eşleşmesi ve boş çözüm alanını doğrular. Yeniden çalıştırma aynı kaynak kimliklerini çoğaltmaz.

Yeni soruların konu dağılımı: Paragrafta Anlam 307, Cümlede Anlam 50, Sözel Mantık 46, Sözcük Türleri 20, Cümlenin Ögeleri 16, Ses Bilgisi 16, Yazım Kuralları 14, Noktalama İşaretleri 9, Cümle Türleri 8, Fiilde Çatı 7, Sözcükte Anlam 6, Anlatım Bozuklukları 1.
