import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import { baseApi } from './services/baseApi';

export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        [baseApi.reducerPath]: baseApi.reducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            baseApi.middleware,
        ),
});
