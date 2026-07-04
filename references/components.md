# Components

兩個種子模板共用的元件規格。當你需要查一個 class、一個字級，或一條跨 recipe 反覆出現的硬規則時，讀這份。各 recipe 的細節在 `layout-recipes.md`；各主題的色彩 token 在 `theme-presets.md`。

## Font Stacks

Editorial Magazine x E-ink（`template-editorial-card.html`）：

- `--serif-zh`：Noto Serif SC、Songti SC、STSong——展示標題。
- `--serif-en`：Playfair Display，斜體，用於副標與 pull quote。
- `--sans-zh`：Noto Sans SC、PingFang SC——工具型文字與後備；在 Editorial 中，內文與 lead 預設用 serif-zh。
- `--sans-en`：Inter——混排內容中的拉丁文內文。
- `--mono`：IBM Plex Mono——標籤、頁面 metadata、issue strip、圖說。

Swiss International（`template-swiss-card.html`）：

- `--sans`：Inter、Helvetica Neue、Helvetica。
- `--sans-zh`：Noto Sans SC、PingFang SC——中文內文。
- `--mono`：IBM Plex Mono——標籤、圖說、t-meta。

Swiss 模板絕不載入襯線字型。Editorial 模板絕不失去它的襯線展示字型族。

## 字級與字重對應

兩個模板都遵守**「越大越輕」**。小字的字重永遠比大字重。在 1080×1350 版面上，把行動裝置縮圖納入考量後，最小可讀尺寸是 22-28px。

Editorial 字級（4:5 預設）：

| 角色        | Class       | 尺寸  | 字重   | 字距     | 字型      |
| ----------- | ----------- | ----- | ------ | -------- | --------- |
| Display     | `.h-display`| 124px | 500    | +.04em   | serif-zh  |
| Section ttl | `.h-xl`     |  88px | 500    | +.03em   | serif-zh  |
| Mid title   | `.h-md`     |  56px | 500    | +.02em   | serif-zh  |
| Subtitle    | `.h-sub`    |  36px | 400 it | normal   | serif-en  |
| Pull quote  | `.pullquote`|  64px | 500 it | normal   | serif-zh  |
| Lead        | `.lead`     |  28px | 400    | normal   | **serif-zh** |
| Body        | `.body`     |  24px | 400    | normal   | **serif-zh** |
| Kicker      | `.kicker`   |  21px | 500    | +.22em   | mono      |
| Meta        | `.meta`     |  18px | 500    | +.20em   | mono      |
| Label       | `.label`    |  18px | 500    | +.20em   | mono      |

> **2026-05-27 復原。** 先前的預設（900 / 700 / 700 / 無襯線內文 / `−.01em`）讓 Editorial 卡片讀起來像沉重的資訊圖 banner。那**不是** Guizang showcase 的美學——請見 `local-tests/demo-showcase/editorial.html` 這個準則來源。規則是剋制的字型排印：輕字重、**可容斜體的襯線內文**、展示與等寬用**寬字距**。Editorial 裡的沉重感 = 視覺上被降級成「一般 landing-page」，跟 Swiss 是同一個陷阱。

Swiss 字級（4:5 預設）：

| 角色        | Class         | 尺寸  | 字重   | 字型      |
| ----------- | ------------- | ----- | ------ | --------- |
| Hero        | `.h-hero`     | 240px | 200    | sans      |
| Statement   | `.h-statement`| 180px | 200    | sans      |
| Section ttl | `.h-xl`       | 120px | 300    | sans      |
| Mid title   | `.h-md`       |  56px | 400    | sans      |
| Mega number | `.num-mega`   | 200px | 200    | sans      |
| XL number   | `.num-xl`     | 144px | 200    | sans      |
| Lead        | `.lead`       |  30px | 400    | sans-zh   |
| Body        | `.body`       |  26px | 400    | sans-zh   |
| Category    | `.t-cat`      |  22px | 600    | sans      |
| Meta        | `.t-meta`     |  20px | 500    | mono      |
| Caption     | `.swiss-img-caption` | 18px | 500 | mono   |

兩個模板都會在 `.poster.square` 與 `.poster.story` 內自動縮小展示字級。你通常不需要覆寫它們。只有當某個標題已無法再精簡時，才覆寫。

### 中文標題字數帶

中文字在視覺上比拉丁文密。定尺寸前先挑一個字數帶：

| 標題形狀                                   | Editorial display | Swiss h-hero |
| ------------------------------------------ | ----------------- | ------------ |
| 1 行，<= 6 個中文字                        | 132px（預設）     | 240px（預設） |
| 1 行，7-10 字                              | 108px             | 200px        |
| 2 行，每行 <= 8 字                         | 96px              | 180px        |
| 2 行，任一行 9-12 字                       | 84px              | 152px        |
| 3 行（少見）                               | 72px              | 132px        |

如果標題還是塞不下，**先精簡文案**。絕不要靠把內文縮到低於最小可讀尺寸來解決溢位。

### Swiss `.h-xl` —— 各版面硬上限（已驗證）

種子模板內建這些上限。超過就違反垂直預算——已在 `local-tests/smoke-ai-tools/` 實測驗證：

| 版面                | 預設 `.h-xl` | 最大行數 | 每行最大字數 | 超過上限會發生什麼                                                |
| -------------------- | --------------- | --------- | ---------------- | ------------------------------------------------------------------ |
| `.poster.post`（1080×1350） | 96px       | 2         | 8                | 3 行標題把 ledger/matrix 推過 1350——內容被推出畫布 |
| `.poster.square`（1080×1080） | 88px   | 2         | 7                | 底部卡片或 metadata strip 被裁切                                 |
| `.poster.story`（1080×1920，直式）   | 104px   | 2         | 8               | 標題吃進頂部安全區（帳號／關閉鈕），或把中段主視覺與底部 CTA 往下擠出安全帶 |

**如果你的標題在 `.poster.post` 上需要 3 行中文：** 把 recipe 從 S03/S10/S12（資料密集）換成 S01/S05（封面式），讓標題可以主導。不要把 `.h-xl` 縮到 80px 以下——又小又重讀起來像 Web1.0。

### Editorial `.h-xl` —— 各版面硬上限（已驗證）

Editorial 種子對 `.h-xl` 的預設是 88px 襯線字重 500。已在 `local-tests/demo-smoke-editorial-travel/` 用 M11/M14/M07 搭配 3 段內文 + ledger + 5 步 pipeline 驗證：

| 版面                | 預設 `.h-xl` | 最大行數 | 每行最大字數 | 超過上限會發生什麼                                                        |
| -------------------- | --------------- | --------- | ---------------- | ------------------------------------------------------------------------- |
| `.poster.post`（1080×1350） | 88px       | 2         | 9                | 3 行會把邊註／ledger／pipeline 各列推過 issue strip |
| `.poster.square`（1080×1080） | 78px   | 2         | 8                | 子段落或 pull-quote 被裁切                                          |
| `.poster.story`（1080×1920，直式）   | 96px    | 2         | 9               | 標題落在頂部三分之一，換行會擠壓中段主視覺與邊註欄                            |

Smoke deck 的 p2 標題 `第三次進山，裝備比上一次輕 3.4kg` 正好是 2 行 × 9 字的極限，而且成功了。那個 `<br>` 是關鍵——在 `.h-xl` 上讓 CJK 自由自動換行，你會得到很尷尬的斷行。要在語意接縫處手動硬斷。

**各 recipe 的細節：**
- M11（Marginalia Essay）：2 行標題在 700px 主欄裡留得下**3 段、每段 3-4 句**，以及 220px 側欄裡的 5-7 列邊註。
- M14（Vertical Pipeline）：2 行標題 + **5 步**（每步的 step-title 42px 襯線 + step-desc 26px 無襯線，28px 間距）剛好碰到 1350 底線；加第 6 步就得把標題縮成 1 行。
- M07（Field Ledger）：2 行標題 + **5 列 ledger**，每列同時有 `.ledger-title` 與 `.ledger-note` ≈ 100-120px 列高——剛好填滿。6 列就得改 1 行標題。

### `.poster.post` 上的 Matrix + hero-stat-bottom

`.matrix-fill` 搭配 `grid-auto-rows: min-content` 是 `post` 上的安全預設。硬限制：

| 格數 | 列數 | 搭配 hero-stat-bottom？ | 備註                                             |
| ----- | ---- | --------------------------- | ------------------------------------------------- |
| 4     | 2    | 可以——舒服                  | 每格拿到 200+ px                            |
| 6     | 3    | 可以——建議                  | 甜蜜點                                    |
| 8     | 4    | 只在精簡標題 + `num-mega` 110-128px 時 | 壓縮；不要同時用 3 行標題 |
| 10+   | 5+   | **不行**                      | 改用 S10 H-Bar Chart——那個模式才能擴充套件 |

## 最小可讀尺寸（行動裝置安全）

一張 1080×1350 的 PNG 通常在手機上以 360-420 邏輯畫素的寬度檢視。低於下列尺寸就會變得無法閱讀：

| 角色                | 最小值 | 備註                                    |
| ------------------- | ------- | ---------------------------------------- |
| 內文／段落          | 28px    | Editorial、Swiss 都一樣                  |
| Lead                | 30px    | 「1.5 倍內文」的護欄                     |
| 圖說／kicker        | 20px    | 不要低於 18px                           |
| 標籤／meta strip    | 20px    | 僅等寬                                   |
| 格點內的格標題      | 24px    | Matrix／brief 卡片                       |
| 數字註解            | 22px    | Stat-card 的 .lbl、ledger 的 .sub        |

如果塞不下文案，就砍文案。不要縮字。

## 卡片填色 —— 僅 Swiss，互斥

有四個卡片 class；**絕不在同一節點上組合它們：**

- `.card-ink` —— 實心黑墨、紙色文字。用於單一 statement 卡片。
- `.card-accent` —— 重點色填滿、accent-on 文字。節制使用；每張海報最多一張 accent 卡片。
- `.card-fill` —— grey-1 填滿、ink 文字。matrix／brief／takeaway 格點的主力。
- `.card-outlined` —— 透明 + 1px grey-2 邊框、ink 文字。當你需要一張沒有重量的卡片時用。

多卡格點必須讓每一格都用**同一個**卡片 class，唯一例外是當某一項要突出時，允許單一 accent 高亮。在同一格點裡把 `card-fill` 跟 `card-outlined` 混用，看起來就像草率的套模板。

Editorial 模板刻意不提供卡片 class。Editorial 版面靠字型、分隔線、ledger 列與欄位結構表達層次，而不是靠卡片背景。如果你發現自己想在 Editorial 海報上放卡片，那你八成挑錯了風格模式。

## 圖片容器

兩個模板共用同一套 `.frame-img` 系統。永遠挑一個標準比例 class。絕不寫 `aspect-ratio: 2592/1798` 這種臨時比例。

| Class       | 比例  | 用途                                                |
| ----------- | ------ | -------------------------------------------------- |
| `.r-3x4`    | 3 : 4  | 直式封面與田野筆記照片的預設。 |
| `.r-1x1`    | 1 : 1  | 方形人像、產品物件、平衡格點。 |
| `.r-4x3`    | 4 : 3  | 經典編輯照片、滿版頂部區。      |
| `.r-3x2`    | 3 : 2  | 雜誌內文插圖。                            |
| `.r-16x9`   | 16 : 9 | 橫式照片、資訊圖。                        |
| `.r-16x10`  | 16 : 10| 左文 + 右圖分割的預設。        |
| `.r-21x9`   | 21 : 9 | 橫式 21:9 主視覺圖，S08 Image Hero 頂部區。   |

預設 `object-fit: cover` 會維持 `object-position: center 50%`（兩個模板皆是）。UI 截圖、密集文字、程式碼與資訊圖請用 `.fit-contain`。不要裁掉臉或產品的關鍵特徵。

**依主體裁切——永遠對每張照片 inline 設定 `object-position`。** 模板預設值是後備，不是建議。在每個 `<img>` 之前，看一眼原圖並問：主體在哪？然後直接在 `<img>` 上設 `style="object-position:center N%"`：

| 原圖中主體的位置            | Inline 值             |
| ------------------------------------- | ------------------------ |
| 主體偏上（天空佔很多的風景、臉在上方） | `center 25-35%`  |
| 主體置中（預設）            | `center 50%`（省略，這是預設） |
| 主體在中段（登山者、手、畫面中央） | `center 55-65%` |
| 主體偏下（前景裝備、ledger、畫面底部） | `center 70-80%` |

在高比例（`r-3x4`、`r-21x9`）上，預設的 `center 50%` 會悄悄把主體裁出畫面。交付的組合裡每張照片都需要一個刻意的 `object-position`——即使結論是「這裡 50% 就好」。在算圖檢查那一輪抓出這點：如果主體有超過 1/3 在可見裁切之外，交付前先修好。

**圖說 class 名稱（別搞錯）：**
- Editorial 模板：`.img-cap` —— 18px 等寬，套在 `.frame-img` 下方的 `<figcaption>`。寫成 `.cap` 會退回瀏覽器預設的 16px，並觸發 R4。
- Swiss 模板：`.swiss-img-caption` —— 同樣角色，18px 等寬。

沒有共用的 `.cap` class。如果你在草稿裡看到 `.cap`，算圖前先修掉。

## 截圖容器（.frame-shot）

UI 截圖／網頁截圖／程式碼截圖，用 `.frame-shot`（兩個種子都帶）。它預設 `object-fit: contain`，讓原始畫素保持純淨——跟 `.frame-img` 相反。完整引數矩陣見 `references/screenshot-treatment.md`。

風格鎖定預設值快速摘要（別去質疑這些）：

| 風格     | 圓角      | 陰影       | 預設 bg   | 預設 inset |
| --------- | ------------ | ------------ | ------------ | ------------- |
| Swiss     | `corners-sq` | `shadow-none`| `bg-grey-1`  | `inset-sub`   |
| Editorial | `corners-sm` | `shadow-soft`| `bg-paper-2` | `inset-sub`   |

兩個裝置外框（`.device-browser`、`.device-phone`）在兩個模板裡都有，提供純 CSS 的瀏覽器 chrome／手機邊框——沒有 SVG、沒有圖片依賴。每個外框包一個 `.frame-shot`。

## Map Block（.map-block）

對於帶空間關係的內容（路線、街區、店面位置），兩個種子都帶 `.map-block` + `.map-pin` + `.map-legend`。依位置需要多實在來挑地圖來源——完整劇本見 `references/map-component.md`：

- **Mode T**（旅行／路線／指路的預設）—— 用 Mapbox Static Images API 的 URL 當 `<img>` 來源；需要 `MAPBOX_ACCESS_TOKEN`。套 `tone-paper`（Editorial）或 `tone-paper` saturation-0（Swiss）。
- **Mode O** —— OSM 靜態圖磚合成，當沒有 Mapbox token、而地圖仍需地理上真實時的後備。
- **Mode S** —— 在 `viewBox="0 0 100 100"` 裡畫的示意 SVG，只用於概念或抽象關係圖。

硬限制：每個版面 ≤6 個 pin、≤1 個 accent pin、不要 SVG 文字標籤（名稱放在 `.map-pin .card` 裡）。

## Spacing Tokens（僅 Swiss）

Swiss 模板提供 Carbon 風格的 2x 級距。守住這些 token——任意的 `px` 邊距會在多張海報間很快漂移。

| Token   | 數值  | 常見用途                                          |
| ------- | ------ | ---------------------------------------------------- |
| `--sp-3`|  8px   | 緊湊的 chip 間距、inline meta 間距。                 |
| `--sp-4`| 12px   | 卡片內間距、密集列。                                 |
| `--sp-5`| 16px   | 內文區塊底部邊距、lead 到段落。                      |
| `--sp-6`| 24px   | 卡片內距（緊湊）、格點間距（緊）。                   |
| `--sp-7`| 32px   | 預設格點間距。                                       |
| `--sp-8`| 40px   | 卡片內距（預設）、段落間距（緊湊）。                 |
| `--sp-9`| 48px   | 段落間距（預設）、pair-preview 外距。               |
| `--sp-10`| 64px  | 直式版面上內容區塊之間的大分隔。                     |
| `--sp-11`| 80px  | 海報外距（square／story）。                          |
| `--sp-12`| 96px  | 海報外距（直式）。                                   |
| `--sp-13`| 160px | 僅寬版海報的水平內距。                               |

Editorial 模板目前用裸 `px`，因為雜誌版面常需要為氛圍量身訂做間距。如果你發現某個模式反覆出現，就在這裡加一個 editorial token。

## Icons

預設 icon 函式庫是 **Lucide**（只有 Swiss 模板載入）。Editorial 版面很少需要 icon；需要時用同一套 Lucide，但每張海報限一到兩個。

規則：

- 任何地方都不要用 emoji。emoji 會毀掉這兩種風格。
- 用有稜角的 Lucide icon（`arrow-right`、`check`、`triangle-alert`、`dot`、`plus`、`equal`、`slash`）。避免枕頭般圓潤的 icon（`smile`、`heart-filled`）——它們會跟 Swiss 的幾何感打架。
- Icon 線寬：1.5（Lucide 預設）。不要加粗。
- 尺寸：ledger 列指示 56px、與內文並排 32px、chip 內 24px。絕不低於 20px。
- 顏色：高亮用 `var(--accent)`、中性用 `var(--grey-3)`、主要用 `var(--ink)`。絕不用漸層。

加一個 icon：

```html
<i data-lucide="arrow-right" width="32" height="32"></i>
```

Swiss 模板會在載入時執行 `lucide.createIcons()`。如果你在載入後才注入 icon，要再手動呼叫一次。

## Issue 標籤與角落 Metadata

社群卡片沒有 PPT 的 chrome/foot 雙列 metadata。它們改用單一、安靜的元素。

Editorial issue 元素：

- `.issue-row` —— 頂部：「Vol. 01 · 2026.05」，段落之間有一個小的 accent 點。
- `.issue-strip` —— 底部帶狀區：3-5 個短標籤，以 em-dash 分隔，上方一條髮絲線。

Swiss issue 元素：

- `.chrome-min` —— 頂部單列，左邊類別、右邊日期／issue，底部一條髮絲線。
- `.t-meta` —— 海報上任意處的 inline 等寬大寫 metadata。

每張海報一個 issue 元素。絕不在同一張海報上同時放頂部 issue strip 與底部 issue strip——那看起來像裝飾。

## Layout Primitives

兩個模板共用同一套 primitive（預設間距不同）。

| Class            | Editorial gap   | Swiss gap       | 用途                                  |
| ---------------- | --------------- | --------------- | ------------------------------------ |
| `.stack`         | flex column     | flex column     | 預設的垂直流。               |
| `.row`           | flex row        | flex row        | 水平流。                     |
| `.gap-1`...`-5`  | 12-64px         | 8-16px          | Editorial 間距（px）對比 Swiss（token）。|
| `.gap-6`...`-10` | n/a             | 24-64px         | 僅 Swiss —— Carbon 級距。           |
| `.col-2-7-5`     | 7:5 分割       | n/a             | 僅 Editorial —— 引言 + 圖片。      |
| `.col-2-8-4`     | 8:4 分割       | n/a             | 僅 Editorial —— 文字密集 + 圖片。 |
| `.grid-12`       | n/a             | 12 欄網格     | 僅 Swiss。                          |
| `.span-N`        | n/a             | 網格欄跨距| 僅 Swiss。                          |
| `.grid-3`        | 3 欄       | 3 欄       | 兩者皆可。                                |

## 硬規則（共通）

這些規則守護視覺身分。違反它們幾乎一定是錯的。

1. 每個組合剛好挑一個風格模式。絕不混用 Editorial 與 Swiss。
2. 每個組合剛好挑一個主題／重點色。絕不組合兩個色板。
3. 絕不用 emoji。用 Lucide 或剋制的字型。
4. 交付的輸出裡不要假資料、不要假百分比、不要 `Lorem` 文字。
5. Swiss 裡不要 `border-radius`、`box-shadow` 或 `linear-gradient`。
6. Editorial 裡不要平面單色背景——hero／引言／稀疏頁面需要紙張顆粒 + 選用的 WebGL 氛圍。
7. 每個 `.poster` 都必須有穩定的匯出尺寸。海報內容絕不用 `vw` / `vh`。
8. 每張圖片都必須包在 `.frame-img` 裡，並搭配一個標準比例 class。
9. 多卡格點用同一個卡片 class。最多一張 accent 卡片。
10. 遵守字級與最小尺寸。縮字之前先砍文案。
