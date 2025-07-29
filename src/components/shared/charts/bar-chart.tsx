import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type BarChartProps = {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor?: string[];
      borderWidth?: number;
      maxBarThickness?: number;
    }[];
  };
  options: ChartOptions<"bar">;
};
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({ data, options }: BarChartProps) {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <Bar ref={chartRef} options={options} data={data} />
    </div>
  );
}

export default BarChart;
