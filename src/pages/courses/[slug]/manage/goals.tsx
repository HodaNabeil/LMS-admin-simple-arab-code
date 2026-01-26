import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import GoalsForm from "@/features/courses/manage/components/goals/GoalsForm";
import { useParams } from "react-router-dom";

export default function Goals() {
  const { slug } = useParams<{ slug: string }>();
  const { data: DataCourse, isPending, error, isError } = useCourse(slug);

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
  console.log(DataCourse, "DataCourse");
  return (
    !isPending &&
    DataCourse && (
      <main>
        <h4 className="text-2xl font-extrabold text-blue-800 mb-8">الأهداف</h4>
        <GoalsForm
          objectives={DataCourse.data.course.objectives}
          courseRequirements={DataCourse.data.course.requirements}
          targetAudience={DataCourse.data.course.targetAudience}
          pathId={DataCourse.data.course.pathId}
          courseId={DataCourse.data.course.id}
        />
      </main>
    )
  );
}
