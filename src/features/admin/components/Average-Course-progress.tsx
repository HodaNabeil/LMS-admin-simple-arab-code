import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "@/components/ui/card";

ChartJS.register(ArcElement, Tooltip, Legend);

type AverageCourseProgress = {
  inProgress: { count: number; percentage: number };
  completed: { count: number; percentage: number };
  enrolled: { count: number; percentage: number };
};

export default function AverageCourseProgress({
  averageCourseProgress,
}: {
  averageCourseProgress?: {
    inProgress: { count: number; percentage: number };
    completed: { count: number; percentage: number };
    enrolled: { count: number; percentage: number };
  };
}) {
  const safeData = averageCourseProgress || {
    inProgress: { count: 0, percentage: 0 },
    completed: { count: 0, percentage: 0 },
    enrolled: { count: 0, percentage: 0 },
  };

  const chartData = [
    safeData.inProgress.percentage,
    safeData.completed.percentage,
    safeData.enrolled.percentage,
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

  const options = {
    cutout: "70%",
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Card className="bg-white p-6 rounded-lg flex flex-col items-center w-full max-w-md border border-slate-200">
      <h2 className="text-slate-800 text-lg mb-4">Average Courses Progress</h2>
      <div className="w-60 h-60 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
      <div className="flex justify-center gap-6 mt-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-2 rounded bg-[#3b82f6]" />
          <span className="text-slate-800 text-sm">Enrolled</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-2 rounded bg-[#a78bfa]" />
          <span className="text-slate-800 text-sm">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-2 rounded bg-[#f87171]" />
          <span className="text-slate-800 text-sm">In Progress</span>
        </div>
      </div>
    </Card>
  );
}
