import { useQuery } from "@tanstack/react-query";
import { coursesKeys } from "@/lib/query-keys";
import { coursesApi } from "../services/coursesApi";
import type { GetCoursesResponse, GetCourseResponse } from "@/types/course";

export function useCourses() {
  return useQuery<GetCoursesResponse>({
    queryKey: coursesKeys.all,
    queryFn: async (): Promise<GetCoursesResponse> => {
      return await coursesApi.getAllCourses();
    },
  });
}

export function useCourse(slug: string | undefined) {
  return useQuery<GetCourseResponse>({
    queryKey: coursesKeys.detail(slug || ""),
    queryFn: async (): Promise<GetCourseResponse> => {
      if (!slug) throw new Error("Slug is required");
      return await coursesApi.getCourse(slug);
    },
    enabled: !!slug,
  });
}
