import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice';
import { authApi } from './services/auth/authApi';
import { postApi } from './services/postApi/postApi';

export default configureStore({
    reducer: {
        auth: authReducer,
        post: postReducer,
        [authApi.reducerPath]: authApi.reducer,
        [postApi.reducerPath]: postApi.reducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
            authApi.middleware,
            postApi.middleware,
        ),
});
