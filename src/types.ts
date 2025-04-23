import { z } from "zod";

import { createEditTrackFormSchema } from "@/components/createEditTrack/formSchema";
import { uploadAudioFileFormSchema } from "@/components/uploadAudio/formSchema";

export interface ITrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  genres: string[];
  slug: string;
  coverImage: string;
  audioFile: string;
  createdAt: string;
  updatedAt: string;
}

export type TTrackForm = z.infer<typeof createEditTrackFormSchema>;

export type TAudioFileForm = z.infer<typeof uploadAudioFileFormSchema>;

export interface ITracksListState {
  page: number;
  search: string;
  genre: string;
  artist: string;
  sortOrder: string;
}
