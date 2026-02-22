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

    const cars = [
        { make: 'Hyundai', model: 'Accent', year: 2021, plateNumber: 'AA-2-11111', category: 'Economy', dailyRate: 1200, features: ['AC', 'USB'], location: 'Main Office' },
        { make: 'Suzuki', model: 'Swift', year: 2022, plateNumber: 'AA-2-22222', category: 'Economy', dailyRate: 1100, features: ['Compact', 'Fuel Efficient'], location: 'Bole' },
        { make: 'Toyota', model: 'Rav4', year: 2019, plateNumber: 'AA-2-33333', category: 'SUV', dailyRate: 2500, features: ['AC', 'AWD', 'Spacious'], location: 'Main Office' },
        { make: 'Hyundai', model: 'Tucson', year: 2023, plateNumber: 'AA-2-44444', category: 'SUV', dailyRate: 3000, features: ['AC', 'Sunroof', 'Bluetooth'], location: 'Airport' },
        { make: 'Mercedes', model: 'C-Class', year: 2021, plateNumber: 'AA-2-55555', category: 'Luxury', dailyRate: 6000, features: ['Premium Sound', 'Leather', 'AC'], location: 'Airport' },
        { make: 'Ford', model: 'Explorer', year: 2020, plateNumber: 'AA-2-66666', category: 'SUV', dailyRate: 3200, features: ['7-Seater', 'Tow Hitch', 'AC'], location: 'Piazza' },
        { make: 'Kia', model: 'Cerato', year: 2022, plateNumber: 'AA-2-77777', category: 'Economy', dailyRate: 1400, features: ['AC', 'Bluetooth', 'Reverse Camera'], location: 'Main Office' },
        { make: 'Audi', model: 'A6', year: 2022, plateNumber: 'AA-2-88888', category: 'Luxury', dailyRate: 7000, features: ['Matrix LED', 'Leather', 'Quattro'], location: 'Airport' },
        { make: 'Mitsubishi', model: 'Pajero', year: 2018, plateNumber: 'AA-2-99999', category: 'SUV', dailyRate: 2800, features: ['Rugged', '4WD', 'AC'], location: 'Main Office' },
        { make: 'Toyota', model: 'HiAce', year: 2021, plateNumber: 'AA-2-10101', category: 'Van', dailyRate: 2200, features: ['12-Seater', 'AC', 'High Roof'], location: 'Megenagna' }
    ];

    for (const carData of cars) {
        await prisma.car.upsert({
            where: { plateNumber: carData.plateNumber },
            update: {},
            create: {
                ...carData,
                status: 'AVAILABLE'
            }
        });
    }

    console.log('Cars created: basic and additional 10 cars added.');

    // Create a sample booking (only if none exist for this customer+car combo)
    const existingBooking = await prisma.booking.findFirst({
        where: { userId: customer.id, carId: car1.id }
    });
    if (!existingBooking) {
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
    } else {
        console.log('Sample booking already exists, skipping.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
