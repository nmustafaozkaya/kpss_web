#!/usr/bin/env bash
set -euo pipefail
umask 027
release=$(pwd -P)
root=/home/ubuntu/sahmatkpss
shared=$root/shared
case "$release" in "$root"/releases/*) ;; *) echo 'Unexpected release path'; exit 1;; esac
test -f .next/standalone/server.js
stamp=$(date -u +%Y%m%dT%H%M%SZ)
mkdir -p "$shared/backups"
python3 - <<'PY'
from pathlib import Path
import secrets
p = Path('/home/ubuntu/sahmatkpss.env')
text = p.read_text().strip() + '\n'
keys = {line.split('=', 1)[0] for line in text.splitlines() if '=' in line}
values = {
    'ADMIN_EMAIL': 'admin@sahmatkpss.com',
    'ADMIN_PASSWORD': secrets.token_urlsafe(30),
    'ADMIN_SECRET': secrets.token_hex(32),
    'QUESTION_DATA_DIR': '/home/ubuntu/sahmatkpss/shared/questions',
    'QUESTION_UPLOAD_DIR': '/var/www/sahmatkpss-uploads/questions',
}
for key, value in values.items():
    if key not in keys: text += f'{key}={value}\n'
p.write_text(text)
p.chmod(0o600)
PY
set -a
source /home/ubuntu/sahmatkpss.env
set +a
# Back up only this application's database; never reset or seed existing data.
sudo -u postgres pg_dump -Fc sahmatkpss > "$shared/backups/database-$stamp.dump"
npx prisma migrate deploy
sudo install -d -o ubuntu -g www-data -m 2755 /var/www/sahmatkpss-uploads /var/www/sahmatkpss-uploads/questions
sudo systemctl stop sahmatkpss.service 2>/dev/null || true
previous=$(readlink "$root/current" || true)
if test -d "$shared/questions"; then
    cp -a "$shared/questions" "$shared/backups/questions-$stamp"
fi
if ! python3 scripts/deploy/merge_questions.py "$release" "$shared" "$shared/questions-$stamp"; then
    if test -n "$previous"; then sudo systemctl start sahmatkpss.service; fi
    exit 1
fi
mkdir -p "$shared/questions"
cp "$shared/questions-$stamp/"*.json "$shared/questions/"
ln -sfn "$release" "$root/current"
sudo install -m 644 scripts/deploy/sahmatkpss.service /etc/systemd/system/sahmatkpss.service
sudo systemctl daemon-reload
sudo systemctl enable --now sahmatkpss.service
ready=0
for attempt in $(seq 1 15); do
    if curl --fail --silent http://127.0.0.1:3002/api/question-bank > "$shared/health-bank.json"; then ready=1; break; fi
    sleep 2
done
if test "$ready" != 1; then
    sudo systemctl stop sahmatkpss.service
    if test -n "$previous"; then
        ln -sfn "$previous" "$root/current"
        cp "$shared/backups/questions-$stamp/"*.json "$shared/questions/"
        sudo systemctl start sahmatkpss.service
    fi
    echo 'Health check failed; previous release restored when available.'
    exit 1
fi
mkdir -p "$shared/base-questions"
cp src/data/questions/*.json "$shared/base-questions/"
# Preserve Certbot's HTTPS configuration on future deployments.
if ! test -f /etc/nginx/sites-available/sahmatkpss; then
    sudo install -m 644 scripts/deploy/nginx.conf /etc/nginx/sites-available/sahmatkpss
    sudo ln -s /etc/nginx/sites-available/sahmatkpss /etc/nginx/sites-enabled/sahmatkpss
fi
sudo nginx -t
sudo systemctl reload nginx
echo "Activated: $release"
