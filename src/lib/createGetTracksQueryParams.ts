import { ITracksListState } from "@/types";
import { TRACKS_PER_PAGE } from "@/lib/constants";

export const createGetTracksQueryParams = (query: ITracksListState) => {
  const queryParams = new URLSearchParams({
    limit: TRACKS_PER_PAGE.toString(),
  });

  queryParams.set("page", query.page.toString());
  queryParams.set("search", query.search);
  queryParams.set("genre", query.genre);
  queryParams.set("artist", query.artist);

  if (query.sortOrder) {
    const [sort, order] = query.sortOrder.split("-");
    queryParams.set("sort", sort);
    queryParams.set("order", order);
  }

  return queryParams;
};
