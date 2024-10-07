// components/Statistics.js
import { useEffect, useState } from 'react';

const Statistics = ({ month }) => {
    const [totalSales, setTotalSales] = useState(0);
    const [totalSoldItems, setTotalSoldItems] = useState(0);
    const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/transactions/list?month=${month}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                let sales = 0;
                let soldItems = 0;
                let notSoldItems = 0;

                data.forEach(transaction => {
                    if (transaction.sold) {
                        sales += transaction.price;
                        soldItems += 1;
                    } else {
                        notSoldItems += 1;
                    }
                });

                setTotalSales(sales);
                setTotalSoldItems(soldItems);
                setTotalNotSoldItems(notSoldItems);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [month]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="statistics-box">
            <h2>Statistics for {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <p>Total Amount of Sale: <strong>₹ {totalSales.toFixed(2)}</strong></p>
            <p>Total Sold Items: <strong>{totalSoldItems}</strong></p>
            <p>Total Not Sold Items: <strong>{totalNotSoldItems}</strong></p>
        </div>
    );
};

export default Statistics;
