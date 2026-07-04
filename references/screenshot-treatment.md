# 截圖處理

當使用者提供 App／網頁／程式碼／儀表板截圖時，**不要**把它原封不動塞進 `.frame-img`。比例不合會裁掉 UI，銳利的邊緣看起來很 SaaS。改用 `.frame-shot` —— 這是加在兩個 seed 模板裡的姊妹 class。

## 什麼時候用它

- App／網頁 UI 截圖 —— 任何有狀態列、分頁列、工具列或視窗外框的畫面。
- 程式碼／終端機截圖。
- 需要保留每個標籤可讀的儀表板／圖表截圖。
- 文字密度比構圖更重要的 IDE 截圖。

**照片型**內容（人物、風景、產品）—— 繼續用 `.frame-img`。以下的處理方式都假設來源是畫素精準的 UI，contain-fit 沒得商量。

## 主體前置處理

在裝框之前，先決定截圖真正的主體是什麼。如果來源截圖裡有浮在不相關頁面上的 modal／卡片、桌面外框、被裁掉一半的側邊文字、遊標殘影、通知碎片，或殘留的背景 UI，先裁到前景的視窗／卡片，再把清乾淨的主體放進舞臺。當主體後面帶著意外的文字或部分 UI 時，不要去美化整張原始截圖。

截圖美化不得引入透視、傾斜、旋轉或 3D 傾角，除非使用者明確要求做成情境模型（mockup）。CleanShot 風格的處理是正投影的：主體擺正、等比縮放、安靜的背景、清楚的安全內距。

## 結構

```
.frame-shot.r-{ratio}.corners-{sq|sm|md}.shadow-{none|soft|ed}.bg-{paper|grid|dot|grey-1|ink}.inset-{none|sub|bal}
  └─ <img src="…">         （預設 object-fit: contain）
```

選用的外層包裹：

```
.device-browser
  └─ .frame-shot.r-16x10.bg-paper
       └─ <img>

.device-phone
  └─ .frame-shot.r-3x4.bg-paper
       └─ <img>
```

## 引數

在寫 markup 之前先選好六個值。把它當成 M16 封面的決策樹 —— 選一次，做到一半不要反覆改。

### 1. `r-*` 比例（必填，對應版位）

| Class      | 用途                                                       |
| ---------- | --------------------------------------------------------- |
| `r-16x10`  | App／網頁截圖的預設，看起來像真的視窗     |
| `r-16x9`   | 橫式影片／儀表板／寬圖表                  |
| `r-4x3`    | 經典桌面視窗、舊版 App                    |
| `r-3x2`    | 單眼相機風 —— 只有來源是照片型 UI mockup 時才用 |
| `r-1x1`    | App 圖示／方形小工具                       |
| `r-3x4`    | 手機直式截圖（搭配 `.device-phone`）          |
| `r-21x9`   | 多螢幕／超寬螢幕／寬版橫幅主視覺             |

### 2. `corners-*`（風格鎖定的預設）

- **Swiss** 預設：`corners-sq`。只有當版位周圍有陰影或外框時才用 `corners-sm`。
- **Editorial** 預設：`corners-sm`（6 px）。想在紙面上做出「剪貼」感時，升到 `corners-md`（14 px）。

絕不超過 14 px —— 再大就看起來像 iOS 行銷素材。

### 3. `shadow-*`（風格鎖定的預設）

- Swiss → 90% 用 `shadow-none`。只有浮在 `bg-grid`／`bg-dot` 上的截圖才用 `shadow-soft`。`shadow-ed` 會在陰影裡加一條 `1px` 外框 —— 保留給主視覺截圖。
- Editorial → `bg-paper-2` 上用 `shadow-soft` 是溫暖的預設。主視覺截圖用 `shadow-ed`。

### 4. `bg-*`（截圖的「舞臺」）

| Token        | Swiss 角色          | Editorial 角色         |
| ------------ | ------------------- | ---------------------- |
| `bg-paper`   | 預設樸素舞臺 | 同上                   |
| `bg-paper-2` | n/a                 | 預設溫暖舞臺     |
| `bg-grey-1`  | 預設樸素舞臺 | n/a                    |
| `bg-grid`    | 工程／資料 | 田野筆記式工程 |
| `bg-dot`     | 微妙的結構     | 微妙的結構         |
| `bg-ink`     | 深色模式 UI 截圖  | 深色模式 UI 截圖      |

背景**絕不**用強調色。如果截圖需要強調色，就在旁邊加一個 `.t-cat` chip 或 `.kicker` —— 不要去染舞臺。

#### 純色 `bg-*` vs 素材 `bg-asset-*`

上面的 token 是 **CSS 生成的純色** —— 平塗色調、快、不依賴素材。它們夠用，但對程式碼／IDE／儀表板／密集 UI 截圖來說會顯得單薄。從 PPT skill 移植過來，兩個 seed 模板也各附了 9 張**真實紋理 WebP** 背景，放在 `assets/screenshot-backgrounds/` 底下。當截圖是頁面主視覺、當純色舞臺太單薄、或當你需要印刷雜誌的溫度／顆粒感時，就用這些。

Editorial 素材（`assets/screenshot-backgrounds/style-a/`）：

| Class                       | 色調               | 適合                                          |
| --------------------------- | ------------------ | ------------------------------------------------- |
| `bg-asset-dune`             | 暖沙色               | 旅行／戶外 App 截圖、生活風格產品    |
| `bg-asset-forest-ink`       | 深森林綠  | Editorial 上的深色模式 UI —— 搭配 `ink-classic` |
| `bg-asset-indigo-porcelain` | 冷瓷色     | 閱讀／寫作 App、設計工具              |
| `bg-asset-kraft-paper`      | 牛皮紙棕         | 筆記／手帳／手寫 App                   |
| `bg-asset-monocle-classic`  | 奶油紙色         | 預設的溫暖主視覺 —— 最有雜誌感    |

Swiss 素材（`assets/screenshot-backgrounds/style-b/`）：

| Class                      | 強調色            | 只在目前強調色相符時使用             |
| -------------------------- | ----------------- | ------------------------------------------------ |
| `bg-asset-ikb-dot`         | IKB 克萊因藍    | 只用在 `data-accent="ikb"` 的組                   |
| `bg-asset-lemon-green-dot` | 檸檬綠       | 只用在 `data-accent="lemon-green"` 的組           |
| `bg-asset-lemon-grid`      | 檸檬黃      | 只用在 `data-accent="lemon"` 的組           |
| `bg-asset-safety-orange`   | 安全橘     | 只用在 `data-accent="safety-orange"` 的組         |

**經驗法則**

- 不要混強調色 —— `data-accent="ikb"` 的組不能用 `bg-asset-safety-orange` 舞臺。
- 素材背景本身已經有紋理；不要再疊 `shadow-ed`（那條 `1px` 外框會看起來像 SaaS 邊框）。用 `shadow-soft` 或 `shadow-none`。
- 每一組只決定一次素材舞臺要不要成為視覺識別的一部分 —— 不要在一整組純色舞臺裡撒一張素材背景，那看起來像樣品卡。
- 這些素材在 16:10 和 16:9 下裁切是安全的。對於高的 `r-3x4` 或方形 `r-1x1` 版位，優先用純色 `bg-*` —— 紋理圖樣過度裁切時會顯得怪。

**路徑注意**：`.bg-asset-*` 規則用 `url("../assets/screenshot-backgrounds/...")` —— 這假設你的組的 `index.html` 位在 `assets/` 下一層目錄。如果你把組放到別處，就在本地用正確的相對路徑覆寫這些規則。

### 5. `inset-*`（截圖與舞臺之間的內距）

- `inset-none` —— 圖片填滿框。當截圖本身已經有視窗外框時用。
- `inset-sub`（Swiss 20 px／Editorial 24 px）—— 預設。讓舞臺呼吸。
- `inset-bal`（Swiss 48 px／Editorial 56 px）—— 當截圖很雜、需要顯得沉靜時用。

### 6. `fit-cover`（覆寫）

預設是 `object-fit: contain` —— 這正是 `.frame-shot` 的重點。**只有**在以下情況才加 `.fit-cover`：
- 版位是主視覺、來源的精確畫素不重要時（例如把程式碼截圖當背景圖樣）。
- 使用者明確表示要把截圖裁切。

## 裝置外框

seed 附了兩個外層 class，用來包住 `.frame-shot`：

### `.device-browser`

加一條 32–36 px 的外框列，帶紅綠燈圓點。用於網頁／桌面 App 截圖。

```html
<div class="device-browser">
  <div class="frame-shot r-16x10 bg-paper inset-none">
    <img src="assets/website.png" alt="Linear inbox">
  </div>
</div>
```

在截圖本身搭配 `shadow-soft`，做出桌面照片的感覺。

### `.device-phone`

把 3:4 或 16:10 的截圖包進墨色邊框，內角圓 18-24 px。用於手機截圖。

```html
<div class="device-phone">
  <div class="frame-shot r-3x4 bg-paper inset-none">
    <img src="assets/app.png" alt="LINE detail">
  </div>
</div>
```

不要在 `.device-phone` 上再疊 `corners-md` —— 邊框已經把內部截圖的角磨圓了。

## 安全區裁切

當使用者給的是全螢幕截圖（1290×2796 iOS／1080×2400 Android／1920×1080 桌面），**不要**顯示狀態列、Dock 或瀏覽器分頁列，除非那個外框就是主體。匯入前先裁切：

1. 裁掉 iOS／Android 狀態列（retina 上方 47-59 px）。
2. 裁掉 home indicator／導覽手勢列（iOS 下方 34 px）。
3. 桌面：除非用 `.device-browser` 包起來，否則裁掉頁面內容以上的所有東西。

如果沒辦法事先裁切，用 `object-position: center 6%` 把可見區域往下偏 —— 但這是權宜之計，不是首選。

## 樣式速查表

兩組涵蓋 80% 情況的配方。

**Swiss 產品展示** —— 純舞臺、無陰影：
```
.frame-shot.r-16x10.corners-sq.shadow-none.bg-grey-1.inset-bal
```

**Editorial 深度報導** —— 桌面照片的溫度：
```
.frame-shot.r-16x10.corners-sm.shadow-soft.bg-paper-2.inset-sub
```

**Editorial 主視覺 + 真實紋理** —— 雜誌等級的舞臺：
```
.frame-shot.r-16x10.corners-sm.shadow-soft.bg-asset-monocle-classic.inset-bal
```

**Swiss 主視覺 + 品牌一致的舞臺** —— 只有強調色與素材相符時：
```
.frame-shot.r-16x10.corners-sq.shadow-none.bg-asset-ikb-dot.inset-bal
```

對比截圖（前／後）兩張要用**相同的引數** —— 兩格用不同處理看起來是不一致，不是對比。

## 驗證器

`validate-social-deck.mjs` 還沒有專門針對截圖的規則。既有的 R1／R2／R5 仍然適用：`.frame-shot` 溢位或把頁尾推掉，一樣算失敗。

如果一組在同一張海報上混用 `.frame-img` 和 `.frame-shot`，通常是壞味道 —— 每張海報只選一種做法。
