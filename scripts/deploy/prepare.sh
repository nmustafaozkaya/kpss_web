#!/usr/bin/env bash
set -euo pipefail
release=$(pwd -P)
case "$release" in /home/ubuntu/sahmatkpss/releases/*) ;; *) echo 'Unexpected release path'; exit 1;; esac
export NEXT_TELEMETRY_DISABLED=1
export NODE_OPTIONS=--max-old-space-size=640
# One worker and lower scheduling priority keep the existing sites responsive.
nice -n 15 npm ci --no-audit --no-fund
python3 - <<'PY'
from pathlib import Path
p = Path('/home/ubuntu/sahmatkpss.env')
p.write_text(p.read_text().replace('\r', '').strip() + '\n')
p.chmod(0o600)
PY
set -a
source /home/ubuntu/sahmatkpss.env
set +a
npx prisma generate
nice -n 15 npm run build -- --webpack
mkdir -p .next/standalone/public .next/standalone/.next/static
cp -a public/. .next/standalone/public/
cp -a .next/static/. .next/standalone/.next/static/
echo 'Release built successfully.'
