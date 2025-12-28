
import CourseFilters from "@/features/courses/components/CourseFilters";
import CourseStats from "@/features/courses/components/CourseStats";
import CourseTable from "@/features/courses/components/table/CourseTable";
import Header from "../../features/courses/components/Header";
import { useCourseFilters } from "@/features/courses/hooks/useCourseFilters";
import { MOCK_COURSES } from "@/features/courses/components/courses";

const Courses = () => {
  const { filters, filteredCourses, updateFilter, clearFilters } =
    useCourseFilters(MOCK_COURSES);

  const courseFiltersProps = {
    searchTerm: filters.searchTerm,
    onSearchChange: (value: string) => updateFilter("searchTerm", value),
    selectedCategory: filters.selectedCategory,
    onCategoryChange: (value: string) =>
      updateFilter("selectedCategory", value),
    selectedLevel: filters.selectedLevel,
    onLevelChange: (value: string) => updateFilter("selectedLevel", value),
    selectedType: filters.selectedType,
    onTypeChange: (value: string) => updateFilter("selectedType", value),
    minPrice: filters.minPrice,
    onMinPriceChange: (value: number) => updateFilter("minPrice", value),
    onClearFilters: clearFilters,
  };

  return (
    <main className="space-y-6 p-3">
      <Header coursesCount={filteredCourses.length} />
      <CourseStats courses={filteredCourses} />
      <CourseFilters {...courseFiltersProps} />
      <CourseTable courses={filteredCourses} />
    </main>
  );
};

export default Courses;
