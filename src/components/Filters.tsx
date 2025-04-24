import { GenreFilter } from "@/components/GenreFilter";
import { ArtistFilter } from "./ArtistFilter";

export function Filters() {
  return (
    <div className="flex w-full flex-col-reverse items-center gap-4 lg:flex-row lg:gap-6">
      <GenreFilter />
      <ArtistFilter />
    </div>
  );
}
