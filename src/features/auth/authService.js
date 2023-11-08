import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const registerUser = async(value)=>{
    try{
        const response = await axios.post(`${base_url}user/register`, value);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const loginUser = async(data)=>{
    try{
        const response = await axios.post(`${base_url}user/login`, data);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getWishlist = async()=>{
    try{
        const response = await axios.get(`${base_url}user/wishlist`,config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const sendEnq = async(value)=>{
    try{
        await axios.post(`${base_url}enquiry/`, value, config);
    }catch(error){
        throw new Error(error);
    }
}

const getUserCart = async()=>{
    try{
        const response = await axios.get(`${base_url}user/get-cart`, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const addToCart = async(data)=>{
    try{
        const response = await axios.post(`${base_url}user/cart`, data, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const removeFromCart = async(cartProductId)=>{
    try{
        const response = await axios.put(`${base_url}user/cart/remove`, cartProductId, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const createOrder = async(data)=>{
    try{
        const response = await axios.post(`${base_url}user/create-order`, data, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const emptyCart = async()=>{
    try{
        await axios.delete(`${base_url}user/empty-cart`, config)
    }catch(error){
        throw new Error(error);
    }
}

const getCompareProducts = async()=>{
    try{
        const response = await axios.get(`${base_url}user/compare`, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}


const authService = {
    registerUser,
    loginUser,
    getWishlist,
    sendEnq,
    getUserCart,
    addToCart,
    removeFromCart,
    createOrder,
    emptyCart,
    getCompareProducts,
}

export default authService;