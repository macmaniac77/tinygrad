#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
export PORT="${PORT:-8000}"
export BROWSER="${BROWSER:-builder}"
python3 "$SCRIPT_DIR/serve.py" "$@"
