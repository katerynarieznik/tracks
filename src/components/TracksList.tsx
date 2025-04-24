import { range } from "@/lib/utils";
import { useGetTracks } from "@/queries";
import { TRACKS_PER_PAGE } from "@/lib/constants";
import { useTracksListState } from "@/hooks/useTracksListState";

import { TrackCard } from "@/components/TrackCard";
import { TrackCardSkeleton } from "./TrackCardSkeleton";

export function TracksList() {
  const { tracksListState } = useTracksListState();

  const { data, isLoading, isError, error } = useGetTracks(tracksListState);

  const tracks = data?.data;

  const isTracksEmpty = !tracks || tracks.length === 0;

  if (isLoading) {
    return (
      <div
        data-testid="loading-tracks"
        className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4"
      >
        {range(TRACKS_PER_PAGE).map((num) => (
          <TrackCardSkeleton key={num} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-destructive py-6 text-center text-base">
        Error loading tracks: {error.message}
      </p>
    );
  }

  if (isTracksEmpty) {
    return (
      <p className="text-muted-foreground py-6 text-center text-base">
        No tracks found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
}
