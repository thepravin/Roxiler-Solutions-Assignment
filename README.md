# Roxiler Solutions Assignment

## Table of Contents
- [Overview](#overview)
- [Deployment](#deployment-)
- [How I Build](#-how-i-build)
  - [Technologies Used](#technologies-used)
- [Backend Overview](#backend-overview)
  - [API Routes](#api-routes)
- [Frontend Overview](#frontend-overview)
  - [Components](#components)
- [Video](#video)

## Overview

This project demonstrates a **MERN Stack** application with a backend built on **Node.js, Express, and MongoDB**. The goal is to create APIs for fetching and processing product transactions from a third-party source and displaying them with pagination, search functionality, statistics, and visualizations on the frontend.

- Check out [MERN Challenge Overview](./Challenge-overview.md) for an in-depth overview of the coding challenge and tasks.


## Deployment 🚀

> **Note:** Please wait a little bit as it may take some time to fetch data from the MongoDB cluster.
> 
```
https://roxiler-solutions-assignment-frontend-izdzizs8i.vercel.app/
```
&nbsp;

---

# 📝 How I Build 
  
### Technologies Used
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Charting**: react-chartjs-2 , chart.js

##  Backend Overview

## API Routes

Below are the available routes for the backend APIs in this project. Each route is designed to handle specific functionality related to product transactions and statistics:

1. **Initialize Database**

   - **Route**: `GET /set-data`
   - **Handler**: `setData`
   - **Description**: Fetches data from a third-party API and initializes the database with the seed data.

2. **List Transactions by Month**

   - **Route**: `GET /list`
   - **Handler**: `getTransactionsByMonth`
   - **Description**: Retrieves a paginated list of product transactions based on the selected month. Supports search functionality.

3. **Statistics for the Selected Month**

   - **Route**: `GET /statistics`
   - **Handler**: `getStatistics`
   - **Description**: Provides statistics for the selected month, including total sales amount, number of sold items, and number of unsold items.

4. **Bar Chart Data**

   - **Route**: `GET /bar-chart`
   - **Handler**: `getBarChartData`
   - **Description**: Returns data for a bar chart showing the number of items within specific price ranges for the selected month.

5. **Pie Chart Data**

   - **Route**: `GET /pie-chart`
   - **Handler**: `getPieChartData`
   - **Description**: Returns data for a pie chart representing unique product categories and the number of items in each category for the selected month.

6. **Combined Data**

   - **Route**: `GET /combined-data`
   - **Handler**: `getCombinedData`
   - **Description**: Combines the responses from the list, statistics, bar chart, and pie chart APIs into a single JSON response for comprehensive data visualization.

##  Frontend Overview

The frontend of this project is built using React.js.

### Components

1. **`BarChart.jsx`**
   - This component is responsible for rendering a bar chart using the data fetched from the backend. It visually represents the distribution of items across specified price ranges for the selected month.

2. **`PieChart.jsx`**
   - The `PieChart` component displays the unique product categories and the number of items in each category. It provides insights into the proportion of different categories for the selected month.

3. **`Statistics.jsx`**
   - This component showcases key statistics, including total sales, number of sold items, and unsold items for the selected month. It fetches data from the backend to present an overview of sales performance.

4. **`TransactionsTable.jsx`**
   - The `TransactionsTable` component lists all product transactions for the selected month. It includes pagination and search functionality, allowing users to filter transactions based on product title, description, or price.


## Video






<div align="center">
<h1>🧑‍💻 Happy coding!</h1>
</div>


