import { buildSearchIndex } from "@/lib/content";

export const dynamic = "force-static";

/** 빌드 시점에 만들어지는 정적 검색 인덱스 */
export async function GET() {
  const docs = await buildSearchIndex();
  return Response.json(docs, {
    headers: { "Cache-Control": "public, max-age=3600" },
  });
}
