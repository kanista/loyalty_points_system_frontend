const BASE_URL = 'http://localhost:8080/api/customers';

export const API_ENDPOINTS = {
    CREATE_USER: `${BASE_URL}`,
    ADD_POINTS: (customerId) => `${BASE_URL}/${customerId}/add-points`,
    REDEEM_POINTS: (customerId) => `${BASE_URL}/${customerId}/redeem-points`,
    GET_CUSTOMER_POINTS: (customerId) => `${BASE_URL}/${customerId}/points`,
    GET_ALL_CUSTOMERS_WITH_POINTS: `${BASE_URL}/all-with-points`,

};