#!/usr/bin/env bash
set -Eeuo pipefail

# Run this script on the website host from the checked-out website repository.
# It does not call the Feynman Reader deployment script or touch its paths.
PROJECT_DIR="${PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)}"
WEB_ROOT="${WEB_ROOT:-/var/www/deline-website}"
DEPLOY_ROOT="${DEPLOY_ROOT:-/var/www/deline-website-deploy}"
NGINX_CONFIG="${NGINX_CONFIG:-/etc/nginx/conf.d/www.deline.top.conf}"
RELEASES_DIR="$DEPLOY_ROOT/releases"
RELEASES_TO_KEEP="${RELEASES_TO_KEEP:-5}"
LOCK_FILE="${LOCK_FILE:-/var/lock/deline-website-deploy.lock}"

exec 9>"$LOCK_FILE"
flock -n 9 || { echo '已有官网部署正在运行，退出。' >&2; exit 1; }

cd "$PROJECT_DIR"
COMMIT_SHA="$(git rev-parse --verify HEAD)"
RELEASE_ID="$(date -u +%Y%m%d%H%M%S)-${COMMIT_SHA:0:12}"
RELEASE_DIR="$RELEASES_DIR/$RELEASE_ID"
NEXT_LINK="${WEB_ROOT}.next-${RELEASE_ID}-$$"

rollback() {
  local status=$?
  if [[ $status -ne 0 ]]; then
    rm -f "$NEXT_LINK"
    echo "官网部署失败，当前软链接未切换。" >&2
  fi
  exit "$status"
}
trap rollback EXIT

echo "部署官网 release $RELEASE_ID"
npm ci
npm run build

if find "$PROJECT_DIR/out" -name '.DS_Store' -print -quit | grep -q .; then
  echo '部署失败：out/ 中存在 .DS_Store。' >&2
  exit 1
fi

install -d -m 755 "$RELEASES_DIR" "$RELEASE_DIR"
rsync -a --delete "$PROJECT_DIR/out/" "$RELEASE_DIR/"
ln -s "$RELEASE_DIR" "$NEXT_LINK"
mv -Tf "$NEXT_LINK" "$WEB_ROOT"

nginx -t
systemctl reload nginx

mapfile -t releases < <(find "$RELEASES_DIR" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %p\n' | sort -nr | cut -d' ' -f2-)
for old_release in "${releases[@]:$RELEASES_TO_KEEP}"; do
  [[ "$old_release" == "$RELEASE_DIR" ]] || rm -rf -- "$old_release"
done

trap - EXIT
echo "官网部署完成：https://www.deline.top/"
