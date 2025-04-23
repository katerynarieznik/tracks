import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useGetGenres } from "@/queries";
import { getGenresDropdownOptions } from "@/lib/mappers";
import { useTracksListState } from "@/hooks/useTracksListState";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function GenreFilter() {
  const [open, setOpen] = React.useState(false);
  const { tracksListState, setTracksListState } = useTracksListState();

  const { data: genres } = useGetGenres();
  const genresList = getGenresDropdownOptions(genres);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between"
        >
          {tracksListState.genre ? (
            genresList.find((item) => item.value === tracksListState.genre)
              ?.label
          ) : (
            <span className="text-muted-foreground font-normal">
              Filter by genre
            </span>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command>
          <CommandInput placeholder="Search genre..." />
          <CommandList>
            <CommandEmpty>No genre found.</CommandEmpty>
            <CommandGroup>
              {genresList.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const newGenre =
                      currentValue === tracksListState.genre
                        ? ""
                        : currentValue;
                    setTracksListState((prevState) => ({
                      ...prevState,
                      genre: newGenre,
                    }));
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      tracksListState.genre === item.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
