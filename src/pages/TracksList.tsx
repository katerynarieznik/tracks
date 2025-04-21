import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetTracks } from "@/queries";
import { Header } from "@/components/Header";
import { TrackCard } from "@/components/TrackCard";
import { Filters } from "@/components/Filters";
import { TRACKS_PER_PAGE } from "@/lib/constants";

export function TracksList() {
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isPlaceholderData } = useGetTracks(
    page,
    TRACKS_PER_PAGE,
  );

  const tracks = data?.data;
  const meta = data?.meta;
  const pagesList = Array.from(
    { length: meta?.totalPages ?? 1 },
    (_, i) => i + 1,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className="container mx-auto flex max-w-5xl flex-col px-4 py-8">
        <Filters />
        <div className="grid w-full grid-cols-4 gap-4">
          {tracks?.map((track) => <TrackCard key={track.id} track={track} />)}
        </div>
        <div className="py-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                />
              </PaginationItem>
              {pagesList.map((pageItem) => (
                <PaginationItem key={pageItem}>
                  <PaginationLink
                    onClick={() => setPage(pageItem)}
                    isActive={pageItem === page}
                  >
                    {pageItem}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (!isPlaceholderData && page !== meta?.totalPages) {
                      setPage((old) => old + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
