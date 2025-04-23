import { Check, PlusCircle, X } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

import { cn } from "@/lib/utils";
import { TTrackForm } from "@/types";
import { useGetGenres } from "@/queries";
import { getGenresDropdownOptions } from "@/lib/mappers";

import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/components/Loader";

export function GenresSelect({
  value = [],
  onChange,
  disabled,
  ...props
}: ControllerRenderProps<TTrackForm, "genres">) {
  const { data: genresList, isLoading } = useGetGenres();
  const genresOptions = getGenresDropdownOptions(genresList);

  return (
    <div className="flex flex-col gap-2 overflow-scroll lg:flex-row lg:gap-1">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 max-w-40 border-dashed"
            disabled={disabled || isLoading}
            aria-disabled={disabled || isLoading}
            {...props}
          >
            {isLoading ? (
              <Loader>Loading genres...</Loader>
            ) : (
              <>
                <PlusCircle />
                Select genres
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-50 p-0" align="start">
          <Command>
            <CommandInput placeholder="Select genres" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {genresOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          onChange(value.filter((v) => v !== option.value));
                        } else {
                          onChange([...value, option.value]);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-primary"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className="text-primary-foreground" />
                      </div>
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex">
          <Separator
            orientation="vertical"
            className="mx-2 hidden h-4 lg:block"
          />
          <div className="flex space-x-1">
            {genresOptions
              .filter((option) => value.includes(option.value))
              .map((option) => (
                <Badge
                  variant="secondary"
                  key={option.value}
                  className="rounded-sm px-2 py-1 text-sm font-normal"
                >
                  {option.label}
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-destructive size-2.5 cursor-pointer has-[>svg]:px-2"
                    onClick={() =>
                      onChange(value.filter((v) => v !== option.value))
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
