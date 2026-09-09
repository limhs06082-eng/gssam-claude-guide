/**
 * 실행 기록 추출기
 *
 *   node scripts/extract-orchestration-log.mjs <세션.jsonl> [출력.md]
 *
 * Claude Code 세션 로그에서 이 프로젝트가 실제로 어떻게 진행됐는지를 뽑는다.
 * REVIEW.md의 서술이 맞는지 대조할 수 있는 원본 근거를 만드는 것이 목적이다.
 *
 * 뽑는 것
 *  - 메인 에이전트가 어떤 모델로 돌았는지
 *  - 서브에이전트 위임 내역 (모델, 담당, 지시문 전문)
 *  - 위임 지시문에 6개 필수 항목이 들어 있었는지 (담당 영역 / 수정 가능 파일 /
 *    참고 문서 / 완료 기준 / 금지 영역 / 검증 방법)
 *  - 검증 명령 실행 이력 (check, audit, tsc, lint, build)
 *  - 메인 에이전트가 직접 편집한 파일 목록
 */
import fs from "node:fs";
import readline from "node:readline";

const src = process.argv[2];
const out = process.argv[3];
if (!src) {
  console.error("사용법: node scripts/extract-orchestration-log.mjs <세션.jsonl> [출력.md]");
  process.exit(1);
}

const models = new Map();
const agents = [];
const verifyRuns = [];
const editedByMain = new Map();
let firstTs = null;
let lastTs = null;

/** 위임 지시문에 반드시 있어야 하는 6가지 (AGENTS 운영 원칙) */
const REQUIRED = {
  "담당 영역": /## 담당 영역|## 검토 항목|담당합니다|담당한다/,
  "수정 가능 파일": /## 변경 가능한 파일|## 수정 권한|아래 파일만|이하 파일만|파일만 수정/,
  "참고 문서": /## 반드시 먼저 읽을 것|## 먼저 읽을 것|기준으로 작업/,
  "완료 기준": /## 완료 기준|## 완료 보고|완료 기준과 검증/,
  // "수정·생성하지 말 것"처럼 가운뎃점이 끼는 표기를 모두 잡는다.
  "금지 영역": /수정[·\s]*[^\n]{0,6}하지 말 것|수정하지 마세요|변경하지 않는다|수정 금지|바꾸지 마세요|하지 마세요/,
  "검증 방법": /check-content\.mjs|scripts\/check-content|오류 0/,
};

/**
 * 지시문에서 "소유" 디렉터리만 뽑는다.
 * 참고하라고 언급한 경로(다른 과정 예시, 링크 예시)는 소유가 아니다.
 * 소유는 "변경 가능한 파일" 또는 "수정 권한" 절에만 적혀 있다.
 */
function ownedDirs(prompt) {
  const m = /##\s*(?:변경 가능한 파일|수정 권한)\s*\n([\s\S]*?)(?:\n##\s|$)/.exec(prompt);
  if (!m) return [];
  return [...new Set(m[1].match(/content\/[a-z-]+\//g) || [])];
}

const rl = readline.createInterface({
  input: fs.createReadStream(src, { encoding: "utf8" }),
  crlfDelay: Infinity,
});

for await (const raw of rl) {
  if (!raw.trim()) continue;
  let e;
  try {
    e = JSON.parse(raw);
  } catch {
    continue;
  }
  if (e.timestamp) {
    firstTs ??= e.timestamp;
    lastTs = e.timestamp;
  }

  const msg = e.message;
  if (!msg) continue;

  // 메인 에이전트 모델
  if (msg.role === "assistant" && msg.model) {
    models.set(msg.model, (models.get(msg.model) || 0) + 1);
  }

  const blocks = Array.isArray(msg.content) ? msg.content : [];
  for (const b of blocks) {
    if (b.type !== "tool_use") continue;
    const i = b.input || {};

    // 서브에이전트 위임
    if (b.name === "Agent") {
      const prompt = String(i.prompt || "");
      agents.push({
        id: b.id,
        ts: e.timestamp,
        model: i.model || "(미지정 — 기본값)",
        type: i.subagent_type || "(기본)",
        description: i.description || "",
        background: i.run_in_background === true,
        promptChars: prompt.length,
        prompt,
        has: Object.fromEntries(Object.entries(REQUIRED).map(([k, re]) => [k, re.test(prompt)])),
        dirs: ownedDirs(prompt),
        refs: [...new Set(prompt.match(/content\/[a-z-]+\//g) || [])].filter(
          (d) => !ownedDirs(prompt).includes(d),
        ),
      });
    }

    // 검증 명령
    if (b.name === "Bash" || b.name === "PowerShell") {
      const cmd = String(i.command || "");
      const kinds = [];
      if (/check-content\.mjs|npm run check/.test(cmd)) kinds.push("콘텐츠 검사");
      if (/audit-content\.mjs|npm run audit/.test(cmd)) kinds.push("편집 감사");
      if (/tsc --noEmit/.test(cmd)) kinds.push("타입 검사");
      if (/npm run lint|eslint/.test(cmd)) kinds.push("린트");
      if (/next build|npm run build/.test(cmd)) kinds.push("빌드");
      if (kinds.length) verifyRuns.push({ ts: e.timestamp, kinds: [...new Set(kinds)] });
    }

    // 메인 에이전트가 직접 쓴 파일
    if (b.name === "Write" || b.name === "Edit") {
      const f = String(i.file_path || "").replace(/\\/g, "/").split("클로드 홈페이지/").pop();
      if (f) editedByMain.set(f, (editedByMain.get(f) || 0) + 1);
    }
  }
}

const L = [];
const say = (s = "") => L.push(s);

say("# 실행 기록 (세션 로그에서 자동 추출)");
say();
say("이 문서는 손으로 쓴 것이 아니라 `scripts/extract-orchestration-log.mjs`가");
say("Claude Code 세션 로그를 읽어 만든 것이다. `REVIEW.md`의 서술과 대조하는 용도다.");
say();
say(`- 원본: \`${src.split(/[\\/]/).pop()}\``);
say(`- 기간: ${firstTs} ~ ${lastTs}`);
say(`- 추출 시각: ${new Date().toISOString()}`);
say();

say("## 메인 에이전트 모델");
say();
say("| 모델 | 응답 수 |");
say("| --- | --- |");
for (const [m, n] of [...models.entries()].sort((a, b) => b[1] - a[1])) say(`| ${m} | ${n} |`);
say();

say("## 서브에이전트 위임");
say();
say(`총 ${agents.length}건.`);
say();
say("| # | 시각 | 모델 | 담당 | 지시문 | 백그라운드 |");
say("| --- | --- | --- | --- | --- | --- |");
agents.forEach((a, n) => {
  say(
    `| ${n + 1} | ${(a.ts || "").slice(11, 19)} | ${a.model} | ${a.description} | ${a.promptChars}자 | ${a.background ? "예" : "아니오"} |`,
  );
});
say();

say("### 위임 지시문의 필수 항목 충족 여부");
say();
say("| # | 담당 | " + Object.keys(REQUIRED).join(" | ") + " |");
say("| --- | --- | " + Object.keys(REQUIRED).map(() => "---").join(" | ") + " |");
agents.forEach((a, n) => {
  say(`| ${n + 1} | ${a.description} | ` + Object.keys(REQUIRED).map((k) => (a.has[k] ? "O" : "X")).join(" | ") + " |");
});
say();

say("### 디렉터리 소유 범위 (지시문의 \"변경 가능한 파일\" 절에서 추출)");
say();
const owners = new Map();
agents.forEach((a, n) => {
  for (const d of a.dirs) {
    if (!owners.has(d)) owners.set(d, []);
    owners.get(d).push(n + 1);
  }
});
say("| 디렉터리 | 담당 에이전트 |");
say("| --- | --- |");
for (const [d, list] of [...owners.entries()].sort()) say(`| \`${d}\` | ${list.join(", ")} |`);
say();
const conflicts = [...owners.entries()].filter(([, l]) => new Set(l).size > 1);
say(conflicts.length ? `**충돌: ${conflicts.map(([d]) => d).join(", ")}**` : "같은 디렉터리를 둘 이상이 소유한 경우 없음. 병렬 작업 중 파일 충돌 가능성 없음.");
say();
say("참고용으로만 언급한 경로(소유 아님):");
say();
agents.forEach((a, n) => { if (a.refs.length) say(`- ${n + 1}번: ${a.refs.map((d) => "`" + d + "`").join(", ")}`); });
say();

say("## 검증 명령 실행 이력");
say();
const kindCount = {};
for (const v of verifyRuns) for (const k of v.kinds) kindCount[k] = (kindCount[k] || 0) + 1;
say("| 검사 | 실행 횟수 |");
say("| --- | --- |");
for (const [k, n] of Object.entries(kindCount)) say(`| ${k} | ${n} |`);
say();
say(`총 ${verifyRuns.length}회. 마지막 실행 ${(verifyRuns.at(-1)?.ts || "").slice(0, 19)}.`);
say();

say("## 메인 에이전트가 직접 편집한 파일");
say();
say(`${editedByMain.size}개 파일, 총 ${[...editedByMain.values()].reduce((a, b) => a + b, 0)}회.`);
say();
say("| 파일 | 편집 횟수 |");
say("| --- | --- |");
for (const [f, n] of [...editedByMain.entries()].sort((a, b) => b[1] - a[1])) say(`| \`${f}\` | ${n} |`);
say();

say("## 위임 지시문 전문");
say();
agents.forEach((a, n) => {
  say(`### ${n + 1}. ${a.description} (${a.model})`);
  say();
  say("```text");
  say(a.prompt.trim());
  say("```");
  say();
});

const text = L.join("\n");
if (out) {
  fs.writeFileSync(out, text, "utf8");
  console.log(`기록 ${out} 생성`);
  console.log(`- 메인 모델: ${[...models.keys()].join(", ")}`);
  console.log(`- 서브에이전트: ${agents.length}건 (${[...new Set(agents.map((a) => a.model))].join(", ")})`);
  console.log(`- 검증 명령: ${verifyRuns.length}회`);
  console.log(`- 메인 직접 편집: ${editedByMain.size}개 파일`);
  console.log(`- 디렉터리 충돌: ${conflicts.length}건`);
} else {
  console.log(text);
}
