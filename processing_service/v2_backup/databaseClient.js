const { PrismaClient } = require('../generated/prisma'); // Đảm bảo đường dẫn đúng

let prisma;

try {
    prisma = new PrismaClient();
    console.log('Prisma Client initialized.');
} catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    process.exit(1); // Thoát nếu không khởi tạo được DB client
}

module.exports = prisma;