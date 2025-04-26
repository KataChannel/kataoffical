const axios = require('axios');
const { S3Client, PutObjectCommand, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { PrismaClient } = require('../generated/prisma');
const { Readable } = require('stream');
const cron = require('node-cron');
require('dotenv').config();
console.log("Starting Scheduler Service...");

// --- Cảnh báo Bảo mật ---
console.warn("SECURITY WARNING: MinIO credentials might be read directly from ENV vars in this example. Use Docker Secrets or secure ENV management in Production!");

// --- 1. Lấy Cấu hình ---
const minioEndpoint = process.env.MINIO_ENDPOINT || "http://localhost:9090"; 
const minioAccessKey = process.env.MINIO_ACCESS_KEY; // Đọc trực tiếp từ ENV
const minioSecretKey = process.env.MINIO_SECRET_KEY; // Đọc trực tiếp từ ENV
const dataLakeBucket = process.env.MINIO_BUCKET_NAME ;
const apiUrl = process.env.EXTERNAL_API_URL; // Lấy từ ENV
const processedPrefix = 'processed/'; // Prefix để lưu file đã xử lý
const errorPrefix = 'error/';     // Prefix cho file lỗi


// Cron schedule (ví dụ: '0 * * * *' - mỗi giờ)
const cronSchedule = process.env.CRON_SCHEDULE || '*/1 * * * * *'; // Mặc định chạy mỗi 30 giây để test

// --- Kiểm tra biến môi trường ---
if (!minioEndpoint || !minioAccessKey || !minioSecretKey || !dataLakeBucket || !apiUrl) {
  console.error('Missing critical environment variables (MinIO or API). Exiting.');
  process.exit(1);
}
// DATABASE_URL được Prisma Client tự động đọc từ process.env

// --- Khởi tạo Clients ---
let s3Client;
try {
    s3Client = new S3Client({
        endpoint: minioEndpoint,
        region: 'us-east-1',
        credentials: { accessKeyId: minioAccessKey, secretAccessKey: minioSecretKey },
        forcePathStyle: true,
    });
    console.log('S3 Client initialized.');
} catch (error) {
    console.error('Failed to initialize S3 Client:', error);
    process.exit(1);
}

let prisma;
try {
    prisma = new PrismaClient();
    console.log('Prisma Client initialized.');
} catch (error) {
    console.error('Failed to initialize Prisma Client:', error);
    process.exit(1);
}


// --- Hàm helper đọc stream ---
async function streamToString(stream) { /* ... như cũ ... */
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}


// --- Hàm Di chuyển Object trong MinIO ---
async function moveObject(sourceKey, destinationKey) {
    try {
        const copyParams = {
            Bucket: dataLakeBucket,
            CopySource: `${dataLakeBucket}/${sourceKey}`,
            Key: destinationKey
        };
        await s3Client.send(new CopyObjectCommand(copyParams));

        const deleteParams = { Bucket: dataLakeBucket, Key: sourceKey };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`Successfully moved ${sourceKey} to ${destinationKey}`);
        return true;
    } catch (error) {
        console.error(`Error moving object ${sourceKey} to ${destinationKey}:`, error);
        return false;
    }
}



async function getToken(item) {
    try {
      const response = await axios.post('https://apismsvtt.vttechsolution.com/api/Client/Autho', item && typeof item == 'object' && Object.keys(item).length > 0 ? item : {"Name": "Taza","Password": "1b9287d492b256x7taza","Type": "web"}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = response.data;
      const cookies = response.headers['set-cookie'];
      console.log(data);
        return data
    //   switch (data.Status) {
    //     case 1:
    //       return [data, cookies];
    //     default:
    //       return data;
    //   }
    } catch (error) {
      if (error.response && error.response.status == 429) {
        // Retry after 5 seconds
        await new Promise(resolve => setTimeout(resolve, 5000));
        return getToken(item);
      }
      const logger ={
        Title:'Get Token',
        Slug:'gettoken',
        Action:'get',
        Mota:`Lỗi Xác Thực ${error} Vttech ${moment().format("HH:mm:ss DD/MM/YYYY")}`}
       this._LoggerService.create(logger)
      return `Lỗi Xác Thực ${error} Vttech ${moment().format("HH:mm:ss DD/MM/YYYY")}`

    }
  }

// --- Hàm chính thực hiện toàn bộ quy trình ---
async function getKhachhang(){
    const apiUrl = "https://tmtaza.vttechsolution.com/Customer/ListCustomer/?handler=LoadData?dateFrom=2025-04-25+00%3A00%3A00&dateTo=2025-04-25+00%3A00%3A00&branchID=7&type=1&BeginID=0&Limit=500"; // Đặt URL vào biến

    console.log(`Fetching data from ${apiUrl}...`);
    try {
        const response = await axios.post(apiUrl, { headers: 
        { 
            'Accept': 'application/json', 
            'Cookie': '.AspNetCore.Culture=c%3Dvi-VN%7Cuic%3Dvi-VN; .AspNetCore.Antiforgery.yCr0Ige0lxA=CfDJ8IhUiLorcVRDiLXVzwot_8QlOOz727SVM4jCvTCLqJcm5chCSOAhkzyhGU6mrNfMnS-IOEtNbd1Ua1VwJeL8-kJ0FdpsqYgN-zzSluKFB1b0cBzWfK1cxw2eZtOx_Zghuf1cv7PAh3dby-T_8YAr0zU; .AspNetCore.Session=CfDJ8IhUiLorcVRDiLXVzwot%2F8QN0Sm8aYyCLwzKCx%2FMcVGygGM%2FdVJwU7KykjXHqSkXG2RZrp2SMn7HqDVFTm9XIfMgT77XA6KK2DQFp9wNIaZ9zkkZvTuTpvSctyvCbAa8%2FN%2BwaDbKCdaVXWbSzPywxzEXXlhgO3VcJd6DrIXQ73%2BD; VTTECH_Menu_SideBarIsHide=false; WebToken=eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQ0hJS0lFVCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IndlYmFwcCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiMmU2ZGEwZmYtNzc2NC00MjUwLTkzN2UtNmFmOThiZTExZTMzIiwiZXhwIjoxNzQ1NjI4Njk0LCJpc3MiOiJ2dHRlY2hzb2x1dGlvbiIsImF1ZCI6InZ0dGVjaHNvbHV0aW9uIn0.P3T43xxHfUsUZXJY8RXFpLn-GeuMMuFyaohKD0JopRk',
            'xsrf-token': 'CfDJ8IhUiLorcVRDiLXVzwot_8S8VaN1UpBoXEZBeKiF6kdOkl4I0FDvKJ9WJmzxie9CK7JZ7r0PTZ93xFAbl0kFvI4Dj_tJufieTH77clh6SGoRLQMEXkn_djkD7rPsg4xIfti_VhCxEgS2MsJxTlGgJwE'
        }, timeout: 30000,body:{

        } });
        const data = response.data;
        console.log('Data fetched successfully:', data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
getToken()
async function runPeriodicTask() {
    const taskId = `Task_${new Date().toISOString()}`;
    console.log(`\n[${taskId}] Starting periodic task...`);
    let objectKey = null; // Lưu key của file đã lưu vào MinIO
    let rawData;

    try {
        // === Bước 1: Gọi API ===
        console.log(`[${taskId}] Fetching data from ${apiUrl}...`);
        const response = await axios.get(apiUrl, { headers: { 'Accept': 'application/json' }, timeout: 30000 });
        rawData = response.data;
        console.log(`[${taskId}] Successfully fetched data.`);

        if (!rawData || (Array.isArray(rawData) && rawData.length === 0)) {
            console.log(`[${taskId}] API returned no data. Task finished.`);
            return;
        }

        // === Bước 2: Lưu vào MinIO ===
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        const sourceName = apiUrl.split('/')[2]?.replace(/\./g, '_') || 'unknown_source';
        objectKey = `${sourceName}/${year}/${month}/${day}/${timestamp}_data.json`; // Gán vào biến ngoài try-catch

        const dataString = JSON.stringify(rawData); // Lưu JSON thô không format
        const putObjectParams = { Bucket: dataLakeBucket, Key: objectKey, Body: dataString, ContentType: 'application/json' };

        console.log(`[${taskId}] Uploading raw data to MinIO: ${objectKey}`);
       const result = await s3Client.send(new PutObjectCommand(putObjectParams));
       console.log('result',result);
       
        console.log(`[${taskId}] Successfully uploaded raw data to MinIO.`);

        // === Bước 3: Đọc lại dữ liệu từ MinIO ===
        console.log(`[${taskId}] Reading data back from MinIO: ${objectKey}`);
        const getParams = { Bucket: dataLakeBucket, Key: objectKey };
        const getCommand = new GetObjectCommand(getParams);
        const objectData = await s3Client.send(getCommand);
        if (!objectData.Body) throw new Error(`Object ${objectKey} body is empty after get.`);
        const rawDataStringFromMinio = await streamToString(objectData.Body);
        const dataToProcess = JSON.parse(rawDataStringFromMinio);
        console.log(`[${taskId}] Successfully read data back from MinIO.`);

        // === Bước 4: Transform Dữ liệu ===
        console.log(`[${taskId}] Transforming data...`);
        const transformedRecords = [];
        if (Array.isArray(dataToProcess)) {
            dataToProcess.forEach(item => {
                // Logic transform giống ví dụ trước
                 if (typeof item.id !== 'number' || typeof item.userId !== 'number') {
                     console.warn(`[${taskId}] Skipping record due to invalid id or userId:`, item);
                     return; // Bỏ qua bản ghi không hợp lệ
                 }
                const record = {
                    source_id: item.id,
                    title: item.title || null, // Cho phép null nếu title không có
                    content_length: item.body ? String(item.body).length : 0,
                    user_ref: item.userId,
                    extracted_at: now // Dùng lại timestamp 'now'
                };
                transformedRecords.push(record);
            });
        } else {
            console.warn(`[${taskId}] Data from ${objectKey} is not an array. Implement single object transformation logic if needed.`);
            // Thêm logic xử lý object đơn lẻ nếu cần
        }
        console.log(`[${taskId}] Transformation complete. ${transformedRecords.length} records ready for database.`);

        // === Bước 5: Lưu vào PostgreSQL bằng Prisma ===
        if (transformedRecords.length > 0) {
            console.log(`[${taskId}] Saving ${transformedRecords.length} records to PostgreSQL via Prisma...`);

            // Sử dụng upsert để chèn mới hoặc cập nhật nếu đã tồn tại (dựa trên source_id)
            // Chia thành các batch nhỏ hơn nếu số lượng records quá lớn để tránh lỗi timeout hoặc quá tải DB
            const batchSize = 100; // Ví dụ: xử lý 100 records mỗi lần
            for (let i = 0; i < transformedRecords.length; i += batchSize) {
                const batch = transformedRecords.slice(i, i + batchSize);
                console.log(`[${taskId}] Processing batch ${i / batchSize + 1}...`);

                const promises = batch.map(record =>
                    prisma.processedPost.upsert({
                        where: { source_id: record.source_id }, // Điều kiện để tìm bản ghi đã tồn tại
                        update: { // Dữ liệu cập nhật nếu tìm thấy
                            title: record.title,
                            content_length: record.content_length,
                            user_ref: record.user_ref,
                            // extracted_at không cần update
                        },
                        create: record, // Dữ liệu để tạo mới nếu không tìm thấy
                    })
                );

                // Thực thi các promises trong batch
                const results = await Promise.allSettled(promises);

                // Kiểm tra lỗi trong batch
                results.forEach((result, index) => {
                    if (result.status === 'rejected') {
                        console.error(`[${taskId}] Error saving record with source_id ${batch[index].source_id}:`, result.reason);
                        // Có thể thêm logic retry hoặc ghi log lỗi chi tiết
                    }
                });
                console.log(`[${taskId}] Batch ${i / batchSize + 1} processed.`);
            } // end for batch loop

            // Hoặc dùng createMany nếu không cần ON CONFLICT và DB hỗ trợ tốt
            // const createManyResult = await prisma.processedPost.createMany({
            //     data: transformedRecords,
            //     skipDuplicates: true, // Bỏ qua nếu vi phạm unique constraint (như source_id)
            // });
            // console.log(`[${taskId}] Prisma createMany result:`, createManyResult);

            console.log(`[${taskId}] Successfully saved/updated records to PostgreSQL.`);
        } else {
            console.log(`[${taskId}] No transformed records to save.`);
        }

        // === Bước 6: Di chuyển file trong MinIO sang 'processed' ===
        const processedObjectKey = processedPrefix + objectKey;
        console.log(`[${taskId}] Moving original raw file to processed area: ${processedObjectKey}`);
        await moveObject(objectKey, processedObjectKey);

        console.log(`[${taskId}] Task finished successfully.`);

    } catch (error) {
        console.error(`[${taskId}] An error occurred during the periodic task:`, error);
        // Nếu có lỗi, có thể di chuyển file MinIO vào thư mục error thay vì processed
        if (objectKey) { // Chỉ di chuyển nếu đã lưu file thành công
            const errorObjectKey = errorPrefix + objectKey;
            console.error(`[${taskId}] Attempting to move problematic file to error area: ${errorObjectKey}`);
            await moveObject(objectKey, errorObjectKey);
        }
    }
}

// --- Lập lịch chạy Task ---
console.log(`Scheduling task with cron schedule: "${cronSchedule}"`);
if (!cron.validate(cronSchedule)) {
    console.error(`Invalid cron schedule: "${cronSchedule}". Exiting.`);
    process.exit(1);
}

cron.schedule(cronSchedule, () => {
    console.log(`\nCron job triggered at ${new Date().toISOString()}`);
   // runPeriodicTask(); // Không dùng await ở đây để cron không bị block nếu task chạy lâu
}, {
    scheduled: true,
    timezone: "Asia/Ho_Chi_Minh" // Đặt múi giờ phù hợp
});

// --- Xử lý tín hiệu tắt ứng dụng ---
async function gracefulShutdown() {
    console.log('\nReceived kill signal, shutting down gracefully...');
    // Đóng các kết nối đang mở, ví dụ Prisma Client
    if (prisma) {
        await prisma.$disconnect();
        console.log('Prisma Client disconnected.');
    }
    // Có thể thêm các hành động dọn dẹp khác ở đây
    console.log('Graceful shutdown complete. Exiting.');
    process.exit(0);
}

process.on('SIGTERM', gracefulShutdown); // Tín hiệu tắt từ Docker/Kubernetes
process.on('SIGINT', gracefulShutdown);  // Tín hiệu tắt từ Ctrl+C