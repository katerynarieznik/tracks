import { GenresFilter } from "@/components/GenresFilter";

export function Filters({
  genre,
  setGenre,
}: {
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex w-full items-center justify-between pb-8">
      <div className="flex items-center gap-4">
        <GenresFilter genre={genre} setGenre={setGenre} />
      </div>
    </div>
  );
}
