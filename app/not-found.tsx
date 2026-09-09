import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-20 md:px-6">
      <p className="text-[0.8125rem] font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">페이지를 찾을 수 없습니다</h1>
      <p className="mt-3 leading-relaxed text-muted-foreground">
        주소가 바뀌었거나 아직 준비 중인 페이지입니다. 홈에서 다시 시작하거나 검색을 이용해 보세요.
      </p>
      <div className="mt-6 flex gap-2">
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/getting-started">처음 오셨나요?</Link>
        </Button>
      </div>
    </main>
  );
}
