# Coğrafya kaynak düzeltmesi

Önceden düzeltilmiş 179 soru korundu. 321 yeni Yediiklim sorusuyla toplam 500 soru vardır: 129 Yargı ve 371 Yediiklim.
Yargı PDF'sindeki diğer sorular bu düzeltmenin kapsamına dahil değildir.

Yargı kayıtları kaynak soru metinleri, seçenek sırası ve cevap bildirimleriyle
eşleştirildi. 94 harita/grafik kaynak sayfalardan kırpılmıştır. Yediiklim'in
9 şekli ve 321 tam soru görseliyle bankada toplam 424 görsel bulunur. Çözüm açıklamaları aktarılmaz.
Kaynak sayfası, kapak dahil 1 tabanlı PDF sayfasıdır.

Son kontrolde 10 kayıtta düzenleme yapıldı: dört alanlı haritanın metni,
öncül/listelerin okunabilirliği, bir apostrof hatası, iki konu ataması ve
üretim/altyapı sorularının kaynak dönemine bağlanması. Cevap harfleri değiştirilmedi.

## Kontrol

Proje kökünden:

```powershell
python -X utf8 scripts/audit_cografya.py
python -X utf8 scripts/import_yediiklim_cografya.py
npm run typecheck
```

İlk komut soru verisini değiştirmez. Kimliklerin korunmasını, boş/tekrarlı şıkları,
kaynak cevaplarını, incelenmiş kayıtlarla eşleşmeyi ve 424 görselin okunabilirliğini
kontrol eder; hata varsa sıfırdan farklı çıkış kodu verir. Güncel sonuç `audit.json`
dosyasına yazılır. Bu kontrol kaynak kitabın bütün coğrafi/istatistiksel iddialarını
bağımsız olarak doğruladığı anlamına gelmez.

## Yeniden üretim

`reviewed.py` metin ve şık düzeltmelerini, `source-solutions.json` kaynak cevap
çıkarımlarını, `answer-key-overrides.json` taramadan okunmuş cevap harflerini,
`figures-auto.json` incelenmiş kırpma koordinatlarını tutar.

`python -X utf8 scripts/restore_cografya_source.py --apply` mevcut kimlikleri
koruyarak düzeltmeleri uygular. Görsel üretimi için
`tmp/pdfs/yargi-cografya/pNNN[L|R].png` kaynak sayfa sütunları ve Pillow gerekir.
Ardından denetim komutu çalıştırılmalıdır. `reviewed.json` önceki 179 sorunun incelenmiş
anlık görüntüsüdür. Yeni sorular `../yediiklim-cografya/image-reviewed.json` ile denetlenir; `before-source-restore.json` ve `before-final-review.json`
geri dönüş için önceki verileri saklar.

`changes.json` eski, kaynak PDF elde edilmeden önceki düzeltmelerin tarihsel
kaydıdır. Yeniden uygulanmamalıdır; eski tahminleri uygulayan `--apply` seçeneği
denetim komutundan kaldırılmıştır.
