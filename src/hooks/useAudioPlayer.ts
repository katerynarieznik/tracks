import React from "react";
import { AudioPlayerContext } from "@/components/AudioPlayerProvider";

export function useAudioPlayer() {
  const context = React.useContext(AudioPlayerContext);

  if (context === undefined) {
    console.error("useAudioPlayer must be used within an AudioPlayerProvider");
  }

  return context;
}
