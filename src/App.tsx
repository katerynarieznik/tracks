import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TracksStateProvider } from "@/components/TracksStateProvider";
import { AudioPlayerProvider } from "@/components/AudioPlayerProvider";

import { TracksPage } from "@/pages/TracksPage";

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
        <AudioPlayerProvider>
          <TooltipProvider>
            {location === "/tracks" ? <TracksPage /> : null}
          </TooltipProvider>
        </AudioPlayerProvider>
      </TracksStateProvider>
      <Toaster position="top-right" richColors />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
