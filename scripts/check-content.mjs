/**
 * 콘텐츠 검사 스크립트
 *
 *   node scripts/check-content.mjs            # 전체 과정
 *   node scripts/check-content.mjs chat cowork # 지정한 과정만
 *
 * 검사 항목
 *  1. navigation.ts의 모든 페이지에 content/{course}/{page}.mdx 파일이 있는가
 *  2. content 폴더에 navigation에 없는 파일(고아 파일)이 있는가
 *  3. frontmatter: description(문자열, 120자 이하), level(beginner|advanced), time(숫자)
 *  4. MDX가 실제로 컴파일되는가 (사이트와 같은 플러그인 사용)
 *  5. 허용된 컴포넌트만 사용했는가
 *  6. 본문에 H1(# )이 없고 H2(## )가 하나 이상 있는가 (제목은 navigation.ts가 담당)
 *  7. 남은 placeholder 표시(TODO, TBD, lorem, 준비 중)가 없는가
 *  8. 내부 링크(/course/page)가 실제 페이지를 가리키는가
 */
import fs from "node:fs/promises";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { courses, getAllPages } from "../lib/navigation.ts";

const ROOT = path.resolve(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");

const ALLOWED_COMPONENTS = new Set([
  "Analogy",
  "TeacherTip",
  "Note",
  "Steps",
  "Step",
  "PromptBox",
  "ScreenGuide",
  "Screenshot",
  "Success",
  "Troubleshoot",
  "Problem",
  "Warning",
  "Choice",
  "Option",
]);

const PLACEHOLDER = /\b(TODO|TBD|FIXME|lorem ipsum)\b|준비 중입니다|작성 예정/i;

const only = new Set(process.argv.slice(2));
const targetCourses = courses.filter((c) => only.size === 0 || only.has(c.slug));
const allHrefs = new Set(getAllPages().map((p) => p.href));
for (const c of courses) allHrefs.add(`/${c.slug}`);

let errors = 0;
let warnings = 0;
const missing = [];
const ok = [];

function err(file, msg) {
  errors++;
  console.log(`  ✗ ${file}: ${msg}`);
}
function warn(file, msg) {
  warnings++;
  console.log(`  ! ${file}: ${msg}`);
}

for (const course of targetCourses) {
  console.log(`\n[${course.slug}] ${course.title}`);
  const dir = path.join(CONTENT, course.slug);
  const pages = getAllPages().filter((p) => p.course.slug === course.slug);

  // 고아 파일
  let files = [];
  try {
    files = (await fs.readdir(dir)).filter((f) => f.endsWith(".mdx"));
  } catch {
    // 폴더 자체가 없음
  }
  const known = new Set([...pages.map((p) => `${p.slug}.mdx`), "index.mdx"]);
  for (const f of files) if (!known.has(f)) warn(`${course.slug}/${f}`, "navigation.ts에 없는 파일입니다");

  for (const page of pages) {
    const rel = `${course.slug}/${page.slug}.mdx`;
    const file = path.join(dir, `${page.slug}.mdx`);
    let raw;
    try {
      raw = await fs.readFile(file, "utf8");
    } catch {
      missing.push(rel);
      continue;
    }
    const { content: body, data } = matter(raw);

    // frontmatter
    if (typeof data.description !== "string" || data.description.trim().length === 0) {
      err(rel, "frontmatter description 이 없습니다");
    } else if (data.description.length > 120) {
      warn(rel, `description 이 깁니다 (${data.description.length}자, 120자 이하 권장)`);
    }
    if (data.level !== "beginner" && data.level !== "advanced") err(rel, "level 은 beginner 또는 advanced 여야 합니다");
    if (typeof data.time !== "number") err(rel, "time(예상 소요 분, 숫자) 이 없습니다");
    if (typeof data.title === "string") warn(rel, "title 은 navigation.ts가 담당합니다. frontmatter의 title은 무시됩니다");

    // 제목 구조
    const lines = body.split("\n");
    let inFence = false;
    let h2 = 0;
    for (const line of lines) {
      if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
      if (inFence) continue;
      if (/^#\s/.test(line)) err(rel, "본문에 H1(# )을 쓰지 마세요. 제목은 자동으로 붙습니다");
      if (/^##\s/.test(line)) h2++;
    }
    if (h2 === 0) err(rel, "H2(## ) 섹션이 하나도 없습니다");

    // placeholder
    const ph = PLACEHOLDER.exec(body);
    if (ph) err(rel, `placeholder 로 보이는 표현이 있습니다: "${ph[0]}"`);

    // 컴포넌트
    for (const m of body.matchAll(/<([A-Z][A-Za-z]*)\b/g)) {
      if (!ALLOWED_COMPONENTS.has(m[1])) err(rel, `허용되지 않은 컴포넌트 <${m[1]}>`);
    }

    // JSX 표현식 (blockJS 로 제거되므로 쓰지 않는다)
    const expr = /=\{/.exec(body);
    if (expr) err(rel, "prop 값에 {} 표현식을 쓰지 마세요. 문자열(\"...\")만 허용됩니다");

    // 내부 링크
    for (const m of body.matchAll(/\]\((\/[^)\s#]+)(#[^)]*)?\)/g)) {
      const href = m[1].replace(/\/$/, "");
      if (!allHrefs.has(href)) err(rel, `내부 링크가 존재하지 않는 페이지를 가리킵니다: ${m[1]}`);
    }

    // 컴파일
    try {
      await compile(body, { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug], outputFormat: "function-body" });
      ok.push(rel);
    } catch (e) {
      err(rel, `MDX 컴파일 실패: ${e.message.split("\n")[0]}`);
    }
  }
}

console.log("\n----------------------------------------");
console.log(`검사한 페이지: ${ok.length + missing.length + errors > 0 ? ok.length : 0} 통과 / 누락 ${missing.length} / 오류 ${errors} / 경고 ${warnings}`);
if (missing.length) {
  console.log("\n아직 없는 페이지:");
  for (const m of missing) console.log(`  - ${m}`);
}
process.exit(errors > 0 ? 1 : 0);
