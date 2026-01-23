import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import GoalsForm from "@/features/courses/manage/components/goals/GoalsForm";
import { useParams } from "react-router-dom";

export default function Goals() {
  const { slug } = useParams<{ slug: string }>();
  const { data: course, isPending, error, isError } = useCourse(slug);

  if (isPending) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (isError && error) {
    return <div>{error.message}</div>;
  }
  return (
    !isPending &&
    course && (
      <main>
        <h4 className="text-2xl font-extrabold text-blue-800 mb-8">الأهداف</h4>
        <GoalsForm
          objectives={course.data.course.objectives}
          courseRequirements={course.data.course.requirements}
          targetAudience={course.data.course.targetAudience}
          pathId={course.data.course.pathId}
          courseId={course.data.course.id}
        />
      </main>
    )
  );
}
