import { useQuery } from "@tanstack/react-query";
import { coursesKeys } from "@/lib/query-keys";
import { getAllCourses, getCoursesByPath, getCourse } from "../services/coursesApi";
import type {
  GetCoursesResponse,
  GetCourseResponse,
  CourseFilters,
  GetCoursesByPathParams,
} from "@/types/course";



export function useCourses(filters?: CourseFilters) {
  return useQuery<GetCoursesResponse>({
    queryKey: coursesKeys.list(filters),
    queryFn: async (): Promise<GetCoursesResponse> => {
      return await getAllCourses(filters);
    },
  });
}

export function useCoursesByPath(params: GetCoursesByPathParams) {
  return useQuery<GetCoursesResponse>({
    queryKey: coursesKeys.byPath(params as Record<string, unknown>),
    queryFn: async (): Promise<GetCoursesResponse> => {
      return await getCoursesByPath(params);
    },
    enabled: !!params.pathId,
  });
}

export function useCourse(slug: string | undefined) {
  return useQuery<GetCourseResponse>({
    queryKey: coursesKeys.detail(slug || ""),
    queryFn: async (): Promise<GetCourseResponse> => {
      if (!slug) throw new Error("Slug is required");
      return await getCourse(slug);
    },
    enabled: !!slug,
  });
}
