import type { NextConfig } from "next";
import { BASE_PATH } from "./lib/site";

const nextConfig: NextConfig = {
  // GitHub Pages는 정적 파일만 서비스한다. 모든 페이지를 HTML로 내보낸다.
  output: "export",
  // 주소가 https://<계정>.github.io/gssam-claude-guide/ 이므로 경로 앞에 저장소 이름이 붙는다.
  basePath: BASE_PATH,
  // /chat/first-question/ 처럼 폴더 + index.html 로 내보내면 어떤 정적 호스트에서도 열린다.
  trailingSlash: true,
  // 정적 내보내기에서는 이미지 최적화 서버가 없다.
  images: { unoptimized: true },
};

export default nextConfig;
