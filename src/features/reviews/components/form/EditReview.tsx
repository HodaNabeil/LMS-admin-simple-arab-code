import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import ReviewForm from "./ReviewForm";
import { Edit } from "lucide-react";
import type { Review } from "@/types/reviews";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function EditReview({ review }: { review: Review }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="hover:bg-accent hover:text-accent-foreground p-1 rounded-md transition-colors">
                    <Edit className={cn('h-4', 'w-4', 'text-blue-600', 'hover:text-blue-800')} />
                    <span className="sr-only">تعديل</span>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 border-none shadow-none bg-background">
                <DialogHeader className="sr-only">
                    <DialogTitle>تعديل المراجعة</DialogTitle>
                    <DialogDescription>
                        تعديل بيانات المراجعة والتعليق
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full">
                    <ReviewForm
                        reviewData={review}
                        onSuccess={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
