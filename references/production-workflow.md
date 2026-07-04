# 生產流程

## 建議的資料夾結構

預設在 `local-tests/` 下建立任務資料夾：

```text
local-tests/<slug>/
  index.html
  render.cjs
  assets/
  output/
```

使用具描述性的 slug：

- `local-tests/social-card-doubao-input`
- `local-tests/social-card-hiking-outfit`
- `local-tests/ig-story-ai-card-skill-cover`

若使用者明確指定了另一個輸出資料夾，就改用那個資料夾。不要在 `SKILL.md` 旁的 skill 根目錄建立生成的任務資料夾或算圖素材。根目錄層級的資料夾（如 `social-card-*`、`livephoto-*`、`ig-story-*`）、`output/`，以及散落的 `.png` / `.jpg` / `.mov` / `.pvt` 產物，都不允許用於新工作。

## HTML/CSS 算圖模式

建立一個包含所有畫格的 HTML 檔案：

```html
<main class="sheet">
  <section class="poster post" id="post-01">...</section>
  <section class="poster post" id="post-02">...</section>
  <section class="poster story" id="story-01">...</section>
  <section class="poster square" id="square-01">...</section>
  <section class="pair-preview" id="pair-preview">
    <div class="preview-post">...</div>
    <div class="preview-story">...</div>
  </section>
</main>
```

每個畫格都必須有穩定的尺寸：

```css
.post {
  width: 1080px;
  height: 1350px;
}

.story {
  width: 1080px;
  height: 1920px;
}

.square {
  width: 1080px;
  height: 1080px;
}

.pair-preview {
  width: 2400px;
  min-height: 1180px;
}
```

使用 `box-sizing:border-box`、固定的安全邊距，以及 `overflow:hidden`。

製作 IG 限時動態（9:16）與方形（1:1）封面時：

- 把 `story-01` 與 `square-01` 編排成獨立的來源畫格。
- 同時在同一個 HTML 裡放入 `pair-preview`，讓這組可以一起檢視。
- 把兩個真正的交付檔分別匯出。
- 只有在有助於審查時才匯出配對預覽。
- `1:1` 封面應使用從長標題衍生的簡化標題，而非從 `9:16` 畫格裁切或擠壓文字。

電子雜誌頁面請把背景 canvas 放進每個 `.poster` 內，而不是隻依賴 CSS 顏色：

```html
<section class="poster magazine hero" id="post-01">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content">...</div>
</section>
```

此 skill 在 `assets/magazine-bg-webgl.js` 提供一個可重複使用的 helper。當 WebGL 背景有用時，把它複製或內嵌到生成的專案中。

## 算圖

使用 Playwright 或等效的瀏覽器截圖流程：

1. 開啟 `index.html`。
2. 等待字型與圖片載入。
3. 依 id 為每個畫格節點截圖。
4. 儲存到 `output/`。
5. 驗證尺寸。

若使用 WebGL 或程式式 canvas 背景：

- 截圖前至少等待 500-900ms，讓 canvas 完成算圖。
- 當需要可重現性時，使用確定性的 seed 或固定時間。
- 在一般內容頁上，讓背景透明度保持細微。
- 在封面、分隔頁、引言頁與內容稀疏的頁面上，讓氛圍展現得更強烈。

範例算圖邏輯：

```js
const targets = [
  ["#post-01", "ig-post-01-cover.png"],
  ["#post-02", "ig-post-02-point.png"],
  ["#story-01", "ig-story-01.png"],
  ["#square-01", "ig-square-cover.png"],
  ["#pair-preview", "ig-post-story-pair-preview.png"],
];
```

若素材或字型載入需要本機開發伺服器，就啟動它並把 URL 告訴使用者。若 `file://` 算圖可行，則不需要伺服器。

## 驗證指令

在 macOS 上好用的檢查：

```bash
sips -g pixelWidth -g pixelHeight output/*.png
```

在 Codex 中做視覺檢視：

- 使用圖片檢視工具檢視本機 PNG。
- 以絕對路徑內嵌顯示最終 PNG。

## 螢幕截圖處理

使用者提供的螢幕截圖偏好用程式化裁框：

- 建立乾淨的目標比例外框。
- 加上純白、精緻灰或紙張背景。除非使用者明確要求技術藍圖風格，否則不要加滿版的格線／點狀背景。
- 若截圖包含浮在無關 UI 之上的視窗／卡片，先裁切到前景主體再放置。
- 把螢幕截圖以安全內距放入。
- 保留可讀的文字。
- 除非使用者要求重新設計，否則不要重繪螢幕截圖。
- 除非使用者明確要求場景樣機，否則不要加透視、傾斜、旋轉或樣機傾角。

Swiss 風格：

- 直角。
- 預設無陰影。
- 只有在螢幕截圖邊緣消失時才用細線框。

Editorial 雜誌風格：

- 允許小圓角或細微陰影，但避免 SaaS 行銷卡片的樣式。

## 生成圖片

生成缺少的視覺素材時：

- 只生成原始視覺素材。
- 生成的圖片中不要有文字。
- 配合頁面角色與風格模式。
- 把生成的素材存進 `assets/` 並放入 HTML。
- 只生成需要的頁面，通常一組 1-2 張圖片。

## 無障礙與可讀性

- 所有文字使用強烈對比。
- 不要把長文字放在繁忙的照片上。
- 若文字必須壓在照片上，使用實心的墨／紙色塊或高對比色帶，而非模糊色團。
- 中文內文避免負的字距。
- 使用能讓中文呼吸的行高：大標題約 1.08-1.22，內文約 1.35-1.55。

## 常見修法

- 封面感覺空：放大標題、放大圖片，或加一條功能性底帶。
- 螢幕截圖太小：減少側邊文字，給螢幕截圖 55%-70% 的畫布。
- 下方區域空：讀 `portrait-fill.md`；合併頁面、加一個滿高帳目、用更大的佐證圖、加一個側邊引言欄，或改用氛圍式的論述頁。
- 風格感覺平庸：加上刊期資訊、更好的字級層級、更強的佐證圖、更豐富的 WebGL／墨韻氛圍，或更刻意的內容分隔。
- 文字溢位：先縮短文案再縮小字級。
