import AverageProgressCourse from "@/features/analytics/statistics/AverageProgressCourse";
import MostWatchedLessons from "../../features/analytics/statistics/MostWatchedLessons";
import MostActiveUsersChart from "@/features/analytics/statistics/components/MostActiveUsersChart";
import GeneralStats from "@/features/analytics/statistics/components/GeneralStats";

export default function Statistics() {
  return (
    <>
      <section id="statistics" className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-500">إحصائيات عامة</h2>
        <GeneralStats />
        <div className="w-full h-full rounded-lg p-4 mt-4">
          {/* <NewUsersAnalytics /> */}
          <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
            <h2 className="text-lg font-bold text-gray-500">
              أكثر المستخدمين نشاطًا
            </h2>
            <MostActiveUsersChart />
          </div>
        </div>
      </section>

      <section id="courses" className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-500">
          أكثر الدورات تسجيلاً
        </h2>
        {/* <TopEnrolledCoursesChart /> */}

        <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
          <AverageProgressCourse />
        </div>

        <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
          <h2 className="text-lg font-bold text-gray-500">
            الدروس الأكثر مشاهدة
          </h2>
          <MostWatchedLessons />
        </div>
        <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
          <h2 className="text-lg font-bold text-gray-500">
            المستخدمون النشطون يوميًا
          </h2>
          {/* <DailyActiveUsers /> */}
        </div>
        <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
          <h2 className="text-lg font-bold text-gray-500">
            أكثر الدورات تسجيلاً
          </h2>
          {/* <TopCoursesBarChart /> */}
        </div>
      </section>
    </>
  );
}
