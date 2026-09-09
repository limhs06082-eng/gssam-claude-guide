import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 화면에서 찾아보세요 — 스크린샷의 ①②③ 번호와 대응하는 설명 목록.
 *
 * <ScreenGuide>
 * 1. **새 대화** — 왼쪽 위에 있습니다.
 * 2. **입력창** — 화면 아래쪽에 있습니다.
 * </ScreenGuide>
 */
export function ScreenGuide({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "not-prose my-6 text-[0.95em] leading-[1.8]",
        "[&_ol]:m-0 [&_ol]:list-none [&_ol]:p-0 [&_ol]:[counter-reset:screen]",
        "[&_li]:relative [&_li]:py-2 [&_li]:pl-10 [&_li]:[counter-increment:screen]",
        "[&_li+li]:border-t",
        "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-2.5 [&_li]:before:flex [&_li]:before:size-6 [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:rounded-full [&_li]:before:border [&_li]:before:bg-card [&_li]:before:text-[0.75rem] [&_li]:before:font-semibold [&_li]:before:tabular-nums [&_li]:before:content-[counter(screen)]",
        "[&_p]:m-0 [&_strong]:font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
}
