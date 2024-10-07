import { useState } from 'react';
import TransactionsTable from './components/TransactionsTable'; // Adjust the path as necessary
import './index.css';

const App = () => {
    const [month, setMonth] = useState(3); // Default to March

    const handleMonthChange = (e) => {
        setMonth(Number(e.target.value));
    };

    return (
        <div>
            <h1 className='transaction-heading'>Transaction List</h1>
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
            <TransactionsTable month={month} />
        </div>
    );
};

export default App;
