import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

const API_URL = 'https://api.example.com/auth';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData,thunkAPI) => {
        try{

            const response = await axios.post(API_URL+'login', userData);
            const data= response.data;
            if(data.isSuccess){
                return data;
            }
            else{
                return rejectWithValue(data);
            }
        }
        catch (error) {
            return rejectWithValue({
                isSuccess:false,
                message:"Sunucu hatası"
            })
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axios.post(API_URL+'register', userData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const token=localStorage.getItem('token');


const initialState = {
    user:null,
    token: token ? token : null,
    isLoading: false,
    errorMessages: null,
    message:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.message = null;
            state.errorMessages = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = null;
                state.errorMessages = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.value.accessToken;
                state.message = action.payload.message;
                state.errorMessages = null;
                localStorage.setItem('token', action.payload.value.accessToken);
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.isLoading = false;
                state.message = action.payload.message || "Bir hata oluştu";
                state.errorMessages = action.payload.errorMessages || ["Bir hata oluştu"];
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;