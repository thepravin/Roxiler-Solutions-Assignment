
import TransactionsTable from './components/TransactionsTable'; // Adjust the path as necessary
import './index.css';

const App = () => {
    return (
        <div>
            <h1 className='transaction-heading'>Transaction List</h1>
            <TransactionsTable />
        </div>
    );
};

export default App;
