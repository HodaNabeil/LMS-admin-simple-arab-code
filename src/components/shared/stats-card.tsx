import React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  growthPercentage: number;
  className?: string;
}

function StatsCard({
  icon,
  title,
  value,
  growthPercentage,
  className = "",
}: StatsCardProps) {
  return (
    <div className={`flex items-start gap-4 rounded-lg p-4 ${className}`}>
      {/* Icon */}
      <div className="p-3  rounded-full bg-blue-400">{icon}</div>

      {/* Content */}
      <div className="flex-1">
        {/* Title */}
        <h3 className="text-white text-md font-medium mb-1">{title}</h3>

        {/* Value */}
        <div className="text-white text-2xl font-bold mb-3">{value}</div>

        {/* Growth percentage */}

        <div className="space-y-2">
          <div className="bg-gray-100 rounded-md h-1 w-full">
            <div
              style={{
                width: `${growthPercentage < 0 ? 0 : growthPercentage}%`,
              }}
              className="bg-blue-500 h-full rounded-md"
            ></div>
          </div>
          <p className="text-card">
            {" "}
            زيادة في الشهر الماضي {growthPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
