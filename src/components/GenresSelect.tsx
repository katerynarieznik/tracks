import { Check, PlusCircle, X } from "lucide-react";

import { cn } from "@/lib/utils";
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

interface GenresSelectProps {
  options: {
    label: string;
    value: string;
  }[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
}

export function GenresSelect({
  options,
  selectedValues,
  onSelect,
}: GenresSelectProps) {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <PlusCircle />
            Select genres
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Select genres" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          onSelect(
                            selectedValues.filter(
                              (value) => value !== option.value,
                            ),
                          );
                        } else {
                          onSelect([...selectedValues, option.value]);
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
      {selectedValues.length > 0 && (
        <>
          <Separator orientation="vertical" className="mx-2 h-4" />
          <Badge
            variant="secondary"
            className="rounded-sm px-1 font-normal lg:hidden"
          >
            {selectedValues}
          </Badge>
          <div className="hidden space-x-1 lg:flex">
            {options
              .filter((option) => selectedValues.includes(option.value))
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
                      onSelect(
                        selectedValues.filter(
                          (value) => value !== option.value,
                        ),
                      )
                    }
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
          </div>
        </>
      )}
    </>
  );
}
