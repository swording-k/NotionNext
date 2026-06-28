# 内容发布工作流

这套工作流把本地 Markdown 作为内容母版，把 Notion、微信公众号、抖音和小红书作为分发端。

## 角色分工

- 本地 Markdown：主稿源文件，长期保存、可版本管理、可直接上传抖音。
- Notion：个人博客内容数据库，NotionNext 从这里读取文章。
- ObsidianToMP：微信公众号草稿箱同步工具。
- 小红书：优先通过微信公众号绑定同步；不单独维护主稿。
- 抖音：手动上传 Markdown 长文。

## 固定目录

```text
content/
├─ publish/                 # 最终主稿 Markdown
├─ review/                  # 平台改写稿、待审稿
├─ inbox/                   # 选题卡和初稿
├─ assets/                  # 每篇文章的封面和正文配图
├─ .obsidiantomp/           # ObsidianToMP 队列请求和结果
└─ WORKFLOW.md              # 本文档
```

每篇文章建议使用：

```text
content/publish/YYYY-MM-DD-slug.md
content/assets/slug/
```

当前文章使用：

```text
content/publish/apple-price-macbook-worth.md
content/assets/apple-price-macbook-worth/
```

## 标准流程

1. 用户给想法和观点。
2. Codex 先写高质量 Markdown 主稿，放入 `content/publish/`。
3. Codex 为文章生成或整理配图，放入 `content/assets/<slug>/`，并在 Markdown 中引用。
4. Codex 将同一篇主稿同步到 Notion 数据库，先设为 `Draft`。
5. 用户确认后，Codex 将 Notion 页面状态改为 `Published`。
6. Codex 通过 ObsidianToMP 队列命令保存到微信公众号草稿箱。
7. 抖音由用户手动上传同一份 Markdown。
8. 小红书通过微信公众号绑定同步，或需要时再生成单独小红书版。

## NotionNext 博客发布

Notion 数据库字段约定：

```text
title       文章标题
type        Post
status      Draft / Published
slug        URL slug
category    分类
tags        标签
summary     摘要
date        发布日期
icon        图标
```

注意：Notion 改为 `Published` 只代表内容源已发布。

当前个人博客部署在 Vercel：

```text
https://baojian-notionnext-blog.vercel.app/
```

当前项目使用 `EXPORT=true` 静态导出。也就是说，NotionNext 会在 Vercel 构建时读取 Notion 数据库，并把当时的文章生成成静态页面；Notion 里新增或修改文章之后，公开网站不会凭空自动变，需要重新触发一次 Vercel 部署。

Vercel 必须配置环境变量：

```text
NOTION_PAGE_ID=5bb47fa431e34798a9200b40e1f7dc81
```

部署命令：

```bash
npx --yes vercel@latest deploy --prod --yes --scope skyler-s-projects2
```

本次文章的 Notion 页面：

```text
https://app.notion.com/p/38c660f59d21816899b7f6ea5714d6c4
```

本次公开站点检查：

```text
https://baojian-notionnext-blog.vercel.app/article/apple-price-macbook-worth
```

截至本工作流固化时，该公开 URL 返回 200，首页也能看到新文章。

## 微信公众号发布

ObsidianToMP 配置位置：

```text
.obsidian/plugins/obsidian-to-mp/data.json
```

必须配置：

```text
公众号名称 | AppID | AppSecret
```

本次账号：

```text
宝剑Skyler
wxaa8a6f4cea86b268
```

不要把 AppSecret 写入聊天记录。

队列请求文件：

```text
content/.obsidiantomp/publish-request.json
```

触发命令：

```bash
obsidian vault="baojian-notionnext-blog" command id="obsidian-to-mp:obsidian-to-mp-publish-queued-draft"
```

结果文件：

```text
content/.obsidiantomp/publish-result.json
```

本次成功结果：

```text
ok: true
status: success
media_id: T_idYMTCh4L08PLOE6NeYMyMSZQrDwwrUsV6K7S94aJFq1ExqQrJghDJli_0iPt_
```

常见错误：

- `invalid ip ... not in whitelist`：去微信公众号后台 `设置与开发 -> 开发接口管理 -> IP白名单` 添加当前出口 IP。
- `水印图片不存在`：清空 ObsidianToMP 的水印设置，或填入真实图片路径。
- `请先在 ObsidianToMP 设置中保存公众号信息`：公众号 AppID/AppSecret 未保存。

## 平台策略

微信公众号：

```text
走 ObsidianToMP 插件同步，不走网页手动发布。
```

小红书：

```text
优先绑定微信公众号同步，不维护另一套主稿。
```

抖音：

```text
用户手动上传 content/publish/ 下的 Markdown。
```

个人博客：

```text
Codex 写入 Notion 数据库并设置 Published；随后执行 Vercel 生产部署；最后检查公开 URL 是否返回 200。
```

## 下次使用口令

用户可以直接说：

```text
按我们的内容发布工作流，把这个想法写成文章并发布到博客和公众号草稿。
```

Codex 应按以下顺序执行：

1. 写 Markdown 主稿和配图。
2. 写入 Notion，先 Draft，确认后 Published。
3. 生成或更新 ObsidianToMP 队列请求。
4. 触发 ObsidianToMP 保存公众号草稿。
5. 检查 `publish-result.json`。
6. 明确说明个人博客是否已经在公开 URL 可见；不可见时说明是否需要部署。
7. 若部署日志里出现 NotionNext 官方示例库或演示文章，优先检查 Vercel 的 `NOTION_PAGE_ID` 环境变量。
