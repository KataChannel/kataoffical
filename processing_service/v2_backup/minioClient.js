const { S3Client, PutObjectCommand, GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { minioConfig } = require('./config'); // Import cấu hình MinIO

let s3Client;

try {
    s3Client = new S3Client({
        endpoint: minioConfig.endpoint,
        region: minioConfig.region,
        credentials: {
            accessKeyId: minioConfig.accessKey,
            secretAccessKey: minioConfig.secretKey
        },
        forcePathStyle: minioConfig.forcePathStyle,
    });
    console.log('S3 Client initialized.');
} catch (error) {
    console.error('Failed to initialize S3 Client:', error);
    process.exit(1); // Thoát nếu không khởi tạo được S3 client
}

/**
 * Di chuyển object trong MinIO từ sourceKey sang destinationKey.
 * @param {string} sourceKey Key của file nguồn.
 * @param {string} destinationKey Key của file đích.
 * @returns {Promise<boolean>} True nếu thành công, false nếu thất bại.
 */
async function moveObject(sourceKey, destinationKey) {
    try {
        const copyParams = {
            Bucket: minioConfig.bucket,
            CopySource: `${minioConfig.bucket}/${sourceKey}`,
            Key: destinationKey
        };
        await s3Client.send(new CopyObjectCommand(copyParams));

        const deleteParams = { Bucket: minioConfig.bucket, Key: sourceKey };
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log(`Successfully moved ${sourceKey} to ${destinationKey}`);
        return true;
    } catch (error) {
        console.error(`Error moving object ${sourceKey} to ${destinationKey}:`, error);
        return false;
    }
}

module.exports = {
    s3Client,
    moveObject,
    PutObjectCommand, // Export để taskRunner có thể sử dụng
    GetObjectCommand, // Export để taskRunner có thể sử dụng
    bucketName: minioConfig.bucket // Export bucket name để taskRunner dùng
};