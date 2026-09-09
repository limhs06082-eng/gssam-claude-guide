import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { FlatPage } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** 하단 이전/다음 강의. 과정이 바뀌면 과정 이름을 함께 보여준다. */
export function PageNav({ current, prev, next }: { current: FlatPage; prev?: FlatPage; next?: FlatPage }) {
  return (
    <nav aria-label="이전 · 다음 페이지" className="grid gap-3 sm:grid-cols-2">
      {prev ? <NavLink page={prev} direction="prev" crossCourse={prev.course.slug !== current.course.slug} /> : <span />}
      {next ? <NavLink page={next} direction="next" crossCourse={next.course.slug !== current.course.slug} /> : null}
    </nav>
  );
}

function NavLink({ page, direction, crossCourse }: { page: FlatPage; direction: "prev" | "next"; crossCourse: boolean }) {
  const isNext = direction === "next";
  return (
    <Link
      href={page.href}
      className={cn(
        "group flex items-center gap-3 rounded-lg border bg-card px-4 py-3.5 transition-colors hover:bg-muted/60",
        isNext ? "text-right sm:col-start-2" : "",
      )}
    >
      {!isNext ? <ArrowLeftIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden /> : null}
      <span className="min-w-0 flex-1">
        <span className="block text-[0.75rem] text-muted-foreground">
          {isNext ? "다음" : "이전"}
          {crossCourse ? ` · ${page.course.title}` : ""}
        </span>
        <span className="block truncate font-medium leading-snug">{page.title}</span>
      </span>
      {isNext ? <ArrowRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden /> : null}
    </Link>
  );
}
