# Agent 工作約定

## 專案說明

這個目錄是 `guizang-social-card-skill` 的 Skill 本體，用來給 Claude Code / Codex 等 Agent 提供「歸藏風」社交圖文生成能力。

它針對的產出包括：

- Instagram 4:5 貼文輪播（組圖）。
- Instagram 貼文 + 限時動態組合（4:5 貼文 + 9:16 限時動態封面）。
- 文章封面、產品更新卡片、截圖說明圖、教學拆頁等靜態資訊流視覺內容。

這個儲存庫的根目錄應該保持為 Skill 可安裝、可維護的結構。根目錄主要放：

- `SKILL.md`
- `README.md` / `README.en.md`
- `references/`
- `assets/`
- `agents/`
- `validate-social-deck.mjs`
- `package.json` / `package-lock.json`
- 授權、產品說明、交接等專案級檔案

不要把一次性的生成案例、渲染輸出、暫時素材、除錯指令碼或下載圖片直接放在 Skill 根目錄。

## 測試產物放置規則

所有測試生成的產物都放到：

```text
local-tests/
```

建議依一次任務或一個測試案例建立獨立子目錄：

```text
local-tests/<case-name>/
```

每個測試目錄可以包含自己的 `index.html`、`render.cjs` / `render.mjs`、`assets/`、`output/`、`SOURCES.md` 等檔案。例如：

```text
local-tests/social-card-example/
local-tests/social-card-example/index.html
local-tests/social-card-example/render.cjs
local-tests/social-card-example/assets/
local-tests/social-card-example/output/
```

原則：

- 試跑 HTML 放在 `local-tests/<case-name>/`。
- 渲染出來的 PNG/JPEG/WebP 放在 `local-tests/<case-name>/output/`。
- 下載或暫時使用的圖片、截圖、素材放在 `local-tests/<case-name>/assets/`。
- 一次性除錯指令碼放在對應測試目錄裡；只有通用校驗或 Skill 本體需要的指令碼才放根目錄。
- 如果要把某個測試案例升級為正式範例，先確認它屬於專案檔案、參考資料還是釋出資產，再移動到合適位置；不要預設留在根目錄。

`local-tests/` 已在 `.gitignore` 中忽略，適合承載這些本地測試與生成產物。保持這個邊界，能避免 Skill 本體再次混入大量一次性檔案。
