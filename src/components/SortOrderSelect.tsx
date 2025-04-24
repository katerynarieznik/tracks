import { useTracksListState } from "@/hooks/useTracksListState";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SortOrderSelect() {
  const { tracksListState, setTracksListState } = useTracksListState();
  return (
    <Select
      data-testid="sort-select"
      value={tracksListState.sortOrder}
      onValueChange={(value) => {
        setTracksListState((prev) => ({
          ...prev,
          sortOrder: value,
        }));
      }}
    >
      <SelectTrigger className="w-full min-w-50 lg:max-w-50">
        <SelectValue placeholder="Sort by ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="createdAt-desc">Created, Latest</SelectItem>
          <SelectItem value="createdAt-asc">Created, Oldest</SelectItem>
          <SelectItem value="title-asc">Title, A-Z</SelectItem>
          <SelectItem value="title-desc">Title, Z-A</SelectItem>
          <SelectItem value="artist-asc">Artist, A-Z</SelectItem>
          <SelectItem value="artist-desc">Artist, Z-A</SelectItem>
          <SelectItem value="album-asc">Album, A-Z</SelectItem>
          <SelectItem value="album-desc">Album, Z-A</SelectItem>{" "}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
