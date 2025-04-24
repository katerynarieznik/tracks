import { useGetTracks } from "@/queries";

import { useTracksListState } from "@/hooks/useTracksListState";

import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { TracksList } from "@/components/TracksList";
import { SortOrderSelect } from "@/components/SortOrderSelect";
import { TracksPagination } from "@/components/TracksPagination";

export function TracksPage() {
  const { tracksListState, setTracksListState } = useTracksListState();

  const { data, isLoading } = useGetTracks(tracksListState);

  const tracks = data?.data;
  const meta = data?.meta;

  const isTracksEmpty = !tracks || tracks.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <section className="container mx-auto mt-4 flex w-full max-w-5xl items-center justify-between">
        <Filters />
        <SortOrderSelect />
      </section>
      <main
        data-loading={isLoading}
        className="container m-4 mx-auto flex max-w-5xl flex-col"
      >
        <TracksList />
      </main>
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
    </div>
  );
}
