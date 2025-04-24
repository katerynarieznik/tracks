import React from "react";
import { ITracksListState } from "@/types";

interface ITracksStateContext {
  tracksListState: ITracksListState;
  defaultTracksListState: ITracksListState;
  setTracksListState: React.Dispatch<React.SetStateAction<ITracksListState>>;
}

const DEFAULT_TRACKS_LIST_STATE: ITracksListState = {
  page: 1,
  search: "",
  genre: "",
  artist: "",
  sortOrder: "createdAt-desc",
};

export const TracksStateContext = React.createContext<ITracksStateContext>({
  tracksListState: DEFAULT_TRACKS_LIST_STATE,
  defaultTracksListState: DEFAULT_TRACKS_LIST_STATE,
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
      value={{
        tracksListState,
        defaultTracksListState: DEFAULT_TRACKS_LIST_STATE,
        setTracksListState,
      }}
    >
      {children}
    </TracksStateContext.Provider>
  );
}
