import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { ITrack } from "@/types";

const API_BASE_URL = "http://0.0.0.0:3000/api";

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
