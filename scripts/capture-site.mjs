/**
 * 이 사이트 자체의 화면을 찍어 public/screenshots/ 에 넣는다.
 *
 *   npm run build && npm run preview   (다른 터미널)
 *   npm run capture                     (기본 주소 http://localhost:3211/gssam-claude-guide)
 *   BASE_URL=http://localhost:3000 npm run capture
 *
 * 실제 Claude·Firebase·Vercel 앱 화면은 찍지 않는다. 이 스크립트는
 * "이 사이트 이용 방법" 페이지에 들어갈 사이트 자신의 화면만 만든다.
 *
 * 브라우저는 따로 내려받지 않고 컴퓨터에 설치된 Chrome 또는 Edge를 쓴다.
 * 개발 서버(next dev)로 찍으면 왼쪽 아래에 개발용 표시가 함께 찍히므로
 * 반드시 빌드 후 npm run preview 로 띄운 정적 서버를 대상으로 한다.
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { BASE_PATH } from "../lib/site.ts";

const BASE = (process.env.BASE_URL ?? "http://localhost:3211") + BASE_PATH;
const OUT = path.resolve(import.meta.dirname, "..", "public", "screenshots", "getting-started");
const LESSON = "/chat/first-question";

const CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const executablePath = CANDIDATES.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("Chrome 또는 Edge를 찾지 못했습니다. 설치 경로를 CANDIDATES에 추가하세요.");
  process.exit(1);
}

fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });

/** 밝은 테마, 한국어, 선명한 2배 해상도로 고정한다. */
async function newPage({ width, height, mobile = false }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    colorScheme: "light",
    locale: "ko-KR",
    isMobile: mobile,
    hasTouch: mobile,
  });
  await context.addInitScript(() => {
    try {
      localStorage.setItem("claude-guide-theme", "light");
      localStorage.removeItem("claude-guide-progress");
    } catch {}
  });
  const page = await context.newPage();
  return { context, page };
}

async function settle(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
}

async function shot(page, name) {
  const file = path.join(OUT, `${name}.png`);
  await page.screenshot({ path: file, type: "png" });
  const kb = Math.round(fs.statSync(file).size / 1024);
  console.log(`  ${name}.png  (${kb} KB)`);
}

console.log(`대상: ${BASE}`);
console.log(`저장: ${OUT}`);

/* 1. 데스크톱 전체 구조 — 왼쪽 목차, 본문, 오른쪽 페이지 목차, 상단 검색 */
{
  const { context, page } = await newPage({ width: 1280, height: 860 });
  await page.goto(BASE + LESSON + "/");
  await settle(page);
  await shot(page, "how-to-use-this-site-1");

  /* 2. 페이지 끝 — 완료로 표시, 이전/다음 */
  await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="이전 · 다음 페이지"]');
    nav?.scrollIntoView({ block: "end" });
    window.scrollBy(0, 24);
  });
  await page.waitForTimeout(300);
  await shot(page, "how-to-use-this-site-2");

  /* 3. 검색창 — Ctrl+K 로 열고 증상을 입력한 상태 */
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.keyboard.press("Control+K");
  const input = page.locator("input[cmdk-input]");
  await input.waitFor({ state: "visible" });
  await input.fill("배포 실패");
  await page.locator("[cmdk-item]").first().waitFor({ state: "visible" });
  await page.waitForTimeout(300);
  await shot(page, "how-to-use-this-site-3");
  await context.close();
}

/* 4. 휴대폰 — 왼쪽 위 메뉴 버튼으로 목차를 연 상태 */
{
  const { context, page } = await newPage({ width: 390, height: 844, mobile: true });
  await page.goto(BASE + LESSON + "/");
  await settle(page);
  await page.getByRole("button", { name: "학습 목차 열기" }).click();
  await page.locator("[data-slot=sheet-content]").waitFor({ state: "visible" });
  await page.waitForTimeout(400);
  await shot(page, "how-to-use-this-site-4");
  await context.close();
}

await browser.close();
console.log("완료");
