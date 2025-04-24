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
  const { setTracksListState } = useTracksListState();
  return (
    <Select
      data-testid="sort-select"
      onValueChange={(value) => {
        setTracksListState((prev) => ({
          ...prev,
          sortOrder: value,
        }));
      }}
    >
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Sort by ..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="createdAt-desc">Created At, Latest</SelectItem>
          <SelectItem value="createdAt-asc">Created At, Oldest</SelectItem>
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
