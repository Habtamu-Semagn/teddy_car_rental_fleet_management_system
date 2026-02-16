const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Route Imports
const authRoutes = require('./src/routes/auth.routes');
const bookingRoutes = require('./src/routes/booking.routes');
const carRoutes = require('./src/routes/car.routes');
const userRoutes = require('./src/routes/user.routes');
const reportRoutes = require('./src/routes/report.routes');
const packageRoutes = require('./src/routes/package.routes');
const uploadRoutes = require('./src/routes/upload.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware Imports
const errorMiddleware = require('./src/middlewares/error.middleware');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Main Route Registration
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('Teddy Car Rental API is running');
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});