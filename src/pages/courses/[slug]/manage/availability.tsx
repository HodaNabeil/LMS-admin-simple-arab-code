import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import AvailabilityForm from "@/features/courses/manage/components/availability/AvailabilityForm";
import { useParams } from "react-router-dom";

export default function Availability() {
  const { slug } = useParams();
  const { data: courseResponse, isLoading } = useCourse(slug as string);

  const course = courseResponse?.data?.course;

  if (isLoading) return <div><Loader /></div>;

  return (
    <main>
      <AvailabilityForm course={course} />
    </main>
  );
}
