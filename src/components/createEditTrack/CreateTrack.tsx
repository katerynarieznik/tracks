import React from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { TTrackForm } from "@/types";
import { useGetTracks } from "@/queries";
import { useCreateTrack } from "@/mutations";
import { useTracksListState } from "@/hooks/useTracksListState";
import { createEditTrackFormSchema } from "@/components/createEditTrack/formSchema";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ToastMessage } from "@/components/ToastMessage";
import { TrackForm } from "./TrackForm";

export function CreateTrack() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { tracksListState } = useTracksListState();

  const formId = "createTrackForm";

  const { mutateAsync: createTrack } = useCreateTrack();
  const { refetch: refetchTracks } = useGetTracks(tracksListState);

  const createFormMethods = useForm<TTrackForm>({
    resolver: zodResolver(createEditTrackFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [],
      coverImage: "",
    },
  });

  function handleSubmit(values: TTrackForm) {
    const mutationPromise = createTrack(values, {
      onSuccess: () => {
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error creating track:", error);
      },
    });

    toast.promise(mutationPromise, {
      loading: "Creating track...",
      success: (data) => (
        <ToastMessage type="success">
          Track "{data.title} - {data.artist}" was created successfully!
        </ToastMessage>
      ),
      error: (err) => (
        <ToastMessage type="error">
          Failed to create track. {String(err.message)}
        </ToastMessage>
      ),
    });

    setOpenDialog(false);
    createFormMethods.reset();
  }

  function handleCancel() {
    createFormMethods.reset();
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(state) => {
        if (state === false) handleCancel();
        setOpenDialog(state);
      }}
    >
      <DialogTrigger asChild>
        <Button data-testid="create-track-button">
          <Plus /> Create track
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Track</DialogTitle>
          <DialogDescription>
            You can create track metadata and upload the audio file later.
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...createFormMethods}>
          <TrackForm formId={formId} onSubmit={handleSubmit} />
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button data-testid="submit-button" type="submit" form={formId}>
            Create track
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
