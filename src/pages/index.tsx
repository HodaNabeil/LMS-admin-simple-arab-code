import { useOutletContext } from "react-router-dom";
import { useAdminStats } from "@/features/stats/hooks/useAdminStats";
import { Loader } from "@/components/shared/loader";
import StatsSummary from "@/features/stats/components/StatsSummary";
import YearlyProgress from "@/features/stats/components/YearlyProgress";
import PaymentHistory from "@/features/stats/components/PaymentHistory";
import AverageCourseProgress from "@/features/stats/components/AverageCourseProgress";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Admin() {
  const { setIsMobileSidebarOpen } = useOutletContext<{
    setIsMobileSidebarOpen: (open: boolean) => void;
  }>();

  const { data, isLoading, error, isError } = useAdminStats();

  if (isLoading) {
    return (
      <div className="element-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isLoading && isError) {
    return (
      <div className="text-center py-8 text-red-500">
        {error?.message || "حدث خطأ أثناء تحميل البيانات"}
      </div>
    );
  }

  return (
    !isLoading &&
    data && (
      <>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden flex justify-end"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex p-4 gap-4">
          <div className="flex flex-col gap-4">
            <StatsSummary summary={data.summary} />

            <YearlyProgress yearlyProgress={data.yearlyProgress} />

            <PaymentHistory />
          </div>
          <div className="flex flex-col gap-4 ">
            <AverageCourseProgress
              averageCourseProgress={data?.averageCourseProgress}
            />
            {/* <RecentlyCreatedCoursesCard
              courses={data?.recentlyCreatedCourses}
            /> */}
          </div>
        </div>
      </>
    )
  );
}
