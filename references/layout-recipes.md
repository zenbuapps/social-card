# Layout Recipes

這些是靜態社群圖配方，取材自 Guizang PPT 風格語言改編而來，並非直接複製的 PPT 版型。

## Editorial Magazine × E-ink 配方

這些結構（ledger / marginalia / pull-quote / photo-well / pipeline-vertical）適用於**任何**想要雜誌特寫節奏的主題 —— 戶外、AI、財經、美食、職場、遊戲，通通歡迎。這個模式是一種視覺姿態，不是內容篩選器。完整理由見 `style-system.md` 的「Style ↔ content type are decoupled」。

直式規則：

- 每一張 4:5 頁面都應該刻意佔滿整個直式畫布。如果內容只撐出一張單薄的表格，就改用下方的 M08/M09/M10，或加上大型 pull quote、佐證圖、邊欄，或滿版高度的 ledger。

**內容密度規則（硬性）**：在 1080×1350 卡片上，內容必須覆蓋畫布高度的 ≥75%。任何超過畫布高度 15%（>202px）的純留白帶都需要一個明確理由 —— 主視覺留白呼吸、單句陳述，或首尾邊界（合計 ≤15%）。**不要**用 `<div style="flex: 1"></div>` 把內容推到垂直置中 —— Editorial 雜誌是靠對開頁面來吸收留白；社群卡片是一張一張滑過去看的，填不滿的卡片會讀起來像「少了一個元件的 PowerPoint」。下方每個配方都附一行 `Minimum density:`，標示能填滿一張 4:5 畫布的最小內容量。如果你的文案達不到那個底線，就**縮短畫布（改成 1:1）或換一個配方** —— 千萬別直接發一張填不滿的。

### M01 Cover: Magazine Issue Cover

最適合 IG 輪播第一張、直式社群卡片，或文章卡封面。

Structure:

- 頂部刊頭列：分類、日期、比例，或帳號名。
- 大型 serif/宋體感標題，通常 2-4 行。
- 一張大圖或裁切照片，佔版面的 35%-55%。
- 底部刊頭列，3-5 個要點。

Style:

- 紙張背景，深墨色標題。
- 照片可以在一個大型矩形框內出血。
- 點綴色以一條直線、頁碼，或小標籤呈現。

### M02 Field Note Photo

最適合戶外、物件、硬體，或真實世界觀察。

Structure:

- 大張紀實照片。
- 窄的圖說欄或底部圖說帶。
- 一句大字重點。

當照片是佐證而非裝飾時使用。

### M03 Editorial Essay Split

最適合細膩地解說單一概念。

Structure:

- 左：大標題或 pull quote。
- 右：2-3 段短文或編號片段。
- 欄與欄之間一條細線。

段落保持簡短。如果變得太密，就拆頁。

**Minimum density (4:5)**：標題 + 3 段短文，或標題 + 2 段 + 編號的頁尾清單。只有標題那是 M04，不是 M03。如果你只有標題 + 1 段，就改用 M04 Pull Quote，或折進一個邊欄變成 M11 Marginalia Essay。

### M04 Pull Quote / Thesis

最適合一句核心句或結論。

Structure:

- 大型引言橫跨整頁。
- 小的出處/脈絡列。
- 選配的小註記或刊頭標記。

用來在密集頁面之間製造節奏。

**Minimum density (4:5)**：這是**唯一**允許畫布內容 ≤60% 的配方（主陳述 = 刻意留白）。但你必須加上 (a) 出處/脈絡列，18-20px mono，距底部 ≤15%，(b) 頂部的日期戳或章號 kicker，(c) 出處列上方一條 hairline 細線。少了這三個「錨點」，留白就會被讀成內容缺漏。如果連一個錨點都給不出來，就別用 M04。

### M05 Checklist / Buying Guide

最適合 IG 上的實用型內容。

Structure:

- 標題。
- 4-6 列，每列有編號、專案，與後果。
- 選配的小照片裁切或材質色票。

避免通用的圓角卡片；改用列、線條、欄位，與刊頭標籤。

### M06 Evidence Wall

最適合多張截圖、參考圖，或小圖。

Structure:

- 2×2 或三欄的圖片格。
- 每張圖配一句短圖說。
- 一個較大的標題錨定整體詮釋。

只有在提供的圖片在最終尺寸下仍可辨讀時才用。

### M07 Closing Note

最適合最後一頁。

Structure:

- 大的收尾標題（≤2 行）。
- **4-6 個 ledger 專案**，每個是 26-30px serif 標題 + 16-18px serif 子行（「後果」/「原因」/「範例」）。每列專案應佔 100-140px 高（邊框 + 內距 + 內容）。
- 收尾區塊：pull-quote 或 署名行 或 價格/CTA 或 小型邊註（四者擇一必備）。
- 小的頁尾標籤。

氛圍要像一篇雜誌特寫的結尾，而不是促銷橫幅。

**Minimum density (4:5)**：標題 + **≥4 個含子行的 ledger 專案** + 收尾區塊。舊版的「2-3 條」會讓 4:5 少填約 40%。如果你真的只有 3 個理由，就把每個擴成「標題 + 2 行後果 + 範例/引言」，或搭配一個 pull-quote 收尾區塊。**4:5 畫布上只有 3 條短 ledger 就是失敗樣態**；不是擴充，就是改用 M04 Pull Quote。

### M08 Tall Ledger

最適合清單、角色、優缺點、裝備專案、產品能力，以及 agent 職責。

Structure:

- 標題。
- 4-6 列滿版寬度。
- 在 1080×1350 畫布上，每列最少 118-170px。
- 左邊索引/邊註欄，右邊標題 + 後果。
- 選配的直向點綴條，或底部刊頭註記。

當一般表格會太短時使用。別讓 ledger 只佔版面的中間三分之一。

### M09 Atmospheric Thesis

最適合稀疏但重要的重點。

Structure:

- WebGL/ink-flow 背景貫穿整頁可見。
- 一句非常大的主張或引言。
- 1-2 條輔助註記。
- 小的刊頭 metadata，與底部一條線。

當內容很少時，用這個，而不是硬把一張小表格塞進頁面。

### M10 Evidence Feature

最適合有提供截圖/照片時。

Structure:

- 大張截圖/照片，佔直式畫布的 45%-65%。
- 標題與引言在其上方或旁邊。
- 底部圖說帶，2-3 個重點。

圖片不是事後補的。如果截圖很重要，它就得大到能讓人看清楚。

### M11 Marginalia Essay

最適合文字量中等的細膩解說。

Structure:

- 寬的 editorial 標題。
- 主欄放 2-3 段。
- 窄的邊欄，放關鍵字、引言片段，或小的佐證裁切。
- 欄與欄之間一條 hairline 直線。

當 M03 感覺太空、但 ledger 又太機械時使用。

### M12 Section Divider

最適合在密集頁面之間、輪播中段的一次喘息。在一組 7-9 張的 IG 輪播的第一幕與第二幕之間放一張，讓讀者得到一拍安靜。

Structure:

- WebGL ink-flow 背景貫穿大部分畫布可見（Editorial 模板預設掛載）。
- 一個 mono `kicker`，例如 `Act II` 或 `Part 2 of 3`。
- 一個大型 serif `h-display` 命名這個段落（3-6 個中文字）。
- 一句 serif 斜體短副標。
- 選配的底部 `issue-strip`，寫這個段落的承諾。

HTML 骨架（4:5）：

```html
<section class="poster post" id="post-04">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-4" style="justify-content:center; align-items:flex-start">
    <p class="kicker">Act II · Part 2</p>
    <h1 class="h-display">實測結果</h1>
    <p class="h-sub">What actually happened.</p>
  </div>
  <div class="issue-strip">
    <span>Section · Findings</span>
    <span>—</span>
    <span>3 pages</span>
  </div>
</section>
```

1:1 調整：拿掉副標，把 `h-display` 置中，ink-flow 背景維持強烈。9:16（限時動態）調整：標題置於上三分之一，讓 WebGL 氛圍鋪滿中段，`issue-strip` 壓在下方安全區之上。

### M13 Hero Question

最適合 IG 輪播的最後一張，或組圖中段的一次犀利轉折。問題就是整個版面。

Structure:

- WebGL ink-flow 背景。
- 安靜的 kicker，例如 `The Question` 或 `留給你的`。
- 大型 serif 問句，用 `<br>` 在語意斷點斷成 2-3 行（不是亂折行）。
- 一句短的 `lead` 提示，通常是提示或邀請留言。
- 底部極簡 metadata。

**Minimum density (4:5)**：和 M04 一樣，這是刻意的空。必備錨點：頂部 kicker（0-12% y） + 底部提示 + 底部 metadata 列。ink-flow WebGL 背景**一定要看得見**（別讓 `.content` 蓋住它）。如果 WebGL 背景不見了或 kicker 空著，這頁就會被讀成填不滿而不是留白冥想。

HTML 骨架（4:5）：

```html
<section class="poster post" id="post-09">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-4" style="justify-content:center">
    <p class="kicker">The Question · 留給你的</p>
    <h1 class="h-display">
      下一次<br>
      你會先<br>
      問 AI 還是問朋友?
    </h1>
    <p class="lead">在留言區告訴我你的答案。</p>
  </div>
  <div class="issue-strip">
    <span>End · Page 9</span>
    <span>—</span>
    <span>歡迎留言</span>
  </div>
</section>
```

標題長度上限：3 行，預設字級下每行 ≤ 6 個中文字。問題太長就縮短它；不要縮小 `h-display`。

### M14 Vertical Pipeline

最適合解說 3-5 步的工作流、決策樹，或流程。PPT 的 pipeline 是橫的；直式社群卡片要把它轉成直向。

Structure:

- `kicker` + `h-xl` 頁面標題。
- 3-5 個 `.pipeline-v .step` 列。每列有步驟編號（mono）、步驟標題（serif），與一行描述（sans）。
- 步驟間 hairline 細線，間距 28-36px。
- 選配：標題右側一張小佐證圖，或底部單一圖說。

HTML 骨架（4:5）：

```html
<section class="poster post" id="post-06">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-3">
    <p class="kicker">Workflow · 4 步</p>
    <h2 class="h-xl">我的寫作流程</h2>
    <div class="pipeline-v">
      <div class="step">
        <div class="step-nb">01</div>
        <div>
          <h3 class="step-title">Draft</h3>
          <p class="step-desc">用語音備忘錄把想法說出來</p>
        </div>
      </div>
      <div class="step">
        <div class="step-nb">02</div>
        <div>
          <h3 class="step-title">Reorder</h3>
          <p class="step-desc">用 AI 把段落順序重新排</p>
        </div>
      </div>
      <div class="step">
        <div class="step-nb">03</div>
        <div>
          <h3 class="step-title">Polish</h3>
          <p class="step-desc">人工逐句去除 AI 味</p>
        </div>
      </div>
      <div class="step">
        <div class="step-nb">04</div>
        <div>
          <h3 class="step-title">Ship</h3>
          <p class="step-desc">同時發 Instagram、Threads、Facebook</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

硬限制：3-5 步。如果有 6 步以上，拆成兩頁或改用 M05 Checklist。

### M15 Before / After

最適合「舊做法 vs 新做法」「用 AI 前 vs 用 AI 後」「新手 vs 老手」這類對比。PPT 的 Before/After 是左右排；在 4:5 直式上，改成上下堆疊，避免欄位被擠窄。

Structure:

- `kicker` + `h-xl` 頁面標題。
- `.beforeafter` 容器裝兩個 `.ba-block` 列：一個帶 `before` class（淡化到 .68 透明度），一個沒有。
- 每個區塊有自己的 kicker、中標題，與 3-4 個短專案。

HTML 骨架（4:5）：

```html
<section class="poster post" id="post-07">
  <canvas class="mag-bg" data-bg="ink-flow"></canvas>
  <div class="grain"></div>
  <div class="content stack gap-3">
    <p class="kicker">Before · After</p>
    <h2 class="h-xl">寫作流程的演變</h2>
    <div class="beforeafter">
      <div class="ba-block before">
        <p class="kicker">Before · 舊</p>
        <h3 class="h-md">在 Notion 裡反覆修</h3>
        <ul class="body" style="margin:0; padding-left:1.2em">
          <li>開頭改了 20 遍</li>
          <li>每個段落都想精雕</li>
          <li>一週才發一則</li>
        </ul>
      </div>
      <div class="ba-block">
        <p class="kicker">After · 新</p>
        <h3 class="h-md">先釋出,再迭代</h3>
        <ul class="body" style="margin:0; padding-left:1.2em">
          <li>20 分鐘出初稿</li>
          <li>留言區做精修</li>
          <li>一天發三則</li>
        </ul>
      </div>
    </div>
  </div>
</section>
```

9:16（限時動態）調整：維持上下堆疊（直式空間更充裕），before 區塊置於上段、after 置於下段，兩塊都落在上下安全區之內。1:1 調整：通常太擠；改用 M04 Pull Quote。

### M16 Image-Led Cover (Full-Bleed Hero)

最適合**生活風格、以圖為主**、使用者手上有 1 張以上絕佳照片的內容：旅行目的地 / 戶外場景 / 自家成菜 / 家居一角 / 情感場景照。照片鋪滿畫布；標題剋制地疊在上面。這正是 M01 **不是**的樣子 —— M01 把畫布切成照片 + 文字區塊；M16 讓照片獨佔畫布。

**參考風格**：Kinfolk / Cereal / Apartamento / Monocle 的封面。安靜的照片、serif 標題、paper-cream 文字、大量負空間、非對稱擺放。**不是**帶厚重黑漸層的遊戲主視覺，**也不是**配粗黑大字圖說的旅遊海報。

**必要條件**：`references/image-overlay.md` 的 Rule 1 Steps 1-4 全部要透過。第一關（選照片）最難 —— 多數照片過不了。

### 照片資格檢查（選 M16 前的關卡）

對使用者的照片跑這兩項測試。兩項都要過，否則**改用 M01**（切版式），不要硬上 M16。

1. **靜區測試**：照片有一條 ≥30% 畫布的帶狀區（整個寬 × ≥30% 高，或整個高 × ≥30% 寬）是低細節 / 失焦 / 均勻的。標題就落在這裡。
2. **光線測試**：照片帶有氛圍感/剋制的光 —— 陰天、清晨薄霧、黃金時刻、林下光、暮色剪影、底片柔調。拒絕高飽和的正午照、機頂閃燈，與通用觀光快照。

只過一項：試 M01。兩項都沒過：向使用者要另一張照片，或用 M01 搭配較小的 `.frame-img` 欄位。**不要「用遮罩硬救」。**

**頁面順序慣例**（這就是「以圖為主」的模式）：

```
P1 (M16)               ← 滿版照片 + 短標題 — 鉤子
P2 (S11 / M05 / M10)   ← ledger / checklist / 迷你資料 — 文字量大的休息站
P3 (M02 or M16-small)  ← 第二張照片當作 field-note 佐證,不滿版
P4-N (M02 / M11)       ← 更多 field notes 或 marginalia essays
P_last (M07 / M04)     ← 收尾註記或 pull quote
```

絕不連續兩張 M16。滿版照片之後，眼睛需要文字。P2 必須是資料/文字。

**四種標題擺放模式** —— 依主體地圖挑選（出自 image-overlay.md Rule 2）：

| 模式 | 主體位置 | 標題位置 | 上色（僅在 Step 4 對比不足時） |
| ---- | ---------------- | -------------- | ------------------------------------ |
| **A · 頂壓底沉**（頂 kicker + 底標題） | 主體在中間三分之一（臉、山峰、主角物件），上下都空 | 頂：kicker 0-12% y。底：1-2 行標題 72-92% y。 | 先試不上色。需要時：只在底部用 radial、取影像色調、標題區塊上方峰值 α ≤ 0.30。 |
| **B · 側欄立柱**（直向欄） | 主體佔一條**乾淨**的直向欄，對側留有 ≥40% 寬的安全區。若主體邊緣不規則（例如樹冠向側邊溢位）就跳過 B —— 改用 A 或 D。 | 對側欄（約 36-40% 寬），堆疊：kicker → 標題 → 副標 | 先試不上色。需要時：單側水平衰減 `radial-gradient(45% 60% at 18% 50%, …)`，取影像色調。 |
| **C · 角落徽章**（角落徽章） | 主體填滿大部分畫面；有一個角落是真的空的 | 空角落放一個小區塊（≤35% 寬 × ≤25% 高）：kicker / 短標題 / meta | 只在那個角落用淡暗角 —— 絕不壓暗整張圖 |
| **D · 下沉條帶**（壓底條帶） | 寬幅風景 / 氛圍場景 / 沒有單一主體；底部有大量負空間 | 底部帶 78-92% y：標題 + meta 列；靠左或靠右對齊（不置中） | 先試不上色。需要時：只在底部用 radial、取影像色調、峰值 α 0.20-0.30 |

**1080×1350 上的字型規格（Editorial × E-ink） —— 剋制，不厚重**：

| 元素 | Mode A | Mode B | Mode C | Mode D |
| ------- | ------ | ------ | ------ | ------ |
| Kicker  | mono 20-22px, uppercase, tracking 0.18-0.22em | mono 20-22px | mono 18-20px | mono 22-24px |
| 標題字型 | Noto Serif SC **400-500**（非 700-900） | 同上 | 同上 | 同上 |
| 標題字級 | **88-108px**。2 行中文標題預設 96px。2 行 × ≥7 字時降到 88px。 | **84-100px**，依語意斷行 | 56-64px（非 display） | **96-112px**，偏好單行 |
| 標題字距（中文） | 0.10-0.15em | 0.10-0.15em | 0.05-0.10em | 0.12-0.18em |
| 標題行高 | 1.10-1.18 | 1.10-1.18 | 1.20 | 1.05-1.10 |
| 副標 | 選配 `h-sub` 28-32px 斜體 Playfair, tracking 0 | 同上 | 省略 | 同上 |
| Issue strip | mono 18-20px 置底, uppercase, tracking 0.20-0.25em, 上方 hairline | 省略 | 省略 | mono 20-22px, tracking 0.20-0.25em |
| 文字顏色 | `#f5f1e8`（paper-cream，非純白 #fff） | 同上 | 同上 | 同上 |
| Hairline 顏色 | `rgba(245, 241, 232, 0.35)`（paper 35% alpha） | 同上 | 同上 | 同上 |

**M16 字型禁忌**：

- 標題行內 weight 700+（例如用 `font-weight: 800` 想「讓它跳出來」）。M16 要的是 **regular-medium serif**，不是粗體。
- 純白 `#fff` 文字 —— 太冷硬，跟照片的暖意打架。一律用 paper-cream。
- 在 1080 寬畫布上標題字級 > 120px。我們不是在做旅遊海報。
- 用拉丁 sans-serif 當主標題（標題用 Helvetica / Inter）—— M16 屬於 serif。Sans 只用在 kicker / meta / mono 圖說。
- D 模式標題置中。永遠靠左或靠右，做出非對稱的 Kinfolk 感。

**標題長度預算**（超了就砍字 —— 絕不把字級縮到 84px 以下）：

| 模式 | 中文字上限 | 行數上限 |
| ---- | ----------------- | --------- |
| A    | 12 (2 × 6) or 14 (2 × 7 at 88px)  | 2 |
| B    | 14 (2 × 7)                         | 2 |
| C    | 8                                  | 1 |
| D    | 10                                 | 1 |

**方形（1:1, 1080×1080）與限時動態（9:16, 1080×1920）調整**：

- **1:1**：只用 Mode A 或 Mode D。Mode B 的欄位擠壓、Mode C 的角落在方形上太緊。標題縮到 6-10 字。
- **9:16（限時動態）**：因為是直式，用 Mode A（頂 kicker + 底標題）或 Mode D（壓底條帶）。照片鋪滿整個直式畫面，標題壓在底部但要落在下方安全區（下留 250px）之上，別被回覆列/「傳送訊息」列蓋住。Mode B 的側欄在直式太窄，避免使用。

**HTML 骨架（Mode A —— 頂壓底沉，4:5，無遮罩）**：

```html
<section class="poster post" id="cover-image-led">
  <!-- 主體地圖(封面主視覺 — 範例:清晨的稻城亞丁湖):
       主焦點: 雪峰位於 50% x 32% y (中段)
       安全文字區: 頂部帶 (0-12% y) 低細節天空、
                    底部帶 (72-95% y) 平靜的水面倒影
       靜區測試: PASS — 底部 30% 是均勻的水面
       光線測試: PASS — 清晨陰天、柔和飽和度
  -->
  <div class="hero-bleed" style="background-image: url('assets/hero-yading.jpg');
                                  background-size: cover;
                                  background-position: center center;
                                  position: absolute; inset: 0;"></div>
  <!-- 無遮罩 — 靜區本身已提供對比。
       只有在 Step 4 對比檢查失敗時才加。 -->
  <div class="content" style="position: relative; height: 100%;
        color: #f5f1e8; padding: 72px 80px;
        display: flex; flex-direction: column;">
    <p class="kicker" style="color: #f5f1e8; opacity: .85;
        font-family: var(--mono); font-size: 22px;
        letter-spacing: 0.22em; text-transform: uppercase; margin: 0">
      Vol. 04 — 2026 — 戶外
    </p>
    <div style="flex: 1"></div>
    <h1 style="font-family: 'Noto Serif SC', serif;
        font-weight: 500; font-size: 96px; line-height: 1.12;
        letter-spacing: 0.12em; color: #f5f1e8;
        margin: 0 0 18px 0">
      在稻城<br/>看見冬天
    </h1>
    <div style="border-top: 1px solid rgba(245,241,232,.35);
         padding-top: 14px; font-family: var(--mono); font-size: 19px;
         letter-spacing: 0.22em; text-transform: uppercase;
         color: #f5f1e8; opacity: .85">
      DAY 1-4 · 4,200 M · −18°C
    </div>
  </div>
</section>
```

**HTML 骨架（Mode D —— 下沉條帶，9:16 限時動態封面）**：

```html
<section class="poster story" id="story-01-led">
  <!-- 主體地圖: 直式氛圍風景,清晨湖面薄霧
       靜區測試: PASS — 底部整片 35% 是平靜水面 + 薄霧 -->
  <div class="hero-bleed" style="background-image: url('assets/hero-yading-wide.jpg');
        background-size: cover; background-position: center 40%;
        position: absolute; inset: 0;"></div>
  <div class="content" style="position: relative; height: 100%;
        color: #f5f1e8; padding: 0 64px 250px;
        display: flex; flex-direction: column; justify-content: flex-end;
        align-items: flex-start;">
    <h1 style="font-family: 'Noto Serif SC', serif; font-weight: 500;
         font-size: 108px; line-height: 1.05; letter-spacing: 0.14em;
         margin: 0; color: #f5f1e8">
      在稻城看見冬天
    </h1>
    <div style="margin-top: 18px; border-top: 1px solid rgba(245,241,232,.35);
         padding-top: 14px; font-family: var(--mono); font-size: 20px;
         letter-spacing: 0.24em; text-transform: uppercase">
      VOL. 04 — DAY 1-4 — 4,200 M — 35MM
    </div>
  </div>
</section>
```

**陷阱**：

- 照片沒過靜區或光線測試卻硬選 M16。不管疊什麼遮罩封面都會很糟。退回 M01。
- 主體在下三分之一時，把 Mode A 的底部標題壓在人的軀幹上 —— 重跑主體地圖並改用 Mode C，或改 `object-position: center 70%`。
- Mode C 在角落標題後面墊一塊厚重底板 —— 白白浪費了一張好照片。只用暗角。
- 在主體輪廓**不規則**的照片（側伸枝條的樹、散落的物件）上用 Mode B —— 「側欄」不會寬到足以成為真正的安全區。改用 Mode A 或 D。
- 「以防萬一」加一整片滿版的垂直衰減。預設就加遮罩會毀掉 editorial 感。解法是選照片，不是調透明度。
- 把標題設成 weight 700+ 或純白文字 —— 兩者在 Editorial M16 都是反樣式。
- 每張封面都用 M16。M16 是給**以圖為主的生活風格**用的。產品/技術/AI 釋出封面仍然屬於 S01 / S03 / M01。

## Swiss International 配方

這些結構（accent cover / matrix / KPI tower / h-bar / numbered statement）適用於**任何**想要工程感、量化節奏的主題 —— 軟體釋出當然可以，但旅行預算、健身紀錄、食譜份量、閱讀統計，任何你寧可用數字算而不用文字敘述的東西都行。這個模式是一種視覺姿態，不是內容篩選器。

### S01 Accent Cover

最適合 IG 貼文封面。

Structure:

- 滿版點綴色或米白背景。
- 大型細字重標題。
- 簡單的抽象系統區塊、對比，或雙節點圖。
- 底部 metadata 列。

用一個清楚的概念。不要裝飾性色塊。

### S02 Two Signals / Comparison

最適合解說兩個來源、兩個選項，或兩個產品方向。

Structure:

- 頁面標題。
- 兩個大型矩形模組。
- 一個模組可填墨色；另一個用紙張/描邊。
- 各自下方短註記。

### S03 Data Layer / File Card

最適合 Markdown、記憶、single source of truth、資料庫，或狀態。

Structure:

- 大型檔案型別或物件區塊。
- 3-4 個屬性清單。
- 強烈的 mono 標籤。

### S04 Interface / Browser Mock

最適合 HTML、UI、簡報、互動，或輸出層。

Structure:

- 直角邊的瀏覽器視窗風格外框。
- 內部：一個主內容區塊加 2-3 個功能模組。
- 底部動作或互動列。

### S05 Trap / Warning Rows

最適合問題、反樣式，與「別這樣做」的頁面。

Structure:

- 大的警示標題。
- 三列橫排。
- 左邊 mono 標籤，右邊後果。

如果整包都用 Safety Orange，這裡會很搭。

### S06 Pipeline / Architecture

最適合工作流與分層系統。

Structure:

- 三列或三欄：source、render、share。
- 每個有編號、標籤、動作，與後果。
- 用 hairline 方框與中性灰填色。

### S07 Takeaway Ledger

最適合最後一頁。

Structure:

- 大的主張標題。
- 三個 ledger 列，含編號、短句，與濃縮說明。
- 深色或墨色背景可製造收尾感。

### S08 Image Hero

最適合 IG 限時動態 / Reels 封面（9:16），以及當你有一張強照片或產品渲染圖時的 IG 貼文封面。影像鋪滿畫面；標題放在上三分之一的區塊；3 個量化數字壓在底部安全區。

Structure（9:16 直式）:

- 頂部 `.chrome-min` 單行（分類 + 日期），落在上方安全區（上留 220px）內。
- 標題區塊 `.hero-overlay-block`：`t-cat` kicker + `h-statement` 標題，置於上三分之一。
- 中段 `.image-hero` / `.hero-img-wrap`：一張直式 `.frame-img` 影像鋪滿中段。
- 底部 `.hero-stats`：3 個 `.stat-block` 壓在下方安全區（下留 250px）之上，每個含大 `num`（例：`132K`）與 mono `lbl`。

HTML 骨架（9:16，這個配方最自然的格式）：

```html
<section class="poster story" id="story-01-hero" data-accent="ikb">
  <div class="content stack gap-7" style="padding-top: 220px; padding-bottom: 250px">
    <div class="chrome-min">
      <span class="t-cat">Release · 產品</span>
      <span class="t-meta">2026.05 · v3.0</span>
    </div>
    <div class="hero-overlay-block">
      <p class="t-cat">Cover · 主封面</p>
      <h1 class="h-statement">下一代<br>寫作工作流</h1>
    </div>
    <div class="image-hero">
      <div class="hero-img-wrap">
        <img src="assets/hero.jpg" alt="hero">
      </div>
    </div>
    <div class="hero-stats">
      <div class="stat-block">
        <p class="num">132K</p>
        <p class="lbl">Weekly Writers</p>
      </div>
      <div class="stat-block">
        <p class="num">3.4×</p>
        <p class="lbl">Output Speed</p>
      </div>
      <div class="stat-block">
        <p class="num">98%</p>
        <p class="lbl">Ship Rate</p>
      </div>
    </div>
  </div>
</section>
```

Adapt for 4:5（貼文）：維持同樣的 `.image-hero` 結構，影像改用直式 `.frame-img`，標題區塊縮到約 35% 高度。Adapt for 1:1：整個標題區塊拿掉，把標題移到影像上方，`hero-stats` 最多留 2 個數字。

### S09 KPI Tower

最適合產品更新頁、release notes、流量儀表板、成長貼文 —— 任何需要一眼比較 3-4 個數字的地方。

Structure:

- `kicker` + `h-xl` 頁面標題。
- `.kpi-tower-row` 含 4 個 `.tower-col`，每個有 `num`、`lbl`，與一個 `.bar-tower`，其高度用 `style="--h:Npx"` 編碼數值。
- 其中一欄可加 `.muted` 修飾，把 bar 降成中性灰（用於對比基準）。

HTML 骨架（4:5 —— 模板自動收合成 2 欄）：

```html
<section class="poster post" id="post-data" data-accent="lemon-yellow">
  <div class="content stack gap-7">
    <p class="t-cat">Data · 半年成長</p>
    <h2 class="h-xl">六個月,四組數字</h2>
    <div class="kpi-tower-row">
      <div class="tower-col">
        <p class="num">132K</p>
        <p class="lbl">Subscribers</p>
        <div class="bar-tower" style="--h:320px"></div>
      </div>
      <div class="tower-col">
        <p class="num">3.4M</p>
        <p class="lbl">Reads</p>
        <div class="bar-tower" style="--h:220px"></div>
      </div>
      <div class="tower-col">
        <p class="num">68%</p>
        <p class="lbl">Repeat Visits</p>
        <div class="bar-tower" style="--h:160px"></div>
      </div>
      <div class="tower-col muted">
        <p class="num">8.2%</p>
        <p class="lbl">Conversion</p>
        <div class="bar-tower" style="--h:120px"></div>
      </div>
    </div>
  </div>
</section>
```

`--h` 是真實的 px 高度 —— 選能按比例編碼資料的值。不要亂編數字；如果只有 2 個數字，收成 2 欄並改用 S03 File Card。Adapt for 9:16（限時動態）：維持 4 欄（1080 寬放得下），bar 拉更高；標題落在上方安全區、bar 群置中、`num`/`lbl` 別掉進下方安全區。Adapt for 1:1：最多 2 欄，bar 更高。

### S10 H-Bar Chart

最適合排名、5-10 個專案的比較、「top N」清單，以及大量的 before/after 配對。bar 填色用 `style="--w:NN%"` 編碼量值。

Structure:

- `kicker` + `h-xl` 頁面標題。
- `.h-bar-chart` 格，含 5-10 個 `.bar-row`。
- 每列：`.row-lbl`（中文專案名）、`.row-track` 內含 `.row-fill`、`.row-val`（mono 數字）。

HTML 骨架（4:5）：

```html
<section class="poster post" id="post-rank" data-accent="ikb">
  <div class="content stack gap-7">
    <p class="t-cat">Ranking · TOP 6</p>
    <h2 class="h-xl">本月最受歡迎的工具</h2>
    <div class="h-bar-chart">
      <div class="bar-row">
        <div class="row-lbl">Claude Code</div>
        <div class="row-track"><div class="row-fill" style="--w:94%"></div></div>
        <div class="row-val">94%</div>
      </div>
      <div class="bar-row">
        <div class="row-lbl">Cursor</div>
        <div class="row-track"><div class="row-fill" style="--w:78%"></div></div>
        <div class="row-val">78%</div>
      </div>
      <div class="bar-row">
        <div class="row-lbl">Linear</div>
        <div class="row-track"><div class="row-fill" style="--w:62%"></div></div>
        <div class="row-val">62%</div>
      </div>
      <div class="bar-row">
        <div class="row-lbl">Raycast</div>
        <div class="row-track"><div class="row-fill" style="--w:48%"></div></div>
        <div class="row-val">48%</div>
      </div>
      <div class="bar-row">
        <div class="row-lbl">Notion</div>
        <div class="row-track"><div class="row-fill" style="--w:36%"></div></div>
        <div class="row-val">36%</div>
      </div>
      <div class="bar-row">
        <div class="row-lbl">Obsidian</div>
        <div class="row-track"><div class="row-fill" style="--w:28%"></div></div>
        <div class="row-val">28%</div>
      </div>
    </div>
  </div>
</section>
```

硬限制：1:1 最多 6 列、4:5 最多 10 列、9:16 最多 12 列。在 4:5 上模板會自動把 `row-lbl` 疊在 track 上方 —— 別去動它。一律用真實百分比，或把最大值正規化為 100%；絕不捏造。

### S11 Stacked Ledger

最適合購物清單、支出彙整、agent 能力盤點，或任何「大數字 + 標籤 + icon」的列堆疊，只要每個專案都可量化。

Structure:

- `kicker` + `h-xl` 頁面標題。
- `.stacked-ledger` 內含 4-6 個 `.ledger-row`。
- 每列：`.ledger-num`（大的 mono 感 sans 數字）、`.ledger-lbl`（中文標籤 + 選配 `.sub` 次行）、`.ledger-icn`（Lucide icon）。

HTML 骨架（4:5）：

```html
<section class="poster post" id="post-spend" data-accent="safety-orange">
  <div class="content stack gap-7">
    <p class="t-cat">Spend · 五月帳單</p>
    <h2 class="h-xl">這個月我把錢花在哪</h2>
    <div class="stacked-ledger">
      <div class="ledger-row">
        <p class="ledger-num">NT$1,280</p>
        <div class="ledger-lbl">訂閱 · Subscriptions
          <span class="sub">Claude · Cursor · Linear</span>
        </div>
        <i class="ledger-icn" data-lucide="square-stack"></i>
      </div>
      <div class="ledger-row">
        <p class="ledger-num">NT$860</p>
        <div class="ledger-lbl">書 · Books
          <span class="sub">6 本中文 · 2 本英文</span>
        </div>
        <i class="ledger-icn" data-lucide="book-open"></i>
      </div>
      <div class="ledger-row">
        <p class="ledger-num">NT$540</p>
        <div class="ledger-lbl">咖啡 · Coffee
          <span class="sub">主要在 cama 和 Louisa</span>
        </div>
        <i class="ledger-icn" data-lucide="coffee"></i>
      </div>
      <div class="ledger-row">
        <p class="ledger-num">NT$320</p>
        <div class="ledger-lbl">硬體 · Hardware
          <span class="sub">鍵盤配件 · 一條 USB-C</span>
        </div>
        <i class="ledger-icn" data-lucide="keyboard"></i>
      </div>
    </div>
  </div>
</section>
```

硬限制：4:5 最多 6 列、1:1 最多 4 列、9:16 最多 8 列。選有稜角的 Lucide icon（`book-open`、`coffee`、`bolt`、`square-stack`、`keyboard`）—— 絕不用 `heart-filled` 或 `smile`。如果找不到數字佐證，那就是選錯配方了；改用 S05 Trap Rows 或 M08 Tall Ledger。

### S12 Matrix + Hero Stat

最適合能力矩陣、agent 盤點，以及「這一組涵蓋 X 個領域」這類由 8-12 個小格支撐單一結論數字的頁面。

Structure:

- `kicker` + `h-xl` 頁面標題。
- `.matrix-fill` 格，含 8-12 個 `.matrix-cell`。每格：`.cell-nb`（編號 mono 標籤，如 `01`）與 `.cell-title`（一句短中文）。
- 恰好一格可加 `.is-accent` 修飾，標出最重要的能力。
- 格子下方 `.hero-stat-bottom`：左欄放 kicker + 短句，右欄放一個 `num-mega` 總結數字。

HTML 骨架（4:5 —— 矩陣收合成 2 欄）：

```html
<section class="poster post" id="post-matrix" data-accent="lemon-green">
  <div class="content stack gap-7">
    <p class="t-cat">Capabilities · 能力清單</p>
    <h2 class="h-xl">一個 Agent,十二件事</h2>
    <div class="matrix-fill">
      <div class="matrix-cell"><p class="cell-nb">01</p><p class="cell-title">讀取專案結構</p></div>
      <div class="matrix-cell"><p class="cell-nb">02</p><p class="cell-title">執行測試</p></div>
      <div class="matrix-cell is-accent"><p class="cell-nb">03</p><p class="cell-title">起草 PR 描述</p></div>
      <div class="matrix-cell"><p class="cell-nb">04</p><p class="cell-title">還原錯誤改動</p></div>
      <div class="matrix-cell"><p class="cell-nb">05</p><p class="cell-title">遷移 lockfile</p></div>
      <div class="matrix-cell"><p class="cell-nb">06</p><p class="cell-title">檢查型別</p></div>
      <div class="matrix-cell"><p class="cell-nb">07</p><p class="cell-title">追蹤 issue</p></div>
      <div class="matrix-cell"><p class="cell-nb">08</p><p class="cell-title">閱讀日誌</p></div>
    </div>
    <div class="hero-stat-bottom">
      <div>
        <p class="t-cat">In total · 累計</p>
        <p class="lead">在 6 個儲存庫上,持續 4 週。</p>
      </div>
      <p class="num-mega">12</p>
    </div>
  </div>
</section>
```

硬限制：4:5 放 8 格（2×4）、1:1 放 9 格（3×3）、9:16 放 12 格（2×6）。最多一格 `is-accent` —— 兩格會打亂節奏。底部的 `num-mega` 必須和格數一致（12 格就 `12`、8 格就 `8`）；絕不顯示格子撐不起來的數字。

## 限時動態與方形版位調整（Story / Square Adaptation）

9:16（限時動態 / Reels 封面，直式）：

- 用 M01/S01 當作直式滿版構圖，不要把 4:5 的版面硬裁切塞進去。
- 標題放在上三分之一，落在上方安全區（上留 220px）之內。
- 主視覺（照片/物件/系統圖）佔中段。
- CTA / 資訊列壓在底部，但要在下方安全區（下留 250px）之上，別被回覆列與「傳送訊息」蓋住。
- 左右各留 64px 安全邊；標題與 CTA 一律落在中央安全帶內。
- 若中段感覺太空，放大標題與副標的間距，或讓主視覺往上下延伸。

1:1（方形）：

- 把長標題濃縮成一句置中標題。
- 使用者若要求不放圖，就純文字。
- 預設避免小副標、避免放照片。
- 讓方形在縮圖狀態也讀得懂：一個重點、大字、留白充足。

貼文 + 限時動態組合預覽（pair preview）：

- 把 `4:5`（貼文）與 `9:16`（限時動態）兩個構圖放進同一個 HTML 預覽框。
- 預覽框只供檢視；除非有要求，不要把它當成第三個必交的成品。
