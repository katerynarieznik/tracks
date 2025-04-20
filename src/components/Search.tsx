import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Search({ ...props }: React.ComponentProps<"form">) {
  return (
    <form className="min-w-80" {...props}>
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <div className="relative">
        <Input
          id="search"
          placeholder="Search by title, artist or album..."
          className="bg-background focus-visible:ring-sidebar-ring h-8 w-full pl-8 shadow-none focus-visible:ring-2"
        />
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
