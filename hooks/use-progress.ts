"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * 학습 진행률 — 브라우저 LocalStorage에만 저장한다. (AGENTS.md 10절)
 * key: claude-guide-progress, 값: { done: ["/chat/first-question", ...] }
 */
const STORAGE_KEY = "claude-guide-progress";

interface ProgressState {
  done: string[];
}

const EMPTY: ProgressState = { done: [] };
let cache: ProgressState | null = null;
const listeners = new Set<() => void>();

function read(): ProgressState {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    const done =
      parsed && typeof parsed === "object" && Array.isArray((parsed as ProgressState).done)
        ? (parsed as ProgressState).done.filter((s): s is string => typeof s === "string")
        : [];
    cache = { done };
  } catch {
    cache = { done: [] };
  }
  return cache;
}

function write(next: ProgressState) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // 저장 공간이 없거나 사생활 보호 모드: 메모리에서만 유지한다.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress() {
  const state = useSyncExternalStore(subscribe, read, () => EMPTY);

  const isDone = useCallback((href: string) => state.done.includes(href), [state]);

  const toggle = useCallback(
    (href: string) => {
      const current = read();
      const done = current.done.includes(href)
        ? current.done.filter((h) => h !== href)
        : [...current.done, href];
      write({ done });
    },
    [],
  );

  return { done: state.done, isDone, toggle };
}
