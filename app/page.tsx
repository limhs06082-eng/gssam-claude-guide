import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Choice, Option } from "@/components/learning/choice";
import { courses, getPage, starterPath } from "@/lib/navigation";

const paths = [
  {
    slug: "chat",
    name: "Claude Chat",
    verb: "같이 생각하기",
    desc: "질문하고, 글을 다듬고, 자료를 요약합니다. 가장 쉽게 시작하는 방법입니다.",
  },
  {
    slug: "cowork",
    name: "Claude Cowork",
    verb: "일 맡기기",
    desc: "여러 파일을 읽고 정리하는 일을 통째로 맡깁니다. 보고서 초안, 자료 비교에 좋습니다. 새 화면에서는 Chat과 같은 대화창에서 맡깁니다.",
  },
  {
    slug: "code",
    name: "Claude Code",
    verb: "직접 만들기",
    desc: "코딩을 몰라도 나에게 필요한 프로그램을 만들고 인터넷에 공개합니다.",
  },
];

/** 홈: 짧은 소개 → 무엇을 하고 싶은지 선택 → 학습 경로 → 순서대로 배우기 (DESIGN-SYSTEM 15~16절) */
export default function HomePage() {
  const starter = starterPath
    .map((s) => getPage(s.course, s.page))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);
  const more = courses.filter((c) => ["projects", "troubleshooting", "advanced"].includes(c.slug));

  return (
    <main id="main" className="mx-auto max-w-[44rem] px-4 py-10 md:px-6 md:py-16">
      <section>
        <h1 className="text-[1.75rem] leading-[1.35] font-bold tracking-[-0.015em] md:text-[2.125rem]">
          Claude, 어디서부터 시작해야 할지 모르겠다면
        </h1>
        <p className="mt-5 text-[1.0625rem] leading-[1.8] text-foreground/85">
          Chat부터 시작해도 좋고, Cowork로 일을 맡겨도 좋고, Claude Code로 직접 만들어도 좋습니다.
          이 사이트에서는 세 가지를 처음부터 차근차근 배웁니다. 교사와 비개발자를 위해 쓴 자료라서
          전문 용어보다 실제 화면과 따라하기를 우선합니다.
        </p>
      </section>

      <section className="mt-12">
        <Choice question="나는 무엇을 하고 싶나요?" className="my-0">
          <Option label="글을 쓰거나 다듬고 싶어요" result="Claude Chat" href="/chat/what-is-chat">
            안내문, 수업자료, 요약, 아이디어 정리처럼 말로 주고받으며 하는 일은 Chat이 가장 빠릅니다.
          </Option>
          <Option label="여러 파일을 읽고 정리하고 싶어요" result="Claude Cowork" href="/cowork/what-is-cowork">
            PDF 여러 개를 비교하거나 폴더 안의 자료를 분류해 보고서로 만드는 일은 Cowork에 맡깁니다.
          </Option>
          <Option label="나만의 프로그램을 만들고 싶어요" result="Claude Code" href="/code/what-is-vibe-coding">
            수업용 타이머, 발표자 뽑기, 학급 체크리스트 같은 작은 프로그램을 코딩 없이 만들 수 있습니다.
          </Option>
          <Option label="아직 잘 모르겠어요" result="처음 오셨나요?" href="/getting-started/what-is-claude" cta="처음부터 읽기">
            Claude가 무엇인지, 세 가지 방식이 어떻게 다른지 5분이면 감을 잡을 수 있습니다.
          </Option>
        </Choice>
      </section>

      <section className="mt-14">
        <h2 className="text-[1.125rem] font-semibold">세 가지 학습 경로</h2>
        <ul className="mt-3 divide-y border-y">
          {paths.map((p) => {
            const course = courses.find((c) => c.slug === p.slug)!;
            const count = course.sections.reduce((n, s) => n + s.pages.length, 0);
            return (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="group flex items-start gap-4 py-4 transition-colors hover:bg-muted/40 md:-mx-3 md:px-3"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="font-semibold group-hover:underline underline-offset-3">{p.name}</span>
                      <span className="text-[0.875rem] text-muted-foreground">{p.verb}</span>
                    </span>
                    <span className="mt-1 block text-[0.9375rem] leading-relaxed text-muted-foreground">{p.desc}</span>
                    <span className="mt-1 block text-[0.8125rem] text-muted-foreground/80">{count}개 페이지</span>
                  </span>
                  <ArrowRightIcon className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="text-[1.125rem] font-semibold">처음이라면 이 순서로</h2>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
          Claude가 무엇인지 이해하는 것부터 내가 만든 프로그램을 인터넷에 공개하는 것까지, 가장 짧은 길입니다.
          중간에 막히면 문제 해결 과정을 검색하세요.
        </p>
        <ol className="mt-4 space-y-1.5 text-[0.9375rem]">
          {starter.map((p, i) => (
            <li key={p.href} className="flex items-baseline gap-3">
              <span className="w-5 shrink-0 text-right text-[0.8125rem] tabular-nums text-muted-foreground">{i + 1}</span>
              <span className="min-w-0">
                <Link href={p.href} className="hover:underline underline-offset-3">
                  {p.title}
                </Link>
                <span className="ml-2 text-[0.8125rem] whitespace-nowrap text-muted-foreground/80">{p.course.title}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-[1.125rem] font-semibold">이런 것도 있어요</h2>
        <ul className="mt-3 space-y-2 text-[0.9375rem]">
          {more.map((c) => (
            <li key={c.slug} className="flex flex-wrap items-baseline gap-x-2">
              <Link href={`/${c.slug}`} className="font-medium hover:underline underline-offset-3">
                {c.title}
              </Link>
              <span className="text-muted-foreground">{c.tagline}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
