import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 직접 해봅시다 — 번호 중심의 단계 안내.
 *
 * <Steps>
 *   <Step title="Claude 앱을 엽니다">설명...</Step>
 *   <Step title="입력창에 질문을 씁니다">설명...</Step>
 * </Steps>
 */
export function Steps({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <ol className={cn("not-prose my-6 list-none space-y-0 p-0 [counter-reset:step]", className)}>
      {children}
    </ol>
  );
}

export function Step({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <li className="group relative flex gap-4 pb-7 last:pb-0 [counter-increment:step]">
      {/* 번호와 연결선 */}
      <div className="flex shrink-0 flex-col items-center">
        <span
          aria-hidden
          className="flex size-7 items-center justify-center rounded-full border bg-card text-[0.8125rem] font-semibold tabular-nums text-foreground before:content-[counter(step)]"
        />
        <span aria-hidden className="mt-1 w-px flex-1 bg-border group-last:hidden" />
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {title ? <p className="mb-1.5 font-semibold leading-snug">{title}</p> : null}
        <div className="callout-body text-[0.95em] leading-[1.8]">{children}</div>
      </div>
    </li>
  );
}
