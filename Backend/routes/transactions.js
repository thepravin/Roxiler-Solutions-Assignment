const express = require('express');
const {
    seedData,
    getTransactionsByMonth,
    getStatistics,
    getBarChartData,
    getPieChartData
} = require('../controllers/transactionController');

const router = express.Router();

router.get('/seed', seedData);
router.get('/list', getTransactionsByMonth);
router.get('/statistics', getStatistics);
router.get('/bar-chart', getBarChartData);
router.get('/pie-chart', getPieChartData);

module.exports = router;
