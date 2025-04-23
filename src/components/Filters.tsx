import { GenreFilter } from "@/components/GenreFilter";
import { ArtistFilter } from "./ArtistFilter";

export function Filters() {
  return (
    <div className="flex items-center gap-6">
      <GenreFilter />
      <ArtistFilter />
    </div>
  );
}
