import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateTrackModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create Track</DialogTitle>
        <DialogDescription>
          Create a track and share it with the world. You can add a cover image,
          audio file, and more.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input
            id="title"
            className="col-span-3"
            placeholder="Enter track title"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="artist" className="text-right">
            Artist
          </Label>
          <Input
            id="artist"
            placeholder="Enter artist name"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save track</Button>
      </DialogFooter>
    </DialogContent>
  );
}
