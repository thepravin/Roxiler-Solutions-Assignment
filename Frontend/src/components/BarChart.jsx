import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month, barChartData }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Update state only when barChartData changes
    if (barChartData) {
      setData(barChartData);
    }
  }, [barChartData]); // Dependency array

  return (
    <div className="barchart-container">
      <h2 className="barchart-title">
        Sales Data for {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
      </h2>
      <div className="chart">
        <Bar data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default BarChart;
