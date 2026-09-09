"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

/** 모바일에서 왼쪽 목차를 Sheet로 연다. (DESIGN-SYSTEM 20절) */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="학습 목차 열기">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(88vw,20rem)] gap-0 p-0 sm:max-w-[20rem]">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-[0.9375rem]">학습 목차</SheetTitle>
          <SheetDescription className="sr-only">과정과 페이지를 선택해 이동합니다.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-3 py-3">
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
