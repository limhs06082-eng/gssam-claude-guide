import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PageNav } from "@/components/layout/page-nav";
import { Toc } from "@/components/layout/toc";
import { MarkComplete } from "@/components/learning/mark-complete";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { compileCourseIntro, compilePage, readPageMeta } from "@/lib/content";
import {
  courses,
  getAdjacentPages,
  getAllPages,
  getCourse,
  getCoursePages,
  getPage,
  type FlatPage,
  type NavCourse,
} from "@/lib/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { slug: string[] }[] = courses.map((c) => ({ slug: [c.slug] }));
  for (const page of getAllPages()) params.push({ slug: [page.course.slug, page.slug] });
  return params;
}

export async function generateMetadata({ params }: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length === 1) {
    const course = getCourse(slug[0]);
    return course ? { title: course.title, description: course.tagline } : {};
  }
  const page = getPage(slug[0], slug[1]);
  if (!page) return {};
  const meta = await readPageMeta(page);
  return { title: `${page.title} · ${page.course.title}`, description: meta?.description };
}

export default async function DocPage({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  if (slug.length === 1) {
    const course = getCourse(slug[0]);
    if (!course) notFound();
    return <CourseIndex course={course} />;
  }
  if (slug.length !== 2) notFound();
  const page = getPage(slug[0], slug[1]);
  if (!page) notFound();
  return <LessonPage page={page} />;
}

/* ---------- 학습 페이지 ---------- */

async function LessonPage({ page }: { page: FlatPage }) {
  const compiled = await compilePage(page);
  if (!compiled) notFound();
  const { content, meta, toc } = compiled;
  const { prev, next } = getAdjacentPages(page);

  return (
    <>
      <main id="main" className="min-w-0 px-4 py-8 md:px-10 md:py-10 lg:px-12">
        <article className="mx-auto max-w-[44rem]">
          <header>
            <Breadcrumb page={page} />
            <h1 className="mt-3 text-[1.75rem] leading-[1.3] font-bold tracking-[-0.015em] md:text-[2rem]">
              {page.title}
            </h1>
            {meta.description ? (
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{meta.description}</p>
            ) : null}
            {meta.level || meta.time ? (
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[0.8125rem] text-muted-foreground">
                {meta.level ? (
                  <Badge variant="outline" className="font-medium">
                    {meta.level === "advanced" ? "심화" : "초보 필수"}
                  </Badge>
                ) : null}
                {meta.time ? <span>약 {meta.time}분</span> : null}
              </div>
            ) : null}
          </header>

          <div className="prose prose-guide mt-10">{content}</div>

          <div className="mt-14 space-y-6 border-t pt-8">
            <MarkComplete href={page.href} />
            <PageNav current={page} prev={prev} next={next} />
          </div>
        </article>
      </main>
      <aside className="hidden xl:block">
        <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-10 pr-6 pl-2">
          <Toc items={toc} />
        </div>
      </aside>
    </>
  );
}

/* ---------- 과정 소개 페이지 ---------- */

async function CourseIndex({ course }: { course: NavCourse }) {
  const pages = getCoursePages(course.slug);
  const intro = await compileCourseIntro(course);
  const metas = await Promise.all(pages.map((p) => readPageMeta(p)));
  const first = pages[0];

  return (
    <main id="main" className="min-w-0 px-4 py-8 md:px-10 md:py-10 lg:px-12 xl:col-span-2">
      <div className="mx-auto max-w-[44rem]">
        <header>
          <p className="text-[0.8125rem] font-medium text-muted-foreground">과정</p>
          <h1 className="mt-1.5 text-[1.75rem] leading-[1.3] font-bold tracking-[-0.015em] md:text-[2rem]">
            {course.title}
          </h1>
          <p className="mt-3 text-[1.0625rem] leading-relaxed text-muted-foreground">{course.tagline}</p>
          {first && course.linear !== false ? (
            <Button asChild className="mt-5">
              <Link href={first.href}>
                첫 페이지부터 시작하기
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </Button>
          ) : null}
        </header>

        {intro ? <div className="prose prose-guide mt-10">{intro}</div> : null}

        <div className="mt-10 space-y-8">
          {course.sections.map((section, si) => (
            <section key={section.title ?? si}>
              {section.title ? (
                <h2 className="mb-2 text-[0.9375rem] font-semibold text-foreground">{section.title}</h2>
              ) : null}
              <ol className="divide-y border-y">
                {section.pages.map((p) => {
                  const flat = pages.find((fp) => fp.slug === p.slug)!;
                  const meta = metas[pages.indexOf(flat)];
                  return (
                    <li key={p.slug}>
                      <Link
                        href={flat.href}
                        className="group flex items-baseline gap-3 py-3 transition-colors hover:bg-muted/40 md:-mx-3 md:px-3"
                      >
                        <span className="w-6 shrink-0 text-[0.8125rem] tabular-nums text-muted-foreground">
                          {String(pages.indexOf(flat) + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium leading-snug group-hover:underline underline-offset-3">
                            {p.title}
                          </span>
                          {meta?.description ? (
                            <span className="mt-0.5 block text-[0.875rem] leading-relaxed text-muted-foreground">
                              {meta.description}
                            </span>
                          ) : null}
                        </span>
                        {meta?.level === "advanced" ? (
                          <Badge variant="outline" className="shrink-0 self-center text-muted-foreground">
                            심화
                          </Badge>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
