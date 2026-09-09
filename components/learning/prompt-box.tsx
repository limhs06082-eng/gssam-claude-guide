"use client";

import { useRef, useState, type ReactNode } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Claude에게 이렇게 말해보세요 — 오른쪽 위에 작은 복사 버튼이 있는 프롬프트 상자.
 * 코드 에디터처럼 보이지 않도록 본문 글꼴을 그대로 쓴다. (DESIGN-SYSTEM 13절)
 * 섹션 제목이 이미 역할을 말해 주므로 기본적으로 라벨을 붙이지 않는다.
 */
export function PromptBox({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const text = bodyRef.current?.innerText.trim() ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // 클립보드 권한이 없는 환경: 텍스트를 선택해 준다.
      const range = document.createRange();
      if (bodyRef.current) {
        range.selectNodeContents(bodyRef.current);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  }

  return (
    <div className={cn("not-prose relative my-6 rounded-lg border bg-card", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={copy}
        aria-live="polite"
        aria-label={copied ? "복사됨" : "프롬프트 복사"}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span className="hidden sm:inline">{copied ? "복사됨" : "복사"}</span>
      </Button>
      {title ? <p className="px-4 pt-3 text-[0.8125rem] font-medium text-muted-foreground">{title}</p> : null}
      <div
        ref={bodyRef}
        className={cn(
          "callout-body px-4 pb-4 pr-12 text-[0.95em] sm:pr-24 leading-[1.8] whitespace-pre-wrap [&_p]:my-0 [&_p+p]:mt-3",
          title ? "pt-1.5" : "pt-3.5",
        )}
      >
        {children}
      </div>
    </div>
  );
}
