import { CassetteTape } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Logo() {
  return (
    <Button asChild variant="ghost">
      <a href="/">
        <CassetteTape className="size-5" />
        <span className="text-base font-semibold">Track Recs</span>
      </a>
    </Button>
  );
}
