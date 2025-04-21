import {
  useQuery,
  UseQueryResult,
  keepPreviousData,
} from "@tanstack/react-query";

import { ITrack } from "@/types";

import { API_BASE_URL, TRACKS_PER_PAGE } from "@/lib/constants";

export const useGetTracks = (
  page = 1,
  limit = TRACKS_PER_PAGE,
): UseQueryResult<{
  data: ITrack[];
  meta: { limit: number; page: number; total: number; totalPages: number };
}> => {
  return useQuery({
    queryKey: ["tracks", page, limit],
    queryFn: async () => {
      const response = await fetch(
        API_BASE_URL + `/tracks?page=${page}&limit=${limit}`,
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    },
    placeholderData: keepPreviousData,
  });
};

export const useGetGenres = (): UseQueryResult<string[]> =>
  useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const response = await fetch(API_BASE_URL + "/genres");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    },
  });

export const useGetTrackBySlug = ({
  slug,
}: {
  slug: string;
}): UseQueryResult<ITrack> =>
  useQuery({
    queryKey: ["track", slug],
    queryFn: async () => {
      const response = await fetch(API_BASE_URL + `/tracks/${slug}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json();
    },
  });
