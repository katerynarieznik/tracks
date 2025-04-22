import { FileX } from "lucide-react";

import { useDeleteAudioFile } from "@/mutations";
import { useGetTracks } from "@/queries";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface EditTrackButtonProps {
  id: string;
}

export function DeleteAudioFileButton({ id }: EditTrackButtonProps) {
  const deleteAudioFile = useDeleteAudioFile({ id });
  const { refetch: refetchTracksList } = useGetTracks();

  const handleDeleteTrack = async () => {
    deleteAudioFile.mutate(id, {
      onSuccess: (data) => {
        console.log(data);
        refetchTracksList();
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
