import {createSlice} from '@reduxjs/toolkit';
import { handleAddHabitLog } from './addHabitLog';

const habitLogsSlice = createSlice({
    name: 'habit',
    initialState: {
        logs: [],
        isLoading: false,
        isSuccess: false,
        errorMessages: null,
        message: null,
    },
    reducers:{},
    extraReducers: (builder) => {
       handleAddHabitLog(builder);
    },
});

export default habitLogsSlice.reducer;
