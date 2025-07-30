import AverageProgressCourse from "@/features/analytics/statistics/AverageProgressCourse";
import MostWatchedLessons from "../../features/analytics/statistics/MostWatchedLessons";
import MostActiveUsersChart from "@/features/analytics/statistics/components/MostActiveUsersChart";
import GeneralStats from "@/features/analytics/statistics/components/GeneralStats";
import NewUsers from "@/features/analytics/statistics/components/NewUsers";
import MostJoinedCourses from "@/features/analytics/statistics/components/MostJoinedCourses";

export default function Statistics() {
  return (
    <>
      <section className="p-4 ">
        <h2 className="text-xl font-bold mb-4 text-gray-500">
          احصائيات المستخدم
        </h2>
        <GeneralStats />

        <div className=" grid md:grid-cols-2 p-2 my-5 gap-4">
          <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
            <h2 className="text-lg font-bold text-gray-500">
              المستخدم الاكثر نشاطا في الشهر
            </h2>
            <MostActiveUsersChart />
          </div>
          <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
            <h2 className="text-lg font-bold text-gray-500">
              المستخدمين الجدد
            </h2>
            <NewUsers />
          </div>
        </div>
      </section>

      <section id="courses" className="p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-500">
          احصائيات الدورة
        </h2>
        <div className="flex flex-col gap-4 mt-4 w-full h-full p-4 text-xl font-bold text-gray-500">
          <h2 className="text-lg font-bold text-gray-500">
            الدورات الاكثر انضماما
          </h2>
          <MostJoinedCourses />
        </div>
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
