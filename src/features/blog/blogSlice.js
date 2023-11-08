import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import blogService from './blogService';

export const getBlogs = createAsyncThunk('blog/get-all', async(thunkAPI)=>{
	try{
		return blogService.getBlogs();
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

export const getABlog = createAsyncThunk('blog/get-one', async(id, thunkAPI)=>{
	try{
		return blogService.getABlog(id);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

const initialState ={
	blogs: [],
	getBlog:[],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: '',
}

const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {},
	extraReducers: (builder)=>{
		builder
		.addCase(getBlogs.pending, (state)=>{
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
		})
		.addCase(getBlogs.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError=false;
			state.blogs = action.payload;
			state.message = 'success';
		})
		.addCase(getBlogs.rejected, (state,action)=>{
			state.isSuccess = false;
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
			state.blogs = null;
		})
		.addCase(getABlog.pending, (state)=>{
			state.isLoading = true;
			state.isSuccess = false;
			state.isError = false;
		})
		.addCase(getABlog.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError=false;
			state.getBlog = action.payload;
			state.message = 'success';
		})
		.addCase(getABlog.rejected, (state,action)=>{
			state.isSuccess = false;
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
			state.getBlog = null;
		})
	}
})

export default blogSlice.reducer;