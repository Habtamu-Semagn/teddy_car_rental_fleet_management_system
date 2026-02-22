const prisma = require('../utils/prismaClient');

const getFinancialOverview = async (req, res) => {
    try {
        // Total Revenue from all COMPLETED bookings
        const totalRevenueResult = await prisma.booking.aggregate({
            where: { status: 'COMPLETED' },
            _sum: { totalAmount: true }
        });
        const totalRevenue = totalRevenueResult._sum.totalAmount || 0;

        // Total Expenses from Maintenance (as a proxy for now)
        const totalExpensesResult = await prisma.maintenance.aggregate({
            where: { status: 'COMPLETED' },
            _sum: { cost: true }
        });
        const totalExpenses = totalExpensesResult._sum.cost || 0;

        const netProfit = Number(totalRevenue) - Number(totalExpenses);

        // Stats for cards
        const pendingBookings = await prisma.booking.count({ where: { status: 'PENDING' } });
        const activeRentals = await prisma.booking.count({ where: { status: 'ACTIVE' } });
        const totalCustomers = await prisma.user.count({ where: { role: 'CUSTOMER' } });

        res.json({
            summary: {
                totalRevenue: Number(totalRevenue),
                totalExpenses: Number(totalExpenses),
                netProfit,
                profitMargin: Number(totalRevenue) > 0 ? (netProfit / Number(totalRevenue)) * 100 : 0
            },
            stats: {
                pendingBookings,
                activeRentals,
                totalCustomers
            }
        });
    } catch (error) {
        console.error('Get financial overview error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getRecentTransactions = async (req, res) => {
    try {
        const transactions = await prisma.payment.findMany({
            include: {
                booking: {
                    include: {
                        user: {
                            include: { customerProfile: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 20
        });

        const formattedTransactions = transactions.map(tx => ({
            id: `TX-${tx.id}`,
            customer: tx.booking.user.customerProfile ?
                `${tx.booking.user.customerProfile.firstName} ${tx.booking.user.customerProfile.lastName}` :
                tx.booking.user.email,
            amount: tx.amount,
            status: tx.status,
            date: tx.createdAt,
            method: tx.method,
            type: 'Revenue'
        }));

        res.json(formattedTransactions);
    } catch (error) {
        console.error('Get recent transactions error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getFinancialOverview,
    getRecentTransactions
};
