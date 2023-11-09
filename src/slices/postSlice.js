import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    posts: [],
    post: null,
    pager: null,
    loading: false,
    success: false,
    error: null
};

export const getPosts = createAsyncThunk("post/getPosts", async (url, { rejectWithValue }) => {
    try {
        const res = await api.get(url);
    
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const getPost = createAsyncThunk("post/getPost", async (id, { rejectWithValue }) => {
    try {
        const res = await api.get(`/api/posts/${id}`);
    
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const store = createAsyncThunk("post/store", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post('/api/posts', data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
    
        return res.data;
    } catch (error) {
        rejectWithValue(error);
    }
});

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        resetSuccess: (state) => {
            state.success = false;
        },
    },
    extraReducers: {
        [getPosts.pending]: (state) => {
            state.posts = [];
            state.pager = null;
            state.loading = true;
            state.error = null;
        },
        [getPosts.fulfilled]: (state, { payload }) => {
            const { data, ...pager } = payload;

            state.posts = data;
            state.pager = pager;
            state.loading = false;
        },
        [getPosts.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        [getPost.pending]: (state) => {
            state.post = null;
            state.loading = true;
            state.error = null;
        },
        [getPost.fulfilled]: (state, { payload }) => {
            state.post = payload;
            state.loading = false;
        },
        [getPost.rejected]: (state, { payload }) => {
            state.error = payload;
            state.loading = false;
        },
        [store.pending]: (state) => {
            state.success = false;
            state.error = null;
        },
        [store.fulfilled]: (state, { payload }) => {
            const { status, message } = payload;

            if (status === 1) {
                state.success = true;
            } else {
                state.success = false;
                state.error = { message };
            }
        },
        [store.rejected]: (state, { payload }) => {
            state.error = payload;
        },
    }
});

export default postSlice.reducer;

export const { resetSuccess } = postSlice.actions;
