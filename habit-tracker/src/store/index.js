import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { habitApi } from '../features/habits/habitApi';
import { habitLogApi } from '../features/habitLogs/habitLogApi';


const store = configureStore({
  reducer: {
    auth:authReducer,
    [habitApi.reducerPath]: habitApi.reducer,
    [habitLogApi.reducerPath]: habitLogApi.reducer,
    },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(habitApi.middleware, habitLogApi.middleware),

});

export default store;