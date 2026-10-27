#!/usr/bin/env bash
# Pull the latest deploy branch and rebuild/restart the site. Run on the server from anywhere.
set -euo pipefail
cd "$(dirname "$0")/.."

git fetch origin deploy
git checkout deploy
git pull --ff-only origin deploy

docker compose up -d --build
docker image prune -f
docker compose ps
