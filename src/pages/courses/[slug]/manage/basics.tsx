import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import BasicsForm from "@/features/courses/manage/components/basics/BasicsForm";
import { useParams } from "react-router-dom";

export default function Basics() {
  const { slug } = useParams<{ slug: string }>();
  const { data: courseResponse, isPending, error, isError } = useCourse(slug as string);


  if (isPending) return <div><Loader /></div>;
  if (isError && error) return <div>{error.message}</div>;
  return !isPending && courseResponse ? (
    <main>
      <BasicsForm
        name={courseResponse?.data.course.title}
        slug={courseResponse?.data.course.slug}
        hours={courseResponse?.data.course.duration ?? 0}
        description={courseResponse?.data.course.description}
        level={courseResponse?.data.course.level}
        thumbnailUrl={courseResponse?.data.course.thumbnailUrl || null || undefined}
        previewVideo={courseResponse?.data.course.previewVideo || null || undefined}
      />
    </main>
  ) : null;
}
