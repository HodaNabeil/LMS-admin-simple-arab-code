import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNav } from "@/pages/Dashboard/components/main-nav";
import { Overview } from "@/pages/Dashboard/components/overview";
import { RecentSales } from "@/pages/Dashboard/components/recent-sales";
import { Search } from "@/pages/Dashboard/components/search";
import TeamList from "./components/team-switcher";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FiUsers, FiFileText, FiCheckSquare } from "react-icons/fi";
import { MdOutlineAttachMoney } from "react-icons/md";
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
        {[30, 60, 40, 70, 50, 65, 55, 60, 40, 70, 50, 65, 55, 60].map((h, i) => (
          <rect key={i} x={i * 20 + 10} y={80 - h} width="10" height={h} fill={i % 2 === 0 ? '#e879f9' : '#6366f1'} rx="3" />
        ))}
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
    fill: "#c084fc"
  },
  {
    name: "باقة النمو", 
    value: 134,
    percentage: 11,
    fill: "#67e8f9"
  },
  {
    name: "الباقة الاحترافية",
    value: 765,
    percentage: 39,
    fill: "#a5b4fc"
  },
  {
    name: "باقة التميز",
    value: 338,
    percentage: 24,
    fill: "#4fd1c7"
  }
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
          <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4fd1c7" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          
          <linearGradient id="basicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          
          <linearGradient id="proGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a5b4fc" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          
          <linearGradient id="growthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
          
          {/* ظلال ثلاثية الأبعاد */}
          <filter id="innerShadow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
            <feOffset dx="2" dy="2" result="offset"/>
            <feFlood floodColor="#000000" floodOpacity="0.1"/>
            <feComposite in2="offset" operator="in"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="textShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.8"/>
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

export default function Admin() {
  useEffect(() => {
    document.body.style.fontFamily = 'Cairo, sans-serif';
  }, []);

  return (
    <div dir="rtl" className="hidden flex-col md:flex bg-[#f8fafc] min-h-screen font-cairo">
      {/* بطاقات الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 px-8">
        {/* المستخدمين */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-3xl bg-gradient-to-br from-[#dbeafe] to-[#93c5fd] shadow-xl p-8 relative overflow-hidden border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-[#1e3a8a]">المستخدمين</div>
              <div className="w-12 h-12 bg-[#3b82f6] rounded-full flex items-center justify-center shadow-lg">
                <FiUsers size={24} className="text-white" />
              </div>
            </div>
            <div className="text-4xl font-black text-[#1e3a8a]">14,390</div>
          </Card>
        </motion.div>

        {/* المحتوى */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-3xl bg-gradient-to-br from-[#fce7f3] to-[#f9a8d4] shadow-xl p-8 relative overflow-hidden border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-[#831843]">المحتوى</div>
              <div className="w-12 h-12 bg-[#ec4899] rounded-full flex items-center justify-center shadow-lg">
                <FiFileText size={24} className="text-white" />
              </div>
            </div>
            <div className="text-4xl font-black text-[#831843]">48,655</div>
          </Card>
        </motion.div>

        {/* المبيعات */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="rounded-3xl bg-gradient-to-br from-[#dcfce7] to-[#bbf7d0] shadow-xl p-8 relative overflow-hidden border-0">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-bold text-[#166534]">المبيعات</div>
              <div className="w-12 h-12 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg">
                <FiCheckSquare size={24} className="text-white" />
              </div>
            </div>
            <div className="text-4xl font-black text-[#166534]">4,993</div>
          </Card>
        </motion.div>

        {/* أرباح المنصة */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="rounded-3xl bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9] text-white shadow-xl p-8 relative overflow-hidden border-0">
            <div className="relative z-10">
              <div className="text-lg font-bold mb-3 opacity-90">أرباح المنصة</div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-black">70,600</span>
                <span className="text-lg font-medium">ر.س</span>
              </div>
              <div className="text-sm opacity-75">+10% منذ آخر شهر</div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          </Card>
        </motion.div>
      </div>
      {/* الشبكة الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-8">
        {/* مخطط المبيعات */}
        <Card className="col-span-2 border-0">
          <CardHeader className="flex flex-row items-start justify-between pb-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-sm font-bold">▲ +2.45%</span>
                <span className="text-muted-foreground text-sm">المبيعات منذ آخر شهر</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black">19,392 <span className="text-lg font-medium">ر.س</span></div>
                <span className="bg-green-500 text-white rounded-lg px-3 py-1 text-sm font-medium">7,500 ر.س</span>
              </div>
            </div>
            <div className="text-muted-foreground text-sm">هذا الشهر ▼</div>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 mb-4">
              <SalesLineChart />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
              <span>06</span>
              <span>07</span>
            </div>
          </CardContent>
        </Card>

        {/* زوار المنصة */}
        <Card className="border-0">
          <CardHeader className="pb-4">
            <div className="space-y-1">
              <CardDescription>إحصائيات</CardDescription>
              <CardTitle className="text-lg">زوار المنصة</CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black">5,773</span>
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded"></div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">زائر خلال هذا الأسبوع</p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-24 mb-4">
              <VisitorsBarChart />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#ec4899] rounded-full"></span>
                <span className="text-muted-foreground">4,773 مسجلين في المنصة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#3b82f6] rounded-full"></span>
                <span className="text-muted-foreground">1,000 لم يقوموا بالتسجيل</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* الشبكة السفلية */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 px-8 mb-8">
        {/* فريق العمل */}
        <Card className="border-0 rounded-3xl shadow-lg bg-white">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl font-bold text-gray-800">فريق سبان</CardTitle>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">↗</span>
                </div>
                <span className="text-green-500 text-sm font-bold">1.3%</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">منذ آخر شهر</p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ن</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">نورة سعد</div>
                  <div className="text-sm text-gray-500">مبرمج</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <span className="text-lg">⋮</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">م</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">محمد عبدالعزيز</div>
                  <div className="text-sm text-gray-500">مدير التسويق</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <span className="text-lg">⋮</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">ع</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">عبدالرحمن يوسف</div>
                  <div className="text-sm text-gray-500">مدير المالية</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <span className="text-lg">⋮</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">م</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">محمد ياسر</div>
                  <div className="text-sm text-gray-500">مدير إدارة المحتوى</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <span className="text-lg">⋮</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Alex</div>
                  <div className="text-sm text-gray-500">المدير التقني</div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <span className="text-lg">⋮</span>
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-100">
              <button className="w-full flex items-center justify-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <span className="text-white text-xl font-bold">+</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* باقات الاشتراك */}
        <Card className="col-span-2 border-0 rounded-3xl shadow-lg bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">↗</span>
                </div>
                <span className="text-green-500 text-lg font-bold">1.3%</span>
              </div>
              <div className="text-right">
                <div className="text-gray-500 text-sm mb-1">باقات الاشتراك</div>
                <div className="text-4xl font-black text-[#4a5568]">12,563 <span className="text-lg font-medium">مشترك</span></div>
              </div>
            </div>
            <p className="text-sm text-gray-400 mt-2">منذ آخر شهر</p>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center mb-8">
              <SubscriptionPieChart />
            </div>
            
            {/* البيانات أسفل المخطط */}
            <div className="grid grid-cols-2 gap-6">
              {subscriptionData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-1">{item.value}</div>
                  <div className="flex items-center justify-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.fill }}
                    ></span>
                    <span className="text-[#4a5568] font-semibold">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
