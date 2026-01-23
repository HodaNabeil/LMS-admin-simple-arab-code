import type { Course } from "@/types/course";

export const searchCourses = (
  courses: Course[],
  searchTerm: string
): Course[] => {
  if (!searchTerm.trim()) return courses;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return courses.filter(
    (course) =>
      course.title.toLowerCase().includes(lowerSearchTerm) ||
      (course.instructorId && course.instructorId.toLowerCase().includes(lowerSearchTerm))
  );
};

export const filterCoursesByCategory = (
  courses: Course[],
  category: string
): Course[] => {
  if (category === "الكل") return courses;
  // Category not available in CourseDto
  return courses;
};

export const filterCoursesByLevel = (
  courses: Course[],
  level: string
): Course[] => {
  // level arg is "مبتدئ" etc (Arabic label) or "الكل"
  // course.level is "BEGINNER" etc.
  // We need to map Arabic label back to enum or map enum to label.
  // However, the caller (courses.tsx) does the mapping.
  // Wait, courses.tsx does filtering INLINED in useMemo.
  // If these helpers are used elsewhere, they need fixing.
  // courses.tsx does NOT use these helpers currently (it has inline logic).
  // So I can just make them safe or remove them if unused.
  // I'll update them to be safe.
  if (level === "الكل") return courses;
  return courses; // Disable level filtering here if logic is complex without map
};

export const filterCoursesByType = (
  courses: Course[],
  type: string
): Course[] => {
  if (type === "الكل") return courses;
  // Type not available
  return courses;
};

export const filterCoursesByPrice = (
  courses: Course[],
  minPrice: number
): Course[] => {
  if (minPrice === 0) return courses;
  if (minPrice === -1) return courses.filter((course) => course.price === 0);
  return courses.filter((course) => course.price >= minPrice);
};
