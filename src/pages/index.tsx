import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useAdminStats } from "@/hooks/useAdminStats";
import { Loader } from "@/components/shared/loader";
import { Suspense, lazy } from "react";

const PaymentHistory = lazy(
  () => import("@/features/admin/components/PaymentHistory")
);
const RegistrationStatuses = lazy(
  () => import("@/features/admin/components/Registration-Statuses")
);
const YearlyProgress = lazy(
  () => import("@/features/admin/components/Yearly-Progress")
);
const AverageCourseProgress = lazy(
  () => import("@/features/admin/components/Average-Course-progress")
);

export default function Admin() {
  const { setIsMobileSidebarOpen } = useOutletContext<{
    setIsMobileSidebarOpen: (open: boolean) => void;
  }>();

  const { data, isLoading, error, isError } = useAdminStats();
  const yearlyProgress = data?.yearlyProgress;

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        {error?.message || "حدث خطأ أثناء تحميل البيانات"}
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex flex-row-reverse">
        <div
          dir="rtl"
          className="flex flex-col min-h-screen bg-[#f8fafc] font-cairo p-4 gap-6"
        >
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden flex justify-end"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Suspense fallback={<Loader />}>
            <RegistrationStatuses />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <YearlyProgress yearlyProgress={yearlyProgress || {}} />
          </Suspense>

          <div className="w-full">
            <Suspense fallback={<Loader />}>
              <PaymentHistory />
            </Suspense>
          </div>
        </div>

        <div className="p-[20px] w-full lg:w-1/2">
          <Suspense fallback={<Loader />}>
            <AverageCourseProgress
              averageCourseProgress={data?.averageCourseProgress}
            />
          </Suspense>
        </div>
      </div>
    );
  }

  return null;
}
