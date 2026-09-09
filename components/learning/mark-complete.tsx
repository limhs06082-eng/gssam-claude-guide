"use client";

import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";

/** 이 페이지를 완료로 표시 — 진행률은 브라우저에만 저장된다. */
export function MarkComplete({ href }: { href: string }) {
  const { isDone, toggle } = useProgress();
  const done = isDone(href);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-[0.875rem] text-muted-foreground">
        {done ? "완료한 페이지입니다. 왼쪽 목차에 표시가 남습니다." : "다 읽고 따라 해봤다면 완료로 표시해 두세요."}
      </p>
      <Button
        type="button"
        variant={done ? "secondary" : "outline"}
        onClick={() => toggle(href)}
        aria-pressed={done}
      >
        <CheckIcon data-icon="inline-start" className={done ? "text-primary" : "text-muted-foreground"} />
        {done ? "완료함" : "완료로 표시"}
      </Button>
    </div>
  );
}
