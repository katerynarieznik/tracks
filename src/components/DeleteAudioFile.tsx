import React from "react";
import { FileX } from "lucide-react";

import { useDeleteAudioFile } from "@/mutations";
import { useGetTracks, useGetTrackBySlug } from "@/queries";
import { useTracksListState } from "@/hooks/useTracksListState";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface EditTrackButtonProps {
  id: string;
  slug: string;
}

export function DeleteAudioFile({ id, slug }: EditTrackButtonProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const { tracksListState } = useTracksListState();
  const { data: track } = useGetTrackBySlug({ slug });
  const { mutate: deleteAudioFile } = useDeleteAudioFile({ id });
  const { refetch: refetchTracks } = useGetTracks(tracksListState);

  const handleDeleteTrack = async () => {
    deleteAudioFile(id, {
      onSuccess: (data) => {
        // TODO use toast for the result
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error deleting track:", error);
      },
    });
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
              <FileX /> <span className="sr-only">Delete audio file</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete audio file</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Audio File</DialogTitle>
        </DialogHeader>
        <p className="text-secondary-foreground my-4 text-sm">
          This action cannot be undone. This will permanently delete your audio
          file{" "}
          <span className="text-muted-foreground">
            "{track?.title} - {track?.artist}"
          </span>{" "}
          and remove it from our servers. Do you want to proceed?
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDeleteTrack}>
            Delete file
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
