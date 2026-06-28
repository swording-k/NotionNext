# 内容发布工作流

这套工作流的原则是：平台优先，博客精选。

公众号、小红书、知乎、抖音负责被看见；个人博客负责沉淀代表作、作品集和个人品牌主页。不是每篇文章都必须同步到博客，只有重要文章、系列文章、长期有价值的文章才进入 NotionNext。

## 固定目录

```text
content/
├─ inbox/       # 选题卡、粗略想法、待写稿
├─ publish/     # 最终 Markdown 主稿
├─ review/      # 平台改写稿、标题备选、发布检查
├─ assets/      # 每篇文章的本地配图源文件
└─ WORKFLOW.md  # 本工作流

public/images/articles/
└─ <slug>/      # 需要给博客使用的线上图片
```

临时文件不进入版本库：

```text
content/.obsidiantomp/publish-request.json
content/.obsidiantomp/publish-result.json
.obsidian/
```

## 下次使用口令

用户可以直接说：

```text
按我们的内容发布工作流，把这个想法写成文章。
```

如果用户没有特别说明，Codex 默认执行轻量主流程：

1. 根据想法写成高质量 Markdown 主稿，保存到 `content/publish/`。
2. 生成或整理封面和正文配图，保存到 `content/assets/<slug>/`。
3. 准备微信公众号草稿，通过 ObsidianToMP 保存到公众号草稿箱。
4. 给出抖音、小红书、知乎可用的标题或摘要改写。
5. 只有文章适合作为长期代表作时，才同步到 NotionNext 个人博客。

如果用户明确说“也发布到博客”，Codex 执行博客流程。

## 公众号流程

公众号是当前主要发布端。

当前 ObsidianToMP 是本地直连微信公众号 API。微信公众号接口会校验调用方公网 IP，因此这台 Mac 的出口 IP 一旦变化，就会出现：

```text
invalid ip ... not in whitelist
```

这不是稳定工作流。它只适合临时发布或调试。

稳定方案是固定一个“公众号发布网关”：

```text
Codex/本地 Markdown
-> 固定公网 IP 的云服务器或发布服务
-> 微信公众号 API
-> 公众号草稿箱
```

只需要把云服务器的固定公网 IP 加入公众号后台白名单一次。以后无论本地网络怎么变，真正调用微信 API 的都是这台固定 IP 机器。

在发布网关没有搭好之前，公众号发布有两个选择：

1. 临时自动化：每次 IP 变化时，手动把当前出口 IP 加入微信公众号白名单。
2. 稳定人工：Codex 写好 Markdown，用户在公众号后台网页端复制排版发布，不走 API。

长期推荐使用固定 IP 发布网关，不推荐反复维护本机动态 IP 白名单。

ObsidianToMP 配置位置：

```text
.obsidian/plugins/obsidian-to-mp/data.json
```

已配置账号：

```text
宝剑Skyler
```

不要把 AppSecret 写入聊天记录或版本库。

每次发布时，Codex 临时生成：

```text
content/.obsidiantomp/publish-request.json
```

触发命令：

```bash
obsidian vault="baojian-notionnext-blog" command id="obsidian-to-mp:obsidian-to-mp-publish-queued-draft"
```

检查结果：

```text
content/.obsidiantomp/publish-result.json
```

常见错误：

- `invalid ip ... not in whitelist`：当前调用微信 API 的公网 IP 不在白名单。临时处理是添加当前 IP；长期处理是改用固定 IP 发布网关。
- `水印图片不存在`：清空 ObsidianToMP 的水印设置，或填入真实图片路径。
- `请先在 ObsidianToMP 设置中保存公众号信息`：公众号 AppID/AppSecret 未保存。

## 个人博客流程

个人博客使用 NotionNext：

```text
https://baojian-notionnext-blog.vercel.app/
```

NotionNext 的作用：

```text
Notion 数据库
-> Vercel 构建
-> NotionNext 读取 Published 文章
-> 生成静态博客页面
```

当前项目是 `EXPORT=true` 静态导出。Notion 里新增或修改文章后，公开网站不会自动变化，必须重新部署 Vercel。

Vercel 必须配置：

```text
NOTION_PAGE_ID=5bb47fa431e34798a9200b40e1f7dc81
```

部署命令：

```bash
npx --yes vercel@latest deploy --prod --yes --scope skyler-s-projects2
```

发布后必须检查公开 URL 是否返回 200。

## 博客封面规则

NotionNext 读取的是 Notion 页面的 Cover，不读取 Markdown frontmatter 里的本地 `封面` 字段。

所以博客封面的固定做法是：

1. 把封面图片保存到 `content/assets/<slug>/cover.png`。
2. 复制一份到 `public/images/articles/<slug>/cover.png`。
3. 部署 Vercel，让图片拥有线上地址。
4. 把 Notion 文章 Cover 设置为：

```text
https://baojian-notionnext-blog.vercel.app/images/articles/<slug>/cover.png
```

## 评论留言

NotionNext 支持评论，但不是开箱即用的“后台留言系统”。当前代码支持：

```text
Twikoo
Giscus
Waline
Gitalk
Cusdis
Utterances
Artalk
WebMention
```

建议优先选择 Giscus 或 Twikoo：

- Giscus：依赖 GitHub Discussions，适合技术/作品集型博客，维护成本低。
- Twikoo：更像传统评论系统，需要部署后端，适合中文博客体验。

短期建议先不开评论。公众号、小红书、知乎本身有评论区，独立博客先承担“精选档案馆”和“个人主页”的角色。

## 外链策略

可以在微信公众号、知乎、小红书正文或文末附上原文链接，但不要一上来就把读者导走。

推荐文案：

```text
原文与长期更新版：
https://baojian-notionnext-blog.vercel.app/article/<slug>
```

对流量的影响：

- 公众号：文中外链能力受平台限制，文末放原文链接通常不会明显伤害阅读，反而能建立个人主页心智。
- 知乎：可以放原文链接，但不要让回答看起来像纯导流。
- 小红书：外链不友好，优先引导关注公众号或个人主页，不强塞 URL。
- 抖音长文：保留平台内阅读体验即可，原文链接可放简介或评论区视情况处理。

原则：平台文章要在平台内完整可读，个人博客链接作为“长期版本”和“个人主页入口”，不要把它当主要转化按钮。

## 当前文章记录

文章：

```text
content/publish/apple-price-macbook-worth.md
```

博客地址：

```text
https://baojian-notionnext-blog.vercel.app/article/apple-price-macbook-worth
```

Notion 页面：

```text
https://app.notion.com/p/38c660f59d21816899b7f6ea5714d6c4
```
