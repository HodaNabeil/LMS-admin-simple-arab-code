import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/shared/loader';
import { useState } from 'react';
import { useDeleteReview } from '../../hooks/useReviewsMutations';
import { cn } from "@/lib/utils";

export function DeleteReview({ reviewId }: { reviewId: string }) {
    const [open, setOpen] = useState(false);
    const { mutateAsync: deleteReview, isPending } = useDeleteReview();

    const handleDelete = async () => {
        try {
            await deleteReview(reviewId);
            setOpen(false);
        } catch (error) {
            // Error is handled by the hook
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="hover:bg-red-50 text-red-600 p-1 rounded-md transition-colors">
                    <Trash2 className={cn('h-4', 'w-4')} />
                    <span className="sr-only">حذف</span>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-md p-6 border-none shadow-none bg-background rounded-2xl">
                <DialogHeader className="flex flex-col items-center gap-4 text-center">
                    <div className="p-3 bg-red-100 rounded-full">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="space-y-2">
                        <DialogTitle className="text-xl font-bold">حذف المراجعة</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            هل أنت متأكد من حذف هذه المراجعة؟ لا يمكن التراجع عن هذا الإجراء.
                        </DialogDescription>
                    </div>
                </DialogHeader>
                <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="flex-1 rounded-xl h-11 font-bold"
                    >
                        إلغاء
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="flex-1 rounded-xl h-11 font-bold bg-red-600 hover:bg-red-700"
                    >
                        {isPending ? <Loader className="text-white" /> : 'تأكيد الحذف'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
