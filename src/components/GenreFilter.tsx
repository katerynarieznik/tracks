import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useGetGenres } from "@/queries";

export function GenreFilter({
  genre,
  setGenre,
}: {
  genre: string;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);

  const { data: genres } = useGetGenres();
  const genresList =
    genres?.map((item) => ({ value: item, label: item })) ?? [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between"
        >
          {genre
            ? genresList.find((item) => item.value === genre)?.label
            : "Filter by genre"}
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
                    setGenre(currentValue === genre ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      genre === item.value ? "opacity-100" : "opacity-0",
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
