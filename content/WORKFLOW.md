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

如果个人博客是 Vercel/SSR/ISR 部署，通常会在缓存刷新后自动显示。  
如果个人博客是 GitHub Pages 静态导出，则还需要重新构建并部署站点。

本次文章的 Notion 页面：

```text
https://app.notion.com/p/38c660f59d21816899b7f6ea5714d6c4
```

本次公开站点检查：

```text
https://swording-k.github.io/apple-price-macbook-worth
```

截至本工作流固化时，该公开 URL 仍为 404，说明博客前端还未完成静态部署或真实访问地址需要进一步确认。

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
Codex 写入 Notion 数据库并设置 Published；如果公开站点未更新，再执行站点部署。
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
