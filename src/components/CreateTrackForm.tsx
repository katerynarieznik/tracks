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
import { GenresSelect } from "./GenresSelect";
import { useGetGenres, useGetTracks } from "@/queries";
import { useCreateTrack } from "@/mutations";

const createTrackFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  artist: z
    .string()
    .min(1, {
      message: "Artist is required",
    })
    .optional(),
  album: z.string().optional(),
  genres: z
    .array(z.string())
    .max(3, { message: "You can select up to 3 genres" })
    .optional(),
  coverImage: z.string().url().optional(),
});

export function CreateTrackForm() {
  const getTracks = useGetTracks();
  const { data: genresList } = useGetGenres();
  const genresOptions = genresList?.map((genre) => ({
    label: genre,
    value: genre,
  }));

  const createTrack = useCreateTrack();

  const form = useForm<z.infer<typeof createTrackFormSchema>>({
    resolver: zodResolver(createTrackFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [],
    },
  });

  function onSubmit(values: z.infer<typeof createTrackFormSchema>) {
    createTrack.mutate(values, {
      onSuccess: (data) => {
        console.log("Track created successfully");
        console.log("Created track data:", data);
        form.reset();
        getTracks.refetch();
      },
      onError: (error) => {
        console.error("Error creating track:", error);
      },
    });
  }

  function onCancel() {
    form.reset();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Track</DialogTitle>
        <DialogDescription>
          You can add track metadata and upload the audio file later.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form id="createTrackForm" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Two of Us" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="artist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Artist</FormLabel>
                  <FormControl>
                    <Input placeholder="the Beatles" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="album"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Album</FormLabel>
                  <FormControl>
                    <Input placeholder="Let It Be" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genres</FormLabel>
                  <FormControl>
                    <GenresSelect
                      options={genresOptions ?? []}
                      selectedValues={field.value ?? []}
                      onSelect={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coverImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/cover.jpg"
                      {...field}
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
        <Button type="submit" form="createTrackForm">
          Save track
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
