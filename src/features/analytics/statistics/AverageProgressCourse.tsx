

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
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
      labels: ['React', 'Vue', 'Angular', 'Svelte'], // أسماء الدورات
      datasets: [
        {
          label: 'متوسط التقدم (%)',
          data: [75, 60, 90, 45, 80, 70, 60, 50, 40, 30, 20, 10], // قيم التقدم لكل دورة
          borderColor: '#4f46e5',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          fill: true,
          tension: 0.4,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'النسبة المئوية',
          },
        },
      },
    };
  
    return (
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">متوسط التقدم لكل دورة</h2>
        <Line data={data} options={options} />
      </div>
    );
  };
  
  export default AverageProgressCourse;
  