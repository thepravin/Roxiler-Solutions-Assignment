import { useEffect, useState } from 'react';
import './TransactionsTable.css'; // Import the CSS file

const TransactionsTable = () => {
    const [data, setData] = useState([]); // Initialize as an empty array
    const [month, setMonth] = useState(3); // Default to March
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchTransactions = async (month, searchQuery = "", page = 1) => {
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/list?month=${month}`);
            const result = await response.json();

            // Filter the results based on the search query
            const filteredData = result.filter(transaction => 
                transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
            );

            const startIndex = (page - 1) * 10;
            const endIndex = startIndex + 10;
            const paginatedData = filteredData.slice(startIndex, endIndex);

            setData(paginatedData);
            setTotalPages(Math.ceil(filteredData.length / 10)); // Update total pages
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions(month, search);
    }, [month, search, page]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearch(query);
        setPage(1); // Reset to the first page when searching
    };

    const handleMonthChange = (e) => {
        setMonth(Number(e.target.value));
        setPage(1); // Reset to the first page when month changes
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="transactions-table-container">
            <div className="controls">
                <label htmlFor="monthSelect">Select Month:</label>
                <select id="monthSelect" value={month} onChange={handleMonthChange}>
                    {Array.from({ length: 12 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {new Date(0, index).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

            <table className="transactions-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map(transaction => (
                            <tr key={transaction._id.$oid}>
                                <td>{transaction._id.$oid}</td>
                                <td>{transaction.title}</td>
                                <td>{transaction.price.toFixed(2)}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.sold ? '✅' : '❌'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default TransactionsTable;
