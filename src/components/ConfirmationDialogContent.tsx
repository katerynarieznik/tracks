import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogContentProps {
  title: string;
  confirmButtonText?: string;
  onConfirm: () => void;
  children: React.ReactNode;
}

export function ConfirmationDialogContent({
  title,
  confirmButtonText = "Delete",
  onConfirm,
  children,
}: ConfirmationDialogContentProps) {
  return (
    <DialogContent data-testid="confirm-dialog">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
      <DialogFooter>
        <DialogClose asChild>
          <Button data-testid="cancel-delete" variant="ghost" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button
          data-testid="confirm-delete"
          variant="destructive"
          onClick={onConfirm}
        >
          {confirmButtonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
