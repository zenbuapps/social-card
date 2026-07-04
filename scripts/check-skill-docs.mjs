#!/usr/bin/env node
// 在地化守門員：確保這份 fork 維持「繁體中文 + 台灣 Instagram」的核心不變式：
//   1) 中國平台專有名詞已全部移除
//   2) 舊 board class / 舊版位尺寸已全部改掉
//   3) IG 版位（4:5 / 1:1 / 9:16）與台灣平台字樣已就位
//   4) 兩套視覺系統、任務資料夾守則、fork 出處聲明都還在
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const checks = [];
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const refFiles = fs
  .readdirSync(path.join(ROOT, "references"))
  .filter((f) => f.endsWith(".md"))
  .map((f) => `references/${f}`);
const proseFiles = ["SKILL.md", "README.md", "AGENT.md", "PRODUCT.md", "HANDOFF.md", ...refFiles];

function mustInclude(file, needle, label) {
  checks.push(() => {
    const ok = read(file).includes(needle);
    return { ok, label, detail: ok ? `${file} 含有 "${needle}"` : `${file} 必須含有 "${needle}"` };
  });
}
function mustNotMatchFiles(files, pattern, label) {
  checks.push(() => {
    const hits = [];
    for (const f of files) {
      const m = read(f).match(pattern);
      if (m) hits.push(`${f}: "${m[0]}"`);
    }
    return {
      ok: hits.length === 0,
      label,
      detail: hits.length === 0 ? `無 ${pattern} 命中` : `不該出現 ${pattern} → ${hits.join(" · ")}`,
    };
  });
}

// 1) 中國平台專有名詞：全數移除
mustNotMatchFiles(proseFiles, /小红书|小紅書|Xiaohongshu|Rednote|微信|WeChat|公众号|公眾號/, "中國平台名稱已全部移除");

// 2) 舊 board class / 舊版位尺寸 / 舊 id：全數改掉（含模板）。
//    例外：references/live-photo-production.md 保留一段標註為 legacy 3:4 的
//    MIMO 案例研究（含當時的 ffmpeg 疊圖幾何），僅該檔的舊尺寸字面允許存在，
//    但仍不得出現舊 board class / 舊 id。
const opsFiles = [
  ...proseFiles.filter((f) => f !== "references/live-photo-production.md"),
  "assets/template-editorial-card.html",
  "assets/template-swiss-card.html",
];
mustNotMatchFiles(
  opsFiles,
  /poster[ .](xhs|wide)|1080[x×]1440|2100 ?[x×] ?900|id="(xhs|wechat)-/,
  "舊 board class / 舊尺寸 / 舊 id 已全部改掉",
);
mustNotMatchFiles(
  ["references/live-photo-production.md"],
  /poster[ .](xhs|wide)|id="(xhs|wechat)-/,
  "live-photo 無舊 board class / 舊 id（legacy 案例的舊尺寸字面允許保留）",
);

// 3) IG 版位與台灣平台字樣就位
mustInclude("references/platform-specs.md", "1080 × 1350", "platform-specs 有 4:5 貼文尺寸");
mustInclude("references/platform-specs.md", "1080 × 1920", "platform-specs 有 9:16 限動尺寸");
mustInclude("references/platform-specs.md", "限時動態", "platform-specs 有限時動態段落");
mustInclude("SKILL.md", "Instagram", "SKILL.md 以 Instagram 為主");
mustInclude("SKILL.md", "4:5", "SKILL.md 提及 4:5 貼文");
mustInclude("SKILL.md", "9:16", "SKILL.md 提及 9:16 限動");

// 4) 模板 board：新 class 與新尺寸
for (const t of ["assets/template-editorial-card.html", "assets/template-swiss-card.html"]) {
  mustInclude(t, "poster.post", `${t} 有 .poster.post`);
  mustInclude(t, "poster.story", `${t} 有 .poster.story`);
  mustInclude(t, "height: 1350px", `${t} post 高度 1350`);
  mustInclude(t, "height: 1920px", `${t} story 高度 1920`);
}

// 5) 骨幹不變式：任務資料夾守則、兩套視覺系統
mustInclude("SKILL.md", "local-tests/", "SKILL.md 保留 local-tests 任務資料夾守則");
mustInclude("SKILL.md", "Editorial", "SKILL.md 保留 Editorial 系統");
mustInclude("SKILL.md", "Swiss", "SKILL.md 保留 Swiss 系統");

// 6) fork 出處聲明
mustInclude("README.md", "op7418/guizang-social-card-skill", "README 保留 fork 出處聲明");
mustInclude("README.md", "zenbuapps/social-card", "README 指向新 repo");

let failed = 0;
for (const run of checks) {
  const r = run();
  console.log(`${r.ok ? "PASS" : "FAIL"} ${r.label}`);
  if (!r.ok) {
    failed += 1;
    console.log(`  ${r.detail}`);
  }
}
if (failed > 0) {
  console.error(`\n${failed} 項文件檢查未通過。`);
  process.exit(1);
}
console.log(`\n${checks.length} 項文件檢查全數通過。`);
