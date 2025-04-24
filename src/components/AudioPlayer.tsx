import React from "react";
import { Play, Pause } from "lucide-react";
import { useMutationState } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { API_BASE_URL } from "@/lib/constants";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface AudioPlayerProps {
  trackId: string;
  audioFile?: string;
}

export function AudioPlayer({ trackId, audioFile }: AudioPlayerProps) {
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);

  const { currentlyPlayingId, setCurrentlyPlayingId } = useAudioPlayer();

  const [isNewFileUploaded] = useMutationState({
    filters: { mutationKey: ["uploadAudioFile", trackId], status: "success" },
    select: (mutation) => mutation.state.status,
  });

  const [isFileDeleted] = useMutationState({
    filters: { mutationKey: ["deleteAudioFile", trackId], status: "success" },
    select: (mutation) => mutation.state.status,
  });

  const isRefetchingTracksAfterUpload =
    isNewFileUploaded && !audioFile && !isFileDeleted;
  const isThisTrackPlaying = currentlyPlayingId === trackId;

  // Auto play/pause based on currentlyPlayingId
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isThisTrackPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isThisTrackPlaying]);

  const togglePlayPause = () => {
    if (isThisTrackPlaying) {
      setCurrentlyPlayingId(null);
    } else {
      setCurrentlyPlayingId(trackId);
    }
  };

  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = value[0];
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
  };

  const handleEnded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(0);
    setCurrentlyPlayingId(null);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!audioFile && !isRefetchingTracksAfterUpload) return null;

  return (
    <div
      data-testid={`audio-player-${trackId}`}
      className="via-background/60 from-background/80 absolute inset-x-0 bottom-0 w-full bg-linear-to-t from-0% via-70% to-transparent to-100% px-1 py-4"
    >
      <div
        className={cn(
          "space-y-4",
          isRefetchingTracksAfterUpload && "opacity-65",
        )}
      >
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full"
            onClick={togglePlayPause}
            aria-label={isThisTrackPlaying ? "Pause" : "Play"}
            data-testid={`${isThisTrackPlaying ? "pause" : "play"}-button-${trackId}`}
            disabled={isRefetchingTracksAfterUpload}
            aria-disabled={isRefetchingTracksAfterUpload}
          >
            {isThisTrackPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>

          <div className="flex-1">
            <Slider
              value={[progress]}
              max={duration}
              step={1}
              onValueChange={handleProgressChange}
              aria-label="Audio progress"
              data-testid={`audio-progress-${trackId}`}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-secondary-foreground text-xs">
              {formatTime(progress)} / {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={API_BASE_URL + `/files/${audioFile}`}
        className="hidden"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
    </div>
  );
}
