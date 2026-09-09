"use client";

import Link from "next/link";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { courses } from "@/lib/navigation";

/** 상단의 과정 선택 메뉴. 홈처럼 사이드바가 없는 화면에서 과정으로 바로 이동한다. */
export function CourseMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="hidden md:inline-flex">
          과정
          <ChevronDownIcon data-icon="inline-end" className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {courses.map((course) => (
          <DropdownMenuItem key={course.slug} asChild>
            <Link href={`/${course.slug}`}>{course.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
