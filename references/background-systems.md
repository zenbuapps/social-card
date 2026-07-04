# 背景系統

原始的 Guizang PPT 電子雜誌模式使用 WebGL 流體、等高線、水墨與色彩氛圍。當風格模式為 Editorial Magazine x E-ink 時，靜態 Instagram 圖片應保留這種感覺。

不要把這個模式簡化成一張淺米色配上一層淡淡網格的平面。不要在背景加上明顯的網格、點陣或方格紙圖樣。

## 分層模型

使用 3-5 層：

1. 來自 `theme-presets.md` 的紙張底色。
2. 程式化的紙張顆粒（grain）。
3. 水墨暈染、等高線場，或 WebGL 流體 canvas。
4. 選用的髮絲線結構，只當內容分隔線用，不要當作整頁的背景網格。
5. 內容層。

建議的 CSS 層序：

```html
<section class="poster magazine hero">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="ink-vignette"></div>
  <div class="content">...</div>
</section>
```

```css
.poster { position: relative; overflow: hidden; background: var(--paper); }
.mag-bg { position:absolute; inset:0; width:100%; height:100%; z-index:0; opacity:.34; }
.poster.hero .mag-bg { opacity:.62; }
.grain {
  position:absolute; inset:0; z-index:1; pointer-events:none;
  opacity:.12; mix-blend-mode:multiply;
  background:
    linear-gradient(112deg, rgba(0,0,0,.035), transparent 26%, rgba(255,255,255,.16) 52%, transparent 82%),
    radial-gradient(circle at 18% 22%, rgba(var(--ink-rgb),.05), transparent 38%),
    radial-gradient(circle at 78% 84%, rgba(var(--accent-rgb),.045), transparent 42%);
}
.ink-vignette {
  position:absolute; inset:0; z-index:2; pointer-events:none;
  background:
    radial-gradient(circle at 18% 12%, rgba(var(--ink-rgb),.10), transparent 34%),
    radial-gradient(circle at 82% 80%, rgba(var(--accent-rgb),.10), transparent 38%);
}
.content { position:relative; z-index:3; }
```

## 何時該顯示 WebGL

在以下場合使用較強、較明顯的氛圍：

- 封面。
- 章節／分隔頁。
- Pull quote。
- 稀疏的論點頁。
- 結尾頁。

在以下場合使用細微的氛圍：

- 截圖頁。
- 密集的 ledger。
- Checklist。
- 產品佐證頁。

如果截圖是主要佐證，背景應該襯託它，而不是跟它爭搶注意力。

## WebGL 輔助工具

本 skill 內含 `assets/magazine-bg-webgl.js`，一個用來產生確定性 ink-flow 背景的小工具：

```html
<canvas class="mag-bg" data-seed="workbuddy"></canvas>
<script src="assets/magazine-bg-webgl.js"></script>
<script>
  document.querySelectorAll(".mag-bg").forEach((canvas, i) => {
    MagazineBg.mount(canvas, {
      ink: [26, 46, 31],
      paper: [245, 241, 232],
      accent: [46, 107, 79],
      strength: canvas.closest(".hero") ? 0.62 : 0.28,
      frozenTime: 2.4 + i * 0.37
    });
  });
</script>
```

匯出截圖時，建議用 `frozenTime`，這樣重複算圖的結果才會穩定一致。

## 2D 後備方案

如果 WebGL 失效，改用 2D canvas 畫出：

- 大面積的放射狀水墨暈染。
- 數道半透明的等高線弧線。
- 柔和的紙張雜訊或不均勻的水墨暈染。
- 極低透明度的主題色。

輸出結果仍應該像一張編輯風背景，而不是單調的純色填滿。

## 不要這樣做

- 不要用鮮豔的漸層。
- 不要用整頁的網格、點陣、方格紙或製圖紙背景。
- 不要用與版面毫無關聯的裝飾性色塊或圓圈。
- 不要在內文後方放強烈的背景痕跡。
- 不要讓 WebGL 蓋住截圖或小字說明。
- 除非任務是影片，否則不要為最終的圖片序列加上動畫。
