# Yediiklim matematik aktarımı

Kaynak: **2026 Yediiklim 500 Soruda Tekrar Matematik** kullanıcı tarafından sağlanan PDF, 125 sayfa. Sayfa numaraları kapak dahil PDF sırasıdır; basılı numara bir eksiktir.

500 soru görselden okunarak metne aktarıldı. **447 Matematik + 49 Geometri = 496 soru** yayımlandı. Matematikte 20, geometride 7 konu başlığı kullanıldı. Önceden mevcut sorular korundu.

- `reviewed.txt`: `soru|konu kodu|metin|A;B;C;D;E` biçimindeki gözden geçirilmiş taslak. `\n` satır sonudur.
- `shared.json`: Birden fazla soruda kullanılan ortak metinler. Yayımlarken her soruya eklenir.
- `answer-key.json`: PDF'nin 125. sayfasındaki 500 cevap harfi.
- `diagrams.json`: Gerekli şekiller için PDF sayfası ve normalize kırpma koordinatları.
- `audit.json`: Aktarım sayıları, bekletilen sorular ve kaynak düzeltmeleri.

Soru metinleri ve şıklar yazıdır. Şekil gereken 90 soruda yalnız gerekli şekil/grafik kullanıldı; ortak şekiller tek dosyada tutuldu. Çözüm açıklamaları ve QR kodlar eklenmedi. Uygulamanın kullandığı asıl veriler `src/data/questions/matematik.json` ve `geometri.json` dosyalarındadır.

## Kaynak sorunları

- **315:** Kaynakta C şıkkı 2340 yazıyor; verilen sayılar `(800 + 1280) × 3 = 6240` sonucunu verir. C şıkkı 6240 olarak düzeltildi. Anahtar C kaldı.
- **418:** Sorulan farkın ikinci terimi taramada silinmiş. Yayımlanmadı.
- **427:** C şıkkının değeri silinmiş. Yayımlanmadı.
- **445:** Her sorunun doğru yapılma olasılığı belirtilmemiş. Taslakta denenmiş 1/2 varsayımı kaynağa ait değildir ve yayımlanmadı.
- **471:** F noktasının konumunu belirleyen bilgi eksik; alan tek değerli değil. Yayımlanmadı.

Tam bağımsız çözüm denetimi yapıldığı iddia edilmez. Metinler görselden kontrol edildi; cevaplar kaynak anahtarıyla eşleştirildi, temel veri bütünlüğü ve uygulama derlemesi denetlendi.

## Tekrar çalıştırma

Proje kökünden:

```powershell
python -X utf8 scripts/import_yediiklim_matematik.py
```

Bu komut yayımlanmış veriyi, beş seçenek şartını, cevap indekslerini, kaynak sayfalarını ve şekil dosyalarını doğrular. Yalnız Python standart kütüphanesi gerekir.

Verileri taslaktan yeniden yazmak için `--write` ekleyin. Şekilleri özgün yerel PDF'den yeniden çıkarmak için ayrıca `--pdf "PDF yolu"` kullanın; bu işlem PyMuPDF ve Pillow gerektirir. Araç yalnız `yediiklim_mat_2026_` önekli soruları yeniler, diğer soruları korur. PDF ve geçici OCR/sayfa görüntüleri dağıtıma dahil edilmez.
