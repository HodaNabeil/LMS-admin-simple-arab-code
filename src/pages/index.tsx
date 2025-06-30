import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";

// import { SalesLineChart } from "@/features/admin/components/SalesLineChart";
import PaymentHistory from "@/components/PaymentHistory";
import RegistrationStatuses from "@/features/admin/components/Registration-Statuses";
import { useAdminStats } from "@/hooks/useAdminStats";
import YearlyProgress from "@/features/admin/components/Yearly-Progress";
import AverageCourseProgress from "@/features/admin/components/Average-Course-progress";

// بيانات التقدم والبيانات الوهمية للدورات


export default function Admin() {
  const { setIsMobileSidebarOpen } = useOutletContext<{
    setIsMobileSidebarOpen: (open: boolean) => void;
  }>();

  const { data, isLoading, error, isError } = useAdminStats();
  const yearlyProgress = data?.yearlyProgress;

  return (
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

      {/* الصف الثالث: متوسط تقدم الدورات + الدورات المنشأة مؤخرًا */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AverageCourseProgress averageCourseProgress={data?.averageCourseProgress} />
      </div>

      {/* الصف الرابع: سجل المدفوعات */}
      <div className="w-full">
        <PaymentHistory />
      </div>
    </div>
  );
}
