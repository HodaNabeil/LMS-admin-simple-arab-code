import { StatsCard } from "@/components/shared/StatsCard";
import NewUsersAnalytics from "@/features/analytics/statistics/Newusers";
import { User, UserCheck, UserPlus } from "lucide-react";
import BarChart from "@/components/shared/BarChart";
import TopEnrolledCoursesChart from "@/features/analytics/statistics/TopEnrolledCoursesChart";
import AverageProgressCourse from "@/features/analytics/statistics/AverageProgressCourse";
import MostWatchedLessons from "../../features/analytics/statistics/MostWatchedLessons";

const totalStudentsData = [
  { date: "2024-06-10", value: 100 },
  { date: "2024-06-11", value: 120 },
  { date: "2024-06-12", value: 130 },
  { date: "2024-06-13", value: 140 },
  { date: "2024-06-14", value: 150 },
  { date: "2024-06-15", value: 160 },
  { date: "2024-06-16", value: 170 },
];

const newSignupsData = [
  { date: "2024-06-10", value: 5 },
  { date: "2024-06-11", value: 8 },
  { date: "2024-06-12", value: 7 },
  { date: "2024-06-13", value: 10 },
  { date: "2024-06-14", value: 6 },
  { date: "2024-06-15", value: 9 },
  { date: "2024-06-16", value: 12 },
];

const activeStudentsData = [
  { date: "2024-06-10", value: 30 },
  { date: "2024-06-11", value: 35 },
  { date: "2024-06-12", value: 40 },
  { date: "2024-06-13", value: 38 },
  { date: "2024-06-14", value: 45 },
  { date: "2024-06-15", value: 50 },
  { date: "2024-06-16", value: 55 },
];
const data = [
  { user: "Ahmed", today: 10, week: 45 },
  { user: "Sara", today: 15, week: 70 },
  { user: "Omar", today: 5, week: 20 },
];

const topCourses = [
  { course: "الدورة الأولى", value: 10 },
  { course: "الدورة الثانية", value: 15 },
  { course: "الدورة الثالثة", value: 5 },
];

const topStudents = [
  { student: "Ahmed", value: 10 },
  { student: "Sara", value: 15 },
  { student: "Omar", value: 5 },
];

export default function Statistics() {

  const topUsers = [...data].sort((a, b) => b.today + b.week - (a.today + a.week)).slice(0, 5);

  return (
 


<>
<section id="statistics" className="p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-500">إحصائيات عامة</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <StatsCard
          title="إجمالي الطلاب"
          value={170}
          icon={<User className="w-5 h-5 text-blue-500" />}
          data={totalStudentsData}
        />
        <StatsCard
          title="التسجيلات الجديدة"
          value={12}
          icon={<UserPlus className="w-5 h-5 text-green-500" />}
          data={newSignupsData}
        />
        <StatsCard
          title="الطلاب النشطين (هذا الأسبوع)"
          value={55}
          icon={<UserCheck className="w-5 h-5 text-yellow-500" />}
          data={activeStudentsData}
        />
      </div>
      <div className="w-full h-full rounded-lg p-4 mt-4">
        <NewUsersAnalytics />
        <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
          <h2 className="text-lg font-bold text-gray-500">أكثر المستخدمين نشاطًا</h2>
          <BarChart data={topUsers}  />
        </div>
      </div>
    </section>

    <section id="courses" className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-500">أكثر الدورات تسجيلاً</h2>
      <TopEnrolledCoursesChart />

      <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
        <AverageProgressCourse />
      </div>

      <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
        <h2 className="text-lg font-bold text-gray-500">الدروس الأكثر مشاهدة</h2>
        <MostWatchedLessons />
      </div>

    </section>
    

</>
  );
}
