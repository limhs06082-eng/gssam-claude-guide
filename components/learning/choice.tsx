"use client";

import { Children, isValidElement, useState, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OptionProps {
  /** 사용자가 고르는 문장. 예: "글을 쓰고 싶어요" */
  label: string;
  /** 추천 결과 이름. 예: "Claude Chat" */
  result: string;
  /** 이동할 페이지 */
  href: string;
  /** 링크 버튼 문구. 기본값: "{result} 시작하기" */
  cta?: string;
  children?: ReactNode;
}

/** Choice 안에서만 쓰는 선택지. 실제 렌더링은 Choice가 담당한다. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Option(props: OptionProps) {
  return null;
}

/**
 * 질문 → 선택 → 추천. 카드 대신 목록형 선택지로 구현한다. (DESIGN-SYSTEM 16절)
 *
 * <Choice question="무엇을 하고 싶나요?">
 *   <Option label="글을 쓰고 싶어요" result="Claude Chat" href="/chat/what-is-chat">
 *     설명...
 *   </Option>
 * </Choice>
 */
export function Choice({
  question,
  children,
  className,
}: {
  question: string;
  children: ReactNode;
  className?: string;
}) {
  const options = Children.toArray(children).filter(
    (c): c is ReactElement<OptionProps> => isValidElement(c) && typeof (c.props as OptionProps).label === "string",
  );
  const [selected, setSelected] = useState<number | null>(null);
  const current = selected === null ? null : options[selected]?.props;

  return (
    <div className={cn("not-prose my-6 rounded-lg border bg-card", className)}>
      <p className="border-b px-5 py-3.5 font-semibold">{question}</p>
      <div role="group" aria-label={question} className="divide-y">
        {options.map((opt, i) => {
          const active = selected === i;
          return (
            <button
              key={opt.props.label}
              type="button"
              aria-pressed={active}
              onClick={() => setSelected(active ? null : i)}
              className={cn(
                "flex w-full items-center justify-between gap-3 px-5 py-3 text-left text-[0.95em] transition-colors",
                "hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none",
                active && "bg-muted/60 font-medium",
              )}
            >
              <span>{opt.props.label}</span>
              <span
                aria-hidden
                className={cn(
                  "size-4 shrink-0 rounded-full border transition-colors",
                  active ? "border-primary bg-primary [box-shadow:inset_0_0_0_3px_var(--card)]" : "border-border",
                )}
              />
            </button>
          );
        })}
      </div>
      {current ? (
        <div className="border-t bg-muted/40 px-5 py-4 text-[0.95em] leading-[1.8]">
          <p className="mb-1 text-[0.8125rem] font-semibold text-muted-foreground">추천</p>
          <p className="mb-1 font-semibold">{current.result}</p>
          <div className="callout-body text-foreground/90">{current.children}</div>
          <Button asChild variant="outline" className="mt-3">
            <Link href={current.href}>
              {current.cta ?? `${current.result} 시작하기`}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
}
