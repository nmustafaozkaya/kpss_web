# Şahmat KPSS sunucu kurulumu

Sunucu: `ubuntu@158.180.57.126`. Uygulama yalnız `127.0.0.1:3002` dinler.
Nginx `sahmatkpss.com` ve `www.sahmatkpss.com` isteklerini uygulamaya aktarır.
Diğer sitelerin servisleri ve yapılandırmaları bağımsızdır.

## İlk kurulum ve güncelleme

1. Yerel değişiklikleri denetle; kaynak dosyalarını yeni bir sürüm dizinine aktar:
   `/home/ubuntu/sahmatkpss/releases/<benzersiz-surum>`.
   `.env*`, `node_modules`, `.next`, `.git` ve `tmp` dosyalarını kaynak paketine dahil etme.
2. Sürüm dizininde `bash scripts/deploy/prepare.sh` çalıştır. Linux bağımlılıklarını
   kurar, tek işçiyle üretim derlemesi yapar. Mevcut sürüm çalışmayı sürdürür.
3. Aynı dizinde `bash scripts/deploy/activate.sh` çalıştır. Veritabanı ve soru yedeği
   alır, migration uygular, soru değişikliklerini birleştirir ve servisi başlatır.
   Aynı soru hem panelde hem kaynakta farklı değiştiyse güncelleme durur.
4. Ana sayfa, soru bankası, PNG görselleri ve üyelik akışını kontrol et.

Veritabanı bağlantısı ve yönetici erişimi `/home/ubuntu/sahmatkpss.env` içinde,
yalnız sunucu kullanıcısının okuyabileceği izinlerle tutulur. GitHub'a gönderilmez.
Sorular `shared/questions`, önceki kaynak sürümü `shared/base-questions`,
yedekler `shared/backups`, panel yüklemeleri `/var/www/sahmatkpss-uploads/questions`
altında kalır. Güncellemeler bu verileri sıfırlamaz.

Domain satın alınıp iki A kaydı sunucuya yönlendirildikten sonra HTTPS kurulumu:
`sudo certbot --nginx -d sahmatkpss.com -d www.sahmatkpss.com`.
Sertifika hesabı/şart onayı kullanıcıya aittir; varsa mevcut Certbot hesabı kullanılır.
Üretim oturum çerezleri HTTPS gerektirir.

Durum: `sudo systemctl status sahmatkpss --no-pager`
Log: `sudo journalctl -u sahmatkpss -n 50 --no-pager`

Üyelikler PostgreSQL'dedir. Soru çözme ilerlemesi mevcut uygulamada hâlâ tarayıcının
localStorage alanındadır; cihazlar arası ilerleme eşitlemesi henüz uygulanmamıştır.
