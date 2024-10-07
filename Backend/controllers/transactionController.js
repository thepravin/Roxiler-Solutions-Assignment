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
    return res
      .status(400)
      .json({
        error:
          "Invalid month provided. Please provide a month between 1 and 12.",
      });
  }

  try {
    // Fetch transactions for the specified month across all years
    const transactions = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNum],
      },
    });

    // console.log('Fetched Transactions:', transactions); // Log the transactions fetched

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
};

// Statistics for the selected month
exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  // Convert month to a number and validate
  const monthNum = Number(month);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return res
      .status(400)
      .json({
        error:
          "Invalid month provided. Please provide a month between 1 and 12.",
      });
  }
  try {
    // Fetch transactions for the specified month across all years
    const data = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNum],
      },
    });

    let sales = 0;
    let soldItems = 0;
    let notSoldItems = 0;

    data.forEach((transaction) => {
      if (transaction.sold) {
        sales += transaction.price;
        soldItems += 1;
      } else {
        notSoldItems += 1;
      }
    });

    res.status(200).json({sales,soldItems,notSoldItems});
  } catch (error) {
    console.error("Error fetching Statistics:", error);
    res.status(500).json({ error: "Error fetching Statistics" });
  }
};

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

// *********** Pie chart data
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
exports.getPieChartData = async (req, res) => {
  const { month } = req.query;

  // Convert month to a number and validate
  const monthNum = Number(month);
  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    return res
      .status(400)
      .json({
        error:
          "Invalid month provided. Please provide a month between 1 and 12.",
      });
  }

  try {
    // Fetch transactions for the specified month across all years
    const data = await Transaction.find({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNum],
      },
    });

    const categoryCounts = getCategoryCounts(data);
    const preparedData = prepareChartData(categoryCounts);   

    res.status(200).json(preparedData);
  } catch (error) {
    console.error("Error fetching Pi-chart:", error);
    res.status(500).json({ error: "Error fetching Pi-chart" });
  }
};
