import API from '../../api/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchHabits } from './fetchHabit';


export const addHabit = createAsyncThunk(
    'habits/addHabit', 
    async (habitData,{dispatch}) => {
        try {
            const response = await API.post('habits', habitData);
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

export const handleAddHabit = (builder) => {
    builder
        .addCase(addHabit.pending, (state) => {
            state.isSuccess = false;
            state.isLoading = true;
            state.errorMessages = null;
            state.message = null;
        })
        .addCase(addHabit.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isLoading = false;
            state.errorMessages = null;
            state.message = action.payload?.message || "Alışkanlıklar başarıyla yüklendi";
        })
        .addCase(addHabit.rejected, (state, action) => {
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessages = action.payload?.errorMessages || ["Bir hata oluştu"];
        });
};