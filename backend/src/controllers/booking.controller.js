const prisma = require('../utils/prismaClient');

const createBooking = async (req, res) => {
    try {
        const {
            carId,
            startDate,
            endDate,
            idCardUrl,
            driverLicenseUrl,
            totalAmount,
            pickupLocation,
            returnLocation,
            isDelivery
        } = req.body;
        const userId = req.user.id;

        // BR-03: Bookings cannot be submitted without document uploads.
        if (!idCardUrl || !driverLicenseUrl) {
            return res.status(400).json({ message: 'Document uploads (ID Card and Driver License) are mandatory.' });
        }

        // Check car availability
        const conflictingBooking = await prisma.booking.findFirst({
            where: {
                carId: parseInt(carId),
                status: {
                    in: ['PENDING', 'VERIFIED', 'APPROVED', 'PAID', 'ACTIVE']
                },
                OR: [
                    {
                        startDate: { lte: new Date(endDate) },
                        endDate: { gte: new Date(startDate) }
                    }
                ]
            }
        });

        if (conflictingBooking) {
            return res.status(400).json({ message: 'Car is not available for the selected dates.' });
        }

        const booking = await prisma.booking.create({
            data: {
                userId,
                carId: parseInt(carId),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                totalAmount: parseFloat(totalAmount),
                idCardUrl,
                driverLicenseUrl,
                pickupLocation,
                returnLocation,
                isDelivery: isDelivery || false,
                status: 'PENDING'
            }
        });

        res.status(201).json(booking);
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            where: { userId: req.user.id },
            include: { car: true, payment: true, rentalAgreement: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(bookings);
    } catch (error) {
        console.error('Get my bookings error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma.booking.findMany({
            include: { user: true, car: true, payment: true },
            orderBy: { createdAt: 'desc' }
        });
        res.json(bookings);
    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const employeeId = req.user.id;

        const booking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: {
                status,
                processedById: employeeId,
            },
            include: { user: true }
        });

        res.json(booking);
    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const assignDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const { driverName } = req.body;

        const booking = await prisma.booking.update({
            where: { id: parseInt(id) },
            data: {
                assignedDriver: driverName
            }
        });

        res.json({ message: 'Driver assigned successfully', booking });
    } catch (error) {
        console.error('Assign driver error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    getAllBookings,
    updateBookingStatus,
    assignDriver
};
