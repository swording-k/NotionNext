# ObsidianToMP Agent 写作链路

推荐流程：
1. Agent/Codex/Claude Code 把初稿写入 `content/inbox/`。
2. 人工校对后移动到 `content/review/`。
3. 终稿移动到 `content/publish/`。
4. 在 Obsidian 打开终稿，执行“ObsidianToMP 发布工作台”。
5. 如果要让 Codex 直接保存到草稿箱，写入 `content/.obsidiantomp/publish-request.json` 后执行命令 `obsidian-to-mp:obsidian-to-mp-publish-queued-draft`。

Codex 示例：
```bash
codex run "根据选题卡生成公众号稿件，写入当前 vault 的 content/inbox/文章名.md。frontmatter 使用：标题、作者、摘要、公众号、样式、代码高亮、封面。"
```

自动保存草稿请求示例：
```json
{
  "note": "content/publish/文章名.md",
  "account": "公众号名称",
  "resultPath": "content/.obsidiantomp/publish-result.json"
}
```

触发 Obsidian CLI：
```bash
obsidian vault="<Vault名称>" command id="obsidian-to-mp:obsidian-to-mp-publish-queued-draft"
```

注意：
- 插件不会在 Obsidian 内直接启动外部 Agent；Agent 写请求，插件负责读取请求并调用公众号草稿 API。
- 本地图片会在“复制排版”或“保存草稿”时按设置自动上传到云端图床；在线图片会跳过。
