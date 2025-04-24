import { useTracksListState } from "@/hooks/useTracksListState";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ArtistFilter() {
  const { tracksListState, setTracksListState } = useTracksListState();
  return (
    <div className="w-full min-w-50 lg:max-w-50">
      <Label htmlFor="artistFilter" className="sr-only">
        Filter by artist
      </Label>
      <div className="relative">
        <Input
          id="artistFilter"
          placeholder="Filter by artist"
          data-testid="filter-artist"
          value={tracksListState.artist}
          onChange={(e) =>
            setTracksListState((prevState) => ({
              ...prevState,
              page: 1,
              artist: e.target.value,
            }))
          }
          className="bg-background focus-visible:ring-sidebar-ring h-9 w-full shadow-none focus-visible:ring-2"
        />
      </div>
    </div>
  );
}
