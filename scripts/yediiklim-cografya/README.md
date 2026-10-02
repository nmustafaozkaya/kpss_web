# Yediiklim coğrafya aktarımı

Kullanıcının sağladığı **500 Soruda Coğrafya Soru Bankası Son Viraj Yediiklim 2026** PDF'sinden 371 soru aktarıldı. Önceki 50 metin sorusuna OCR ile düzeltilmiş 321 metin sorusu eklendi. Düzeltilmiş 179 kayıt korunarak coğrafya toplamı **500** oldu (129 Yargı + 371 Yediiklim).

İlk pakette 2–51 numaralı sorular metin, dokuz harita/grafik ayrı görsel olarak tutulur. Yeni pakette 52–378 arasından 104, 105, 106, 295, 296 ve 304 hariç 321 soru bulunur. İlk beş numara bu görüntü seçimine dahil edilmedi; 304, tarihli UNESCO iddiasındaki tutarsızlık nedeniyle alınmadı. Kaynak soru 1, gün batımı yönü için tarih belirtilmediğinden ilk paketten çıkarılmıştı.

Tüm soru metinleri ve A–E seçenekleri seçilebilir HTML metnidir. Ek pakette yalnız gerekli 65 harita/grafik ayrı PNG/WebP olarak tutulur; toplam 74 Yediiklim şekli vardır. OCR metinleri, şekil kırpmaları ve çözüm sayfalarındaki cevap harfleri görsel olarak kontrol edildi. Çözüm açıklamaları aktarılmadı. Sayfalar kapak dahil 1 tabanlı PDF sayfa numarasıdır. Tarihli veriler kaynak dönemiyle sunulur; bu aktarım istatistiklerin bağımsız güncellik denetimi değildir.

## Doğrulama ve yeniden üretim

```powershell
python -X utf8 scripts/import_yediiklim_cografya.py
python -X utf8 scripts/audit_cografya.py
```

İlk komut yayımlanan veriyi ve görsel dosyalarının varlığını kontrol eder. `--write` bu kaynağın kayıtlarını üretir; önceden incelenmiş 179 kaydı ve tüm soru kimlikleri ile cevaplarını koruyan kontrol içerir. `--pdf "PDF yolu"` görselleri yeniden üretir ve kaynak SHA-256 değerini doğrular; bu adım PyMuPDF ve Pillow gerektirir. Diğer ders dosyalarının değişmediği de kontrol edilir.

- `reviewed.txt`: İlk 50 sorunun `soru|PDF sayfası|konu kodu|metin|A;B;C;D;E` biçimindeki metinleri.
- `answer-key.json`, `diagrams.json`: İlk paketin cevapları ve şekil koordinatları.
- `image-reviewed.json`: Yeni 321 sorunun kaynak numarası, sayfası, konusu, cevabı, cevap sayfası ve kırpma koordinatları. Bu dosya kaynak inceleme kaydıdır; tam soru kırpmaları yayımlanmaz. Koordinatlar `renderScale` ölçeğindeki piksellerdir.
- `text-reviewed.json`: Ek 321 sorunun düzeltilmiş OCR metinleri ve seçenekleri.
- `text-diagrams.json`: Yalnız gerekli 65 harita/grafiğin kırpma koordinatları ve varsa PNG çıktı tercihi.
- `expanded-answer-key.json`: Çözüm sayfalarından okunan ek cevap anahtarı.
- `source.json`: Kaynak PDF özeti ve SHA-256 değeri.
- `audit.json`: Aktarım sayıları ve konu dağılımı.

Özgün PDF ve geçici kontrol görüntüleri dağıtıma dahil edilmez.
