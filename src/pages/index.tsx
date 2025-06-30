import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";

// import { SalesLineChart } from "@/features/admin/components/SalesLineChart";
import PaymentHistory from "@/features/admin/components/PaymentHistory";
import RegistrationStatuses from "@/features/admin/components/Registration-Statuses";
import { useAdminStats } from "@/hooks/useAdminStats";
import YearlyProgress from "@/features/admin/components/Yearly-Progress";
import AverageCourseProgress from "@/features/admin/components/Average-Course-progress";
import { Loader } from "@/components/shared/loader";

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
      <div className=" flex    flex-row-reverse">
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

          {/* الصف الأول: الكروت الإحصائية */}
          <RegistrationStatuses />

          {/* الصف الثانRegistrationStatusesي: رسم بياني */}

          <YearlyProgress yearlyProgress={yearlyProgress || {}} />

          {/* الصف الرابع: سجل المدفوعات */}
          <div className="w-full">
            <PaymentHistory />
          </div>
        </div>
        {/* الصف الثالث: متوسط تقدم الدورات + الدورات المنشأة مؤخرًا */}
        <div className=" p-[20px] w-full lg:w-1/2">
          <AverageCourseProgress
            averageCourseProgress={data?.averageCourseProgress}
          />
        </div>
      </div>
    );
  }
}
