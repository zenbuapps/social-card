# Handoff — guizang-social-card-skill

最後更新：2026-07-01 · 版本：v0.15（短影音封面生產規則：3s/5s 平臺限制、拼貼版式、長影片處理、釋出提醒、可見文案與不自造規則）

這份檔案只記錄**事實**：目前 skill 由哪些檔案組成、每個檔案管什麼、本輪更新改了什麼、怎麼驗證它還能跑。想讀「為什麼這樣做」或「未來要怎麼走」，去看 `PRODUCT.md`。

> **v0.13 路徑約定**：本檔案 v0.12 及更早版本歷史段落裡的 `demo-*` / `social-card-*` / `smoke-*` / `test-*` 目錄已統一搬入 `local-tests/`。讀歷史時請在腦中字首 `local-tests/`。

---

## 1. 目錄結構（事實版）

```
guizang-social-card-skill/
├── SKILL.md                   # 7 步工作流入口
├── HANDOFF.md                 # 本檔案
├── PRODUCT.md                 # 產品思考
├── assets/
│   ├── template-editorial-card.html   # 雜誌風種子
│   ├── template-swiss-card.html       # 瑞士風種子
│   ├── magazine-bg-webgl.js           # WebGL 墨流背景
│   └── screenshot-backgrounds/        # 9 張 WebP 截圖舞臺底（v0.14 從 PPT skill port）
│       ├── style-a/                   #   5 張 Editorial（dune / forest-ink / indigo-porcelain / kraft-paper / monocle-classic）
│       └── style-b/                   #   4 張 Swiss（ikb-dot / lemon-green-dot / lemon-grid / safety-orange）
├── references/                # 子規範，按需讀取
│   ├── platform-specs.md      平臺 × 解析度 × 命名
│   ├── style-system.md        兩種風格的硬規則與反模式
│   ├── theme-presets.md       6 套雜誌 palette（含 Midnight Ink）+ 4 套 Swiss accent
│   ├── layout-recipes.md      版式骨架（M01-M16 + S01-S12 + IG 貼文/限時動態）
│   ├── components.md          字型 / 卡片 / 間距 / 圖示 / 標題字數表
│   ├── background-systems.md  墨流 / 網格 / 紙紋層
│   ├── portrait-fill.md       4:5 板的留白對策
│   ├── content-planning.md    鉤子 / 拆頁 / 文案壓縮
│   ├── production-workflow.md 渲染管線與指令
│   ├── image-overlay.md       文字壓圖：選圖 / 區域性 tint / 主體對映
│   ├── screenshot-treatment.md 截圖處理
│   ├── map-component.md       Mapbox / OSM / schematic 地圖
│   ├── title-shortener.md     4:5 貼文短標題
│   ├── category-cookbook.md   Instagram 11 個品類的版式路由
│   ├── live-photo-production.md 短影音封面生產、拼貼、長影片與釋出規範
│   └── qa-checklist.md        交付前 checklist
├── agents/
│   └── openai.yaml            # 子代理設定（備用）
├── scripts/
│   ├── check-skill-docs.mjs       # Skill 檔案約束測試
│   ├── make-video-contact-sheet.py # 短影音影片抽格 contact sheet
│   ├── package-live-photo.py      # JPG+MOV 打包為 .pvt 的入口
│   └── *.swift                    # Apple Live Photo metadata helper
├── validate-social-deck.mjs   # R1-R9 渲染後校驗器
├── package.json / package-lock.json / node_modules   # 僅 playwright
├── .gitignore                 # v0.13 新增
└── local-tests/               # 本地測試與素材（git 忽略，不隨 skill 分發）
    ├── demo-*                 # 各次設計案例（kyoto / yading / wukong / kit-* / zzz-* / m16-camping / eyeliner / showcase / smoke-editorial-travel / map-component / screenshot-treatment / multi-platform）
    ├── social-card-*          # 歷史與 Codex 外部測試產物（含 codex-remote-* / wukong-breakout / kyoto-guide / moon-eyes-lip-mud）
    ├── smoke-ai-tools/        # v0.6 冒煙測試樣例
    ├── test-dark-theme-elden-ring/  # v0.12 Midnight Ink 驗證
    ├── Image/                 # 使用者上傳的測試圖
    ├── 全圖封面參考/           # v0.10 雜誌封面參考圖
    ├── .codepilot-uploads/    # 歷史上傳快取
    └── *.cjs                  # 舊的 debug / probe / render 指令碼
```

v0.13 起：git 儲存庫。`local-tests/` 整個目錄在 `.gitignore` 中，commit 只追蹤 skill 內容。

---

## 2. 資料規模與涵蓋面

| 維度 | 數量 |
| --- | --- |
| 工作流步驟 | 7 步（Intake → Extract → Style → Plan → Seed → Build → Image → Deliver） |
| 風格模式 | 2 個（Editorial Magazine × E-ink / Swiss International） |
| 主題色 | Editorial 6 套（5 淺 + 1 暗 Midnight Ink）+ Swiss 4 套 = 10 套 |
| 版式骨架 | Editorial 16 個（M01-M16）+ Swiss 12 個（S01-S12）= 28 個 |
| 平臺 × 比例 | Instagram 4:5 / 1:1，貼文 + 限時動態 4:5 + 9:16 配對，方封面 1:1 |
| Instagram 品類涵蓋 | 11 個品類中 7 個完整支援，4 個需使用者提供素材，4 個明確不接 |
| 種子模板 | 2 份（Editorial / Swiss），單檔案即含全部 class 與字型 |
| 已交付案例 | 7 個 demo（2 個 image-cover + 5 個 kit） |
| 短影音封面支援 | Instagram `5s` / Facebook 粉專 `3s`；單影片、二格、三格、四格、三連拼貼、長影片低成本診斷 |

---

## 3. 版本歷史

僅記錄「什麼時候新增／變更了哪些可見資產」，不記錄文風調整。

### v0.15 · 2026-07-01（本輪）

主題：**短影音封面從一次測試能力收口成 Skill 規則**。本輪把兩天聊天裡關於平臺限制、拼貼版式、長影片處理、品類判斷、釋出路徑和執行失誤的結論寫迴檔案，並補上檔案測試。

**新增**
- `references/live-photo-production.md`：短影音封面生產規範。涵蓋 `.pvt` 打包、AirDrop/iPhone 測試、Instagram `5s`、Facebook 粉專 `3s`、資訊量判斷、三連拼貼、material-first 拼貼、長影片低成本診斷、contact sheet、平臺釋出提醒和常見故障。
- `scripts/check-skill-docs.mjs`：檔案約束測試。目前卡住根目錄產物、短影音拼貼能力、M16 圖片壓字規則、可見文案規則、非模板裝飾禁令、平臺釋出提醒、產品復盤和交接記錄。
- `scripts/make-video-contact-sheet.py`：把影片按少量時間點抽成 contact sheet，用於長影片或短影音封面視覺檢查，避免預設密集抽格。
- `scripts/package-live-photo.py` 及 Swift helper：把 JPG + MOV 寫入 Apple Live Photo metadata 並打包成 `.pvt`，用於 iPhone/AirDrop 測試。

**修改**
- `SKILL.md` 增加短影音封面支援範圍：短 motion card、三連短影音、material-first 單影片/二格/三格/四格拼貼、長影片 intake。明確使用者提供影片是正常路徑，網頁素材只用於 demo / promo / 測試。
- `SKILL.md` 加硬規則：生成產物必須在任務資料夾，預設 `local-tests/<slug>/`；禁止把結果放在 Skill 根目錄。
- `SKILL.md` 加可見文案規則：卡面文案必須描述使用者真實場景，不能把 `3s`、`5s`、`短影音封面`、`三連拼貼`、`資訊量`、`長影片處理`、`倍速`、`高光檢測` 等內部製作詞寫成標題或正文。
- `SKILL.md` 加 material-first 規則：單影片加字必須走 M16 / image-overlay 的圖片壓字邏輯；如果只有一個標題，就用斷行、字級、字重、字距、對齊和位置做排版，不發明 kicker、meta、hairline、線條、刻度、徽章、字幕或說明文字。
- `references/category-cookbook.md` 加短影音場景庫（Live Photo Scene Library）。它不是固定模板清單，而是判斷素材在 `3s` / `5s` 內能承載多少資訊，以及適合單影片、三連、拼貼、修剪還是不做短影音封面。
- `references/platform-specs.md` 加 Instagram / Facebook 粉專短影音封面平臺說明：Instagram `5s`，Facebook 粉專貼文內 `3s`，釋出路徑以手機端為準。
- `PRODUCT.md` 加 `短影音（Reels／限時動態）復盤（2026-07-01）`，記錄這次需求、產品判斷、執行問題和驗收標準。

**本輪測試素材與輸出**
- 使用者素材目錄：`local-tests/live-photo-best-suite/影片素材/`
- 統一測試目錄：`local-tests/live-photo-best-suite/puzzle-layouts/`
- 四個測試影片輸出：
  - `IMG_XHS_PUZZLE_SINGLE_TEXT_5S_LIVE.MOV`
  - `IMG_XHS_PUZZLE_TWO_STACK_5S_LIVE.MOV`
  - `IMG_XHS_PUZZLE_THREE_STACK_5S_LIVE.MOV`
  - `IMG_XHS_PUZZLE_FOUR_GRID_5S_LIVE.MOV`
- 規格：全部 `1080x1350` / `5s` / `24fps` / `120 frames`。本地測試目錄被 `.gitignore` 忽略，不隨 Skill 分發。

**討論串裡暴露的問題，已轉成規則**
- 不要把製作要求當成觀眾可見內容。之前錯誤例子包括把「三連拼貼」、「5 秒看完完整幅度」、「別硬塞」寫到畫面上。
- 不要自造主題、背景色、線條、刻度字或裝飾元件。沒有在 `theme-presets.md` / `layout-recipes.md` / `image-overlay.md` 出現，就不能為了「顯得設計過」而加。
- 不要為了透過密度警告給 material-first 拼貼加字。二格、三格、四格可以無字；單影片也只能加使用者場景需要的短標題。
- 長影片不要預設做精準高光檢測。只能先做稀疏抽格和候選段診斷，再讓使用者選擇修剪、倍速、拆成三連或指定時間段。
- 網頁下載影片不是使用者工作流。那隻服務我們自己的測試和宣傳案例。

### v0.14 · 2026-05-28（本輪）

主題：**截圖美化素材從 PPT skill 遷移**。v0.11 當時只 port 了規則檔案（`references/screenshot-treatment.md` 154 行）和工具類（`.frame-shot.*` + `.device-browser` / `.device-phone`），但 PPT skill 的真實材質 WebP 背景**整個目錄沒拷過來**，導致 `.bg-paper / bg-grid / bg-dot` 這些舞臺底全是純 CSS 實色，截圖密度高的卡片視覺偏薄。本輪把素材補齊。

**改動事實**：
- 新增 `assets/screenshot-backgrounds/`，整個目錄 1.8 MB / 9 張 WebP：
  - `style-a/` 5 張 Editorial：`dune.webp` / `forest-ink.webp` / `indigo-porcelain.webp` / `kraft-paper.webp` / `monocle-classic.webp`
  - `style-b/` 4 張 Swiss：`ikb-dot-gradient.webp` / `lemon-green-dot-shadow.webp` / `lemon-grid.webp` / `safety-orange-halftone.webp`
- `assets/template-editorial-card.html` 加 5 條 `.frame-shot.bg-asset-*` 規則，指向 `style-a/` 五張圖（帶 fallback 實色防止素材未載入時透明）
- `assets/template-swiss-card.html` 加 4 條 `.frame-shot.bg-asset-*` 規則，指向 `style-b/` 四張圖
- `references/screenshot-treatment.md` 加「Solid `bg-*` vs asset `bg-asset-*`」小節：兩張對照表 + 4 條 rules of thumb（不混 accent / 不疊 `shadow-ed` / 一致使用 / 高比例板不用）+ 路徑說明
- 同檔案 Style cheat-sheet 加兩條 recipe：Editorial hero with real texture / Swiss hero with brand-aligned stage
- `HANDOFF.md` 目錄結構段加 `screenshot-backgrounds/` 子目錄檢視

**重要約定**：
- 素材路徑用相對 URL `../assets/screenshot-backgrounds/style-{a|b}/{name}.webp`，假設 deck 的 `index.html` 在 `local-tests/<task>/` 下（比 `assets/` 低一層）。放別處需要在 deck 裡本地 override 路徑
- Swiss 資產**強 accent 繫結**：`bg-asset-ikb-dot` 只能在 `data-accent="ikb"` 的 deck 用，不允許混色
- 不要在 asset 背景上疊 `shadow-ed`——`1px` 描邊會和材質衝突，讀起來像 SaaS 框
- `r-3x4` / `r-1x1` 高比例板仍優先用 solid `bg-*`，asset 材質在過裁切時會變怪
- 這是**素材遷移**，不是規則遷移：PPT skill 原版 `screenshot-framing.md` 的 7 引數語意系統未引入（本 skill 走 CSS 工具類路線，決策更輕）

### v0.13 · 2026-05-27（上一輪）

主題：**git 初始化 + 儲存庫瘦身**。把所有本地測試 / demo / 上傳圖 / 舊指令碼統一搬到 `local-tests/`，寫 `.gitignore` 忽略整個測試目錄與 `node_modules/`。skill 本身只保留：`SKILL.md` / `HANDOFF.md` / `PRODUCT.md` / `assets/` / `references/` / `agents/` / `validate-social-deck.mjs` / `package.json` 與鎖檔。

**改動事實**：
- 新建 `local-tests/`，搬入 28 個測試目錄（demo-* 16 個 / social-card-* 6 個 / smoke-* 1 個 / test-* 1 個 / Image / 全圖封面參考 / .codepilot-uploads）以及 3 個舊指令碼（`render.cjs` / `debug-bg.cjs` / `probe-webgl.cjs`）
- 新增 `.gitignore`：忽略 `local-tests/` / `node_modules/` / `.DS_Store` / `*.log` / `.vscode/` / `.idea/`
- `HANDOFF.md` 目錄結構段同步更新，列入 `local-tests/` 子目錄檢視
- skill 自身檔案結構未變，模板與規則檔案一律未改

**重要約定**：`local-tests/` 不進 git，不分發，不放入 skill 包。`demo-showcase/editorial.html` 和 `demo-showcase/swiss.html` 仍然是字級／字距／版式還原的 source-of-truth——它們移到了 `local-tests/demo-showcase/`，路徑變了但作用未變。所有後續 demo / 冒煙測試都應在 `local-tests/` 下新建子目錄。

### v0.12 · 2026-05-27

主題：**Editorial 美學回退 + 第 6 個雜誌主題 Midnight Ink + 圖片裁切策略 + 交付工作流調整**。本輪起因是使用者對 v0.11 冒煙測試的「品質回退」反饋——v0.10/v0.11 在把 showcase 模板化進 seed 的過程中，把 Editorial 的字重／字距／正文字族無意中改成了「資訊圖橫幅」風（900 字重 / 負字距 / sans 正文），與 `demo-showcase/editorial.html` 的「剋制磁帶感」完全偏離。同時 Codex 外部測試 `social-card-wukong-breakout` 暴露了缺暗色主題、自造 `wukong-night` 不合規的問題。

**新增**
- `assets/template-editorial-card.html` 增加 `[data-theme="midnight-ink"]` 暗色 palette + 三段必隨覆寫（`.grain` 翻成 screen-mode 暖光斑 / `.paper-wash` 改成金輝 + 陰影 vignette / `.frame-img` 加深底色 + 1px 暖邊）。Editorial palette 從 5 套變 6 套。
- `references/theme-presets.md` 增 **Midnight Ink** 段，含色值 + 必隨覆寫程式碼 + 使用場景（遊戲 key art / 夜景 / 影調封面）。明確「暗色 Editorial 只有這一套，不要自造第二套」。
- `test-dark-theme-elden-ring/` — Midnight Ink 驗證 deck（4 張 1080×1350，《艾爾登法環》新手指南）。圖源 Steam 官方 8 張截圖，記錄在 `assets/`。驗證 P1 全幅 hero-bleed + 黃金 accent、P2 M14 pipeline 4 步 + 21:9 atmosphere、P3 M07 ledger 4 行 + 戰鬥 atmosphere、P4 quote-card + 4:3 靜態時刻。

**修改：Editorial 美學回退（核心）**
- `assets/template-editorial-card.html` 全部 Editorial 排版預設值恢復 showcase 美學：
  - `.h-display` 124px **weight 500** letter-spacing **+.04em**（v0.10/v0.11 誤改為 900 / −.01em）
  - `.h-xl` 88px weight 500 +.03em（曾經 700 / −.01em）
  - `.h-md` 56px weight 500 +.02em
  - `.lead` 28px **font-family: var(--serif-zh)**（曾經被切到 sans-zh，是塌掉雜誌感的主因）
  - `.body` 24px serif-zh（同上）
  - `.kicker` 21px letter-spacing **+.22em**
  - `.meta` / `.label` 18px +.20em
  - `.ledger-row .ledger-title` 42px weight 500，`.ledger-note` 22px serif-zh
  - `.pipeline-v .step-title` 40px weight 500，`.step-desc` 24px serif-zh
- `references/components.md` Editorial 字級表完整改寫為上述值，加一段 **Restored 2026-05-27** 警示，寫明「v0.10/v0.11 錯改值是什麼，為何會塌掉，showcase 是 source-of-truth」。
- `references/style-system.md` Mode A 加 **Typography stance — "the larger, the lighter"** 段：Editorial display 必須 500、serif body、寬字距；反模式（700-900 + sans + 負字距）= "infographic banner" 塌方。

**修改：圖片裁切策略**
- `assets/template-editorial-card.html` `.frame-img img` 預設 `object-position` 從 `center top` 改為 `center 50%`。Editorial 之前的 `center top` 是預設值意外，導致直式圖主體被切掉；showcase 實際上是逐圖 inline 覆寫。
- `references/components.md` Image Containers 段加 **主體感知裁切表**（主體位置 → object-position 取值）+ 硬規則「每張圖都要 inline 寫 object-position，預設值是 fallback 不是推薦」。
- `SKILL.md` Step 6 Image and Screenshot Handling **Crop discipline** 改寫為強制每張圖 inline 寫 `object-position`，帶具體取值範例（`center 25%` 天空多 / `center 50%` 置中 / `center 62%` 半身 / `center 70%` 前景物）。

**修改：交付工作流（"show user first, ask before validating"）**
- `SKILL.md` Step 7 Deliver 重寫：
  - 預設 **不再** 渲完自動跑 validator。
  - 渲完先把圖給使用者看，問一句「先你自己看，還是我先自動核查一遍？」。
  - 使用者說「自己看」→ 停下來等反饋；說「你查吧」→ 才跑 `validate-social-deck.mjs`。
- 起因：使用者反饋每次渲完自動跑 validator 讓交付視窗變得很長，使用者大多數時候眼睛比指令碼更快。
- 代價：自動校驗的「安全網」被撤掉一格——但指令碼仍然可用、使用者隨時可調。

**修改：已有 demo 同步**
- `demo-kyoto-trip/index.html` — 字級回退到 showcase 值，P4 ledger 去掉 03（嵐山）解決 4:5 溢位，title 改「四條建議」。
- `demo-smoke-editorial-travel/index.html` — 字級回退到 showcase 值。P1 hero 從 `r-16x10` 改 `r-3x2` + `object-position:center 62%`（hero-grassland 主體在畫面中下）。P5 camp-tarp 加 `center 55%`。兩份 demo 都 4-5 張 1080×1350 重新渲染過，無溢位。

**Codex `social-card-wukong-breakout` 診斷**
- 狀態：未由本 skill 修復。Codex 在 v0.11 規則下做的測試。
- 根因：Codex 實際**遵守**了規則——錯的是規則本身。`components.md` 當時還在寫 900/700/sans-body 預設值，Codex 照搬出來必然塌；Codex 自造的 `wukong-night` 是「規則沒暗色」的合理外推。
- 修復路徑：v0.12 已落地 Midnight Ink 官方暗色 + 美學回退；後續 Codex 任務直接 `data-theme="midnight-ink"` 即可，無需自造。

**未做**
1. 截圖美化資產 port（仍在短期清單）
2. 地圖元件（同上）
3. 4:5 貼文短標題生成器（同上）
4. 多平臺一次出包（同上）
5. `social-card-wukong-breakout` 未重新生成——v0.12 是規則修復，不回灌歷史 Codex 測試

### v0.11 · 2026-05-27

主題：**短期規劃 Phase A 收口 — validator + Editorial 冒煙測試**。短期規劃 6 件事完成第 1、2 件，把 v0.10 留下的 Editorial 長內容欠債（M11/M14 在 4:5 上從未單獨驗證）也清掉。

**新增**
- `validate-social-deck.mjs` — 單檔案 Node 指令碼，接受 task-dir 或 index.html，對每個 `<section class="poster …">` 跑 6 條規則：R1 overflow / R2 footer 碰撞 / R3 Swiss 粗體 display / R4 字級下限 / R5 4 橫帶密度（pixel-row union 覆蓋率）/ R6 `.h-xl` 行／字 cap。`--style=swiss|editorial` 可顯式指定，預設按 `data-theme/data-accent` 或 serif 字族 fallback 自動判斷。退出碼 1 僅在 FAIL 時；WARN 是 advisory。
- `package.json` `scripts.validate` — 把 `node validate-social-deck.mjs` 包到 `npm run validate <task-dir>`。
- `demo-smoke-editorial-travel/` — Editorial 冒煙測試 5 張 1080×1350：M01 cover + M11 Marginalia Essay（3 段正文 + 7 行 marginalia）+ M07 Field Ledger（5 行帳本）+ M14 Vertical Pipeline（5 步）+ M16 Image-Led Cover 收束。全部 PASS validator。
- `references/components.md` § Editorial `.h-xl` Hard Caps — 實測表：post 92px / square 78px / story 96px；附 M11/M14/M07 各自的 ledger / paragraph / step 數硬上限。

**修改**
- `SKILL.md` Step 5 Build And Render 加：每次 render 後必須跑 validator，FAIL 必修。Step 7 Deliver 加：交付前再跑一次；WARN 在交付訊息裡報告讓使用者決定。
- `validate-social-deck.mjs` 修兩輪 false positive：
  - R2 footer collision：原版把 `.content` 容器 + 全幅 `.mag-bg` 誤判碰底；改成只看 leaf text/media + 跳過 ≥95% 全幅 absolute 節點。
  - R4 min font：原版按 class 選擇器命中所有 `.lead`，但 Swiss `.role-card .lead` 是子元件文字。改成只查 leaf text 節點的角色。
- `references/components.md` § Image Containers 加：figcaption 類名硬規則——Editorial 用 `.img-cap`、Swiss 用 `.swiss-img-caption`、**沒有共享 `.cap`**。冒煙測試中我把它寫成 `.cap` 觸發 R4，已固化為警示。

**回歸測試**（在 5 個 demo 上跑過 validator）
- `demo-smoke-editorial-travel`：5 pass / 0 fail / 0 warn
- `demo-zzz-miyabi`：4 pass / 1 R5 warn（p4 H-Bar 底部 trailing whitespace，可接受）
- `demo-eyeliner`：3 pass / 1 R5 warn（post-03 底帶 13%，可接受）
- `smoke-ai-tools`：發現一處歷史 R1 overflow（post-03 +101px）—— 之前漏看，已暴露
- `demo-showcase/swiss.html` + `editorial.html`：共暴露 39 + 46 條 R4/R5/R6 warn，主要是 lead/body/caption 在資料密集頁裡被壓到 18-22px、幾條 h-statement 行數超 cap。下一輪可逐張回修。

**未做（同短期規劃清單）**
1. 截圖美化資產 port（下一件）
2. 地圖元件
3. 4:5 貼文短標題生成器
4. 多平臺一次出包

### v0.10 · 2026-05-26

主題：**內容密度硬規則 + 風格-內容型別解綁 + 全版式 showcase**。兩件事併軌：(1) 解決 4:5 卡內容欠填——把「雜誌留白邏輯」和「社交卡逐張刷」這兩件事在檔案層面拆清；(2) 把「Editorial 只接生活類 / Swiss 只接產品類」的隱含繫結明確解除，讓使用者用同一篇內容自由選風格。

**新增**
- `demo-eyeliner/` — 4 張 4:5 美妝類 Editorial 案例（kraft-paper），P1 M16 全幅產品圖，P2 M03 翻車敘事，P3 M01 雙頭機制，P4 M07 收束。驗證密度規則在「圖+文+ledger」混合卡上的落地。
- `demo-showcase-editorial/` — 16 張 1080×1350 案例，逐張涵蓋 M01-M16，迴圈用 5 套雜誌 palette。
- `demo-showcase-swiss/` — 12 張 1080×1350 案例，逐張涵蓋 S01-S12，迴圈用 4 套 Swiss accent。兩套 showcase 演示「內容型別與風格脫鉤」——美食內容也可走 Swiss、AI 工具也可走 Editorial。

**修改**
- `SKILL.md` Step 3 重寫：「Editorial 用於 / Swiss 用於」的硬繫結改成「兩種風格是 visual stance，不是 content category；任何內容都可走任一風格；選風格按 editorial intent（feature story 還是 release note），不按 topic lookup。」
- `SKILL.md` Non-Negotiables 增加 **4:5 內容密度硬規則**：內容 ≥75% 畫布高度；>15% 空白帶需「留白理由」；禁用 `<div style="flex: 1"></div>` 上下夾擊；雜誌留白邏輯不適用於社交卡。
- `references/style-system.md` 頂部增 **"Style ↔ content type are decoupled"** 段；Mode A / Mode B 的「Use for」硬列表改成「Good fits」軟建議（含明確反例：workplace essay 也可走 Editorial、travel ledger 也可走 Swiss）。
- `references/layout-recipes.md`：
  - Editorial 和 Swiss recipe 總覽段都加了「這些結構適用於任何 topic」的前言。
  - **新增 Content density rule (hard)** 段，寫在 Editorial recipe 列表前。
  - **M03 / M04 / M07 / M13 各加 Minimum density 段**：
    - M03：title + 3 段 或 title + 2 段 + 編號 footer 列表。title 單獨是 M04 不是 M03。
    - M04：唯一允許 ≤60% 內容的 recipe，但必須有 3 個 anchor（source row / kicker / hairline）。
    - M07：title + ≥4 ledger items with sub-lines + closing block。「3 短 ledger 行」是已知失敗模式。
    - M13：必備 anchor（top kicker + bottom prompt + bottom metadata + 可見 WebGL bg）。
- `references/qa-checklist.md`：新增 **4 橫帶密度檢查**（Filled / Justified empty / Under-filled 分類，>15% 畫布的 under-filled 帶判失敗；透過門檻：Filled+Justified ≥100%、Filled ≥75%、相鄰兩帶不能都 justified）。
- `PRODUCT.md` 決策 1 重寫：風格不再繫結內容品類。刪除「Editorial × 人文／Swiss × 工程」的硬對應；明確「兩種風格是視覺立場不是內容門」。

**修復路徑（落到程式碼）**
- 雜誌留白邏輯→社交卡的對策：用 `flex-grow: 1` + `justify-content: space-between` 讓「內容塊本身撐開」，禁用空 `<div style="flex:1"></div>` 作為佔位。`demo-eyeliner` P2/P4 兩次重新渲染後透過 4 橫帶檢查。
- M07 spec 從 "2-3 rules" 改成 "4-6 ledger items with sub-lines"，每行 100-140px 垂直。

**未變動**
- Recipe 計數：仍是 M01-M16 + S01-S12 = 28 個。
- Theme palette 計數：5 + 4 = 9 套。
- 工作流步數仍 7 步；種子模板未動。
- Instagram 品類能力圈未變；只是不再把「風格-品類」硬繫結。

**對比驗證**
- 舊 P2/P4（v0.9 demo-eyeliner 第一版）：內容散在畫布中段，底部 25%-35% 是空白帶，縮圖刷過去像 PPT 漏排。
- 新 P2/P4（v0.10）：內容撐滿到 ~92% 畫布高度，引語+footer 緊貼底緣；FALLOUT 四條 a-d 均勻分佈到引語之上。
- showcase 兩套：28 個 recipe 每個出 1 張 1080×1350，全部透過 4 橫帶檢查、涵蓋全 9 調色、內容型別故意打散（戶外 / AI / 食譜 / 資料 / 節氣 / 影評等都既出現在 Editorial 也出現在 Swiss）。

### v0.9 · 2026-05-26

主題：**M16 編輯雜誌化重寫**。v0.8 的 M16 借了「遊戲 key art」那套（全幅黑色 vertical falloff + 132px 黑體感字 + 純白文字），出來像旅遊海報、不像 Kinfolk / Cereal。本輪按 8 張參考的共同語言推倒重來：**選圖是主要槓桿，遮罩是兜底；字小、字細、字色偏紙**。

**修改**
- `references/image-overlay.md` **Rule 1 重寫**：「選圖先，遮罩後，禁全幅 falloff」四步法。Step 1 選圖門（quiet-zone 測試 + light 測試），Step 2 預設不加 mask 直接驗，Step 3 兜底用 localized + image-toned 軟漸層（peak α ≤ 0.30），Step 4 縮圖測試。Banned 段把「全幅 vertical falloff」和「純黑 mask 色」明確點名禁掉。
- `references/image-overlay.md` Rule 2 增 **Composition discipline** 段：4 條編輯雜誌構圖硬規（非對稱、≥60% 留白、標題只佔一個 quiet zone、絕不跨越主體輪廓）。
- `references/image-overlay.md` Checklist 重寫：把「≥60% → 強制 mask」翻成「先看選圖通不透過，mask 僅在 Step 4 失敗時」。
- `references/layout-recipes.md` **M16 重寫**：
  - 頂部加 **Photo qualification gate**——quiet-zone test + light test 都過才能走 M16，否則退回 M01。
  - Modes A/B/C/D 表裡「Mask」列改成「Tint (only if Step 4 fails)」，明確「先無 mask、不行再區域性圖調色軟漸層」。
  - **字級字色字型徹底改**：標題 88-108px（v0.8 是 108-132px），Noto Serif SC 400-500（v0.8 沒限制字重，default 700+），色 `#f5f1e8` 紙米（v0.8 是 var(--paper) 容易跑成 #fff），letter-spacing 0.10-0.15em。
  - 加 **Forbidden in M16 type** 段：禁 inline 700+ 字重、禁純白 `#fff`、禁標題 > 120px、禁拉丁 sans 作主標題、禁 D 模式標題置中。
  - HTML skeleton 兩段重寫：預設不加 mask、用 `Noto Serif SC weight 500 + #f5f1e8`，全 inline 字級（不依賴 `.h-display`，因為種子模板 `.h-display` 強制 `color: var(--ink)` 在暗背景上失效）。
- `demo-m16-camping/index.html` **P1 封面重做**：Mode A（頂 kicker + 底標題），無全幅 mask，僅底部 22%x84% 苔綠色 (`rgba(20,32,22,...)`) 軟 radial 在標題區，標題 92px Noto Serif SC weight 500 / tracking 0.12em / 色 `#f5f1e8`。HTML 註釋加 photo qualification 記錄。

**未變動**
- Editorial recipe 計數：仍是 M01-M16。
- Swiss recipe / theme / 工作流 / 種子模板沒動。
- demo-m16-camping P2 (ledger) / P3 (field notes) 沒動——它們用的是 M05/M02 文字主導版式，沒踩 M16 的坑。

**對比驗證**
- 舊 P1（v0.8）：黑色 78% 側欄 scrim + 132px 字 + 整頁壓重。讀起來像旅遊打卡。
- 新 P1（v0.9）：林蔭透出、字小克制、底部苔綠軟漸漬只夠支撐標題對比。讀起來像 Kinfolk camping 專題。
- 縮圖測試（360px 寬）：標題 / kicker / 底部 mono strip 全部可讀，無糊。

### v0.8 · 2026-05-26

主題：**圖先序列 + 滿圖封面 recipe**。給「生活化、吃圖片」的內容一個明確的 P1 圖佔滿 + P2-3 資料的版式。

**新增**
- `references/layout-recipes.md` 新增 **M16 Image-Led Cover (Full-Bleed Hero)**：填補 M01「圖+文分塊」到「圖佔滿 + 文字壓上」的空白。含 4 種文字位置（頂壓底沉 / 側欄立柱 / 角落徽章 / 下沉條帶，按 subject map 選）、字級 spec 表、標題長度上限表、1:1 / 9:16 適配、兩段完整 HTML 骨架（Mode A + Mode D）。Editorial 模式專用，Swiss 不用。Editorial recipe 數：15 → 16。
- `references/content-planning.md` 新增 **Image-Led Sequence** 段：P1 M16 滿圖 → P2 文字資料卡（S11/M05/M10）→ P3 M02 副圖 → … 硬規則「絕不連續兩張 M16」。

**修改**
- `references/category-cookbook.md`：
  - 旅行 / 居家 / 美食（食譜）路由首選改為 M16 → S11/資料卡 → M02 的圖先序列。
  - 情感不強推圖先序列（M16 不適合 quiet documentary 的「窗 / 椅 / 手」——繼續走 M04/M09/M11 文字主導）。
- `SKILL.md` Seed 引用範圍 `M01-M15` → `M01-M16`。

**未變動**
- 工作流步數與種子模板。
- Swiss 12 個 recipe / 9 套 palette / image-overlay 規則。
- M16 強依賴既有 image-overlay.md（mask + subject map + crop），沒有放寬任何安全檢查。

### v0.7 · 2026-05-26（上一輪）

主題：**Editorial 圖源擴充套件**。沒有新增 layout，沒有改種子。

**修改**
- `SKILL.md` Step 6 web-sourced 圖源從 3 條擴到 5 條：新增 **Pexels**（#2，原生支援中文搜尋，補 Unsplash 在中文場景的缺口）與 **Flickr CC**（#3，`license=2,3,4,5,6,9` 過濾，補「紀實感真實感」的缺口）。加了取圖順序：Pexels（中文）→ Unsplash → Flickr CC（紀實）→ direct search。明確「全部免版權相簿，不接 視覺中國 / Getty / 站酷海洛 等付費源」。Swiss 模式繼續不走相簿。
- `references/category-cookbook.md`：
  - 旅行：Pexels 優先用於中文關鍵詞搜尋的目的地；Flickr CC 用於「真實旅程」的紀實質感。
  - 美食：Pexels 用於中式菜品 / 在地餐廳；Unsplash 標註為「西式 stock 感」，僅做兜底。
  - 情感：Flickr CC 升為主推（窗 / 椅 / 手這類紀實質感最契合）；Pexels 補中文語境；Unsplash 仍然可用但避開「moodcore」gradient-light stock。
- `references/qa-checklist.md`：圖源 checklist 改為列舉 Pexels / Unsplash / Flickr CC / Wallhaven / direct search，並提示 Flickr CC 在使用者同意標註時要保留作者署名。

**新增**
- `SKILL.md` Step 1 Intake 加「三選一」入口：使用者只給文字時問一次（A. 自己提供照片 推薦 / B. 我幫你找 / C. AI 生成），按選擇走 Step 6，不二次勸導。
- `SKILL.md` Step 6 "When the user has no images" 改為依賴 Step 1 gate，明確不再自動跳到 B/C。

**未變動**
- 工作流步數（仍為 7 步，三選一是 Step 1 內的子項）與種子模板。
- 9 套 palette 與 27 個 recipe。
- 不接付費相簿（視覺中國 / Getty）是產品邊界（見 `PRODUCT.md` 決策 4）。

### v0.6 · 2026-05-26（上一輪）

主題：**冒煙測試 + 種子模板硬化**。沒有新增 layout，沒有改工作流。

**新增**
- `smoke-ai-tools/` — 完整冒煙測試樣例。主題「工程師一週 AI 工具使用週記」。用 5 張 1080×1350 跑通 S01/S07/S10/S11/S12 五個 recipe。Klein Blue accent。
- `HANDOFF.md` · `PRODUCT.md`（本檔案 + 產品檔案）

**修改**
- `assets/template-swiss-card.html`：為 `.poster.post` 補全 display 字級 override。
  - `.h-hero` 168px · `.h-statement` 124px · `.h-xl` 96px · `.num-mega` 168px · `.num-xl` 120px
  - `.matrix-fill` 改為 `grid-auto-rows: min-content`、`min-height: 0`、`gap: var(--sp-4)`
  - `.matrix-cell .cell-title` 在 post 下降到 24px
  - `.hero-stat-bottom` 在 post 下緊湊 margin / padding，`num-mega` 128px
- `references/components.md`：新增兩張實測對照表。
  - 「Swiss `.h-xl` Hard Caps per Board」— 每板最多幾行、單行最多幾字、超限會怎樣
  - 「Matrix + hero-stat-bottom on `.poster.post`」— cell 數對應的搭配建議

**已知遺留**
- Editorial 模板（`template-editorial-card.html`）**未做同樣的冒煙測試**。M14 縱向 Pipeline 5 步在 4:5 板上是否溢位，未驗證。
- 冒煙測試只涵蓋 5 個 Swiss recipe（S01/S07/S10/S11/S12）。其餘 S02-S06/S08/S09 未跑過真實小例子。

### v0.5 · 2026-05-26 稍早

主題：**image-overlay 規則上線 + 文字壓圖驗證**。

**新增**
- `references/image-overlay.md` — 文字壓圖規則：蒙版強制 + 多模態主體對映 + 縮圖測試
- `demo-image-02-wukong/` — 用《黑神話:悟空》主視覺驗證 image-overlay 規則

**修改**
- `SKILL.md` Step 6 加入文字壓圖小節
- `references/style-system.md` 新增 Anti-Pattern D（封面照片裸跑無蒙版）

### v0.4 · 之前

主題：**模板種子 + 9 個新版式補全**（對齊已成熟的 PPT skill）。

**新增**
- `assets/template-editorial-card.html` · `assets/template-swiss-card.html` 兩份種子
- `references/components.md` 字型/卡片/間距/Lucide token 表
- `layout-recipes.md` 加 M12-M15（Editorial 缺失節奏型）+ S08-S12（Swiss 5 個 port from PPT）

**修改**
- `SKILL.md` 加 Step 4.5（複製種子模板）
- Required References 加 `components.md`

### v0.3 及更早

`SKILL.md` + 9 份 reference 的初始體系。Instagram 品類能力圈（`category-cookbook.md`）。Editorial 11 個版式 + Swiss 7 個版式。

---

## 4. 如何驗證 skill 還能跑

先跑檔案層驗證，確認 Skill Creator 基礎格式和本儲存庫約束都還成立：

```bash
python3 /Users/guohao/.agents/skills/skill-creator/scripts/quick_validate.py .
npm run test:docs
```

`quick_validate.py` 只檢查 Skill Creator 的基礎結構：`SKILL.md`、frontmatter、name / description 合法性。`npm run test:docs` 檢查本儲存庫新增的產品規則：根目錄不產出、短影音拼貼、M16 圖片壓字、可見文案、釋出提醒、產品復盤和交接記錄。

最快的驗證路徑，不要發明新需求。

```bash
cd /Users/guohao/Documents/code/HyperFrames-test/guizang-social-card-skill/local-tests/smoke-ai-tools
node render.mjs
ls output/   # 應該看到 ig-post-01.png ... ig-post-05.png
sips -g pixelWidth -g pixelHeight output/ig-post-01.png   # 應為 1080×1350
```

5 張圖都能渲染、尺寸都對 → Swiss 種子模板 + 5 個 recipe 運作正常。

視覺驗收：用 `Read` 工具讀 `output/ig-post-04.png`，確認大數字「8」在右下角完整可見、未被截斷。

更全的 demo：`local-tests/demo-image-02-wukong/index.html` 用 Playwright 渲染，驗證 image-overlay 規則下文字與人物未衝突。

短影音封面視覺回歸可以直接看本地測試目錄：

```bash
cd /Users/guohao/Documents/code/HyperFrames-test/guizang-social-card-skill/local-tests/live-photo-best-suite/puzzle-layouts
ls output/
```

重點看 `contact-sheet-*.jpg` 和四個 `IMG_XHS_PUZZLE_*_LIVE.MOV`。不要重新開新目錄，除非使用者明確要新的測試集。

---

## 5. 工作流要點（給接手者的極簡版）

按 `SKILL.md` 第 7 步走，**不要跳步**。最易踩坑的兩步：

- **Step 3 不要混風格**：Editorial 用 serif + ledger/marginalia；Swiss 用 Inter + card-fill/matrix。兩套 class 名稱空間隔離，模板間不能跨用。
- **Step 4.5 必須拷種子**：從零寫 HTML 是 v0.4 之前的工作流，已廢棄。

文字壓圖的頁（封面 / 大圖位 / 全幅圖）四步：先 `Read` 圖、寫 HTML 註釋記錄主體位置、選 `object-position`、做 360px 縮圖檢查。預設先不加遮罩；只有縮圖不可讀時才加區域性、取自圖片色調的 tint。

短影音封面頁先當靜態社交卡做：先確認第一幀、裁切、字型、可見文案和模板匹配，再渲 MOV / `.pvt`。單影片加字走 M16 / image-overlay；二格、三格、四格預設無字；三連拼貼只放能並行理解的三個短片段。

---

## 6. 已知風險與限制（事實層面）

- **校驗指令碼是按需兜底**。`validate-social-deck.mjs` 已可檢查溢位、頁尾碰撞、字級下限、密度、標題行數與 figure 預設 margin 漂移；預設交付流先給使用者看，使用者要求 auto-check 時再跑。
- **沒有跨平臺一次出包工具**。一篇文章要同時出 Instagram 4:5 + 貼文 + 限時動態組合（4:5+9:16）+ 方封面 1:1，目前要手動開兩個任務資料夾。
- **品類能力圈未硬編碼**。`category-cookbook.md` 寫明瞭 4 個不接的品類，但 skill 不會主動拒絕；需要執行者在 Step 1 自己讀到並主動告知使用者。
- **圖片來源署名機制是「使用者決定」**。`SOURCES.md` 總會寫，但是否在圖上加標註由使用者回答。這不是技術限制是產品決策（見 `PRODUCT.md`）。
- **短影音高光選擇只是低成本診斷**。預設只做稀疏抽格 / contact sheet / 時間段建議，不承諾精準識別轉場、空鏡、黑場或最佳高光。
- **短影音封面釋出依賴手機端路徑**。交付時必須提醒 Instagram `5s`、Facebook 粉專 `3s`，並提醒 iOS Live Photo `.pvt` AirDrop 到 iPhone 後從對應 App / 手機端編輯路徑釋出。

---

## 7. 不要做的事

- 不要改 PPT skill（在 `~/.claude/skills/guizang-ppt-skill/`）。本 skill 借了它的視覺原則但**獨立維護**。
- 不要把 demo 資料夾刪掉來「清理」。它們是回歸測試樣本。
- 不要在兩份種子模板裡塞動效系統、鍵盤翻頁、ESC 索引——那是 PPT 的需求，社交卡是靜態 PNG。
- 不要把 components.md 的硬上限表「調寬」以接更長的標題。先壓文案。
- 不要把內部製作詞寫到卡面上，例如 `三連拼貼`、`5 秒看完`、`資訊量`、`短影音封面`、`長影片處理`。這些詞只能出現在計劃、檔名、QA 或交付說明裡。
- 不要用自造背景色、線條、刻度、標籤、徽章去「補排版」。先找既有模板和 reference；沒有規則支援就不要加。
