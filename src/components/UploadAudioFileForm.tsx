import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGetTracks } from "@/queries";
import { useUploadAudioFile } from "@/mutations";

const MAX_FILE_SIZE = 10485760; // 10MB in bytes
const ACCEPTED_FILE_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/flac",
  "audio/ogg",
];

const uploadAudioFileFormSchema = z.object({
  audioFile: z
    .instanceof(FileList)
    .refine((files) => files?.length == 1, "Audio file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`,
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .mp3, .wav, .flac and .ogg files are accepted.",
    ),
});

export type UploadAudioFileFormSchema = z.infer<
  typeof uploadAudioFileFormSchema
>;

export function UploadAudioFileForm({ id }: { id: string }) {
  const { refetch: refetchTracks } = useGetTracks();

  const uploadAudioFile = useUploadAudioFile({ id });
  const form = useForm<z.infer<typeof uploadAudioFileFormSchema>>({
    resolver: zodResolver(uploadAudioFileFormSchema),
  });

  const fileRef = form.register("audioFile");

  function onSubmit(values: z.infer<typeof uploadAudioFileFormSchema>) {
    console.log("Form values:", values);

    const formData = new FormData();
    formData.append("audioFile", values.audioFile[0]);

    uploadAudioFile.mutate(formData, {
      onSuccess: (data) => {
        console.log("Audio file uploaded successfully.");
        console.log("Data:", data);
        form.reset();
        refetchTracks();
      },
    });
  }

  function onCancel() {
    form.reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Upload Music File</DialogTitle>
        <DialogDescription>You can upload your music file.</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form id="uploadMusicFileForm" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
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
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" form="uploadMusicFileForm">
          Save file
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
