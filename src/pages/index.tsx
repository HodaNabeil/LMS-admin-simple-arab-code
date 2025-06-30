import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { CoursesProgressCard } from "@/features/admin/components/CoursesProgressCard";
import { RecentlyCreatedCoursesCard } from "@/features/admin/components/RecentlyCreatedCoursesCard";
// import { SalesLineChart } from "@/features/admin/components/SalesLineChart";
import PaymentHistory from "@/components/PaymentHistory";
import RegistrationStatuses from "@/features/admin/components/Registration-Statuses";
import { useAdminStats } from "@/hooks/useAdminStats";
import YearlyProgress from "@/features/admin/components/Yearly-Progress";

// بيانات التقدم والبيانات الوهمية للدورات
const progressData = [
  { label: "جاري التقدم", color: "#f472b6", value: 10 },
  { label: "مكتمل", color: "#8b5cf6", value: 5 },
  { label: "مسجل", color: "#3b82f6", value: 20 },
];

const recentCourses = [
  { id: 1, name: "Nodejs", enrolled: 1, status: "منشورة", image: "" },
  { id: 2, name: "إتقان ...", enrolled: 1, status: "منشورة", image: "" },
];

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
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center">
          <CoursesProgressCard data={progressData} />
        </Card>
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center">
          <RecentlyCreatedCoursesCard courses={recentCourses} />
        </Card>
      </div>

      {/* الصف الرابع: سجل المدفوعات */}
      <div className="w-full">
        <PaymentHistory />
      </div>
    </div>
  );
}
