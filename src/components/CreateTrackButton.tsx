import { Plus } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreateTrackForm } from "@/components/CreateTrackForm";

export function CreateTrackButton() {
  return (
    <Dialog
      onOpenChange={() => {
        // TODO: reset form
      }}
    >
      <DialogTrigger asChild>
        <Button data-testid="create-track-button">
          <Plus /> Create track
        </Button>
      </DialogTrigger>
      <CreateTrackForm />
    </Dialog>
  );
}
