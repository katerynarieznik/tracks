import { Link } from "@tanstack/react-router";
import { CassetteTape } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Logo() {
  return (
    <Button asChild variant="ghost">
      <Link to="/">
        <CassetteTape className="size-5" />
        <span className="text-base font-semibold">Track Recs</span>
      </Link>
    </Button>
  );
}
