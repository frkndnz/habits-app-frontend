import { createAsyncThunk } from "@reduxjs/toolkit"
import API from "../../api/axios";
import { handleJwt } from "../../utils/handleJwt";


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
            state.token = action.payload.value.accessToken;
            state.message = action.payload.message;
            state.errorMessages = null;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.value.accessToken);
            state.user = handleJwt(action.payload.value.accessToken);
        })
        .addCase(googleLogin.rejected, (state, action) => {
            state.isLoading = false;
            //  state.message = action.payload.message || "Bir hata oluştu";
            state.errorMessages = action.payload.errorMessages || ["Bir hata oluştu"];
        });
};