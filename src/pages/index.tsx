import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Users, BookOpen, DollarSign } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentHistory from "@/components/PaymentHistory";
import { useAnnualRevenue } from "@/hooks/useAnnualRevenue";

// مكون مخطط خطي بسيط (مؤقت)
function SalesLineChart({ data }: { data: number[] }) {
  // رسم المخطط بناءً على البيانات القادمة من الـ API
  // مثال: تحويل البيانات إلى نقاط polyline
  const points = data.map((v, i) => `${i * 40},${100 - v}`).join(" ");
  return (
    <div className="w-full h-40 flex items-end">
      <svg width="100%" height="100%" viewBox="0 0 300 100">
        <polyline
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          points={points}
        />
      </svg>
    </div>
  );
}

// بيانات إحصائيات ديناميكية (مثال)
const stats = [
  {
    label: "إجمالي الطلاب",
    value: 0,
    icon: <Users className="w-6 h-6" />,
    change: 0,
    sub: "٪0 زيادة خلال الشهر الماضي",
    bg: "from-[#dbeafe] to-[#93c5fd]",
    iconBg: "bg-[#3b82f6] text-white",
  },
  {
    label: "إجمالي المسجلين في الدورات",
    value: 2,
    icon: <BookOpen className="w-6 h-6" />,
    change: 0,
    sub: "٪0 زيادة خلال الشهر الماضي",
    bg: "from-[#fce7f3] to-[#f9a8d4]",
    iconBg: "bg-[#ec4899] text-white",
  },
  {
    label: "إجمالي الإيرادات",
    value: 0,
    icon: <DollarSign className="w-6 h-6" />,
    change: 0,
    sub: "٪0 زيادة خلال الشهر الماضي",
    bg: "from-[#dcfce7] to-[#bbf7d0]",
    iconBg: "bg-[#22c55e] text-white",
  },
  {
    label: "أرباح المنصة",
    value: 0,
    icon: <DollarSign className="w-6 h-6" />,
    change: 0,
    sub: "+10% منذ آخر شهر",
    bg: "from-[#8b5cf6] to-[#6d28d9] text-white",
    iconBg: "bg-white/10 text-white",
  },
];

const progressData = [
  { label: "جاري التقدم", color: "#f472b6", value: 10 },
  { label: "مكتمل", color: "#8b5cf6", value: 5 },
  { label: "مسجل", color: "#3b82f6", value: 20 },
];

function CoursesProgressCard({
  data,
}: {
  data: { label: string; color: string; value: number }[];
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <div className="text-base font-bold text-gray-800 mb-8 text-center">
          متوسط تقدم الدورات
        </div>
      </div>
      {/* Doughnut Chart */}
      <PieChart width={120} height={120}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          cx="50%"
          cy="50%"
          innerRadius={38}
          outerRadius={55}
          paddingAngle={2}
        >
          {data.map(
            (
              entry: { label: string; color: string; value: number },
              idx: number
            ) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            )
          )}
        </Pie>
      </PieChart>
      {/* Legend */}
      <div className="flex gap-8 items-end justify-center w-full mt-4">
        {data.map(
          (
            item: { label: string; color: string; value: number },
            idx: number
          ) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <span
                className="inline-block w-8 h-3 rounded"
                style={{
                  background: item.color,
                  border: `1px solid ${item.color}`,
                }}
              ></span>
              <span className="text-sm text-gray-500 mt-1">{item.label}</span>
              <span className="text-xs text-gray-400">{item.value}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

// مكون جدول الدورات التي تم إنشاؤها مؤخرًا
interface Course {
  id: string | number;
  name: string;
  image?: string;
  enrolled: number;
  status: string;
}

function RecentlyCreatedCoursesCard({ courses }: { courses: Course[] }) {
  return (
    <div className="w-full flex flex-col items-center">
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

// مثال بيانات وهمية (يمكن استبدالها ببيانات API)
const recentCourses = [
  { id: 1, name: "Nodejs", enrolled: 1, status: "منشورة", image: "" },
  { id: 2, name: "إتقان ...", enrolled: 1, status: "منشورة", image: "" },
];

export default function Admin() {
  const { data, isLoading, error } = useAnnualRevenue();
  return (
    <div
      dir="rtl"
      className="flex flex-col min-h-screen bg-[#f8fafc] font-cairo p-4 gap-6"
    >
      {/* الصف الأول: 3 بطاقات إحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.slice(0, 3).map((stat, idx) => (
          <Card
            key={idx}
            className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-gray-800">
                {stat.label}
              </div>
              <div
                className={`w-12 h-12 ${stat.iconBg} rounded-full flex items-center justify-center shadow-lg`}
              >
                {stat.icon}
              </div>
            </div>
            <div className="text-4xl font-black text-gray-800">
              {stat.value}
            </div>
            <div className="text-sm opacity-75 mt-2 text-gray-600">
              {stat.sub}
            </div>
          </Card>
        ))}
      </div>
      {/* الصف الثاني: رسم بياني كبير بعرض كامل */}
      <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-gray-800">
            تقدم الإيرادات السنوي
          </CardTitle>
          <CardDescription className="text-green-500">+0.00%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ في جلب البيانات</span>
            ) : (
              <SalesLineChart data={data?.values || [0, 0, 0, 0, 0, 0, 0, 0]} />
            )}
          </div>
        </CardContent>
      </Card>
      {/* الصف الثالث: متوسط تقدم الدورات + الدورات المنشأة مؤخرًا */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center">
          <CoursesProgressCard data={progressData} />
        </Card>
        <Card className="rounded-lg bg-white text-gray-800 shadow-md p-6 border-0 flex flex-col items-center justify-center">
          <RecentlyCreatedCoursesCard courses={recentCourses} />
        </Card>
      </div>
      {/* الصف الرابع: سجل المدفوعات بعرض كامل */}
      <div className="w-full">
        <PaymentHistory />
      </div>
    </div>
  );
}
