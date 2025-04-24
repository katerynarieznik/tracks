import { CassetteTape } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Logo() {
  return (
    <Button asChild variant="ghost">
      <a href="/">
        <CassetteTape className="size-5" />
        <h1
          data-testid="tracks-header"
          className="sr-only text-base font-semibold lg:not-sr-only"
        >
          Track Records
        </h1>
      </a>
    </Button>
  );
}
