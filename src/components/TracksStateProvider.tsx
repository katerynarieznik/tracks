import React from "react";
import { ITracksListState } from "@/types";

interface ITracksStateContext {
  tracksListState: ITracksListState;
  setTracksListState: React.Dispatch<React.SetStateAction<ITracksListState>>;
}

export const TracksStateContext = React.createContext<ITracksStateContext>({
  tracksListState: {
    page: 1,
    search: "",
    genre: "",
    artist: "",
    sortOrder: "",
  },
  setTracksListState: () => {},
});

export function TracksStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tracksListState, setTracksListState] =
    React.useState<ITracksListState>({
      page: 1,
      search: "",
      genre: "",
      artist: "",
      sortOrder: "",
    });

  return (
    <TracksStateContext.Provider
      value={{ tracksListState, setTracksListState }}
    >
      {children}
    </TracksStateContext.Provider>
  );
}
