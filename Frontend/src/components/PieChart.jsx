// PieChart.js
import  { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import necessary elements


Chart.register(ArcElement, Tooltip, Legend); // Register the elements

const PieChart = ({ month }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/transactions/pie-chart?month=${month}`);
                const data = await response.json();                
                setChartData(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, [month]); 

    return (
        <div className="pie-chart-container">
            <h2 className="pie-chart-title">Transaction Categories</h2>
            {chartData.labels ? (
                <Pie 
                    data={chartData} 
                    options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Transaction Categories',
                            },
                        },
                    }} 
                />
            ) : (
                <p className="loading-message">Loading chart...</p>
            )}
        </div>
    );
};

export default PieChart;
