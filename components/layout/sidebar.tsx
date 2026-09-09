"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useProgress } from "@/hooks/use-progress";
import { courses, type NavCourse } from "@/lib/navigation";
import { cn } from "@/lib/utils";

function courseOf(pathname: string) {
  return pathname.split("/")[1] ?? "";
}

/**
 * 왼쪽 강좌 목차. 현재 과정만 펼치고 나머지는 접는다. (DESIGN-SYSTEM 17절)
 * 과정 이름은 과정 소개 페이지로 가는 링크, 오른쪽 화살표는 펼침/접힘 버튼이다.
 */
export function Sidebar({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  // trailingSlash 설정 때문에 /chat/first-question/ 로 올 수 있다. 끝 슬래시를 떼고 비교한다.
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const activeCourse = courseOf(pathname);
  const [open, setOpen] = useState<Record<string, boolean>>(() => ({ [activeCourse]: true }));

  // 다른 과정으로 이동하면 그 과정을 펼친다. (렌더 중 상태 조정 패턴)
  const [prevCourse, setPrevCourse] = useState(activeCourse);
  if (activeCourse !== prevCourse) {
    setPrevCourse(activeCourse);
    if (activeCourse && !open[activeCourse]) setOpen({ ...open, [activeCourse]: true });
  }

  return (
    <nav aria-label="학습 목차" className={cn("text-[0.875rem]", className)}>
      <ul className="space-y-0.5">
        {courses.map((course) => (
          <CourseItem
            key={course.slug}
            course={course}
            pathname={pathname}
            open={!!open[course.slug]}
            onOpenChange={(v) => setOpen((prev) => ({ ...prev, [course.slug]: v }))}
            onNavigate={onNavigate}
          />
        ))}
      </ul>
    </nav>
  );
}

function CourseItem({
  course,
  pathname,
  open,
  onOpenChange,
  onNavigate,
}: {
  course: NavCourse;
  pathname: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onNavigate?: () => void;
}) {
  const { isDone } = useProgress();
  const courseHref = `/${course.slug}`;
  const isCourseActive = pathname === courseHref;
  const total = course.sections.reduce((n, s) => n + s.pages.length, 0);
  const doneCount = course.sections.reduce(
    (n, s) => n + s.pages.filter((p) => isDone(`/${course.slug}/${p.slug}`)).length,
    0,
  );

  return (
    <li>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <div className="flex items-center rounded-md hover:bg-muted/70">
          <Link
            href={courseHref}
            onClick={onNavigate}
            aria-current={isCourseActive ? "page" : undefined}
            className={cn(
              "min-w-0 flex-1 truncate px-2 py-1.5 font-medium text-foreground",
              isCourseActive && "font-semibold text-primary",
            )}
          >
            {course.title}
          </Link>
          {doneCount > 0 ? (
            <span className="text-[0.75rem] tabular-nums text-muted-foreground" aria-label={`${total}개 중 ${doneCount}개 완료`}>
              {doneCount}/{total}
            </span>
          ) : null}
          <CollapsibleTrigger
            className="ml-1 flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            aria-label={open ? `${course.title} 접기` : `${course.title} 펼치기`}
          >
            <ChevronRightIcon className={cn("size-4 transition-transform duration-150", open && "rotate-90")} />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="pb-1">
          {course.sections.map((section, i) => (
            <div key={section.title ?? i}>
              {section.title ? (
                <p className="mt-2.5 mb-0.5 px-2 text-[0.75rem] font-medium text-muted-foreground">{section.title}</p>
              ) : null}
              <ul>
                {section.pages.map((page) => {
                  const href = `/${course.slug}/${page.slug}`;
                  const active = pathname === href;
                  const done = isDone(href);
                  return (
                    <li key={page.slug}>
                      <Link
                        href={href}
                        onClick={onNavigate}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "relative flex items-center gap-2 rounded-md py-1.5 pr-2 pl-4 text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground",
                          active &&
                            "font-medium text-primary before:absolute before:top-1.5 before:bottom-1.5 before:left-1 before:w-0.5 before:rounded-full before:bg-primary hover:text-primary",
                        )}
                      >
                        <span className="min-w-0 flex-1 leading-snug">{page.title}</span>
                        {done ? (
                          <CheckIcon className="size-3.5 shrink-0 text-muted-foreground/80" aria-label="완료" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}
