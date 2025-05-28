// v2/dichvu.js
const axios = require('axios');
const moment = require('moment');
const { apiConfig } = require('./config');
const { getToken } = require('./auth');

/**
 * Helper function to make API request for service data
 * @param {string} token - Authentication token
 * @param {Array} cookies - Authentication cookies
 * @param {Object} params - Request parameters
 * @returns {Promise<Object>} - API response data
 */
async function makeApiRequest(token, cookies, params) {
    try {
        const response = await axios({
            method: 'post',
            url: apiConfig.apiDichvuListUrl, // Use service list URL from config
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Cookie': cookies ? cookies.join('; ') : ''
            },
            data: params,
            timeout: apiConfig.timeout
        });

        if (!response.data) {
            console.warn('Received empty response from service API for params:', params);
            return { TotalPages: 0, Data: [] };
        }
        // console.log(`Dichvu: API response data: ${JSON.stringify(response.data)}`);
        return response.data;
    } catch (error) {
         console.error(`Error in makeApiRequest (Dichvu) for params: ${JSON.stringify(params)}`, error.message);
         if (error.response) {
             console.error('API Response Status:', error.response.status);
             console.error('API Response Data:', error.response.data);
         }
         throw error;
    }
}

/**
 * Wrapper for makeApiRequest with exponential backoff retry mechanism.
 * @param {string} token - Authentication token
 * @param {Array} cookies - Authentication cookies
 * @param {Object} params - Request parameters
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} initialDelay - Initial delay in ms
 * @returns {Promise<Object>} - API response data
 */
async function makeApiRequestWithRetry(token, cookies, params, maxRetries = 5, initialDelay = 2000) {
    let retries = 0;
    let delay = initialDelay;

    while (retries <= maxRetries) {
        try {
            return await makeApiRequest(token, cookies, params);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                retries++;
                if (retries > maxRetries) throw error;
                const jitter = Math.random() * 1000;
                delay = Math.min(delay * 2 + jitter, 120000);
                console.log(`Dichvu: Rate limited (429). Retrying in ${Math.round(delay/1000)}s... (${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
                retries++;
                if (retries > maxRetries) throw error;
                delay = Math.min(delay * 1.5, 60000);
                console.log(`Dichvu: Request timed out. Retrying in ${Math.round(delay/1000)}s... (${retries}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
    throw new Error(`Dichvu: Failed API request after ${maxRetries} retries.`);
}

/**
 * Fetches all services from the API by handling pagination month by month.
 * @param {string} startDate - Start date (default: '2019-01-01')
 * @param {number} batchSize - Records per page (default: 100)
 * @param {number} delayBetweenRequests - Delay in ms (default: 1000)
 * @returns {Promise<Array>} Complete array of service data
 */
async function getAllDichvu(startDate = '2025-01-01', batchSize = 100, delayBetweenRequests = 1000) {
    let authData, cookies;

    try {
        [authData, cookies] = await getToken();
        if (!authData || !authData.Token) {
            throw new Error('Dichvu: Initial authentication failed');
        }
        console.log("Dichvu: Initial authentication successful.");

        const start = moment();
        const today = moment();
        let allServices = [];
        let currentStart = start.clone();

        while (currentStart.isSameOrBefore(today)) {
            const currentMonthEnd = currentStart.clone().endOf('month');
            const endDate = currentMonthEnd.isAfter(today) ? today : currentMonthEnd;

            console.log(`--- Dichvu: Processing ${currentStart.format('YYYY-MM-DD')} to ${endDate.format('YYYY-MM-DD')} ---`);

            const monthParams = {
                "DateFrom": currentStart.format("YYYY-MM-DD"),
                "DateTo": endDate.format("YYYY-MM-DD"),
                "BranchID": "0",
                "DataType": "new",
                "PagingNumber": 1,
                "RowInPage": batchSize
            };

            let currentPage = 1;
            let totalPages = 1;
            let monthServices = [];

            try {
                 const firstPageResponse = await makeApiRequestWithRetry(authData.Token, cookies, {...monthParams, PagingNumber: 1 });
                 totalPages = firstPageResponse.TotalPages || 1;
                 const firstPageData = firstPageResponse.Data || [];
                 monthServices.push(...firstPageData);
                 console.log(`Dichvu: Retrieved page 1 of ${totalPages} (${firstPageData.length} records)`);

                 for (currentPage = 2; currentPage <= totalPages; currentPage++) {
                     await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
                     const pageResponse = await makeApiRequestWithRetry(authData.Token, cookies, {...monthParams, PagingNumber: currentPage });
                     const pageData = pageResponse.Data || [];
                     if (pageData.length > 0) {
                         monthServices.push(...pageData);
                         console.log(`Dichvu: Retrieved page ${currentPage} of ${totalPages} (${pageData.length} records)`);
                     } else {
                         console.warn(`Dichvu: Page ${currentPage} returned no data.`);
                     }
                 }
            } catch (monthError) {
                 console.error(`Dichvu: Error processing month ${currentStart.format('YYYY-MM')}: ${monthError.message}. Skipping.`);
                 currentStart = currentStart.add(1, 'month');
                 try {
                     [authData, cookies] = await getToken();
                     if (!authData || !authData.Token) throw new Error('Dichvu: Re-authentication failed.');
                     console.log("Dichvu: Re-authentication successful.");
                 } catch (reauthError) {
                     console.error("Dichvu: Re-authentication failed, halting:", reauthError.message);
                     throw reauthError;
                 }
                 continue;
            }

            allServices.push(...monthServices);
            console.log(`Dichvu: Month ${currentStart.format('YYYY-MM')} done. Fetched ${monthServices.length}. Total: ${allServices.length}`);
            currentStart = currentStart.add(1, 'month');

            if (currentStart.isSameOrBefore(today)) {
                try {
                    [authData, cookies] = await getToken();
                    if (!authData || !authData.Token) throw new Error('Dichvu: Re-authentication failed.');
                    console.log("Dichvu: Re-authentication successful.");
                } catch (reauthError) {
                    console.error("Dichvu: Re-authentication failed, halting:", reauthError.message);
                    throw reauthError;
                }
            }
        }

        console.log(`--- Dichvu: Successfully retrieved ${allServices.length} services ---`);
        return allServices;

    } catch (error) {
        console.error('Dichvu: Failed to fetch all services:', error.message);
        throw new Error(`Dichvu: Data fetch failed: ${error.message}`);
    }
}

module.exports = {
    getAllDichvu
};