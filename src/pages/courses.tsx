import { buttonVariants } from '@/components/ui/button';
import CourseFilters from '@/features/courses/components/CourseFilters';
import CourseStats from '@/features/courses/components/CourseStats';
import CourseTable from '@/features/courses/components/table/CourseTable';
import { Plus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '@/features/courses/hooks/useCoursesQueries';

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
  const courses = coursesResponse?.data?.courses || [];

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase());
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

  if (isLoading) return <div>جاري التحميل...</div>;
  if (error) return <div>حدث خطأ أثناء تحميل الدورات</div>;

  return (
    <div className="space-y-6  p-3">
      <Header coursesCount={filteredCourses.length} />
      <CourseStats courses={filteredCourses} />
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

function Header({ coursesCount }: { coursesCount: number }) {
  return (
    <div className="flex flex-col sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 lg:gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-sm lg:text-base">
            الدورات التدريبية
          </span>
        </div>
        <div className="bg-linear-to-r from-blue-100 to-blue-200 text-blue-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-sm font-medium border border-blue-300 shadow-sm">
          الدورات ({coursesCount})
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link to="/admin/courses/create" className={buttonVariants()}>
          <Plus className="w-4 h-4 mr-2" />
          إضافة دورة جديدة
        </Link>
      </div>
    </div>
  );
}
