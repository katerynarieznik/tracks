import React from "react";

interface IAudioPlayerContext {
  currentlyPlayingId: string | null;
  setCurrentlyPlayingId: (id: string | null) => void;
}

export const AudioPlayerContext = React.createContext<IAudioPlayerContext>({
  currentlyPlayingId: null,
  setCurrentlyPlayingId: () => {},
});

export function AudioPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentlyPlayingId, setCurrentlyPlayingId] = React.useState<
    string | null
  >(null);

  return (
    <AudioPlayerContext.Provider
      value={{ currentlyPlayingId, setCurrentlyPlayingId }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
