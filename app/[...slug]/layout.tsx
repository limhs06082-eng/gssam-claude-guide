import { Sidebar } from "@/components/layout/sidebar";

/**
 * 학습 페이지 공통 틀: 왼쪽 목차 / 본문 / (xl 이상) 오른쪽 페이지 목차.
 * 페이지가 그리드의 나머지 칸을 채운다. layout이므로 페이지 이동 시 사이드바 상태가 유지된다.
 */
export default function DocsLayout({ children }: LayoutProps<"/[...slug]">) {
  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[16rem_minmax(0,1fr)] xl:grid-cols-[16rem_minmax(0,1fr)_14rem]">
      <aside className="hidden border-r lg:block">
        <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-6">
          <Sidebar />
        </div>
      </aside>
      {children}
    </div>
  );
}
