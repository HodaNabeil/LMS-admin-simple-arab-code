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
          "rgba(147, 197, 253, 0.7)" /* أزرق فاتح */,
          "rgba(251, 207, 232, 0.7)" /* وردي فاتح */,
          "rgba(134, 239, 172, 0.7)" /* أخضر فاتح */,
          "rgba(254, 215, 170, 0.7)" /* برتقالي فاتح */,
          "rgba(196, 181, 253, 0.7)" /* بنفسجي فاتح */,
          "rgba(165, 243, 252, 0.7)" /* أزرق سماوي فاتح */,
          "rgba(252, 165, 165, 0.7)" /* أحمر فاتح */,
          "rgba(110, 231, 183, 0.7)" /* أخضر نعناعي فاتح */,
          "rgba(253, 224, 71, 0.7)" /* أصفر فاتح */,
          "rgba(199, 210, 254, 0.7)" /* نيلي فاتح */,
          "rgba(103, 232, 249, 0.7)" /* فيروزي فاتح */,
          "rgba(251, 182, 193, 0.7)" /* وردي فاتح */,
        ],
        borderColor: [
          "rgba(147, 197, 253, 0.9)" /* أزرق فاتح */,
          "rgba(251, 207, 232, 0.9)" /* وردي فاتح */,
          "rgba(134, 239, 172, 0.9)" /* أخضر فاتح */,
          "rgba(254, 215, 170, 0.9)" /* برتقالي فاتح */,
          "rgba(196, 181, 253, 0.9)" /* بنفسجي فاتح */,
          "rgba(165, 243, 252, 0.9)" /* أزرق سماوي فاتح */,
          "rgba(252, 165, 165, 0.9)" /* أحمر فاتح */,
          "rgba(110, 231, 183, 0.9)" /* أخضر نعناعي فاتح */,
          "rgba(253, 224, 71, 0.9)" /* أصفر فاتح */,
          "rgba(199, 210, 254, 0.9)" /* نيلي فاتح */,
          "rgba(103, 232, 249, 0.9)" /* فيروزي فاتح */,
          "rgba(251, 182, 193, 0.9)" /* وردي فاتح */,
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
          color: "#6b7280",
        },
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
    <div className="w-full h-80 flex items-center justify-center">
      <Doughnut data={data} options={options} />
    </div>
  );
}
