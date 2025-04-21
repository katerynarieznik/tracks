import { FileMusic } from "lucide-react";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadAudioFileForm } from "@/components/UploadAudioFileForm";

export function UploadAudioFileButton({ id }: { id: string }) {
  return (
    <Dialog
      onOpenChange={() => {
        // TODO: reset form
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="mt-1">
          <FileMusic /> <span className="sr-only">Upload</span>
        </Button>
      </DialogTrigger>
      <UploadAudioFileForm id={id} />
    </Dialog>
  );
}
