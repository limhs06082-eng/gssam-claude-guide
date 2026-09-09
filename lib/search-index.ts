/**
 * 검색 인덱스.
 *
 * 빌드 전에 scripts/build-search-index.mjs 가 이 모듈로 public/search-index.json 을 만든다.
 * 정적 호스트(GitHub Pages)에는 서버가 없으므로 검색 데이터도 파일로 미리 만들어 둔다.
 *
 * 이 파일은 React나 MDX 컴파일러를 import 하지 않는다. Node 스크립트에서 바로 불러야 하기 때문이다.
 */
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
// Node 스크립트에서도 바로 불러야 하므로 확장자를 붙인다. (tsconfig allowImportingTsExtensions)
import { getAllPages } from "./navigation.ts";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface SearchDoc {
  href: string;
  title: string;
  course: string;
  section?: string;
  description?: string;
  headings: string[];
  /** 검색용 평문. 구두점과 마크업을 걷어낸 본문. */
  text: string;
}

/**
 * 본문에서 H2/H3를 뽑아 목차를 만든다.
 * rehype-slug와 같은 github-slugger를 같은 순서로 돌려 id를 일치시킨다.
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;
  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trimEnd();
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const depth = m[1].length;
    const text = cleanInline(m[2]);
    const id = slugger.slug(text);
    if (depth === 2 || depth === 3) items.push({ id, text, depth });
  }
  return items;
}

function cleanInline(text: string) {
  return text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .trim();
}

function stripMdx(body: string): string {
  return body
    .replace(/^\s*(import|export)\s.*$/gm, " ")
    .replace(/<\/?[A-Za-z][^>]*>/gs, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```[^\n]*/g, " "))
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`|~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function buildSearchIndex(): Promise<SearchDoc[]> {
  const docs: SearchDoc[] = [];
  for (const page of getAllPages()) {
    let source: string;
    try {
      source = await fs.readFile(path.join(CONTENT_DIR, page.course.slug, `${page.slug}.mdx`), "utf8");
    } catch {
      continue;
    }
    const { content: body, data } = matter(source);
    docs.push({
      href: page.href,
      title: page.title,
      course: page.course.title,
      section: page.section.title,
      description: typeof data.description === "string" ? data.description : undefined,
      headings: extractToc(body).map((t) => t.text),
      text: stripMdx(body),
    });
  }
  return docs;
}
