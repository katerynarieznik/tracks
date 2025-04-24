import React from "react";
import { ITracksListState } from "@/types";

interface ITracksStateContext {
  tracksListState: ITracksListState;
  setTracksListState: React.Dispatch<React.SetStateAction<ITracksListState>>;
}

const DEFAULT_TRACKS_LIST_STATE: ITracksListState = {
  page: 1,
  search: "",
  genre: "",
  artist: "",
  sortOrder: "",
};

export const TracksStateContext = React.createContext<ITracksStateContext>({
  tracksListState: DEFAULT_TRACKS_LIST_STATE,
  setTracksListState: () => {},
});

export function TracksStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tracksListState, setTracksListState] =
    React.useState<ITracksListState>(DEFAULT_TRACKS_LIST_STATE);

  return (
    <TracksStateContext.Provider
      value={{ tracksListState, setTracksListState }}
    >
      {children}
    </TracksStateContext.Provider>
  );
}
