import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function Loader({
  className,
  children,
}: {
  withoutIcon?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-testid="loading-indicator"
      className={cn("text-muted-foreground flex items-center", className)}
    >
      <Loader2 className="me-1 animate-spin" />
      {children}
    </div>
  );
}
