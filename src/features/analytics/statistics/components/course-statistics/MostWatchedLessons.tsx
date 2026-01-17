import LessonTable from "./LessonTable";

interface LessonAnalytics {
  id: string;
  name: string;
  course: string;
  instructor: string;
  views: number;
  duration: string;
}

const lessons: LessonAnalytics[] = [
  {
    id: "1",
    name: "مقدمة في البرمجة",
    course: "أساسيات البرمجة",
    instructor: "أحمد علي",
    views: 1200,
    duration: "12:30",
  },
  {
    id: "2",
    name: "المصفوفات",
    course: "أساسيات البرمجة",
    instructor: "سارة محمد",
    views: 950,
    duration: "09:45",
  },
  {
    id: "3",
    name: "الحلقات التكرارية",
    course: "أساسيات البرمجة",
    instructor: "أحمد علي",
    views: 870,
    duration: "15:10",
  },
  {
    id: "4",
    name: "المتغيرات والثوابت",
    course: "أساسيات البرمجة",
    instructor: "سارة محمد",
    views: 800,
    duration: "10:20",
  },
  {
    id: "5",
    name: "الدوال",
    course: "البرمجة المتقدمة",
    instructor: "خالد يوسف",
    views: 780,
    duration: "13:05",
  },
];
export default function MostWatchedLessons() {
  return (
    <div className="w-full h-full  mx-auto py-8 px-2">
      <h2 className="     flex items-center gap-1 text-2xl font-bold mb-6 text-gray-500">
        <div className="w-2 h-2 bg-teal-400 rounded-full mr-2"></div>
        <span> الدروس الأكثر مشاهدة</span>
      </h2>
      <LessonTable lessons={lessons} />
    </div>
  );
}
