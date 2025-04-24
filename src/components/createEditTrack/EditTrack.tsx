import React from "react";
import { toast } from "sonner";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { useGetTracks } from "@/queries";
import { useEditTrack } from "@/mutations";
import { ITrack, TTrackForm } from "@/types";
import { useTracksListState } from "@/hooks/useTracksListState";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { ToastMessage } from "@/components/ToastMessage";
import { createEditTrackFormSchema } from "./formSchema";
import { TrackForm } from "./TrackForm";

interface EditTrackProps {
  track: ITrack;
}

export function EditTrack({ track }: EditTrackProps) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { tracksListState } = useTracksListState();

  const formId = "editTrackForm";

  const { mutateAsync: editTrack } = useEditTrack({ id: track.id });
  const { refetch: refetchTracks } = useGetTracks(tracksListState);

  const editFormMethods = useForm<TTrackForm>({
    resolver: zodResolver(createEditTrackFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [],
      coverImage: "",
    },
    // Initialize with track data (with empty fallbacks) to ensure isDirty form state
    // correctly resets when fields are cleared to original state
    values: {
      title: track.title ?? "",
      artist: track.artist ?? "",
      album: track.album ?? "",
      genres: track.genres ?? [],
      coverImage: track.coverImage ?? "",
    },
  });

  const isSubmitDisabled = !editFormMethods.formState.isDirty;

  function handleSubmit(values: TTrackForm) {
    const mutationPromise = editTrack(values, {
      onSuccess: () => {
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error editing track:", error);
      },
    });

    toast.promise(mutationPromise, {
      loading: "Creating track...",
      success: (data) => (
        <ToastMessage type="success">
          Track "{data.title} - {data.artist}" was updated successfully!
        </ToastMessage>
      ),
      error: (err) => (
        <ToastMessage type="error">
          Failed to update track. {String(err.message)}
        </ToastMessage>
      ),
    });

    setOpenDialog(false);
    editFormMethods.reset();
  }

  function handleCancel() {
    editFormMethods.reset();
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(state) => {
        if (state === false) handleCancel();
        setOpenDialog(state);
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              data-testid={`edit-track-${track.id}`}
              variant="outline"
              size="sm"
              className="mt-1"
            >
              <Pencil /> <span className="sr-only">Edit track metadata</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit track metadata</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Track</DialogTitle>
        </DialogHeader>

        <FormProvider {...editFormMethods}>
          <TrackForm formId={formId} onSubmit={handleSubmit} />
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            data-testid="submit-button"
            type="submit"
            form={formId}
            aria-disabled={isSubmitDisabled}
            disabled={isSubmitDisabled}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
