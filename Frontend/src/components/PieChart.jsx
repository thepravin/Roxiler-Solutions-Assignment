import  { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChart = ( month ) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/transactions/pie-chart`, {
        params: { month },
      });
      setPieChartData(data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  const chartData = {
    labels: pieChartData.map((item) => item._id),
    datasets: [
      {
        label: 'Items by Category',
        data: pieChartData.map((item) => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="pie-chart">
      <h2>Category Distribution for {month}</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
