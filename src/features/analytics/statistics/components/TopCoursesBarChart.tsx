import BarChart from "@/components/shared/charts/bar-chart";
import type { ChartOptions } from "chart.js";

export default function TopFifthCourses() {
  // بيانات أفضل 5 دورات للشهر الحالي
  const topCoursesData = [
    {
      course: "React الأساسيات",
      students: 245,
      color: "rgba(59, 130, 246, 0.8)",
    },
    {
      course: "JavaScript المتقدم",
      students: 298,
      color: "rgba(236, 72, 153, 0.8)",
    },
    {
      course: "Python للمبتدئين",
      students: 412,
      color: "rgba(34, 197, 94, 0.8)",
    },
    {
      course: "Node.js للمبتدئين",
      students: 356,
      color: "rgba(251, 146, 60, 0.8)",
    },
    {
      course: "تصميم UI/UX",
      students: 234,
      color: "rgba(168, 85, 247, 0.8)",
    },
  ];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (context: { dataIndex: number }) => {
            const data = topCoursesData[context.dataIndex];
            return [
              `الدورة: ${data.course}`,
              `عدد الطلاب: ${data.students} طالب`,
            ];
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: "#6b7280",
          callback: (value: number) => `${value} طالب`,
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
    labels: topCoursesData.map((item) => item.course),
    datasets: [
      {
        data: topCoursesData.map((item) => item.students),
        backgroundColor: topCoursesData.map((item) => item.color),
        hoverBackgroundColor: topCoursesData.map((item) =>
          item.color.replace("0.8", "1.0")
        ),
        borderWidth: 0,
        maxBarThickness: 60,
      },
    ],
  };

  return (
    <div className=" h-80 w-full  py-8 px-2 ">
      <h2 className="text-2xl font-bold mb-6 text-gray-500">
        أفضل خامسة دورات حسب الانضمام
      </h2>
      <BarChart
        data={chartData}
        options={options as unknown as ChartOptions<"bar">}
      />
    </div>
  );
}
