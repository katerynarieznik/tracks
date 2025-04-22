import { Trash2 } from "lucide-react";

import { useDeleteTrack } from "@/mutations";
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

export function DeleteTrackButton({ id }: EditTrackButtonProps) {
  const deleteTrack = useDeleteTrack({ id });
  const { refetch: refetchTracksList } = useGetTracks();

  const handleDeleteTrack = async () => {
    deleteTrack.mutate(id, {
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
          <Trash2 /> <span className="sr-only">Delete track</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete track</p>
      </TooltipContent>
    </Tooltip>
  );
}
