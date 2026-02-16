const express = require('express');
const router = express.Router();
const reportController = require('../controllers/report.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Restricted to Staff and Admin
router.get('/financials', authenticate, authorize('ADMIN', 'EMPLOYEE'), reportController.getFinancialOverview);
router.get('/transactions', authenticate, authorize('ADMIN', 'EMPLOYEE'), reportController.getRecentTransactions);

module.exports = router;
