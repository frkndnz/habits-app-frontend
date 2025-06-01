import {createSlice} from '@reduxjs/toolkit';
import { handleFetchHabits } from './fetchHabit';
import { handleAddHabit } from './addHabit';
import { handleUpdateHabit } from './updateHabit';

const habitSlice = createSlice({
    name: 'habit',
    initialState: {
        habits: [],
        isLoading: false,
        isSuccess: false,
        errorMessages: null,
        message: null,
    },
    reducers:{},
    extraReducers: (builder) => {
        handleFetchHabits(builder);
        handleAddHabit(builder);
        handleUpdateHabit(builder);
    },
});


export default habitSlice.reducer;