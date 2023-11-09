import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import {toast} from 'react-toastify';

export const registerUser = createAsyncThunk('user/register', async(value,thunkAPI)=>{
    try{
        return authService.registerUser(value);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const loginUser = createAsyncThunk('user/login', async(data, thunkAPI)=>{
    try{
        return authService.loginUser(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getWishlist =createAsyncThunk('user/wishlist', async(thunkAPI)=>{
    try{
        return authService.getWishlist();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const sendEnq = createAsyncThunk('enq/post', async(data, thunkAPI)=>{
    try{
        return authService.sendEnq(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getUserCart = createAsyncThunk('cart/get', async(thunkAPI)=>{
    try{
        return authService.getUserCart();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})
export const addToCart = createAsyncThunk('cart/add', async(data, thunkAPI)=>{
    try{
        return authService.addToCart(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const removeFromCart = createAsyncThunk('cart/remove', async(data, thunkAPI)=>{
    try{
        return authService.removeFromCart(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const createOrder = createAsyncThunk('order/create', async(data, thunkAPI)=>{
    try{
        return authService.createOrder(data);
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const emptyCart = createAsyncThunk('cart/empty', async(thunkAPI)=>{
    try{
        return authService.emptyCart();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getCompareProducts = createAsyncThunk('compare/get', async(thunkAPI)=>{
    try{
        return authService.getCompareProducts();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const getColors = createAsyncThunk('color/get', async(thunkAPI)=>{
    try{
        return authService.getColors();
    }catch(error){
        return thunkAPI.rejectWithValue(error);
    }
})

export const resetState = createAction('Reset_all');


const initialState = {
    user : [],
    isSuccess: false,
    isError: false,
    isLoading : false,
    message: '',
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder)=> {
        builder
        .addCase(registerUser.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.user = action.payload;
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.user = null;
            state.message =  action.error;
        })
         .addCase(loginUser.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.loggedUser = action.payload;
            if(state.isSuccess){
            localStorage.setItem('customer', JSON.stringify(action.payload));
            }
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.loggedUser = null;
            state.message =  action.error;
        })
        .addCase(getWishlist.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getWishlist.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.wishlist = action.payload.wishlist;
        })
        .addCase(getWishlist.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.loggedUser = null;
            state.message =  action.error;
        })
         .addCase(sendEnq.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(sendEnq.fulfilled, (state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            if(state.isSuccess){
                toast.success('Your enquiry has been send to the admin successfully');
            }
        })
        .addCase(sendEnq.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
            if(isError){
                toast.error('Something went wrong');
            }
        })
          .addCase(getUserCart.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(getUserCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.cart = action.payload;
           
        })
        .addCase(getUserCart.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
        })
        .addCase(addToCart.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(addToCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.addedToCart = action.payload;
            if(state.isSuccess){
                toast.success('Product Added To Cart successfully');
            }
           
        })
        .addCase(addToCart.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
             if(state.isError){
                toast.error('Something went wrong')
            }
        })
        .addCase(removeFromCart.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(removeFromCart.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.removeFromCart = action.payload;
            if(state.isSuccess){
                toast.success('Product Removed from Cart successfully');
            }
           
        })
        .addCase(removeFromCart.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
            if(state.isError){
                toast.error('Something went wrong')
            }
        })
         .addCase(createOrder.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(createOrder.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.order = action.payload;
            if(state.isSuccess){
                toast.success('Order Created  successfully');
            }
           
        })
        .addCase(createOrder.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
            if(state.isError){
                toast.error('Something went wrong')
            }
        })
         .addCase(emptyCart.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(emptyCart.fulfilled, (state)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
        })
        .addCase(emptyCart.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
        })
        .addCase(getCompareProducts.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(getCompareProducts.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.compare = action.payload;
        })
        .addCase(getCompareProducts.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
        })
         .addCase(getColors.pending, (state)=>{
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
         .addCase(getColors.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = 'success';
            state.colors = action.payload;
        })
        .addCase(getColors.rejected, (state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message =  action.error;
        })
        .addCase(resetState, ()=> initialState)
    }
})

export default authSlice.reducer;