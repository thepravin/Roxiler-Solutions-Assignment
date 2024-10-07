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
                const response = await fetch(`http://localhost:5000/api/transactions/list?month=${month}`);
                const data = await response.json();
                const categoryCounts = getCategoryCounts(data);
                const preparedData = prepareChartData(categoryCounts);
                setChartData(preparedData);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, [month]);

    const getCategoryCounts = (transactions) => {
        const categoryCounts = {};
        transactions.forEach(transaction => {
            const category = transaction.category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        });
        return categoryCounts;
    };

    const prepareChartData = (categoryCounts) => {
        const labels = Object.keys(categoryCounts);
        const data = Object.values(categoryCounts);

        return {
            labels: labels,
            datasets: [{
                label: 'Transaction Categories',
                data: data,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            }],
        };
    };

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
