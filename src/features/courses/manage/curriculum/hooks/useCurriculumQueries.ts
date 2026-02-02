import { useQuery } from "@tanstack/react-query";
import { curriculumKeys } from "@/lib/query-keys";
import { curriculumApi } from "@/features/courses/services/curriculumApi";
import { useParams } from "react-router-dom";

export function useSections() {
  const { slug } = useParams<{ slug: string }>();
  const courseSlug = slug as string;

  return useQuery({
    queryKey: curriculumKeys.sections(courseSlug),
    queryFn: () => curriculumApi.getAllSections(courseSlug),
    enabled: !!courseSlug,
  });
}
