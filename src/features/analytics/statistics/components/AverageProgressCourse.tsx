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
        label: "متوسط التقدم (%)",
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
        min: 35,
        max: 85,
        ticks: {
          stepSize: 5,
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
    <div className="w-full h-full">
      <LineChart data={data} options={options} />
    </div>
  );
};

export default AverageProgressCourse;
