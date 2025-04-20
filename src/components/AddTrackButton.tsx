import { Plus } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateTrackForm } from "@/components/CreateTrackForm";

export function AddTrackButton() {
  return (
    <Dialog
      onOpenChange={() => {
        // TODO: reset form
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus /> Add track
        </Button>
      </DialogTrigger>
      <CreateTrackForm />
    </Dialog>
  );
}
