const express = require('express');
const router = express.Router();
const packageController = require('../controllers/package.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Public routes
router.get('/', packageController.getAllPackages);

// Admin only routes
router.post('/', authenticate, authorize('ADMIN'), packageController.createPackage);
router.patch('/:id', authenticate, authorize('ADMIN'), packageController.updatePackage);
router.delete('/:id', authenticate, authorize('ADMIN'), packageController.deletePackage);

module.exports = router;
