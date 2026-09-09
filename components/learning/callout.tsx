import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CalloutProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * 쉽게 생각하면 — 비유 설명용 연한 배경 박스.
 * 아이콘 없이 배경색만으로 본문과 구분한다. (DESIGN-SYSTEM 13절)
 */
export function Analogy({ title, children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "not-prose my-6 rounded-lg bg-muted/70 px-5 py-4 text-[0.95em] leading-[1.8]",
        className,
      )}
    >
      {title ? (
        <p className="mb-1 text-[0.8125rem] font-semibold text-muted-foreground">{title}</p>
      ) : null}
      <div className="callout-body">{children}</div>
    </aside>
  );
}

/**
 * G쌤 팁 — 다른 Callout보다 조금 더 친근한 말투의 조언.
 * 강조색을 아주 옅게 깔고, 왼쪽에 얇은 선을 둔다.
 */
export function TeacherTip({ title, children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "not-prose my-6 rounded-lg border-l-2 border-primary/70 bg-tip px-5 py-4 text-[0.95em] leading-[1.8] text-foreground",
        className,
      )}
    >
      {title ? <p className="mb-1 text-[0.8125rem] font-semibold text-tip-foreground">{title}</p> : null}
      <div className="callout-body">{children}</div>
    </aside>
  );
}

/**
 * 참고 — 본문 흐름에서 잠깐 덧붙이는 정보.
 *
 * 상자로 만들지 않는다. AGENTS.md의 카드 허용 목록(Prompt, Tip, Warning, Example,
 * 학습 경로, interactive component)에 "참고"는 없다. 얇은 왼쪽 선과 낮은 명도로만
 * 본문과 구분해, 한 페이지에 상자가 다섯 개씩 쌓이지 않게 한다.
 */
export function Note({ title, children, className }: CalloutProps) {
  return (
    <aside
      className={cn(
        "not-prose my-6 border-l-2 border-border pl-4 text-[0.95em] leading-[1.8] text-muted-foreground",
        className,
      )}
    >
      {title ? <p className="mb-1 text-[0.8125rem] font-semibold text-foreground">{title}</p> : null}
      <div className="callout-body">{children}</div>
    </aside>
  );
}
