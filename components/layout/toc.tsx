"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * 오른쪽 목차. H2/H3를 기준으로 현재 읽고 있는 섹션을 표시한다. (DESIGN-SYSTEM 18절)
 */
export function Toc({ items, className }: { items: TocItem[]; className?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.scrollY + 96;
      let current: string | null = headings[0].id;
      for (const el of headings) {
        if (el.offsetTop <= line) current = el.id;
        else break;
      }
      // 페이지 끝에 닿으면 마지막 항목을 활성화한다.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = headings[headings.length - 1].id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="이 페이지의 목차" className={cn("text-[0.8125rem]", className)}>
      <p className="mb-2 font-semibold text-foreground">이 페이지에서</p>
      <ul className="border-l">
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "-ml-px block border-l py-1 leading-snug text-muted-foreground transition-colors hover:text-foreground",
                  item.depth === 3 ? "pl-6" : "pl-3",
                  active ? "border-primary text-primary" : "border-transparent",
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
