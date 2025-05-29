import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import API from '../../api/axios';
import { handleJwt } from '../../utils/handleJwt';


export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData,thunkAPI) => {
        try{

            const response = await API.post('/auth/login', userData);
            const data= response.data;
            if(data.isSuccess){
                return data;
            }
            else{
                
                return thunkAPI.rejectWithValue(data);
            }
        }
        catch (error) {
            const backendResult= error.response?.data;
            if(backendResult){
                return thunkAPI.rejectWithValue(backendResult);
            }  
            return rejectWithValue({
                isSuccess:false,
                errorMessages:["Bir hata oluştu"],
                message:"Sunucu hatası"
            })
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, thunkAPI) => {
        try {
            const response = await API.post('auth/register', userData);
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
    isAuthenticated: false, 
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
            state.isAuthenticated= false; 
            state.token = null;
            localStorage.removeItem('token');
        },
        setUserFromToken: (state,action) => {
            state.user=handleJwt(action.payload); 
            state.isAuthenticated = true;
            console.log("setUserFromToken",state.user); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.message = null;
                state.errorMessages = null;
                state.isAuthenticated=false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.value.accessToken;
                state.message = action.payload.message;
                state.errorMessages = null;
                state.isAuthenticated = true; 
                localStorage.setItem('token', action.payload.value.accessToken);
                state.user=handleJwt(action.payload.value.accessToken);
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.isLoading = false;
              //  state.message = action.payload.message || "Bir hata oluştu";
                state.errorMessages = action.payload.errorMessages || ["Bir hata oluştu"];
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.errorMessages = null;
                state.message = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.message;
                state.errorMessages = null;
            })
            .addCase(registerUser.rejected, (state,action) => {
                state.isLoading = false;
                state.errorMessages = action.payload.errorMessages || ["Bir hata oluştu"];
            });
    },
});

export const { logout,setUserFromToken } = authSlice.actions;
export default authSlice.reducer;