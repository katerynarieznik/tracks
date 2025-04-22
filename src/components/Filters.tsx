import { GenreFilter } from "@/components/GenreFilter";
import { ArtistFilter } from "./ArtistFilter";

export function Filters({
  genre,
  artist,
  setGenre,
  setArtist,
}: {
  genre: string;
  artist: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center gap-6">
      <GenreFilter genre={genre} setGenre={setGenre} />
      <ArtistFilter artist={artist} setArtist={setArtist} />
    </div>
  );
}
