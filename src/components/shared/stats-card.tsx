import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  growthPercentage: number;
  className?: string;
  iconClassName?: string;
}

function StatsCard({
  icon,
  title,
  value,
  growthPercentage,
  className = "",
  iconClassName = "bg-blue-400",
}: StatsCardProps) {
  return (
    <div className={`flex items-start gap-4 rounded-lg p-4 ${className}`}>
      {/* Icon */}
      <div className={`p-3 rounded-full ${iconClassName}`}>{icon}</div>

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="text-slate-700 text-md font-medium mb-1">{title}</h3>

        {/* Value */}
        <div className="text-slate-800 text-2xl font-bold mb-3">{value}</div>

        {/* Growth percentage */}
        <div className="space-y-2">
          <div className="bg-gray-200 rounded-md h-1 w-full">
            <div
              style={{
                width: `${growthPercentage < 0 ? 0 : growthPercentage}%`,
              }}
              className="bg-blue-400 h-full rounded-md"
            ></div>
          </div>
          <p className="text-slate-600 text-sm">
            زيادة في الشهر الماضي {growthPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
