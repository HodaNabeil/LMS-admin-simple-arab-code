import { Users, BookOpen, DollarSign } from "lucide-react";

export const stats = [
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
