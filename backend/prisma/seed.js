require('dotenv').config();
const prisma = require('../src/utils/prismaClient');
const { hashPassword } = require('../src/utils/hash');



async function main() {
    console.log('Seeding database...');

    // Create Admin
    const adminPassword = await hashPassword('admin123');
    const admin = await prisma.user.upsert({
        where: { email: 'admin@teddy.com' },
        update: {},
        create: {
            email: 'admin@teddy.com',
            password: adminPassword,
            role: 'ADMIN',
            customerProfile: {
                create: {
                    firstName: 'Teddy',
                    lastName: 'Admin',
                    phoneNumber: '0911000000',
                    address: 'Addis Ababa'
                }
            }
        }
    });
    console.log('Admin created:', admin.email);

    // Create Employee
    const employeePassword = await hashPassword('employee123');
    const employee = await prisma.user.upsert({
        where: { email: 'employee@teddy.com' },
        update: {},
        create: {
            email: 'employee@teddy.com',
            password: employeePassword,
            role: 'EMPLOYEE',
            customerProfile: {
                create: {
                    firstName: 'John',
                    lastName: 'Employee',
                    phoneNumber: '0911111111',
                    address: 'Bole'
                }
            }
        }
    });
    console.log('Employee created:', employee.email);

    // Create Customer
    const customerPassword = await hashPassword('customer123');
    const customer = await prisma.user.upsert({
        where: { email: 'customer@test.com' },
        update: {},
        create: {
            email: 'customer@test.com',
            password: customerPassword,
            role: 'CUSTOMER',
            customerProfile: {
                create: {
                    firstName: 'Alice',
                    lastName: 'Customer',
                    phoneNumber: '0911222222',
                    address: '4 Kilo'
                }
            }
        }
    });
    console.log('Customer created:', customer.email);

    // Create Cars
    const car1 = await prisma.car.upsert({
        where: { plateNumber: 'AA-2-12345' },
        update: {},
        create: {
            make: 'Toyota',
            model: 'Corolla',
            year: 2020,
            plateNumber: 'AA-2-12345',
            category: 'Economy',
            dailyRate: 1500,
            status: 'AVAILABLE',
            features: ['AC', 'Bluetooth'],
            location: 'Main Office'
        }
    });

    const car2 = await prisma.car.upsert({
        where: { plateNumber: 'AA-2-67890' },
        update: {},
        create: {
            make: 'Toyota',
            model: 'Land Cruiser',
            year: 2022,
            plateNumber: 'AA-2-67890',
            category: 'Luxury',
            dailyRate: 5000,
            status: 'AVAILABLE',
            features: ['AC', 'GPS', 'Leather Seats', '4WD'],
            location: 'Airport'
        }
    });
    console.log('Cars created:', car1.plateNumber, car2.plateNumber);

    // Create a booking with new fields
    const booking = await prisma.booking.create({
        data: {
            userId: customer.id,
            carId: car1.id,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 3)),
            totalAmount: 4500,
            status: 'PENDING',
            pickupLocation: 'Bole Airport',
            returnLocation: 'Bole Airport',
            isDelivery: true,
            idCardUrl: 'http://example.com/id.jpg',
            driverLicenseUrl: 'http://example.com/license.jpg'
        }
    });
    console.log('Booking created:', booking.id);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
