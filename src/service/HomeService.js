import axios from "axios";
import {API_ENDPOINTS} from "../const/API_ENDPOINTS";

const createUser=async (userRequest)=>{
    try{
        console.log(userRequest)
        const response= await axios.post(API_ENDPOINTS.CREATE_USER,{
            email: userRequest.email,
            name: userRequest.name,
            address: userRequest.address,
            phone: userRequest.phone,
        });
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return error.response.data;
    }
}

const addPoints = async (customerId, points) => {
    try {
        const response = await axios.post(API_ENDPOINTS.ADD_POINTS(customerId), {
            params: { points }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error adding points:", error);
        return error.response;
    }
};

const redeemPoints = async (customerId, points) => {
    try {
        const response = await axios.post(API_ENDPOINTS.REDEEM_POINTS(customerId), {
            params: { points }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error redeeming points:", error);
        return error.response;
    }
};

const getCustomerPoints = async (customerId) => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_CUSTOMER_POINTS(customerId));
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error retrieving customer points:", error);
        return error.response;
    }
};

const getAllCustomersWithPoints = async () => {
    try {
        const response = await axios.get(API_ENDPOINTS.GET_ALL_CUSTOMERS_WITH_POINTS);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error retrieving all customers with points:", error);
        return error.response;
    }
};

export default {
    createUser,
    addPoints,
    redeemPoints,
    getCustomerPoints,
    getAllCustomersWithPoints,
};

