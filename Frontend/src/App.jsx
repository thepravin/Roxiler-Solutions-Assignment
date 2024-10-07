import { useEffect, useState } from 'react';
import TransactionsTable from './components/TransactionsTable'; // Adjust the path as necessary
import './index.css';
import Statistics from './components/Statistics';
import PieChart from './components/PieChart';
import BarChart from './components/BarChart';

const App = () => {
    const [month, setMonth] = useState(3); // Default to March
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState({});
    const [pieChartData, setPieChartData] = useState({});

    useEffect(() => {
        const apiCall = async (month) => {
            try {
                const response = await fetch(`http://localhost:5000/api/transactions/combined-data?month=${month}`);
                const result = await response.json();
                
                // Set state with respective data
                setTransactions(result.transactions);
                setStatistics(result.statistics);
                setBarChartData(result.barChartData);
                setPieChartData(result.paiChartData); // Correct spelling from 'paiChartData' to 'pieChartData'
                
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        apiCall(month); // Pass month to apiCall

    }, [month]);

    const handleMonthChange = (e) => {
        setMonth(Number(e.target.value));
    };

    return (
        <div>
            <h1 className='transaction-heading'>Dashboard</h1>
            <div className="controls">
                <label htmlFor="monthSelect">Select Month:</label>
                <select id="monthSelect" value={month} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {new Date(0, index).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>
            <div className="container"> {/* Flex container for side-by-side layout */}
                <div className="transactions-table"> {/* Optional wrapper for styling */}
                    <TransactionsTable month={month} transactions={transactions} />
                </div>
                <div className="charts-container"> {/* New wrapper for charts */}
                    <div className="statistics-pie"> {/* Container for Statistics and PieChart */}
                        <Statistics month={month} statistics={statistics} />
                        <PieChart month={month} pieChartData={pieChartData} />
                    </div>
                    <BarChart month={month} barChartData={barChartData} /> {/* BarChart below the Statistics and PieChart */}
                </div>
            </div>
        </div>
    );
};

export default App;
