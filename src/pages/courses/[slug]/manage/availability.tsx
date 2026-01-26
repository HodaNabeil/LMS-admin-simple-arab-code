import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import AvailabilityForm from "@/features/courses/manage/components/availability/AvailabilityForm";
import { useParams } from "react-router-dom";

export default function Availability() {
  const { slug } = useParams<{ slug: string }>();
  const { data: courseResponse, isPending, error, isError } = useCourse(slug as string);


  if (isPending) return <div><Loader /></div>;
  if (isError && error) return <div>{error.message}</div>;

  return !isPending && courseResponse && (
    <main>
      <AvailabilityForm status={courseResponse?.data?.course.status}
        visibility={courseResponse?.data?.course.visibility}
      />
    </main>
  );
}
