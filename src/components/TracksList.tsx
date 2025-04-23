import { useGetTracks } from "@/queries";
import { TRACKS_PER_PAGE } from "@/lib/constants";
import { useTracksListState } from "@/hooks/useTracksListState";

import { TrackCard } from "@/components/TrackCard";
import { TrackCardSkeleton } from "./TrackCardSkeleton";

export function TracksList() {
  const { tracksListState } = useTracksListState();

  const { data, isPending } = useGetTracks(tracksListState);

  const tracks = data?.data;

  const isTracksEmpty = !tracks || tracks.length === 0;

  if (isPending) {
    return (
      <div
        data-testid="loading-tracks"
        className="grid w-full grid-cols-4 gap-x-5 gap-y-8"
      >
        {[...Array(TRACKS_PER_PAGE)].map((_, index) => (
          <TrackCardSkeleton key={index} />
        ))}
      </div>
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
    <div className="grid w-full grid-cols-4 gap-x-5 gap-y-8">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
}
