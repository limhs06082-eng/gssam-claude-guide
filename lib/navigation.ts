/**
 * 사이트 정보구조(IA)의 단일 진실 원천.
 *
 * - 과정(course) → 섹션(section) → 페이지(page) 순서가 곧 사이드바 순서이자
 *   이전/다음 페이지 순서다.
 * - 페이지 제목은 여기서 정의한다. MDX frontmatter에는 description/level/time만 둔다.
 * - URL: /{course.slug}/{page.slug}
 * - 콘텐츠 파일: content/{course.slug}/{page.slug}.mdx
 */

export type Level = "beginner" | "advanced";

export interface NavPage {
  slug: string;
  title: string;
}

export interface NavSection {
  /** 섹션 제목. 과정에 섹션이 하나뿐이면 비워도 된다. */
  title?: string;
  pages: NavPage[];
}

export interface NavCourse {
  slug: string;
  /** 사이드바/검색에 쓰는 짧은 이름 */
  title: string;
  /** 과정 소개 페이지의 한 줄 설명 */
  tagline: string;
  /** false면 순서대로 읽는 과정이 아니다(문제 해결, 더 알아보기). 소개 페이지에 시작 버튼을 두지 않는다. */
  linear?: boolean;
  sections: NavSection[];
}

export const courses: NavCourse[] = [
  {
    slug: "getting-started",
    title: "처음 오셨나요?",
    tagline: "Claude가 무엇인지, 나에게 맞는 시작점이 어디인지 알아봅니다.",
    sections: [
      {
        pages: [
          { slug: "what-is-claude", title: "Claude란?" },
          { slug: "three-ways", title: "Chat, Cowork, Code의 차이" },
          { slug: "which-one", title: "나에게 맞는 Claude 찾기" },
          { slug: "account-and-plans", title: "계정 만들기와 요금제" },
          { slug: "how-to-use-this-site", title: "이 사이트 이용 방법" },
        ],
      },
    ],
  },
  {
    slug: "chat",
    title: "Claude Chat",
    tagline: "같이 생각하기. Claude와 대화하며 글쓰기, 요약, 아이디어 정리를 해봅니다.",
    sections: [
      {
        title: "기본 익히기",
        pages: [
          { slug: "what-is-chat", title: "Claude Chat이란?" },
          { slug: "screen-tour", title: "화면 살펴보기" },
          { slug: "first-question", title: "처음 질문해보기" },
          { slug: "keep-talking", title: "대화를 이어가며 고치기" },
          { slug: "add-files", title: "파일을 넣고 질문하기" },
          { slug: "ask-with-images", title: "이미지와 함께 질문하기" },
          { slug: "good-requests", title: "좋은 요청을 만드는 가장 쉬운 방법" },
          { slug: "give-context", title: "Claude에게 상황을 설명하는 방법" },
          { slug: "projects", title: "프로젝트 활용하기" },
        ],
      },
      {
        title: "활용하기",
        pages: [
          { slug: "for-lessons", title: "수업에 활용하기" },
          { slug: "for-school-work", title: "교사 업무에 활용하기" },
          { slug: "for-daily-life", title: "일상생활에 활용하기" },
        ],
      },
    ],
  },
  {
    slug: "cowork",
    title: "Claude Cowork",
    tagline: "일 맡기기. 여러 파일을 읽고 정리하는 작업을 Claude에게 통째로 맡겨봅니다.",
    sections: [
      {
        title: "기본 익히기",
        pages: [
          { slug: "what-is-cowork", title: "Cowork란?" },
          { slug: "chat-vs-cowork", title: "Chat과 Cowork의 차이" },
          { slug: "screen-tour", title: "화면 살펴보기" },
          { slug: "first-task", title: "첫 작업 맡겨보기" },
          { slug: "work-with-files", title: "파일을 주고 작업시키기" },
          { slug: "many-files", title: "여러 파일 한꺼번에 처리하기" },
          { slug: "research-and-organize", title: "조사와 정리 맡기기" },
          { slug: "make-deliverables", title: "결과물 만들기" },
          { slug: "change-direction", title: "작업 중간에 방향 바꾸기" },
          { slug: "review-results", title: "결과 검토하기" },
        ],
      },
      {
        title: "활용하기",
        pages: [
          { slug: "organize-training-materials", title: "여러 연수자료 정리하기" },
          { slug: "analyze-school-documents", title: "학교 문서 분석하기" },
          { slug: "meeting-notes-and-reports", title: "회의자료 정리와 보고서 초안" },
        ],
      },
      {
        title: "꼭 알아둘 것",
        pages: [
          { slug: "what-to-delegate", title: "AI에게 맡겨도 되는 일" },
          { slug: "privacy-and-school-data", title: "개인정보와 학교 자료 다루기" },
        ],
      },
    ],
  },
  {
    slug: "code",
    title: "Claude Code",
    tagline: "직접 만들기. 코딩 경험 없이 Claude Code 앱으로 프로그램 하나를 완성합니다.",
    sections: [
      {
        title: "시작하기",
        pages: [
          { slug: "what-is-vibe-coding", title: "바이브코딩이란?" },
          { slug: "what-is-claude-code", title: "Claude Code란?" },
          { slug: "app-vs-cli", title: "Claude Code 앱과 CLI의 차이" },
          { slug: "getting-started", title: "Claude Code 앱 시작하기" },
          { slug: "screen-tour", title: "화면 살펴보기" },
        ],
      },
      {
        title: "프로젝트 이해하기",
        pages: [
          { slug: "what-is-a-project", title: "프로젝트란?" },
          { slug: "project-folder", title: "프로젝트 폴더란?" },
          { slug: "new-project", title: "새 프로젝트 만들기" },
          { slug: "open-project", title: "기존 프로젝트 다시 열기" },
        ],
      },
      {
        title: "처음 만들어보기",
        pages: [
          { slug: "think-first", title: "만들기 전에 생각하기" },
          { slug: "plan-with-claude", title: "Claude와 함께 기획하기" },
          { slug: "first-request", title: "첫 제작 요청 보내기" },
          { slug: "understand-files", title: "Claude가 만든 파일 살펴보기" },
          { slug: "run-it", title: "프로그램 실행하기" },
          { slug: "check-in-browser", title: "브라우저에서 결과 확인하기" },
        ],
      },
      {
        title: "수정하기",
        pages: [
          { slug: "change-text", title: "문장 바꾸기" },
          { slug: "change-colors", title: "색상 바꾸기" },
          { slug: "add-a-button", title: "버튼 추가하기" },
          { slug: "add-a-feature", title: "새 기능 하나 추가하기" },
          { slug: "fix-mobile", title: "모바일 화면 수정하기" },
        ],
      },
      {
        title: "문제가 생겼을 때",
        pages: [
          { slug: "errors-are-not-scary", title: "오류 메시지는 무서운 것이 아닙니다" },
          { slug: "show-errors-to-claude", title: "Claude에게 오류 보여주기" },
          { slug: "when-claude-breaks-things", title: "Claude가 잘못 수정했을 때" },
          { slug: "go-back", title: "이전 상태로 돌아가기" },
        ],
      },
      {
        title: "저장하고 관리하기",
        pages: [
          { slug: "save-vs-backup", title: "저장과 백업의 차이" },
          { slug: "what-is-git", title: "Git이란?" },
          { slug: "what-is-github", title: "GitHub란?" },
          { slug: "what-is-a-repository", title: "Repository란?" },
          { slug: "push-to-github", title: "GitHub에 프로젝트 올리기" },
        ],
      },
    ],
  },
  {
    slug: "deployment",
    title: "인터넷에 공개하기",
    tagline: "내가 만든 웹앱을 Vercel로 배포해 누구나 접속할 수 있는 주소를 만듭니다.",
    sections: [
      {
        title: "첫 배포",
        pages: [
          { slug: "what-is-deployment", title: "배포란?" },
          { slug: "what-is-vercel", title: "Vercel이란?" },
          { slug: "connect-github-and-vercel", title: "GitHub와 Vercel 연결하기" },
          { slug: "first-deploy", title: "내 웹앱 인터넷에 공개하기" },
          { slug: "redeploy", title: "수정한 내용 다시 배포하기" },
        ],
      },
      {
        title: "데이터와 로그인이 있는 앱 배포",
        pages: [
          { slug: "environment-variables-on-vercel", title: "Vercel에 환경변수 등록하기" },
          { slug: "login-after-deploy", title: "배포 후 로그인 테스트하기" },
          { slug: "check-database-connection", title: "데이터베이스 연결 확인하기" },
        ],
      },
    ],
  },
  {
    slug: "storage",
    title: "데이터 저장하기",
    tagline: "새로고침해도 내용이 남아 있는 웹앱을 만듭니다. 첫 단계는 LocalStorage입니다.",
    sections: [
      {
        pages: [
          { slug: "why-save-data", title: "데이터 저장이 왜 필요한가요?" },
          { slug: "what-is-localstorage", title: "LocalStorage란?" },
          { slug: "add-localstorage", title: "LocalStorage 붙여보기" },
          { slug: "is-localstorage-enough", title: "어떤 앱까지 LocalStorage로 충분할까요?" },
        ],
      },
    ],
  },
  {
    slug: "database",
    title: "데이터베이스 연결하기",
    tagline: "다른 컴퓨터와 다른 사람도 같은 데이터를 보게 만듭니다.",
    sections: [
      {
        title: "개념 이해하기",
        pages: [
          { slug: "what-is-a-database", title: "데이터베이스란?" },
          { slug: "when-you-need-a-database", title: "언제 데이터베이스가 필요한가요?" },
          { slug: "firebase-and-supabase", title: "Firebase와 Supabase" },
        ],
      },
      {
        title: "연결하고 저장하기",
        pages: [
          { slug: "create-firebase-project", title: "Firebase 프로젝트 만들기" },
          { slug: "environment-variables", title: "환경변수란?" },
          { slug: "save-first-data", title: "첫 데이터 저장하기" },
          { slug: "load-data", title: "데이터 불러오기" },
          { slug: "update-data", title: "데이터 수정하기" },
          { slug: "delete-data", title: "데이터 삭제하기" },
          { slug: "what-is-crud", title: "CRUD란?" },
        ],
      },
    ],
  },
  {
    slug: "realtime",
    title: "실시간 동기화",
    tagline: "한 사람이 바꾼 내용이 다른 사람 화면에도 바로 보이게 만듭니다.",
    sections: [
      {
        pages: [
          { slug: "what-is-realtime", title: "실시간 동기화란?" },
          { slug: "realtime-vs-normal", title: "일반 저장과 무엇이 다른가요?" },
          { slug: "first-realtime-app", title: "첫 실시간 웹앱 만들기" },
          { slug: "test-in-multiple-browsers", title: "여러 브라우저에서 테스트하기" },
          { slug: "classroom-uses", title: "학교 수업에서 활용하기" },
          { slug: "when-not-to-use-realtime", title: "실시간 기능이 필요 없는 경우" },
        ],
      },
    ],
  },
  {
    slug: "auth",
    title: "로그인 만들기",
    tagline: "사용자를 구분하고, 사람마다 자기 데이터만 보게 만듭니다.",
    sections: [
      {
        title: "로그인 붙이기",
        pages: [
          { slug: "why-login", title: "왜 로그인이 필요한가요?" },
          { slug: "what-is-authentication", title: "인증(Authentication)이란?" },
          { slug: "add-google-login", title: "Google 로그인 붙이기" },
          { slug: "read-user-info", title: "로그인한 사용자 정보 확인하기" },
          { slug: "protect-pages", title: "로그인한 사용자만 접근하게 하기" },
        ],
      },
      {
        title: "사용자별 데이터와 권한",
        pages: [
          { slug: "per-user-data", title: "사용자별 데이터 저장하기" },
          { slug: "what-is-authorization", title: "권한(Authorization)이란?" },
          { slug: "admin-and-users", title: "관리자와 일반 사용자" },
        ],
      },
    ],
  },
  {
    slug: "security",
    title: "데이터 보안과 주의점",
    tagline: "로그인과 데이터베이스를 붙였다고 저절로 안전해지지는 않습니다.",
    sections: [
      {
        pages: [
          { slug: "hiding-config-is-not-security", title: "설정값을 숨기면 안전한가요?" },
          { slug: "what-are-security-rules", title: "보안 규칙이란?" },
          { slug: "login-is-not-enough", title: "로그인만 붙이면 안전한가요?" },
          { slug: "store-minimal-data", title: "최소한의 데이터만 저장하기" },
          { slug: "student-data", title: "학생 데이터를 다룰 때" },
          { slug: "ask-claude-for-security-review", title: "Claude에게 보안 점검 요청하기" },
        ],
      },
    ],
  },
  {
    slug: "projects",
    title: "따라 만들어보기",
    tagline: "생각하기부터 배포까지, 실제로 쓸 수 있는 프로그램을 하나씩 완성합니다.",
    sections: [
      {
        title: "데이터 저장 없이",
        pages: [
          { slug: "intro-homepage", title: "나만의 한 페이지 홈페이지" },
          { slug: "class-timer", title: "수업용 타이머" },
          { slug: "random-picker", title: "무작위 발표자 뽑기" },
        ],
      },
      {
        title: "데이터를 저장하는 앱",
        pages: [
          { slug: "personal-checklist", title: "개인 업무 체크리스트" },
          { slug: "shared-checklist", title: "여러 기기에서 쓰는 체크리스트" },
          { slug: "live-class-board", title: "실시간 학급 상태판" },
        ],
      },
      {
        title: "로그인이 있는 앱",
        pages: [
          { slug: "login-task-manager", title: "로그인하는 개인 업무 관리 앱" },
          { slug: "teacher-student-app", title: "교사와 학생 역할이 다른 앱" },
          { slug: "live-class-tools", title: "실시간 수업 도구" },
          { slug: "your-own-project", title: "나에게 필요한 프로그램" },
        ],
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "문제 해결",
    tagline: "증상으로 찾아보세요. 오류 메시지를 검색해도 됩니다.",
    linear: false,
    sections: [
      {
        title: "Claude와 대화할 때",
        pages: [
          { slug: "claude-doesnt-understand", title: "Claude가 내 말을 잘 이해하지 못해요" },
          { slug: "wrong-results", title: "원하는 결과가 나오지 않아요" },
          { slug: "broke-other-features", title: "수정했더니 다른 기능이 고장 났어요" },
          { slug: "go-back-to-previous-state", title: "이전 상태로 돌아가고 싶어요" },
        ],
      },
      {
        title: "실행과 화면",
        pages: [
          { slug: "wont-run", title: "프로젝트가 실행되지 않아요" },
          { slug: "blank-screen", title: "화면이 하얗게 나와요" },
          { slug: "button-not-working", title: "버튼을 눌러도 반응하지 않아요" },
          { slug: "cant-find-project-folder", title: "프로젝트 폴더가 어디 있는지 모르겠어요" },
        ],
      },
      {
        title: "GitHub와 배포",
        pages: [
          { slug: "github-push-fails", title: "GitHub에 올라가지 않아요" },
          { slug: "vercel-deploy-fails", title: "Vercel 배포에 실패했어요" },
          { slug: "changes-not-deployed", title: "수정한 내용이 배포 사이트에 반영되지 않아요" },
          { slug: "env-vars-not-working", title: "환경변수를 설정했는데 연결되지 않아요" },
        ],
      },
      {
        title: "데이터",
        pages: [
          { slug: "data-not-saving", title: "데이터가 저장되지 않아요" },
          { slug: "data-lost-on-refresh", title: "새로고침하면 데이터가 사라져요" },
          { slug: "data-missing-on-other-device", title: "다른 컴퓨터에서 데이터가 보이지 않아요" },
          { slug: "realtime-not-updating", title: "실시간으로 업데이트되지 않아요" },
          { slug: "firebase-permission-error", title: "Firebase 권한 오류가 나요" },
          { slug: "supabase-rls-error", title: "Supabase RLS 오류가 나요" },
        ],
      },
      {
        title: "로그인",
        pages: [
          { slug: "cant-login", title: "로그인이 되지 않아요" },
          { slug: "login-works-locally-only", title: "로컬에서는 되는데 배포 사이트에서는 로그인이 안 돼요" },
          { slug: "google-login-loops", title: "Google 로그인 후 다시 로그인 버튼으로 돌아와요" },
          { slug: "user-data-mixed-up", title: "사용자별 데이터가 섞여 보여요" },
        ],
      },
    ],
  },
  {
    slug: "advanced",
    title: "더 알아보기",
    tagline: "기본 과정을 마친 뒤, 필요한 사람만 골라서 읽는 심화 주제입니다.",
    linear: false,
    sections: [
      {
        title: "Claude Code 더 잘 쓰기",
        pages: [
          { slug: "claude-md", title: "CLAUDE.md" },
          { slug: "agents-md", title: "AGENTS.md와 프로젝트 지침" },
          { slug: "skills", title: "Skills" },
          { slug: "plugins", title: "Plugins" },
          { slug: "mcp", title: "MCP" },
          { slug: "multiple-agents", title: "여러 에이전트 활용하기" },
          { slug: "vscode", title: "VS Code에서 Claude Code 사용하기" },
          { slug: "cli", title: "터미널(CLI)에서 Claude Code 사용하기" },
          { slug: "git-advanced", title: "Git 조금 더 알기" },
        ],
      },
      {
        title: "데이터와 서버",
        pages: [
          { slug: "firebase-advanced", title: "Firebase 더 알아보기" },
          { slug: "supabase-advanced", title: "Supabase 더 알아보기" },
          { slug: "data-modeling", title: "데이터 구조 설계하기" },
          { slug: "api", title: "API란?" },
          { slug: "serverless-functions", title: "서버 기능이 필요할 때" },
          { slug: "file-uploads", title: "이미지와 파일 업로드" },
          { slug: "notifications", title: "이메일과 알림 보내기" },
          { slug: "admin-pages", title: "관리자 페이지 만들기" },
          { slug: "logs-and-monitoring", title: "로그와 모니터링" },
        ],
      },
    ],
  },
];

/* ---------- 파생 데이터와 헬퍼 ---------- */

export interface FlatPage extends NavPage {
  course: NavCourse;
  section: NavSection;
  /** "/code/project-folder" */
  href: string;
  /** 전체 순서 (0부터) */
  index: number;
}

let _flat: FlatPage[] | null = null;

/** 모든 페이지를 학습 순서대로 평탄화한다. */
export function getAllPages(): FlatPage[] {
  if (_flat) return _flat;
  const list: FlatPage[] = [];
  for (const course of courses) {
    for (const section of course.sections) {
      for (const page of section.pages) {
        list.push({
          ...page,
          course,
          section,
          href: `/${course.slug}/${page.slug}`,
          index: list.length,
        });
      }
    }
  }
  _flat = list;
  return list;
}

export function getCourse(slug: string): NavCourse | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getPage(courseSlug: string, pageSlug: string): FlatPage | undefined {
  return getAllPages().find((p) => p.course.slug === courseSlug && p.slug === pageSlug);
}

export function getCoursePages(courseSlug: string): FlatPage[] {
  return getAllPages().filter((p) => p.course.slug === courseSlug);
}

/** 이전/다음 페이지. 과정 경계를 넘어도 이어진다. */
export function getAdjacentPages(page: FlatPage): { prev?: FlatPage; next?: FlatPage } {
  const all = getAllPages();
  return {
    prev: all[page.index - 1],
    next: all[page.index + 1],
  };
}

export function courseHref(course: NavCourse): string {
  return `/${course.slug}`;
}

/** 홈에서 안내하는 "처음이라면 이 순서로" 경로 (MVP 학습 흐름) */
export const starterPath: Array<{ course: string; page: string }> = [
  { course: "getting-started", page: "what-is-claude" },
  { course: "getting-started", page: "three-ways" },
  { course: "chat", page: "first-question" },
  { course: "chat", page: "add-files" },
  { course: "cowork", page: "first-task" },
  { course: "code", page: "what-is-vibe-coding" },
  { course: "code", page: "getting-started" },
  { course: "code", page: "project-folder" },
  { course: "code", page: "first-request" },
  { course: "code", page: "change-text" },
  { course: "code", page: "show-errors-to-claude" },
  { course: "code", page: "push-to-github" },
  { course: "deployment", page: "first-deploy" },
  { course: "storage", page: "add-localstorage" },
  { course: "database", page: "when-you-need-a-database" },
  { course: "projects", page: "your-own-project" },
];
