import  { useEffect, useState } from 'react';
import axios from 'axios';
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

const BarChart = ({ month }) => {
  const [data, setData] = useState({ labels: [], datasets: [] });
  const priceRanges = [
    { range: '0 - 100', min: 0, max: 100 },
    { range: '101 - 200', min: 101, max: 200 },
    { range: '201 - 300', min: 201, max: 300 },
    { range: '301 - 400', min: 301, max: 400 },
    { range: '401 - 500', min: 401, max: 500 },
    { range: '501 - 600', min: 501, max: 600 },
    { range: '601 - 700', min: 601, max: 700 },
    { range: '701 - 800', min: 701, max: 800 },
    { range: '801 - 900', min: 801, max: 900 },
    { range: '901 and above', min: 901, max: Infinity },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/list?month=${month}`);
        const transactions = response.data; // Assuming the response is an array of items

        const counts = Array(priceRanges.length).fill(0);

        transactions.forEach((item) => {
          const price = item.price;
          priceRanges.forEach((range, index) => {
            if (price >= range.min && price <= range.max) {
              counts[index]++;
            }
          });
        });

        const chartData = {
          labels: priceRanges.map(range => range.range),
          datasets: [
            {
              label: 'Number of Items',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        };

        setData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [month]);

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
