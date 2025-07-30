import BarChart from "@/components/shared/charts/bar-chart";
import type { ChartOptions } from "chart.js";

export default function MostJoinedCourses() {
  const monthlyData = {
    January: {
      course: "React الأساسيات",
      students: 245,
      color: "rgba(59, 130, 246, 0.8)",
    },
    February: {
      course: "JavaScript المتقدم",
      students: 298,
      color: "rgba(236, 72, 153, 0.8)",
    },
    March: {
      course: "Html",
      students: 187,
      color: "rgba(34, 197, 94, 0.8)",
    },
    April: {
      course: "Node.js للمبتدئين",
      students: 356,
      color: "rgba(251, 146, 60, 0.8)",
    },
    May: {
      course: "React المتقدم",
      students: 289,
      color: "rgba(59, 130, 246, 0.8)",
    },
    June: {
      course: "قواعد البيانات",
      students: 198,
      color: "rgba(168, 85, 247, 0.8)",
    },
    July: {
      course: "Python للمبتدئين",
      students: 412,
      color: "rgba(236, 72, 153, 0.8)",
    },
    August: {
      course: "تصميم UI/UX",
      students: 234,
      color: "rgba(34, 197, 94, 0.8)",
    },
    September: {
      course: "Php",
      students: 276,
      color: "rgba(14, 165, 233, 0.8)",
    },
    October: {
      course: "Flutter التطبيقات",
      students: 321,
      color: "rgba(59, 130, 246, 0.8)",
    },
    November: {
      course: "Css",
      students: 203,
      color: "rgba(251, 146, 60, 0.8)",
    },
    December: {
      course: "Git",
      students: 267,
      color: "rgba(236, 72, 153, 0.8)",
    },
  };

  const months = Object.keys(monthlyData);
  const courseData = Object.values(monthlyData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide default legend since each bar represents different courses
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
            const monthIndex = context.dataIndex;
            const data = courseData[monthIndex];
            return [
              `الدورة الأكثر انضماماً: ${data.course}`,
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
    labels: months,
    datasets: [
      {
        data: courseData.map((item) => item.students),
        backgroundColor: courseData.map((item) => item.color),
        hoverBackgroundColor: courseData.map((item) =>
          item.color.replace("0.8", "1.0")
        ),
        borderWidth: 0,
        maxBarThickness: 60,
      },
    ],
  };

  return (
    <div className="w-full h-80">
      <BarChart
        data={chartData}
        options={options as unknown as ChartOptions<"bar">}
      />
    </div>
  );
}
