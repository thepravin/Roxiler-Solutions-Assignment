const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions.js');
const { setData, getTransactionsByMonth, getStatistics, getBarChartData, getPieChartData, getCombinedData } = require('./controllers/transactionController.js');

const app = express();
app.use(cors());
app.use(express.json());

app .get('/',
  (req, res) =>{
  res. send( 'Home api running');
  })

const PORT = process.env.PORT || 5000;

// Connect to MongoDB without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use your routes
app.get('/set-data', setData);
app.get('/list', getTransactionsByMonth);
app.get('/statistics', getStatistics);
app.get('/bar-chart', getBarChartData);
app.get('/pie-chart', getPieChartData);
app.get('/combined-data', getCombinedData); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
