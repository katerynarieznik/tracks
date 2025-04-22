import React from "react";
import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DEBOUNCE_TIMEOUT } from "@/lib/constants";

export function Search({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue);
      }
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, search, setSearch]);

  return (
    <div className="min-w-80">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <div className="relative">
        <Input
          id="search"
          data-testid="search-input"
          placeholder="Search by title, artist or album"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="bg-background focus-visible:ring-sidebar-ring h-9 w-full pl-8 shadow-none focus-visible:ring-2"
        />
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </div>
  );
}
