import { useMemo, useState } from "react";
import { MessageSquare, Star, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageHeader } from "@/components/shared/PageHeader";
import ReviewTable from "@/features/reviews/components/table/ReviewTable";
import type { Review } from "@/types/reviews";
import { useCourseReviews } from "@/features/reviews/hooks/useReviewsQueries";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReviewsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: reviewsData, isLoading } = useCourseReviews(slug);

  const reviews: Review[] = useMemo(() => {
    const payload = reviewsData?.data as unknown;

    if (Array.isArray(payload)) return payload as Review[];

    if (payload && typeof payload === "object") {
      const obj = payload as Record<string, unknown>;
      const nested = (obj.reviews ?? obj.items) as unknown;
      if (Array.isArray(nested)) return nested as Review[];
    }

    return [];
  }, [reviewsData]);

  const filteredReviews = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return reviews;
    return reviews.filter(
      (review) =>
        review.comment.toLowerCase().includes(q) ||
        review.student?.name?.toLowerCase().includes(q)
    );
  }, [reviews, searchTerm]);

  return (
    <div className={cn("space-y-6", "p-4")}>
      <PageHeader title="مراجعات الطالب" icon={MessageSquare}>
        <div className="flex gap-2">
          <Link to="/admin/courses">
            <Button variant="outline" size="sm">
              <ArrowRight className="h-4 w-4 ml-2" />
              العودة للكورسات
            </Button>
          </Link>
          <Link to={`/admin/courses/${slug}/reviews/create`}>
            <Button variant="default" size="sm">إضافة مراجعة</Button>
          </Link>
        </div>
      </PageHeader>

      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
        <Star className="h-4 w-4 text-amber-500 fill-amber-400 shrink-0" />
        <span className="text-sm font-medium">
          مراجعات الكورس:
        </span>
        <Badge variant="secondary" className="font-mono text-xs">
          {slug}
        </Badge>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Input
          placeholder="البحث في التعليقات أو اسم الطالب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-sm"
        />
        {isLoading && (
          <span className="text-sm text-muted-foreground animate-pulse">
            جارٍ تحميل المراجعات...
          </span>
        )}
      </div>

      <ReviewTable reviews={filteredReviews} />
    </div>
  );
}
