import { ShoppingCart, RotateCcw, TrendingUp, DollarSign } from "lucide-react";
import type { Order } from "../types";
import { cn } from "../../../lib/utils";



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
    <div className={cn('bg-white', 'rounded-lg', 'border', 'border-gray-200', 'p-6')}>
      <div className={cn('flex', 'items-center', 'justify-between')}>
        <div>
          <p className={cn('text-sm', 'font-medium', 'text-gray-600')}>{title}</p>
          <p className={cn('text-2xl', 'font-bold', 'text-gray-900', 'mt-2')}>{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 flex items-center gap-1 ${changeType === "positive" ? "text-green-600" : "text-red-600"
                }`}
            >
              <TrendingUp className={cn('w-4', 'h-4')} />
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
    // @ts-expect-error - order amount property might not exist on type
    (sum, order) => sum + (order.amountCents || 0),
    0
  );
  const totalRevenue = orders.reduce(
    // @ts-expect-error - order price property might not exist on type
    (sum, order) => sum + (order.price || 0),
    0
  );

  const stats = [
    {
      title: "إجمالي الطلبات",
      value: totalOrders,
      icon: <ShoppingCart className={cn('w-8', 'h-8')} />,
      change: "+3 طلبات جديدة",
      changeType: "positive" as const,
    },
    {
      title: "والطلبات المستردة",
      value: totalAmount.toLocaleString(),
      icon: <RotateCcw className={cn('w-8', 'h-8')} />,
      change: "+12% من الشهر الماضي",
      changeType: "positive" as const,
    },
    {
      title: "إجمالي الإيرادات",
      value: `${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className={cn('w-8', 'h-8')} />,
      change: "تحسن بالإيرادات",
      changeType: "positive" as const,
    },
  ];

  return (
    <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6', 'mb-6')}>
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
