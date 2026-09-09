# Claude 초보자 가이드

Claude를 처음 사용하는 교사와 비개발자를 위한 한국어 학습 사이트입니다.
Claude Chat(같이 생각하기), Claude Cowork(일 맡기기), Claude Code 앱(직접 만들기)을 기초부터 안내하고,
데이터 저장 → 데이터베이스 → 실시간 동기화 → 로그인 → 보안 → 배포까지 이어집니다.

기획 문서: `Claude 초보자 가이드 홈페이지 PRD.md`, `Claude 초보자 가이드 DESIGN-SYSTEM.md`, `CONTENT-PLAN.md`, `AGENTS.md`

제작 기록: [`REVIEW.md`](REVIEW.md) (무엇을 왜 그렇게 정했는지), [`ORCHESTRATION-LOG.md`](ORCHESTRATION-LOG.md) (세션 로그에서 자동 추출한 실행 기록)

## 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

```bash
npm run build   # 배포용 빌드 (모든 페이지를 정적으로 생성)
npm run lint    # ESLint
npm run check   # 콘텐츠 검사 (누락 페이지, frontmatter, 컴포넌트, 링크)
npm run audit   # 편집 감사 (상자 밀도, 문체, 중복, 난이도 분포)
```

## 구조

```
app/
  page.tsx              홈
  [...slug]/            과정 소개(/chat) 와 학습 페이지(/chat/first-question)
  api/search/route.ts   빌드 시 생성되는 검색 인덱스
components/
  layout/               헤더, 사이드바, 목차, 검색, 이전/다음
  learning/             학습용 컴포넌트 (Analogy, Steps, PromptBox, Screenshot ...)
  ui/                   shadcn/ui
content/                MDX 학습 콘텐츠 (과정별 폴더)
  AUTHORING.md          콘텐츠 작성 규칙
  PRODUCT-FACTS.md      제품 설명 시 단정해도 되는 사실의 범위
lib/
  navigation.ts         정보구조(과정 → 섹션 → 페이지). 제목과 순서의 단일 진실 원천
  content.ts            MDX 읽기·컴파일·목차·검색 인덱스
scripts/check-content.mjs  콘텐츠 검사
```

## 콘텐츠 추가·수정

1. `lib/navigation.ts`에 페이지를 추가하거나 제목을 바꿉니다. (사이드바, 이전/다음, 검색이 모두 여기서 파생됩니다.)
2. `content/{course}/{page}.mdx`를 만듭니다. 규칙은 `content/AUTHORING.md`.
3. `npm run check`로 검사합니다.

### 화면 설명

실제 Claude·Firebase·Vercel 앱의 스크린샷은 쓰지 않습니다. 앱 화면이 자주 바뀌기 때문입니다.
대신 `<ScreenGuide>` 번호 목록으로 화면 요소를 기능 이름과 생김새로 설명합니다.

`<Screenshot>`은 이 사이트 자체 화면(목차, 검색, 모바일 메뉴)을 보여줄 때만 씁니다.
이미지는 `public/screenshots/`에 있고, 사이트가 바뀌면 다음 명령으로 다시 만듭니다.

```bash
npm run build && npm run capture
```

## 학습 진행률

"완료로 표시" 버튼과 사이드바의 완료 표시는 브라우저 LocalStorage(`claude-guide-progress`)에만 저장됩니다.
회원가입이나 서버는 없습니다.

## 배포

GitHub 저장소를 Vercel에 연결하면 됩니다. 환경변수는 필요 없습니다.
