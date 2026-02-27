require('dotenv').config();
const prisma = require('../src/utils/prismaClient');
const bcrypt = require('bcrypt');

async function main() {
    const email = 'admin@teddyrental.com';
    const password = 'Password123!';
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log('Admin user already exists');
        return;
    }

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('Admin account created successfully:', user.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
