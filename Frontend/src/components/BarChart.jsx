import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/transactions/bar-chart`, {
        params: { month },
      });
      setBarChartData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const chartData = {
    labels: barChartData.map((item) => item._id), // Adjust according to your data structure
    datasets: [
      {
        label: 'Number of Items by Price Range',
        data: barChartData.map((item) => item.count),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div className="bar-chart">
      <h2>Price Range Distribution for {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
