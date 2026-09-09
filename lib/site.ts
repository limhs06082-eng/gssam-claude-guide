/**
 * 사이트가 놓이는 경로.
 *
 * GitHub Pages는 저장소 이름이 주소에 붙는다.
 *   https://limhs06082-eng.github.io/gssam-claude-guide/
 * 그래서 모든 정적 자원 경로 앞에 이 값을 붙여야 한다.
 * Next의 <Link>와 router는 알아서 붙이지만, <img src>와 fetch()는 직접 붙여야 한다.
 *
 * 개발 서버도 같은 경로를 쓴다. 로컬과 배포가 다르면 배포에서만 깨지는 링크가 생긴다.
 *   http://localhost:3210/gssam-claude-guide/
 */
export const BASE_PATH = "/gssam-claude-guide";

/** 정적 자원 URL에 basePath를 붙인다. */
export function withBase(path: string): string {
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}
