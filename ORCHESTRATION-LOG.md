# 실행 기록 (세션 로그에서 자동 추출)

이 문서는 손으로 쓴 것이 아니라 `scripts/extract-orchestration-log.mjs`가
Claude Code 세션 로그를 읽어 만든 것이다. `REVIEW.md`의 서술과 대조하는 용도다.

- 원본: `07d06eab-4898-44fd-91da-610c5229f59a.jsonl`
- 기간: 2026-09-08T12:34:14.660Z ~ 2026-09-08T23:19:17.505Z
- 추출 시각: 2026-09-08T23:19:20.132Z

## 메인 에이전트 모델

| 모델 | 응답 수 |
| --- | --- |
| claude-fable-5-1 | 307 |
| claude-opus-5 | 154 |
| <synthetic> | 1 |

## 서브에이전트 위임

총 8건.

| # | 시각 | 모델 | 담당 | 지시문 | 백그라운드 |
| --- | --- | --- | --- | --- | --- |
| 1 | 13:02:13 | opus | Write getting-started + chat content | 2485자 | 예 |
| 2 | 13:02:40 | opus | Write cowork + storage content | 2704자 | 예 |
| 3 | 13:03:09 | opus | Write Claude Code course content | 2765자 | 예 |
| 4 | 13:03:44 | opus | Write deployment + troubleshooting content | 3586자 | 예 |
| 5 | 13:17:34 | opus | Write database + realtime content | 3335자 | 예 |
| 6 | 13:20:48 | opus | Write auth + security content | 3346자 | 예 |
| 7 | 13:21:40 | opus | Write projects + advanced content | 4780자 | 예 |
| 8 | 13:42:48 | opus | Content QA across all courses | 2578자 | 예 |

### 위임 지시문의 필수 항목 충족 여부

| # | 담당 | 담당 영역 | 수정 가능 파일 | 참고 문서 | 완료 기준 | 금지 영역 | 검증 방법 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Write getting-started + chat content | O | O | O | O | O | O |
| 2 | Write cowork + storage content | O | O | O | O | O | O |
| 3 | Write Claude Code course content | O | O | O | O | O | O |
| 4 | Write deployment + troubleshooting content | O | O | O | O | O | O |
| 5 | Write database + realtime content | O | O | O | O | O | O |
| 6 | Write auth + security content | O | O | O | O | O | O |
| 7 | Write projects + advanced content | O | O | O | O | O | O |
| 8 | Content QA across all courses | O | O | O | O | O | O |

### 디렉터리 소유 범위 (지시문의 "변경 가능한 파일" 절에서 추출)

| 디렉터리 | 담당 에이전트 |
| --- | --- |
| `content/advanced/` | 7 |
| `content/auth/` | 6 |
| `content/chat/` | 1 |
| `content/code/` | 3 |
| `content/cowork/` | 2 |
| `content/database/` | 5 |
| `content/deployment/` | 4 |
| `content/getting-started/` | 1 |
| `content/projects/` | 7 |
| `content/realtime/` | 5 |
| `content/security/` | 6 |
| `content/storage/` | 2 |
| `content/troubleshooting/` | 4 |

같은 디렉터리를 둘 이상이 소유한 경우 없음. 병렬 작업 중 파일 충돌 가능성 없음.

참고용으로만 언급한 경로(소유 아님):

- 1번: `content/code/`
- 2번: `content/chat/`, `content/code/`
- 3번: `content/chat/`
- 4번: `content/code/`, `content/chat/`
- 5번: `content/code/`, `content/storage/`, `content/chat/`
- 6번: `content/code/`, `content/storage/`, `content/chat/`, `content/database/`
- 7번: `content/code/`, `content/storage/`, `content/deployment/`, `content/database/`

## 검증 명령 실행 이력

| 검사 | 실행 횟수 |
| --- | --- |
| 린트 | 10 |
| 콘텐츠 검사 | 10 |
| 타입 검사 | 8 |
| 빌드 | 5 |
| 편집 감사 | 8 |

총 29회. 마지막 실행 2026-09-08T23:16:35.

## 메인 에이전트가 직접 편집한 파일

45개 파일, 총 54회.

| 파일 | 편집 횟수 |
| --- | --- |
| `scripts/extract-orchestration-log.mjs` | 3 |
| `components/learning/callout.tsx` | 2 |
| `components/learning/prompt-box.tsx` | 2 |
| `components/learning/warning.tsx` | 2 |
| `components/learning/success.tsx` | 2 |
| `components/learning/mark-complete.tsx` | 2 |
| `content/AUTHORING.md` | 2 |
| `scripts/audit-content.mjs` | 2 |
| `lib/navigation.ts` | 1 |
| `lib/content.ts` | 1 |
| `app/globals.css` | 1 |
| `components/learning/steps.tsx` | 1 |
| `components/learning/screen-guide.tsx` | 1 |
| `components/learning/troubleshoot.tsx` | 1 |
| `components/learning/screenshot.tsx` | 1 |
| `components/learning/choice.tsx` | 1 |
| `components/mdx-components.tsx` | 1 |
| `hooks/use-progress.ts` | 1 |
| `components/layout/sidebar.tsx` | 1 |
| `components/layout/mobile-nav.tsx` | 1 |
| `components/layout/toc.tsx` | 1 |
| `components/layout/search.tsx` | 1 |
| `components/layout/theme-toggle.tsx` | 1 |
| `components/layout/theme-provider.tsx` | 1 |
| `components/layout/site-header.tsx` | 1 |
| `components/layout/course-menu.tsx` | 1 |
| `components/layout/site-footer.tsx` | 1 |
| `components/layout/breadcrumb.tsx` | 1 |
| `components/layout/page-nav.tsx` | 1 |
| `app/layout.tsx` | 1 |
| `app/api/search/route.ts` | 1 |
| `app/not-found.tsx` | 1 |
| `app/[...slug]/layout.tsx` | 1 |
| `app/[...slug]/page.tsx` | 1 |
| `app/page.tsx` | 1 |
| `scripts/check-content.mjs` | 1 |
| `content/code/project-folder.mdx` | 1 |
| `content/chat/first-question.mdx` | 1 |
| `.claude/launch.json` | 1 |
| `content/PRODUCT-FACTS.md` | 1 |
| `README.md` | 1 |
| `<홈>/.claude/projects/C--Users-<사용자>-Documents---------/memory/claude-guide-site-project.md` | 1 |
| `<홈>/.claude/projects/C--Users-<사용자>-Documents---------/memory/orchestration-fable-main-opus-subagents.md` | 1 |
| `<홈>/.claude/projects/C--Users-<사용자>-Documents---------/memory/design-taste-no-ai-look.md` | 1 |
| `REVIEW.md` | 1 |

## 위임 지시문 전문

### 1. Write getting-started + chat content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `getting-started` (처음 오셨나요?) 5개 페이지
- 과정 `chat` (Claude Chat) 12개 페이지 (이 중 `chat/first-question.mdx`는 이미 완성되어 있음. 수정하지 말고 문체의 기준으로 삼을 것)
- 각 과정의 소개 글 `content/getting-started/index.mdx`, `content/chat/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — Claude 제품에 대해 단정해도 되는 사실의 범위. 여기 없는 기능·가격·버튼 위치를 지어내지 말 것.
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `getting-started`와 `chat` 부분만 보면 됨. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/chat/first-question.mdx`, `content/code/project-folder.mdx` — 문체, 길이, 컴포넌트 사용법의 기준.
5. `CONTENT-PLAN.md` 3~5절 (COURSE 0, COURSE 1, Claude Chat 활용 사례)
6. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙), 7절(페이지 공통 구조), 17절(콘텐츠 작성 원칙)
7. `AGENTS.md` 33~34절 (콘텐츠 수정 규칙, Claude 제품 설명 규칙)

## 작성 지침
- 대상: Claude를 처음 쓰는 교사와 비개발자. 전문 용어는 먼저 쉬운 말로 설명.
- 페이지당 분량: 본문 기준 500~900 단어 정도. 짧은 문단(1~3문장).
- 페이지 구조는 AUTHORING.md의 템플릿을 따르되, 페이지 성격에 맞지 않는 섹션은 뺀다. 개념 페이지("Claude란?")는 "화면에서 찾아보세요"가 없어도 됨. 실습 페이지는 반드시 "직접 해봅시다"와 "이렇게 말해보세요"(PromptBox)를 포함.
- 프롬프트 예시는 학교 수업, 교사 업무, 일상생활에서 가져올 것. 실제 사람 이름·학교 이름은 쓰지 말 것.
- `getting-started/which-one` 페이지는 `<Choice>`/`<Option>` 컴포넌트를 한 번 사용해 "무엇을 하고 싶은가요?" 인터랙션을 넣을 것. Option의 href는 존재하는 페이지만(예: /chat/what-is-chat, /cowork/what-is-cowork, /code/what-is-vibe-coding).
- `getting-started/account-and-plans`: 구체적 금액·한도를 쓰지 말고, 무료로 시작할 수 있다는 것, 유료 요금제가 있다는 것, 조건이 바뀌므로 공식 안내를 확인하라는 것만.
- `getting-started/how-to-use-this-site`: 이 사이트의 실제 기능을 설명. 왼쪽 목차(모바일은 왼쪽 위 메뉴 버튼), 오른쪽 "이 페이지에서" 목차, 상단 검색(Ctrl+K), 프롬프트 복사 버튼, 페이지 아래 "완료로 표시" 버튼(브라우저에만 저장됨), 이전/다음 버튼, "초보 필수"/"심화" 표시, 문제 해결 과정 검색.
- `chat/for-lessons`, `for-school-work`, `for-daily-life`는 활용 사례 페이지. 각각 4~6개의 상황을 H3로 나누고 상황마다 PromptBox 하나씩. "직접 해봅시다" 대신 상황별 예시 중심.
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용 (예: `[파일을 넣고 질문하기](/chat/add-files)`).
- 이모지 금지. Bold는 버튼 이름 등 최소한만. "~합니다/~하세요" 존댓말로 통일.
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지.

## 변경 가능한 파일
`content/getting-started/` 와 `content/chat/` 아래 파일만. 그 외 어떤 파일도 수정·생성하지 말 것 (컴포넌트, navigation.ts, 스크립트, 다른 과정 폴더 모두 금지).

## 완료 기준과 검증
1. 위 두 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs getting-started chat` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 2. Write cowork + storage content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `cowork` (Claude Cowork) 15개 페이지
- 과정 `storage` (데이터 저장하기, LocalStorage) 4개 페이지
- 각 과정의 소개 글 `content/cowork/index.mdx`, `content/storage/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — Claude 제품에 대해 단정해도 되는 사실의 범위. 여기 없는 기능·가격·버튼 위치를 지어내지 말 것.
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `cowork`와 `storage` 부분만 보면 됨. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/chat/first-question.mdx`, `content/code/project-folder.mdx` — 문체, 길이, 컴포넌트 사용법의 기준.
5. `CONTENT-PLAN.md` 6~7절 (COURSE 2 Cowork, 교사 활용 사례), 14절 (COURSE 4 데이터 저장), 21~22절 (데이터 체크리스트, Claude Code에게 데이터 기능을 요청하는 방법)
6. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙), 7절(페이지 공통 구조), 17절(콘텐츠 작성 원칙)
7. `AGENTS.md` 10~11절 (LocalStorage 원칙과 한계), 33~34절 (콘텐츠 수정 규칙, Claude 제품 설명 규칙)

## 작성 지침
- 대상: Claude를 처음 쓰는 교사와 비개발자. 전문 용어는 먼저 쉬운 말로 설명.
- 페이지당 분량: 본문 기준 500~900 단어 정도. 짧은 문단(1~3문장).
- 페이지 구조는 AUTHORING.md의 템플릿을 따르되, 페이지 성격에 맞지 않는 섹션은 뺀다. 실습 페이지는 반드시 "직접 해봅시다"와 "이렇게 말해보세요"(PromptBox)를 포함.
- Cowork 설명은 PRODUCT-FACTS.md 범위 안에서: 데스크톱 앱, 작업 폴더 지정, 여러 단계 작업을 통째로 맡김, 중간 과정 표시, 결과 파일 생성, 파일 삭제·덮어쓰기는 확인 필요, 원본 보관 권장. 화면 요소는 기능 이름으로만 부르고 위치를 단정하지 말 것.
- Cowork "활용하기" 3개 페이지는 실제 교사 상황(연수자료 여러 개, 학교 문서에서 업무 추출, 회의자료 요약과 보고서 초안)을 시나리오로 풀 것. 각 페이지에 "목적 전달 → 자료 제공 → 작업 요청 → 중간 확인 → 수정 요청 → 최종 결과" 흐름이 자연스럽게 드러나야 함.
- `cowork/what-to-delegate`와 `cowork/privacy-and-school-data`는 "꼭 알아둘 것" 페이지. 사실·숫자·날짜·이름·파일 누락·문맥·최종 판단은 사람이 확인해야 한다는 원칙, 학생 개인정보와 학교 자료를 AI에게 넣기 전 기관 지침 확인, 민감 정보 최소화. 겁주는 말투가 아니라 실무적인 체크리스트 말투로.
- `storage` 과정은 CONTENT-PLAN 14절 그대로: 새로고침하면 사라지는 체크리스트 상황으로 시작 → LocalStorage를 "브라우저 안의 작은 보관함"으로 설명 → Claude Code에 요청하는 실습("현재 체크리스트의 데이터를 LocalStorage에 저장해서 새로고침해도 유지되게 해 줘. 기존 기능은 변경하지 마.") → 어디까지 LocalStorage로 충분한지 표로 정리. LocalStorage의 한계(기기·브라우저 종속, 데이터 삭제 시 사라짐, 공유 불가, 민감 데이터 부적합)는 반드시 명시.
- storage 실습은 Claude Code 앱에서 이미 만든 체크리스트 프로젝트가 있다고 가정. 코드 자체를 길게 싣지 말고(초보자용), Claude에게 하는 요청과 확인 방법(새로고침해도 남아 있는지, 다른 브라우저에서는 안 보이는지) 중심.
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용. storage에서 다음 단계로 `/database/when-you-need-a-database`, `/projects/personal-checklist`를 자연스럽게 연결.
- 이모지 금지. Bold는 최소한만. "~합니다/~하세요" 존댓말로 통일.
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지.

## 변경 가능한 파일
`content/cowork/` 와 `content/storage/` 아래 파일만. 그 외 어떤 파일도 수정·생성하지 말 것.

## 완료 기준과 검증
1. 위 두 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs cowork storage` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 3. Write Claude Code course content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `code` (Claude Code 앱) 29개 페이지 (이 중 `code/project-folder.mdx`는 이미 완성되어 있음. 수정하지 말고 문체의 기준으로 삼을 것 → 28개 작성)
- 과정 소개 글 `content/code/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — Claude Code 앱, Git, GitHub에 대해 단정해도 되는 사실의 범위. 여기 없는 기능·버튼 위치를 지어내지 말 것.
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `code` 부분(6개 섹션)을 볼 것. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/code/project-folder.mdx`, `content/chat/first-question.mdx` — 문체, 길이, 컴포넌트 사용법의 기준.
5. `CONTENT-PLAN.md` 8~13절 (COURSE 3 Claude Code 앱, 프로젝트 개념, 첫 바이브코딩 프로젝트, 수정, 문제, Git과 GitHub)
6. `Claude 초보자 가이드 홈페이지 PRD.md` 2절(핵심 메시지: CLI 기본 아님), 4절(교육 원칙), 7절(페이지 공통 구조), 17절(콘텐츠 작성 원칙)
7. `AGENTS.md` 3절(작은 변경, 기존 동작 보존), 33~34절 (콘텐츠 수정 규칙, Claude 제품 설명 규칙)

## 작성 지침
- 대상: 코딩 경험이 전혀 없는 교사와 비개발자. 터미널 명령을 외우게 하지 말 것. 모든 것을 Claude에게 말로 요청하는 흐름.
- 이 과정의 첫 결과물은 "간단한 개인 소개 홈페이지"(HTML 한 페이지 수준). 03-10~03-15(생각하기 → 기획 → 첫 요청 → 파일 살펴보기 → 실행 → 브라우저 확인)가 하나의 이야기로 이어져야 함. 03-16~03-20(문장/색상/버튼/기능/모바일 수정)도 같은 홈페이지를 계속 고치는 흐름.
- 페이지당 분량: 본문 기준 500~900 단어. 짧은 문단(1~3문장).
- 실습 페이지는 반드시 "직접 해봅시다"(Steps)와 "이렇게 말해보세요"(PromptBox)를 포함. Claude Code에 보내는 요청에는 "기존 기능과 디자인은 바꾸지 마" 같은 보존 요청을 습관처럼 붙일 것.
- `understand-files`(Claude가 만든 파일 살펴보기): index.html, style.css, script.js 정도의 역할만 "화면 / 꾸밈 / 동작"으로 비유. 코드를 길게 싣지 말 것.
- `run-it`, `check-in-browser`: 앱 안의 미리보기 화면으로 확인하거나 파일을 브라우저로 여는 방법. 위치 단정 금지.
- `errors-are-not-scary`, `show-errors-to-claude`, `when-claude-breaks-things`, `go-back`: 오류 메시지 복사/캡처해서 붙여 넣기, "방금 수정 전으로 되돌려 줘" 요청, Git이 있으면 이전 커밋으로 돌아가기(용어는 뒤 섹션에서 소개하므로 여기서는 "저장해 둔 지점"이라고 먼저 말하고 나중에 Git이라 부른다는 식으로).
- `save-vs-backup`, `what-is-git`, `what-is-github`, `what-is-a-repository`, `push-to-github`: Git은 세이브 포인트, GitHub는 온라인 보관함, Repository는 보관함 하나. `push-to-github`는 Claude에게 "이 프로젝트를 GitHub에 올려 줘"라고 요청하는 흐름과, 처음 한 번 GitHub 로그인 승인이 필요하다는 점, 이후 "변경 내용을 GitHub에 저장해 줘"로 반복한다는 점. 명령어 나열 금지.
- `app-vs-cli`: CLI는 터미널에서 쓰는 버전이 있다는 것만 알려 주고 심화(`/advanced/cli`)로 넘김.
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용 (예: `/deployment/what-is-deployment`, `/troubleshooting/blank-screen`, `/storage/why-save-data`).
- 이모지 금지. Bold는 버튼 이름 등 최소한만. "~합니다/~하세요" 존댓말로 통일.
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지. 코드 블록(```)은 꼭 필요한 곳에서 5줄 이내로만.

## 변경 가능한 파일
`content/code/` 아래 파일만 (단 `project-folder.mdx`는 수정 금지). 그 외 어떤 파일도 수정·생성하지 말 것.

## 완료 기준과 검증
1. `code` 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs code` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 4. Write deployment + troubleshooting content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `deployment` (인터넷에 공개하기, Vercel) 8개 페이지
- 과정 `troubleshooting` (문제 해결) 22개 페이지
- 각 과정의 소개 글 `content/deployment/index.mdx`, `content/troubleshooting/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — Claude, GitHub, Vercel, Firebase에 대해 단정해도 되는 사실의 범위. 여기 없는 기능·메뉴 위치를 지어내지 말 것.
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `deployment`와 `troubleshooting` 부분을 볼 것. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/code/project-folder.mdx`, `content/chat/first-question.mdx` — 문체, 길이, 컴포넌트 사용법의 기준.
5. `CONTENT-PLAN.md` 19절 (COURSE 9 배포), 23절 (COURSE 11 문제 해결), 22절 (Claude Code에게 데이터 기능을 요청하는 방법)
6. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙), 7절(페이지 공통 구조), 11절(검색: 증상과 오류 메시지로 찾기), 17절(콘텐츠 작성 원칙)
7. `AGENTS.md` 15~16절(환경변수, 공개 설정값과 비밀값), 22절(Firebase Security Rules), 33~34절 (콘텐츠 수정 규칙)

## 작성 지침 — deployment
- 대상: 코딩 경험이 없는 교사와 비개발자. Claude Code 앱으로 홈페이지를 만들고 GitHub에 올린 직후의 사람.
- 흐름: 배포란? → Vercel이란? → GitHub와 Vercel 연결(브라우저에서 사용자가 직접: Vercel 가입은 GitHub 계정으로, 저장소 가져오기) → 첫 배포(주소가 생김, 휴대폰으로 열어 보기) → 수정하고 다시 배포(GitHub에 올리면 자동 재배포).
- 뒤 3개(`environment-variables-on-vercel`, `login-after-deploy`, `check-database-connection`)는 `level: advanced`. 데이터베이스·로그인 과정을 마친 뒤 돌아와 읽는 페이지라고 첫 문단에서 밝히고 `/database/environment-variables`, `/auth/add-google-login`으로 링크. 배포 후 로그인이 안 되는 대표 원인(승인된 도메인, OAuth redirect 설정, 환경변수 누락, 재배포 안 함, 브라우저 콘솔 오류 확인)을 체크리스트로.
- Vercel 화면 요소는 기능 이름으로만("환경변수 설정 메뉴", "배포 목록"). 위치 단정 금지. 화면은 바뀔 수 있다고 한 번씩 언급.
- 페이지당 분량: 본문 기준 500~800 단어. 실습 페이지는 "직접 해봅시다"(Steps) 포함. Claude Code에 요청하는 부분이 있으면 PromptBox.

## 작성 지침 — troubleshooting
- 이 과정은 검색으로 찾아오는 페이지. 각 페이지는 300~550 단어로 짧고, 구조는 다음으로 고정:
  1. `## 이런 상황인가요?` — 증상을 2~4개 불릿으로. 초보자가 실제로 보는 오류 메시지 문구나 화면 상태를 그대로(예: "화면이 하얗게만 나온다", "permission-denied", "Missing or insufficient permissions", "404 NOT_FOUND"). 검색에 걸리도록 영어 오류 문구도 함께.
  2. `## 먼저 확인할 것` — 가장 흔한 원인 순서대로 Steps로 3~5단계. 각 단계는 "확인 → 그렇다면 이렇게" 형태.
  3. `## Claude에게 이렇게 말해보세요` — PromptBox 1~2개. 오류 메시지를 붙여 넣고 상황을 설명하는 요청 예시. "기존 기능은 바꾸지 마"를 포함.
  4. `## 그래도 안 된다면` — 관련 학습 페이지 링크 2~3개(`lib/navigation.ts`에 있는 경로만), 필요하면 Warning 하나.
  - "이것만 알아두세요/쉽게 생각하면" 템플릿은 쓰지 않음. TeacherTip은 정말 필요한 페이지에서만.
- 데이터·로그인 관련 페이지(data-not-saving, data-lost-on-refresh, data-missing-on-other-device, realtime-not-updating, firebase-permission-error, supabase-rls-error, cant-login, login-works-locally-only, google-login-loops, user-data-mixed-up, env-vars-not-working)는 `level: advanced`. 나머지는 `beginner`.
- `firebase-permission-error`: 보안 규칙이 막고 있는 것이 정상 동작일 수 있음을 설명. "테스트 모드로 전부 열기"는 임시 조치이며 배포 전 반드시 잠가야 한다는 Warning(variant="danger"가 아닌 기본).
- `user-data-mixed-up`: 사용자 ID 기준으로 데이터를 나누지 않은 것이 원인. 화면에서 숨기는 것과 규칙으로 막는 것의 차이.
- `go-back-to-previous-state`: Claude에게 되돌리기 요청, Git 커밋으로 돌아가기(용어 설명 링크 `/code/what-is-git`), 되돌리기 전에 현재 상태도 저장해 두라는 안내.

## 공통
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용.
- 이모지 금지. Bold는 버튼 이름·오류 문구 등 최소한만. "~합니다/~하세요" 존댓말로 통일.
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지. 코드 블록은 오류 메시지 예시처럼 꼭 필요한 곳에서 5줄 이내.
- 실제 API 키·비밀번호 형태의 값을 쓰지 말 것. 자리표시자 사용.

## 변경 가능한 파일
`content/deployment/` 와 `content/troubleshooting/` 아래 파일만. 그 외 어떤 파일도 수정·생성하지 말 것.

## 완료 기준과 검증
1. 위 두 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs deployment troubleshooting` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 5. Write database + realtime content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `database` (데이터베이스 연결하기, Firebase) 10개 페이지
- 과정 `realtime` (실시간 동기화) 6개 페이지
- 각 과정의 소개 글 `content/database/index.mdx`, `content/realtime/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — 특히 "데이터 저장" 절. Firebase 기준, 공개 설정값과 비밀값의 구분, 보안 규칙.
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `database`와 `realtime` 부분을 볼 것. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/code/project-folder.mdx`, `content/storage/add-localstorage.mdx`(있으면), `content/chat/first-question.mdx` — 문체, 길이, 컴포넌트 사용법의 기준. 앞 과정인 `content/storage/` 파일들이 있으면 훑어보고 이어지는 흐름을 맞출 것.
5. `CONTENT-PLAN.md` 15~16절 (COURSE 5 데이터베이스, COURSE 6 실시간 동기화), 21~22절 (데이터 체크리스트, Claude Code에게 데이터 기능을 요청하는 방법)
6. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙), 7절(페이지 공통 구조), 17절(콘텐츠 작성 원칙)
7. `AGENTS.md` 4절(기술을 먼저 추가하지 않는다), 9절, 12절(Firebase 사용 원칙), 14~16절(서비스 선택, 환경변수, 공개 설정값과 비밀값), 24~27절(실시간 동기화, 구독 관리, 데이터 구조, 데이터 최소화), 31절(CRUD), 33~34절

## 작성 지침
- 대상: 코딩 경험이 없는 교사와 비개발자. Claude Code 앱으로 LocalStorage 체크리스트까지 만든 사람이 다음 단계로 오는 흐름. 모든 구현은 Claude Code에 말로 요청한다. 코드 블록은 꼭 필요한 곳에서 5줄 이내(예: `.env.local`의 자리표시자 예시).
- 용어보다 경험: "다른 컴퓨터에서도 같은 데이터가 보이게" 같은 상황을 먼저 보여 준 뒤 용어(데이터베이스, CRUD, listener)를 소개. CRUD는 `what-is-crud` 페이지에서만 정식으로 소개하고 앞 페이지들에서는 쓰지 않는다.
- Firebase 하나로 끝까지 간다. `firebase-and-supabase`에서만 두 서비스를 짧게 비교하고, "서버부터 직접 만들 필요가 없다"는 개념 이해가 목적임을 밝힌다.
- `create-firebase-project`: Firebase 콘솔에서 프로젝트 생성 → 웹앱 등록 → 설정값 확인 → Claude Code 프로젝트에 연결 요청. 화면 요소는 기능 이름으로만 부르고 위치를 단정하지 말 것. "화면은 바뀔 수 있다"를 한 번 언급. Firestore를 만들 때 "테스트 모드"는 임시이며 배포 전 반드시 보안 규칙을 잠가야 한다는 Warning 포함(`/security/what-are-security-rules` 링크).
- `environment-variables`: `.env.local`, `.gitignore`, GitHub에 올리지 말아야 할 값. 단, Firebase 웹 설정값은 브라우저에 노출되는 공개 설정값이라 "숨기는 것이 보안이 아니다"라는 점을 지나치게 단순화하지 말고 정확히 설명(`/security/hiding-config-is-not-security` 링크).
- `save-first-data` → `load-data` → `update-data` → `delete-data`: 같은 체크리스트 앱을 단계별로 고치는 하나의 이야기. 각 페이지에 Claude Code 요청 PromptBox(현재 상태 설명 + 무엇을 저장 + 누가 사용 + 여러 기기 여부 + 기존 기능 보존)와 확인 방법(새로고침 → 다른 브라우저 → 다른 기기에서 보이는지). `delete-data`에는 삭제 전 확인 창을 넣으라는 요청 포함.
- `realtime`: 교실 상태판 예제(교사가 상태를 바꾸면 다른 브라우저에서 즉시 바뀜). `first-realtime-app`는 기존 체크리스트나 새 상태판에 실시간 연결을 붙이는 요청. `test-in-multiple-browsers`는 같은 컴퓨터의 두 브라우저 창 또는 PC+휴대폰으로 확인. `when-not-to-use-realtime`는 혼자 쓰는 앱에는 불필요하다는 판단 기준. 구독 해제·중복 listener 같은 기술 세부는 "Claude에게 페이지를 떠날 때 연결을 정리하도록 요청" 정도로만.
- 학생 개인정보를 예제 데이터로 쓰지 말 것. 가상의 항목("모둠 1 준비 완료")을 쓴다.
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용 (예: `/storage/is-localstorage-enough`, `/auth/why-login`, `/security/what-are-security-rules`, `/deployment/environment-variables-on-vercel`, `/troubleshooting/firebase-permission-error`, `/projects/shared-checklist`).
- 페이지당 분량: 본문 기준 500~900 단어. 짧은 문단(1~3문장). "~합니다/~하세요" 존댓말. 이모지 금지. Bold 최소.
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지.

## 변경 가능한 파일
`content/database/` 와 `content/realtime/` 아래 파일만. 그 외 어떤 파일도 수정·생성하지 말 것.

## 완료 기준과 검증
1. 위 두 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs database realtime` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 6. Write auth + security content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `auth` (로그인 만들기) 8개 페이지
- 과정 `security` (데이터 보안과 주의점) 6개 페이지
- 각 과정의 소개 글 `content/auth/index.mdx`, `content/security/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — 특히 "데이터 저장" 절(Firebase 기준, 공개 설정값과 비밀값, 보안 규칙, 사용자 ID 기준 구분, 역할 권한은 규칙으로 제한).
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `auth`와 `security` 부분을 볼 것. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/code/project-folder.mdx`, `content/storage/add-localstorage.mdx`, `content/chat/first-question.mdx` — 문체, 길이, 컴포넌트 사용법의 기준. `content/database/` 에 파일이 있으면 몇 개 훑어보고 이어지는 흐름(같은 체크리스트 앱을 계속 발전시킴)을 맞출 것.
5. `CONTENT-PLAN.md` 17~18절 (COURSE 7 로그인, COURSE 8 데이터 보안과 학교에서의 주의점), 21~22절
6. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙), 7절(페이지 공통 구조), 17절(콘텐츠 작성 원칙)
7. `AGENTS.md` 17~23절 (Authentication, 직접 인증 시스템 금지, 인증과 권한 구분, 사용자별 데이터, 역할과 권한, Firebase Security Rules, Supabase RLS), 27~30절 (데이터 최소화, 학교와 학생 데이터, 비밀 정보, API 키), 33~34절

## 작성 지침
- 대상: 코딩 경험이 없는 교사와 비개발자. Firebase 데이터베이스를 붙인 체크리스트 앱까지 만든 사람이 다음 단계로 오는 흐름. 모든 구현은 Claude Code에 말로 요청한다. 코드 블록은 꼭 필요한 곳에서 5줄 이내(보안 규칙 예시는 개념 수준의 짧은 발췌만).
- `auth`: "모두가 같은 체크리스트를 보는 것 vs 로그인한 사람마다 자기 체크리스트를 보는 것" 상황으로 시작 → 인증은 "지금 들어온 사람이 누구인지 확인" → Google 로그인 붙이기(Firebase Authentication, Google 제공자 활성화, 로그인/로그아웃 버튼, 로그인 상태 표시; 승인된 도메인 개념은 배포 페이지 링크) → 사용자 정보 확인(uid, 이메일, 표시 이름; 필요 없는 개인정보는 저장하지 않기) → 로그인한 사용자만 접근(비로그인은 로그인 화면) → 사용자별 데이터(uid 기준으로 자기 데이터만 저장·조회; 이메일을 핵심 식별자로 쓰지 않기) → 권한은 "무엇을 할 수 있는가"(인증과 구분) → 관리자와 일반 사용자(교사=관리자, 학생=사용자; 버튼 숨기기만으로는 권한이 아니라는 점, 규칙에서 제한해야 함 → `/security/login-is-not-enough` 링크).
- 자체 비밀번호 시스템을 만들지 말라는 원칙을 `what-is-authentication`에서 분명히.
- `security`: 겁주는 말투가 아니라 실무 체크리스트 말투. 각 페이지의 핵심 메시지는 CONTENT-PLAN 18절 그대로: 설정값을 숨기는 것은 보안이 아니다(공개 설정값과 비밀키의 차이를 지나치게 단순화하지 않기), 보안 규칙이란 "누가 어떤 데이터를 읽고 쓸 수 있는지 서버 쪽에서 제한하는 규칙"(Firebase Security Rules와 Supabase RLS 개념 연결; 테스트 모드 전체 개방은 배포 전 반드시 잠금), 로그인만 붙이면 안전한가(로그인한 사용자가 남의 데이터를 읽을 수 있는 구조의 문제), 최소한의 데이터만 저장(주민번호 관련 정보·민감한 학생 정보·비밀번호·불필요한 개인정보는 저장하지 않기), 학생 데이터를 다룰 때(기관의 개인정보 지침 확인, 기술적으로 가능해도 저장하지 않기, 가상 데이터로 예제), Claude에게 보안 점검 요청(프롬프트 예시 + Claude의 검토가 전문 보안 감사를 대체하지 않는다는 점).
- `ask-claude-for-security-review`의 PromptBox 예시: "현재 Firebase 보안 규칙과 데이터 접근 코드를 확인해서 로그인하지 않은 사용자가 데이터를 읽거나 수정할 수 있는 부분이 있는지 점검해 줘. 문제가 있으면 먼저 설명하고, 내가 확인한 뒤에 고쳐 줘." 같은 형태.
- 실제 API 키·비밀번호 형태의 값은 절대 쓰지 말고 자리표시자 사용. 실제 학생 개인정보로 보이는 예시 금지(가상의 이름·항목).
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용 (예: `/database/save-first-data`, `/deployment/login-after-deploy`, `/deployment/environment-variables-on-vercel`, `/troubleshooting/cant-login`, `/troubleshooting/user-data-mixed-up`, `/troubleshooting/firebase-permission-error`, `/projects/login-task-manager`, `/projects/teacher-student-app`).
- 페이지당 분량: 본문 기준 500~900 단어. 짧은 문단(1~3문장). "~합니다/~하세요" 존댓말. 이모지 금지. Bold 최소.
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지.

## 변경 가능한 파일
`content/auth/` 와 `content/security/` 아래 파일만. 그 외 어떤 파일도 수정·생성하지 말 것.

## 완료 기준과 검증
1. 위 두 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs auth security` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 7. Write projects + advanced content (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 작성자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

## 담당 영역
- 과정 `projects` (따라 만들어보기) 10개 페이지
- 과정 `advanced` (더 알아보기) 18개 페이지
- 각 과정의 소개 글 `content/projects/index.mdx`, `content/advanced/index.mdx` (2~4문단, frontmatter 없이 본문만, H2 없이 문단만)

## 반드시 먼저 읽을 것 (순서대로)
1. `content/AUTHORING.md` — 파일 규칙, frontmatter, 페이지 구조, 컴포넌트, 문체. 이 문서가 최우선 규칙.
2. `content/PRODUCT-FACTS.md` — Claude 제품·Git·GitHub·Vercel·데이터 저장에 대해 단정해도 되는 사실의 범위. 여기 없는 기능·메뉴·가격을 지어내지 말 것.
3. `lib/navigation.ts` — 만들어야 할 파일 목록과 페이지 제목. `projects`와 `advanced` 부분을 볼 것. 여기 없는 파일은 만들지 말 것.
4. 예시 페이지 `content/code/project-folder.mdx`, `content/code/first-request.mdx`, `content/storage/add-localstorage.mdx` — 문체, 길이, 컴포넌트 사용법의 기준. `content/code/`, `content/deployment/`, `content/database/`의 파일을 몇 개 훑어 앞 과정에서 이미 가르친 내용과 용어를 파악하고, 프로젝트 페이지에서 그것을 링크로 참조할 것.
5. `CONTENT-PLAN.md` 20~22절 (COURSE 10 따라 만들어보기 프로젝트 1~10, 데이터 체크리스트, Claude Code에게 데이터 기능을 요청하는 방법), 24절 (COURSE 12 더 알아보기), 2절 (핵심 콘텐츠 철학)
6. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙, 특히 원칙 6: MCP·Hooks·Skills·Agents는 초보 필수가 아님), 04절 따라 만들어보기 흐름, 06절 더 알아보기, 17절
7. `AGENTS.md` 4절(기술을 먼저 추가하지 않는다), 9~14절, 24절, 26~27절, 33~34절

## 작성 지침 — projects (모두 `level: beginner`, 단 프로젝트 5~9는 `advanced`)
- 각 프로젝트 페이지는 PRD의 흐름을 H2로 고정: `## 무엇을 만드나요` → `## 생각하기` → `## 기획하기` → `## Claude에게 요청하기` → `## 실행하고 확인하기` → `## 수정하기` → `## 저장하고 공개하기` → `## 더 해볼 것` → `## G쌤 팁`. 이 과정은 "이것만 알아두세요/쉽게 생각하면" 템플릿을 쓰지 않는다.
- `생각하기`는 CONTENT-PLAN 21절의 데이터 체크리스트(저장 필요? 현재 기기만? 여러 사람? 실시간? 로그인? 역할?)를 그 프로젝트에 적용한 짧은 표나 목록. 필요 없는 기능(DB, 로그인)을 붙이지 않는 판단을 명시.
- `기획하기`는 누가 쓰는지, 무엇을 할 수 있어야 하는지, 화면에 무엇이 보여야 하는지를 3~6줄로.
- `Claude에게 요청하기`는 PromptBox 1~2개. CONTENT-PLAN 22절 형식(현재 상태 → 저장할 데이터 → 사용자 → 여러 기기 여부 → 실시간 여부 → 로그인 여부 → 기존 기능 보존 → "먼저 계획을 설명한 뒤 작업해 줘").
- `실행하고 확인하기`는 Success 하나 + 확인 항목. `수정하기`는 한 가지 개선 요청 예시(PromptBox). `저장하고 공개하기`는 GitHub·Vercel 페이지 링크로 짧게(`/code/push-to-github`, `/deployment/first-deploy`).
- 프로젝트 1~3은 데이터 저장 없음, 4는 LocalStorage(`/storage/add-localstorage` 링크), 5는 Firebase(`/database/save-first-data`), 6은 실시간(`/realtime/first-realtime-app`), 7은 Google 로그인+사용자별 데이터(`/auth/add-google-login`, `/auth/per-user-data`), 8은 역할(`/auth/admin-and-users`, `/security/login-is-not-enough`), 9는 조합, 10은 사용자가 스스로 결정하는 최종 프로젝트(체크리스트 질문을 순서대로 제시하고, 결정 결과를 Claude에게 전달하는 프롬프트 틀 제공).
- 프로젝트 8(교사-학생 역할)에서는 학생 개인정보 최소화, 가상 데이터, 기관 지침 확인을 반드시 언급(`/security/student-data`).
- 페이지당 분량: 700~1100 단어.

## 작성 지침 — advanced (모두 `level: advanced`)
- 구조: `## 이것만 알아두세요` → `## 쉽게 생각하면`(Analogy) → `## 언제 필요한가요` → `## 어떻게 시작하나요`(Steps 또는 문단, Claude Code에 요청하는 PromptBox 1개) → `## 주의할 점` → `## G쌤 팁`(선택). 300~600 단어로 짧게. 목적은 깊이 가르치는 것이 아니라 "이런 것이 있고, 언제 필요하고, 어떻게 시작하는지"를 알려 주는 것.
- 주제별 핵심:
  - `claude-md`: 프로젝트 폴더에 두는 지침 파일. Claude Code가 세션마다 읽는다. 무엇을 적으면 좋은지(프로젝트 목적, 지키면 좋은 규칙, 하지 말아야 할 것). Claude에게 "이 프로젝트에 맞는 CLAUDE.md를 만들어 줘"라고 요청하는 예시.
  - `agents-md`: 여러 AI 도구가 공통으로 읽는 지침 파일이라는 관례. CLAUDE.md와의 관계는 단정하지 말고 "프로젝트 지침을 파일로 관리한다"는 개념 중심.
  - `skills`, `plugins`, `mcp`, `multiple-agents`: PRODUCT-FACTS에 세부 사실이 없으므로 일반적 개념 수준으로만. Skills=반복 작업 절차를 저장해 두고 불러 쓰는 것, Plugins=기능 묶음을 추가하는 것, MCP=Claude가 외부 서비스·도구와 연결되는 표준 방식, 여러 에이전트=큰 작업을 나눠 맡기는 방식. "제공 방식과 이름은 버전에 따라 달라질 수 있으니 공식 문서를 확인"이라는 문장을 각 페이지에 한 번씩.
  - `vscode`, `cli`: 앱 밖에서 쓰는 방법이 있다는 것, 초보자는 앱으로 충분하다는 것. CLI는 터미널에서 `claude` 명령으로 시작한다는 정도만.
  - `git-advanced`: 브랜치(작업을 나눠 하는 갈래), 커밋 되돌리기, 충돌이 무엇인지. 명령어 나열 대신 Claude에게 요청하는 표현.
  - `firebase-advanced`, `supabase-advanced`: 기본 과정에서 쓰지 않은 기능 소개(Storage, Functions, Realtime Database vs Firestore / Supabase의 Table·Row·RLS·Realtime). 깊이 들어가지 않기.
  - `data-modeling`: 데이터를 저장하기 전에 정하는 것(어떤 데이터, 누가 만든, 누가 보는, 누가 수정, 언제 삭제, 실시간 필요?) — AGENTS.md 26절.
  - `api`: "다른 서비스의 기능을 프로그램에서 불러 쓰는 창구"라는 비유, API 키를 브라우저에 노출하지 말 것.
  - `serverless-functions`: 브라우저에서 하면 안 되는 일(비밀키 사용, 결제, 무거운 처리)을 서버 쪽 함수로. Vercel Functions / Firebase Functions 이름 정도만.
  - `file-uploads`: 이미지·파일 업로드에는 별도 저장소(Firebase Storage 등)가 필요. 용량·개인정보 주의.
  - `notifications`: 이메일·알림은 외부 서비스가 필요하고 발송량 제한이 있다는 것.
  - `admin-pages`: 관리자만 보는 화면 = 역할 권한(`/auth/admin-and-users`) + 규칙.
  - `logs-and-monitoring`: 배포 후 오류를 어떻게 알 수 있는지(Vercel 로그, 브라우저 콘솔), 개인정보를 로그에 남기지 말 것.
- 다른 페이지로 링크할 때는 `lib/navigation.ts`에 있는 경로만 사용.

## 공통
- 대상은 코딩 경험이 없는 교사와 비개발자. 전문 용어는 먼저 쉬운 말로. "~합니다/~하세요" 존댓말. 이모지 금지. Bold 최소. 짧은 문단(1~3문장).
- 컴포넌트 prop은 문자열만. `{}` 표현식 금지. 코드 블록은 꼭 필요한 곳에서 5줄 이내.
- 실제 API 키·비밀번호 형태의 값, 실제 학생 개인정보로 보이는 예시 금지.

## 변경 가능한 파일
`content/projects/` 와 `content/advanced/` 아래 파일만. 그 외 어떤 파일도 수정·생성하지 말 것.

## 완료 기준과 검증
1. 위 두 과정의 모든 페이지 파일이 존재한다.
2. 프로젝트 루트에서 `node scripts/check-content.mjs projects advanced` 실행 결과 오류 0, 누락 0. (경고는 가능하면 0)
3. 마지막에 다음을 보고: 작성한 파일 목록, 검사 결과 요약, 확신이 없어 일반적으로 표현한 제품 관련 내용, 남은 문제.

작업은 페이지 하나씩 완성하며 진행하고, 5개 정도 쓸 때마다 검사 스크립트를 돌려 오류를 바로 고치세요.
```

### 8. Content QA across all courses (opus)

```text
당신은 한국어 학습 사이트 "Claude 초보자 가이드"의 콘텐츠 QA 편집자입니다. 프로젝트 루트: <홈>\Documents\클로드 홈페이지

`content/` 아래 13개 과정, 153개 학습 페이지 + 13개 과정 소개(index.mdx)를 7명의 작성자가 나눠 썼습니다. 이제 전체를 한 사람이 쓴 것처럼 통일하고, 초보자 관점의 문제를 잡는 것이 당신의 일입니다.

## 먼저 읽을 것
1. `content/AUTHORING.md` — 규칙 (문체, 구조, 컴포넌트, 링크)
2. `content/PRODUCT-FACTS.md` — 제품에 대해 단정해도 되는 사실의 범위
3. `lib/navigation.ts` — 과정/페이지 순서. 이 순서가 학습 순서다.
4. `CONTENT-PLAN.md` 2절(핵심 콘텐츠 철학), 29절(콘텐츠 완성 기준)
5. `Claude 초보자 가이드 홈페이지 PRD.md` 4절(교육 원칙), 17절(콘텐츠 작성 원칙)

## 검토 항목 (우선순위 순)
1. **사실 과잉 단정**: PRODUCT-FACTS 범위를 넘어 버튼 위치·메뉴 경로·가격·한도·모델 이름·출시 시기를 단정한 문장. "왼쪽 위 두 번째" 같은 위치 단정. → 기능 이름 중심으로 완화.
2. **서사 연속성**: Code → 배포 → 데이터 저장 → 데이터베이스 → 실시간 → 로그인 → 보안 → 따라 만들기 순서로 "같은 체크리스트 앱"을 발전시키는 이야기가 이어지는지. 앞 페이지에서 만든 상태와 뒤 페이지가 가정하는 상태가 어긋나는 곳. 특히 `storage/add-localstorage`가 전제하는 앱과 `projects/personal-checklist`, `database/save-first-data`가 이어받는 앱이 같은지.
3. **용어 순서**: 용어를 소개하기 전에 설명 없이 먼저 쓴 곳 (예: `database/what-is-crud` 이전 페이지의 "CRUD", `code/what-is-git` 이전의 "커밋", Firestore/listener/uid 같은 단어가 첫 등장 시 쉬운 말 없이 나오는 곳).
4. **문체 통일**: "~합니다/~하세요" 존댓말 밖의 문장(반말, ~해요체), 이모지, 문장 전체 굵게, 한 문단 4문장 이상, 같은 페이지 안에서 "Claude"를 "클로드"로 섞어 쓰는 등 표기 불일치. 영문 표기 통일: Claude, Cowork, Claude Code, GitHub, Vercel, Firebase, Supabase, LocalStorage, Google. 
5. **중복**: 두 페이지가 같은 내용을 거의 같은 길이로 반복하는 곳(예: `code/go-back`과 `troubleshooting/go-back-to-previous-state`, `cowork/review-results`와 `cowork/what-to-delegate`, `deployment/redeploy`와 `troubleshooting/changes-not-deployed`). 문제 해결 페이지는 증상 중심으로 짧게, 학습 페이지는 개념 중심으로. 겹치면 한쪽을 줄이고 링크로 대체.
6. **초보자 난이도**: 초보 필수(level: beginner) 페이지에 코딩 지식을 전제하는 문장이 있는지. 코드 블록이 5줄을 넘거나 꼭 필요하지 않은 곳.
7. **링크 실용성**: "잘 안 된다면"과 문제 해결 페이지의 링크가 실제로 그 증상에 맞는 페이지를 가리키는지.
8. **G쌤 팁 일관성**: 1인칭("저는")의 교사 경험담 톤이 유지되는지. 다른 컴포넌트와 중복되는 팁.

## 수정 권한
- `content/**/*.mdx` 파일만 수정할 수 있습니다. 그 외(컴포넌트, navigation.ts, 스크립트, 문서)는 수정 금지.
- **작은 수정은 직접 합니다**: 문장 완화, 용어 순서 조정(한 문장 추가), 표기 통일, 중복 문단 삭제와 링크 대체, 문체 교정. 페이지 구조(H2 순서)와 frontmatter의 level/time은 바꾸지 마세요.
- **큰 수정은 하지 않고 보고합니다**: 페이지를 새로 써야 하거나 두 페이지를 합쳐야 하는 경우, navigation 변경이 필요한 경우.
- 파일을 고친 뒤에는 `node scripts/check-content.mjs`를 실행해 오류 0을 유지하세요.
- 새 컴포넌트나 `{}` 표현식을 쓰지 마세요.

## 진행 방법
- 13개 과정을 navigation.ts 순서대로 읽습니다. 153페이지를 다 읽어야 합니다. 과정 하나를 읽고 그 과정의 수정을 끝낸 뒤 다음 과정으로 넘어가세요.
- 검토 항목 1(사실 단정)은 `grep`으로 먼저 훑으면 빠릅니다: "왼쪽 위", "오른쪽 위", "두 번째", "메뉴 >", "원", "달러", "\$", "무료 요금제에서는", "Sonnet", "Opus", "Haiku", "Fable" 등.

## 완료 보고 형식
1. 직접 수정한 파일 목록과 각 파일에서 무엇을 바꿨는지 한 줄씩 (많으면 과정별로 묶어서).
2. 수정하지 않고 남긴 큰 문제 (파일, 문제, 제안).
3. 서사 연속성 검토 결과 (어긋난 곳과 처리).
4. `node scripts/check-content.mjs` 최종 결과.
```
