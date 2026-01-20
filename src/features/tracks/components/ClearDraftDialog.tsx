import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ClearDraftDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}


export function ClearDraftDialog({ open, onOpenChange, onConfirm }: ClearDraftDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>حذف المسودة؟</DialogTitle>
                    <DialogDescription>
                        هل أنت متأكد من أنك تريد حذف المسودة المحفوظة؟ سيتم فقد جميع التغييرات التي قمت بها.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        إلغاء
                    </Button>
                    <Button variant="destructive" onClick={onConfirm}>
                        نعم، احذف
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
