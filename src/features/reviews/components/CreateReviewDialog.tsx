import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useCreateReview } from "@/features/reviews/hooks/useReviewsMutations";

export default function CreateReviewDialog() {
  const createReview = useCreateReview();
  const [open, setOpen] = useState(false);

  const [formState, setFormState] = useState({
    studentId: "",
    courseId: "",
    rating: "5",
    status: "pending" as "approved" | "pending" | "rejected",
    comment: "",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className={cn("w-4", "h-4", "mr-2")} />
          إضافة مراجعة
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>إنشاء مراجعة جديدة</DialogTitle>
          <DialogDescription>أدخل بيانات المراجعة ثم اضغط إنشاء.</DialogDescription>
        </DialogHeader>

        <div className={cn("grid", "grid-cols-1", "sm:grid-cols-2", "gap-4")}>
          <div className="space-y-2">
            <div className={cn("text-sm", "font-medium")}>Student ID</div>
            <Input
              value={formState.studentId}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, studentId: e.target.value }))
              }
              placeholder="stu_123"
            />
          </div>

          <div className="space-y-2">
            <div className={cn("text-sm", "font-medium")}>Course ID</div>
            <Input
              value={formState.courseId}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, courseId: e.target.value }))
              }
              placeholder="course_123"
            />
          </div>

          <div className="space-y-2">
            <div className={cn("text-sm", "font-medium")}>التقييم</div>
            <Input
              type="number"
              min={1}
              max={5}
              value={formState.rating}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, rating: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <div className={cn("text-sm", "font-medium")}>الحالة</div>
            <Select
              value={formState.status}
              onValueChange={(v) =>
                setFormState((prev) => ({
                  ...prev,
                  status: v as "approved" | "pending" | "rejected",
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">قيد المراجعة</SelectItem>
                <SelectItem value="approved">مقبول</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <div className={cn("text-sm", "font-medium")}>التعليق</div>
          <Textarea
            value={formState.comment}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, comment: e.target.value }))
            }
            placeholder="اكتب تعليق المراجعة..."
            rows={4}
          />
        </div>

        <div className={cn("flex", "justify-end", "gap-2")}>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            إلغاء
          </Button>
          <Button
            type="button"
            disabled={createReview.isPending}
            onClick={async () => {
              await createReview.mutateAsync({
                studentId: formState.studentId,
                courseId: formState.courseId,
                rating: Number(formState.rating || 0),
                status: formState.status,
                comment: formState.comment,
              });

              setOpen(false);
              setFormState({
                studentId: "",
                courseId: "",
                rating: "5",
                status: "pending",
                comment: "",
              });
            }}
          >
            إنشاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
