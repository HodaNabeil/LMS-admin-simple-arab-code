import UserStatistics from "@/features/analytics/statistics/components/user-statistics/UserStatistics";
import CourseStatistics from "@/features/analytics/statistics/components/course-statistics/CourseStatistics";
import GeneralStatistics from "@/features/analytics/statistics/components/general-statistics/GeneralStatistics";

export default function Statistics() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <UserStatistics />
      <CourseStatistics />
      <GeneralStatistics />

    </div>
  );
}
