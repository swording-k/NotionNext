# Agent Handoff: 内容发布与个人博客工作流

本文档给接手本仓库的智能体使用。目标是：用户只提供文章想法或大纲时，智能体能独立完成写稿、整理、平台发布准备、公众号草稿上传、必要时同步个人博客，并清楚汇报哪些步骤已经真实完成。

## 当前仓库与线上服务

本地仓库：

```text
/Users/baojian/Desktop/baojian-notionnext-blog
```

Git 远程：

```text
fork   https://github.com/swording-k/NotionNext.git
origin https://github.com/notionnext-org/NotionNext.git
```

默认提交推送到：

```bash
git push fork main
```

线上博客：

```text
https://baojian-notionnext-blog.vercel.app/
```

个人网站：

```text
https://swording-k.github.io
```

Vercel 部署命令（Vercel CLI，已认证）：

```bash
NODE_PATH=/Users/baojian/.workbuddy/binaries/node/workspace/node_modules \
  /Users/baojian/.workbuddy/binaries/node/versions/22.22.2/bin/node \
  /Users/baojian/.workbuddy/binaries/node/workspace/node_modules/.bin/vercel --prod --yes
```

如果 Vercel CLI 认证过期：

```bash
NODE_PATH=/Users/baojian/.workbuddy/binaries/node/workspace/node_modules \
  /Users/baojian/.workbuddy/binaries/node/versions/22.22.2/bin/node \
  /Users/baojian/.workbuddy/binaries/node/workspace/node_modules/.bin/vercel login --github
```

用户在浏览器确认设备授权即可，无需 token。

Vercel 必须有环境变量：

```text
NOTION_PAGE_ID=5bb47fa431e34798a9200b40e1f7dc81
```

## 核心原则

固定口径：

```text
平台优先，博客精选。
```

公众号、小红书、抖音负责被看见和互动；NotionNext 博客负责长期沉淀代表作、作品集和个人品牌背书。

不要默认每篇文章都同步博客。只有用户明确要求“发布到博客”，或者文章明显适合作为长期代表作时，才走 NotionNext 博客流程。

不要把本地 Markdown 当成博客正源。博客正源是 Notion 数据库；本地 Markdown 是公众号和多平台分发的主稿/中转稿。

## 智能体行为红线（任何接手 Agent 必须遵守）

这些规则来自真实踩坑，违反会导致返工或文章作废，务必遵守：

1. **先出大纲/草稿，确认后再分发**。用户思路不清、或直接说"先写大纲让我检查"时，绝不能直接生成封面图、启动部署或推送平台。必须先给大纲/草稿过目，用户明确说"发布"才进入分发。本次会话曾因跳过审核直接分发被用户叫停。
2. **多平台推送必须带封面图**。执行 `wechatsync sync` 时务必加 `--cover <本地封面png绝对路径>`（封面本地路径 `public/images/articles/<slug>/cover.png`）。能带图的平台全部带上配图。
3. **文末宣传 Fit Genius 必须用真实信息**。真实仓库 `swording-k/fit-genius` 现状：AI 已迁 **MiniMax-M3**（经腾讯云 CloudBase 代理），**v1.1.0 已上架 App Store**（非 TestFlight 内测）；绝不要写"通义千问"或"TestFlight"。官网 https://swording-k.github.io/fit-genius/ 。
4. **平台外链限制**：抖音/小红书严禁站外链接、二维码、水印式导流。因 `-platform.md` 同一文件经 wechatsync 推多平台（含抖音），平台版须去掉所有 http 链接，产品段改用"直接搜索名字就能找到"式软引导；外链只保留在博客主稿。

## 目录职责

```text
content/
├─ inbox/       # 选题、想法、粗稿
├─ publish/     # 最终主稿 Markdown
├─ review/      # 标题备选、发布检查清单
├─ assets/      # 每篇文章本地配图源文件
├─ WORKFLOW.md  # 长期工作流说明
└─ AGENT_HANDOFF.md # 本交接文档

content/assets/shared/qrcodes/
├─ personal-site.png
└─ blog-site.png

public/images/articles/
└─ <slug>/cover.png  # 博客文章封面线上资源

public/images/qrcodes/
├─ personal-site.png
├─ blog-site.png
├─ wechat-official.jpg
├─ xiaohongshu.jpg
├─ douyin.jpg
└─ bilibili.png
```

临时状态不要提交：

```text
.obsidian/
content/.obsidiantomp/publish-request.json
content/.obsidiantomp/publish-result.json
```

这些已在 `.gitignore` 中忽略。

## 用户下次怎么说

用户可能直接说：

```text
按我们的内容发布工作流，把这个想法写成文章。
```

默认要做：

1. 写高质量公众号主稿，保存到 `content/publish/<slug>.md`。
2. 如果需要配图，保存到 `content/assets/<slug>/`。
3. 生成平台分发版 Markdown，图片优先改为公网 URL，保存到 `content/publish/<slug>-platform.md`。
4. 优先用 Wechatsync 把平台版 Markdown 推送到多平台草稿箱。
5. 如果 Wechatsync 的公众号通道不可用，公众号让用户手动导入；其他平台仍优先走 Wechatsync。
6. 抖音和小红书不要默认直接吃长文 Markdown。正式分发前必须改造成短视频、卡片笔记或短正文；长文同步只能作为明确实验。
7. 如果文章值得长期沉淀，或用户要求博客发布，再同步 Notion 和部署 Vercel。
8. 提交本地变更并推送 `fork main`。
9. 最终答复必须说明：文件路径、多平台草稿箱同步是否成功、博客是否成功部署、是否有人工步骤。

## 短视频与小红书原生内容流程

默认判断：

```text
公众号/知乎/专栏/博客 = 长文
抖音/小红书推荐流 = 短视频或卡片笔记
```

不要把公众号长文原封不动发到抖音和小红书。此前测试过长文草稿，抖音和小红书分发很差，原因不能简单归为链接，内容形态本身也不匹配。后续每篇认知类文章都应附带一个平台原生短视频方案：

1. 提炼 30-60 秒钩子脚本。
2. 做竖屏 1080x1920 视频，保留口播、字幕和动态视觉。
3. 正文和视频里不放站外链接、二维码、水印式导流。
4. 小红书可另做 6-9 张卡片笔记，标题更具体，结尾用平台内评论互动。

当前 Remotion 工程：

```text
content/videos/ai-workflow-short
```

关键命令：

```bash
cd content/videos/ai-workflow-short
npm run voice:native
npm run still:native
npm run render:native
ffmpeg -y -i out/ai-workflow-native.mp4 \
  -vf "scale=in_range=pc:out_range=tv,format=yuv420p" \
  -c:v libx264 -profile:v high -level 4.1 \
  -color_range tv -colorspace bt709 \
  -c:a aac -b:a 160k -ar 44100 \
  -movflags +faststart out/ai-workflow-native-upload.mp4
```

交付路径：

```text
content/videos/ai-workflow-short/out/ai-workflow-native-upload.mp4
```

质检命令：

```bash
ffprobe -v error -show_entries stream=index,codec_type,codec_name,width,height,pix_fmt,r_frame_rate,duration \
  -of default=noprint_wrappers=1 out/ai-workflow-native-upload.mp4
```

当前语音是 Edge TTS 免费自动版，能跑通闭环，但质感仍低于真人口播。正式增长阶段建议升级到更自然的 TTS 或用户本人声音克隆。

## Wechatsync 多平台草稿流程

Wechatsync 是当前推荐的多平台分发方案。它使用用户 Chrome 扩展里的登录态，把 Markdown 写入多个平台草稿箱，不再依赖微信公众号 API IP 白名单。

已安装：

```text
wechatsync CLI
/Users/baojian/.local/share/wechatsync/Wechatsync/packages/mcp-server/dist/index.js
```

仓库脚本：

```bash
scripts/wechatsync-publish.sh <markdown-file> [platforms] [cover-url-or-path]
```

默认平台：

```text
zhihu,xiaohongshu,douyin,bilibili,woshipm
```

使用前提：

```text
Chrome 安装 Wechatsync 扩展
扩展开启 MCP/同步桥接
WECHATSYNC_TOKEN 已保存在本机 `~/.config/wechatsync/env`（字段 `WECHATSYNC_TOKEN`）。使用前必须 `set -a; source ~/.config/wechatsync/env; set +a` 导出；仅 `source` 不加 export 会因变量未导出而报 "Invalid or missing token"。
目标平台在 Chrome 中保持登录
```

推荐命令：

```bash
set -a; source ~/.config/wechatsync/env; set +a
scripts/wechatsync-publish.sh \
  content/publish/<slug>-platform.md \
  zhihu,xiaohongshu,douyin,bilibili,woshipm \
  https://baojian-notionnext-blog.vercel.app/images/articles/<slug>/cover.png
```

边界：

- Wechatsync 写入草稿箱，最终发布前仍建议用户人工检查。
- 如果公众号通道稳定，可用 Wechatsync 写入公众号草稿箱。
- 如果公众号通道不稳定，公众号由用户手动导入，其他平台继续走 Wechatsync。
- NotionNext 个人博客仍由 Notion 连接器创建/更新页面，再部署 Vercel。

## Markdown 主稿格式

主稿放在：

```text
content/publish/<slug>.md
```

推荐 frontmatter：

```yaml
---
标题: "文章标题"
作者: "Skyler Yang"
摘要: "一句话摘要"
公众号: "宝剑Skyler"
样式: "obsidian-light"
代码高亮: "默认"
slug: "<slug>"
category: "Personal IP"
tags: ["AI", "个人IP"]
date: "YYYY-MM-DD"
---
```

写作风格：

- 用户口吻：第一人称、真实经历、观点明确。
- 不要写成营销软文，也不要空泛堆概念。
- 如果文章涉及工具链，要点到为止地展示能力，让读者产生“这套怎么实现”的好奇。
- 平台文章必须在平台内完整可读，不要让读者必须跳出平台才能理解。

## 文末入口规则

公众号默认添加：

```text
更多项目和作品集：
https://swording-k.github.io

原文与长期更新版：
https://baojian-notionnext-blog.vercel.app/article/<slug>
```

二维码资源已经存在，但不要默认强塞二维码：

```text
content/assets/shared/qrcodes/personal-site.png
content/assets/shared/qrcodes/blog-site.png
```

平台策略：

- 公众号：默认加文字链接；二维码按用户明确要求添加。不要写"扫码关注、扫码领取、加我"等诱导文案。
- 小红书：自动同步自公众号，注意文末链接可能需要在 App 内手动删除。不要在正文、图片、封面里默认放站外网址、二维码、联系方式、水印式导流。
- 抖音：不要在长文正文或图片里默认放站外网址、二维码、联系方式；优先用平台允许的主页入口。

## 微信公众号草稿流程

公众号账号：

```text
宝剑Skyler
```

ObsidianToMP 配置在：

```text
.obsidian/plugins/obsidian-to-mp/data.json
```

不要读取、泄露或提交 AppSecret。

生成临时队列请求：

```json
{
  "note": "content/publish/<slug>.md",
  "account": "宝剑Skyler",
  "resultPath": "content/.obsidiantomp/publish-result.json",
  "requestId": "<slug>-YYYY-MM-DD"
}
```

保存为：

```text
content/.obsidiantomp/publish-request.json
```

触发命令：

```bash
obsidian vault="baojian-notionnext-blog" command id="obsidian-to-mp:obsidian-to-mp-publish-queued-draft"
```

必须检查：

```bash
cat content/.obsidiantomp/publish-result.json
```

成功标志：

```json
{
  "ok": true,
  "status": "success",
  "media_id": "..."
}
```

注意：命令输出 `Executed` 只表示触发插件，不表示上传成功。必须以 `publish-result.json` 为准。

常见失败：

- `invalid ip ... not in whitelist`：本机公网 IP 不在微信公众号后台白名单。临时处理是让用户添加当前 IP；长期方案是固定公网 IP 发布网关。
- `水印图片不存在`：清空 ObsidianToMP 水印设置，或填入真实图片路径。
- `请先在 ObsidianToMP 设置中保存公众号信息`：公众号配置未保存。

## 固定 IP 网关边界

目前公众号自动上传仍是本地直连微信 API，因此 IP 可能变化。不要承诺它是永久稳定自动化。

稳定架构应是：

```text
本地 Markdown / Agent
-> 固定公网 IP 的发布网关
-> 微信公众号 API
-> 草稿箱
```

在网关未搭建前，如 IP 白名单失败，要明确告诉用户需要手动添加当前 IP，或者改用公众号网页端人工发布。

## NotionNext 博客流程

只有在用户明确要求发布到博客，或文章值得长期沉淀时执行。

Notion 数据库：

```text
Skyler Yang 的 AI 产品手记
database/page id: 5bb47fa4-31e3-4798-a920-0b40e1f7dc81
data source: collection://d99c436f-b550-4141-a6a2-8956adf3902e
```

Notion 字段约定：

```text
title       文章标题
type        Post
status      Draft / Published
slug        纯 slug，不带 article/ 前缀（NotionNext 的 generateCustomizeSlug 会自动拼 POST_URL_PREFIX）
category    分类
tags        标签
summary     摘要
date        发布日期
icon        图标
```

**slug 规则（重要）**：
- 正确：`my-post-slug`（纯 slug，不带前缀）
- 错误：`article/my-post-slug`（会生成双前缀 `article/article/my-post-slug`，被 checkSlugHasOneSlash 过滤，文章不显示）

博客更新流程：

1. 在 Notion 数据库创建/更新文章页面。
2. 初稿可设为 `Draft`，最终发布设为 `Published`。
3. 如果有封面，把图片放到：

```text
public/images/articles/<slug>/cover.png
```

4. 部署 Vercel，让封面有公网 URL。
5. 设置 Notion 页面 Cover：

```text
https://baojian-notionnext-blog.vercel.app/images/articles/<slug>/cover.png
```

6. 重新部署 Vercel（如果使用静态导出模式 `EXPORT=true`；ISR 模式则自动同步，无需重新部署）。
7. 验证公开 URL：

```bash
curl -L -s -o /dev/null -w '%{http_code} %{url_effective}\n' \
  https://baojian-notionnext-blog.vercel.app/article/<slug>
```

必须返回 `200`。

## 已知构建陷阱（必读，否则 Vercel 部署必崩）

仓库是混合用途：NotionNext 博客 + Obsidian 仓库 + 嵌套的 Remotion 视频子项目 `content/videos/ai-workflow-short`。

`next build` 会按 `tsconfig.json` 的 `include`（`**/*.tsx` 等）对**整个仓库**做类型检查。`content/videos/ai-workflow-short/src/Root.tsx` 里 `import {Composition} from 'remotion'`，但 remotion 只装在那个子项目自己的 `node_modules` 里，主项目缺失该依赖，于是整次构建在类型检查阶段直接崩溃，报错 `Cannot find module 'remotion' or its corresponding type declarations`，**任何线上内容都不会生成**。

**这不是"仓库太乱导致无关文件被传到博客"**——博客内容来自 Notion 数据库，根本不读仓库里的 Markdown；这个报错只是构建期的类型检查失败，没有任何东西被上传。

**已修复且必须保留**：`tsconfig.json` 的 `exclude` 已加 `"content/videos"`。⚠️ 不要为了"整洁"把它加回 `include` 或移出 `exclude`，否则部署必崩。长期更干净的方案是把视频子项目移出博客仓库根目录，但当前用 exclude 即可。

## 部署与验证

部署命令（Vercel CLI，已认证）：

```bash
NODE_PATH=/Users/baojian/.workbuddy/binaries/node/workspace/node_modules \
  /Users/baojian/.workbuddy/binaries/node/versions/22.22.2/bin/node \
  /Users/baojian/.workbuddy/binaries/node/workspace/node_modules/.bin/vercel --prod --yes
```

如果 Vercel CLI 认证过期：

```bash
NODE_PATH=/Users/baojian/.workbuddy/binaries/node/workspace/node_modules \
  /Users/baojian/.workbuddy/binaries/node/versions/22.22.2/bin/node \
  /Users/baojian/.workbuddy/binaries/node/workspace/node_modules/.bin/vercel login --github
```

用户在浏览器确认设备授权即可，无需 token。

验证首页：

```bash
curl -L -s -o /dev/null -w '%{http_code}\n' \
  https://baojian-notionnext-blog.vercel.app/
```

验证文章：

```bash
curl -L -s -o /dev/null -w '%{http_code}\n' \
  https://baojian-notionnext-blog.vercel.app/article/<slug>
```

验证二维码资源：

```bash
curl -L -s -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' \
  https://baojian-notionnext-blog.vercel.app/images/qrcodes/personal-site.png
```

## Git 提交流程

完成文件变更后：

```bash
git status --short
git add <changed-files>
git commit -m "<clear message>"
git push fork main
```

不要提交：

```text
.obsidian/
content/.obsidiantomp/publish-request.json
content/.obsidiantomp/publish-result.json
.vercel/
.env*
```

如果工作树中有用户已有改动，不要回滚。只提交本次任务相关文件。

## 已有重要文章

MacBook/苹果生产力文章：

```text
content/publish/apple-price-macbook-worth.md
https://baojian-notionnext-blog.vercel.app/article/apple-price-macbook-worth
```

个人 IP/知识库工作流公众号版：

```text
content/publish/ai-personal-ip-knowledge-workflow-wechat.md
https://baojian-notionnext-blog.vercel.app/article/ai-personal-ip-three-layer-system
```

## 最终回复要求

最终回复不要只说“已完成”。必须说明：

- 主稿文件路径。
- 微信公众号草稿是否成功，若成功给出 `media_id`。
- 如果博客发布，给出公开 URL 和 HTTP 验证结果。
- 如果有失败，说明失败边界和用户需要做的手动步骤。
- 如果提交了代码，给出 commit hash。

## 最重要的边界

不要混淆这三件事：

```text
本地 Markdown：公众号/多平台主稿和长期备份
Notion：博客内容正源
Vercel/NotionNext：把 Notion 内容构建成公开博客
```

不要把 NotionNext 当作流量平台。它是精选档案馆和个人品牌背书，不是微博/小红书/抖音那样的推荐流。
