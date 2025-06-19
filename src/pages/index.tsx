import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Overview } from "@/features/admin/components/overview";
import { RecentSales } from "@/features/admin/components/recent-sales";
import { Search } from "@/features/admin/components/search";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiCheckSquare } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
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
// import { Label, Pie, PieChart, Cell } from "recharts";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { UserNav } from "@/pages/Dashboard/components/user-nav";
// import { CalendarDateRangePicker } from "@/components/ui/calendar-date-range-picker";

// مكون مخطط خطي بسيط (مؤقت)
function SalesLineChart() {
  return (
    <div className="w-full h-40 flex items-end">
      <svg width="100%" height="100%" viewBox="0 0 300 100">
        <polyline
          fill="none"
          stroke="#22d3ee"
          strokeWidth="3"
          points="0,80 40,60 80,70 120,40 160,60 200,50 240,60 280,55"
        />
        <polyline
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          points="0,90 40,80 80,85 120,60 160,80 200,70 240,80 280,75"
        />
      </svg>
    </div>
  );
}

// مكون مخطط أعمدة بسيط (مؤقت)
function VisitorsBarChart() {
  return (
    <div className="w-full h-32 flex items-end">
      <svg width="100%" height="100%" viewBox="0 0 300 80">
        {[30, 60, 40, 70, 50, 65, 55, 60, 40, 70, 50, 65, 55, 60].map(
          (h, i) => (
            <rect
              key={i}
              x={i * 20 + 10}
              y={80 - h}
              width="10"
              height={h}
              fill={i % 2 === 0 ? "#e879f9" : "#6366f1"}
              rx="3"
            />
          )
        )}
      </svg>
    </div>
  );
}

// بيانات باقات الاشتراك
const subscriptionData = [
  {
    name: "الباقة الأساسية",
    value: 410,
    percentage: 26,
    fill: "#c084fc",
  },
  {
    name: "باقة النمو",
    value: 134,
    percentage: 11,
    fill: "#67e8f9",
  },
  {
    name: "الباقة الاحترافية",
    value: 765,
    percentage: 39,
    fill: "#a5b4fc",
  },
  {
    name: "باقة التميز",
    value: 338,
    percentage: 24,
    fill: "#4fd1c7",
  },
];

// const chartConfig = {
//   basic: {
//     label: "الباقة الأساسية",
//     color: "#c084fc"
//   },
//   growth: {
//     label: "باقة النمو",
//     color: "#67e8f9"
//   },
//   professional: {
//     label: "الباقة الاحترافية",
//     color: "#a5b4fc"
//   },
//   premium: {
//     label: "باقة التميز",
//     color: "#4fd1c7"
//   }
// };

// مكون مخطط دائري احترافي للاشتراكات
function SubscriptionPieChart() {
  return (
    <div className="w-[320px] h-[320px] mx-auto relative">
      <svg
        width="320"
        height="320"
        viewBox="0 0 320 320"
        className="filter drop-shadow-2xl"
      >
        <defs>
          {/* تدرجات احترافية */}
          <linearGradient
            id="premiumGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4fd1c7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          <linearGradient
            id="basicGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>

          <linearGradient id="proGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>

          <linearGradient
            id="growthGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>

          {/* ظلال ثلاثية الأبعاد */}
          <filter id="innerShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feOffset dx="2" dy="2" result="offset" />
            <feFlood floodColor="#000000" floodOpacity="0.1" />
            <feComposite in2="offset" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.8" />
          </filter>
        </defs>

        <g transform="translate(160, 160)">
          {/* باقة التميز - 24% - أخضر متدرج */}
          <path
            d="M 0,0 L 0,-120 A 120,120 0 0,1 103.9,-60 Z"
            fill="url(#premiumGradient)"
            filter="url(#innerShadow)"
            className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />

          {/* الباقة الأساسية - 26% - بنفسجي متدرج */}
          <path
            d="M 0,0 L 103.9,-60 A 120,120 0 0,1 120,0 Z"
            fill="url(#basicGradient)"
            filter="url(#innerShadow)"
            className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />

          {/* الباقة الاحترافية - 39% - أزرق متدرج */}
          <path
            d="M 0,0 L 120,0 A 120,120 0 0,1 -72,96 Z"
            fill="url(#proGradient)"
            filter="url(#innerShadow)"
            className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />

          {/* باقة النمو - 11% - فيروزي متدرج */}
          <path
            d="M 0,0 L -72,96 A 120,120 0 0,1 0,-120 Z"
            fill="url(#growthGradient)"
            filter="url(#innerShadow)"
            className="hover:scale-105 transition-transform duration-300 cursor-pointer"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />

          {/* النسب المئوية مع تحسينات بصرية */}
          <text
            x="52"
            y="-72"
            fill="white"
            fontSize="22"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="central"
            filter="url(#textShadow)"
            className="font-cairo"
          >
            24%
          </text>

          <text
            x="102"
            y="-30"
            fill="white"
            fontSize="22"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="central"
            filter="url(#textShadow)"
            className="font-cairo"
          >
            26%
          </text>

          <text
            x="36"
            y="72"
            fill="white"
            fontSize="22"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="central"
            filter="url(#textShadow)"
            className="font-cairo"
          >
            39%
          </text>

          <text
            x="-36"
            y="-12"
            fill="white"
            fontSize="22"
            fontWeight="900"
            textAnchor="middle"
            dominantBaseline="central"
            filter="url(#textShadow)"
            className="font-cairo"
          >
            11%
          </text>
        </g>
      </svg>

      {/* مؤشرات تفاعلية للأجزاء */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-8 right-16 w-3 h-3 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full shadow-lg animate-pulse"></div>
        <div className="absolute top-16 right-4 w-3 h-3 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg animate-pulse delay-300"></div>
        <div className="absolute bottom-8 right-8 w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-4 w-3 h-3 bg-gradient-to-r from-cyan-300 to-teal-400 rounded-full shadow-lg animate-pulse delay-700"></div>
      </div>
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

const paymentData = [
  {
    id: "INV-001",
    date: "2024-06-01",
    amount: "$120.00",
    method: "Credit Card",
    status: "Paid",
  },
  // ... بيانات أخرى
];

export default function Admin() {
  useEffect(() => {
    document.body.style.fontFamily = "Cairo, sans-serif";
  }, []);

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
            <SalesLineChart />
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
