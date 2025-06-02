import API from '../../api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


import { fetchHabits } from '../habits/fetchHabit';


export const addHabitLog = createAsyncThunk(
    'habitLogs/add', 
    async (habitData,{dispatch}) => {
        try {
            const response = await API.post('habitLogs', habitData);
            if(response.data.isSuccess) {
                dispatch(fetchHabits());  // Dispatch fetchHabits to refresh the habit list
                 // Dispatch fetchHabits to refresh the habit list
            }
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

export const handleAddHabitLog = (builder) => {
    builder
        .addCase(addHabitLog.pending, (state) => {
            state.isSuccess = false;
            state.isLoading = true;
            state.errorMessages = null;
            state.message = null;
        })
        .addCase(addHabitLog.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.errorMessages = null;
            state.message = action.payload?.message || "Alışkanlıklar başarıyla yüklendi";
        })
        .addCase(addHabitLog.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessages = action.payload?.errorMessages || ["Bir hata oluştu"];
        });
};