import AverageProgressCourse from "@/features/analytics/statistics/components/AverageProgressCourse";
import MostWatchedLessons from "../../features/analytics/statistics/components/MostWatchedLessons";
import MostActiveUsersChart from "@/features/analytics/statistics/components/MostActiveUsersChart";
import GeneralStats from "@/features/analytics/statistics/components/GeneralStats";
import NewUsers from "@/features/analytics/statistics/components/NewUsers";
import MostJoinedCourses from "@/features/analytics/statistics/components/MostJoinedCourses";
import DailyActiveUsers from "@/features/analytics/statistics/components/DailyActiveUsers";
import TopFifthCourses from "@/features/analytics/statistics/components/TopCoursesBarChart";

export default function Statistics() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* إحصائيات المستخدم */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-700 pb-2 border-b-2 border-blue-100">
          إحصائيات المستخدم
        </h2>

        <GeneralStats />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <MostActiveUsersChart />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-slate-600 mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              المستخدمين الجدد
            </h3>
            <div>
              <NewUsers />
            </div>
          </div>
        </div>
      </section>

      {/* إحصائيات الدورات */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-700 pb-2 border-b-2 border-purple-100">
          إحصائيات الدورات
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <MostJoinedCourses />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <AverageProgressCourse />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <MostWatchedLessons />
        </div>
      </section>

      {/*  احصائيات عامة*/}
      <section>
        <h2 className="text-2xl font-bold text-slate-700 pb-2 my-[2rem] border-b-2 border-indigo-100">
          احصائيات عامة
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <DailyActiveUsers />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <TopFifthCourses />
          </div>
        </div>
      </section>
    </div>
  );
}
