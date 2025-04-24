import React from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useDeleteTrack } from "@/mutations";
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

export function DeleteTrack({ id, slug }: EditTrackButtonProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { tracksListState } = useTracksListState();
  const { data: track } = useGetTrackBySlug({ slug });
  const { mutateAsync: deleteTrack } = useDeleteTrack({ id });
  const { refetch: refetchTracksList } = useGetTracks(tracksListState);

  const handleDeleteTrack = async () => {
    const mutationPromise = deleteTrack(id, {
      onSuccess: () => {
        refetchTracksList();
      },
      onError: (error) => {
        console.error("Error deleting track:", error);
      },
    });

    toast.promise(mutationPromise, {
      loading: "Deleting track...",
      success: () => (
        <ToastMessage type="success">
          Track {track?.title} - {track?.artist} was deleted successfully!
        </ToastMessage>
      ),
      error: (err) => (
        <ToastMessage type="error">
          Failed to delete track. {String(err.message)}
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
              data-testid={`delete-track-${id}`}
              variant="secondary"
              size="sm"
              className="hover:text-destructive mt-1"
            >
              <Trash2 /> Track
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete track</p>
        </TooltipContent>
      </Tooltip>

      <ConfirmationDialogContent
        title="Delete track"
        confirmButtonText="Delete track"
        onConfirm={handleDeleteTrack}
      >
        <p className="text-secondary-foreground my-4 text-sm">
          This action cannot be undone. This will permanently delete your track{" "}
          <span className="font-bold">
            {track?.title} - {track?.artist}
          </span>{" "}
          and remove it from our servers. Do you want to proceed?
        </p>
      </ConfirmationDialogContent>
    </Dialog>
  );
}
