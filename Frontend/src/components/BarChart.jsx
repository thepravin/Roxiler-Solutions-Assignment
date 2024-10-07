import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = (month) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/transactions/bar-chart`, {
        params: { month },
      });
      setBarChartData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const chartData = {
    labels: barChartData.map((item) => item._id),
    datasets: [
      {
        label: 'Items in Price Range',
        data: barChartData.map((item) => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="bar-chart">
      <h2>Price Range Distribution for {month}</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
