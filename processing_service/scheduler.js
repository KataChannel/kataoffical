const cron = require('node-cron');
const { runPeriodicTask } = require('./taskRunner');
const { schedulerConfig } = require('./config');
const prisma = require('./databaseClient'); // Import prisma để đóng kết nối khi shutdown

console.log("Starting Scheduler Service...");
console.log(`Scheduling task with cron schedule: "${schedulerConfig.cronSchedule}"`);

// --- Validate Cron Schedule ---
if (!cron.validate(schedulerConfig.cronSchedule)) {
    console.error(`Invalid cron schedule: "${schedulerConfig.cronSchedule}". Exiting.`);
    process.exit(1);
}

// --- Schedule Task ---
cron.schedule(schedulerConfig.cronSchedule, () => {
    console.log(`\nCron job triggered at ${new Date().toISOString()}`);
    runPeriodicTask().catch(error => {
        // Thêm .catch để bắt lỗi không mong muốn từ taskRunner không bị crash scheduler
        console.error("Unhandled error during scheduled task execution:", error);
    });
}, {
    scheduled: true,
    timezone: schedulerConfig.timezone
});

console.log(`Scheduler started. Waiting for job trigger based on schedule: "${schedulerConfig.cronSchedule}" in timezone "${schedulerConfig.timezone}".`);


// --- Graceful Shutdown ---
async function gracefulShutdown() {
    console.log('\nReceived kill signal, shutting down gracefully...');
    // Đóng các kết nối đang mở, ví dụ Prisma Client
    if (prisma) {
        try {
            await prisma.$disconnect();
            console.log('Prisma Client disconnected.');
        } catch (e) {
            console.error('Error disconnecting Prisma Client:', e);
        }
    }
    // Thêm các hành động dọn dẹp khác nếu cần
    console.log('Graceful shutdown complete. Exiting.');
    process.exit(0);
}

process.on('SIGTERM', gracefulShutdown); // Tín hiệu tắt từ Docker/Kubernetes
process.on('SIGINT', gracefulShutdown);  // Tín hiệu tắt từ Ctrl+C