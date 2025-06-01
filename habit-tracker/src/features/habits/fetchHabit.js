import API from '../../api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchHabits = createAsyncThunk(
    'habits/fetchHabits', 
    async () => {
        try {
            const response = await API.get('habits');
            return response.data;
            
        } catch (error) {
            const backendResult = error.response?.data;
            if (backendResult) {
                return Promise.reject(backendResult);
            }
            return Promise.reject({
                isSuccess: false,
                errorMessages: ["Bir hata oluştu"],
                message: "Sunucu hatası"
            });
        }
    }
); 

export const handleFetchHabits = (builder) => {
    builder
        .addCase(fetchHabits.pending, (state) => {
            state.isSuccess = false;
            state.isLoading = true;
            state.habits = [];
            state.errorMessages = null;
            state.message = null;
        })
        .addCase(fetchHabits.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.habits = action.payload.value;
            state.errorMessages = null;
            state.message = action.payload?.message || "Alışkanlıklar başarıyla yüklendi";
        })
        .addCase(fetchHabits.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.habits = [];
            state.errorMessages = action.payload?.errorMessages || ["Bir hata oluştu"];
        });
};