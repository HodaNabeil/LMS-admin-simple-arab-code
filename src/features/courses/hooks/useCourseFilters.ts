import type { Course, CourseFilters } from "@/types/course";
import { useState, useMemo, useCallback } from "react";
import { DEFAULT_FILTERS } from "../components/courses";

export const useCourseFilters = (courses: Course[]) => {
  const [filters, setFilters] = useState<CourseFilters>(DEFAULT_FILTERS);

  const updateFilter = useCallback(
    <K extends keyof CourseFilters>(key: K, value: CourseFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        course.instructor
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      const matchesCategory =
        filters.selectedCategory === "الكل" ||
        course.category === filters.selectedCategory;

      const matchesLevel =
        filters.selectedLevel === "الكل" ||
        course.level === filters.selectedLevel;

      const matchesType =
        filters.selectedType === "الكل" || course.type === filters.selectedType;

      const matchesPrice =
        filters.minPrice === 0 ||
        (filters.minPrice === -1 && course.price === 0) ||
        (filters.minPrice > 0 && course.price >= filters.minPrice);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLevel &&
        matchesType &&
        matchesPrice
      );
    });
  }, [courses, filters]);

  return {
    filters,
    filteredCourses,
    updateFilter,
    clearFilters,
  };
};
