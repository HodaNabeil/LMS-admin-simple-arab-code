import BarChart from "@/components/shared/charts/bar-chart";
import type { ChartOptions } from "chart.js";

function MostActiveUsersChart() {
  const monthlyData = {
    January: { user: "Ahmed", hours: 85, color: "rgba(59, 130, 246, 0.6)" },
    February: { user: "Sara", hours: 92, color: "rgba(236, 72, 153, 0.6)" },
    March: { user: "Omar", hours: 78, color: "rgba(34, 197, 94, 0.6)" },
    April: { user: "Fatma", hours: 105, color: "rgba(251, 146, 60, 0.6)" },
    May: { user: "Ahmed", hours: 98, color: "rgba(59, 130, 246, 0.6)" },
    June: { user: "Kareem", hours: 88, color: "rgba(168, 85, 247, 0.6)" },
    July: { user: "Sara", hours: 115, color: "rgba(236, 72, 153, 0.6)" },
    August: { user: "Omar", hours: 82, color: "rgba(34, 197, 94, 0.6)" },
    September: { user: "Layla", hours: 94, color: "rgba(14, 165, 233, 0.6)" },
    October: { user: "Ahmed", hours: 110, color: "rgba(59, 130, 246, 0.6)" },
    November: { user: "Fatma", hours: 87, color: "rgba(251, 146, 60, 0.6)" },
    December: { user: "Sara", hours: 102, color: "rgba(236, 72, 153, 0.6)" },
  };

  const months = Object.keys(monthlyData);
  const userData = Object.values(monthlyData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend since each bar represents different users
      },

      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#6b7280",
        borderColor: "rgba(209, 213, 219, 0.5)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const monthIndex = context.dataIndex;
            const data = userData[monthIndex];
            return [`Most Active: ${data.user}`, `Hours Spent: ${data.hours}h`];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(229, 231, 235, 0.5)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6b7280",
          callback: (value: number) => `${value} ساعة`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: "500" as const,
          },
          color: "#6b7280",
          maxRotation: 45,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
    },
    animation: {
      duration: 1200,
      easing: "easeInOutQuart" as const,
    },
  };

  const chartData = {
    labels: months,
    datasets: [
      {
        data: userData.map((item) => item.hours),
        backgroundColor: userData.map((item) => item.color),
        hoverBackgroundColor: userData.map((item) =>
          item.color.replace("0.6", "0.8")
        ),
        borderWidth: 0,
        maxBarThickness: 60,
      },
    ],
  };
  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-slate-600 mb-4 flex items-center">
        <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
        المستخدم الأكثر نشاطاً في الشهر
      </h3>
      <BarChart
        data={chartData}
        options={options as unknown as ChartOptions<"bar">}
      />
    </div>
  );
}

export default MostActiveUsersChart;
