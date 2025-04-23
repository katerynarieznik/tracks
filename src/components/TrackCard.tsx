import { ITrack } from "@/types";
import { API_BASE_URL } from "@/lib/constants";

import { AudioPlayer } from "@/components/AudioPlayer";
import { DeleteTrack } from "@/components/DeleteTrack";
import { DeleteAudioFile } from "@/components/DeleteAudioFile";
import { EditTrack } from "@/components/createEditTrack/EditTrack";
import { UploadAudioFile } from "@/components/uploadAudio/UploadAudioFile";

interface TrackCardProps {
  track: ITrack;
}

export function TrackCard({ track }: TrackCardProps) {
  return (
    <article className="flex flex-col justify-between space-y-3">
      <div className="space-y-3">
        <div className="relative h-fit w-full overflow-hidden rounded-md">
          <img
            src={
              track.coverImage ? track.coverImage : "https://placehold.co/300"
            }
            alt={track.title}
            className="aspect-square h-auto w-auto object-cover transition-all hover:scale-105"
          />
          {track.audioFile ? (
            <AudioPlayer
              src={API_BASE_URL + `/files/${track.audioFile}`}
              trackId={track.id}
            />
          ) : null}
        </div>
        <div className="space-y-1 text-base">
          <h3 className="leading-none font-medium">{track.title}</h3>
          <p className="text-muted-foreground text-sm">
            {track.artist} {track.album ? `- ${track.album}` : null}
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
