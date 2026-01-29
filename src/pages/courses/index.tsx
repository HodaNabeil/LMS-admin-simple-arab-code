import { buttonVariants } from '@/components/ui/button';
import CourseFilters from '@/features/courses/components/CourseFilters';
import CourseTable from '@/features/courses/components/table/CourseTable';
import { Plus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '@/features/courses/hooks/useCoursesQueries';
import { PageHeader } from '@/components/shared/PageHeader';
import { Loader } from '@/components/shared/loader';

const LEVEL_MAP: Record<string, string> = {
  BEGINNER: 'مبتدئ',
  INTERMEDIATE: 'متوسط',
  ADVANCED: 'متقدم',
};


export default function Courses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('الكل');
  const [minPrice, setMinPrice] = useState(0);

  const { data: coursesResponse, isLoading, error } = useCourses();
  const courses = useMemo(() => coursesResponse?.data?.courses || [], [coursesResponse]);


  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.slug.toLowerCase().includes(searchTerm.toLowerCase());
      // || course.instructor.toLowerCase().includes(searchTerm.toLowerCase()); // Instructor name not available yet

      const matchesLevel =
        selectedLevel === 'الكل' || LEVEL_MAP[course.level as string] === selectedLevel;

      const matchesPrice =
        minPrice === 0 ||
        (minPrice === -1 && course.price === 0) ||
        (minPrice > 0 && course.price >= minPrice);

      return (
        matchesSearch &&
        matchesLevel &&
        matchesPrice
      );
    });
  }, [courses, searchTerm, selectedLevel, minPrice]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedLevel('الكل');
    setMinPrice(0);
  };

  if (isLoading) return <div>

    <Loader />

  </div>;
  if (error) return <div>حدث خطأ أثناء تحميل الدورات</div>;

  return (
    <div className="space-y-6  p-3">
      <PageHeader
        title="الدورات التدريبية"
        icon={Users}
        badge={
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
            الدورات ({courses.length})
          </div>
        }
      >
        <Link to="/admin/courses/create" className={buttonVariants()}>
          <Plus className="w-4 h-4 mr-2" />
          إضافة دورة جديدة
        </Link>
      </PageHeader>
      {/* <CourseStats courses={filteredCourses} /> */}
      <CourseFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
        minPrice={minPrice}
        onMinPriceChange={setMinPrice}
        onClearFilters={handleClearFilters}
      />
      <CourseTable courses={filteredCourses} />
    </div>
  );
}
