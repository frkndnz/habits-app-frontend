import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { baseApi } from '../features/baseApi';
const store = configureStore({
  reducer: {
    auth:authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),

});

export default store;