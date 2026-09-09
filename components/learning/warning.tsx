import type { ReactNode } from "react";
import { CircleAlertIcon, TriangleAlertIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

/**
 * 주의 — shadcn Alert를 그대로 사용한다.
 * 빨간색(danger)은 데이터 손실처럼 실제 위험이 있을 때만, 그것도 아이콘과 제목에만 쓴다.
 * 본문까지 빨갛게 하면 읽기 어렵고 경고가 과해진다. (DESIGN-SYSTEM 13절)
 */
export function Warning({
  title,
  variant = "caution",
  children,
  className,
}: {
  title?: string;
  variant?: "caution" | "danger";
  children: ReactNode;
  className?: string;
}) {
  const danger = variant === "danger";
  const Icon = danger ? CircleAlertIcon : TriangleAlertIcon;
  return (
    <Alert className={cn("not-prose my-6 gap-x-3 px-4 py-3.5 text-[0.95em] leading-[1.8]", className)}>
      <Icon className={danger ? "text-destructive" : "text-muted-foreground"} />
      <AlertTitle className={cn("text-[0.95em]", danger && "text-destructive")}>{title ?? "주의"}</AlertTitle>
      <AlertDescription className="callout-body text-[1em] leading-[1.8] text-foreground/85 [&_p:not(:last-child)]:mb-2">
        {children}
      </AlertDescription>
    </Alert>
  );
}
