import {
  useQuery,
  UseQueryResult,
  keepPreviousData,
} from "@tanstack/react-query";

import { ITrack } from "@/types";

import { API_BASE_URL, TRACKS_PER_PAGE } from "@/lib/constants";

interface IUseGetTracksParams {
  page?: number;
  limit?: number;
  search?: string;
  genre?: string;
  artist?: string;
  sortOrder?: string;
}

export const useGetTracks = ({
  page = 1,
  limit = TRACKS_PER_PAGE,
  search,
  genre,
  artist,
  sortOrder,
}: IUseGetTracksParams): UseQueryResult<{
  data: ITrack[];
  meta: { limit: number; page: number; total: number; totalPages: number };
}> => {
  const getQueryParams = () => {
    let queryString = "";
    if (search) {
      queryString += `&search=${search}`;
    }
    if (genre) {
      queryString += `&genre=${genre}`;
    }
    if (artist) {
      queryString += `&artist=${artist}`;
    }
    if (sortOrder) {
      const sortAndOrder = sortOrder.split("-");
      queryString += `&sort=${sortAndOrder[0]}&order=${sortAndOrder[1]}`;
    }
    return queryString;
  };

  return useQuery({
    queryKey: ["tracks", page, limit, search, genre, artist, sortOrder],
    queryFn: async () => {
      const queryParams = getQueryParams();

      const response = await fetch(
        API_BASE_URL + `/tracks?page=${page}&limit=${limit}${queryParams}`,
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
