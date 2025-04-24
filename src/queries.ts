import {
  useQuery,
  UseQueryResult,
  keepPreviousData,
} from "@tanstack/react-query";

import { ITrack, ITracksListState } from "@/types";

import { API_BASE_URL } from "@/lib/constants";
import { createGetTracksQueryParams } from "@/lib/createGetTracksQueryParams";

export const useGetTracks = (
  params: ITracksListState,
): UseQueryResult<{
  data: ITrack[];
  meta: { limit: number; page: number; total: number; totalPages: number };
}> => {
  return useQuery({
    queryKey: ["tracks", params],
    queryFn: async () => {
      const queryParams = createGetTracksQueryParams(params);

      const response = await fetch(API_BASE_URL + `/tracks?${queryParams}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`Something went wrong. ${data.error} ${data.message}`);
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
        const data = await response.json();
        throw new Error(`Something went wrong. ${data.error}  ${data.message}`);
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
        const data = await response.json();
        throw new Error(`Something went wrong. ${data.error}  ${data.message}`);
      }

      return response.json();
    },
    enabled: !!slug,
  });
