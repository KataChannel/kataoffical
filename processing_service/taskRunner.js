const axios = require('axios'); // Vẫn cần axios nếu gọi API trực tiếp hoặc dùng apiClient
const prisma = require('./databaseClient');
const { s3Client, moveObject, PutObjectCommand, GetObjectCommand, bucketName } = require('./minioClient');
const { streamToString } = require('./utils');
const { apiConfig, minioConfig } = require('./config');
const { getKhachhang } = require('./apiClient'); // Import hàm gọi API khách hàng

/**
 * Thực hiện quy trình lấy dữ liệu, lưu trữ, xử lý và lưu vào DB.
 */
async function runPeriodicTask() {
    const taskId = `Task_${new Date().toISOString()}`;
    console.log(`\n[${taskId}] Starting periodic task...`);
    let objectKey = null; // Lưu key của file đã lưu vào MinIO
    let rawData;

    try {
        // === Bước 1: Gọi API ===
        console.log(`[${taskId}] Fetching data using apiClient...`);
        // Sử dụng hàm getKhachhang từ apiClient thay vì gọi axios trực tiếp
        // rawData = await axios.get(apiConfig.apiUrl, { headers: { 'Accept': 'application/json' }, timeout: apiConfig.timeout });
        rawData = await getKhachhang(); // Gọi hàm đã tách biệt
        console.log(`[${taskId}] Successfully fetched data via apiClient.`);

        // Logic kiểm tra dữ liệu rỗng (cần điều chỉnh dựa trên cấu trúc data thực tế)
        if (!rawData || (Array.isArray(rawData) && rawData.length === 0) || (typeof rawData === 'object' && Object.keys(rawData).length === 0)) {
            console.log(`[${taskId}] API returned no data or empty data. Task finished.`);
            return;
        }

        // === Bước 2: Lưu vào MinIO ===
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        // Lấy source name từ URL thực tế đã gọi (apiConfig.customerListUrl)
        const sourceName = new URL(apiConfig.customerListUrl).hostname.replace(/\./g, '_') || 'unknown_source';
        objectKey = `${sourceName}/${year}/${month}/${day}/${timestamp}_customer_data.json`; // Đổi tên file rõ ràng hơn

        const dataString = JSON.stringify(rawData);
        const putObjectParams = { Bucket: bucketName, Key: objectKey, Body: dataString, ContentType: 'application/json' };

        console.log(`[${taskId}] Uploading raw data to MinIO: ${objectKey}`);
        await s3Client.send(new PutObjectCommand(putObjectParams));
        console.log(`[${taskId}] Successfully uploaded raw data to MinIO.`);

        // === Bước 3: Đọc lại dữ liệu từ MinIO (Tùy chọn, có thể xử lý rawData trực tiếp) ===
        // Nếu bạn tin tưởng dữ liệu đã lấy từ API, có thể bỏ qua bước đọc lại này
        console.log(`[${taskId}] Reading data back from MinIO: ${objectKey}`);
        const getParams = { Bucket: bucketName, Key: objectKey };
        const objectData = await s3Client.send(new GetObjectCommand(getParams));
        if (!objectData.Body) throw new Error(`Object ${objectKey} body is empty after get.`);
        const rawDataStringFromMinio = await streamToString(objectData.Body);
        const dataToProcess = JSON.parse(rawDataStringFromMinio);
        console.log(`[${taskId}] Successfully read data back from MinIO.`);

        // === Bước 4: Transform Dữ liệu ===
        // !!! Quan trọng: Logic transform này dựa trên ví dụ gốc (posts)
        // !!! Bạn cần thay đổi hoàn toàn logic này để phù hợp với dữ liệu khách hàng thực tế từ API getKhachhang()
        console.log(`[${taskId}] Transforming data...`);
        const transformedRecords = [];
        if (Array.isArray(dataToProcess)) { // Kiểm tra xem dataToProcess có phải là array không
             dataToProcess.forEach(item => {
                 // --- LOGIC TRANSFORM CHO DỮ LIỆU KHÁCH HÀNG ---
                 // Ví dụ giả định (thay thế bằng các trường thực tế):
                 // if (!item.customer_id || !item.name) {
                 //     console.warn(`[${taskId}] Skipping record due to missing required fields:`, item);
                 //     return;
                 // }
                 // const record = {
                 //     source_customer_id: String(item.customer_id), // Đảm bảo kiểu dữ liệu phù hợp với schema
                 //     customer_name: item.name,
                 //     phone_number: item.phone || null,
                 //     address: item.address || null,
                 //     // Thêm các trường khác từ item vào record
                 //     extracted_at: now
                 // };
                 // transformedRecords.push(record);

                 // --- Logic cũ cho posts (cần xóa/thay thế) ---
                 if (typeof item.id !== 'number' || typeof item.userId !== 'number') {
                      console.warn(`[${taskId}] Skipping record due to invalid id or userId:`, item);
                      return;
                 }
                 const record = {
                     source_id: item.id, // Đổi tên trường này trong DB nếu cần
                     title: item.title || null,
                     content_length: item.body ? String(item.body).length : 0,
                     user_ref: item.userId, // Đổi tên trường này trong DB nếu cần
                     extracted_at: now
                 };
                 transformedRecords.push(record);
             });
         } else if (typeof dataToProcess === 'object' && dataToProcess !== null) {
             // Xử lý trường hợp API trả về một object đơn lẻ hoặc object chứa list
             console.warn(`[${taskId}] Data from ${objectKey} is not an array. Implement object transformation logic.`);
             // Ví dụ: Nếu dữ liệu nằm trong một key như dataToProcess.customers
             // if(Array.isArray(dataToProcess.customers)) {
             //     dataToProcess.customers.forEach(item => { /* ... logic transform ... */ });
             // }
         } else {
            console.warn(`[${taskId}] Unexpected data format from ${objectKey}. Skipping transformation.`);
         }
        console.log(`[${taskId}] Transformation complete. ${transformedRecords.length} records ready for database.`);


        // === Bước 5: Lưu vào PostgreSQL bằng Prisma ===
        // !!! Quan trọng: Đảm bảo model Prisma ('processedPost') và các trường của nó
        // !!! khớp với 'transformedRecords' bạn tạo ra ở Bước 4.
        // !!! Có thể bạn cần một model khác, ví dụ 'ProcessedCustomer'.
        if (transformedRecords.length > 0) {
            console.log(`[${taskId}] Saving ${transformedRecords.length} records to PostgreSQL via Prisma...`);
            const batchSize = 100;
            for (let i = 0; i < transformedRecords.length; i += batchSize) {
                const batch = transformedRecords.slice(i, i + batchSize);
                console.log(`[${taskId}] Processing batch ${Math.floor(i / batchSize) + 1}...`);

                const promises = batch.map(record =>
                    // !!! Thay 'processedPost' bằng tên model Prisma đúng
                    // !!! Thay 'source_id' bằng unique key đúng cho dữ liệu khách hàng (vd: source_customer_id)
                    prisma.processedPost.upsert({
                        where: { source_id: record.source_id }, // Cập nhật unique key
                        update: { // Các trường cần cập nhật nếu tồn tại
                            title: record.title,
                            content_length: record.content_length,
                            user_ref: record.user_ref,
                            // extracted_at thường không cần update
                        },
                        create: record, // Dữ liệu tạo mới
                    })
                );

                const results = await Promise.allSettled(promises);
                results.forEach((result, index) => {
                    if (result.status === 'rejected') {
                         // !!! Cập nhật key định danh lỗi
                        console.error(`[${taskId}] Error saving record with source_id ${batch[index].source_id}:`, result.reason);
                    }
                });
                console.log(`[${taskId}] Batch ${Math.floor(i / batchSize) + 1} processed.`);
            }
            console.log(`[${taskId}] Successfully saved/updated records to PostgreSQL.`);
        } else {
            console.log(`[${taskId}] No transformed records to save.`);
        }

        // === Bước 6: Di chuyển file trong MinIO sang 'processed' ===
        const processedObjectKey = minioConfig.processedPrefix + objectKey;
        console.log(`[${taskId}] Moving original raw file to processed area: ${processedObjectKey}`);
        await moveObject(objectKey, processedObjectKey); // Sử dụng hàm moveObject đã import

        console.log(`[${taskId}] Task finished successfully.`);

    } catch (error) {
        console.error(`[${taskId}] An error occurred during the periodic task:`, error);
        if (objectKey) {
            const errorObjectKey = minioConfig.errorPrefix + objectKey;
            console.error(`[${taskId}] Attempting to move problematic file to error area: ${errorObjectKey}`);
            await moveObject(objectKey, errorObjectKey); // Sử dụng hàm moveObject đã import
        }
    }
}

module.exports = { runPeriodicTask };