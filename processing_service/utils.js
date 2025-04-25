const { Readable } = require('stream'); // Cần thiết nếu streamToString được dùng

/**
 * Đọc dữ liệu từ một Readable Stream thành string.
 * @param {Readable} stream Stream để đọc.
 * @returns {Promise<string>} Nội dung của stream dưới dạng string.
 */
async function streamToString(stream) {
    return new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}

module.exports = {
    streamToString
};