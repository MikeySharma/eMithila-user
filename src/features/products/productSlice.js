import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import productService from './productService';
import {toast}  from 'react-toastify';

export const getProducts = createAsyncThunk('product/get', async(data, thunkAPI)=>{
	try{
		return productService.getProducts(data);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

export const addToWishList = createAsyncThunk('product/wishlist', async(id, thunkAPI)=>{
	try{
		return productService.addToWishList(id);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

export const getAProduct =createAsyncThunk('product/get-one', async(id, thunkAPI)=>{
	try{
		return productService.getAProduct(id);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

export const rating = createAsyncThunk('product/rating', async(data, thunkAPI)=>{
	try{
		return productService.rating(data);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})
export const addToCompare = createAsyncThunk('product/compare', async(id, thunkAPI)=>{
	try{
		return productService.addToCompare(id);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

export const removeFromCompare = createAsyncThunk('product/compare/del', async(id, thunkAPI)=>{
	try{
		return productService.removeFromCompare(id);
	}catch(error){
		return thunkAPI.rejectWithValue(error);
	}
})

const initialState = {
	products: [],
	getProduct: [],
	isSuccess: false,
	isError : false,
	isLoading : false,
	message : '',
}

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder)=>{
		builder
		.addCase(getProducts.pending, (state)=>{
			state.isLoading = true;
			state.isError = false ;
			state.isSuccess = false;
		})
		.addCase(getProducts.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = 'success';
			state.products = action.payload;
		})
		.addCase(getProducts.rejected, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.error;
		})
		.addCase(addToWishList.pending, (state)=>{
			state.isLoading = true;
			state.isError = false ;
			state.isSuccess = false;
		})
		.addCase(addToWishList.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = 'success';
			state.addedWishlist = action.payload.wishlist;
		})
		.addCase(addToWishList.rejected, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.error;
		})
		.addCase(getAProduct.pending, (state)=>{
			state.isLoading = true;
			state.isError = false ;
			state.isSuccess = false;
		})
		.addCase(getAProduct.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = 'success';
			state.getProduct = action.payload;
		})
		.addCase(getAProduct.rejected, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.error;
		})
		.addCase(rating.pending, (state)=>{
			state.isLoading = true;
			state.isError = false ;
			state.isSuccess = false;
		})
		.addCase(rating.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = 'success';
			state.rated = action.payload;
			if(state.isSuccess){
				toast.success('Rating Posted Successfully');
			}
		})
		.addCase(rating.rejected, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.error;
			if(state.isError){
				toast.error('Something went wrong');
			}
		})
		.addCase(addToCompare.pending, (state)=>{
			state.isLoading = true;
			state.isError = false ;
			state.isSuccess = false;
		})
		.addCase(addToCompare.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = 'success';
			state.compare = action.payload;
			if(state.isSuccess){
				toast.success('Added To Compare List')
			}
			
		})
		.addCase(addToCompare.rejected, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.error;
		})
		.addCase(removeFromCompare.pending, (state)=>{
			state.isLoading = true;
			state.isError = false ;
			state.isSuccess = false;
		})
		.addCase(removeFromCompare.fulfilled, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = 'success';
			state.removedCompare = action.payload;
			if(state.isSuccess){
				toast.success('Product Removed From Compare Successfully');
			}
			
		})
		.addCase(removeFromCompare.rejected, (state,action)=>{
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = true;
			state.message = action.error;
			if(state.isError){
				toast.error('Something went wrong');
			}
		})
	}
})

export default productSlice.reducer;