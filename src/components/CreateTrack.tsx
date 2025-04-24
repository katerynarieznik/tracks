import React from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { TTrackForm } from "@/types";
import { useCreateTrack } from "@/mutations";
import { useTracksListState } from "@/hooks/useTracksListState";
import { trackFormSchema } from "@/lib/trackFormSchema";

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
import { useQueryClient } from "@tanstack/react-query";

export function CreateTrack() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { defaultTracksListState, setTracksListState } = useTracksListState();

  const formId = "createTrackForm";

  const { mutateAsync: createTrack } = useCreateTrack();

  const { invalidateQueries } = useQueryClient();

  const createFormMethods = useForm<TTrackForm>({
    resolver: zodResolver(trackFormSchema),
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
        // Reset filtering and sorting so that the new track appears at the top of the tracks list
        setTracksListState(defaultTracksListState);
        invalidateQueries({ queryKey: ["tracks", defaultTracksListState] });
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
          <Plus /> <span className="sr-only lg:not-sr-only">Create track</span>
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
