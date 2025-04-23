import React from "react";
import { TracksStateContext } from "@/components/TracksStateProvider";

export function useTracksListState() {
  const { tracksListState, setTracksListState } =
    React.useContext(TracksStateContext);

  return { tracksListState, setTracksListState };
}
