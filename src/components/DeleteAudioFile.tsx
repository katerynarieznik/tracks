import React from "react";
import { toast } from "sonner";
import { FileMinus } from "lucide-react";

import { useDeleteAudioFile } from "@/mutations";
import { useGetTracks, useGetTrackBySlug } from "@/queries";
import { useTracksListState } from "@/hooks/useTracksListState";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ToastMessage } from "@/components/ToastMessage";
import { ConfirmationDialogContent } from "@/components/ConfirmationDialogContent";

interface EditTrackButtonProps {
  id: string;
  slug: string;
}

export function DeleteAudioFile({ id, slug }: EditTrackButtonProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { tracksListState } = useTracksListState();
  const { data: track } = useGetTrackBySlug({ slug });
  const { mutateAsync: deleteAudioFile } = useDeleteAudioFile({ id });
  const { refetch: refetchTracks } = useGetTracks(tracksListState);

  const handleDeleteAudio = async () => {
    const mutationPromise = deleteAudioFile(id, {
      onSuccess: () => {
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error deleting audio file:", error);
      },
    });

    toast.promise(mutationPromise, {
      loading: "Deleting audio file...",
      success: () => (
        <ToastMessage type="success">
          "{track?.title} - {track?.artist}" audio file was deleted
          successfully!
        </ToastMessage>
      ),
      error: (err) => (
        <ToastMessage type="error">
          Failed to delete audio file. {String(err.message)}
        </ToastMessage>
      ),
    });

    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              className="hover:text-destructive mt-1"
            >
              <FileMinus />{" "}
              <span className="sr-only lg:not-sr-only">Audio</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete audio file</p>
        </TooltipContent>
      </Tooltip>

      <ConfirmationDialogContent
        title="Delete Audio File"
        confirmButtonText="Delete audio file"
        onConfirm={handleDeleteAudio}
      >
        <p className="text-secondary-foreground my-4 text-sm">
          This action cannot be undone. This will permanently delete your audio
          file{" "}
          <span className="font-bold">
            {track?.title} - {track?.artist}
          </span>{" "}
          and remove it from our servers. Do you want to proceed?
        </p>
      </ConfirmationDialogContent>
    </Dialog>
  );
}
