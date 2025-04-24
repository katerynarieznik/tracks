import React from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { useDeleteTrack } from "@/mutations";
import { useGetTrackBySlug } from "@/queries";

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

  const { data: track } = useGetTrackBySlug({ slug });
  const { mutateAsync: deleteTrack } = useDeleteTrack({ id });

  const handleDeleteTrack = async () => {
    const mutationPromise = deleteTrack(id);

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
              <Trash2 /> <span className="sr-only lg:not-sr-only">Track</span>
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
