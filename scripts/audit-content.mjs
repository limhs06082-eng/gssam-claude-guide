/**
 * 콘텐츠 감사 스크립트 (메인 편집자용)
 *
 *   node scripts/audit-content.mjs
 *
 * check-content.mjs 가 "규칙 위반"을 잡는다면, 이 스크립트는
 * "여러 사람이 나눠 쓴 결과가 한 사람이 쓴 것처럼 보이는가"를 본다.
 *
 *  1. 상자 밀도   — 한 페이지에 배경/테두리를 가진 컴포넌트가 몇 개인가
 *  2. 컴포넌트 사용 편차 — 과정마다 컴포넌트를 쓰는 방식이 다른가
 *  3. 구조 일관성 — H2 제목이 과정마다 제각각인가
 *  4. 난이도 분포 — level/time 이 과정 성격과 맞는가
 *  5. 문체       — 해요체, 이모지, 과도한 굵게, 긴 문단
 *  6. 중복       — 두 페이지가 같은 내용을 반복하는가
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { courses, getAllPages } from "../lib/navigation.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");

/** 배경색이나 테두리를 가져 "상자"로 보이는 컴포넌트 */
const BOXED = ["Analogy", "TeacherTip", "PromptBox", "Warning", "Choice"];
/** 상자가 아닌 컴포넌트 */
const FLAT = ["Steps", "ScreenGuide", "Troubleshoot", "Success", "Screenshot", "Note"];

const pages = [];
for (const p of getAllPages()) {
  const file = path.join(CONTENT, p.course.slug, `${p.slug}.mdx`);
  let raw;
  try {
    raw = await fs.readFile(file, "utf8");
  } catch {
    continue;
  }
  const { content: body, data } = matter(raw);
  const comps = {};
  for (const m of body.matchAll(/<([A-Z][A-Za-z]*)\b/g)) comps[m[1]] = (comps[m[1]] || 0) + 1;
  const h2 = [];
  let fence = false;
  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    if (fence) continue;
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) h2.push(m[1].trim());
  }
  const prose = body
    .replace(/<[^>]*>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|~-]+/g, " ");
  pages.push({
    ...p,
    body,
    prose,
    meta: data,
    comps,
    h2,
    boxes: BOXED.reduce((n, c) => n + (comps[c] || 0), 0),
    flats: FLAT.reduce((n, c) => n + (comps[c] || 0), 0),
    words: prose.split(/\s+/).filter(Boolean).length,
  });
}

const line = (s = "") => console.log(s);
const bar = () => line("-".repeat(72));

line(`감사 대상: ${pages.length}개 페이지, ${courses.length}개 과정`);

/* 1. 상자 밀도 */
bar();
line("1. 상자 밀도 (배경/테두리를 가진 컴포넌트 수)");
const heavy = pages.filter((p) => p.boxes >= 5).sort((a, b) => b.boxes - a.boxes);
const dist = {};
for (const p of pages) dist[p.boxes] = (dist[p.boxes] || 0) + 1;
line(
  "   분포: " +
    Object.keys(dist)
      .sort((a, b) => a - b)
      .map((k) => `${k}개=${dist[k]}쪽`)
      .join(", "),
);
line(`   평균 ${(pages.reduce((n, p) => n + p.boxes, 0) / pages.length).toFixed(1)}개`);
if (heavy.length) {
  line(`   상자 5개 이상 (검토 필요): ${heavy.length}쪽`);
  for (const p of heavy.slice(0, 12)) {
    const used = BOXED.filter((c) => p.comps[c]).map((c) => `${c}×${p.comps[c]}`).join(" ");
    line(`     ${p.course.slug}/${p.slug} — ${p.boxes}개 (${used})`);
  }
} else {
  line("   상자 5개 이상인 페이지 없음");
}

/* 2. 과정별 컴포넌트 사용 */
bar();
line("2. 과정별 컴포넌트 사용 (페이지당 평균)");
for (const c of courses) {
  const ps = pages.filter((p) => p.course.slug === c.slug);
  if (!ps.length) continue;
  const avg = (name) => (ps.reduce((n, p) => n + (p.comps[name] || 0), 0) / ps.length).toFixed(1);
  line(
    `   ${c.slug.padEnd(16)} ${String(ps.length).padStart(3)}쪽  ` +
      `상자 ${(ps.reduce((n, p) => n + p.boxes, 0) / ps.length).toFixed(1)}  ` +
      `Steps ${avg("Steps")}  PromptBox ${avg("PromptBox")}  Tip ${avg("TeacherTip")}  ` +
      `Analogy ${avg("Analogy")}  Warning ${avg("Warning")}`,
  );
}

/* 3. H2 구조 */
bar();
line("3. H2 제목 (전체에서 3회 이상 쓰인 것)");
const h2count = {};
for (const p of pages) for (const h of p.h2) h2count[h] = (h2count[h] || 0) + 1;
const common = Object.entries(h2count).filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]);
for (const [h, n] of common.slice(0, 16)) line(`   ${String(n).padStart(4)}회  ${h}`);
const unique = Object.entries(h2count).filter(([, n]) => n === 1).length;
line(`   1회만 쓰인 제목: ${unique}개 (페이지 고유 소제목)`);

/* 4. 난이도와 시간 */
bar();
line("4. 난이도와 예상 시간");
for (const c of courses) {
  const ps = pages.filter((p) => p.course.slug === c.slug);
  if (!ps.length) continue;
  const adv = ps.filter((p) => p.meta.level === "advanced").length;
  const times = ps.map((p) => p.meta.time).filter((t) => typeof t === "number");
  const total = times.reduce((a, b) => a + b, 0);
  line(
    `   ${c.slug.padEnd(16)} 심화 ${String(adv).padStart(2)}/${String(ps.length).padStart(2)}   ` +
      `총 ${String(total).padStart(3)}분   ` +
      `쪽당 ${(total / ps.length).toFixed(1)}분   ` +
      `분량 ${Math.round(ps.reduce((n, p) => n + p.words, 0) / ps.length)}어절`,
  );
}

/* 5. 문체 */
bar();
line("5. 문체 점검");
const styleHits = { 해요체: [], 이모지: [], 긴문단: [], 굵게과다: [] };
/** 따옴표 안은 사용자가 Claude에게 하는 말이라 해요체가 자연스럽다. 검사에서 뺀다. */
const stripQuotes = (t) => t.replace(/"[^"]*"/g, " ").replace(/[“][^”]*[”]/g, " ");
const HAEYO = /(?:해요|이에요|예요|거예요|돼요|봐요|같아요|어요)\.(?:\s|$)/;
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
for (const p of pages) {
  if (HAEYO.test(stripQuotes(p.prose))) styleHits.해요체.push(`${p.course.slug}/${p.slug}`);
  if (EMOJI.test(p.body)) styleHits.이모지.push(`${p.course.slug}/${p.slug}`);
  const bolds = (p.body.match(/\*\*[^*]+\*\*/g) || []).length;
  if (bolds > 12) styleHits.굵게과다.push(`${p.course.slug}/${p.slug} (${bolds})`);
  // 문단만 센다. 번호 목록, 표, 코드, JSX 태그가 섞인 덩어리는 문단이 아니다.
  for (const para of p.body.split(/\n\s*\n/)) {
    const t = para.trim();
    if (!t) continue;
    const lines = t.split("\n").map((l) => l.trim());
    if (lines.some((l) => /^(\d+\.|[-*+])\s/.test(l))) continue;
    if (lines.some((l) => /^<\/?[A-Za-z]/.test(l))) continue;
    if (/^(#|\||```|>)/.test(t)) continue;
    const sentences = (t.match(/[.?!]\s|[.?!]$/g) || []).length;
    if (sentences >= 5) {
      styleHits.긴문단.push(`${p.course.slug}/${p.slug} (${sentences}문장)`);
      break;
    }
  }
}
for (const [k, v] of Object.entries(styleHits)) {
  line(`   ${k}: ${v.length}건${v.length ? " → " + v.slice(0, 6).join(", ") + (v.length > 6 ? " …" : "") : ""}`);
}

/* 6. 중복 */
bar();
line("6. 페이지 간 내용 중복 (3어절 묶음 자카드 유사도)");
const shingle = (text) => {
  const w = text.replace(/\s+/g, " ").split(" ").filter(Boolean);
  const s = new Set();
  for (let i = 0; i + 3 <= w.length; i++) s.add(w.slice(i, i + 3).join(" "));
  return s;
};
const sets = pages.map((p) => ({ p, s: shingle(p.prose) }));
const pairs = [];
for (let i = 0; i < sets.length; i++) {
  for (let j = i + 1; j < sets.length; j++) {
    const a = sets[i].s;
    const b = sets[j].s;
    if (!a.size || !b.size) continue;
    let inter = 0;
    const [small, big] = a.size < b.size ? [a, b] : [b, a];
    for (const v of small) if (big.has(v)) inter++;
    const jac = inter / (a.size + b.size - inter);
    if (jac >= 0.06) pairs.push({ jac, a: sets[i].p, b: sets[j].p });
  }
}
pairs.sort((x, y) => y.jac - x.jac);
if (!pairs.length) line("   유사도 0.06 이상인 쌍 없음");
for (const { jac, a, b } of pairs.slice(0, 15)) {
  line(`   ${(jac * 100).toFixed(1)}%  ${a.course.slug}/${a.slug}  ↔  ${b.course.slug}/${b.slug}`);
}
line(`   전체 ${pairs.length}쌍이 임계값 이상`);

bar();
line("감사 완료");
