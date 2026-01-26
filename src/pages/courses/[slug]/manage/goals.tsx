import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import GoalsForm from "@/features/courses/manage/components/goals/GoalsForm";
import { useParams } from "react-router-dom";

export default function Goals() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data,
    isPending,
    isError,
    error,
  } = useCourse(slug);


  if (isPending) {
    return (
      <div className="flex justify-center py-10">
        <Loader />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="text-center text-red-600 py-6">
        {error.message}
      </div>
    );
  }

  const course = data?.data?.course;

  if (!course) return null;

  return (
    <main>
      <h4 className="text-2xl font-extrabold text-blue-800 mb-8">
        الأهداف
      </h4>

      <GoalsForm
        objectives={course.objectives}
        courseRequirements={course.requirements}
        targetAudience={course.targetAudience}
        pathId={course.pathId}
        courseId={course.id}
        courseType={null as any}
        // TODO: fix this change api response
        prerequisiteIds={course.prerequisiteIds}
      />
    </main>
  );
}
