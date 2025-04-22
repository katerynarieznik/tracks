import { Pencil } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { EditTrackForm } from "@/components/EditTrackForm";
import { ITrack } from "@/types";

interface EditTrackButtonProps {
  track: ITrack;
}

export function EditTrackButton({ track }: EditTrackButtonProps) {
  return (
    <Dialog
      onOpenChange={() => {
        // TODO: reset form
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="mt-1">
              <Pencil /> <span className="sr-only">Edit track metadata</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit track metadata</p>
        </TooltipContent>
      </Tooltip>
      <EditTrackForm track={track} />
    </Dialog>
  );
}
