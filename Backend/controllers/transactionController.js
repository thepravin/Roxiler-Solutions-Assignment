const Transaction = require("../models/Transaction");
const axios = require("axios");

// Initialize database with seed data
exports.seedData = async (req, res) => {
  try {
    // Fetch data from the external API using fetch
    const response = await fetch(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    // Check if the response is OK (status in the range 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();

    // Log the fetched data to the console for debugging
    // console.log("Data: ", data);

    // Insert the fetched data into the database
    await Transaction.insertMany(data);

    // Send a success response to the client
    res.status(200).json({ message: "Database seeded successfully" });
  } catch (error) {
    // Log any errors to the console and return an error response
    console.error("Error seeding data: ", error);
    res.status(500).json({ error: "Error seeding data" });
  }
};

// List all transactions
exports.getTransactionsByMonth = async (req, res) => {
  const { month } = req.query;

  // Convert month to a number and validate
  const monthNum = Number(month);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return res.status(400).json({ error: "Invalid month provided. Please provide a month between 1 and 12." });
  }

  try {
    // Fetch transactions for the specified month across all years
    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNum]
      }
    });

    // console.log('Fetched Transactions:', transactions); // Log the transactions fetched

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};





// Statistics for the selected month
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    // Validate month input
    if (!month || isNaN(month) || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Invalid month provided' });
    }

    // Create date range for the specified month
    const startDate = new Date(`2021-${month < 10 ? '0' : ''}${month}-01T00:00:00Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Move to the first day of the next month

    // Execute aggregation pipeline
    const statistics = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSaleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
          totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
          totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } },
        },
      },
    ]);

    // Return the statistics or an empty object if no data is found
    res.status(200).json(statistics.length ? statistics[0] : {
      totalSaleAmount: 0,
      totalSoldItems: 0,
      totalNotSoldItems: 0,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Error fetching statistics'});
  }
}


// Bar chart data
exports.getBarChartData = async (req, res) => {
  const { month } = req.query;
  const regexMonth = new RegExp(month, "i");

  try {
    const barChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: regexMonth } } },
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
          default: "901-above",
          output: { count: { $sum: 1 } },
        },
      },
    ]);

    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching bar chart data" });
  }
};

// Pie chart data
exports.getPieChartData = async (req, res) => {
  const { month } = req.query;
  const regexMonth = new RegExp(month, "i");

  try {
    const pieChartData = await Transaction.aggregate([
      { $match: { dateOfSale: { $regex: regexMonth } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pie chart data" });
  }
};
