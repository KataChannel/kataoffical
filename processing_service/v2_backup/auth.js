// auth.js
const axios = require('axios');
// Assuming apiConfig is in a config.js file in the same directory
const { apiConfig } = require('./config');

/**
 * Authenticates with the API and retrieves an access token
 * @param {Object} credentials - Authentication credentials (optional)
 * @returns {Promise<Array>} - Array containing [tokenData, cookies]
 */
async function getToken(credentials) {
    // Default credentials if none are provided
    const defaultCredentials = {
        Name: "Taza", // Replace with actual username if needed
        Password: "1b9287d492b256x7taza", // Replace with actual password if needed
        Type: "web"
    };

    // Use provided credentials or default ones
    const payload = (credentials && typeof credentials === 'object' && Object.keys(credentials).length > 0)
        ? credentials
        : defaultCredentials;

    try {
        // Make the POST request to the authentication endpoint
        const response = await axios.post(apiConfig.apiAuthUrl, payload, {
            withCredentials: true, // Important for handling cookies if necessary
            headers: {
                'Content-Type': 'application/json',
            },
            timeout: apiConfig.timeout // Use timeout from config
        });

        const { data } = response;
        // Extract cookies from the response headers
        const cookies = response.headers['set-cookie'];

        // Check if authentication was successful (Status === 1)
        if (data && data.Status === 1) {
            console.log('Authentication successful.');
            return [data, cookies]; // Return token data and cookies
        }

        // Log a warning if authentication failed
        console.warn(`Authentication failed with status: ${data ? data.Status : 'Unknown'}`);
        // Potentially add more robust logging here
        return [null, null]; // Return nulls to indicate failure

    } catch (error) {
        // Handle specific error cases like rate limiting (429)
        if (error.response && error.response.status === 429) {
            console.log('Rate limited during authentication, retrying in 5 seconds...');
            // Wait for 5 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 5000));
            return getToken(credentials); // Retry the authentication
        }

        // Log other authentication errors
        console.error('Authentication error:', error.message);
        // Throw a new error to indicate failure
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

// Export the getToken function
module.exports = {
    getToken
};
