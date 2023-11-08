import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const getProducts = async({limit, page})=>{
	try{
		const response = await axios.get(`${base_url}product/?page=${page}&limit=${limit}`);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const addToWishList = async(id)=>{
    try{
        const response = await axios.put(`${base_url}product/wishlist`, {productId: id}, config);
        return response.data;
    }catch(error){
        throw new Error(error);
    }
}

const getAProduct = async(id)=>{
	try{
		const response = await axios.get(`${base_url}product/${id}`);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const rating = async(data)=>{
	try{
		const response = await axios.put(`${base_url}product/rating`, data, config);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const addToCompare = async(id)=>{
	try{
		const response = await axios.post(`${base_url}product/compare`, {productId : id}, config);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const removeFromCompare = async(id)=>{
	try{
		const response = await axios.delete(`${base_url}product/compare/${id}`,  config);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const productService = {
	getProducts,
	addToWishList,
	getAProduct,
	rating,
	addToCompare,
	removeFromCompare,
}

export default productService;