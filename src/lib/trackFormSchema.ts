import { z } from "zod";

export const trackFormSchema = z.object({
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
  coverImage: z.string().url().optional().or(z.literal("")),
});
