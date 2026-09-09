"use client";

/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ZoomInIcon } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { withBase } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * 실제 앱 화면 — 얇은 테두리, 원본 비율, 클릭하면 확대. (DESIGN-SYSTEM 14절)
 * 이미지는 public/screenshots/ 아래에 두고 src="/screenshots/파일명.png" 으로 쓴다.
 */
export function Screenshot({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  // <img> 는 Next Link 와 달리 basePath 를 자동으로 붙이지 않는다.
  const url = src.startsWith("/") ? withBase(src) : src;
  return (
    <figure className={cn("not-prose my-6", className)}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-lg border bg-card text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        aria-label={`${alt} 확대해서 보기`}
      >
        <img src={url} alt={alt} className="block h-auto w-full" loading="lazy" />
        <span className="absolute right-2 bottom-2 inline-flex items-center gap-1 rounded-md border bg-card/95 px-2 py-1 text-[0.75rem] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <ZoomInIcon className="size-3.5" aria-hidden />
          확대
        </span>
      </button>
      {caption ? (
        <figcaption className="mt-2 text-[0.875rem] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[min(96vw,1200px)] p-2 sm:max-w-[min(96vw,1200px)]">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <img src={url} alt={alt} className="block max-h-[85vh] w-auto max-w-full rounded-md object-contain" />
        </DialogContent>
      </Dialog>
    </figure>
  );
}
