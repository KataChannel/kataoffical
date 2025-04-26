// customer.js
const axios = require('axios');
const moment = require('moment');
// Assuming apiConfig is in a config.js file in the same directory
const { apiConfig } = require('./config');
// Import the getToken function from auth.js
const { getToken } = require('./auth');

/**
 * Helper function to make API request for customer data
 * @param {string} token - Authentication token
 * @param {Array} cookies - Authentication cookies
 * @param {Object} params - Request parameters
 * @returns {Promise<Object>} - API response data
 */
async function makeApiRequest(token, cookies, params) {
    try {
        const response = await axios({
            method: 'post',
            url: apiConfig.apiTreatListUrl, // Use revenue list URL from config
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the Bearer token
                'Cookie': cookies ? cookies.join('; ') : '' // Join cookies if they exist
            },
            data: params, // Send parameters in the request body
            timeout: apiConfig.timeout // Use timeout from config
        });

        // Check if response data exists
        if (!response.data) {
            console.warn('Received empty response from customer API for params:', params);
            // Return a default structure or throw an error based on desired handling
             return { TotalPages: 0, Data: [] };
            // throw new Error('Empty response from customer API');
        }

        // Return the data part of the response
        return response.data;
    } catch (error) {
         console.error(`Error in makeApiRequest for params: ${JSON.stringify(params)}`, error.message);
         if (error.response) {
             console.error('API Response Status:', error.response.status);
             console.error('API Response Data:', error.response.data);
         }
         // Re-throw the error to be caught by the retry mechanism or the main function
         throw error;
    }
}


/**
 * Wrapper for makeApiRequest with exponential backoff retry mechanism for rate limits and timeouts.
 * @param {string} token - Authentication token
 * @param {Array} cookies - Authentication cookies
 * @param {Object} params - Request parameters
 * @param {number} maxRetries - Maximum number of retries (default: 5)
 * @param {number} initialDelay - Initial delay in ms for retries (default: 2000)
 * @returns {Promise<Object>} - API response data
 */
async function makeApiRequestWithRetry(token, cookies, params, maxRetries = 5, initialDelay = 2000) {
    let delay = 2000; // Initial delay: 2 giây
    let retries = 0; // Initialize retry count
   
    while (retries <= maxRetries) {
        try {
            // Attempt the API request
            return await makeApiRequest(token, cookies, params);
        } catch (error) {
            // Check for rate limiting error (429)
            if (error.response && error.response.status === 429) {
                retries++;
                if (retries > maxRetries) {
                    console.error(`Max retries (${maxRetries}) exceeded for rate limit.`);
                    throw error;
                }
    
                // Exponential backoff with jitter, cap at 120s
                const jitter = Math.random() * 1000;
                delay = Math.min(delay * 2 + jitter, 120000);
    
                console.log(`Rate limited (429). Retrying in ${Math.round(delay/1000)}s... (Attempt ${retries}/${maxRetries}) for params: ${JSON.stringify(params)}`);
                await new Promise(resolve => setTimeout(resolve, delay));
    
            // Check for timeout errors
            } else if (error.code === 'ECONNABORTED' || (error.message && error.message.includes('timeout'))) {
                retries++;
                if (retries > maxRetries) {
                    console.error(`Max retries (${maxRetries}) exceeded for timeout.`);
                    throw error;
                }
    
                // Less aggressive backoff for timeouts, cap at 60s
                delay = Math.min(delay * 1.5 + (Math.random() * 1000), 60000);
                console.log(`Request timed out. Retrying in ${Math.round(delay/1000)}s... (Attempt ${retries}/${maxRetries}) for params: ${JSON.stringify(params)}`);
                await new Promise(resolve => setTimeout(resolve, delay));
    
            } else {
                // Non-retryable errors
                console.error(`Non-retryable error encountered for params: ${JSON.stringify(params)}`, error.message);
                throw error;
            }
        }
    }
     // This part should theoretically not be reached if maxRetries is handled correctly,
     // but added as a safeguard.
     throw new Error(`Failed API request after ${maxRetries} retries for params: ${JSON.stringify(params)}`);
}


/**
 * Fetches all customers from the API by handling pagination month by month.
 * @param {string} startDate - Start date in YYYY-MM-DD format (default: '2019-01-01')
 * @param {number} batchSize - Number of records per page (default: 100)
 * @param {number} delayBetweenRequests - Delay in ms between page requests (default: 1000)
 * @returns {Promise<Array>} Complete array of customer data
 */
async function getAllDieutri(startDate = '2019-01-01', batchSize = 100, delayBetweenRequests = 1000) {
    let authData, cookies; // Declare variables to hold auth info

    try {
        // Initial authentication
        [authData, cookies] = await getToken();
        if (!authData || !authData.Token) {
            throw new Error('Initial authentication failed: Invalid token data');
        }
        console.log("Initial authentication successful.");

        const start = moment(startDate);
        const today = moment(); // Use current date as the end point
        let allCustomers = []; // Array to store all fetched customer records

        let currentStart = start.clone(); // Start date for the current iteration loop

        // Loop through each month from the start date until today
        while (currentStart.isSameOrBefore(today)) {
            // Calculate the end date for the current month
            // Ensure the end date does not exceed today's date
            const currentMonthEnd = currentStart.clone().endOf('month');
            const endDate = currentMonthEnd.isAfter(today) ? today : currentMonthEnd;

            console.log(`--- Processing data for month: ${currentStart.format('YYYY-MM')} (Range: ${currentStart.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')}) ---`);

            // Define parameters for the API request for the current month
            const monthParams = {
                "DateFrom": currentStart.format("YYYY-MM-DD"),
                "DateTo": endDate.format("YYYY-MM-DD"),
                "BranchID": "0", // Assuming '0' means all branches
                "DataType": "new", // Or "all" depending on requirement
                "PagingNumber": 1, // Start with page 1
                "RowInPage": batchSize
            };

            let currentPage = 1;
            let totalPages = 1; // Initialize totalPages, will be updated after the first request
            let monthCustomers = []; // Store customers for the current month

            try {
                 // Fetch the first page to get total pages and initial data
                 console.log(`Fetching page ${currentPage}...`);
                 const firstPageResponse = await makeApiRequestWithRetry(authData.Token, cookies, {...monthParams, PagingNumber: currentPage });

                 totalPages = firstPageResponse.TotalPages || 1; // Get total pages from the response
                 const firstPageData = firstPageResponse.Data || [];
                 monthCustomers.push(...firstPageData); // Add data from the first page
                 console.log(`Retrieved page ${currentPage} of ${totalPages} (${firstPageData.length} records)`);

                 // Fetch remaining pages for the current month
                 for (currentPage = 2; currentPage <= totalPages; currentPage++) {
                     // Add delay between requests
                     await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));

                     console.log(`Fetching page ${currentPage}...`);
                     const pageResponse = await makeApiRequestWithRetry(authData.Token, cookies, {...monthParams, PagingNumber: currentPage });

                     const pageData = pageResponse.Data || [];
                     if (pageData.length > 0) {
                         monthCustomers.push(...pageData);
                         console.log(`Retrieved page ${currentPage} of ${totalPages} (${pageData.length} records)`);
                     } else {
                         console.warn(`Page ${currentPage} returned no data, but expected based on TotalPages.`);
                         // Optionally break or continue based on API behavior
                     }
                 }

            } catch (monthError) {
                 console.error(`Error processing month ${currentStart.format('YYYY-MM')}: ${monthError.message}. Skipping to next month.`);
                 // Decide if you want to skip the rest of the month or halt execution
                 // For now, we skip to the next month
                 currentStart = currentStart.add(1, 'month'); // Move to next month
                 // Attempt re-authentication before next month
                 try {
                     console.log("Attempting re-authentication before next month...");
                     [authData, cookies] = await getToken();
                     if (!authData || !authData.Token) {
                         console.error("Re-authentication failed. Halting process.");
                         throw new Error('Re-authentication failed during monthly processing.');
                     }
                     console.log("Re-authentication successful.");
                 } catch (reauthError) {
                     console.error("Failed to re-authenticate:", reauthError.message);
                     throw reauthError; // Stop the process if re-authentication fails
                 }
                 continue; // Skip to the next iteration of the while loop
            }


            // Add the successfully fetched customers for this month to the main list
            allCustomers.push(...monthCustomers);
            console.log(`Finished month ${currentStart.format('YYYY-MM')}. Fetched ${monthCustomers.length} customers. Total so far: ${allCustomers.length}`);

            // Move to the start of the next month
            currentStart = currentStart.add(1, 'month');

            // Re-authenticate if not the last month to ensure token validity
            if (currentStart.isSameOrBefore(today)) {
                try {
                    console.log("Attempting re-authentication before next month...");
                    [authData, cookies] = await getToken();
                     if (!authData || !authData.Token) {
                         console.error("Re-authentication failed. Halting process.");
                         throw new Error('Re-authentication failed during monthly processing.');
                     }
                    console.log("Re-authentication successful.");
                } catch (reauthError) {
                    console.error("Failed to re-authenticate:", reauthError.message);
                    throw reauthError; // Stop the process if re-authentication fails
                }
            }
        } // End of while loop for months

        console.log(`--- Successfully retrieved all ${allCustomers.length} customers from ${start.format('YYYY-MM-DD')} to ${today.format('YYYY-MM-DD')} ---`);
        return allCustomers; // Return the complete list

    } catch (error) {
        // Catch errors from initial authentication or re-authentication failures
        console.error('Failed to fetch all customers due to an error:', error.message);
        // Re-throw the error so the calling context knows about the failure
        throw new Error(`Customer data fetch process failed: ${error.message}`);
    }
}

// Export the main function
module.exports = {
    getAllDieutri
};