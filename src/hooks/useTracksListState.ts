import React from "react";
import { TracksStateContext } from "@/components/TracksStateProvider";

export function useTracksListState() {
  const context = React.useContext(TracksStateContext);

  if (context === undefined) {
    console.error(
      "useTracksListState must be used within an TracksStateProvider",
    );
  }

  return context;
}
