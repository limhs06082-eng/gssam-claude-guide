# 콘텐츠 작성 안내

이 문서는 `content/` 아래 MDX 페이지를 쓰는 사람(또는 에이전트)을 위한 규칙이다.
콘텐츠 방향은 `CONTENT-PLAN.md`, 문체와 시각 원칙은 `Claude 초보자 가이드 DESIGN-SYSTEM.md`, 개발 원칙은 `AGENTS.md`를 따른다.

## 파일 위치와 제목

- 파일: `content/{course}/{page}.mdx`
- 어떤 파일을 만들어야 하는지는 `lib/navigation.ts`가 정한다. **거기에 없는 파일을 새로 만들지 않는다.**
- 페이지 제목(H1)은 `navigation.ts`의 `title`을 자동으로 사용한다. 본문에 `# 제목`을 쓰지 않는다.
- 과정 소개 글이 필요하면 `content/{course}/index.mdx`에 2~4문단만 쓴다. (선택)

## frontmatter

```mdx
---
description: 프로젝트 폴더가 무엇인지, 왜 Claude Code가 폴더를 먼저 묻는지 이해합니다.
level: beginner
time: 5
---
```

- `description`: 한 문장, 120자 이하. 과정 목록·검색 결과·브라우저 탭에 쓰인다. "~합니다"로 끝맺는다.
- `level`: `beginner`(초보 필수) 또는 `advanced`(심화)
- `time`: 예상 소요 시간(분). 숫자만.

## 페이지 구조

CONTENT-PLAN.md 25절의 템플릿을 따르되, 페이지 성격에 맞지 않는 섹션은 뺀다.
개념 설명 페이지는 "화면에서 찾아보세요"나 "이렇게 말해보세요"가 없어도 된다.
"다음으로" 섹션은 쓰지 않는다. 이전/다음 버튼은 자동으로 붙는다.

```mdx
## 이것만 알아두세요
(카드 없이 일반 문단. 이 페이지에서 배울 것 1~3문장.)

## 쉽게 생각하면
<Analogy>
비유 설명.
</Analogy>

## 화면에서 찾아보세요
<ScreenGuide>
1. **새 대화** — 새로운 대화를 시작하는 버튼입니다.
2. **입력창** — 화면 아래쪽에 있습니다. 여기에 질문을 씁니다.
</ScreenGuide>

## 직접 해봅시다
<Steps>
<Step title="Claude 앱을 엽니다">
설명.
</Step>
<Step title="입력창에 아래 문장을 붙여 넣습니다">
설명.
</Step>
</Steps>

## 이렇게 말해보세요
<PromptBox>
6학년 학생들이 쉽게 이해할 수 있도록 기후변화를 설명해 줘.
</PromptBox>

## 이렇게 나오면 성공입니다
<Success>
결과의 특징.
</Success>

## 잘 안 된다면
<Troubleshoot>
<Problem title="파일이 첨부되지 않아요">
해결 방법.
</Problem>
</Troubleshoot>

## G쌤 팁
<TeacherTip>
경험에서 나온 조언.
</TeacherTip>
```

## 쓸 수 있는 컴포넌트

import 없이 바로 쓴다. **prop 값은 반드시 문자열("...")로만 쓴다.** `{}` 표현식은 빌드에서 제거된다.

| 컴포넌트 | 용도 | prop |
| --- | --- | --- |
| `<Analogy>` | 쉽게 생각하면 (비유) | `title?` |
| `<TeacherTip>` | G쌤 팁 | `title?` |
| `<Note>` | 잠깐 덧붙이는 참고 | `title?` |
| `<Steps>` + `<Step>` | 직접 해봅시다 (번호 단계) | `Step title?` |
| `<PromptBox>` | 오른쪽 위에 복사 버튼이 있는 프롬프트 상자 | `title?` (보통 생략. 섹션 제목이 역할을 말해 줌) |
| `<ScreenGuide>` | 화면 요소 ①②③ 목록. 안에는 마크다운 번호 목록 | 없음 |
| `<Screenshot>` | 실제 앱 화면 이미지. 클릭하면 확대 | `src` `alt` `caption?` |
| `<Success>` | 이렇게 나오면 성공입니다 | `title?` |
| `<Troubleshoot>` + `<Problem>` | 잘 안 된다면 | `Problem title` (필수) |
| `<Warning>` | 주의. 빨간색은 `variant="danger"`로, 데이터 손실 같은 실제 위험에만 | `title?` `variant?` |
| `<Choice>` + `<Option>` | 질문 → 선택 → 추천 | `Choice question`, `Option label result href cta?` |

섹션 제목(H2)이 이미 역할을 말해 주므로 컴포넌트에 `title`을 또 넣지 않는다.

### 상자를 몇 개까지 쓸 것인가

배경이나 테두리를 가진 컴포넌트(`Analogy` `TeacherTip` `Note` `PromptBox` `Warning` `Choice`)를
한 페이지에 **네 개까지**만 쓴다. 그 이상이면 본문이 카드 더미처럼 보인다.

예외는 `PromptBox` 하나다. 활용 사례 페이지(`chat/for-*`)처럼 상황마다 바로 쓸 프롬프트를
주는 것이 페이지의 목적이라면 다섯 개 이상 반복해도 된다. 각 상자가 별도의 복사 단위이기 때문이다.
이때도 상자 사이에는 반드시 설명 문단을 두어 상자가 연달아 붙지 않게 한다.

`Steps` `ScreenGuide` `Troubleshoot` `Success`는 상자가 아니므로 이 한도에 넣지 않는다.

현재 상태는 `node scripts/audit-content.mjs`의 "상자 밀도" 항목에서 확인한다.

### 프롬프트 섹션 제목

- 학습 중 바로 쓸 프롬프트를 줄 때 → `## 이렇게 말해보세요`
- 오류나 증상을 Claude에게 전달하게 할 때 → `## Claude에게 이렇게 말해보세요`
- `projects` 과정의 제작 요청 → `## Claude에게 요청하기`

이 셋 말고 다른 표현을 새로 만들지 않는다.

## 화면 설명

- 실제 Claude·Firebase·Vercel 앱의 스크린샷은 **쓰지 않는다.** 앱 화면은 자주 바뀌고, 이미지를 유지·관리하는 비용이 크다.
- 대신 `<ScreenGuide>`로 화면 요소를 **기능 이름 + 생김새 + 대략의 위치**로 설명해, 그림 없이도 찾을 수 있게 쓴다.
  - 나쁨: "왼쪽 위 세 번째 아이콘을 누릅니다."
  - 좋음: "**새 대화** — 대화 목록 맨 위에 있는 버튼입니다. 연필이나 더하기 모양 아이콘이 붙어 있습니다."
- `<Screenshot>`은 **이 사이트 자체의 화면**을 보여줄 때만 쓴다. 이미지는 `public/screenshots/` 아래에 두고, 만드는 방법은 `scripts/capture-site.mjs` 참고.

## 문체

- 존댓말 "~합니다 / ~하세요". 반말과 "~해요"체를 섞지 않는다.
- 한 문단은 1~3문장. 한 문장은 짧게.
- 전문 용어는 먼저 쉬운 말로 설명한 뒤 괄호나 다음 문장에서 용어를 소개한다.
  - 나쁨: "Firestore snapshot listener를 등록합니다."
  - 좋음: "데이터가 바뀌는 순간 화면에도 바로 반영되도록 실시간 연결을 설정합니다. Firebase에서는 이 연결에 listener를 사용합니다."
- Bold는 화면의 버튼 이름이나 꼭 기억할 한 구절에만. 문장 전체를 굵게 하지 않는다.
- 이모지를 쓰지 않는다.
- "당연히 알고 있을 것"이라고 가정하지 않는다. 초보자가 실수하는 상황을 적극적으로 포함한다.
- AI에게 모든 판단을 맡기지 말고, 사용자가 목적을 정하고 결과를 확인해야 한다는 원칙을 자연스럽게 반복한다.
- 예제는 학교 수업, 교사 업무, 일상생활에서 가져온다. 실제 학생 개인정보를 예로 들지 않는다. 가상의 이름을 쓴다.

## 프롬프트 예시

- 평소 말하듯 쓴 문장을 보여준다. 프롬프트 공식을 가르치지 않는다.
- "무엇을 원하는지 + 왜 필요한지 + 어떤 형태로 받고 싶은지" 정도만.
- Claude Code에 요청할 때는 "기존 기능은 바꾸지 마" 같은 보존 요청을 습관처럼 붙인다.

## 링크

- 다른 페이지로 갈 때는 절대 경로를 쓴다: `[프로젝트 폴더란?](/code/project-folder)`
- 존재하는 페이지만 링크한다. 목록은 `lib/navigation.ts`.

## 검사

작성 후 반드시 실행한다.

```bash
node scripts/check-content.mjs chat
```

오류가 0이 될 때까지 고친다. 누락 페이지 목록도 함께 나온다.
