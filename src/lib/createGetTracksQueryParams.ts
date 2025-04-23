import { ITracksListState } from "@/types";
import { TRACKS_PER_PAGE } from "@/lib/constants";

export const createGetTracksQueryParams = (query: ITracksListState) => {
  const queryParams = new URLSearchParams({
    limit: TRACKS_PER_PAGE.toString(),
  });

  if (query.page) {
    queryParams.set("page", query.page.toString());
  }
  if (query.search) {
    queryParams.set("search", query.search);
  }
  if (query.genre) {
    queryParams.set("genre", query.genre);
  }
  if (query.artist) {
    queryParams.set("artist", query.artist);
  }
  if (query.sortOrder) {
    const [sort, order] = query.sortOrder.split("-");
    queryParams.set("sort", sort);
    queryParams.set("order", order);
  }

  return queryParams;
};
