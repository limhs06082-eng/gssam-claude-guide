/**
 * 내보낸 정적 사이트(out/)를 GitHub Pages와 같은 주소 구조로 띄운다.
 *
 *   npm run build
 *   npm run preview        → http://localhost:3211/gssam-claude-guide/
 *
 * 외부 패키지 없이 Node 내장 http 모듈만 쓴다.
 * GitHub Pages처럼 /경로/ 는 index.html, 없는 경로는 404.html 을 돌려준다.
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { BASE_PATH } from "../lib/site.ts";

const ROOT = path.resolve(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT ?? 3211);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

if (!fs.existsSync(ROOT)) {
  console.error("out/ 폴더가 없습니다. 먼저 npm run build 를 실행하세요.");
  process.exit(1);
}

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  if (!decoded.startsWith(BASE_PATH + "/") && decoded !== BASE_PATH) return null;
  let rel = decoded.slice(BASE_PATH.length) || "/";
  if (rel.endsWith("/")) rel += "index.html";
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return file;
  if (fs.existsSync(file + ".html")) return file + ".html";
  return null;
}

http
  .createServer((req, res) => {
    // GitHub Pages는 /gssam-claude-guide 를 /gssam-claude-guide/ 로 보낸다.
    if (req.url === BASE_PATH) {
      res.writeHead(301, { Location: BASE_PATH + "/" });
      return res.end();
    }
    const file = resolveFile(req.url ?? "/");
    if (!file) {
      const notFound = path.join(ROOT, "404.html");
      res.writeHead(404, { "Content-Type": TYPES[".html"] });
      return fs.existsSync(notFound) ? fs.createReadStream(notFound).pipe(res) : res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => {
    console.log(`미리보기: http://localhost:${PORT}${BASE_PATH}/`);
  });
