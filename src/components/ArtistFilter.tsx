import React from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function ArtistFilter({
  artist,
  setArtist,
}: {
  artist: string;
  setArtist: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="min-w-50">
      <Label htmlFor="artistFilter" className="sr-only">
        Filter by artist
      </Label>
      <div className="relative">
        <Input
          id="artistFilter"
          placeholder="Filter by artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="bg-background focus-visible:ring-sidebar-ring h-9 w-full shadow-none focus-visible:ring-2"
        />
      </div>
    </div>
  );
}
