const axios = require('axios');
const moment = require('moment');
const { apiConfig } = require('./config');

// Lưu ý: Hàm getToken và logger của nó có vẻ không được sử dụng trong runPeriodicTask gốc.
// Nếu cần sử dụng, bạn cần chỉnh sửa lại hoặc thêm logic gọi nó.
// Hàm này cũng có moment() và this._LoggerService không được định nghĩa trong context gốc.

/**
 * Authenticates with the API and retrieves an access token
 * @param {Object} credentials - Authentication credentials (optional)
 * @returns {Promise<Array>} - Array containing [tokenData, cookies]
 */
async function getToken(credentials) {
    const defaultCredentials = {
        Name: "Taza", 
        Password: "1b9287d492b256x7taza", 
        Type: "web"
    };
    
    const payload = (credentials && typeof credentials === 'object' && Object.keys(credentials).length > 0) 
        ? credentials 
        : defaultCredentials;
        
    try {
        const response = await axios.post(apiConfig.apiAuthUrl, payload, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: apiConfig.timeout
        });
        
        const { data } = response;
        const cookies = response.headers['set-cookie'];
        
        if (data.Status === 1) {
            return [data, cookies];
        }
        
        // Note: Logger functionality needs to be properly implemented
        console.warn(`Authentication failed with status: ${data.Status}`);
        // If you need logging, replace with a proper logger implementation:
        // logger.warn('Authentication failed', { 
        //   credentials: payload, 
        //   status: data.Status 
        // });
        
        return data;
    } catch (error) {
        // Handle rate limiting with exponential backoff
        if (error.response && error.response.status === 429) {
            console.log('Rate limited, retrying in 5 seconds...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            return getToken(credentials);
        }
        
        console.error('Authentication error:', error.message);
        throw new Error(`Authentication failed: ${error.message}`);
    }
}


/**
 * Fetches all customers from the API by handling pagination
 * @param {string} startDate - Start date in YYYY-MM-DD format (default: '2018-01-01')
 * @param {number} batchSize - Number of records per page (default: 100)
 * @param {number} delayBetweenRequests - Delay in ms between requests (default: 1000)
 * @returns {Promise<Array>} Complete array of customer data
 */
async function getAllKhachhang(startDate = '2018-01-01', batchSize = 100, delayBetweenRequests = 1000) {
    try {
        // Get authentication tokens
        // Sửa: Sử dụng let thay vì const để có thể gán lại giá trị
        let [authData, cookies] = await getToken();
        if (!authData || !authData.Token) {
            throw new Error('Authentication failed: Invalid token data');
        }

        const start = moment(startDate);
        const today = moment();
        let allCustomers = [];

        // Process data month by month from startDate to current date
        let currentStart = start.clone();

        while (currentStart.isSameOrBefore(today)) {
            // Set date range for current month
            const currentEnd = currentStart.clone().add(1, 'month').subtract(1, 'day');
            // Ensure we don't go beyond today
            const endDate = currentEnd.isAfter(today) ? today : currentEnd;

            console.log(`Workspaceing data from ${currentStart.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}`);

            // Set parameters for current month
            const monthParams = {
                "DateFrom": currentStart.format("YYYY-MM-DD"),
                "DateTo": endDate.format("YYYY-MM-DD"),
                "BranchID": "0",
                "DataType": "new",
                "PagingNumber": "1",
                "RowInPage": batchSize
            };

            // Get first page to determine total pages
            const firstPageResponse = await makeApiRequestWithRetry(authData.Token, cookies, monthParams);
            const totalPages = firstPageResponse.TotalPages || 1;

            // Add first page data
            const monthCustomers = [...(firstPageResponse.Data || [])];
            console.log(`Retrieved month ${currentStart.format('YYYY-MM')}, page 1 of ${totalPages} (${firstPageResponse.Data?.length} records)`);

            // Fetch remaining pages for this month
            for (let page = 2; page <= totalPages; page++) {
                const pageParams = {
                    ...monthParams,
                    PagingNumber: page
                };

                try {
                    // Add delay between requests to avoid rate limiting
                    await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));

                    const pageResponse = await makeApiRequestWithRetry(authData.Token, cookies, pageParams);

                    if (pageResponse.Data && Array.isArray(pageResponse.Data)) {
                        monthCustomers.push(...pageResponse.Data);
                        console.log(`Retrieved month ${currentStart.format('YYYY-MM')}, page ${page} of ${totalPages} (${pageResponse.Data.length} records)`);
                    } else {
                        console.warn(`Month ${currentStart.format('YYYY-MM')}, page ${page} returned invalid data`);
                    }
                } catch (pageError) {
                    console.error(`Error fetching month ${currentStart.format('YYYY-MM')}, page ${page}:`, pageError.message);
                    // Skip this page and continue with the next
                    continue;
                }
            }

            // Add this month's customers to the total
            allCustomers.push(...monthCustomers);
            console.log(`Retrieved ${monthCustomers.length} customers for ${currentStart.format('YYYY-MM')}. Total so far: ${allCustomers.length}`);

            // Move to next month
            currentStart = currentStart.add(1, 'month');

            // Re-authenticate after processing each month
            // Sửa: Gán lại trực tiếp vào biến let đã khai báo, bỏ khai báo const mới
            [authData, cookies] = await getToken();
            if (!authData || !authData.Token) {
                 console.warn(`Re-authentication failed before processing month ${currentStart.format('YYYY-MM')}. Trying to continue...`);
                 // Quyết định cách xử lý: dừng lại hoặc tiếp tục với token cũ (rủi ro)?
                 // throw new Error('Re-authentication failed'); // Hoặc dừng lại
            }
        }

        console.log(`Retrieved all ${allCustomers.length} customers from ${start.format('YYYY-MM-DD')} to ${today.format('YYYY-MM-DD')}`);
        return allCustomers;
    } catch (error) {
        console.error('Failed to fetch all customers:', error);
        // Ném lại lỗi để bên gọi có thể xử lý
        throw new Error(`Customer data fetch failed: ${error.message}`);
    }
}

// Helper function with exponential backoff retry mechanism
async function makeApiRequestWithRetry(token, cookies, params, maxRetries = 5, initialDelay = 2000) {
    let retries = 0;
    let delay = initialDelay;
    
    while (retries <= maxRetries) {
        try {
            return await makeApiRequest(token, cookies, params);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                // Rate limited - exponential backoff
                retries++;
                if (retries > maxRetries) throw error;
                
                // Calculate exponential backoff with jitter
                const jitter = Math.random() * 1000;
                delay = Math.min(delay * 2 + jitter, 60000); // Cap at 60 seconds
                
                console.log(`Rate limited (429). Retrying in ${Math.round(delay/1000)}s... (${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                // Timeout error - retry with longer timeout
                retries++;
                if (retries > maxRetries) throw error;
                
                delay = Math.min(delay * 1.5, 30000); // Cap at 30 seconds
                console.log(`Request timed out. Retrying in ${Math.round(delay/1000)}s... (${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // Other errors - throw immediately
                throw error;
            }
        }
    }
}

/**
 * Helper function to make API request for customer data
 * @param {string} token - Authentication token
 * @param {Array} cookies - Authentication cookies
 * @param {Object} params - Request parameters
 * @returns {Promise<Object>} - API response
 */
async function makeApiRequest(token, cookies, params) {
    const response = await axios({
        method: 'post',
        url: apiConfig.apiCustomerListUrl,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cookie': cookies
        },
        data: params,
        timeout: apiConfig.timeout
    });
    
    if (!response.data) {
        throw new Error('Empty response from customer API');
    }
    
    return response.data;
}


// Nếu bạn không dùng getToken, không cần export nó
module.exports = {
    getAllKhachhang
    // getToken
};