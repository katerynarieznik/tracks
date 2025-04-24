import { ITracksListState } from "@/types";
import { TRACKS_PER_PAGE } from "@/lib/constants";

export const createGetTracksQueryParams = (query: ITracksListState) => {
  const queryParams = new URLSearchParams({
    limit: TRACKS_PER_PAGE.toString(),
  });

  queryParams.set("page", (query.page || 1).toString());

  const addParamIfNotEmpty = (key: string, value?: string) => {
    if (value && value.trim() !== "") {
      queryParams.set(key, value);
    }
  };

  addParamIfNotEmpty("search", query.search);
  addParamIfNotEmpty("genre", query.genre);
  addParamIfNotEmpty("artist", query.artist);

  if (query.sortOrder) {
    const [sort, order] = query.sortOrder.split("-");
    addParamIfNotEmpty("sort", sort);
    addParamIfNotEmpty("order", order);
  }

  return queryParams;
};
