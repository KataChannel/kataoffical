const axios = require('axios'); // Vẫn cần axios nếu gọi API trực tiếp hoặc dùng apiClient
const prisma = require('./databaseClient');
const { s3Client, moveObject, PutObjectCommand, GetObjectCommand, bucketName } = require('./minioClient');
const { streamToString } = require('./utils');
const { apiConfig, minioConfig } = require('./config');
const { getAllKhachhang } = require('./customer.js'); // Import hàm gọi API khách hàng


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
        rawData = await getAllKhachhang(); // Gọi hàm đã tách biệt
        console.log(`[${taskId}] Successfully fetched data via customer.js.`);
        console.log(`[${taskId}] Raw data:`, rawData); // Log dữ liệu gốc (có thể cần điều chỉnh để không quá dài)
        
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
        const sourceName = new URL(apiConfig.apiCustomerListUrl).hostname.replace(/\./g, '_') || 'unknown_source';
        // objectKey = `${sourceName}/${year}/${month}/${day}/${timestamp}_customer_data.json`; // Đổi tên file rõ ràng hơn
        objectKey = `${sourceName}/${year}_${month}_${day}_${timestamp}_customer_data.json`; // Đổi tên file rõ ràng hơn

        const dataString = JSON.stringify(rawData);
        const putObjectParams = { Bucket: bucketName, Key: objectKey, Body: dataString, ContentType: 'application/json' };
        console.log(`[${taskId}] Uploading raw data to MinIO: ${objectKey}`);
         try {
            // --- Bọc lệnh send trong try...catch riêng ---
            const uploadResult = await s3Client.send(new PutObjectCommand(putObjectParams));
            console.log(`[${taskId}] Successfully uploaded raw data to MinIO. Result ETag: ${uploadResult.ETag}`); // Log thêm thông tin thành công nếu có (ETag)
        } catch (uploadError) {
            // --- Xử lý lỗi upload cụ thể ---
            console.error(`[${taskId}] !!! ERROR during MinIO upload !!!`);
            console.error(`[${taskId}] Failed to upload object: ${objectKey}`);
            console.error(`[${taskId}] Bucket: ${bucketName}`);
            console.error(`[${taskId}] Error Details:`, uploadError); // Log toàn bộ đối tượng lỗi để xem chi tiết

            // Bạn có thể quyết định dừng Task tại đây bằng cách throw lỗi ra ngoài
            // để khối catch lớn hơn của runPeriodicTask xử lý (ví dụ: di chuyển vào thư mục error)
            throw new Error(`MinIO upload failed for ${objectKey}: ${uploadError.message}`);

            // Hoặc bạn có thể xử lý khác, ví dụ: thử lại, ghi log đặc biệt, rồi tiếp tục các bước khác (ít phổ biến)
            // console.log(`[${taskId}] Skipping further processing for this task due to upload error.`);
            // return; // Kết thúc sớm hàm runPeriodicTask
        }

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
        // !!! Bạn cần thay đổi hoàn toàn logic này để phù hợp với dữ liệu khách hàng thực tế từ API getAllKhachhang()
        console.log(`[${taskId}] Transforming data...`);
        const transformedRecords = [];
        if (Array.isArray(dataToProcess)) { // Kiểm tra xem dataToProcess có phải là array không
             dataToProcess.forEach(item => {
                const record = {
                    source_id: item.ID.toString(), // Primary key for upsert
                    name: item.Name,
                    code: item.Code,
                    codeOld: item.CodeOld || null,
                    docCode: item.DocCode || null,
                    email: item.Email || null,
                    phone: item.Phone || null,
                    phone2: item.Phone2 || null,
                    birthday: item.Birthday ? new Date(item.Birthday) : null,
                    gender: item.Gender || null,
                    address: item.Address || null,
                    commune: item.Commune || null,
                    district: item.District || null,
                    city: item.City || null,
                    citizenIdentity: item.CitizenIdentity?.CitizenIdentity || null,
                    identityGrantDate: item.CitizenIdentity?.GrantDate ? new Date(item.CitizenIdentity.GrantDate) : null,
                    identityIssuedBy: item.CitizenIdentity?.IssuedBy || null,
                    customerSource: item.CustomerSource || null,
                    customerGroup: item.CustomerGroup || null,
                    branchId: item.BranchID,
                    firstPaidDate: item.DateOf?.FirstPaid ? new Date(item.DateOf.FirstPaid) : null,
                    firstCheckinDate: item.DateOf?.FirstCheckin ? new Date(item.DateOf.FirstCheckin) : null,
                    firstTreatmentDate: item.DateOf?.FirstTreatment ? new Date(item.DateOf.FirstTreatment) : null,
                    lastTreatmentDate: item.DateOf?.LastTreatment ? new Date(item.DateOf.LastTreatment) : null,
                    lastCheckinDate: item.DateOf?.LastCheckin ? new Date(item.DateOf.LastCheckin) : null,
                    ccStaffId: item.CCStaffID || null,
                    caringStaffCode: item.CaringStaffCode || null,
                    marStaffId: item.MarStaffID || null,
                    marStaffCode: item.MarStaffCode || null,
                    staffId: item.StaffID || null,
                    staffCode: item.StaffCode || null,
                    gclid: item.Gclid || null,
                    createdDate: item.CreatedDate ? new Date(item.CreatedDate) : null,
                    createdBy: item.CreatedBy || null,
                    modifiedDate: item.ModifiedDate ? new Date(item.ModifiedDate) : null,
                    modifiedBy: item.ModifiedBy || null,
                    state: item.State,
                    extractedAt: new Date()
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
                    prisma.Customer.upsert({
                        where: { source_id: record.source_id }, // Cập nhật unique key
                        update: {     
                            name: record.name,
                            code: record.code,
                            codeOld: record.codeOld,
                            docCode: record.docCode,
                            email: record.email,
                            phone: record.phone,
                            phone2: record.phone2,
                            birthday: record.birthday,
                            gender: record.gender,
                            address: record.address,
                            commune: record.commune,
                            district: record.district,
                            city: record.city,
                            citizenIdentity: record.citizenIdentity,
                            identityGrantDate: record.identityGrantDate,
                            identityIssuedBy: record.identityIssuedBy,
                            customerSource: record.customerSource,
                            customerGroup: record.customerGroup,
                            branchId: record.branchId,
                            firstPaidDate: record.firstPaidDate,
                            firstCheckinDate: record.firstCheckinDate,
                            firstTreatmentDate: record.firstTreatmentDate,
                            lastTreatmentDate: record.lastTreatmentDate,
                            lastCheckinDate: record.lastCheckinDate,
                            ccStaffId: record.ccStaffId,
                            caringStaffCode: record.caringStaffCode,
                            marStaffId: record.marStaffId,
                            marStaffCode: record.marStaffCode,
                            staffId: record.staffId,
                            staffCode: record.staffCode,
                            gclid: record.gclid,
                            createdDate: record.createdDate,
                            createdBy: record.createdBy,
                            modifiedDate: record.modifiedDate,
                            modifiedBy: record.modifiedBy,
                            state: record.state,
                            extractedAt: record.extractedAt
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