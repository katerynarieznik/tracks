import React from "react";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { ITrack, TTrackForm } from "@/types";
import { useGetTracks } from "@/queries";
import { useEditTrack } from "@/mutations";

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

import { createEditTrackFormSchema } from "./formSchema";
import { CreateEditTrackForm } from "./CreateEditTrackForm";

interface EditTrackProps {
  track: ITrack;
}

export function EditTrack({ track }: EditTrackProps) {
  const [openDialog, setOpenDialog] = React.useState(false);

  const formId = "editTrackForm";

  const { mutate: editTrack } = useEditTrack({ id: track.id });
  const { refetch: refetchTracks } = useGetTracks();

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
    editTrack(values, {
      onSuccess: (data) => {
        // TODO: use toaster to notify user
        console.log("Track edited successfully");
        console.log("Edited track data:", data);
        setOpenDialog(false);
        editFormMethods.reset();
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error creating track:", error);
      },
    });
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
            <Button variant="outline" size="sm" className="mt-1">
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
          <CreateEditTrackForm formId={formId} onSubmit={handleSubmit} />
        </FormProvider>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button
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
