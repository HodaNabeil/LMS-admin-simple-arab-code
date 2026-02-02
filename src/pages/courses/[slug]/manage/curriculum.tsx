import AddSection from "@/features/courses/manage/curriculum/components/AddSection";
import SectionContent from "@/features/courses/manage/curriculum/components/SectionContent";
import { useSections } from "@/features/courses/manage/curriculum/hooks/useCurriculumQueries";
import { Skeleton } from "@/components/ui/skeleton";

export default function Curriculum() {
  const { data: sectionResponse, isPending, isError } = useSections();
  const sections = sectionResponse?.data?.sections || [];
  if (isError) return null


  return (
    <div className=" flex flex-col items-center  min-h-[calc(100vh-200px)] bg-gray-50 p-8 ">
      <h2 className="text-xl font-bold mb-8 text-[#3c45aa] self-start text-right w-full max-w-3xl mx-auto">
        مقرر الدورة
      </h2>
      <main className=" p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
        <AddSection />
        <div className="mt-6 space-y-4 ">
          {isPending ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))
          ) : sections.length > 0 ? (
            sections.map((section) => (
              <SectionContent key={section.id} section={section} />
            ))
          ) : (
            <div className="text-center py-10 text-gray-500">
              لا يوجد أقسام مضافة بعد. ابدأ بإضافة قسم جديد.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
