require('dotenv').config();

// --- Cảnh báo Bảo mật ---
// Console.warn("SECURITY WARNING: MinIO credentials might be read directly from ENV vars in this example. Use Docker Secrets or secure ENV management in Production!");

// --- Cấu hình MinIO ---
const minioEndpoint = process.env.MINIO_ENDPOINT || 'http://localhost:9090';
const minioAccessKey = process.env.MINIO_ACCESS_KEY; // Đọc trực tiếp từ ENV
const minioSecretKey = process.env.MINIO_SECRET_KEY; // Đọc trực tiếp từ ENV
const dataLakeBucket = process.env.MINIO_BUCKET_NAME;
const processedPrefix = 'processed/'; // Prefix để lưu file đã xử lý
const errorPrefix = 'error/';     // Prefix cho file lỗi

// --- Cấu hình API ---
const externalApiUrl = process.env.EXTERNAL_API_URL;
const apiAuthUrl = 'https://apismsvtt.vttechsolution.com/api/Client/Autho'; // Hardcoded from process.js
const apiCustomerListUrl = 'https://tmtaza.vttechsolution.com/Customer/ListCustomer/?handler=LoadData?dateFrom=2025-04-25+00%3A00%3A00&dateTo=2025-04-25+00%3A00%3A00&branchID=7&type=1&BeginID=0&Limit=500'; // Hardcoded from process.js - Consider making this dynamic or moving parameters to ENV

// --- Cấu hình Cron ---
const cronSchedule = process.env.CRON_SCHEDULE || '*/30 * * * * *'; // Mặc định chạy mỗi 30 giây để test

// --- Kiểm tra biến môi trường thiết yếu ---
if (!minioEndpoint || !minioAccessKey || !minioSecretKey || !dataLakeBucket || !externalApiUrl) {
  console.error('Missing critical environment variables (MinIO or API). Exiting.');
  process.exit(1);
}
// DATABASE_URL được Prisma Client tự động đọc từ process.env

module.exports = {
    minioConfig: {
        endpoint: minioEndpoint,
        accessKey: minioAccessKey,
        secretKey: minioSecretKey,
        bucket: dataLakeBucket,
        processedPrefix: processedPrefix,
        errorPrefix: errorPrefix,
        region: 'us-east-1', // Giữ lại từ code gốc
        forcePathStyle: true // Giữ lại từ code gốc
    },
    apiConfig: {
        apiUrl: externalApiUrl, // URL chính từ ENV (được dùng trong task)
        authUrl: apiAuthUrl, // URL xác thực (có thể không dùng trong task hiện tại nhưng tách ra cho rõ)
        customerListUrl: apiCustomerListUrl, // URL danh sách KH (được dùng trong task)
        timeout: 30000 // Timeout từ code gốc
    },
    dbConfig: {
        // Prisma tự đọc DATABASE_URL từ process.env
    },
    schedulerConfig: {
        cronSchedule: cronSchedule,
        timezone: "Asia/Ho_Chi_Minh" // Múi giờ từ code gốc
    }
};