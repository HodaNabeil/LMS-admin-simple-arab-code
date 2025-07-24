import { DataTable } from "@/components/ui/data-table";
import type { ColumnDef } from "@tanstack/react-table";

// Mock data for most watched lessons
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

const columns: ColumnDef<LessonAnalytics>[] = [
  {
    accessorKey: "name",
    header: "اسم الدرس",
    cell: ({ row }) => (
      <span className="font-semibold text-blue-700">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "course",
    header: "اسم الكورس",
    cell: ({ row }) => (
      <span className="text-gray-700">{row.getValue("course")}</span>
    ),
  },
  {
    accessorKey: "instructor",
    header: "المدرب",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.getValue("instructor")}</span>
    ),
  },
  {
    accessorKey: "views",
    header: "عدد المشاهدات",
    cell: ({ row }) => (
      <span className="font-bold text-green-700">{row.getValue("views")}</span>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "duration",
    header: "المدة",
    cell: ({ row }) => (
      <span className="text-xs text-gray-500">{row.getValue("duration")}</span>
    ),
    enableSorting: false,
  },
];

export default function MostWatchedLessons() {
  return (
    <div className="w-full mx-auto py-8 px-2">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">الدروس الأكثر مشاهدة</h2>
      <DataTable columns={columns} data={lessons} />
    </div>
  );
}
