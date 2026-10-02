# CBA Tarihin Pusulası aktarımı

- Kaynak: Kullanıcının sağladığı `CBA KPSS TARİHİN PUSULASI 20 DENEME 2026.pdf` (154 taranmış sayfa).
- 20 deneme × 27 soru = **540 metin soru**.
- Kaynak sayfa, deneme ve soru numarası her kayıtta bulunur.
- A–E seçenekleri ve doğru cevap aktarılmıştır; çözüm açıklamaları ve soru görselleri eklenmemiştir.
- Cevaplar, çözüm sayfalarındaki basılı “Doğru yanıt … seçeneğidir” satırlarından eşleştirilmiştir. Belirsiz dört harf görsel kontrolle tamamlanmıştır.
- Roma rakamlı seçenekler, bozuk seçenek etiketleri ve tablolar kaynak görüntülerinden kontrol edilmiştir. Tablolar ve haritadaki numara–şehir eşleştirmeleri metne dönüştürülmüştür.
- 11 mevcut tarih konusuna içerik sırasına ve soru içeriğine göre sınıflandırılmıştır.
- Mevcut 1.541 kayıt korunmuştur. Aktarım sonrası tarih: **672**, tüm havuz: **2.081**.

## Dosyalar

- `src/data/questions/tarih.json`: Sitenin ve soru yönetiminin okuduğu kayıtlar.
- `scripts/cba-tarih-corrections.json`: Kaynak kontrolüyle yapılan metin/şık düzeltmeleri; kaynak baskı hatalarına ilişkin editör notları.
- `scripts/cba-tarih-import-audit.json`: Sayımlar, cevap anahtarları, içerik özeti ve SHA-256.
- `scripts/import_cba_tarih.py`: Tekrar çalıştırıldığında aynı kimlikleri günceller; diğer ders dosyalarına yazmaz.

## Yeniden üretim

Yerel OCR önbelleği `tmp/pdfs/tarih/zNNN_C.json` dosyalarıdır. Büyük geçici PNG görüntüleri aktarım tamamlandıktan sonra temizlenir. Kaynak PDF indirme klasöründe korunur.

```powershell
python scripts/import_cba_tarih.py
python scripts/import_cba_tarih.py --apply
npm run build
```

Kontroller: 540 benzersiz kimlik, her denemede 27 soru, her soruda beş farklı/dolu seçenek, geçerli cevap indeksi, konu üyeliği, önceki kayıtların korunması, diğer ders dosyalarının değişmemesi. Next.js üretim derlemesi ve TypeScript kontrolü başarılıdır. Kaynak kitabın tüm tarihsel iddialarının bağımsız akademik doğrulaması bu aktarımın kapsamında değildir.
