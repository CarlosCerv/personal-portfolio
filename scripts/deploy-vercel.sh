#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE="${1:-prod}"

echo "Building..."
npm run build

if [[ "$MODE" == "preview" ]]; then
  echo "Deploying (preview)..."
  npx vercel deploy --yes
  exit 0
fi

echo "Deploying (production)..."
npx vercel deploy --prod --yes

