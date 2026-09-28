# Şahmat KPSS

Next.js ve TypeScript ile hazırlanmış ilk arayüz prototipi. Türkçe, mobil uyumlu çalışma alanı; örnek soru çözümü ve 81 il üzerinden harita soruları içerir.

## Çalıştırma

```sh
npm ci
npm run dev
```

http://127.0.0.1:3000

```sh
npm run typecheck
npm run build
npm start
```

## Bu sürümde çalışanlar

- GK/GY filtreleri, ders ve konu araması
- 10 örnek çoktan seçmeli soru, cevap açıklamaları, oturum sonuçları
- 81 il seçimiyle 3 harita sorusu; klavye ve il listesi alternatifi, yakınlaştırma
- Yanlışları tekrar çözme, soru kaydetme, günlük hedef ve çözüm istatistikleri
- Tarayıcı localStorage alanında misafir ilerlemesi
- Mobil gezinme, erişilebilir diyaloglar

İlerleme sadece mevcut tarayıcıda saklanır; tarayıcı verilerinin silinmesiyle kaybolur. Depolama engellenirse arayüz uyarı gösterir. Kullanıcı girişi, yönetim paneli, PDF aktarımı, Prisma/PostgreSQL ve ödeme sistemi henüz bağlı değildir. Giriş düğmesi mevcut durumu açıklayan bir pencere açar; e-posta veya şifre toplamaz.

Örneklerin cevapları bu arayüz prototipinde istemci paketindedir. Gerçek soru havuzu ve abonelik devreye alınmadan önce cevap kontrolü sunucuya taşınmalıdır.

## Sonraki aşama: hesap ve sunucu

Misafir çözümü açık tutulabilir. Hesap, cihazlar arası ilerleme ve kişisel arşiv için kullanılmalı. Gerçek giriş/çıkış, güvenilir bir kimlik doğrulama kütüphanesi üzerinden sunucu oturumlarıyla eklenecek. Abonelik ayrı bir erişim kaydı olarak tasarlanmalı; ödeme sağlayıcısı doğrulanmış webhook olaylarıyla bu kaydı güncellemeli. Şu an ücretli plan veya ödeme entegrasyonu yoktur.

Mevcut VM için plan: Nginx → localhost:3002 Next.js (PM2) → Prisma → ayrı PostgreSQL veritabanı/kullanıcısı. Bu çalışmada sunucuya dosya yüklenmedi, mevcut servisler değiştirilmedi. Derleme daha güçlü bir ortamda yapılmalı; hedef Linux mimarisiyle uyumlu çıktı üretilmeli. PDF/OCR işlemleri VM dışında yürütülmeli. Veritabanı ve görseller sunucu dışında yedeklenmeli.

## Veritabanı

Prisma şeması `prisma/schema.prisma` içindedir. Şu tablolar hazırdır: kullanıcılar, dersler, konular, sorular, seçenekler, Türkiye illeri, harita cevapları, cevap geçmişi, kaydedilen sorular, günlük hedefler ve abonelik kayıtları.

Yerel kurulum:

```sh
Copy-Item .env.example .env
# .env içindeki DATABASE_URL değerini kendi PostgreSQL bağlantınla değiştir
npm run db:generate
npm run db:migrate
npm run db:seed
```

`GET /api/questions` yayımlanmış soruları döndürür. `?subject=tarih`, `?topic=millî-mücadele`, `?type=map` ve `?limit=20` filtreleri kullanılabilir. Doğru seçenek bilgisi API yanıtına gönderilmez; cevap kontrolü ilerleyen aşamada sunucu tarafına taşınacak.

Üretim VM’sinde `sahmatkpss` PostgreSQL veritabanı, `sahmatkpss_app` uygulama kullanıcısı ve ilk şema/örnek veri oluşturuldu. Bağlantı bilgisi yalnızca sunucudaki `/home/ubuntu/sahmatkpss.env` dosyasında, kısıtlı izinlerle tutuluyor. Yeni migration’lar üretimde ayrı yetkili deployment hesabıyla uygulanmalı; uygulama kullanıcısı yalnızca tablo verilerine erişiyor.

## Harita kaynağı

İl path verileri `turkey-map-react@2.0.6` paketinden alınmıştır: https://github.com/erdigokce/turkey-map-react. MIT lisansı `public/map-LICENSE.txt` içinde korunur. Günümüz il sınırlarını gösterir; tarihî siyasi sınırları temsil etmez.

Yazı tipleri Google Fonts üzerinden yüklenir; erişilemediğinde yerel sans-serif yazı tiplerine geçilir.
