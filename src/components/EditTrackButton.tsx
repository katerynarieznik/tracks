import { Pencil } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { EditTrackForm } from "@/components/EditTrackForm";

interface EditTrackButtonProps {
  slug: string;
}

export function EditTrackButton({ slug }: EditTrackButtonProps) {
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
      <EditTrackForm trackSlug={slug} />
    </Dialog>
  );
}
