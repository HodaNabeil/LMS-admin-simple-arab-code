import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NewUsers() {
  const data = {
    labels: [
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
    ],
    datasets: [
      {
        label: "المستخدمين الجدد",
        data: [45, 62, 38, 55, 71, 48, 53, 67, 42, 58, 73, 49],
        backgroundColor: [
          "rgba(99, 102, 241, 0.6)" /* بنفسجي فاتح */,
          "rgba(236, 72, 153, 0.5)" /* وردي ناعم */,
          "rgba(34, 197, 94, 0.6)" /* أخضر فاتح */,
          "rgba(251, 146, 60, 0.5)" /* برتقالي ناعم */,
          "rgba(168, 85, 247, 0.5)" /* بنفسجي فاتح */,
          "rgba(14, 165, 233, 0.6)" /* أزرق سماوي */,
          "rgba(239, 68, 68, 0.5)" /* أحمر ناعم */,
          "rgba(16, 185, 129, 0.6)" /* أخضر نعناعي */,
          "rgba(245, 158, 11, 0.5)" /* أصفر ذهبي فاتح */,
          "rgba(139, 92, 246, 0.5)" /* بنفسجي لافندر */,
          "rgba(6, 182, 212, 0.6)" /* أزرق فيروزي */,
          "rgba(220, 38, 127, 0.5)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 0.6)" /* بنفسجي فاتح */,
          "rgba(236, 72, 153, 0.5)" /* وردي ناعم */,
          "rgba(34, 197, 94, 0.6)" /* أخضر فاتح */,
          "rgba(251, 146, 60, 0.5)" /* برتقالي ناعم */,
          "rgba(168, 85, 247, 0.5)" /* بنفسجي فاتح */,
          "rgba(14, 165, 233, 0.6)" /* أزرق سماوي */,
          "rgba(239, 68, 68, 0.5)" /* أحمر ناعم */,
          "rgba(16, 185, 129, 0.6)" /* أخضر نعناعي */,
          "rgba(245, 158, 11, 0.5)" /* أصفر ذهبي فاتح */,
          "rgba(139, 92, 246, 0.5)" /* بنفسجي لافندر */,
          "rgba(6, 182, 212, 0.6)" /* أزرق فيروزي */,
          "rgba(220, 38, 127, 0.5)",
        ],
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
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
          label: (context: { label: string; parsed: number }) => {
            return `${context.label}: ${context.parsed} مستخدم جديد`;
          },
        },
      },
    },
    cutout: "60%",
    animation: {
      duration: 1200,
      easing: "easeInOutQuart" as const,
    },
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
