import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Course {
  id: string | number;
  name: string;
  image?: string;
  enrolled: number;
  status: string;
}

export function RecentlyCreatedCoursesCard({ courses }: { courses: Course[] }) {
  return (
    <div className="w-full flex flex-col items-center shadow-md rounded-lg border border-gray-200 bg-white p-4">
      <div className="pb-2 w-full">
        <div className="text-base font-bold text-gray-800 text-center">
          الدورات التي تم إنشاؤها مؤخرًا
        </div>
      </div>
      <div className="pt-0 w-full">
        <Table>
          <TableHeader>
            <TableRow className="text-gray-500 border-b">
              <TableHead className="font-semibold text-right">الدورة</TableHead>
              <TableHead className="font-semibold text-center">
                المسجلين
              </TableHead>
              <TableHead className="font-semibold text-center">
                الحالة
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow
                key={course.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <TableCell className="py-3 px-2 flex items-center gap-2">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-8 h-8 rounded object-cover border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-400">
                      ?
                    </div>
                  )}
                  <span className="font-medium text-gray-800">
                    {course.name}
                  </span>
                </TableCell>
                <TableCell className="py-3 px-2 text-center font-bold text-blue-600">
                  {course.enrolled}
                </TableCell>
                <TableCell className="py-3 px-2 text-center">
                  <span
                    className={`inline-block rounded px-2 py-1 text-xs font-semibold ${
                      course.status === "منشورة"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {course.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
