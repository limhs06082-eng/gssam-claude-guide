export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-6 text-[0.8125rem] leading-relaxed text-muted-foreground md:px-6">
        <p>Claude 초보자 가이드 — 교사와 비개발자를 위한 Claude Chat · Cowork · Code 학습 자료</p>
        <p>이 사이트는 개인이 만든 학습 자료이며 Anthropic의 공식 문서가 아닙니다. Claude 앱의 화면과 기능은 업데이트에 따라 달라질 수 있습니다.</p>
      </div>
    </footer>
  );
}
