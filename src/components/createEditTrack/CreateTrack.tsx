import React from "react";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { TTrackForm } from "@/types";
import { useGetTracks } from "@/queries";
import { useCreateTrack } from "@/mutations";
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

import { CreateEditTrackForm } from "./CreateEditTrackForm";

export function CreateTrack() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const formId = "createTrackForm";

  const { mutate: createTrack } = useCreateTrack();
  const { refetch: refetchTracks } = useGetTracks();

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
    createTrack(values, {
      onSuccess: (data) => {
        // TODO: use toaster to notify user
        console.log("Track created successfully");
        console.log("Created track data:", data);
        setOpenDialog(false);
        createFormMethods.reset();
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error creating track:", error);
      },
    });
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
          <CreateEditTrackForm formId={formId} onSubmit={handleSubmit} />
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            Create track
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
