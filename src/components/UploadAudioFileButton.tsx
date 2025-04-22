import { FileMusic } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UploadAudioFileForm } from "@/components/UploadAudioFileForm";

export function UploadAudioFileButton({ id }: { id: string }) {
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
              <FileMusic /> <span className="sr-only">Upload</span>
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Upload audio file</p>
        </TooltipContent>
      </Tooltip>
      <UploadAudioFileForm id={id} />
    </Dialog>
  );
}
