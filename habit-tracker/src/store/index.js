import {configureStore} from '@reduxjs/toolkit';
import habitsReducer from '../features/habits/habitSlice';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    habits:habitsReducer,
    auth:authReducer,
    },
});

export default store;