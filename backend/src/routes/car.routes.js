const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

// Public routes (for customers browsing)
router.get('/', carController.getAllCars);
router.get('/:id', carController.getCarById);

// Staff/Admin routes
router.post('/', authenticate, authorize('EMPLOYEE', 'ADMIN'), carController.createCar);
router.patch('/:id', authenticate, authorize('EMPLOYEE', 'ADMIN'), carController.updateCar);
router.delete('/:id', authenticate, authorize('ADMIN'), carController.deleteCar);

module.exports = router;
