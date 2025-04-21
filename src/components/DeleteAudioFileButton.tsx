import { FileX } from "lucide-react";

import { useDeleteAudioFile } from "@/mutations";
import { useGetTracks } from "@/queries";

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
      },
      onError: (error) => {
        console.error("Error deleting track:", error);
      },
    });
    refetchTracksList();
  };

  return (
    <Button
      size="sm"
      className="hover:bg-destructive hover:text-background mt-1"
      onClick={handleDeleteTrack}
    >
      <FileX /> <span className="sr-only">Delete audio file</span>
    </Button>
  );
}
