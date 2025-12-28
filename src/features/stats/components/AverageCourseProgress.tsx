import { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  type ChartConfiguration,
  type Plugin,
} from 'chart.js';
import { Card } from '@/components/ui/card';

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutController);

// Mock data to show the chart shape as requested
const mockData = {
  inProgress: { count: 350, percentage: 35 },
  completed: { count: 450, percentage: 45 },
  enrolled: { count: 200, percentage: 20 },
};

export default function AverageCourseProgress() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  // Use mockData instead of props
  const dataToUse = mockData;

  // Calculate total count for center display
  const totalCount =
    dataToUse.inProgress.count +
    dataToUse.completed.count +
    dataToUse.enrolled.count;

  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy existing chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const chartData = [
      dataToUse.inProgress.percentage,
      dataToUse.completed.percentage,
      dataToUse.enrolled.percentage,
    ];

    const data = {
      labels: ['قيد التقدم', 'مكتمل', 'مسجل'],
      datasets: [
        {
          data: chartData,
          backgroundColor: [
            'rgba(251, 146, 60, 0.8)', // برتقالي - In Progress
            'rgba(34, 197, 94, 0.8)', // أخضر - Completed
            'rgba(59, 130, 246, 0.8)', // أزرق - Enrolled
          ],
          borderColor: [
            'rgba(251, 146, 60, 1)',
            'rgba(34, 197, 94, 1)',
            'rgba(59, 130, 246, 1)',
          ],
          borderWidth: 2,
          hoverOffset: 8,
          hoverBorderWidth: 3,
        },
      ],
    };

    // Custom plugin to draw text in the center of the doughnut
    const centerTextPlugin: Plugin = {
      id: 'centerText',
      afterDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw total count
        ctx.font = 'bold 32px sans-serif';
        ctx.fillStyle = '#1e293b';
        ctx.fillText(totalCount.toString(), centerX, centerY - 10);

        // Draw label
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText('إجمالي الطلاب', centerX, centerY + 20);

        ctx.restore();
      },
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 13,
                family: 'sans-serif',
              },
              color: '#475569',
              boxWidth: 12,
              boxHeight: 12,
            },
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#1e293b',
            bodyColor: '#475569',
            borderColor: 'rgba(203, 213, 225, 0.8)',
            borderWidth: 1,
            cornerRadius: 8,
            padding: 12,
            displayColors: true,
            boxPadding: 6,
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                let count = 0;

                // Get the actual count based on the label
                if (context.dataIndex === 0) {
                  count = dataToUse.inProgress.count;
                } else if (context.dataIndex === 1) {
                  count = dataToUse.completed.count;
                } else if (context.dataIndex === 2) {
                  count = dataToUse.enrolled.count;
                }

                return `${label}: ${context.formattedValue}% (${count} طالب)`;
              },
            },
          },
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart',
        },
      },
      plugins: [centerTextPlugin],
    };

    chartInstance.current = new ChartJS(chartRef.current, config);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [totalCount, dataToUse]);

  return (
    <Card className="bg-white p-6 rounded-lg flex flex-col items-center h-fit border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h2 className="text-slate-800 text-xl font-semibold mb-6">
        متوسط تقدم الدورات
      </h2>
      <div className="w-full max-w-sm h-80 flex items-center justify-center">
        <canvas ref={chartRef} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 w-full max-w-sm">
        <div className="text-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-orange-600">
            {dataToUse.inProgress.count}
          </p>
          <p className="text-xs text-slate-600 mt-1">قيد التقدم</p>
        </div>
        <div className="text-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-green-600">
            {dataToUse.completed.count}
          </p>
          <p className="text-xs text-slate-600 mt-1">مكتمل</p>
        </div>
        <div className="text-center p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
          <p className="text-2xl font-bold text-blue-600">
            {dataToUse.enrolled.count}
          </p>
          <p className="text-xs text-slate-600 mt-1">مسجل</p>
        </div>
      </div>
    </Card>
  );
}
