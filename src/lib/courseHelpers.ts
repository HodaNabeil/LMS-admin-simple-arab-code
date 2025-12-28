import type { Course } from "@/types/course";

export const searchCourses = (
  courses: Course[],
  searchTerm: string
): Course[] => {
  if (!searchTerm.trim()) return courses;

  const lowerSearchTerm = searchTerm.toLowerCase();
  return courses.filter(
    (course) =>
      course.name.toLowerCase().includes(lowerSearchTerm) ||
      course.instructor.toLowerCase().includes(lowerSearchTerm)
  );
};

export const filterCoursesByCategory = (
  courses: Course[],
  category: string
): Course[] => {
  if (category === "الكل") return courses;
  return courses.filter((course) => course.category === category);
};

export const filterCoursesByLevel = (
  courses: Course[],
  level: string
): Course[] => {
  if (level === "الكل") return courses;
  return courses.filter((course) => course.level === level);
};

export const filterCoursesByType = (
  courses: Course[],
  type: string
): Course[] => {
  if (type === "الكل") return courses;
  return courses.filter((course) => course.type === type);
};

export const filterCoursesByPrice = (
  courses: Course[],
  minPrice: number
): Course[] => {
  if (minPrice === 0) return courses;
  if (minPrice === -1) return courses.filter((course) => course.price === 0);
  return courses.filter((course) => course.price >= minPrice);
};
