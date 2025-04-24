import { z } from "zod";

import { trackFormSchema } from "@/lib/trackFormSchema";
import { audioFileFormSchema } from "@/lib/audioFileFormSchema";

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

export type TTrackForm = z.infer<typeof trackFormSchema>;

export type TAudioFileForm = z.infer<typeof audioFileFormSchema>;

export interface ITracksListState {
  page: number;
  search: string;
  genre: string;
  artist: string;
  sortOrder: string;
}

export interface OptimisticGetTracksQueryResultPartial {
  data: Partial<ITrack>[];
  meta: { limit: number; page: number; total: number; totalPages: number };
}
