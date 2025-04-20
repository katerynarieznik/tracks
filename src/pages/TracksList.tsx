import { useGetTracks } from "@/queries";
import { Header } from "@/components/Header";
import { TrackCard } from "@/components/TrackCard";
import { Filters } from "@/components/Filters";

export function TracksList() {
  const { data: tracks } = useGetTracks();

  return (
    <div>
      <Header />
      <main className="container mx-auto flex max-w-5xl flex-col px-4 py-8">
        <Filters />
        <div className="grid w-full grid-cols-4 gap-4">
          {tracks?.map((track) => <TrackCard key={track.id} track={track} />)}
        </div>
      </main>
    </div>
  );
}
