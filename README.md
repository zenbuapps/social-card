# Guizang 社群圖卡 Skill · IG 貼文／輪播 · 貼文＋限時動態組合

> 本專案 fork 自 [op7418/guizang-social-card-skill](https://github.com/op7418/guizang-social-card-skill)，在地化為繁體中文、以台灣 Instagram 為主的版本。原始視覺系統（Guizang 電子雜誌風 / 瑞士國際主義）的美學與版權歸原作者。

![GitHub stars](https://img.shields.io/github/stars/zenbuapps/social-card?style=flat-square)
![License](https://img.shields.io/github/license/zenbuapps/social-card?style=flat-square)
![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![Social Cards](https://img.shields.io/badge/Social-Cards-FF4D6D?style=flat-square)
![Live Photo](https://img.shields.io/badge/Live%20Photo-Motion%20Cards-002FA7?style=flat-square)
![Claude Code](https://img.shields.io/badge/Claude%20Code-Supported-6B5B95?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)

[English README](./README.en.md)

一個適配 Claude Code / Codex 等 Agent 環境的圖卡技能，用於從文章、文案、截圖、產品筆記、字幕、照片或使用者影片，生成 **Instagram 貼文與輪播（組圖）**、**短影音動態卡**，以及 **IG 貼文＋限時動態組合（9:16 + 1:1 封面）**。

內建兩套視覺系統，共用一份圖卡工作流：

- **電子雜誌風（Editorial）**。像 *Monocle* / *Kinfolk* / *Cereal* 那樣剋制的版面，適合敘事、生活風格、旅行、閱讀、影視、個人觀察。
- **瑞士國際主義（Swiss）**。網格、單一錨點色、直角髮絲線、極致字級對比，適合產品開箱、資料、方法論、教學、AI 工具。

> 這個 Skill 是 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) 的姊妹專案，共享美學語言但獨立維護。PPT 解決「橫向翻頁演講」，這裡解決「靜態資訊流圖卡」。

![Guizang Social Card Skill 效果展示](https://github.com/user-attachments/assets/d370abcc-1fc4-4de1-903a-09020a6556ce)

## 30 秒開始

```bash
npx skills add https://github.com/zenbuapps/social-card --skill social-card
```

也可以直接把這段話發給有 shell 許可權的 AI Agent：

```text
幫我安裝 social-card。請把 https://github.com/zenbuapps/social-card 克隆到 ~/.claude/skills/social-card，安裝完成後檢查 SKILL.md、assets/、references/ 是否存在。
```

已經安裝過的話，用這段話更新：

```text
幫我更新 social-card。請進入 ~/.claude/skills/social-card 執行 git pull，然後告訴我目前最新 commit。
```

安裝後直接對 Agent 說：

```text
幫我用這篇文章做一套瑞士風的 IG 輪播貼文，5 張，IKB 藍。
```

也可以試這些請求：

```text
用這份產品開箱做一套 IG 4:5 貼文，標題用電子雜誌風。
把這篇文章做成 IG 貼文＋限時動態組合：9:16 限動封面 + 1:1 方形貼文，視覺保持一致。
我有 3 張露營照片，幫我做一套全圖風格的 IG 輪播貼文。
把這段遊戲攻略文案做成一套 IG 輪播貼文，需要從 Wallhaven 抓點遊戲原畫。
我有一段咖啡影片，幫我做成 Reels 封面短影音動態卡（約 5 秒），文字壓在安靜區域。
把這三個遊戲片段做成三連短影音拼貼，用 Swiss 風介紹攻略要點。
```

## 效果

- 🖋 **雙視覺系統**：電子雜誌風做氛圍與敘事，瑞士風做事實與結構，兩套共用同一份工作流
- 📐 **3 個畫板尺寸**：`.poster.post` 1080×1350（IG 4:5）、`.poster.story` 1080×1920（限時動態／Reels 9:16）、`.poster.square` 1080×1080（方形貼文 1:1）
- 🎬 **短影音動態卡**：支援單影片、二格、三格、四格、三連拼貼、長影片低成本診斷；Reels／貼文短影音約 `5s`，限時動態約 `3s`
- 🧩 **28 個版式骨架**：Editorial 16 個（`M01-M16`，含 Image-Led Cover、Pipeline、Before/After 等）+ Swiss 12 個（`S01-S12`，含 KPI Tower、H-Bar Chart、Matrix + Hero 等）
- 🎨 **10 套主題預設**：Editorial 6 套（墨水經典、靛藍瓷、森林墨、牛皮紙、沙丘、**Midnight Ink** 暗色）+ Swiss 4 套錨點色（IKB Klein Blue、檸檬黃、檸檬綠、安全橙）
- 🖼 **圖源工作流**：使用者圖優先；無圖時按 Unsplash → Pexels → Flickr CC → Wallhaven → 直接搜尋的優先順序取圖，落本地 + 自動寫 `SOURCES.md`
- 🌫 **WebGL 墨流背景**：雜誌風 hero 頁可掛動態墨流；低效能或截圖時可停用
- 🪧 **文字壓圖 + 主體避讓**：滿版圖先做 quiet-zone 與主體對映，文字避開人臉、產品和關鍵動作；需要時只加區域性 tint，不預設全圖遮罩
- 🧰 **截圖美化資產**：9 張 WebP 真實材質背景（Editorial 5 / Swiss 4），配套 `.frame-shot` / `.device-browser` / `.device-phone` 工具類
- 🗺 **地圖元件**：MapLibre + OSM 真實瓦片，支援多 pin + 連線，適合旅行攻略
- ✅ **校驗指令碼**：`validate-social-deck.mjs` 自動檢測溢位、字級上限、4 橫帶密度、footer 碰撞
- 📄 **單檔 HTML + Playwright 算圖**：不需要前端建置鏈，`node render.mjs` 直接出 PNG

## 短影音動態卡效果與版式

短影音動態卡在這個 Skill 裡的定位是「把使用者提供的影片裝進社群圖卡版面」，不是讓 Agent 隨機找公開影片，也不是長影片正片剪輯。先讓首幀像一張成立的靜態圖卡，再讓約 3～5 秒的動作補充資訊。

| 版式 | 效果 | 適合 |
|------|------|------|
| 單影片動態卡 | 一段影片裁成 `4:5` 吃滿畫布；需要文字時只放一組短標題，按 `M16 Image-Led Cover` / `image-overlay` 的主體避讓、quiet-zone、字型與區域性 tint 規則處理 | 咖啡、旅行、健身動作、產品狀態、遊戲瞬間 |
| 二格 / 三格 / 四格拼貼 | 多個影片井拼成一張動態卡，通常不加文字，讓高品質素材自己說話 | 旅行風景、穿搭精選、空間細節、菜品過程、運動動作 |
| 三連短影音拼貼 | 三段幾秒素材並列，提高短時長內的資訊密度；只在必要時加一行真實場景標題 | 攻略步驟、前後對比、多視角展示、模型測試結果 |
| 長影片診斷 | 對超長素材做稀疏抽幀 / contact sheet，判斷更適合裁哪段、倍速、拆分，還是請使用者指定時間段 | 使用者給了 1-3 分鐘素材但還沒選片段 |
| 釋出包 | 輸出除錯用 `JPG + MOV`，以及 iPhone 測試／釋出用 `.pvt` 包（iOS 實況照片格式） | Reels／貼文短影音、限時動態封面 |

資訊量判斷是第一步：限時動態約 `3s` 更適合一個動作點或一次狀態變化；Reels／貼文約 `5s` 可以容納一個小過程；三連拼貼適合三個並列結果，不適合講一個必須依序理解的長故事。

## 短影音動態卡生成指南

1. **確認平台和素材**：使用者影片是預設輸入；公開影片素材只用於 demo / 宣傳測試。先確認要發 Reels／貼文、限時動態，還是隻是本地測試。
2. **判斷資訊量**：問自己 `3s/5s` 內觀眾能看到什麼。如果需要解釋、音訊或完整教程才能懂，就不應該硬塞進短影音。
3. **選擇結構**：單個強素材用單影片動態卡；多個好素材用二格 / 三格 / 四格；三個並列結果用三連；長影片先做低成本診斷。
4. **先做靜態卡檢查**：首幀必須像一張合格社群卡。檢查裁切、主體、文字位置、平台安全區，不要把製作要求寫成觀眾可見文案。
5. **再生成動態資產**：在任務資料夾輸出預覽影片、關鍵 JPG、MOV 和 `.pvt`；不要把生成結果寫到 Skill 根目錄。
6. **交付時提醒釋出路徑**：Reels／貼文短影音約 `5s`，限時動態約 `3s`。`.pvt` 是 iOS 實況照片格式，Instagram 沒有原生 Live Photo 釋出管道——實務上把 MOV 轉成 MP4 發 Reels／貼文，或短片發限時動態；桌面端／IG 上傳流程一般不吃 `.pvt`。

可直接這樣讓 Agent 做：

```text
把這個咖啡影片做成 Reels 封面短影音（約 5 秒），標題只放一組，避開杯子和手。
這四段旅行影片素材品質很好，幫我做成四格短影音拼貼，不加文字。
這段 2 分鐘遊戲影片先做 contact sheet，幫我判斷適合截哪 5 秒做攻略短影音。
```

## 適合 / 不適合

**✅ 適合**：IG 貼文／輪播組圖 / 短影音動態卡 / IG 貼文＋限時動態組合 / Facebook 封面圖 / Reels 封面 / 文章配圖 / 教學拆頁 / 資料回顧 / 旅行攻略 / 產品開箱 / 截圖說明

**❌ 不適合**：橫向翻頁 PPT（用 [guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)）/ 長影片正片剪輯 / 純圖片修圖 / 無版式訴求的純文字編輯

## 台灣 IG 常見內容型別適配

按「能力圈」分三檔，詳見 [`references/category-cookbook.md`](./references/category-cookbook.md)：

**端到端強勢**（文 / 結構 / 圖都在能力圈內）：

- 旅行、知識／教學（懶人包）、品牌／開箱（指定子類後）

**文與結構強勢，圖依賴使用者或搜圖源：**

- 美食（食譜方向）、美妝（教學方向）、健身、居家、穿搭（精選方向）、影視／娛樂、親子、寵物、生活風格／日常

**能力圈外，主動說清**（不硬接）：

- 日常 OOTD 全身實拍 / 氛圍感、夢核 / 濾鏡調色風 / 美食擺盤大圖 / 純攝影貼文等強烈依賴攝影或後期的細分方向

## 常見使用場景

| 任務 | 推薦方式 |
|------|---------|
| 長文章 → IG 輪播貼文 | 抽核心觀點，Editorial 走敘事節奏，Swiss 走拆條資料 |
| 產品開箱 / 工具回顧 | Swiss + IKB 藍，優先 `S09 KPI Tower` / `S10 H-Bar Chart` |
| 旅行 / 生活風格分享 | Editorial + Midnight Ink 或 Dune，`M16 Image-Led Cover` 滿版主圖 |
| IG 貼文＋限時動態組合 | 同一份內容渲兩塊：`.poster.story` 9:16 + `.poster.square` 1:1，視覺一致 |
| 截圖教學 / 工具說明 | `.frame-shot` + `.device-browser` 包殼，優先 Swiss 網格底 |
| 遊戲攻略 / 影視回顧 | Editorial + Midnight Ink，從 Wallhaven 取遊戲原畫做滿版 |
| 使用者影片 → 短影音動態卡 | 先判斷 `3s/5s` 資訊量，再選單影片 / 拼貼 / 三連 / 長影片診斷 |
| 資料回顧 / 年終總結 | Swiss + Lemon 或 Safety Orange，矩陣 + ledger 組合 |

## 為什麼用單檔 HTML 渲 PNG

- **Agent 友善**：HTML + CSS 是文字，Agent 能直接寫、讀、改、驗證
- **版式精確**：CSS Grid + 嚴格字級 / 留白 / 網格，遠超 Markdown 排版能力
- **圖源開放**：可以接 Unsplash / Pexels / Wallhaven / Mapbox / OSM 等任意網路資源
- **品質可校驗**：`validate-social-deck.mjs` 用 Playwright 跑真實 DOM 量測，不是猜
- **交付簡單**：`output/*.png` 直接發，不需要部署、不需要匯出工具
- **動態卡可落地**：短影音分支輸出 `JPG + MOV + .pvt`，並記錄 Reels／限動的時長參考與（iOS 實況照片）手機端釋出路徑

## 平台支援

| 平台 | 狀態 | 說明 |
|------|------|------|
| Claude Code | 支援 | 原生 Skill 工作流，適合生成 + 迭代圖卡 |
| Codex | 支援 | 適合長流程圖卡生成、呼叫圖片源、做視覺檢查 |
| Cursor / 其他本地 Agent | 可用 | 需要能讀寫檔案 + 執行 shell |
| 一般 Chatbot | 不推薦 | 沒有檔案系統和算圖管線時無法穩定出圖 |

## 安裝

### 方式一：一行命令安裝（推薦）

```bash
npx skills add https://github.com/zenbuapps/social-card --skill social-card
```

### 方式二：把下面這段話直接發給 AI

> 幫我安裝 `social-card` 這個 Claude Code skill。請按下面步驟做：
>
> 1. 確保 `~/.claude/skills/` 目錄存在（不存在就建立）
> 2. 執行 `git clone https://github.com/zenbuapps/social-card.git ~/.claude/skills/social-card`
> 3. 驗證：`ls ~/.claude/skills/social-card/` 應該看到 `SKILL.md`、`assets/`、`references/` 三項
> 4. 告訴我裝好了，之後我說「做一套 IG 貼文」之類的話就會觸發這個 skill

把這段話複製貼上給 Claude Code / Cursor / 任何有 shell 許可權的 AI Agent，它會自動完成安裝。

### 方式三：手動命令列

```bash
git clone https://github.com/zenbuapps/social-card.git ~/.claude/skills/social-card
```

### 觸發方式

裝好後，Claude Code 會自動發現並呼叫這個 skill。觸發關鍵詞：

- 「幫我做一套 IG 貼文／輪播」
- 「幫我做一套社群圖卡」
- 「做一個 IG 貼文＋限時動態組合：9:16 限動封面 + 1:1 方形貼文」
- 「生成一套 social cards / 雜誌風社群圖卡」
- 「把這篇文章做成輪播貼文 / 教學拆頁」
- 「做一套瑞士風的 IG 開箱貼文 / IKB 風格圖文」
- 「把這段影片做成 Reels 封面短影音 / 三連短影音拼貼」
- 「做一個限時動態 3 秒短影音封面」

## 使用流程

Skill 本身是結構化工作流，Agent 會按 7 步走：

1. **Intake** — 抓 4 件事：目標平台 / 風格 / 內容素材 / 使用者圖。無圖時一次性給 A/B/C 三選（自己拍圖 / AI 生圖 / 網路取圖），不二次勸導
2. **Style & Theme** — 選 Editorial 還是 Swiss，再從 10 套預設裡選主題色。不允許自訂 hex
3. **Layout Selection** — 根據內容結構從 28 個版式骨架裡挑、貼、改文案。Editorial 16 個 / Swiss 12 個
4. **Asset Prep** — 取圖（Unsplash / Pexels / Flickr CC / Wallhaven / 直接搜尋），落本地 + 寫 `SOURCES.md`；問使用者要不要標來源
5. **Compose & Render** — 拷種子模板 → 替換 `<!-- POSTERS_HERE -->` → `node render.mjs`
6. **Deliver & Review** — 先把 PNG 給使用者看，詢問「你自己看還是我先幫你跑 validator」，預設不自動核查
7. **Iterate** — 使用者提反饋，改 inline 樣式或 swap 版式 / 替圖，重渲

短影音請求會在第 5 步進入動態分支：先判斷 `3s/5s` 內能承載的資訊量，抽首幀或稀疏 contact sheet 檢查裁切，再輸出 `JPG + MOV + .pvt`。交付時會提醒時長與釋出路徑：Reels／貼文短影音約 `5s`，限時動態約 `3s`；`.pvt` 是 iOS 實況照片格式，Instagram 沒有原生 Live Photo 釋出管道，實務上把 MOV 轉 MP4 發 Reels／貼文或短片發限動。

詳細說明見 [`SKILL.md`](./SKILL.md)。深度細節去看對應 `references/*.md`。

## 校驗指令碼

```bash
node validate-social-deck.mjs path/to/task-dir
```

9 條規則，基於 Playwright 真實算圖量測，不是靜態掃描：

- **R1** Overflow — 任何 section 超出 `.poster` 立刻報錯，並給出超出畫素對應的修正階梯
- **R2** Footer Collision — 內容壓到底部 footer / page-number
- **R3** Swiss Bold Display — Swiss 大標題違反「越大越細」時報警
- **R4** Min Readable Font — 內文、說明、標籤字級低於手機可讀下限
- **R5** 4-Band Density — 1350 高畫布切 4 橫帶，每帶應有內容或主動留白理由
- **R6** H-XL Line Cap — `.h-xl` / `.h-display` / `.h-statement` 行數超出畫板預算
- **R7** Figure Margin Drift — 瀏覽器預設 `<figure>` margin 造成版式漂移
- **R8** Visual Bounds — 量測真實可見內容的上／下邊界，報告視覺超出和底部空白
- **R9** Title Gap — 標題與下一塊內容之間的距離過小，避免貼在一起

`SKILL.md` 第 7 步明確**預設不自動跑** validator —— 等使用者先看完圖再問，避免每輪多花數十秒。

## 主題色預設

從 [`references/theme-presets.md`](./references/theme-presets.md) 裡選一套——**不允許自訂 hex 值**，保護美學比給自由更重要。

### Editorial 6 套

| 主題 | 色調 | 適合場景 |
|------|------|---------|
| 🖋 **墨水經典 Ink Classic** | `#0a0a0b` / `#f1efea` | 通用預設、商業話題、不知道選啥時最穩 |
| 🌊 **靛藍瓷 Indigo Porcelain** | `#0a1f3d` / `#f1f3f5` | 科技、研究、AI、技術分享 |
| 🌿 **森林墨 Forest Ink** | `#1a2e1f` / `#f5f1e8` | 自然、永續、戶外、非虛構 |
| 🍂 **牛皮紙 Kraft Paper** | `#2a1e13` / `#eedfc7` | 懷舊、人文、閱讀、文學 |
| 🌙 **沙丘 Dune** | `#1f1a14` / `#f0e6d2` | 藝術、設計、創意、時尚 |
| ⚫ **午夜墨 Midnight Ink** | `#0e0d0c` / `#ece2cf` / `#d4a04a` | 遊戲 key art / 夜景 / 影調封面 / 黑神話 · 艾爾登法環類深色題材 |

### Swiss 4 套

| 主題 | 錨點色 | 適合場景 |
|------|--------|---------|
| 🔵 **克萊因藍 IKB** | `#002FA7` | 通用預設、商業發布、AI 產品、方法論 |
| 🟡 **檸檬黃 Lemon** | `#FFD500` | 年輕、運動、零售、消費品、Y2K |
| 🟢 **檸檬綠 Lemon Green** | `#C5E803` | 生態、健康、Z 世代、綠色品牌 |
| 🟠 **安全橙 Safety Orange** | `#FF6B35` | 警示、新聞、工業、活力主題 |

切主題只需替換種子模板的 `<section class="poster" data-theme="...">` 屬性，所有 CSS 走 `var(--...)`。

## 目錄結構

```
social-card/
├── SKILL.md                              ← Skill 主檔：7 步工作流
├── README.md                             ← 本檔案
├── HANDOFF.md                            ← 交接檔案：事實 + 版本歷史
├── PRODUCT.md                            ← 產品檔案：思考 + 決策 + roadmap
├── validate-social-deck.mjs              ← Playwright 版式校驗指令碼
├── scripts/                              ← 短影音打包 / 抽幀 / 檔案測試指令碼
├── assets/
│   ├── template-editorial-card.html      ← Editorial 種子（6 主題 / 3 畫板）
│   ├── template-swiss-card.html          ← Swiss 種子（4 accent / 3 畫板）
│   ├── magazine-bg-webgl.js              ← WebGL 墨流背景
│   └── screenshot-backgrounds/           ← 9 張截圖舞台底（WebP）
│       ├── style-a/                      ←   Editorial 5 套
│       └── style-b/                      ←   Swiss 4 套
└── references/
    ├── platform-specs.md                 ← 平台 × 解析度 × 命名
    ├── style-system.md                   ← 兩種風格的硬規則與反模式
    ├── theme-presets.md                  ← 10 套色票詳解
    ├── layout-recipes.md                 ← 28 個版式骨架（M01-M16 + S01-S12）
    ├── components.md                     ← 字型 / 卡片 / 間距 / 圖示
    ├── background-systems.md             ← 墨流 / 網格 / 紙紋層
    ├── portrait-fill.md                  ← 4:5 板的留白對策
    ├── content-planning.md               ← 鉤子 / 拆頁 / 文案壓縮
    ├── category-cookbook.md              ← 台灣 IG 內容型別路由表
    ├── image-overlay.md                  ← 文字壓圖 + 主體避讓規則
    ├── screenshot-treatment.md           ← `.frame-shot` 工具類 + 截圖美化
    ├── map-component.md                  ← `.map-block` MapLibre 地圖
    ├── title-shortener.md                ← 1:1 封面的短標題策略
    ├── production-workflow.md            ← Playwright 算圖管線
    ├── live-photo-production.md          ← 短影音生產 / 拼貼 / 長影片 / 釋出規範
    └── qa-checklist.md                   ← 品質檢查清單
```

## 核心設計原則

1. **剋制優於喊話** — 資訊流裡剋制的色板反而最顯眼，不要堆飽和度
2. **結構優於裝飾** — 字級 + 字型對比 + 網格留白撐起資訊層級，不靠陰影和卡片
3. **版式優於自由** — 28 個版式骨架先選後改，不要發明不存在的頁面
4. **圖片優先用使用者的** — Intake 時一次性給 A/B/C，不二次勸導使用者拍圖
5. **選圖與避讓優先** — 滿版圖先確認 quiet zone，文字避開主體（人臉 / 產品 / 文字密集區），必要時才加區域性 tint
6. **越大越細** — Swiss `.h-xl` 字級上去 → 字重必須下來。Editorial 同此原則
7. **預設不自動核查** — 把「先看圖、再決定要不要 validate」做成工作流，省每輪幾十秒
8. **Skill 是產品不是 Prompt** — 有 PRODUCT.md、有版本號、有 CHANGELOG、有能力邊界
9. **本地測試不進 git** — 所有 demo / 冒煙測試歸 `local-tests/`，被 gitignore
10. **影片先當卡片** — 短影音第一幀必須先像一張好社群卡，可見文案描述真實場景，不要把製作術語寫上畫面

## 視覺參考

- *Monocle* / *Kinfolk* / *Cereal* 雜誌的版式與字距
- Massimo Vignelli / Helvetica Forever / 瑞士國際主義網格系統
- Apartamento / The Gentlewoman 的圖文比與人物紀實
- Instagram 動態裡「剋制反而吃香」的內容樣本
- 歸藏（Guizang）的圖卡實踐

## Roadmap

- 補充更多 Editorial 長內容下的字級上限冒煙測試
- 擴充套件 Swiss 資料類版式（更多圖表骨架）
- AI 出圖後處理：算圖後主動詢問是否做區域性修復 / 整張重出
- 增加更多台灣 IG 內容型別的官方推薦版式包（目前端到端可用的比例仍在擴充）
- 擴充短影音範例庫：單影片、拼貼、遊戲攻略、生活風格、產品更新
- 整理 WorkBuddy 等平台上架版本

## FAQ

**可以批次出圖嗎？**
可以。一個 task 目錄下的 `index.html` 包含多個 `.poster`，`node render.mjs` 會逐個截 PNG。一次出 IG 3-9 張輪播組圖很常見。

**為什麼不允許自訂顏色？**
和 PPT skill 同樣的理由——這個 Skill 的核心價值是穩定產出。自由選色會破壞整體風格，只允許從 10 套預設裡挑。

**能用其他模型生圖嗎？**
可以。生圖本身不在 Skill 範圍內，但 SKILL.md Step 4 寫清了取圖協議：使用者圖 → AI 生圖 → 網路取圖。AI 生圖能力依賴你目前 Agent 接的模型。

**支援短影音動態卡嗎？**
支援。Reels／貼文短影音約 `5s` 規劃，限時動態約 `3s` 規劃。可以做單影片、二格、三格、四格、三連拼貼，也能對長影片先做稀疏抽幀診斷。`.pvt` 是 iOS 實況照片格式，Instagram 沒有原生 Live Photo 釋出管道——實務上把 MOV 轉 MP4 發 Reels／貼文，或短片發限動；桌面端／IG 上傳流程一般不吃 `.pvt`。

**Codex 寫出來不合規怎麼辦？**
v0.12 起把「種子模板與 components.md 表格保持一致」做成了硬規則。如果還是出現違規，大機率是 seed template 預設值與 `references/style-system.md` 不一致——開 Issue 給我們。

**怎麼更新到最新版？**
重新執行安裝命令，或在本地 skill 目錄執行 `git pull`。

**支援英文圖文嗎？**
支援。Editorial 的 Playfair Display + Noto Serif、Swiss 的 Inter + Helvetica 都同時涵蓋中英文。版式骨架未做語言繫結。

## 貢獻

Bug、排版問題、新版式需求——歡迎開 Issue 或 PR。改動請優先：

- 改種子模板時，同步更新 `references/components.md` 的對照表（字級 / 字距 / 字重）
- 新增版式時，在 `references/layout-recipes.md` 加完整 recipe（文案上限 + minimum density）
- 新增主題色時，同步更新種子模板的 `[data-theme="..."]` 塊 + `references/theme-presets.md`
- 新增 Swiss 規則時，同步更新 `validate-social-deck.mjs` 的對應規則
- 踩過的坑寫到 `references/qa-checklist.md`
- 測試與 demo 一律放在 `local-tests/` 下，不要汙染 skill 根目錄

## License

AGPL-3.0 © 2026 [op7418](https://github.com/op7418)

本專案採用 **GNU AGPL-3.0** 協議，要點：

1. **必須署名** — 保留版權宣告
2. **衍生品必須開源** — 任何修改版本、Fork、二次分發，必須以 AGPL-3.0（或相容協議）公開發布，提供完整原始碼
3. **網路服務也要開源** — 即使你只是把修改版本部署成 SaaS / Web 服務給別人用而不分發程式碼，也要公開原始碼（這是 AGPL 區別於 GPL 的核心）
4. **不允許閉源、專有化、僅付費分發**

完整條款見 [`LICENSE`](./LICENSE)。
