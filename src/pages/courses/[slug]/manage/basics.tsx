import { Loader } from "@/components/shared/loader";
import { useCourse } from "@/features/courses/hooks/useCoursesQueries";
import BasicsForm from "@/features/courses/manage/basics/components/BasicsForm";
import { useParams } from "react-router-dom";

export default function Basics() {
  const { slug } = useParams<{ slug: string }>();
  const { data: courseResponse, isPending, error, isError } = useCourse(slug as string);


  if (isPending) return <div className="style-loader "><Loader /></div>;
  if (isError && error) return <div>{error.message}</div>;
  return !isPending && courseResponse ? (
    <main>
      <BasicsForm
        title={courseResponse?.data.course.title}
        slug={courseResponse?.data.course.slug}
        hours={courseResponse?.data.course.hours ?? 0}
        description={courseResponse?.data.course.description}
        level={courseResponse?.data.course.level}
        thumbnail={courseResponse?.data.course.thumbnailUrl ?? null}
        previewVideo={courseResponse?.data.course.previewVideo ?? null}
        shortDescription={courseResponse?.data.course.shortDescription}
      />
    </main>
  ) : null;
}
