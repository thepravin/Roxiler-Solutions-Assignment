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
  
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/transactions/bar-chart?month=${month}`);
       console.log(response);

        setData(response.data);
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
