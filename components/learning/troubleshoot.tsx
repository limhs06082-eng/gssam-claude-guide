import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 잘 안 된다면 — 증상과 해결 방법 목록. 카드 없이 구분선만 사용한다.
 *
 * <Troubleshoot>
 *   <Problem title="파일이 첨부되지 않아요">...</Problem>
 * </Troubleshoot>
 */
export function Troubleshoot({ children, className }: { children: ReactNode; className?: string }) {
  // 위쪽 테두리를 두지 않는다. 바로 앞 H2의 밑줄과 겹쳐 이중선으로 보인다.
  return <div className={cn("not-prose my-6 divide-y border-b", className)}>{children}</div>;
}

export function Problem({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="py-4">
      <p className="mb-1.5 font-semibold leading-snug">{title}</p>
      <div className="callout-body text-[0.95em] leading-[1.8] text-foreground/90">{children}</div>
    </div>
  );
}
