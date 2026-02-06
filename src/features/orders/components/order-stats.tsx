import { ShoppingCart, RotateCcw, TrendingUp, DollarSign } from "lucide-react";
import type { Order } from "../types";



interface CourseStatsProps {
  orders: Order[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeType?: "positive" | "negative";
}

function StatCard({ title, value, icon, change, changeType }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
            >
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
    </div>
  );
}

function OrderStats({ orders }: CourseStatsProps) {
  const totalOrders = orders.length;
  const totalAmount = orders.reduce(
    // @ts-ignore
    (sum, order) => sum + (order.amount || 0),
    0
  );
  const totalRevenue = orders.reduce(
    // @ts-ignore
    (sum, order) => sum + (order.price || 0),
    0
  );

  const stats = [
    {
      title: "إجمالي الطلبات",
      value: totalOrders,
      icon: <ShoppingCart className="w-8 h-8" />,
      change: "+3 طلبات جديدة",
      changeType: "positive" as const,
    },
    {
      title: "والطلبات المستردة",
      value: totalAmount.toLocaleString(),
      icon: <RotateCcw className="w-8 h-8" />,
      change: "+12% من الشهر الماضي",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي الإيرادات",
      value: `${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-8 h-8" />,
      change: "تحسن بالإيرادات",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
          changeType={stat.changeType}



        />
      ))}
    </div>
  );
}

export default OrderStats;
