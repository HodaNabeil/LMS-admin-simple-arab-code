"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { AdminStats } from "@/types/stats";

function YearlyProgress({
  yearlyProgress,
}: {
  yearlyProgress: AdminStats["yearlyProgress"];
}) {
  const percentageChange = yearlyProgress?.revenueChangePercentage;

  return (
    <section className="bg-white p-6 rounded-md h-fit flex flex-col flex-grow shadow-md">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-800">التقدم السنوي</h2>
        <p className="flex items-center gap-4 text-slate-700">
          الإيرادات:
          <span className="text-green-600 flex items-center gap-1">
            {percentageChange >= 0
              ? `+${percentageChange.toFixed(2)}%`
              : `${percentageChange.toFixed(2)}%`}
          </span>
        </p>
      </div>
      <Chart monthlyRevenue={yearlyProgress?.monthlyRevenue} />
    </section>
  );
}

export default YearlyProgress;

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

const Chart = ({ monthlyRevenue }: { monthlyRevenue: number[] }) => {
  const data = {
    labels: labels.map((label) => label.slice(0, 3)),
    datasets: [
      {
        label: "الإيرادات الشهرية",
        data: monthlyRevenue,
        borderColor: "#7dd3fc",
        backgroundColor: "rgba(255,255,255,0.5)",
        pointBackgroundColor: "#fff",
        pointBorderColor: "#7dd3fc",
        pointRadius: 5,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
        },
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 20,
            color: "#94a3b8",
          },
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
          },
          ticks: {
            color: "#94a3b8",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
          },
          suggestedMin: 0,
          ticks: {
            callback: function (tickValue: string | number) {
              return `$${tickValue}`;
            },
            color: "#94a3b8",
          },
        },
      },
    },
  };
  return (
    <Line data={data} options={config.options} className="w-full h-full" />
  );
};
