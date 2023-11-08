import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axiosConfig';

const getBlogs = async()=>{
	try{
		const response = await axios.get(`${base_url}blog/get-all-blogs`);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const getABlog = async(id)=>{
	try{
		const response = await axios.get(`${base_url}blog/get-blog/${id}`);
		return response.data;
	}catch(error){
		throw new Error(error);
	}
}

const blogService = {
	getBlogs,
	getABlog,
}

export default blogService;