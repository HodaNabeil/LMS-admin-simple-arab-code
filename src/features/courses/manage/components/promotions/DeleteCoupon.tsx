import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader } from '@/components/shared/loader';
import { useState } from 'react';

interface DeleteCouponProps {
    couponId: string;
    onDelete: (id: string) => Promise<void> | void;
}

export default function DeleteCoupon({ couponId, onDelete }: DeleteCouponProps) {
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await onDelete(couponId);
            toast.success('تم حذف الكوبون بنجاح');
            setOpen(false);
        } catch {
            toast.error('حدث خطأ أثناء حذف الكوبون');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full"
                    title="حذف"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="!text-right">
                    <DialogTitle>جذف الكوبون</DialogTitle>
                </DialogHeader>
                <div className="text-right">
                    هل أنت متأكد من أنك تريد حذف هذا الكوبون؟
                </div>
                <div className="flex gap-2 justify-end mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        إلغاء
                    </Button>
                    <Button
                        variant="destructive"
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        حذف
                        {isDeleting && <Loader />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
