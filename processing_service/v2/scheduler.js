// scheduler.js
const cron = require('node-cron');
// Import hàm generic runner mới
const { runGenericTask } = require('./taskRunner'); // (Đã refactor)
// Import các hàm fetch dữ liệu
const { getAllKhachhang } = require('./customer'); //
const { getAllThanhtoan } = require('./revenue'); //
const { getAllDieutri } = require('./treatment'); //
const { getAllLichhen } = require('./appointment'); //
const { getAllDichvu } = require('./dichvu'); //

const { transformCustomerData, transformRevenueData,transformAppointmentData,transformTreatmentData,transformDichvuData } = require('./transforms');

const prisma = require('./databaseClient'); //

console.log('Scheduler started. Waiting for jobs...');

// === Định nghĩa Cấu hình cho từng Task ===

const customerTaskConfig = {
    taskName: "Customer",
    fetchDataFunction: getAllKhachhang,
    transformFunction: transformCustomerData,
    prismaModel: prisma.Customer, // Truyền trực tiếp model Prisma
    sourceIdField: 'source_id',   // Tên trường unique key trong data đã transform
    minioDataPrefix: 'customers'  // (Tùy chọn) Thư mục con trong MinIO
};

const revenueTaskConfig = {
    taskName: "Revenue",
    fetchDataFunction: getAllThanhtoan,
    transformFunction: transformRevenueData,
    prismaModel: prisma.Revenue, // !!! Đảm bảo bạn có model Revenue trong Prisma !!!
    sourceIdField: 'source_id',  // Dùng 'source_id' hoặc ID phù hợp từ transformRevenueData
    minioDataPrefix: 'revenue'   // (Tùy chọn) Thư mục con trong MinIO
};

const treatmentTaskConfig = {
    taskName: "Treatment",
    fetchDataFunction: getAllDieutri,
    transformFunction: transformTreatmentData,
    prismaModel: prisma.Treatment,
    sourceIdField: 'source_id',
    minioDataPrefix: 'treatment' // (Optional) Subdirectory in MinIO
};

const appointmentTaskConfig = { 
    taskName: "Appointment",
    fetchDataFunction: getAllLichhen,
    transformFunction: transformAppointmentData,
    prismaModel: prisma.Appointment,
    sourceIdField: 'source_id',
    minioDataPrefix: 'appointments' // (Optional) Subdirectory in MinIO
};

const dichvuTaskConfig = {
    taskName: "Dichvu",
    fetchDataFunction: getAllDichvu,
    transformFunction: transformDichvuData,
    prismaModel: prisma.Dichvu, // !!! Đảm bảo bạn có model Dichvu trong Prisma !!!
    sourceIdField: 'source_id',
    minioDataPrefix: 'dichvu'
};


// === Lên lịch chạy các Task ===
// Ví dụ: Chạy cả hai task vào lúc 1 giờ sáng mỗi ngày
// ('0 1 * * *' = 0 phút, 1 giờ, mỗi ngày trong tháng, mỗi tháng, mỗi ngày trong tuần)
cron.schedule('0 */3 * * *', async () => {
    console.log('\n========================================');
    console.log(`[Scheduler] Triggering daily tasks at ${new Date().toISOString()}`);
    console.log('========================================');

    try {
        console.log('\n--- Starting Customer Task ---');
        await runGenericTask(customerTaskConfig);
        console.log('--- Finished Customer Task ---');
    } catch (error) {
        console.error('[Scheduler] Error running Customer task:', error);
    }

    // Thêm khoảng nghỉ nhỏ giữa các task nếu cần (ví dụ: tránh quá tải API/DB)
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5 giây nghỉ

    try {
        console.log('\n--- Starting Revenue Task ---');
        await runGenericTask(revenueTaskConfig);
        console.log('--- Finished Revenue Task ---');
    } catch (error) {
        console.error('[Scheduler] Error running Revenue task:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));  
    try {
        console.log('\n--- Starting Treatment Task ---');
        await runGenericTask(treatmentTaskConfig);
        console.log('--- Finished Treatment Task ---');
    } catch (error) {
        console.error('[Scheduler] Error running Treatment task:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
        console.log('\n--- Starting Appointment Task ---');
        await runGenericTask(appointmentTaskConfig);
        console.log('--- Finished Appointment Task ---');
    } catch (error) {
        console.error('[Scheduler] Error running Appointment task:', error);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
    try {
        console.log('\n--- Starting Dichvu Task ---');
        await runGenericTask(dichvuTaskConfig);
        console.log('--- Finished Dichvu Task ---');
    } catch (error) {
        console.error('[Scheduler] Error running Dichvu task:', error);
    }

    console.log('\n========================================');
    console.log(`[Scheduler] Daily tasks cycle finished at ${new Date().toISOString()}`);
    console.log('========================================');

}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh" // Đặt múi giờ phù hợp
});

// Có thể thêm các lịch trình khác nếu cần
// Ví dụ: chạy task khách hàng mỗi 6 tiếng, task doanh thu mỗi ngày
// cron.schedule('0 */6 * * *', async () => { /* Chạy task khách hàng */ });
// cron.schedule('0 2 * * *', async () => { /* Chạy task doanh thu */ });

console.log('Cron job scheduled. Waiting for trigger...');

// Giữ cho process chạy (nếu không có server web hoặc process dài hạn khác)
// process.stdin.resume(); // Hoặc dùng một thư viện như `forever` hoặc `pm2`

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

// async function getDichvu() {
//     try {
//         console.log('\n--- Starting Dichvu Task ---');
//         await runGenericTask(dichvuTaskConfig);
//         console.log('--- Finished Dichvu Task ---');
//     } catch (error) {
//         console.error('[Scheduler] Error running Dichvu task:', error);
//     }
// }
// getDichvu();

process.on('SIGTERM', gracefulShutdown); // Tín hiệu tắt từ Docker/Kubernetes
process.on('SIGINT', gracefulShutdown);  // Tín hiệu tắt từ Ctrl+C