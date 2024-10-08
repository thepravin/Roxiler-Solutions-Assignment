
# MERN Stack Coding Challenge

## Overview

This project demonstrates a **MERN Stack** application with a backend built on **Node.js, Express, and MongoDB**. The goal is to create APIs for fetching and processing product transactions from a third-party source and displaying them with pagination, search functionality, statistics, and visualizations on the frontend.

### Data Source

- **THIRD PARTY API URL**: `https://s3.amazonaws.com/roxiler.com/product_transaction.json`
- **REQUEST METHOD**: GET
- **RESPONSE FORMAT**: JSON

### Backend Tasks

1. **Initialize Database**
   - Create an API to fetch data from the third-party API and populate your MongoDB database with the seed data.
   - Design an efficient collection structure to store and manage the product transactions.

2. **API Endpoints**

   #### 1. List Transactions API
   - **Endpoint**: `/api/transactions`
   - **Description**: Fetches a paginated list of product transactions.
   - **Features**:
     - Supports **search** based on product title, description, or price.
     - Returns all transactions if no search parameters are provided.
     - Default pagination: `page=1`, `perPage=10`.

   #### 2. Transactions Statistics API
   - **Endpoint**: `/api/statistics`
   - **Description**: Provides transaction statistics for the selected month.
   - **Returns**:
     - Total sale amount for the month.
     - Total number of sold items.
     - Total number of unsold items.

   #### 3. Bar Chart API
   - **Endpoint**: `/api/bar-chart`
   - **Description**: Generates a bar chart of item counts based on price ranges for the selected month.
   - **Price Ranges**:
     - 0 - 100
     - 101 - 200
     - 201 - 300
     - 301 - 400
     - 401 - 500
     - 501 - 600
     - 601 - 700
     - 701 - 800
     - 801 - 900
     - 901 and above

   #### 4. Pie Chart API
   - **Endpoint**: `/api/pie-chart`
   - **Description**: Generates a pie chart of unique categories and the number of items in each category for the selected month.

   #### 5. Combined Data API
   - **Endpoint**: `/api/combined-data`
   - **Description**: Combines the responses from the List Transactions, Statistics, Bar Chart, and Pie Chart APIs into a single JSON response.

### Frontend Tasks

Using the above APIs, implement the following components on a **single page**:

1. **Transactions Table**  
   - Displays the list of product transactions for a selected month.
   - **Features**:
     - Month dropdown (January to December) with **March** as the default selected month.
     - Search box for filtering transactions by title, description, or price.
     - Pagination controls for loading the next or previous set of transactions.

2. **Transactions Statistics**  
   - Shows total sale amount, total sold items, and total unsold items for the selected month using the **Statistics API**.

3. **Transactions Bar Chart**  
   - Displays the number of items within specified price ranges for the selected month using the **Bar Chart API**.

### Instructions

- All the APIs take **month** as an input parameter, matched against the `dateOfSale` field (month values: January to December).
- Use the APIs to create seamless data fetching and display for the frontend components.


---

<div align="center">
<h1>🧑‍💻 Happy coding!</h1>
</div>
