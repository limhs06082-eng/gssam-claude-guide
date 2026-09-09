import type { ReactNode } from "react";
import { CircleCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 이렇게 나오면 성공입니다 — 정상 결과의 특징을 짧게 보여준다.
 *
 * 카드로 감싸지 않는다. 바로 앞에 오는 PromptBox가 이미 테두리 상자여서,
 * 여기까지 상자로 만들면 본문이 카드 더미처럼 보인다. (DESIGN-SYSTEM 8절)
 * 얇은 왼쪽 선과 체크 아이콘만으로 본문과 구분한다.
 */
export function Success({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("not-prose my-6 flex gap-3 border-l-2 border-primary/40 pl-4", className)}>
      <CircleCheckIcon className="mt-[0.4em] size-4 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0 flex-1 text-[0.95em] leading-[1.8]">
        {title ? <p className="mb-1 font-semibold">{title}</p> : null}
        <div className="callout-body">{children}</div>
      </div>
    </div>
  );
}
