# Vatandaşlık PDF aktarımı

Kaynak: `YARGI KPSS VATANDAŞLIK 44 DENEME 2026.pdf` (224 sayfa).

- Yerel havuza 500 soru eklendi: 304 Vatandaşlık, 196 Güncel Bilgiler. Ders dosyaları artık `src/data/questions/vatandaslik.json` ve `src/data/questions/guncel-bilgiler.json` konumundadır.
- Önceden bulunan 172 soru korundu. Uzak sunucuya veya PostgreSQL'e yazılmadı.
- Soru metinleri ve A–E şıkları yazı olarak tutulur. OCR hataları düzeltildi; öncüllerin satır düzeni korunur. Bu 500 kayıtta soru görseli kullanılmaz.
- Çözüm açıklamaları alınmadı. `answer`, kitapta basılan cevap harfinin sıfır tabanlı karşılığıdır.
- Her kayıtta kaynak sayfa, deneme ve soru numarası bulunur.
- İlk 33 deneme ve 34. denemenin ilk 7 sorusu işlendi. 1. deneme 15. soru, basılı seçenekle cevap anahtarı çeliştiği için; 24. deneme 5. soru ise iki şık aynı basıldığı için dışarıda bırakıldı.
- Genel dağılım ilk 9 soru vatandaşlık, son 6 soru günceldir. 1. denemenin 10. sorusu imeceyle ilgili olduğundan vatandaşlığa konuldu.
- Vatandaşlığın mevcut 310 sorusu sekiz başlığa ayrıldı: Temel Hukuk Kavramları (112), Anayasal Kavramlar (24), Türk Anayasa Tarihi (3), Temel Hak ve Ödevler (13), Yasama (48), Yürütme (34), Yargı (29), İdare Hukuku (47). Sınıflandırma `scripts/classify_vatandaslik.py` içinde tutulur. Güncel sorular ayrı derstedir.

Python bağımlılıkları: PyMuPDF ve Pillow. Kaynak PDF'nin SHA-256 değeri betikte sabittir; başka baskıyla yanlış kırpma yapılmasını önler.

```powershell
python scripts/transcribe_vatandaslik.py "C:/Users/Mustafa Slayer/Desktop/YARGI KPSS VATANDAŞLIK 44 DENEME 2026.pdf"
python scripts/transcribe_vatandaslik.py "C:/Users/Mustafa Slayer/Desktop/YARGI KPSS VATANDAŞLIK 44 DENEME 2026.pdf" --apply
```

Aynı kaynak kimlikleri yeniden çalıştırmada çoğaltılmaz. Metin düzeltmeleri `scripts/vatandaslik-text-corrections.json` dosyasındadır. Taslaklar, inceleme sayfaları ve metne dönüşüm öncesi yedek `tmp/pdfs/vatandaslik/` altındadır. PDF ve geçici çıktılar Git'e eklenmez. Dağıtımda sorular JSON ile taşınır; eski kırpılmış görseller bu kayıtlarda kullanılmaz. Eski `import_vatandaslik.py` görsel aktarımı yaptığı için metin verisini güncellemek amacıyla çalıştırılmamalıdır.

Doğrulama: 500 benzersiz metin kaydı, her kayıtta 5 farklı ve dolu seçenek, geçerli cevap, boş çözüm alanları ve mevcut 172 kaydın korunması kontrol edildi. Korunan soru kimliklerinde cevaplar değiştirilmedi. OCR metinleri tarandı, sorunlu şıklar ve öncüller kaynak sayfalarla karşılaştırıldı. Sitedeki metin görünümü ve üretim derlemesi kontrol edildi. Bu işlem kitaptaki tüm bilgilerin güncellik veya akademik doğruluk denetimi değildir.
