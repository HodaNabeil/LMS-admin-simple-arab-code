import { Card } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ChartTooltip, Legend);

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  data: { date: string; value: number }[];
}

export function StatsCard({ title, value, icon, data }: StatsCardProps) {
  // إعداد بيانات الرسم البياني
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: title,
        data: data.map((d) => d.value),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        pointBackgroundColor: "#818cf8",
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointHoverBorderColor: "#6366f1",
        pointHoverBackgroundColor: "#6366f1",
 
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return context.raw.value;
          },
        },
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 12,
        },  
      },

    },
    scales: {
      x: { display: false },
      y: { display: false },
      y1: { display: false },
      y2: { display: false },
      y3: { display: false },
      y4: { display: false },
      y5: { display: false },
      y6: { display: false },
      y7: { display: false },
    },
    elements: {
      point: { radius: 3 },
      line: {
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
      },
    },
  };

  return (
    <Card className="bg-white text-gray-800 p-4 h-full shadow-sm border border-gray-100 ">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <div className="h-16">
        <Line data={chartData} options={options} height={64} />
      </div>
    </Card>
  );
}
