import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx-components";
import { type FlatPage, type Level, type NavCourse, getAllPages } from "./navigation";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** MDX frontmatter. 제목은 navigation.ts가 갖는다. */
export interface PageMeta {
  description?: string;
  level?: Level;
  /** 예상 소요 시간(분) */
  time?: number;
}

export interface TocItem {
  id: string;
  text: string;
  depth: 2 | 3;
}

function pagePath(courseSlug: string, pageSlug: string) {
  return path.join(CONTENT_DIR, courseSlug, `${pageSlug}.mdx`);
}

async function readFileOrNull(file: string): Promise<string | null> {
  try {
    return await fs.readFile(file, "utf8");
  } catch {
    return null;
  }
}

export async function readPageSource(courseSlug: string, pageSlug: string) {
  return readFileOrNull(pagePath(courseSlug, pageSlug));
}

export async function pageExists(courseSlug: string, pageSlug: string) {
  try {
    await fs.access(pagePath(courseSlug, pageSlug));
    return true;
  } catch {
    return false;
  }
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

const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [rehypeSlug],
};

export interface CompiledPage {
  content: React.ReactElement;
  meta: PageMeta;
  toc: TocItem[];
}

export async function compilePage(page: FlatPage): Promise<CompiledPage | null> {
  const source = await readPageSource(page.course.slug, page.slug);
  if (source === null) return null;
  const { content: body, data } = matter(source);
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { mdxOptions },
  });
  return { content, meta: normalizeMeta(data), toc: extractToc(body) };
}

/** 과정 소개 글. content/{course}/index.mdx 가 있으면 사용한다. */
export async function compileCourseIntro(course: NavCourse) {
  const source = await readFileOrNull(path.join(CONTENT_DIR, course.slug, "index.mdx"));
  if (source === null) return null;
  const { content: body } = matter(source);
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { mdxOptions },
  });
  return content;
}

function normalizeMeta(data: Record<string, unknown>): PageMeta {
  const meta: PageMeta = {};
  if (typeof data.description === "string") meta.description = data.description;
  if (data.level === "beginner" || data.level === "advanced") meta.level = data.level;
  if (typeof data.time === "number") meta.time = data.time;
  return meta;
}

/** 목록/검색에서 쓰는 가벼운 메타. 본문은 컴파일하지 않는다. */
export async function readPageMeta(page: FlatPage): Promise<PageMeta | null> {
  const source = await readPageSource(page.course.slug, page.slug);
  if (source === null) return null;
  return normalizeMeta(matter(source).data);
}

/* ---------- 검색 인덱스 ---------- */

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
    const source = await readPageSource(page.course.slug, page.slug);
    if (source === null) continue;
    const { content: body, data } = matter(source);
    const meta = normalizeMeta(data);
    docs.push({
      href: page.href,
      title: page.title,
      course: page.course.title,
      section: page.section.title,
      description: meta.description,
      headings: extractToc(body).map((t) => t.text),
      text: stripMdx(body),
    });
  }
  return docs;
}
