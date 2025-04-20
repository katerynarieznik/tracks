import { Pencil } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-1">
          <Pencil /> Edit
        </Button>
      </DialogTrigger>
      <EditTrackForm track={track} />
    </Dialog>
  );
}
