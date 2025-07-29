import { useRef, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

type LineChartProps = {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      pointBackgroundColor?: string;
      pointBorderColor?: string;
      pointRadius?: number;
      pointHoverRadius?: number;
      borderWidth?: number;
      tension?: number;
      fill?: boolean;
    }[];
  };
  options: ChartOptions<"line">;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({ data, options }: LineChartProps) {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

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
      <Line ref={chartRef} options={options} data={data} />
    </div>
  );
}

export default LineChart;
