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
import { useGetGenres } from "@/queries";

const createTrackFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  artist: z.string().min(1, {
    message: "Artist is required",
  }),
  album: z.string().optional(),
  genres: z.array(z.string()).optional(),
  cover: z.string().optional(),
});

export function CreateTrackModal() {
  const { data: genresList } = useGetGenres();
  const genresOptions = genresList?.map((genre) => ({
    label: genre,
    value: genre.toLowerCase(),
  }));

  const form = useForm<z.infer<typeof createTrackFormSchema>>({
    resolver: zodResolver(createTrackFormSchema),
    defaultValues: {
      title: "",
      artist: "",
      album: "",
      genres: [""],
      cover: "",
    },
  });

  function onSubmit(values: z.infer<typeof createTrackFormSchema>) {
    console.log(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              name="cover"
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
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button" onClick={onCancel}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save track</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
