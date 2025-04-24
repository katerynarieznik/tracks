import { useFormContext } from "react-hook-form";

import { TTrackForm } from "@/types";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { GenresSelect } from "@/components/GenresSelect";

interface CreateTrackFormProps {
  formId: string;
  onSubmit: (data: TTrackForm) => void;
}

export function CreateEditTrackForm({
  formId,
  onSubmit,
}: CreateTrackFormProps) {
  const form = useFormContext<TTrackForm>();

  return (
    <Form {...form}>
      <form
        id={formId}
        data-testid="track-form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid gap-4 py-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    data-testid="input-title"
                    placeholder="Two of Us"
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="error-title" />
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
                  <Input
                    data-testid="input-artist"
                    placeholder="the Beatles"
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="error-artist" />
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
                  <Input
                    data-testid="input-album"
                    placeholder="Let It Be"
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="error-album" />
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
                  <GenresSelect data-testid="genre-selector" {...field} />
                </FormControl>
                <FormMessage data-testid="error-genre" />
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
                    data-testid="input-cover-image"
                    placeholder="https://example.com/cover.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage data-testid="error-cover-image" />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
