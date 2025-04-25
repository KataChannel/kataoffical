const axios = require('axios');
const { apiConfig } = require('./config');

// Lưu ý: Hàm getToken và logger của nó có vẻ không được sử dụng trong runPeriodicTask gốc.
// Nếu cần sử dụng, bạn cần chỉnh sửa lại hoặc thêm logic gọi nó.
// Hàm này cũng có moment() và this._LoggerService không được định nghĩa trong context gốc.

// async function getToken(item) {
//     try {
//       const response = await axios.post(apiConfig.authUrl, item && typeof item == 'object' && Object.keys(item).length > 0 ? item : {"Name": "Taza","Password": "1b9287d492b256x7taza","Type": "web"}, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       // ... (phần xử lý response và lỗi như cũ) ...
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//        // ... (phần xử lý lỗi như cũ, cần định nghĩa moment và _LoggerService nếu dùng) ...
//       console.error('Error getting token:', error);
//       throw error; // Ném lỗi ra ngoài
//     }
// }


/**
 * Lấy danh sách khách hàng từ API.
 * Lưu ý: Headers và body trong code gốc có vẻ không chính xác cho method POST.
 * Đã sửa lại thành GET request dựa trên URL và loại bỏ body không cần thiết.
 * Cần kiểm tra lại API endpoint này yêu cầu method gì (GET hay POST) và headers/body nào.
 * @returns {Promise<object>} Dữ liệu trả về từ API.
 */
async function getKhachhang() {
    const apiUrl = apiConfig.customerListUrl; // Sử dụng URL từ config
    console.log(`Fetching customer data from ${apiUrl}...`);
    try {
        // IMPORTANT: Giả sử API này dùng GET. Nếu dùng POST, cần sửa lại axios.post và body.
        // Headers trong code gốc có vẻ không hợp lệ hoặc không cần thiết cho request này.
        // Token và xsrf-token thường cần được lấy động, không nên hardcode.
        const response = await axios.get(apiUrl, {
             headers: {
                 'Accept': 'application/json'
                 // Bỏ các header hardcode như Cookie, WebToken, xsrf-token trừ khi bạn chắc chắn chúng đúng và cần thiết
             },
             timeout: apiConfig.timeout
         });
        const data = response.data;
        console.log('Customer data fetched successfully.'); // Không log toàn bộ data lớn
        return data;
    } catch (error) {
        console.error('Error fetching customer data:', error.message);
        if (error.response) {
            console.error('API Response Status:', error.response.status);
            console.error('API Response Data:', error.response.data);
        }
        throw error; // Ném lỗi ra để taskRunner xử lý
    }
}

// Nếu bạn không dùng getToken, không cần export nó
module.exports = {
    getKhachhang
    // getToken
};