/**
 * 검색 인덱스를 public/search-index.json 으로 만든다.
 * package.json 의 "prebuild" 에 걸려 있어 npm run build 때 자동으로 먼저 실행된다.
 * 개발 서버(npm run dev)에서 검색을 쓰려면 한 번 직접 실행한다.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { buildSearchIndex } from "../lib/search-index.ts";

const out = path.resolve(import.meta.dirname, "..", "public", "search-index.json");
const docs = await buildSearchIndex();
await fs.writeFile(out, JSON.stringify(docs), "utf8");
const kb = Math.round((await fs.stat(out)).size / 1024);
console.log(`검색 인덱스: ${docs.length}개 문서, ${kb} KB → public/search-index.json`);
