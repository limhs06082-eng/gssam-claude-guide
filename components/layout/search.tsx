"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { SearchDoc } from "@/lib/content";

interface Hit {
  doc: SearchDoc;
  score: number;
  snippet: string;
}

function normalize(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

function snippetAround(text: string, q: string, radius = 32) {
  const i = normalize(text).indexOf(q);
  if (i < 0) return text.slice(0, radius * 2);
  let start = Math.max(0, i - radius);
  let end = Math.min(text.length, i + q.length + radius);
  // 단어 중간에서 잘리지 않도록 가까운 공백으로 맞춘다.
  const prevSpace = text.lastIndexOf(" ", start);
  if (start > 0 && prevSpace >= 0 && start - prevSpace < 12) start = prevSpace + 1;
  const nextSpace = text.indexOf(" ", end);
  if (end < text.length && nextSpace >= 0 && nextSpace - end < 12) end = nextSpace;
  return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
}

function search(docs: SearchDoc[], rawQuery: string): Hit[] {
  const q = normalize(rawQuery);
  if (q.length < 1) return [];
  const terms = q.split(" ").filter(Boolean);
  const hits: Hit[] = [];
  for (const doc of docs) {
    const title = normalize(doc.title);
    const desc = normalize(doc.description ?? "");
    const headings = doc.headings.map(normalize);
    const text = normalize(doc.text);
    let score = 0;
    let snippet = doc.description ?? "";
    let allMatched = true;
    for (const term of terms) {
      let termScore = 0;
      if (title.includes(term)) termScore = Math.max(termScore, 5);
      if (headings.some((h) => h.includes(term))) {
        termScore = Math.max(termScore, 3);
        if (score === 0) snippet = doc.headings.find((h) => normalize(h).includes(term)) ?? snippet;
      }
      if (desc.includes(term)) termScore = Math.max(termScore, 2);
      if (text.includes(term)) {
        termScore = Math.max(termScore, 1);
        if (!title.includes(term) && !desc.includes(term)) snippet = snippetAround(doc.text, term);
      }
      if (termScore === 0) {
        allMatched = false;
        break;
      }
      score += termScore;
    }
    if (allMatched) hits.push({ doc, score, snippet });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 24);
}

/**
 * 사이트 검색. shadcn Command 형태, Ctrl/Cmd+K로 열린다. (DESIGN-SYSTEM 19절)
 * 인덱스는 처음 열 때 /api/search 에서 한 번만 받아온다.
 */
export function SiteSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (docs || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/search");
      setDocs((await res.json()) as SearchDoc[]);
    } catch {
      setDocs([]);
    } finally {
      setLoading(false);
    }
  }, [docs, loading]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) void load();
      else setQuery("");
    },
    [load],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleOpenChange]);

  const hits = useMemo(() => (docs ? search(docs, query) : []), [docs, query]);
  const grouped = useMemo(() => {
    const map = new Map<string, Hit[]>();
    for (const hit of hits) {
      const list = map.get(hit.doc.course) ?? [];
      list.push(hit);
      map.set(hit.doc.course, list);
    }
    return [...map.entries()];
  }, [hits]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => handleOpenChange(true)}
        className="hidden w-52 justify-start gap-2 text-muted-foreground md:inline-flex"
        aria-label="검색 열기"
      >
        <SearchIcon data-icon="inline-start" />
        <span className="flex-1 text-left">검색</span>
        <kbd className="pointer-events-none rounded border bg-muted px-1.5 py-px font-sans text-[0.6875rem] text-muted-foreground">
          Ctrl K
        </kbd>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => handleOpenChange(true)} className="md:hidden" aria-label="검색 열기">
        <SearchIcon />
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        title="사이트 검색"
        description="페이지 이름, 증상, 오류 메시지로 찾아보세요."
        className="sm:max-w-lg"
      >
        <Command shouldFilter={false} className="rounded-xl!">
        <CommandInput
          placeholder="예: 배포 실패, 프로젝트 폴더, 파일 첨부"
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="max-h-[min(60vh,26rem)]">
          {query.trim().length === 0 ? (
            <p className="px-3 py-6 text-center text-[0.8125rem] text-muted-foreground">
              페이지 이름이나 증상을 입력하세요. 오류 메시지를 그대로 붙여 넣어도 됩니다.
            </p>
          ) : loading || !docs ? (
            <p className="px-3 py-6 text-center text-[0.8125rem] text-muted-foreground">검색 준비 중…</p>
          ) : (
            <CommandEmpty>찾는 내용이 없습니다. 다른 말로 검색해 보세요.</CommandEmpty>
          )}
          {grouped.map(([course, list]) => (
            <CommandGroup key={course} heading={course}>
              {list.map(({ doc, snippet }) => (
                <CommandItem key={doc.href} value={doc.href} onSelect={() => go(doc.href)} className="flex-col items-start gap-0.5 py-2">
                  <span className="font-medium text-foreground">{doc.title}</span>
                  {snippet ? (
                    <span className="line-clamp-2 text-[0.8125rem] leading-snug text-muted-foreground">{snippet}</span>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
