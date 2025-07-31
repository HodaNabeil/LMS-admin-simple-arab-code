import AverageProgressCourse from "@/features/analytics/statistics/components/AverageProgressCourse";
import MostWatchedLessons from "../../features/analytics/statistics/components/MostWatchedLessons";
import MostActiveUsersChart from "@/features/analytics/statistics/components/MostActiveUsersChart";
import GeneralStats from "@/features/analytics/statistics/components/GeneralStats";
import NewUsers from "@/features/analytics/statistics/components/NewUsers";
import MostJoinedCourses from "@/features/analytics/statistics/components/MostJoinedCourses";
import DailyActiveUsers from "@/features/analytics/statistics/DailyActiveUsers";
import TopFifthCourses from "@/features/analytics/statistics/TopCoursesBarChart";

export default function Statistics() {
  return (
    <div className="space-y-8 p-6">
      {/* إحصائيات المستخدم */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-500 pb-2">
          إحصائيات المستخدم
        </h2>

        <GeneralStats />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-Statistics">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">
              المستخدم الأكثر نشاطاً في الشهر
            </h3>
            <div className="h-80">
              <MostActiveUsersChart />
            </div>
          </div>

          <div className="card-Statistics">
            <h3 className="text-lg font-semibold text-gray-500 mb-4">
              المستخدمين الجدد
            </h3>
            <div className="h-80">
              <NewUsers />
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات الدورات */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-500 pb-2">
          إحصائيات الدورات
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-Statistics">
            <h3 className="text-lg font-semibold text-gray-500  mb-4">
              الدورات الأكثر انضماماً
            </h3>
            <div className="h-80">
              <MostJoinedCourses />
            </div>
          </div>

          <div className="card-Statistics">
            <h3 className="text-lg font-semibold text-gray-500  mb-4">
              متوسط التقدم لكل دورة
            </h3>
            <div className="h-80">
              <AverageProgressCourse />
            </div>
          </div>
        </div>

        <div className="card-Statistics">
          <MostWatchedLessons />
        </div>
      </section>

      {/*  احصائيات عامة*/}
      <section>
        <h2 className="text-2xl font-bold text-gray-500 pb-2 my-[2rem]">
          احصائيات عامة
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card-Statistics">
            <DailyActiveUsers />
          </div>
          <div className="card-Statistics">
            <TopFifthCourses />
          </div>
        </div>
      </section>
    </div>
  );
}
