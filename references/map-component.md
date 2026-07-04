# 地圖元件（.map-block）

當內容具有**空間關係**時使用：旅遊路線、店家位置、徒步導覽、街區概覽、依行政區做店家對店家的比較、搬遷前後對照。單一座標（「我在臺北」）不需要地圖。

兩個 seed 都內建 `.map-block` + `.map-pin` + `.map-legend` class。同一套標記在兩者皆可運作；只有被風格鎖定的色調不同。

## 三種算圖模式

在撰寫標記**之前**先選好模式。它們無法疊加使用。

預設選擇：

- 旅遊指南、徒步路線、健行、店家位置，或任何讀者可能用來辨位的內容 → **Mode T** Mapbox Static。
- 同樣需求，但沒有 Mapbox token → **Mode O** OSM 靜態圖磚合成。
- 概念關係圖、虛構路線，或純編輯風格「地點像這樣彼此串連」的圖示 → **Mode S** 示意 SVG。

### Mode T · Mapbox Static Image（真實路線的預設）

真實的點陣圖磚，去飽和並上色以搭配整組版面。當內容是旅遊／健行／街區導路，且你需要顯示實際地形或街道時使用。建置環境需要 `MAPBOX_ACCESS_TOKEN`。

```
https://api.mapbox.com/styles/v1/mapbox/light-v11/static/
  pin-s-1+555555(116.404,39.915),
  pin-l-2+1936b3(116.421,39.918)
  /116.412,39.916,14,0/1200x675@2x
  ?access_token=YOUR_TOKEN
```

```html
<div class="map-block r-16x10 tone-paper">
  <img src="https://api.mapbox.com/styles/v1/mapbox/light-v11/static/.../1200x675@2x?access_token=..." alt="拉薩徒步路線">

  <!-- 釘點疊層（依 mapbox bounds 計算 %） -->
  <div class="map-pin" style="left:34%; top:52%;">...</div>
  <div class="map-pin accent" style="left:64%; top:42%;">...</div>

  <div class="map-legend">LHASA · MAPBOX LIGHT</div>
</div>
```

Editorial 使用 `tone-paper`（multiply 混合、飽和度 36%）。Swiss 使用飽和度 0 的 `tone-paper`（純灰階）。不要顯示原始的 Mapbox 高飽和色調樣式——它會跟整組版面打架。

URL 的**樣式白名單**——保持單色：
- `mapbox/light-v11`
- `mapbox/dark-v11`
- `mapbox/streets-v12`（僅搭配 `tone-paper`，絕不用原始樣式）

絕不要用 `outdoors-v12` 或 `satellite-v9`——太花俏，會跟兩種風格都衝突。

### Mode O · OpenStreetMap 圖磚合成（真實路線的備援）

免費、免 token。當需要真實地圖但 Mapbox 無法使用時採用。透過 `staticmaps` npm 套件或類似工具在伺服器端算圖，再把點陣圖放進 `.map-block > img` 子元素。品質比 Mapbox 低，所以標籤要少放，讓 HTML 釘點承載有用的文字。

### Mode S · 示意 SVG（僅供概念／示意）

手繪風格的向量地圖，畫進 `viewBox="0 0 100 100"` 的 SVG。最適合編輯風格的版面，讓地圖感覺像插畫指南，而非衛星影像。不需外部服務。

```html
<div class="map-block r-16x10">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
    <!-- 海岸線／行政區界 -->
    <path class="map-coast" d="M 6 18 Q 32 22 58 16 T 96 28"/>
    <!-- 主要道路 -->
    <path class="map-road" d="M 8 78 Q 42 62 78 70 T 96 56"/>
    <!-- 次要道路 -->
    <path class="map-road" d="M 24 14 L 38 62 L 52 86"/>
    <!-- 水域／公園多邊形 -->
    <path class="map-water" d="M 62 8 L 92 12 L 96 36 L 70 30 Z"/>
  </svg>

  <!-- 釘點疊層：相對於 .map-block 的 % 座標 -->
  <div class="map-pin" style="left:32%; top:48%;">
    <div class="dot"></div><div class="line"></div>
    <div class="card"><div class="name">大昭寺</div><span class="meta">DAY 1</span></div>
  </div>
  <div class="map-pin accent" style="left:62%; top:38%;">
    <div class="dot"></div><div class="line"></div>
    <div class="card"><div class="name">布達拉宮</div><span class="meta">DAY 2 · 18:40 SUNSET</span></div>
  </div>

  <div class="map-legend">LHASA · 拉薩城關 · 1:8K</div>
</div>
```

SVG 路徑是風格化的，並非 GPS 精準。**不要**試圖手工描摹 OpenStreetMap——這張地圖是圖形裝置，不是導路工具。只要勾勒出框住釘點的主要軸線即可。

SVG 內的圖層順序（由後到前）：
1. `.map-water` 多邊形（河流、湖泊、公園）
2. `.map-coast`（邊界）
3. `.map-grid`（選用的參考格線）
4. `.map-road`（交通線）

釘點位於 SVG *外部*，作為 HTML 同層元素——它們可免費獲得 `.frame-shot` 處理。

## 硬性規則

- **不要在 SVG 或點陣圖磚上放釘點標籤。** 名稱一律放在 `.map-pin .card`，絕不放進 SVG `<text>` 或烤進地圖影像。這能讓字型算圖一致，並避免縮放問題。
- **每個版面最多 6 個釘點**。超過的話卡片會互相碰撞。用關係卡／索引卡來列出次要地點。
- **最多一個 accent 釘點**。多個 accent 會破壞視覺層級。
- **釘點不可蓋到卡片**。先在瀏覽器測試——若兩張卡片在長軸上相距 80 px 以內，就交錯使用 `.left` 擺放。
- **不要用即時 JavaScript 地圖**。社群卡片是靜態 PNG，MapLibre 是多餘的負擔。PPT skill 有互動版本——不要移植到這裡。

## 釘點擺放攻略

`.map-pin` 元素用 `left:X%; top:Y%;` 以其中心定位。卡片預設向右延伸；加上 `.left` 可翻轉方向：

```html
<div class="map-pin left" style="left:78%; top:30%;">
  <div class="dot"></div><div class="line"></div>
  <div class="card"><div class="name">車公莊</div><span class="meta">START</span></div>
</div>
```

經驗法則：
- 釘點落在畫布左側 60% → 卡片向右開（預設）。
- 釘點落在畫布右側 60% → 卡片向左開（`.left`）。
- 兩個釘點彼此靠近 → 交錯左右，讓卡片不會疊在一起。

## Recipe 路由

地圖區塊套進既有的 recipe；它沒有自己專屬的。

| Recipe          | 地圖如何融入                                                    |
| --------------- | --------------------------------------------------------------- |
| M01 split       | 上半 = `.map-block r-16x9`；下半 = 說明文字。                    |
| M11 marginalia  | 主欄 = `.map-block r-3x4`；側欄列出關係卡。                      |
| M14 pipeline    | 其中一個步驟放一張小地圖（r-16x10）顯示該步驟的位置。            |
| S02 two signals | 一個 signal 格放地圖；另一個放資料表。                          |
| S08 image hero  | 把主視覺照片換成 `.map-block r-16x10`。                          |

不要發明「純地圖」頁面——地圖一定要搭配說明**為什麼**這個空間關係重要的文字。

## 色調 token

| Token         | Editorial 行為                                   | Swiss 行為                                    |
| ------------- | ------------------------------------------------ | --------------------------------------------- |
| （無）        | 原始——僅用於 SVG 示意圖。                        | 原始——僅用於 SVG 示意圖。                     |
| `tone-paper`  | 在暖色紙上 multiply 混合。旅遊的預設。            | 硬灰階。所有情況的預設。                       |
| `tone-ink`    | 亮度 62%、飽和度 18%。深色版面頁。                | 亮度 58%、飽和度 0%。深色海報。                |

色調隻影響 `> img` 子元素，不影響 SVG 示意圖。

## 常見錯誤

- **貼 Google Maps 螢幕截圖**——色調不對、有 UI 介面框，會顯得格格不入。改用 Mapbox Static、OSM 靜態圖磚，或在地圖為概念性時用示意圖。
- **把真實地圖描摹成 SVG**——示意圖應該*抽象化*，而非複製。如果觀看者光看你的 SVG 就能猜出城市，那你就描得太細了。
- **釘點卡片太小**——`.card .name` 最小 15-16 px。名稱太長就刪減，絕不縮小。
- **每個釘點都加 accent**——會破壞強調系統。挑一個最重要的點就好。
