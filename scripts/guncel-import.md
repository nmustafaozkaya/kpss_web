# Özlem Örel Güncel Bilgiler aktarımı

Kullanıcının sağladığı `Güncel bilgiler Denemeleri.pdf` belgesinden 41 deneme, 244 soru aktarılır. Dokuzuncu denemede dört, diğer denemelerde altı soru vardır. Kaynak cevap anahtarları PDF'nin 43–44. sayfalarındadır; satır konumlarıyla okunur ve görsel tabloyla karşılaştırılmıştır.

Metin, beş ayrı şık, sıfır tabanlı cevap indeksi ve kaynak sayfa/deneme/soru numarası kaydedilir. Çözüm açıklamaları alınmaz. Yazım ve şık yapısı denetlenmiştir; PDF'deki tarih, olay ve cevapların tamamı bağımsız olgusal doğrulamadan geçirilmemiştir. Kaynak anahtarına sadık aktarım, kaynaktaki bilgilerin güncellik/doğruluk onayı değildir.

Sonuç `src/data/questions/guncel-bilgiler.json` dosyasındadır. 196 mevcut soruyla birlikte dersin havuzu 440 sorudur. Diğer derslerdeki kayıtlar korunur. Aynı kaynak kimlikleri yeniden çalıştırmada çoğaltılmaz.

```powershell
python scripts/import_guncel_denemeleri.py "C:/Users/Mustafa Slayer/Downloads/Güncel bilgiler Denemeleri.pdf" --apply
```

Kaynak SHA-256 özeti, cevap anahtarları ve soru kimlikleri `scripts/guncel-import-audit.json` içinde saklanır. OCR veya sayfa görselleri siteye eklenmez.
