import {configureStore} from '@reduxjs/toolkit';
import habitsReducer from '../features/habits/habitSlice';
import authReducer from '../features/auth/authSlice';
import habitLogsReducer from '../features/habitLogs/habitLogsSlice';

const store = configureStore({
  reducer: {
    habit:habitsReducer,
    auth:authReducer,
    habitLogs:habitLogsReducer,
    },
});

export default store;