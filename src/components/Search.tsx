import React from "react";
import { Search as SearchIcon } from "lucide-react";

import { DEBOUNCE_TIMEOUT } from "@/lib/constants";
import { useTracksListState } from "@/hooks/useTracksListState";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Search() {
  const [inputValue, setInputValue] = React.useState("");
  const { tracksListState, setTracksListState } = useTracksListState();

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (inputValue !== tracksListState.search) {
        setTracksListState((prevState) => ({
          ...prevState,
          page: 1,
          search: inputValue,
        }));
      }
    }, DEBOUNCE_TIMEOUT);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue, tracksListState]);

  return (
    <div className="min-w-65">
      <Label htmlFor="search" className="sr-only">
        Search
      </Label>
      <div className="relative">
        <Input
          id="search"
          data-testid="search-input"
          type="search"
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
