# IG 短影音封面製作流程（Reels／限時動態）

這份筆記記錄如何把使用者提供的影片、螢幕錄影、或算好的社群卡影片，做成 IG 短影音封面（Reels／限時動態）。主交付是一支可直接釋出到 IG 的直式 MOV；iPhone Live Photo（`.pvt`）是 iOS 專屬、非 IG 原生的選配格式，收在文末附錄。

## 目錄

- 何時做短影音封面
- 建議產出
- 視覺格式
- 短影音資訊量預算
- 三連短影音拼貼
- 素材優先拼貼
- 長影片入料
- 入料決策樹
- 影片當圖框替換
- 預覽優先流程
- 聯絡表檢查演演算法
- 範例：Render 一支 MOV
- 抽出封面關鍵幀
- 驗證
- 版位說明
- 疑難排解
- 案例研究：MIMO UltraSpeed
- 附錄：iOS Live Photo（選配，非 IG 原生釋出格式）

## 何時做短影音封面

當使用者要用影片素材做社群內容、而「動態本身就是證明」時，做 IG 短影音封面。使用者若明確點名要 iPhone Live Photo，走文末附錄（iOS 專屬、非 IG 原生釋出格式）。

正常製作路徑用使用者提供的影片、螢幕錄影或產品 demo。網路來源的免費影片只用來做我們自己的 demo／宣傳案例，或使用者明確要求外找範例素材時。

核心原則：短影音封面不講完整長故事。它證明一個瞬間、一段小過程、一次 before/after 改變，或一組精簡的平行結果。

面向觀眾的文案要講出影片裡的真實場景。不要把內部製作標籤放進 H1 或主文案：`3s`、`5s`、`短影音`、`三連拼貼`、`長影片入料`、`資訊量預算`、`加速`、`亮點偵測`、`單一動作點` 這些屬於規劃筆記、檔名、QA 摘要或交付說明。看得見的卡片要讀起來像使用者為觀眾發的貼文，而不是 agent 在解釋它怎麼做出來的。

這個功能解決的使用者問題：

- **把動態壓進輪播卡**：使用者可以把程式生成、UI 互動、遊戲 demo、before/after 狀態、或捲動 reveal 放進一般 IG 貼文／輪播（4:5），不必改成純影片貼文；或做成 9:16 限時動態／Reels 封面。
- **保留 skill 的版面品質**：海報仍走既有的 4:5 視覺系統，只是圖框變成影片框。
- **花 render／模型預算前先預覽**：agent 可以先抽影片首幀當靜態圖擺版，確認版面後再產 MOV。
- **處理過長片段**：agent 可以決定裁切、加速或兩者並用，不必逼使用者先自己剪。
- **讓證據可讀**：agent 像裁圖一樣裁影片，放大重要的 UI／計數器／結果區，而不是塞一段小小的全螢幕錄影。
- **避開版位雷**：輸出 IG 原生的直式 MOV、遵守版位時長；（選配）要 iPhone Live Photo 時才輸出 `.pvt`。
- **說清楚釋出路徑**：短影音 MOV 直接從 IG app 發成 Reels／限時動態。`.pvt` 是 iOS 專屬，要傳到 iPhone、從相機膠卷用，不是 IG 原生上傳格式。
- **提供優雅退路**：需要網頁上傳時，同一素材可轉成 GIF／短影片，靜態卡仍可用。

## 建議產出

每支短影音封面，產出這些交付物：

```text
local-tests/<slug>/output/
  <slug>_reels.mov          # 主交付：可直接釋出到 IG Reels／限時動態的短影音
  <slug>_cover.jpg          # 封面縮圖／靜態備援（同畫布尺寸與裁切）
```

若同時要做 Reels 與限時動態兩種版本，分開輸出讓使用者知道各自要傳哪個：

```text
<slug>_reels_5s.mov         # Reels（5s）
<slug>_story_3s.mov         # 限時動態（3s）
```

（選配）若使用者要 iPhone Live Photo，再另外打包 `.pvt`（見文末附錄）：

```text
IMG_<slug>_LIVE.JPG         # 1080 x 1350 關鍵照／封面幀
IMG_<slug>_LIVE.MOV         # 依版位時長的配對影片
IMG_<slug>_LIVE.pvt/        # 適合 AirDrop 的 Live Photo 封包
  IMG_<slug>_LIVE.JPG
  IMG_<slug>_LIVE.MOV
  metadata.plist
```

## 視覺格式

預設 IG 短影音卡（動態貼文／輪播用）：

- 畫布：`1080 x 1350`
- 比例：`4:5`
- 時長：`5s`（Reels 情境）
- FPS：螢幕錄影 `24-30`；簡單動畫圖形 `12-15` 可接受。
- Codec：H.264 MOV
- 首幀：一個有效的靜態社群卡狀態，不過度裁切。
- 關鍵照：從確認版面挑一張可讀代表幀。可以是首幀或後面更強的結果幀，但必須用同一裁切與構圖。

全屏限時動態／Reels 封面：

- 畫布：`1080 x 1920`
- 比例：`9:16`
- 時長：`3s`（限時動態短封面）／`5s`（Reels）
- 釋出路徑：IG app（手機）。標題與 CTA 落在 story 安全帶內（避開上方 ~220px／下方 ~250px、左右安全邊 64px，見 platform-specs）。

「三連測試」卡：

- 上：標題與一句主張。
- 中：三條水平結果帶。
- 每條帶秀一個生成結果，不只是程式碼。
- 加精簡標籤，例如 `01 / 3D SPACE GAME`、`02 / AI INFERENCE WEBSITE`、`03 / SPACE TRAVEL WEBSITE`。
- 就算不支援動態，靜態關鍵照也要有用。

## 短影音資訊量預算

在設計版面前，先判斷能塞進多少素材。

| 形式 | 時間預算 | 最適合 | 避免 |
| --- | --- | --- | --- |
| 限時動態單則短影音 | `3s` | 一個動作點、一次點按結果、一次 before/after reveal | 多步教學、長捲動、三段不相干片段 |
| Reels 單則短影音 | `5s` | 一段小過程、短產品互動、關鍵遊戲操作、生成到結果的證明 | 完整故事線、密集旁白、結果前的冗長鋪陳 |
| 三連短影音拼貼 | 每支 `3-5s`，一張卡內三個框 | 三個平行結果、三個視角、三個範例、錯／改／對 | 需要觀眾依序讀完三個框的順序流程 |
| 素材優先拼貼 | `3-5s` | 高品質畫面、圖本身就是內容：單片、二格、三格或四格動態卡 | 硬把說明文字、標籤、圖表塞到漂亮畫面上 |
| 長素材影片 | 素材遠長於目標時長 | 診斷、裁切、加速、拆分、或使用者指定區間 | 盲目把整段壓進 `3s` 或 `5s` |

規劃時用這套「動態角色」詞彙：

- **操作證明**：秀出確切動作與結果狀態。
- **過程壓縮**：秀出從起點到結果的一段小轉變。
- **Before/after**：用轉場讓差異可信。
- **平行證據**：把多個結果並排秀。
- **氛圍補充**：靜態卡承載資訊，動態補上場所、質感或真實感。

如果一支素材同時扛不只一個角色，挑最強的一個或拆開。不要把一則短影音塞太滿。

## 三連短影音拼貼

當使用者有三支短片、三個生成結果、三個產品狀態、三段遊戲片段、或三個視角、而它們合起來比分開更強時，用三連拼貼。

建議結構：

1. **純三欄／三帶影片拼貼**：幾乎沒有文字；片段本身就是內容時用。
2. **標題＋三支影片**：頂部一句鉤子，下面三個帶標籤的框；適合當 IG 輪播首圖。
3. **雜誌混排拼貼**：不對稱的框加標籤、短結論或編號圖說；適合教學、指南、產品更新。

選幾何前先判斷三支片段的關係：

- **平行比較**：A / B / C。
- **過程階段**：before / during / after。
- **結果展示**：三個生成或測試輸出。
- **修正流程**：wrong / fix / result。
- **多視角**：總覽 / 細節 / 結果。

標籤保持短：`01 / SETUP`、`02 / ACTION`、`03 / RESULT`。別把拼貼變成三段小小的全螢幕錄影。每個框都裁在證據區周圍。

## 素材優先拼貼

當使用者提供好畫面、希望短影音表現得像會動的照片版面、而不是文字卡時用。關鍵抉擇是幾何，不是文案。

支援的形狀：

- **單片**：把一支片段裁成 `4:5` 滿版。最多加一句短標題，放在確認過的安靜區，遠離臉、身體、手、產品或關鍵動態。若要加字，必須遵守 M16 圖主導封面／圖上疊字排版：Editorial serif／宋體、regular-medium 字重、paper-cream 顏色、收斂的字距，且不加預設的整版遮罩。不要為了讓疊字看起來有設計就亂加 kicker、meta、髮絲線、標籤或徽章。若只有一句標題，就讓排版扛版面：依語意斷行、收斂尺寸、字距、對齊與落位。
- **二格**：兩支片段垂直堆疊。除非使用者要求，否則不加字。
- **三格**：三支片段垂直堆疊。不加字；節奏來自畫面。
- **四格**：用 `2 x 2` 的四個 `4:5` 框（1080×1350 卡內每格 `540 x 675`）。每個素材當成真正的 `4:5` 來裁，不是縮成一張小橫圖。

規則：

- 不加模板充填物：不加標籤、數字標、尺標、徽章、字幕或說明性製作文案。
- 素材內嵌的文字是畫面的一部分。除非要求，否則不要在上面再加新字。
- 溝縫保持 `0-12px`；使用者要純拼貼、或素材本身邊界已強時，選無溝縫。
- 先產素材聯絡表，再選裁切位置。有人時保護臉與上半身；有物件時保護焦點特徵。
- 單片疊字遵守 `image-overlay.md`：先做主體地圖、不加整版遮罩、標題放一個安靜區、並做縮圖可讀性檢查。
- 別把單片疊字做成一般字幕。它要像 Editorial 圖主導封面標題，不是影片字幕。
- 別把「少文案」誤解成「可以亂編文案」。少文案仍需要排版與跟主體的刻意關係，但除非使用者要求，agent 不得加新的可見字。
- 若某個裁切保不住主體，寧可換一個拼貼幾何，也不要硬做壞裁切。

## 長影片入料

面對使用者的長影片，不要承諾精準自動亮點偵測。先做低成本診斷，再給建議。

低成本診斷：

1. 用 `ffprobe` 探測時長、解析度、幀率與有無音訊。
2. 產一張稀疏聯絡表：
   - 初步長素材掃描用 `8-12` 幀。
   - 候選 5 秒視窗用 `12-15` 幀。
   - 候選 3 秒視窗用 `8-12` 幀。
3. 除非使用者要求更深分析，否則只看聯絡表。
4. 只辨識明顯結構：黑／空白開場、靜止段、大段落切換、可見結果幀、或多個分開的時刻。

建議型別：

- **裁切**：用一個穩定時間視窗、正常速度。
- **加速＋裁切**：可讀性還能接受時保留一段短過程。
- **拆分／三連拼貼**：用多個平行時刻，而不是把長故事壓縮。
- **要求區間**：聯絡表看不出想要的亮點時。
- **拒做短影音**：素材需要旁白、聲音或長序列時；改建議短影片／GIF。

好用的回覆正規化：

```text
我先粗看了這支影片的資訊量，它不適合整段壓進 5 秒。
建議有兩種：
A. 裁 00:04-00:09，保留關鍵操作和結果
B. 拆成三連短影音拼貼：準備 / 操作 / 結果
你想走哪一種？
```

## 入料決策樹

當使用者提供影片素材：

1. 判斷目標版位：
   - Reels → `5s`
   - 限時動態 → `3s`
2. 分類可能形式：
   - 單則短影音
   - 三連短影音拼貼
   - 長影片入料
3. 探測每個素材：
   - 時長
   - 寬 / 高
   - 幀率
   - 片段是否含多段落、轉場或捲動邊界
4. 素材長或含糊時，先產一張稀疏聯絡表。除非使用者明確需要精準，否則別檢視密集幀序列。
5. 素材比版位時長長時，給建議並問一個精簡問題，除非目標時刻很明顯：

   ```text
   這支影片比版位短影音時長長。粗看更適合：
   A. 裁一段，保持原速
   B. 加速 + 裁切，保留更多過程
   C. 拆成三連短影音拼貼
   ```

6. 素材比版位時長短時，別默默補幀還說它是動態。選一個：
   - 要求更長素材
   - 用較短的版位安全時長
   - 停住末幀，並說明那是停住
7. 素材有可見段落轉場或頁面捲動邊界時，選一個穩定時間視窗或稍微放慢該段。別讓兩個段落同時擠在一個淺裁切裡。
8. 重要視覺焦點含糊時，別猜。問使用者要「可讀性導向放大」、「保留完整脈絡」還是「平衡裁切」。

好用的短素材提示：

```text
這個素材短於目標短影音時長。你想：
A. 換一個更長素材
B. 直接做成較短的短影音
C. 允許末幀停住 / 輕微慢放，並在交付時說明
```

好用的焦點／裁切提示：

```text
這支影片可以有兩種處理：
A. 放大關鍵區域，數字 / UI 更清楚，但會少一點全域性脈絡
B. 保留完整畫面，資訊更全，但手機上細節會小一些
你更想突出哪一個？
```

## 影片當圖框替換

把影片框當圖框處理：

- 保留原卡片版面、邊距、標籤、排版與風格模式。
- 對影片套用你對靜態圖會套的同一套裁切邏輯。
- 影片首幀必須看起來像一張完成的靜態卡片圖。Render MOV 前，先抽首幀、放進卡片，確認：
  - 沒有重要 UI／文字／產品／細節被過度裁切
  - 裁切遵守原圖框規則與安全區
  - 周圍的標題／內文／版面仍符合選定的 recipe
  - 動態不可用時，卡片當靜態圖也成立
- 用 ffmpeg 做等同 `object-fit: cover` 的行為：先裁再縮到圖框。
- 密集 UI 文字必須可讀時，用等同 `object-fit: contain` 的行為：加黑邊縮放或放大框，而不是切掉重要 UI。
- 影片裁切定案後再選代表性關鍵幀；就算動態播放失敗，靜態圖也要有用。
- 把「可看性提升」當選項，不是自動修法。若素材放大、銳化、放慢或把影片框做大會更好，就建議並等使用者確認——焦點優先權不明時尤其如此。

## 預覽優先流程

在產出短影音封包前，一律先確認靜態版本。這省 token 與 render 時間，因為昂貴的動態路徑只在版面／裁切被接受後才跑。

1. 從每個影片素材或選定時間視窗抽首幀：

   ```bash
   ffmpeg -y -ss <start_seconds> -i source.mp4 \
     -frames:v 1 -q:v 2 assets/source-first-frame.jpg
   ```

2. 把那一幀完全當成提供的圖，放進一般 `4:5` 卡片模板。套用跟靜態卡同樣的裁切、object position、標題間距、安全區與密度規則。
3. Render 一張靜態 PNG 預覽。檢視它；互動作業時，render 影片前先給使用者看。
4. 使用者接受預覽後，才用同一組裁切座標與版面幾何 render 版位時長的 MOV。
5. 從 render 好的 MOV 抽關鍵 JPG。挑一張既可讀、當靜態卡也強、又忠於確認裁切的幀。

不要用一套跟靜態預覽不同的「影片版面」。預覽就是合約。

## 聯絡表檢查演演算法

用聯絡表便宜地檢查動態。用命令列工具產出拼貼的幀帶，再只檢視最後那張合成圖。這避免把很多獨立幀載進模型脈絡，讓視覺 QA 快很多。

演演算法：

1. 用 `ffprobe` 探測輸出時長。
2. 選檢視視窗：
   - 最終 MOV → 完整版位時長
   - 有疑慮的素材片段 → 候選裁切視窗
3. 選 `N` 幀。3 秒素材用 `8-12`，5 秒素材用 `12-15`。
4. 取樣率算成 `N / window_duration`。
5. 用 ffmpeg 取樣、把每幀縮到固定縮圖寬、拼成 `cols x rows`。
6. 檢視結果 JPG/PNG：
   - 過度裁切的首幀
   - 段落邊界重疊
   - 讀不清的計數器或 UI 文字
   - 補短片造成的凍結區
   - 非預期的黑邊或比例改變

通用指令：

```bash
ffmpeg -y -ss <start_seconds> -t <window_seconds> -i input.mov \
  -vf "fps=<frame_count>/<window_seconds>,scale=320:-1:flags=lanczos,tile=<cols>x<rows>:padding=12:margin=12:color=white" \
  -frames:v 1 contact-sheet.jpg
```

範例：

```bash
# 3 秒限時動態短影音，9 幀
ffmpeg -y -t 3 -i IMG_LIVE.MOV \
  -vf "fps=9/3,scale=320:-1:flags=lanczos,tile=3x3:padding=12:margin=12:color=white" \
  -frames:v 1 contact-story.jpg

# 5 秒 Reels 短影音，15 幀
ffmpeg -y -t 5 -i IMG_LIVE.MOV \
  -vf "fps=15/5,scale=320:-1:flags=lanczos,tile=5x3:padding=12:margin=12:color=white" \
  -frames:v 1 contact-reels.jpg
```

這個 repo 也有邏輯相同的 wrapper：

```bash
python scripts/make-video-contact-sheet.py IMG_LIVE.MOV contact-reels.jpg --frames 15 --cols 5 --duration 5
```

## 範例：Render 一支 MOV

這個範例把三段既有的橫式螢幕錄影，合成一支直式 `4:5` 三連短影音拼貼素材（畫布 `1080 x 1350`）。

```bash
ffmpeg -y \
  -ss 145 -t 3 -i "Area測試 01.mp4" \
  -ss 49 -t 3 -i "Area 測試 2.mp4" \
  -ss 154 -t 3 -i "Area 測試 3.mp4" \
  -i overlay.png \
  -filter_complex "color=c=0x030611:s=1080x1350:d=3:r=15[bg];[0:v]fps=15,crop=1580:980:344:60,scale=1000:330:force_original_aspect_ratio=increase,crop=1000:330,setsar=1[g];[1:v]fps=15,scale=1000:330:force_original_aspect_ratio=increase,crop=1000:330,setsar=1[a];[2:v]fps=15,scale=1000:330:force_original_aspect_ratio=increase,crop=1000:330,setsar=1[s];[bg][g]overlay=40:190[p1];[p1][a]overlay=40:590[p2];[p2][s]overlay=40:990[p3];[p3][3:v]overlay=0:0" \
  -t 3 -r 15 -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart \
  IMG_TEST_LIVE_RAW.mov
```

IG 優先交付時，把輸出命名為 `<slug>_reels.mov`、封面命名為 `<slug>_cover.jpg`；`IMG_*_LIVE.*` 這種命名來自文末選配的 iOS Live Photo 流程。

若 `ffmpeg` 沒有 `drawtext`，用 ImageMagick 把文字與邊框做成透明 PNG，再在影片 render 時 overlay 那張 PNG。

## 抽出封面關鍵幀

挑最後那張可讀幀當靜態封面：

```bash
ffmpeg -y \
  -ss 2.7 -i IMG_TEST_LIVE_RAW.mov \
  -frames:v 1 -q:v 2 \
  IMG_TEST_LIVE.JPG
```

複製或改名 raw MOV：

```bash
cp IMG_TEST_LIVE_RAW.mov IMG_TEST_LIVE.MOV
```

到這裡，`IMG_TEST_LIVE.MOV` 就是可直接釋出到 IG（Reels／限時動態）的短影音，`IMG_TEST_LIVE.JPG` 是封面縮圖／靜態備援。（選配）若要 iPhone Live Photo，再依附錄打包 `.pvt`。

## 驗證

檢查尺寸與時長：

```bash
ffprobe -v error \
  -show_entries stream=width,height,r_frame_rate \
  -show_entries format=duration,size \
  -of default=noprint_wrappers=1 \
  IMG_TEST_LIVE.MOV
```

預期（4:5 預設；9:16 全屏封面則 height=1920）：

```text
width=1080
height=1350
r_frame_rate=<chosen fps>
duration=<版位時長>
```

然後從最終 MOV 產一張聯絡表，只檢視那一張圖：

```bash
python scripts/make-video-contact-sheet.py IMG_TEST_LIVE.MOV contact-final.jpg --frames 15 --cols 5 --duration 5
```

限時動態 `3s` 用較少幀：

```bash
python scripts/make-video-contact-sheet.py IMG_TEST_LIVE.MOV contact-final.jpg --frames 9 --cols 3 --duration 3
```

第一格要滿足靜態卡規則。後面的格子要秀出動態，且沒有段落邊界重疊、非預期凍結或讀不清的焦點內容。

## 版位說明

### Reels（IG 短影音）

當動態本身就是鉤子時，把短影音當第一張（封面）用。

時長：

- 除非使用者要更短，否則用 `5s`。
- 素材較長時，可讀 demo 優先只裁切；使用者想保留更多過程時用加速＋裁切。
- 素材較短時，要求更多素材或清楚說明任何停住幀。

好的首圖結構：

- 靜態封面在縮圖尺寸下清楚。
- 動態先揭示程式生成速度，再揭示可跑的結果。
- 末幀是最強的結果狀態。

混合貼文：

1. 靜態 `4:5` 封面。
2. 文字＋圖說明卡。
3. 三連結果短影音拼貼。
4. 個別結果卡。
5. 速度／評測矩陣。

### 限時動態（Story）

限時動態走 9:16 全屏，釋出路徑是 IG app（手機）。

觀察到的行為：

- 手機上傳可保留短影音動態。
- 標題與互動鈕（回覆列、傳送訊息、貼圖）會蓋住邊緣，所以主標與 CTA 要落在中央安全帶內。
- 短封面時長維持在 `3s` 以內。

建議退路：

- 文章／貼文內文卡保留靜態 `4:5` 圖。
- 需要桌機／網頁釋出路徑時，用 GIF 或短影片。
- 動態卡很重要時，從手機直接發成限時動態／Reels。

## 疑難排解

若結果／demo 區看起來像兩支影片疊在一起：

- 先檢視素材片段的聯絡表。若素材在網頁段落間捲動，淺裁切會同時秀出一段結尾與下一段開頭。
- 別用加遮罩或更多 overlay 來修。
- 選更好的時間視窗、把結果框做高、或把一段較短的穩定片段放慢到目標時長。
- 網頁 demo：讓 Hero 短暫可見，再允許受控捲動。除非 Hero 本身就是結果，否則別把整支短影音花在 Hero 上。

若短影音匯入後不會動（例如轉存 GIF／Live Photo 版本時）：

- 時長維持在目標版位上限內：Reels `5s`、限時動態 `3s`。
- 用 H.264 MOV 與 `yuv420p`；螢幕錄影用 `24-30fps`，簡單圖形用 `12-15fps`。
- 確保封面關鍵照與 MOV 來自同一畫布比例與尺寸。

若 `uvx`（附錄的選配工具）在沙箱內失敗：

- 用可寫的 `UV_CACHE_DIR` 與 `UV_TOOL_DIR`。
- 若失敗跟網路或 macOS 系統設定有關，經使用者同意後在沙箱外執行。

## 案例研究：MIMO UltraSpeed 卡的教訓

這一節記錄製作 MIMO UltraSpeed 短影音卡時遇到的問題，留作未來螢幕錄影型短影音的可重用檢查清單。這是一個 legacy `3:4`（`1080 x 1440`）的建置紀錄；今天的預設是 `4:5`（`1080 x 1350`，動態貼文／輪播）或 `9:16`（`1080 x 1920`，全屏限時動態／Reels），採用時請據此重新流動幾何。

### 最終可用版面

被接受的卡片用了 Swiss International 處理：

- 畫布：`1080 x 1440`，`3:4`（legacy）
- FPS：`30`
- Codec：H.264 MOV，`yuv420p`
- 背景：off-white `#fafaf8`
- 強調色：IKB blue `#002FA7`
- 結構：
  - 上：短標題與一行脈絡。
  - 中小：過程／token 速度帶。
  - 下大：結果 demo 帶。
  - 頁尾：精簡事實資料。

被接受的幾何是：

```text
token strip:  x=64, y=360, w=956, h=327
result strip: x=64, y=744, w=956, h=595
```

重要的編輯決策：**結果 demo 要是較大的證據塊**。token 帶只需要證明速度與動態，不該主宰整頁。

### 不要加合成的指標

做速度測試時，別在來源錄影旁邊自己編一個大數字。

不好：

- 加一個獨立的動畫計數器。
- 平台計數器已經看得見了，還把 `tokens/s` 重打成一個設計過的 KPI 塊。

好：

- 從來源影片裁出真實的平台速度面板。
- 若不清楚，放大裁切並輕微銳化。
- 保留來源 UI 當證據；別用裝飾性指標取代它。

### 先靜態預覽再做短影音

影片卡先產一張靜態預覽幀確認裁切。別直接跳到最終輸出。

建議預覽流程：

```bash
mkdir -p /private/tmp/mimo-check

ffmpeg -y -i "process.mp4" \
  -vf "fps=1,scale=481:-1,tile=6x1" \
  -frames:v 1 /private/tmp/mimo-check/process_contact.jpg

ffmpeg -y -i "result.mp4" \
  -vf "fps=1,scale=481:-1,tile=6x1" \
  -frames:v 1 /private/tmp/mimo-check/result_contact.jpg
```

選裁切座標前先檢視這些聯絡表。這個 MIMO 案例就是跳過這步才裁錯好幾輪。

### Token 帶裁切

觀察到的問題：

- 第一次 token 帶裁切保留太多瀏覽器空白。
- 真正的 `tokens/s` 數字又小又糊。
- 後來的裁切只保留數字，卻失去了「正在生成程式碼」的感覺。

接受的折衷：

- 裁程式碼窗底部加上真實的 `tokens/s` 面板。
- 在速度數字上方留一點生成中的文字。
- 避開錄影後段切到右側預覽窗的部分。

`1924 x 1080` 過程錄影最終採用的裁切：

```text
crop=760:260:690:715
scale=956:327
unsharp=5:5:0.45
```

範例 filter：

```bash
ffmpeg -y -t 5 -i "5 秒-過程.mp4" \
  -vf "fps=30,trim=0:5,setpts=PTS-STARTPTS,crop=760:260:690:715,scale=956:327:flags=lanczos,unsharp=5:5:0.45,setsar=1" \
  token-preview.mov
```

注意：

- 來源錄影 bitrate 低時，放大有助構圖但救不回真實細節。
- 寧可要一支新的高 bitrate 螢幕錄影，也別過度銳化。
- 目標時長比可用過程段長時，要求更長素材或明確說明任何停住幀。別默默補靜態幀還說它全程動態。

### 結果 demo 裁切

觀察到的問題：

- 把結果 demo 裁成很扁的水平帶，會讓網頁段落轉場看起來像影片疊在一起。
- 來源網頁捲動在邊界附近自然會同時秀兩段。很淺的裁切會放大這點，看起來像壞掉。
- 用 `force_original_aspect_ratio=increase` 加很緊的垂直裁切，會改變表面上的捲動節奏。

接受的做法：

- 給結果 demo 較大的區域。
- 盡量保留來源的完整垂直結構。
- `16:10` 風格錄影盡量用全幀縮放。
- 來源寬度改變時，只中央裁切水平邊，不裁垂直內容。
- 時間視窗選擇跟裁切一樣重要。5 秒來源若含 Hero → 捲動 → 資料段，就選一個能秀出想要故事、又不過度突兀跨越段落邊界的視窗。

較新的 `1924 x 1080` 5 秒結果來源，接受的裁切是：

```text
crop=1736:1080:88:0
scale=956:595
```

這把較寬的螢幕錄影中央裁到接近先前 16:10 視野，再縮排卡片。

已經裁好的 `1736 x 1080` 結果來源，不要再套 `x=88` 中央裁切。用：

```text
crop=1736:1080:0:0
scale=956:595
```

MIMO 測試觀察到的修正：

- Test 1 遊戲前有標題／開場畫面。修法：跳過前 `0.35s`，讓短影音從真正的遊戲結果開始。
- Test 2 有長 Hero 加捲動。整段 `0-5s` 視窗讓段落邊界看起來重疊；純 `0-2.8s` 視窗又移除了捲動。修法：取 `1.0-5.2s` 輕微拉伸成 `5s`，短暫保留 Hero 再捲動。
- Test 3 穩定，因為它前幾秒大多停在 Hero／結果狀態。

範例時間 filter：

```text
# 只裁切，正常速度
trim=start=0:end=5,setpts=PTS-STARTPTS

# 在遊戲／demo 開始前跳過一個開場幀
trim=start=0.35:end=5.35,setpts=PTS-STARTPTS,tpad=stop_mode=clone:stop_duration=0.5

# 把 4.2s 放進 5s 短影音，同時保留後面的網頁捲動
trim=start=1.0:end=5.2,setpts=(5/4.2)*(PTS-STARTPTS)
```

### 時長規則

承諾短影音時長前，一律先驗證來源時長：

```bash
ffprobe -v error \
  -show_entries format=filename,duration,size \
  -show_entries stream=index,codec_type,codec_name,width,height,r_frame_rate,duration \
  -of json "source.mp4"
```

5 秒短影音，兩條視覺軌理想上都應至少 5 秒。

只有清楚說明時才可接受的替代：

- 上方過程影片在可用段之後停住末幀。
- 上方過程影片延續進預覽模式。
- 用較短的短影音時長。

別把一個大多是補幀的檔案叫「真正 5 秒」。用幀數計數驗證輸出：

```bash
ffprobe -v error -count_frames -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,duration,nb_read_frames \
  -show_entries format=duration,size \
  -of default=noprint_wrappers=1 \
  IMG_MIMO_AD_V3_5S_LIVE.MOV
```

5 秒 @ 30fps 的預期：

```text
width=1080
height=1440
r_frame_rate=30/1
duration=5.000000
nb_read_frames=150
```

### 最終 5 秒 MIMO 指令正規化

這個正規化把一支 5 秒過程錄影與一支 5 秒結果錄影，合成被接受的卡片版面。

```bash
ffmpeg -y \
  -t 5 -i "5 秒-過程.mp4" \
  -t 5 -i "5 秒-結果.mp4" \
  -i overlay.png \
  -filter_complex "color=c=0xfafaf8:s=1080x1440:d=5:r=30[bg];[0:v]fps=30,trim=0:5,setpts=PTS-STARTPTS,crop=760:260:690:715,scale=956:327:flags=lanczos,unsharp=5:5:0.45,setsar=1[token];[1:v]fps=30,trim=0:5,setpts=PTS-STARTPTS,crop=1736:1080:88:0,scale=956:595:flags=lanczos,setsar=1[result];[bg][token]overlay=64:360[p1];[p1][result]overlay=64:744[p2];[p2][2:v]overlay=0:0" \
  -t 5 -r 30 -an -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart \
  IMG_MIMO_AD_V3_5S_LIVE.MOV
```

然後抽關鍵封面圖（`.pvt` 打包為選配，見附錄）：

```bash
ffmpeg -y -ss 0.8 -i IMG_MIMO_AD_V3_5S_LIVE.MOV \
  -frames:v 1 -q:v 2 IMG_MIMO_AD_V3_5S_LIVE.JPG
```

### 失敗模式與修法

| 失敗 | 可能原因 | 修法 |
| --- | --- | --- |
| 結果 demo 看起來重疊 | 裁切太淺；來源頁面正跨越段落邊界 | 把結果區做高；保留完整垂直來源；檢視聯絡表 |
| 結果 demo 感覺凍結 | 一段短來源視窗被拉伸太多 | 用更後面／更大的時間視窗，或只裁切 |
| Token 數字讀不清 | 裁切含太多空白瀏覽器區，或來源 bitrate 低 | 更貼近真實平台計數器裁切；需要時要求更高 bitrate 來源 |
| Token 帶失去「生成中」感 | 裁切只秀數字面板 | 在速度數字上方納入生成程式碼窗底部 |
| 5 秒輸出會播但某區凍結 | 一段來源片段短於目標時長，或被 `tpad` 補過 | 用真正 5 秒的來源片段，或明確標註停住 |
| iPhone 匯入成分開檔案（走 Live Photo 附錄時） | AirDrop 傳的是鬆散 JPG/MOV | 只 AirDrop `.pvt` 封包 |
| 風格走味 | 卡片忽略本 skill 的 Swiss 規則 | 用 off-white、黑、一個 IKB 強調色、直角模組、不用陰影／毛玻璃／圓角卡 |

### 可重用的拇指規則

螢幕錄影型社群短影音：

1. 先檢視來源時長、解析度與 bitrate。
2. 選裁切前先做聯絡表。
3. 最終輸出前先做靜態預覽。
4. 讓結果／demo 區當主要視覺證據。
5. 過程／token 區保持小但可讀。
6. 保留真實 UI 計數器，別自己設計假的。
7. Render 後驗證幀數。
8. （選配 iOS Live Photo）用 `.pvt` 打包做 AirDrop 測試。

---

## 附錄：iOS Live Photo（選配，非 IG 原生釋出格式）

以上主線都是產出可直接釋出到 IG（Reels／限時動態）的 MOV。只有當使用者特別要 iPhone Live Photo（例如鎖定畫面、相機膠卷，或非 IG 用途）時，才走這一節。

**IG 不原生吃 Live Photo／`.pvt`。** 這是 iOS 專屬格式，必須傳到 iPhone、從手機相簿使用。桌機／網頁上傳通常把 `.pvt` 當未知封包，或拆成分開的來源檔案，因此不能當主要 Live Photo 釋出流程。實務可行路徑：

```text
Mac Finder -> 把 .pvt 當單一專案 AirDrop -> iPhone 相簿 -> 從其他 App 使用
```

### 關鍵發現（.pvt 打包）

不要把鬆散的 `JPG + MOV` 當兩個分開檔案 AirDrop，還期待 iPhone 相簿自動合併它們。

即使兩個檔案都含相符的 Apple Live Photo metadata，一般多檔 AirDrop 路徑仍可能把它們匯入成分開資產。要可靠測試與傳輸，就把這一對打包成單一 `.pvt` 封包。

### 工具：makelive

主要工具：

- [`RhetTbull/makelive`](https://github.com/RhetTbull/makelive)

選它的原因：

- 它把 Apple Live Photo content identifier metadata 寫進照片與影片兩邊的資源。
- 它可以透過 `save_live_photo_pair_as_pvt` 建立 `.pvt` 封包。
- `.pvt` 封包對 AirDrop 與其他可能不保留鬆散照片／影片關聯的傳輸路徑特別有用。

用 `uv` 安裝或執行：

```bash
uvx --from 'makelive==0.7.0' makelive IMG_TEST_LIVE.JPG IMG_TEST_LIVE.MOV
```

釘住版本（截至 2026-07 為 `0.7.0`），避免這種小眾套件 API 變動造成破壞。

`.pvt` 用 Python API：

```bash
uvx --from makelive python -c "from makelive import save_live_photo_pair_as_pvt; asset_id, pvt_path = save_live_photo_pair_as_pvt('IMG_TEST_LIVE.JPG', 'IMG_TEST_LIVE.MOV'); print(asset_id); print(pvt_path)"
```

在受限沙箱內執行時，設定可寫的 cache／tool 目錄：

```bash
UV_CACHE_DIR=/private/tmp/uv-cache \
UV_TOOL_DIR=/private/tmp/uv-tools \
uvx --from makelive python -c "from makelive import save_live_photo_pair_as_pvt; asset_id, pvt_path = save_live_photo_pair_as_pvt('IMG_TEST_LIVE.JPG', 'IMG_TEST_LIVE.MOV'); print(asset_id); print(pvt_path)"
```

這個 repo 也有一個通用 wrapper：

```bash
UV_CACHE_DIR=/private/tmp/uv-cache \
UV_TOOL_DIR=/private/tmp/uv-tools \
uvx --from makelive python scripts/package-live-photo.py IMG_TEST_LIVE.JPG IMG_TEST_LIVE.MOV
```

有 wrapper 時優先用它，讓每次執行都一致地印出 asset id 與 `.pvt` 路徑。

### Swift Metadata 輔助

當 `makelive` 不可用、或你需要手動加 Apple Live Photo metadata 時，這個 repo 含兩支 Swift 指令碼。它們需要 macOS 加系統 Swift 工具鏈（Xcode 或 Command Line Tools）與 AVFoundation。

把 MakerNote asset identifier 寫進 JPEG：

```bash
swift scripts/add-livephoto-maker-note.swift input.jpg output.jpg <asset-id>
```

把 QuickTime content identifier 與 still-image-time metadata 寫進 MOV：

```bash
swift scripts/add-livephoto-mov-metadata.swift input.mov output.mov <asset-id>
```

兩支指令碼都要收到同一個 `<asset-id>`（一個 UUID 字串），iPhone 相簿才會把 JPG 與 MOV 配成一個 Live Photo。通常 `makelive` 會自動處理；這兩支 Swift 指令碼是 Python/uvx 被擋時的 fallback。

只在除錯 metadata 或 `makelive` 不可用時才用這兩支 Swift 輔助。

### 打包 .pvt 與驗證

抽好封面關鍵照後，建立 `.pvt` 封包：

```bash
uvx --from makelive python -c "from makelive import save_live_photo_pair_as_pvt; asset_id, pvt_path = save_live_photo_pair_as_pvt('IMG_TEST_LIVE.JPG', 'IMG_TEST_LIVE.MOV'); print(asset_id); print(pvt_path)"
```

檢視 `.pvt` 封包：

```bash
find IMG_TEST_LIVE.pvt -maxdepth 2 -type f -print
plutil -p IMG_TEST_LIVE.pvt/metadata.plist
```

預期封包形狀：

```text
IMG_TEST_LIVE.pvt/IMG_TEST_LIVE.JPG
IMG_TEST_LIVE.pvt/IMG_TEST_LIVE.MOV
IMG_TEST_LIVE.pvt/metadata.plist
```

### iPhone 測試

用封包做 AirDrop：

1. 在 Finder 選 `IMG_TEST_LIVE.pvt` 當一個專案。
2. AirDrop 到 iPhone。
3. 開相簿，確認它匯入成一個 Live Photo 資產。
4. 長按確認動態播放。

別把這些一起選來傳：

```text
IMG_TEST_LIVE.JPG
IMG_TEST_LIVE.MOV
IMG_TEST_LIVE_RAW.mov
```

那條路徑可能產生三個分開的 iPhone 相簿資產。

不要承諾 `.pvt` 可桌機釋出。電腦端上傳路徑通常把 `.pvt` 當未知封包或分開來源檔案，無法當主要 Live Photo 釋出流程。

### iOS Live Photo 疑難排解

若 iPhone 相簿秀出分開的 JPG 與 MOV 資產：

- 你八成 AirDrop 了鬆散檔案，不是 `.pvt` 封包。
- 用 `save_live_photo_pair_as_pvt` 重建 `.pvt`。
- 只 AirDrop `.pvt` 那個專案。

若 Live Photo 匯入了但不會動：

- 用 H.264 MOV 與 `yuv420p`；螢幕錄影用 `24-30fps`，簡單圖形用 `12-15fps`。
- 確保關鍵照與 MOV 來自同一畫布比例與尺寸。
- 用 `makelive` 重建，讓 identifier 一致。

### 選配本機指令碼

這個 repo 含兩支測試期間做的小 Swift 輔助：

- `scripts/add-livephoto-maker-note.swift`
- `scripts/add-livephoto-mov-metadata.swift`

它們可以手動寫入 Apple 風格 identifier 與帶時間的 metadata，但建議的生產路徑仍是 `makelive`，因為它也會建立 AirDrop 型傳輸測試所需的 `.pvt` 封包。

只在除錯 metadata 或 `makelive` 不可用時用這兩支 Swift 輔助。
