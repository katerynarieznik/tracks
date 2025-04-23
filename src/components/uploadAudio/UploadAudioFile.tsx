import React from "react";
import { toast } from "sonner";
import { FilePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useGetTracks } from "@/queries";
import { TAudioFileForm } from "@/types";
import { useUploadAudioFile } from "@/mutations";
import { useTracksListState } from "@/hooks/useTracksListState";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToastMessage } from "@/components/ToastMessage";

import { uploadAudioFileFormSchema } from "./formSchema";

export function UploadAudioFile({ id }: { id: string }) {
  const [openDialog, setOpenDialog] = React.useState(false);
  const { tracksListState } = useTracksListState();

  const formId = "uploadMusicFileForm";

  const { mutateAsync: uploadAudioFile } = useUploadAudioFile({ id });
  const { refetch: refetchTracks } = useGetTracks(tracksListState);

  const uploadAudioForm = useForm<TAudioFileForm>({
    resolver: zodResolver(uploadAudioFileFormSchema),
  });

  const fileRef = uploadAudioForm.register("audioFile");

  function handleSubmit(values: TAudioFileForm) {
    const formData = new FormData();
    formData.append("audioFile", values.audioFile[0]);

    const mutationPromise = uploadAudioFile(formData, {
      onSuccess: () => {
        refetchTracks();
      },
      onError: (error) => {
        console.error("Error creating track:", error);
      },
    });

    toast.promise(mutationPromise, {
      loading: "Uploading track's audio...",
      success: (data) => (
        <ToastMessage type="success">
          Audio for track "{data.title} - {data.artist}" was uploaded
          successfully!
        </ToastMessage>
      ),
      error: (err) => (
        <ToastMessage type="error">
          Failed to upload audio file. {String(err.message)}
        </ToastMessage>
      ),
    });

    setOpenDialog(false);
    uploadAudioForm.reset();
  }

  function handleCancel() {
    uploadAudioForm.reset();
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
              <FilePlus /> Audio
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upload audio file</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Music File</DialogTitle>
          <DialogDescription>You can upload your music file.</DialogDescription>
        </DialogHeader>
        <Form {...uploadAudioForm}>
          <form
            id={formId}
            onSubmit={uploadAudioForm.handleSubmit(handleSubmit)}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={uploadAudioForm.control}
                name="audioFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Choose a music file"
                        {...fileRef}
                        onChange={(event) => {
                          field.onChange(event.target?.files?.[0] ?? undefined);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form={formId}>
            Save file
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
