import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import type { FlatPage } from "@/lib/navigation";

function Sep() {
  return <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground/70" aria-hidden />;
}

/** 과정 경로: Claude Code / 프로젝트 이해하기 / 프로젝트 폴더란? (DESIGN-SYSTEM 12절) */
export function Breadcrumb({ page }: { page: FlatPage }) {
  return (
    <nav aria-label="현재 위치" className="flex flex-wrap items-center gap-1 text-[0.8125rem] text-muted-foreground">
      <Link href={`/${page.course.slug}`} className="rounded-sm hover:text-foreground hover:underline underline-offset-3">
        {page.course.title}
      </Link>
      {page.section.title ? (
        <>
          <Sep />
          <span>{page.section.title}</span>
        </>
      ) : null}
      <Sep />
      <span className="text-foreground" aria-current="page">
        {page.title}
      </span>
    </nav>
  );
}
