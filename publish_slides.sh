#!/usr/bin/env bash
# Publish ONLY the talk deck to clift-robot.github.io (repo root = slides).
# Rebuilds a clean deploy tree from slides/ + the static assets it references.
set -euo pipefail
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY="$HERE/.deploy_slides"
rm -rf "$DEPLOY"; mkdir -p "$DEPLOY/static/videos" "$DEPLOY/static/images"

# root = slides, asset paths ../static -> ./static
sed 's|\.\./static/|./static/|g' "$HERE/slides/index.html" > "$DEPLOY/index.html"
cp "$HERE/slides/slides.css" "$HERE/slides/slides.js" "$DEPLOY/"

# copy only referenced assets (strip ?v= query strings)
grep -o '\./static/[a-zA-Z0-9_/.-]*' "$DEPLOY/index.html" | sed 's|^\./||' | sort -u | while read -r f; do
  [ -f "$HERE/$f" ] && cp "$HERE/$f" "$DEPLOY/$f"
done

echo "CLIFT talk slides — https://clift-robot.github.io/" > "$DEPLOY/README.md"
touch "$DEPLOY/.nojekyll"

cd "$DEPLOY"
git init -q -b main
git add -A
git commit -q -m "Deploy talk slides"
git push -f git@github.com:clift-robot/clift-robot.github.io.git main
echo "published: $(du -sh "$DEPLOY" | cut -f1)"
