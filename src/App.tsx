import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { TooltipProvider } from "@/components/ui/tooltip";
import { TracksStateProvider } from "@/components/TracksStateProvider";

import { TracksList } from "@/pages/TracksList";

const queryClient = new QueryClient();

function App() {
  const location = window.location.pathname;

  React.useEffect(() => {
    if (location === "/") {
      window.location.replace("/tracks");
    }
  }, [location]);

  return (
    <QueryClientProvider client={queryClient}>
      <TracksStateProvider>
        <TooltipProvider>
          {location === "/tracks" ? <TracksList /> : null}
        </TooltipProvider>
      </TracksStateProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
