import LineChart from "@/components/shared/charts/line-chart";

const data = {
  labels: [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ],
  datasets: [
    {
      label: "المستخدمون النشطون",
      data: [120, 140, 90, 170, 200, 180, 220],
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
      beginAtZero: true,
      min: 0,
      max: 250,
      ticks: {
        stepSize: 50,
        callback: function (tickValue: string | number) {
          return `${tickValue} مستخدم`;
        },
      },
      grid: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      title: {
        display: false,
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

export default function DailyActiveUsers() {
  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-1   text-lg font-semibold text-gray-500">
        <div className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></div>
        <span> المستخدمون النشطون يوميًا</span>
      </h3>
      <div style={{ height: 400 }}>
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
}
