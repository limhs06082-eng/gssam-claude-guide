import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileStandalone } from "@/lib/content";

export const metadata: Metadata = {
  title: "만든 사람",
  description: "Claude 초보자 가이드를 만든 G쌤 소개와 연락처입니다.",
};

export default async function AboutPage() {
  const content = await compileStandalone("about.mdx");
  if (!content) notFound();

  return (
    <main id="main" className="min-w-0 px-4 py-8 md:px-10 md:py-10 lg:px-12">
      <article className="mx-auto max-w-[44rem]">
        <h1 className="text-[1.75rem] leading-[1.3] font-bold tracking-[-0.015em] md:text-[2rem]">만든 사람</h1>
        <div className="prose prose-guide mt-8">{content}</div>
      </article>
    </main>
  );
}
