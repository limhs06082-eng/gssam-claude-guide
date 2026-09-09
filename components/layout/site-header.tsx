import Link from "next/link";
import { CourseMenu } from "./course-menu";
import { MobileNav } from "./mobile-nav";
import { SiteSearch } from "./search";
import { ThemeToggle } from "./theme-toggle";

/** 상단: 로고 / 검색 / 과정 선택 / 테마. 모바일에서는 최소화한다. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-1 px-3 md:px-6">
        <MobileNav />
        <Link
          href="/"
          className="mr-2 flex items-center gap-2 rounded-md px-1.5 py-1 text-[0.9375rem] font-semibold tracking-tight hover:bg-muted/70 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <span aria-hidden className="inline-block size-2.5 rounded-sm bg-primary" />
          Claude 초보자 가이드
        </Link>
        <div className="ml-auto flex items-center gap-1">
          <SiteSearch />
          <CourseMenu />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
