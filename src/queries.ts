import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { ITrack } from "@/types";

import { API_BASE_URL } from "@/lib/constants";

export const useGetTracks = (): UseQueryResult<ITrack[]> =>
  useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      const response = await fetch(API_BASE_URL + "/tracks");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return response.json().then((data) => data.data);
    },
  });

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
