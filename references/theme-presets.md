# 主題預設

一個圖片組合只用一個主題。除非使用者明確要求刻意設計的多章節系統，否則不要在不同頁面之間混用色板。

## Editorial Magazine x E-ink 色板

這些色板改編自 Guizang PPT 的電子雜誌模式，用於製作 Instagram、Facebook 等平臺的靜態貼文圖片。

### Ink Classic

適用於商業評論、AI 專文、產品思考，以及中性的編輯風貼文。

```css
:root {
  --paper: #f3f0e8;
  --paper-2: #ebe6da;
  --ink: #0a0a0b;
  --muted: #68625a;
  --line: rgba(10,10,11,.22);
  --accent: #111111;
  --accent-soft: #d8d2c6;
}
```

### Indigo Porcelain

適用於科技、研究、資料、AI 基礎設施，以及沉穩的分析型寫作。

```css
:root {
  --paper: #f2f4f5;
  --paper-2: #e5ebef;
  --ink: #0a1f3d;
  --muted: #5f6d78;
  --line: rgba(10,31,61,.20);
  --accent: #315d93;
  --accent-soft: #d7e1ec;
}
```

### Forest Ink

適用於健行、戶外、自然、永續、個人田野筆記，以及踏實的生活風格貼文。

```css
:root {
  --paper: #f5f1e8;
  --paper-2: #e8dfcf;
  --ink: #16251b;
  --muted: #5d665d;
  --line: rgba(22,37,27,.22);
  --accent: #2e6b4f;
  --accent-soft: #d4dfd2;
}
```

### Kraft Paper

適用於回憶、手作、個人隨筆、老物件、創作者筆記，以及溫暖的低科技主題。

```css
:root {
  --paper: #eedfc7;
  --paper-2: #dfc9a8;
  --ink: #2a1e13;
  --muted: #755f49;
  --line: rgba(42,30,19,.24);
  --accent: #9b5a2e;
  --accent-soft: #d5b58f;
}
```

### Dune

適用於設計、物件研究、作品集式封面、藝廊調性，以及內斂的美學貼文。

```css
:root {
  --paper: #f0e6d2;
  --paper-2: #ded0b7;
  --ink: #1f1a14;
  --muted: #6f6557;
  --line: rgba(31,26,20,.22);
  --accent: #8f7650;
  --accent-soft: #d4c2a4;
}
```

### Midnight Ink

**唯一**官方認可的深色 Editorial 色板。適用於遊戲主視覺、夜景攝影、電影感封面、深色調文化題材——這類素材本身就是暗的，用紙質背景反而會削弱它。不要自行發明其他深色色板；如果 Midnight Ink 不合用，就改選別的模式（Editorial 深色不是萬用開關）。

```css
:root {
  --paper: #0e0d0c;
  --paper-2: #1a1714;
  --ink: #ece2cf;
  --muted: #9a8c75;
  --line: rgba(236,226,207,.22);
  --accent: #d4a04a;
  --accent-soft: #3a2a14;
}
```

Midnight Ink **必須**同時覆寫兩個背景層——淺色紙張的數學運算無法直接套用：

```css
[data-theme="midnight-ink"] .grain {
  opacity: .26;
  mix-blend-mode: screen;
  background-image: radial-gradient(rgba(255,244,214,.10) 1px, transparent 1px);
}
[data-theme="midnight-ink"] .paper-wash {
  background:
    radial-gradient(80% 50% at 28% 16%, rgba(212,160,74,.12), transparent 64%),
    radial-gradient(70% 60% at 80% 86%, rgba(60,40,20,.20), transparent 72%),
    linear-gradient(180deg, rgba(236,226,207,.02), rgba(0,0,0,.32));
}
[data-theme="midnight-ink"] .frame-img {
  background: #18120f;
  box-shadow: 0 0 0 1px rgba(236,226,207,.10);
}
```

種子模板 `template-editorial-card.html` 已內建這些覆寫——只要切換 `data-theme` 就會自動套用。

雜誌色板規則：

- 用 `--paper` 當主背景，`--ink` 當主要文字。
- `--accent` 要節制使用：段落標記、頁碼、pull quote 的分隔線，或某個被強調的詞句。
- `--paper-2` 可以襯託圖片井、issue strip 或 checklist 帶狀區塊。
- 淺色色板（前五個）：不要變成米色配米色。要維持真正的對比。
- Midnight Ink：不要在頁面上堆疊不透明的卡片或色塊。深色 Editorial 靠的是圖片出血 + 溫暖鎏金重點色來建立層次，而不是背景色塊。

## Swiss International 色板

這些色板改編自 Guizang PPT 的 Swiss 模式。

### IKB Blue

AI、科技、產品更新、設計與工程主題的預設色板。

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #002FA7;
  --accent-on: #ffffff;
}
```

### Lemon Yellow

適用於年輕、消費、活力、零售、運動或俏皮的資訊。

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FFD500;
  --accent-on: #0a0a0a;
}
```

### Lemon Green

適用於生態、未來、新興科技、健康，以及螢光筆般的當代主題。

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #C5E803;
  --accent-on: #0a0a0a;
}
```

### Safety Orange

適用於工業、警示、急迫、風險、決策點，以及需要強力糾正的場合。

```css
:root {
  --paper: #fafaf8;
  --ink: #0a0a0a;
  --grey-1: #f0f0ee;
  --grey-2: #d4d4d2;
  --grey-3: #737373;
  --accent: #FF6B35;
  --accent-on: #ffffff;
}
```

Swiss 色板規則：

- 只用一個 `--accent`。
- 不要用漸層、陰影、玻璃質感或混合的重點色。
- 如果重點色是黃色或綠色，重點色上的文字必須使用 `--accent-on: #0a0a0a`。
- 優先使用純色塊、髮絲線與網格節奏。
