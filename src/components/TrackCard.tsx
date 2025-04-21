import { API_BASE_URL } from "@/lib/constants";

import { EditTrackButton } from "@/components/EditTrackButton";
import { UploadAudioFileButton } from "@/components/UploadAudioFileButton";
import { DeleteAudioFileButton } from "@/components/DeleteAudioFileButton";
import { DeleteTrackButton } from "@/components/DeleteTrackButton";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ITrack } from "@/types";

interface TrackCardProps {
  track: ITrack;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="space-y-3">
      <div className="h-fit w-full overflow-hidden rounded-md">
        <img
          src={track.coverImage ? track.coverImage : "https://placehold.co/300"}
          alt={track.title}
          className="aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
        />
      </div>
      <div className="space-y-1 text-base">
        <h3 className="leading-none font-medium">{track.title}</h3>
        <p className="text-muted-foreground text-sm">
          {track.artist} {track.album ? `- ${track.album}` : null}
        </p>
        <p className="text-muted-foreground text-sm">
          {track.genres.length > 0 ? track.genres.join(", ") : null}
        </p>
        {track.audioFile ? (
          <AudioPlayer src={API_BASE_URL + `/files/${track.audioFile}`} />
        ) : null}
        <div className="flex justify-between">
          <EditTrackButton track={track} />
          {track.audioFile ? (
            <DeleteAudioFileButton id={track.id} />
          ) : (
            <UploadAudioFileButton id={track.id} slug={track.slug} />
          )}
          <DeleteTrackButton id={track.id} />
        </div>
      </div>
    </article>
  );
}
