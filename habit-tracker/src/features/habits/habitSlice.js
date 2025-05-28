import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHabits = createAsyncThunk(
    'habits/fetchHabits', 
    async () => {
        const response = await axios.get('https://api.example.com/habits');
        return response.data;
    }
); 

const habitsSlice = createSlice({
    name: 'habits',
    initialState: {
        habits: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchHabits.pending, (state) => {
            state.status = 'loading';
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchHabits.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.habits = action.payload;
            state.loading = false;
        })
        .addCase(fetchHabits.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
            state.loading = false;
        })
    },
});


export default habitsSlice.reducer;