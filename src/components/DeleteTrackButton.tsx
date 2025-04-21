import { Trash2 } from "lucide-react";

import { useDeleteTrack } from "@/mutations";
import { useGetTracks } from "@/queries";

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
      },
      onError: (error) => {
        console.error("Error deleting track:", error);
      },
    });
    refetchTracksList();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="hover:bg-destructive hover:text-background mt-1"
      onClick={handleDeleteTrack}
    >
      <Trash2 /> <span className="sr-only">Delete</span>
    </Button>
  );
}
