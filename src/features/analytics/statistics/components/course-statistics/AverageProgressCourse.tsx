import LineChart from "@/components/shared/charts/line-chart";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
// import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

const AverageProgressCourse = () => {
  const data = {
    labels: [
      "React",
      "Vue.js",
      "Angular",
      "Node.js",
      "Python",
      "JavaScript",
      "TypeScript",
      "PHP",
      "Laravel",
      "Django",
      "Express.js",
      "MongoDB",
    ],
    datasets: [
      {
        label: "مكتمل",
        data: [85, 78, 92, 88, 75, 82, 70, 68, 85, 90, 88, 80],
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: false,
        tension: 0.1,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#10b981",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: "منضم",
        data: [65, 59, 80, 81, 55.5, 55.5, 40, 45, 60, 70, 75, 68],
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        fill: false,
        tension: 0.1,
        pointBackgroundColor: "#60a5fa",
        pointBorderColor: "#60a5fa",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: "في تقدم",
        data: [45, 38, 52, 48, 35, 42, 30, 28, 45, 50, 48, 40],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245, 158, 11, 0.1)",
        fill: false,
        tension: 0.1,
        pointBackgroundColor: "#f59e0b",
        pointBorderColor: "#f59e0b",
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false, // إزالة العنوان المكرر
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 25,
        max: 95,
        ticks: {
          stepSize: 10,
          callback: function (tickValue: string | number) {
            return `${tickValue}%`;
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        title: {
          display: true,
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          font: {
            size: 11,
          },
          maxRotation: 45,
        },
      },
    },
    elements: {
      point: {
        hoverRadius: 8,
      },
    },
  };

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-slate-500 mb-4 flex items-center">
        <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
        متوسط التقدم لكل دورة
      </h3>
      <LineChart data={data} options={options} />
    </div>
  );
};

export default AverageProgressCourse;
