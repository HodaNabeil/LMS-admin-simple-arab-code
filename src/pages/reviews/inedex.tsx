import { useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import ReviewTable from "@/features/reviews/components/table/ReviewTable";
import type { Review } from "@/types/reviews";
import { useReviews } from "@/features/reviews/hooks/useReviewsQueries";
import { Input } from "@/components/ui/input";
import CreateReviewDialog from "@/features/reviews/components/CreateReviewDialog";
import { cn } from "@/lib/utils";

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useReviews();

  const reviews: Review[] = useMemo(() => {
    const payload = data?.data as unknown;

    if (Array.isArray(payload)) return payload as Review[];

    if (payload && typeof payload === 'object') {
      const obj = payload as Record<string, unknown>;
      const nested = (obj.reviews ?? obj.items) as unknown;
      if (Array.isArray(nested)) return nested as Review[];
    }

    return [];
  }, [data]);

  const pageClassName = cn("space-y-6", "p-4");
  const filterRowClassName = cn(
    "flex",
    "flex-col",
    "sm:flex-row",
    "items-start",
    "sm:items-center",
    "gap-4",
    "py-4"
  );
  const searchInputClassName = cn("w-full", "sm:max-w-sm");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const q = searchTerm.trim().toLowerCase();
      if (!q) return true;

      return (
        review.comment.toLowerCase().includes(q) ||
        review.student.name.toLowerCase().includes(q) ||
        review.course.title.toLowerCase().includes(q)
      );
    });
  }, [reviews, searchTerm]);

  return (
    <main className={pageClassName}>
      <PageHeader title="مراجعات الطلاب" icon={MessageSquare}>
        <CreateReviewDialog />
      </PageHeader>

      <div className="w-full">
        <div className={filterRowClassName}>
          <Input
            placeholder="البحث في المراجعة الاسم أو التعليق أو الدورة..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={searchInputClassName}
          />
        </div>

        <ReviewTable reviews={filteredReviews} />
      </div>
    </main>
  );
}
