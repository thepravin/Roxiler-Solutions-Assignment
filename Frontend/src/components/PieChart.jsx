

import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; 

Chart.register(ArcElement, Tooltip, Legend); // Register the elements

const PieChart = ({ month, pieChartData }) => {
    return (
        <div className="pie-chart-container">
            <h2 className="pie-chart-title">
                Transaction Categories for {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
            </h2>
            {pieChartData.labels ? (
                <Pie 
                    data={pieChartData} 
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
