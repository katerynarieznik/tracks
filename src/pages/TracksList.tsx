import React from "react";

import { useGetTracks } from "@/queries";

import { cn } from "@/lib/utils";
import { TRACKS_PER_PAGE } from "@/lib/constants";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Header } from "@/components/Header";
import { Filters } from "@/components/Filters";
import { TrackCard } from "@/components/TrackCard";
import { SortWithOrderSelect } from "@/components/SortWithOrderSelect";

export function TracksList() {
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState<string>("");
  const [genre, setGenre] = React.useState<string>("");
  const [artist, setArtist] = React.useState<string>("");
  const [sortOrder, setSortOrder] = React.useState<string>("");

  const { data, isLoading, isPlaceholderData } = useGetTracks(
    page,
    TRACKS_PER_PAGE,
    search,
    genre,
    artist,
    sortOrder,
  );

  const tracks = data?.data;
  const meta = data?.meta;

  const pagesList = Array.from(
    { length: meta?.totalPages ?? 1 },
    (_, i) => i + 1,
  );

  const isTracksEmpty = !tracks || tracks.length === 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header search={search} setSearch={setSearch} />
      <main className="container mx-auto flex max-w-5xl flex-col px-4 py-8">
        <div className="flex w-full items-center justify-between pb-8">
          <Filters
            genre={genre}
            artist={artist}
            setGenre={setGenre}
            setArtist={setArtist}
          />
          <SortWithOrderSelect setSortOrder={setSortOrder} />
        </div>
        <div
          className={cn(
            "grid w-full grid-cols-4 gap-x-5 gap-y-8",
            isTracksEmpty && "block",
          )}
        >
          {isTracksEmpty ? (
            <p className="text-muted-foreground py-6 text-center text-base">
              No tracks found
            </p>
          ) : (
            tracks.map((track) => <TrackCard key={track.id} track={track} />)
          )}
        </div>
        {!isTracksEmpty && (
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
        )}
      </main>
    </div>
  );
}
