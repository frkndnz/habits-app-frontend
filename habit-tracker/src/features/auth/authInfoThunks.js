import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/axios";


export const authInfo=createAsyncThunk(
    'auth/info',
    async (thunkAPI) => {
        try {

            const response =await API.get('auth/info');
            const data = response.data;
            if (data.isSuccess) {
                
                return data;
            }
            else {

                return thunkAPI.rejectWithValue(data);
            }

        } catch (error) {
            const backendResult = error.response?.data;
            if (backendResult) {
                return thunkAPI.rejectWithValue(backendResult);
            }
            return rejectWithValue({
                isSuccess: false,
                errorMessages: ["Bir hata oluştu"],
                message: "Sunucu hatası"
            })
        }
    }
)

export const addAuthInfoReducers= (builder) => {
    builder
        .addCase(authInfo.pending, (state) => {
            state.isLoading = true;
            state.message = null;
            state.errorMessages = null;
            state.isAuthenticated = false;
            state.isAuthChecked=false;
        })
        .addCase(authInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
            state.errorMessages = null;
            state.isAuthenticated = true;
            state.isAuthChecked=true;
           state.user={
                    user_name:action.payload.value.userName,
                    user_role:action.payload.value.userRole
                };
           
        })
        .addCase(authInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthChecked=true;
        });
};