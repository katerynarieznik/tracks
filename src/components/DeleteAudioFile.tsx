import { FileX } from "lucide-react";

import { useDeleteAudioFile } from "@/mutations";
import { useGetTracks } from "@/queries";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTracksListState } from "@/hooks/useTracksListState";

interface EditTrackButtonProps {
  id: string;
}

export function DeleteAudioFile({ id }: EditTrackButtonProps) {
  const { tracksListState } = useTracksListState();
  const deleteAudioFile = useDeleteAudioFile({ id });
  const { refetch: refetchTracks } = useGetTracks(tracksListState);

  const handleDeleteTrack = async () => {
    deleteAudioFile.mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error deleting track:", error);
      },
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="hover:text-destructive mt-1"
          onClick={handleDeleteTrack}
        >
          <FileX /> <span className="sr-only">Delete audio file</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete audio file</p>
      </TooltipContent>
    </Tooltip>
  );
}
