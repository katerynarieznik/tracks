import { ITrack } from "@/types";
import { cn } from "@/lib/utils";

import { EditTrack } from "@/components/EditTrack";
import { AudioPlayer } from "@/components/AudioPlayer";
import { DeleteTrack } from "@/components/DeleteTrack";
import { DeleteAudioFile } from "@/components/DeleteAudioFile";
import { UploadAudioFile } from "@/components/UploadAudioFile";

import placeholder from "@/assets/image-placeholder.svg";

interface TrackCardProps {
  track: ITrack;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article
      data-testid={`track-item-${track.id}`}
      className={cn(
        "flex flex-col justify-between space-y-3",
        track.id === "optimistic" && "opacity-65",
      )}
    >
      <div className="space-y-3">
        <div className="relative h-fit w-full overflow-hidden rounded-md">
          <img
            src={track.coverImage ? track.coverImage : placeholder}
            alt={track.title}
            className="aspect-square h-full w-full object-cover transition-all hover:scale-105"
          />
          <AudioPlayer audioFile={track.audioFile} trackId={track.id} />
        </div>
        <div className="space-y-1 text-base">
          <h2
            data-testid={`track-item-${track.id}-title`}
            className="leading-none font-medium"
          >
            {track.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            <span data-testid={`track-item-${track.id}-artist`}>
              {track.artist}
            </span>{" "}
            {track.album ? `- ${track.album}` : null}
          </p>
          <p className="text-muted-foreground text-sm">
            {track.genres.length > 0 ? track.genres.join(", ") : null}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <EditTrack track={track} />
        {track.audioFile ? (
          <DeleteAudioFile id={track.id} slug={track.slug} />
        ) : (
          <UploadAudioFile id={track.id} />
        )}
        <DeleteTrack id={track.id} slug={track.slug} />
      </div>
    </article>
  );
}
