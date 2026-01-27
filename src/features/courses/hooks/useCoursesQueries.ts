import { useQuery } from "@tanstack/react-query";
import { coursesKeys, couponsKeys } from "@/lib/query-keys";
import { coursesApi } from "../services/coursesApi";
import type {
  GetCoursesResponse,
  GetCourseResponse,
  CourseFilters,
  GetCoursesByPathParams,
  CouponsResponse,
} from "@/types/course";

export function useCoupons() {
  return useQuery<CouponsResponse>({
    queryKey: couponsKeys.lists(),
    queryFn: async (): Promise<CouponsResponse> => {
      return await coursesApi.getAllCoupons();
    },
  });
}

export function useCourses(filters?: CourseFilters) {
  return useQuery<GetCoursesResponse>({
    queryKey: coursesKeys.list(filters),
    queryFn: async (): Promise<GetCoursesResponse> => {
      return await coursesApi.getAllCourses(filters);
    },
  });
}

export function useCoursesByPath(params: GetCoursesByPathParams) {
  return useQuery<GetCoursesResponse>({
    queryKey: coursesKeys.byPath(params as Record<string, unknown>),
    queryFn: async (): Promise<GetCoursesResponse> => {
      return await coursesApi.getCoursesByPath(params);
    },
    enabled: !!params.pathId,
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
