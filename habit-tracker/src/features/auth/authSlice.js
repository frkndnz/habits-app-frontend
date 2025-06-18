import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../api/axios';
import { addGoogleLoginReducers } from './googleAuthThunks';
import { addAuthInfoReducers } from './authInfoThunks';

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

export const logoutUser=createAsyncThunk(
    'auth/logoutUser',
    async (_,thunkAPI)=>{
        try {
           const response= await API.post('auth/logout');
            return  response.data;
            
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }

)


const initialState = {
    user:null,
    isLoading: false,
    isAuthenticated: false, 
    isAuthChecked: false,
    errorMessages: null,
    message:null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
       
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
                state.message = action.payload.message;
                state.errorMessages = null;
                state.isAuthenticated = true; 
                
                state.user={
                    user_name:action.payload.value.userName,
                    user_role:action.payload.value.userRole
                };
            })
            .addCase(loginUser.rejected, (state,action) => {
                state.isLoading = false;
                state.errorMessages = action.payload?.errorMessages || ["Bir hata oluştu"];
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
            })
            .addCase(logoutUser.fulfilled,(state)=>{
                state.user = null;
                state.message = null;
                state.errorMessages = null;
                state.isAuthenticated= false; 
                state.isAuthChecked = true;
            } )

            addGoogleLoginReducers(builder);
            addAuthInfoReducers(builder);
    },
});


export default authSlice.reducer;