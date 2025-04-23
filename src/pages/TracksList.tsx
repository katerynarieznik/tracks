import { useGetTracks } from "@/queries";

import { cn } from "@/lib/utils";

import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { TrackCard } from "@/components/TrackCard";
import { SortWithOrderSelect } from "@/components/SortWithOrderSelect";
import { useTracksListState } from "@/hooks/useTracksListState";
import { TracksPagination } from "@/components/TracksPagination";

export function TracksList() {
  const { tracksListState, setTracksListState } = useTracksListState();

  const { data, isLoading } = useGetTracks(tracksListState);

  const tracks = data?.data;
  const meta = data?.meta;

  const isTracksEmpty = !tracks || tracks.length === 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto flex max-w-5xl flex-col px-4 py-8">
        <div className="flex w-full items-center justify-between pb-8">
          <Filters />
          <SortWithOrderSelect />
        </div>
        <div
          className={cn(
            "grid w-full grid-cols-4 gap-x-5 gap-y-8",
            isTracksEmpty && "block",
          )}
        >
          {isTracksEmpty ? (
            <p className="text-muted-foreground py-6 text-center text-base">
              No tracks found
            </p>
          ) : (
            tracks.map((track) => <TrackCard key={track.id} track={track} />)
          )}
        </div>
        {!isTracksEmpty && (
          <TracksPagination
            currentPage={tracksListState.page}
            totalPages={meta?.totalPages ?? 1}
            isNextPage={tracksListState.page !== meta?.totalPages}
            onPageChange={(page) =>
              setTracksListState({ ...tracksListState, page })
            }
          />
        )}
      </main>
    </div>
  );
}
