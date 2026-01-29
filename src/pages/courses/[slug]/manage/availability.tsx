import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import AvailabilityForm from "@/features/courses/manage/availability/AvailabilityForm";
import { useParams } from "react-router-dom";

export default function Availability() {
  const { slug } = useParams<{ slug: string }>();
  const { data: courseResponse, isPending, error, isError } = useCourse(slug as string);


  if (isPending) return <div className="flex justify-center py-10"><Loader /></div>;
  if (isError && error) return <div className="text-center text-red-600 py-6">{error.message}</div>;

  return !isPending && courseResponse && (
    <main>
      <AvailabilityForm status={courseResponse?.data?.course.status}
        visibility={courseResponse?.data?.course.visibility}
      />
    </main>
  );
}
