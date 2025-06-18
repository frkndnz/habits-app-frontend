import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/axios";



export const googleLogin = createAsyncThunk(
    'auth/googleLogin',
    async (idToken, thunkAPI) => {
        try {

            const response =await API.post('auth/google', {idToken});
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
export const addGoogleLoginReducers = (builder) => {
    builder
        .addCase(googleLogin.pending, (state) => {
            state.isLoading = true;
            state.message = null;
            state.errorMessages = null;
            state.isAuthenticated = false;
        })
        .addCase(googleLogin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
            state.errorMessages = null;
            state.isAuthenticated = true;
            state.user={
                    user_name:action.payload.value.userName,
                    user_role:action.payload.value.userRole
                };
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false;
            //  state.message = action.payload.message || "Bir hata oluştu";
            state.errorMessages = action.payload?.errorMessages || ["Bir hata oluştu"];
        });
};