import type { ComponentProps } from "react";
import Link from "next/link";
import { Analogy, Note, TeacherTip } from "@/components/learning/callout";
import { Choice, Option } from "@/components/learning/choice";
import { PromptBox } from "@/components/learning/prompt-box";
import { ScreenGuide } from "@/components/learning/screen-guide";
import { Screenshot } from "@/components/learning/screenshot";
import { Step, Steps } from "@/components/learning/steps";
import { Success } from "@/components/learning/success";
import { Problem, Troubleshoot } from "@/components/learning/troubleshoot";
import { Warning } from "@/components/learning/warning";

function Anchor({ href = "", children, ...rest }: ComponentProps<"a">) {
  const internal = href.startsWith("/") || href.startsWith("#");
  if (internal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}

/**
 * 표는 좁은 화면에서 칸을 억지로 줄이지 않고 가로로 스크롤한다.
 * 최소 너비가 없으면 한국어가 두 글자씩 잘려 읽기 어려워진다.
 */
function Table(props: ComponentProps<"table">) {
  return (
    <div className="my-5 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table {...props} className="my-0 min-w-[30rem]" />
    </div>
  );
}

/** MDX에서 import 없이 바로 쓸 수 있는 컴포넌트 목록 */
export const mdxComponents = {
  a: Anchor,
  table: Table,
  Analogy,
  TeacherTip,
  Note,
  Steps,
  Step,
  PromptBox,
  ScreenGuide,
  Screenshot,
  Success,
  Troubleshoot,
  Problem,
  Warning,
  Choice,
  Option,
};

export type MdxComponentName = keyof typeof mdxComponents;
