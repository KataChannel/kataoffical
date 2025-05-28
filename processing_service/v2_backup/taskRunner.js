// taskRunner.js
const prisma = require('./databaseClient'); //
const { s3Client, moveObject, PutObjectCommand, GetObjectCommand, bucketName } = require('./minioClient'); //
const { streamToString } = require('./utils'); //
const { minioConfig } = require('./config'); //

/**
 * Thực hiện quy trình ETL (Extract, Transform, Load) một cách linh hoạt.
 * @param {object} config - Cấu hình cho tác vụ.
 * @param {string} config.taskName - Tên định danh cho tác vụ (vd: "Customer", "Revenue"). Dùng cho logging và đặt tên file.
 * @param {Function} config.fetchDataFunction - Hàm async để lấy dữ liệu gốc (vd: getAllKhachhang, getAllThanhtoan).
 * @param {Function} config.transformFunction - Hàm để biến đổi dữ liệu gốc thành định dạng lưu vào DB. Phải trả về một Array các record.
 * @param {object} config.prismaModel - Model Prisma để lưu dữ liệu (vd: prisma.Customer, prisma.Revenue).
 * @param {string} config.sourceIdField - Tên trường định danh duy nhất trong dữ liệu đã biến đổi để dùng cho upsert (vd: 'source_id').
 * @param {string} [config.minioDataPrefix] - (Tùy chọn) Tiền tố thư mục con trong MinIO cho loại dữ liệu này (vd: 'customers', 'revenue'). Mặc định là taskName viết thường.
 */
async function runGenericTask(config) {
    const {
        taskName,
        fetchDataFunction,
        transformFunction,
        prismaModel,
        sourceIdField,
        minioDataPrefix // Sử dụng tiền tố tùy chỉnh hoặc taskName
    } = config;

    // --- Validate config ---
    if (!taskName || !fetchDataFunction || !transformFunction || !prismaModel || !sourceIdField) {
        console.error(`[${taskName || 'GenericTask'}] Invalid configuration provided. Missing required fields.`);
        throw new Error(`Invalid configuration for task: ${taskName || 'GenericTask'}`);
    }

    const taskId = `${taskName}_${new Date().toISOString()}`;
    console.log(`\n[${taskId}] Starting generic task: ${taskName}...`);
    let objectKey = null; // Lưu key của file đã lưu vào MinIO
    let rawData;
    const dataPrefix = minioDataPrefix || taskName.toLowerCase(); // Dùng tiền tố hoặc taskName

    try {
        // === Bước 1: Gọi hàm lấy dữ liệu đã được truyền vào ===
        console.log(`[${taskId}] Fetching data using provided function: ${fetchDataFunction.name || 'anonymous'}...`);
        rawData = await fetchDataFunction(); // Gọi hàm được truyền vào

        console.log(`[${taskId}] Successfully fetched data.`);
        // Log một phần nhỏ dữ liệu để kiểm tra (nếu là array)
        if (Array.isArray(rawData)) {
            console.log(`[${taskId}] Raw data sample (first item):`, rawData.length > 0 ? rawData[0] : 'Empty Array');
            console.log(`[${taskId}] Total raw records fetched: ${rawData.length}`);
        } else {
             console.log(`[${taskId}] Raw data type: ${typeof rawData}`);
        }


        // Logic kiểm tra dữ liệu rỗng
        if (!rawData || (Array.isArray(rawData) && rawData.length === 0) || (typeof rawData === 'object' && Object.keys(rawData).length === 0 && !Array.isArray(rawData))) {
            console.log(`[${taskId}] Source function returned no data or empty data. Task finished.`);
            return;
        }

        // === Bước 2: Lưu vào MinIO ===
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const timestamp = now.toISOString().replace(/[:.]/g, '-');
        // Sử dụng dataPrefix để tạo đường dẫn file
        objectKey = `${dataPrefix}/${year}_${month}_${day}_${timestamp}_${taskName.toLowerCase()}_data.json`;

        const dataString = JSON.stringify(rawData);
        const putObjectParams = { Bucket: bucketName, Key: objectKey, Body: dataString, ContentType: 'application/json' };
        console.log(`[${taskId}] Uploading raw data to MinIO: ${objectKey}`);
         try {
            const uploadResult = await s3Client.send(new PutObjectCommand(putObjectParams));
            console.log(`[${taskId}] Successfully uploaded raw data to MinIO. Result ETag: ${uploadResult.ETag}`);
        } catch (uploadError) {
            console.error(`[${taskId}] !!! ERROR during MinIO upload for ${objectKey} !!!`);
            console.error(`[${taskId}] Bucket: ${bucketName}`);
            console.error(`[${taskId}] Error Details:`, uploadError);
            throw new Error(`MinIO upload failed for ${objectKey}: ${uploadError.message}`);
        }

        // === Bước 3: Đọc lại dữ liệu từ MinIO (Tùy chọn) ===
        console.log(`[${taskId}] Reading data back from MinIO: ${objectKey}`);
        const getParams = { Bucket: bucketName, Key: objectKey };
        // const getParams = { Bucket: bucketName, Key: objectKey };
        const objectData = await s3Client.send(new GetObjectCommand(getParams));
        if (!objectData.Body) throw new Error(`[${taskId}] Object ${objectKey} body is empty after get.`);
        const rawDataStringFromMinio = await streamToString(objectData.Body); //
        const dataToProcess = JSON.parse(rawDataStringFromMinio);
        console.log(`[${taskId}] Successfully read data back from MinIO.`);

        // === Bước 4: Transform Dữ liệu bằng hàm được truyền vào ===
        console.log(`[${taskId}] Transforming data using provided function: ${transformFunction.name || 'anonymous'}...`);
        let transformedRecords = [];
        try {
             // Gọi hàm transform đã được truyền vào
             transformedRecords = transformFunction(dataToProcess);
             // Đảm bảo hàm transform trả về một array
             if (!Array.isArray(transformedRecords)) {
                 console.error(`[${taskId}] Transformation function did not return an array. Received:`, typeof transformedRecords);
                 throw new Error(`Transformation function for ${taskName} must return an array.`);
             }
        } catch (transformError) {
            console.error(`[${taskId}] !!! ERROR during data transformation !!!`);
            console.error(transformError);
            throw new Error(`Data transformation failed for ${taskName}: ${transformError.message}`);
        }
        console.log(`[${taskId}] Transformation complete. ${transformedRecords.length} records ready for database.`);


        // === Bước 5: Lưu vào PostgreSQL bằng Prisma (Model và key động) ===
        if (transformedRecords.length > 0) {
            console.log(`[${taskId}] Saving ${transformedRecords.length} records to PostgreSQL using model ${prismaModel.constructor.name || 'UnknownModel'}...`); // Cố gắng lấy tên model
            const batchSize = 100; // Giữ batch size nhỏ để dễ quản lý
            for (let i = 0; i < transformedRecords.length; i += batchSize) {
                const batch = transformedRecords.slice(i, i + batchSize);
                console.log(`[${taskId}] Processing batch ${Math.floor(i / batchSize) + 1}...`);

                // Sử dụng model và sourceIdField đã truyền vào
                const promises = batch.map(record => {
                    if (record[sourceIdField] === undefined || record[sourceIdField] === null) {
                        console.warn(`[${taskId}] Record is missing the source ID field '${sourceIdField}'. Skipping upsert for this record:`, record);
                        return Promise.resolve({ status: 'skipped', reason: `Missing source ID field '${sourceIdField}'` }); // Trả về promise đã giải quyết để không làm hỏng Promise.allSettled
                    }
                    return prismaModel.upsert({
                        where: { [sourceIdField]: record[sourceIdField] }, // Key động
                        update: record, // Cập nhật toàn bộ record (hoặc chỉ định các trường nếu cần)
                        create: record, // Dữ liệu tạo mới
                    });
                });


                const results = await Promise.allSettled(promises);
                let successCount = 0;
                let skippedCount = 0;
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        if (result.value.status === 'skipped') { // Kiểm tra trường hợp bỏ qua tự định nghĩa
                            skippedCount++;
                            // console.warn(`[${taskId}] Skipped record in batch: ${result.value.reason}`); // Ghi log nếu muốn
                        } else {
                             successCount++;
                        }
                    } else if (result.status === 'rejected') {
                        // Log lỗi chi tiết hơn
                        const recordIdentifier = batch[index] ? batch[index][sourceIdField] : 'unknown';
                        console.error(`[${taskId}] Error saving record with ${sourceIdField}=${recordIdentifier}:`, result.reason?.message || result.reason);
                        // Có thể log thêm chi tiết lỗi Prisma nếu có
                        if (result.reason?.code) {
                             console.error(`[${taskId}] Prisma Error Code: ${result.reason.code}`);
                        }
                         if (result.reason?.meta) {
                             console.error(`[${taskId}] Prisma Error Meta:`, result.reason.meta);
                        }
                    }
                });
                 console.log(`[${taskId}] Batch ${Math.floor(i / batchSize) + 1} processed. Success: ${successCount}, Skipped: ${skippedCount}, Failed: ${batch.length - successCount - skippedCount}`);
            }
            console.log(`[${taskId}] Finished saving/updating records to PostgreSQL.`);
        } else {
            console.log(`[${taskId}] No transformed records to save.`);
        }

        // === Bước 6: Di chuyển file trong MinIO sang 'processed' ===
        const processedObjectKey = minioConfig.processedPrefix + objectKey;
        console.log(`[${taskId}] Moving original raw file to processed area: ${processedObjectKey}`);
        await moveObject(objectKey, processedObjectKey); //

        console.log(`[${taskId}] Task finished successfully.`);

    } catch (error) {
        console.error(`[${taskId}] !!! An error occurred during the task: ${taskName} !!!`);
        console.error(`[${taskId}] Error:`, error.message);
        if (error.stack) {
            console.error(error.stack); // Log stack trace để debug dễ hơn
        }

        // Di chuyển file vào thư mục lỗi nếu có lỗi xảy ra sau khi file đã được upload
        if (objectKey) {
             try {
                // Kiểm tra xem file có thực sự tồn tại trước khi cố gắng di chuyển không
                // (Lỗi có thể xảy ra trước cả bước upload thành công)
                await s3Client.send(new GetObjectCommand({ Bucket: bucketName, Key: objectKey }));
                // Nếu lệnh trên không lỗi, file tồn tại, tiến hành di chuyển
                const errorObjectKey = minioConfig.errorPrefix + objectKey;
                console.error(`[${taskId}] Attempting to move problematic file to error area: ${errorObjectKey}`);
                await moveObject(objectKey, errorObjectKey); //
             } catch (moveError) {
                 // Kiểm tra xem lỗi có phải là do file không tồn tại không (NoSuchKey)
                 if (moveError.name === 'NoSuchKey') {
                     console.error(`[${taskId}] Original file ${objectKey} not found in bucket. Possibly failed before upload or already moved.`);
                 } else {
                     console.error(`[${taskId}] Could not move file ${objectKey} to error area:`, moveError);
                 }
             }
        } else {
            console.error(`[${taskId}] No object key was generated or file upload failed, cannot move to error area.`);
        }
         // Có thể muốn throw lại lỗi để scheduler biết tác vụ thất bại
         // throw error;
    }
}

module.exports = { runGenericTask }; // Đổi tên export