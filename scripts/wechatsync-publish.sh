#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <markdown-file> [platforms] [cover-url-or-path]" >&2
  echo "Example: $0 content/publish/workbuddy-agent-product-thinking-platform.md zhihu,xiaohongshu,douyin,bilibili,woshipm https://baojian-notionnext-blog.vercel.app/images/articles/workbuddy-agent-product-thinking/cover.png" >&2
  exit 2
fi

if [ -z "${WECHATSYNC_TOKEN:-}" ]; then
  echo "WECHATSYNC_TOKEN is not set. Enable MCP/bridge in the Wechatsync Chrome extension and export the token first." >&2
  exit 1
fi

file="$1"
platforms="${2:-zhihu,xiaohongshu,douyin,bilibili,woshipm}"
cover="${3:-}"

if [ -n "$cover" ]; then
  wechatsync sync "$file" --platforms "$platforms" --cover "$cover"
else
  wechatsync sync "$file" --platforms "$platforms"
fi
