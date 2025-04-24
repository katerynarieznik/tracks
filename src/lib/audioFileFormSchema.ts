import { z } from "zod";

const MAX_FILE_SIZE = 10485760; // 10MB in bytes
const ACCEPTED_FILE_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/mp3",
  "audio/x-wav",
];

export const audioFileFormSchema = z.object({
  audioFile: z
    .instanceof(FileList)
    .refine((files) => files?.length == 1, "Audio file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 10MB.`,
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only MP3 and WAV files are accepted.",
    ),
});
