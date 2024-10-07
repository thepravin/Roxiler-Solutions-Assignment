// components/Statistics.js
import React from 'react';

const Statistics = ({ month, statistics }) => {
    // Destructure with default values to avoid errors
    const { sales = 0, soldItems = 0, notSoldItems = 0 } = statistics || {};

    return (
        <div className="statistics-box">
            <h2>Statistics for {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}</h2>
            <p>Total Amount of Sale: <strong>₹ {sales.toFixed(2)}</strong></p>
            <p>Total Sold Items: <strong>{soldItems}</strong></p>
            <p>Total Not Sold Items: <strong>{notSoldItems}</strong></p>
        </div>
    );
};

export default Statistics;
