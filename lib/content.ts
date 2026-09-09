import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { mdxComponents } from "@/components/mdx-components";
import { type FlatPage, type Level, type NavCourse } from "./navigation";
import { extractToc, type TocItem } from "./search-index";

export { extractToc, buildSearchIndex, type SearchDoc, type TocItem } from "./search-index";

const CONTENT_DIR = path.join(process.cwd(), "content");

/** MDX frontmatter. 제목은 navigation.ts가 갖는다. */
export interface PageMeta {
  description?: string;
  level?: Level;
  /** 예상 소요 시간(분) */
  time?: number;
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
