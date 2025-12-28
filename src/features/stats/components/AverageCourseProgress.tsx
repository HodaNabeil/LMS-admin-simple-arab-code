import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Card } from "@/components/ui/card";
import type { AdminStats } from "@/types/stats";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AverageCourseProgress({
  averageCourseProgress,
}: {
  averageCourseProgress: AdminStats["averageCourseProgress"];
}) {
  const chartData = [
    averageCourseProgress.inProgress.percentage,
    averageCourseProgress.completed.percentage,
    averageCourseProgress.enrolled.percentage,
  ];

  const data = {
    labels: ["In Progress", "Completed", "Enrolled"],
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          "#f87171", // أحمر فاتح
          "#a78bfa", // بنفسجي فاتح
          "#3b82f6", // أزرق فاتح
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%",
    plugins: {
      legend: { display: true, position: "bottom" },
    },
  };

  return (
    <Card className="bg-white p-6 rounded-lg flex flex-col items-center h-fit border border-slate-200">
      <h2 className="text-slate-800 text-lg mb-4">متوسط ​​تقدم الدورات</h2>
      <div className="w-60 h-60 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </Card>
  );
}
